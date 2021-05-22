const mongoose = require('mongoose')

const Testonomial = mongoose.Schema({
    clientName: {
        type: String,
        trim: true,
        // minlength: 5,
        // maxlength: 50
    },
    feedback: {
        type: String,
        trim: true,
        // minlength: 5,
        // maxlength: 50
    },
    image:
    {
        data: Array,
        contentType: Array
    },
    date:{
        type: Date,
        default: Date.now()
    }
    // firstname:{
    //     type: String,
    //     required: true
    // }
});

module.exports =  mongoose.model("Testonomial", Testonomial)