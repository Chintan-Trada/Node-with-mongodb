let express = require("express");
let router = express.Router();

const EnquiryController = require('../../controller/EnquiryController');
const Authentication = require('../../middlerware/authentication');


//Enquiry
router.get('/enquiry', Authentication.verifyJWT, EnquiryController.Enquiry);
router.post('/enquiry', Authentication.verifyJWT, EnquiryController.EnquiryPost);
router.delete('/enquiry', Authentication.verifyJWT, EnquiryController.EnquiryMultipleDelete);
router.get('/enquiry/:id', Authentication.verifyJWT,  EnquiryController.EnquiryDelete);

//Enquiry-View
router.get('/enquiry-view', Authentication.verifyJWT,  EnquiryController.EnquiryView);

//Enquiry-Edit
router.get('/enquiry-edit', Authentication.verifyJWT,  EnquiryController.EnquiryEdit);
router.post('/enquiry-edit', Authentication.verifyJWT,  EnquiryController.EnquiryUpdate);

module.exports = router;
