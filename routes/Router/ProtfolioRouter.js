let express = require("express");
let router = express.Router();

const PortfolioController = require('../../controller/PortfolioController');
const Authentication = require('../../middlerware/authentication');



//Portfolio
router.get('/portfolio', Authentication.verifyJWT, PortfolioController.Portfolio);
router.post('/portfolio', Authentication.verifyJWT, PortfolioController.PortfolioPost);
router.delete('/portfolio', Authentication.verifyJWT, PortfolioController.PortfolioMultipleDelete);
router.get('/portfolio/:id', Authentication.verifyJWT, PortfolioController.PortfolioDelete);

//Portfolio-view
router.get('/portfolio-view', Authentication.verifyJWT, PortfolioController.PortfolioView);

//Portfolio-edit
router.get('/portfolio-edit', Authentication.verifyJWT, PortfolioController.PortfolioEdit);
router.post('/portfolio-edit',Authentication.verifyJWT, PortfolioController.PortfolioUpdate);

module.exports = router;
