const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var promotionSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    label : {
        type : String,
        required : true,
        default : ''
    },
    price : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true
    },
    featured : {
        type : Boolean,
        required : true
    },
});

var Promotions = mongoose.model('Promotions', promotionSchema);

module.exports = Promotions;