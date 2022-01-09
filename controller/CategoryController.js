const User = require('../models/user');
const Category = require('../models/category');
const { categoryValidation } = require('../validation/validation');

exports.Category = (req, res) => {
  const id = req.user._id
  Category.find({})
    .then((category) => {
      User.find({ _id: id })
        .then((profile) => {
          res.render('category', { category: category, profile: profile });
        }).catch((err) => {
          console.log(err.message)
        });
    }).catch((err) => {
      console.log(err.message)
    });
};

exports.CategoryPost = (req, res) => {
  console.log("Body", req.body);
  const { error } = categoryValidation(req.body);
  if (error) {
    Category.find({})
      .then((category) => {
        if (error.details[0].context.key == 'categoryname') {
          console.log("Error 1")
          console.log('error', error.details[0])
          var err1 = error.details[0].message;
          return res.render('category', {
            error1: err1,
            values: req.body,
            category: category
          });
        }
        if (error.details[0].context.key == 'description') {
          console.log("Error 2")
          console.log('error', error.details[0])
          var err1 = error.details[0].message;
          return res.render('category', {
            error2: err1,
            values: req.body,
            category: category
          });
        }
      }).catch((err) => {
        console.log(err.message)
      });
  }
  else {
    var data = {
      categoryname: req.body.categoryname,
      description: req.body.description
    }
    Category.create(data)
      .then((category) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.redirect('category')
      }, (err) => {
        res.json(err.message);
        console.log(err.message);
      })
      .catch((err) => {
        res.json(err.message);
        console.log(err.message);
      });
  }
};

exports.CategoryDelete = (req, res) => {
  console.log("Delete", req.params.id);
  const id = req.params.id
  Category.findByIdAndDelete({ _id: id })
    .then(category => {
      res.redirect('/category');
      console.log('Delete', category);
    })
};

exports.CategoryView = (req, res) => {
  console.log(req.query.id)
  Category.find({ _id: req.query.id })
    .then((category) => {
      res.render('category-view', { category: category });
    }).catch((err) => {
      console.log(err.message)
    });
};

exports.CategoryEdit = (req, res) => {
  Category.find({ _id: req.query.id })
    .then((category) => {
      res.render('category-edit', { category: category });
    }).catch((err) => {
      console.log(err.message)
    });
};

exports.CategoryUpdate = (req, res) => {
  var data = {
    categoryname: req.body.categoryname,
    description: req.body.description
  }
  Category.findByIdAndUpdate({ _id: req.query.id }, { $set: data }, { new: true })
    .then((category) => {
      res.redirect('category');
    }).catch((err) => {
      console.log(err.message)
    });
};

exports.CategoryMultipleDelete = (req, res) => {
  Category.deleteMany({ _id: { $in: req.body.id } }, { new: true })
    .then((category1) => {
      console.log(category1);
      Category.find({})
        .then((category) => {
          res.json(category);
        }).catch((err) => {
          console.log(err.message)
        });
    }, err => console.log(err.message)).catch((err) => {
      console.log(err.message)
    });
}
