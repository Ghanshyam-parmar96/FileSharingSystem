const mongoose = require("mongoose");


const fileSchema = new mongoose.Schema({
    MyFile : {
        type : String,
        required: true,
    },
    uuid : {
        type : String,
        required: true,
    },
    path : {
        type : String,
        required: true,
    },
    size : {
        type : String,
        required: true,
    }
}, {timestamps: true});

const MyFile = mongoose.model("files", fileSchema);

module.exports = MyFile;