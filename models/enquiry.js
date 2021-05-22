const mongoose = require('mongoose');

const Enquiry = mongoose.Schema({
    firstname:{
        type: String,
        trim: true
    },
    lastname:{
        type: String,
        trim: true
    },
    email:{
        type: String,
        trim: true
    },
    categoryname:{
        type: String,
        trim: true
    },
    mbileNo:{
        type: Number,
        trim: true
    },
    status:{
        type: String,
        trim: true,
        default: 'Pandding'
    },
    comment:{
        type: String,
        trim: true
    },
    date:{
        type: Date,
        // default: new Date("<YYYY-mm-dd>")
        default: Date.now()
    }
});

module.exports = mongoose.model('Enquiry',Enquiry)