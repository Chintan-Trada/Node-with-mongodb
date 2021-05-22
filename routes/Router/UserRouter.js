let express = require("express");
let router = express.Router();
var multer = require('multer');

const UserController = require('../../controller/UserController');
const Authentication = require('../../middlerware/authentication');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
  });
  
  var upload = multer({ storage: storage });

//Signup
router.get('/signup', UserController.SignupGet)
router.post('/signup',upload.single('image'),  UserController.Signup);

//Login
router.get('/', UserController.Start)
router.get('/login', UserController.Login);
router.post('/login', UserController.LoginUser);

//Forgot Password
router.get('/forgot-password', UserController.ForgotPassword);
router.post('/forgot-password', UserController.ForgotPasswordGet);

//Confirm Password
router.get('/confirm-password', UserController.ConfirmPassword);
router.post('/confirm-password', UserController.ConfirmPasswordUpdate);

//Logout
router.get('/logout', UserController.Logout);

//Index
router.get('/index', Authentication.verifyJWT,  UserController.Index);

//Change Password
router.get('/change-password', Authentication.verifyJWT, UserController.ChangePassword);
router.post('/change-password',Authentication.verifyJWT,  UserController.ChangePasswordUpdate);

//Profile
router.get('/profile', Authentication.verifyJWT, UserController.Profile);




module.exports = router;
