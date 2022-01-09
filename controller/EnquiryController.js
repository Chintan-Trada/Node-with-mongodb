var fs = require('fs');
var path = require('path');

const User = require('../models/user');
const Enquiry = require('../models/enquiry');

exports.Enquiry = (req, res) => {
  const id = req.user._id
  Enquiry.find({})
    .then((enquiry) => {
      User.find({ _id: id })
        .then((profile) => {
          res.render('enquiry', { enquiry: enquiry, profile: profile });
        }).catch((err) => {
          console.log(err.message)
        });

    }).catch((err) => {
      console.log(err.message)
    });
};

exports.EnquiryPost = (req, res) => {
  var data = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    mbileNo: req.body.mbileNo,
    comment: req.body.comment,
    data: req.body
  };

  Enquiry.create(data)
    .then((enquiry) => {
      res.redirect('enquiry');
    }).catch((err) => {
      console.log(err.message)
    });

};

exports.EnquiryView = (req, res) => {
  Enquiry.find({ _id: req.query.id })
    .then((enquiry) => {
      res.render('enquiry-view', { enquiry: enquiry });
    }).catch((err) => {
      console.log(err.message)
    });
};

exports.EnquiryEdit = (req, res) => {
  Enquiry.find({ _id: req.query.id })
    .then((enquiry) => {
      res.render('enquiry-edit', { enquiry: enquiry });
    }).catch((err) => {
      console.log(err.message)
    });
};

exports.EnquiryUpdate = (req, res) => {
  var data = {
    comment: req.body.comment,
    status: req.body.status
  }
  Enquiry.findByIdAndUpdate({ _id: req.query.id }, { $set: data }, { new: true })
    .then((enquiry) => {
      res.redirect('enquiry');
    }).catch((err) => {
      console.log(err.message)
    });
};

exports.EnquiryDelete = (req, res) => {
  const id = req.params.id
  Enquiry.findByIdAndDelete({ _id: id })
    .then(enquiry => {
      res.redirect('/enquiry');
      console.log('Delete', enquiry);
    })
};

exports.EnquiryMultipleDelete = (req, res) => {
  Enquiry.deleteMany({ _id: { $in: req.body.id } }, { new: true })
    .then((enquiry1) => {
      console.log(enquiry1);
      Enquiry.find({})
        .then((enquiry) => {
          res.json(enquiry);
        }).catch((err) => {
          console.log(err.message)
        });
    }, err => console.log(err.message)).catch((err) => {
      console.log(err.message)
    });
}
