const CustomerDetails = require('../models/customerDetails');

/**
 * Class consisting of functionalites related to: 
 * 1. Register new customer details
 * 2. Retrieve customer details
 */
class CustomerDetailsService {

    /**
     * Register new customer details in CustomerDetails collection
     * @param data consists of Name and Pancard
     */
    async createCustomer(data) {
        return CustomerDetails.create(data);
    }

    /**
     * Retrieve Customer Details
     */
    async getCustomer(filter) {
        const result = await CustomerDetails.find(filter);
        return result;
    }
}

module.exports = new CustomerDetailsService();
