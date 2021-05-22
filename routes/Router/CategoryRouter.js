let express = require("express");
let router = express.Router();

const Authentication = require('../../middlerware/authentication');

const CategoryController = require('../../controller/CategoryController');

//Category
router.get('/category', Authentication.verifyJWT, CategoryController.Category);
router.post('/category', Authentication.verifyJWT, CategoryController.CategoryPost);
router.delete('/category', Authentication.verifyJWT, CategoryController.CategoryMultipleDelete);
router.get('/category/:id', Authentication.verifyJWT, CategoryController.CategoryDelete);

//Category-view
router.get('/category-view', Authentication.verifyJWT, CategoryController.CategoryView);

//Category-edit
router.get('/category-edit',Authentication.verifyJWT, CategoryController.CategoryEdit);
router.post('/category-edit', Authentication.verifyJWT, CategoryController.CategoryUpdate);


module.exports = router;
