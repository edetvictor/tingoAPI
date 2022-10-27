const mongoose = require('mongoose');
const { VALIDATION_MSG } = require('../utils/constant');

const accountDetailsSchema = mongoose.Schema({
    customerId: {
        type: mongoose.Schema.ObjectId,
        required: [true, VALIDATION_MSG.REQUIRE_CUSTOMERID],
        ref: 'customerDetails',
    },
    account_type: {
        type: String,
        required: [true, VALIDATION_MSG.REQUIRE_ACCOUNT_TYPE],
        enum: ["Savings", "Current", "BasicSavings"]
    },
    amountInPaisa: {
        type: Number,
        required: [true, VALIDATION_MSG.REQUIRE_AMOUNT],
    }
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const AccountDetails = mongoose.model('AccountDetails', accountDetailsSchema);

module.exports = AccountDetails;