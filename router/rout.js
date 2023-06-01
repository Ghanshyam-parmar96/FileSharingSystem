const express = require("express");
const multer = require("multer");
const path = require("path");
const uploadFile = require("../models/uploadFiles");


const rout = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads`));
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    }
});
  
const upload = multer({ storage: storage });


rout.post("/", upload.single("MyFile"), async (req, res) => {
    const fileName = await uploadFile.create({
        MyFile : `/uploads/${req.file.fieldname}`,
    })
    res.send({succes : "successfull send"});
})





module.exports = rout;