let express = require("express");
let router = express.Router();
let path = require('path');

const UserRouter = require('./Router/UserRouter');
const CategoryRouter = require('./Router/CategoryRouter');
const EnquiryRouter = require('./Router/EnquiryRouter');
const ProtfolioRouter = require('./Router/ProtfolioRouter');
const TestnomialRouter = require('./Router/TestnomialRouter');

router.use('/', UserRouter);

router.use('/', CategoryRouter);

router.use('/', EnquiryRouter);

router.use('/', ProtfolioRouter);

router.use('/', TestnomialRouter);






module.exports = router;