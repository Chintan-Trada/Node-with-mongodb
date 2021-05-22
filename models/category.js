const mongoose = require('mongoose')

const Category = mongoose.Schema({
    categoryname: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    date:{
        type: Date,
        default: Date.now("<YYYY-mm-dd>")
    }
});

module.exports =  mongoose.model("Category", Category)
