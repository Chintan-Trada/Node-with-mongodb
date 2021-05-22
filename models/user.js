const mongoose = require('mongoose');

const User = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        // minlength: 5,
        // maxlength: 50
    },
    password: {
        type: String,
        required: true,
        trim: true,
        // minlength: 6,
        // maxlength: 50
    },
    firstname:{
        type: String,
        required: true,
        trim: true,
        // minlength: 5,
        // maxlength: 50
    },
    lastname:{
        type: String,
        required: true,
        trim: true,
        // minlength: 5,
        // maxlength: 50
    },
    email:{
        type: String,
        required: true,
        trim: true,
        // minlength: 5,
        // maxlength: 50
    },
    contect:{
        type: Number,
        required: true,
        trim: true,
        // minlength: 5,
        // maxlength: 50
    },
    image:
    {
        data: Buffer,
        contentType: String
    },
    token:{
        type: String
    }
});

module.exports =  mongoose.model("User", User)