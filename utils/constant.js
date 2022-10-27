module.exports = {
    API_STATUS: {
        ACTIVE: "active",
        INACTIVE: "inactive",
        DELETED: "deleted",
        SUCCESS: "success",
        FAIL: "fail"
    },
    STATUS_CODES: {
        BAD_REQUEST: 400,
        NOT_FOUND: 404,
        INTERNAL_SERVER_ERROR: 500,
        OK: 200,
        CREATED: 201
    },
    ERROR_MSG: {
        CUSTOMERID_NOT_FOUND: "this customerId does not exist in records. Please register customer details first.",
        AMOUNT_EXCEED: "BasicSavings account cannot have amount more than Rs. 50,000",
        IS_ACCOUNT_EXIST: "Either one (or both) of the account id(s) doesn't exist. Kindly check.",
        SAME_CUSTOMER_ACCOUNTS: "Transfer between accounts belonging to the same customer is not allowed.",
        SUFFICIENT_AMOUNT: "Source account doesn't has sufficient amount for transfer.",
        BASICSAVINGS_AMOUNT_EXCCED: "Transaction unsuccessful because BasicSavings account's amount cannot exceed Rs. 50,000",
        DENIED_TRANSACTION: "Transaction denied, try again after sometime"
    },

    ACCOUNT_TYPE: {
        BASIC_SAVINGS: 'BasicSavings',
        CURRENT: "Current",
        SAVING: "Savings"
    },

    VALIDATION_MSG: {
        REQUIRE_NAME: 'Please provide your name',
        REQUIRE_PANCARD: 'Please provide your pancard details',
        REQUIRE_ACCOUNT_TYPE: 'Please provide a account type',
        REQUIRE_CUSTOMERID: 'Please provide a customer Id with which this account is linked',
        REQUIRE_AMOUNT: 'Please provide a amount'
    }

}