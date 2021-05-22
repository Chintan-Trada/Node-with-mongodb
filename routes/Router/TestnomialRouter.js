let express = require("express");
let router = express.Router();

const TestnomialController = require('../../controller/TestnomialController');
const Authentication = require('../../middlerware/authentication');



//Testonomial
router.get('/testnomial', Authentication.verifyJWT, TestnomialController.Testonomial);
router.post('/testnomial', Authentication.verifyJWT, TestnomialController.TestonomialPost);
router.delete('/testnomial', Authentication.verifyJWT, TestnomialController.TestonomialMultipleDelete);
router.get('/testnomial/:id', Authentication.verifyJWT,  TestnomialController.TestonomialDelete);

//Testonomial-view
router.get('/testnomial-view', Authentication.verifyJWT, TestnomialController.TestonomialView);

//Testonomial-edit
router.get('/testnomial-edit', Authentication.verifyJWT, TestnomialController.TestonomialEdit);
router.post('/testnomial-edit', Authentication.verifyJWT, TestnomialController.TestonomialUpdate);

module.exports = router;
