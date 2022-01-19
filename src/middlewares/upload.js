const multer  = require('multer');

const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"../uploads"))
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname )
    }
  });

const fileFilter = (req, file, callback)=>{
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png") callback(null, true)
    else callback(null, false) 
}  

const upload = multer({
    storage: storage, 
    fileFilter : fileFilter , 
    limits : {
        fileSize : 1024 * 1024 * 5
    }
});
  
  module.exports = upload ;