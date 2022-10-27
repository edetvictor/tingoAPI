const AccountDetails = require('../models/accountDetails')
const CustomerDetails = require('../models/customerDetails')
const { ERROR_MSG, STATUS_CODES, API_STATUS, ACCOUNT_TYPE } = require('../utils/constant');
/**
 * Class consisting of functionalites related to: 
 * 1. Create and retrieve account details (already existing customer)
 * 2. Perform (with validation) transactions
 * 3. Modify account balanaces upon succeeful transactions
 */
class AccountDetailsService {

    /**
     * Method to post data into AccountDetails collection 
     * @param data for customer details which needs to be saved
     */
    async createAccount(data) {
        const { customerId, account_type, amountInPaisa } = data;
        const customerIdExist = await CustomerDetails.findById(customerId);

        if (!customerIdExist)
            throw Object.assign(new Error(ERROR_MSG.CUSTOMERID_NOT_FOUND), { statusCode: STATUS_CODES.BAD_REQUEST, status: API_STATUS.FAIL });

        else if (account_type === ACCOUNT_TYPE.BASIC_SAVINGS && amountInPaisa > 5000000)
            throw Object.assign(new Error(ERROR_MSG.AMOUNT_EXCEED), { statusCode: STATUS_CODES.BAD_REQUEST, status: API_STATUS.FAIL });

        return AccountDetails.create(data);
    }

    /**
     * Method to retrive all account details from AccountDetails collection
     */
    async getAccount(filter) {
        const result = await AccountDetails.find(filter);
        return result;
    }

    /**
     * Method to perform transaction between 2 accounts
     * @param data consists of source & destination account ids, and amount to be trasferred
     */
    async doTransaction(data) {
        const { fromAccountId, toAccountId, amount } = data;

        const { fromAccountData, toAccountData } = await this.doValidate(fromAccountId, toAccountId, amount);

        const totalDestBalanceBeforeTransaction = await this.accumulativeDestUserAccountAmount(toAccountData);

        const newSrcBalance = await this.commitTransactionAndUpdateAccounts(fromAccountId, toAccountId, amount, fromAccountData, toAccountData);

        const totalDestBalanceAfterTransaction = totalDestBalanceBeforeTransaction + amount;

        return { newSrcBalance, totalDestBalance: totalDestBalanceAfterTransaction, transferedAt: Date.now() }
    }

    async doValidate(fromAccountId, toAccountId, amount) {

        let [fromAccountData, toAccountData] = await Promise.all([
            AccountDetails.findById(fromAccountId), AccountDetails.findById(toAccountId)]);

        if (fromAccountData === null || toAccountData === null)
            throw Object.assign(new Error(ERROR_MSG.IS_ACCOUNT_EXIST), { statusCode: STATUS_CODES.BAD_REQUEST, status: API_STATUS.FAIL });

        else if (JSON.stringify(fromAccountData.customerId) === JSON.stringify(toAccountData.customerId))
            throw Object.assign(new Error(ERROR_MSG.SAME_CUSTOMER_ACCOUNTS), { statusCode: STATUS_CODES.BAD_REQUEST, status: API_STATUS.FAIL });

        else if (fromAccountData.amountInPaisa < amount)
            throw Object.assign(new Error(ERROR_MSG.SUFFICIENT_AMOUNT), { statusCode: STATUS_CODES.BAD_REQUEST, status: API_STATUS.FAIL });

        else if ((toAccountData.amountInPaisa + amount) > 5000000 && toAccountData.account_type === ACCOUNT_TYPE.BASIC_SAVINGS)
            throw Object.assign(new Error(ERROR_MSG.BASICSAVINGS_AMOUNT_EXCCED), { statusCode: STATUS_CODES.BAD_REQUEST, status: API_STATUS.FAIL });

        return { fromAccountData, toAccountData };
    }

    /**
     *  Method to commit transaction. try catch  are provided to rollback the amount to source account 
     *  If transaction fails on destination account. 
     */
    async commitTransactionAndUpdateAccounts(fromAccountId, toAccountId, amount, fromAccountData, toAccountData) {

        const srcDataToUpdate = { amountInPaisa: fromAccountData.amountInPaisa - amount };
        const destDataToUpdate = { amountInPaisa: toAccountData.amountInPaisa + amount }

        const newSrcData = await AccountDetails.findByIdAndUpdate(fromAccountId, srcDataToUpdate, { new: true });
        try {
            await AccountDetails.findByIdAndUpdate(toAccountId, destDataToUpdate, { new: true });
        } catch (error) {
            await AccountDetails.findByIdAndUpdate(fromAccountId, fromAccountData, { new: true });
            throw Object.assign(new Error(ERROR_MSG.DENIED_TRANSACTION), { statusCode: STATUS_CODES.BAD_REQUEST, status: API_STATUS.FAIL });
        }

        return newSrcData.amountInPaisa;
    }

    async accumulativeDestUserAccountAmount(toAccountData) {
        const allDestCustomerAccount = await AccountDetails.find({ customerId: toAccountData.customerId });
        var totalAmount = 0;
        for (var account of allDestCustomerAccount) {
            totalAmount += account.amountInPaisa;
        }
        return totalAmount;
    }
}

module.exports = new AccountDetailsService();
