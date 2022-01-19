const mongoose = require('mongoose');

module.exports = () => {
    return mongoose.connect("mongodb+srv://kavya_047:kavya_047@cluster0.e2jsl.mongodb.net/file_Uploads_Assign");
}