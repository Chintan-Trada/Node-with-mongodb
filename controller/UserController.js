var fs = require('fs');
var path = require('path');
const bcrypt = require('bcrypt')
const config = require('../middlerware/config')

const User = require('../models/user');
const Category = require('../models/category');
const Portfolio =require('../models/protfolio');
const Testonomial = require('../models/testnomial');
const Authenticate = require('../middlerware/authentication');



//Signup
exports.SignupGet = (req,res) => {
  res.render('signup')
};

exports.Signup = (req,res) => {
// bcrypt.hash(req.body.password, config.Salt_Round, (err, hashPassword) => {
//   if(err){
//     res.statusCode =500;
//     res.json(err.message);
//   }
//   else{
//     var data = {
//       username:req.body.username,
//       password:hashPassword,
//       firstname:req.body.firstname,
//       lastname:req.body.lastname,
//       email:req.body.email,
//       contect:req.body.contect,
//       image:{
//         data: fs.readFileSync(path.join(__dirname + '/../public/images/' + req.file.filename)),
//         contentType: 'image/png' || 'image/jpeg' || 'image/jpg'
//       }
//     }
//       User.create(data)
//       .then((user) => {
//           console.log("Dish Create:- " + user);
//               res.statusCode = 200;
//               res.setHeader('Content-Type', 'application/json');
//               res.json(user);
//       },(err) => {
//           res.json(err.message);
//           console.log(err.message);
//       })
//       .catch((err) => {
//           res.json(err.message);
//           console.log(err.message);
//       });
//   }
// })
  var data = {
    username:req.body.username,
    password:hashPassword,
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    email:req.body.email,
    contect:req.body.contect,
    image:{
      data: fs.readFileSync(path.join(__dirname + '/../public/images/' + req.file.filename)),
      contentType: 'image/png' || 'image/jpeg' || 'image/jpg'
    }
  }
    User.create(data)
    .then((user) => {
        console.log("Dish Create:- " + user);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user);
    },(err) => {
        res.json(err.message);
        console.log(err.message);
    })
    .catch((err) => {
        res.json(err.message);
        console.log(err.message);
    });
  
};

//Login
exports.Start = (req,res) => {
  res.redirect('login');
};

exports.Login = (req,res)  => {
    res.render('login', {message:''});
};

exports.LoginUser = (req, res) => {
    console.log('POST login');
    User.findOne({username: req.body.username})
    .then((user) => {
      // bcrypt.compare(req.body.password, user.password, (err, result) =>{
      //   if(err){

      //   }
      //   else if(result){
      //     res.statusCode = 200;
      //     res.setHeader('Content-Type', 'application/json');
      //     const token = Authenticate.getToken({_id: user._id});
      //     // const token = '9825622860';
      //     process.env.TOKEN = token;
      //     res.setHeader('Authorization', `Bearer ${process.env.TOKEN}`);
      //     console.log("Token",process.env.TOKEN)
      //     res.redirect('index');
          
      //     console.log("username",user.username);
      //   }
      //   else{
      //     res.statusCode = 400;
      // //   // res.render('login',{message:'Your credential does not match..!'});
      //   res.json({status: false, message:'Your credential does not match..!123'})
      //   }
      // })
      if(user.password === req.body.password){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        const token = Authenticate.getToken({_id: user._id});
        
        res.setHeader('Authorization', `Bearer ${token}`);
        console.log("Token",token);

        res.cookie('token', token, {
          expires: new Date(Date.now() + 3600000)
        });
        res.redirect('index');
         
        console.log("username",user.username);
      }
      else{
        res.statusCode = 400;
        res.render('login',{message:'Your credential does not match..!'});
      }
    }).catch((err) => {
      res.statusCode = 400;
      res.render('login',{message:'Your credential does not match..!'})
    });
};


//Index
exports.Index = (req,res) => {
  
  //Call Category
  Category.find({})
  .then((category) => {
    //Call Portfolio
    Portfolio.find({})
    .then((portfolio) => {
      //Call Testonomial
      Testonomial.find({})
      .then((testonomial) => {
        // res.json([category.length, portfolio.length, testonomial.length])
        res.render('index',{category:category.length, portfolio:portfolio.length, testonomial: testonomial.length});
      }).catch((err) => {
        console.error(err.message)
      }); 
      //End Testonomial   
    }).catch((err) => {
      console.error(err.message)
    });   
    //End Portfolio    
  }).catch((err) => {
    console.error(err.message)
  });
  //End Category
};


//Change Password
exports.ChangePassword = (req,res) => {
    res.render('change-password')
};

exports.ChangePasswordUpdate = (req,res) => {
  console.log(req.body);
  const id = req.user._id
    console.log("Profile", id);
    User.findOneAndUpdate({ _id: id }, {$set: {password: req.body.password}}, {new: true})
  .then((user) => {
    
    // res.json(user);
    res.redirect('index')
  }).catch((err) => {
    console.log(err)
  });
};

//Profile
exports.Profile = (req,res) => {
    const id = req.user._id
    console.log("Profile", id);
    User.find({ _id: id })
    .then((profile) => {
      // res.statusCode = 200;
      // res.setHeader('Content-Type', 'application/json');
      res.render('profile',{profile:profile});
      // res.json(profile)
    }).catch((err) => {
      console.log(err.message)  
    });
  // res.render('profile')
};

//Forgot Password
exports.ForgotPassword = (req,res) => {
    res.render('forgot-password')
};

exports.ForgotPasswordGet = (req,res) => {
    User.findOne({username: req.body.username})
    .then((user) => {
     
      res.render('confirm-password', {data: user});
    }).catch((err) => {
      console.log(err)
    });
};

//Confirm Pasword
exports.ConfirmPassword = (req,res) => {
    res.render('confirm-password')
};

exports.ConfirmPasswordUpdate = (req,res) => {
    User.findOneAndUpdate({username: req.body.username}, {$set: {password: req.body.password}}, {new: true})
    .then((user) => {
      
      res.redirect('/login');
    }).catch((err) => {
      console.log(err)
    });
};

exports.Logout = (req,res) => {
  res.clearCookie('token');
  res.redirect('/login')
}