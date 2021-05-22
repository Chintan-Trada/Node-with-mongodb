var fs = require('fs');
var path = require('path');
var multer = require('multer');

const Portfolio = require('../models/protfolio');
const { PortfolioValidation } = require('../validation/validation');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

var upload = multer({ storage: storage }).single('image');


exports.Portfolio = (req, res) => {
  Portfolio.find({})
    .then((portfolio) => {
      res.render('portfolio', { portfolio: portfolio });
    }).catch((err) => {
      console.log(err.message)
    });
};

exports.PortfolioPost = (req, res) => {
  upload(req, res, (err) => {
    console.log(req.body);
    console.log(req.file);
    if (err) {
      return res.end("Error uploading file.");
    }
    else {
      console.log("Body", req.body);
      const { error } = PortfolioValidation(req.body);
      if (error) {
        Portfolio.find({})
          .then((portfolio) => {
            if (error.details[0].context.key == 'projectName') {
              console.log("Error 1")
              console.log('error', error.details[0])
              var err1 = error.details[0].message;
              return res.render('portfolio', {
                error1: err1,
                values: req.body,
                portfolio: portfolio
              });
            }
            if (error.details[0].context.key == 'projectCategory') {
              console.log("Error 2")
              console.log('error', error.details[0])
              var err1 = error.details[0].message;
              return res.render('portfolio', {
                error2: err1,
                values: req.body,
                portfolio: portfolio
              });
            }
            if (error.details[0].context.key == 'discription') {
              console.log("Error 3")
              console.log('error', error.details[0])
              var err1 = error.details[0].message;
              return res.render('portfolio', {
                error3: err1,
                values: req.body,
                portfolio: portfolio
              });
            }
          }).catch((err) => {
            console.log(err.message)
          });
      }
      else {
        var data1 = {
          projectName: req.body.projectName,
          projectCategory: req.body.projectCategory,
          discription: req.body.discription,
          image: {
            data: fs.readFileSync(path.join(__dirname + '/../public/images/' + req.file.filename)),
            contentType: 'image/png' || 'image/jpeg' || 'image/jpg'
          }
        }
        Portfolio.create(data1)
          .then((portfolio) => {

            res.redirect('portfolio');
          }, (err) => {
            res.json(err.message);
            console.log(err.message);
          })
          .catch((err) => {
            res.json(err.message);
            console.log(err.message);
          });
      }
    }
  });
};

exports.PortfolioDelete = (req, res) => {
  console.log("Delete", req.params.id);
  const id = req.params.id
  Portfolio.findByIdAndDelete({ _id: id })
    .then(portfolio => {
      res.redirect('/portfolio');
      console.log('Delete', portfolio);
    })
};

exports.PortfolioView = (req, res) => {
  Portfolio.find({ _id: req.query.id })
    .then((portfolio) => {

      res.render('portfolio-view', { portfolio: portfolio });
    }).catch((err) => {
      console.log(err.message)
    });
  // res.render('portfolio-view')
};

exports.PortfolioEdit = (req, res) => {
  Portfolio.find({ _id: req.query.id })
    .then((portfolio) => {

      res.render('portfolio-edit', { portfolio: portfolio });
    }).catch((err) => {
      console.log(err.message)
    });
};

exports.PortfolioUpdate = (req, res) => {
  var data = {
    projectName: req.body.projectName,
    projectCategory: req.body.projectCategory,
    discription: req.body.description
  }
  Portfolio.findByIdAndUpdate({ _id: req.query.id }, { $set: data }, { new: true })
    .then((portfolio) => {

      res.redirect('portfolio');
    }).catch((err) => {
      console.log(err.message)
    });
};

exports.PortfolioMultipleDelete = (req,res) => {
  Portfolio.deleteMany({_id: {$in: req.body.id}}, {new: true})
  .then((portfolio1) => {
    console.log(portfolio1);
    Portfolio.find({})
    .then((portfolio) => {
      res.json(portfolio);
    }).catch((err) => {
      console.log(err.message)
    });
  },err => console.log(err.message)).catch((err) => {
    console.log(err.message)
  });
}
