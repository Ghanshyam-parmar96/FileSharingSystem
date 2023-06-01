const mongoose = require("mongoose");


const fileSchema = new mongoose.Schema({
    MyFile : {
        type : String,
    }
});

const MyFile = mongoose.model("files", fileSchema);

module.exports = MyFile;