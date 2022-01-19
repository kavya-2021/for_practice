const express = require('express');

const User = require('../models/user.model');

const  upload = require("../middlewares/upload");

const router = express.Router();

var fs = require('fs');

router.get('/',async (req, res) => {
    try {
        let users = await User.find().lean().exec();
        return res.status(200).send(users);
    }catch(err){
        return res.status(500).send(err.message)
    }
});

router.get('/:id',async (req, res) => {
    try {
        let user = await User.findById(req.params.id).lean().exec();
        return res.status(200).send(user);
    }catch(err){
        return res.status(500).send(err.message)
    }
});

router.post("/single",upload.single("profile_pic"),async (req, res) => {
    try {
        let user = await User.create({
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            profile_pic : req.file.path
        });
        return res.status(201).send(user);
    }catch(err){
        return res.status(500).send(err.message)
    }
});


router.patch('/:id/single',upload.single("profile_pic"),async (req, res) => {
      try {
        let user = await User.findById(req.params.id).lean().exec();
        fs.unlink(user.profile_pic, function (err) {
            if (err) return err;
            console.log('File deleted!');
          });

        user = await User.findByIdAndUpdate(req.params.id,{
            profile_pic : req.file.path
        },{new:true});
        return res.status(201).send(user);
    }catch(err){
        return res.status(500).send(err.message)
    }
});

router.delete('/:id',async (req, res) => {
    try {
        let user = await User.findById(req.params.id).lean().exec();
        fs.unlink(user.profile_pic, function (err) {
            if (err) return err;
            console.log('File deleted!');
          });

        user = await User.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(user);
    }catch(err){
        return res.status(500).send(err.message)
    }
});
module.exports = router;