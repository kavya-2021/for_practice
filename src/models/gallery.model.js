const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    user_id : {type: mongoose.Schema.Types.ObjectId,ref:"user",required: true},
    images_urls : [ {type : String,required: true}]
},{
    versionKey : false,
    timestamps : true
});
module.exports = mongoose.model("gallery",gallerySchema);

