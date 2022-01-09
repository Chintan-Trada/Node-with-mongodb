var fs = require('fs');
var path = require('path');
var multer = require('multer');

const User = require('../models/user');
const Testonomial = require('../models/testnomial');
const { TestnomialValidation } = require('../validation/validation');
const { type } = require('os');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

var upload = multer({ storage: storage }).array('image', 10);

exports.Testonomial = (req, res) => {
  const id = req.user._id

  Testonomial.find({})
    .then((testnomial) => {
      User.find({ _id: id })
        .then((profile) => {
          res.render('testnomial', { testnomial: testnomial, profile: profile });
        }).catch((err) => {
          console.log(err.message)
        });
    }).catch((err) => {
      console.log(err.message)
    });
};

exports.TestonomialPost = (req, res) => {
  upload(req, res, (err) => {
    console.log(req.body);
    if (err) {
      return res.end("Error uploading file.");
    }
    else {
      const { error } = TestnomialValidation(req.body);
      if (error) {
        Testonomial.find({})
          .then((testnomial) => {
            if (error.details[0].context.key == 'clientName') {
              console.log('error', error.details[0])
              var err1 = error.details[0].message;
              return res.render('testnomial', {
                error1: err1,
                values: req.body,
                testnomial: testnomial
              });
            }
            if (error.details[0].context.key == 'feedback') {
              console.log('error', error.details[0])
              var err1 = error.details[0].message;
              return res.render('testnomial', {
                error2: err1,
                values: req.body,
                testnomial: testnomial
              });
            }
          }).catch((err) => {
            console.log(err.message)
          });
      }
      else {
        var img = [];
        var type= [];
        for(var i=0; i< req.files.length; i++){
          img.push(Buffer(fs.readFileSync(path.join(__dirname + '/../public/images/' + req.files[i].filename))));
          type.push(req.files[i].mimetype);
        }
        console.log(img)
        console.log(type)
        var data1 = {
          clientName: req.body.clientName,
          feedback: req.body.feedback,
          image: {
            data: img,
            contentType: type
          }
        }
        Testonomial.create(data1)
          .then((testonomial) => {
            res.redirect('testnomial');
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
}

exports.TestonomialDelete = (req, res) => {
  console.log("Delete", req.params.id);
  const id = req.params.id
  Testonomial.findByIdAndDelete({ _id: id })
    .then(testnomial => {

      res.redirect('/testnomial');
      console.log('Delete', testnomial);
    })
};

exports.TestonomialView = (req, res) => {
  Testonomial.find({ _id: req.query.id })
    .then((testnomial) => {
      res.render('testnomial-view', { testnomial: testnomial });
    }).catch((err) => {
      console.log(err.message)
    });
  // res.render('testnomial-view')
};

exports.TestonomialEdit = (req, res) => {
  Testonomial.find({ _id: req.query.id })
    .then((testnomial) => {

      res.render('testnomial-edit', { testnomial: testnomial });
    }).catch((err) => {
      console.log(err.message)
    });
};

exports.TestonomialUpdate = (req, res) => {
  var data = {
    clientName: req.body.clientName,
    feedback: req.body.feedback
  }
  Testonomial.findByIdAndUpdate({ _id: req.query.id }, { $set: data }, { new: true })
    .then((testnomial) => {

      res.redirect('testnomial');
    }).catch((err) => {
      console.log(err.message)
    });
};

exports.TestonomialMultipleDelete = (req,res) => {
  Testonomial.deleteMany({_id: {$in: req.body.id}}, {new: true})
  .then((testnomial1) => {
    console.log(testnomial1);
    Testonomial.find({})
    .then((testnomial) => {
      res.json(testnomial);
    }).catch((err) => {
      console.log(err.message)
    });
  },err => console.log(err.message)).catch((err) => {
    console.log(err.message)
  });
}
