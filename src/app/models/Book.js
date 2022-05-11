const mongoose = require('mongoose');
const Schema = mongoose.Schema
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug)
const Book = new Schema ({
    bookName : {type : String, maxlength : 255, required : true},
    description : {type : String},
    price : {type: String},
    image : {type : String},
    slug: { type: String, slug: 'bookName', unique : true },
    authorName : {type : String},
    raiing: {type: Number},
    deletedAt : {type : Date}
},{
    timestamps : true,
})

module.exports = mongoose.model('Book', Book)