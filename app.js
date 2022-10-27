const express = require('express');
const createError = require('http-errors');
const logger = require('./logger/logger');
const customerDetails = require('./routes/customerDetails');
const accountDetails = require('./routes/accountDetails');

const app = express();
app.use(express.json());

app.use(function (req, res, next) {
    logger.info(`${req.originalUrl} - ${req.method}`);
    next();
});

app.use('/customer', customerDetails);
app.use('/account', accountDetails);

app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    logger.error(
        `${err.statusCode || 500} - ${err.status} - ${err.message} - ${req.originalUrl} - ${req.method
        } - ${req.ip}`
    );
    //console.log(err);
    // render the error page
    res.status(err.statusCode || 500);
    res.send({
        errCode: err.statusCode,
        errMessage: err.message
    });
});


module.exports = app;
