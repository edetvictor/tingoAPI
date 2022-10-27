
const express = require("express");
const router = express.Router();
const accountDetails = require('../service/accountDetails');
const { STATUS_CODES, API_STATUS } = require("../utils/constant");

router.get("/", async (req, res, next) => {
    try {
        const result = await accountDetails.getAccount({});
        res.status(STATUS_CODES.OK).json({
            status: API_STATUS.SUCCESS,
            results: result.length,
            accountData: result,
        });
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const result = await accountDetails.createAccount(req.body);
        res.status(STATUS_CODES.CREATED).json({
            status: API_STATUS.SUCCESS,
            accountData: result,
        });
    } catch (error) {
        next(error);
    }
});

router.put("/transaction", async (req, res, next) => {
    try {
        const result = await accountDetails.doTransaction(req.body);
        res.status(STATUS_CODES.OK).json({
            status: API_STATUS.SUCCESS,
            accountAmountInfo: result,
        });
    } catch (error) {
        next(error);
    }
});



module.exports = router;