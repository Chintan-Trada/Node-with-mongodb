const mongoose = require('mongoose')

const Portfolio = mongoose.Schema({
    projectName: {
        type: String,
        trim: true,
        // minlength: 5,
        // maxlength: 50
    },
    projectCategory: {
        type: String,
        trim: true,
        // minlength: 5,
        // maxlength: 50
    },
    discription:{
        type: String,
        trim: true,
        // minlength: 5,
        // maxlength: 50
    },
    image:
    {
        data: Buffer,
        contentType: String
    },
    date:{
        type: Date,
        default: Date.now()
    },
    // image:{
    //     type: Fi,
    //     required: true
    // }
});

module.exports =  mongoose.model("Portfolio", Portfolio)