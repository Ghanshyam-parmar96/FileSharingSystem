const express = require("express");
const multer = require("multer");
const path = require("path");
const uploadFile = require("../models/uploadFiles");
const { v4: uuidv4 } = require('uuid');



const rout = express.Router();


const maxUploadSize = 104857600;


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./uploads`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${Math.floor(Math.random()*10000000000000)}${path.extname(file.originalname)}`;
    cb(null, fileName);
  }
});
  
const upload = multer({ 
  storage: storage,
  limits: { fileSize: maxUploadSize }
}).single("MyFile");


rout.post("/",  async (req, res) => {

  upload( req, res, async (err) => {
    if (err){
      res.status(400).json({err : "file is larger"});
    } else {
      const fileName = new uploadFile({
        MyFile : req.file.filename,
        uuid : uuidv4(),
        path : req.file.path,
        size : req.file.size,
      })

      const response = await fileName.save();
      res.status(201).json({file : `${process.env.DOMAIN_NAME}/files/${response.uuid}`})

    }
    
  })
  
})





module.exports = rout;