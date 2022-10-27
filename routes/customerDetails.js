const express = require("express");
const router = express.Router();
const customerDetails = require('../service/customerDetails');
const { STATUS_CODES, API_STATUS } = require("../utils/constant");

router.get("/", async (req, res, next) => {
    try {
        const result = await customerDetails.getCustomer({});
        res.status(STATUS_CODES.OK).json({
            status: API_STATUS.SUCCESS,
            results: result.length,
            customerData: result,
        });
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const result = await customerDetails.createCustomer(req.body);
        res.status(STATUS_CODES.CREATED).json({
            status: API_STATUS.SUCCESS,
            customerData: result,
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
