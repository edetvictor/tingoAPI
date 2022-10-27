const mongoose = require('mongoose');
const { VALIDATION_MSG } = require('../utils/constant');

const customerDetailsSchema = mongoose.Schema({
    customerName: {
        type: String,
        required: [true, VALIDATION_MSG.REQUIRE_NAME],
        lowercase: true,
    },
    pancard: {
        type: String,
        required: [true, VALIDATION_MSG.REQUIRE_PANCARD],
        unique: true
    },
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const CustomerDetails = mongoose.model('CustomerDetails', customerDetailsSchema);

module.exports = CustomerDetails;