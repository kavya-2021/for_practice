const express = require('express');

const { body, validationResult } = require("express-validator");

const Gallery = require('../models/gallery.model');

const User = require("../models/user.model");

const upload = require("../middlewares/upload");

const router = express.Router();

const fs = require('fs');

router.get('/',async (req, res) => {
    try {
        let gallery = await Gallery.find().populate({path:"user_id",select:{first_name:1,last_name:1,profile_pic:1}}).lean().exec();
        return res.status(200).send(gallery);
    }catch(err){
        return res.status(500).send(err.message)
    }
});


router.post("/single", 
       body("user_id").notEmpty().withMessage("User Id is required").custom(async (value) => {
       try {
          const user = await User.findById(value).lean().exec();
          if (!user) return Promise.reject("User does not exist");
          return true;
      } catch (err) { 
          console.log(err.message);
      }  
   }),
    upload.single("images_urls"),async (req, res) => {
    try {
        let gallery = await Gallery.create({
           user_id : req.body.user_id,
           images_urls : req.file.path 
        });
        return res.status(201).send(gallery);
    }catch(err){
        return res.status(500).send(err.message)
    }
});

router.post("/multiple", 
       body("user_id").notEmpty().withMessage("User Id is required").custom(async (value) => {
       try {
          const user = await User.findById(value).lean().exec();
          if (!user) return Promise.reject("User does not exist");
          return true;
      } catch (err) { 
          console.log(err.message);
      }  
   }),
   upload.array("images_urls",5),async (req, res) => {
    try {
        let filePath = req.files.map((file) => file.path);
 
        let gallery = await Gallery.create({
           user_id : req.body.user_id,
           images_urls : filePath 
        });
        return res.status(201).send(gallery);
    }catch(err){
        return res.status(500).send(err.message)
    }
});

router.patch('/:id/multiple',upload.array("images_urls",5),
async (req, res) => {
    try {
        let gallery = await Gallery.findById(req.params.id).lean().exec();
        for(let i = 0; i < gallery.images_urls.length; i++){
        fs.unlink(gallery.images_urls[i], function (err) {
            if (err) return err;
            console.log('File deleted!');
          });
        }
        let filePath = req.files.map((file) => file.path); 
        gallery = await Gallery.findByIdAndUpdate(req.params.id,{
            images_urls : filePath
        },{new:true});
        return res.status(201).send(gallery);

    }catch(err){
        return res.status(500).send(err.message)
    }
});

router.delete('/:id',async (req, res) => {
    try {
        let gallery = await Gallery.findById(req.params.id).lean().exec();
        for(let i = 0; i < gallery.images_urls.length; i++){
        fs.unlink(gallery.images_urls[i], function (err) {
            if (err) return err;
            console.log('File deleted!');
          });
        }

        gallery = await Gallery.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(gallery);
    }catch(err){
        return res.status(500).send(err.message)
    }
});
module.exports = router;