const router = require("express").Router();
const uploadFile = require("../models/uploadFiles");

router.get("/:uuid" , async (req, res) => {
    try {
        const file = await uploadFile.findOne({uuid : req.params.uuid});
        const {MyFile, uuid, path, size, createdAt} = file;
        res.render("download", {
            MyFile, size, links: `${process.env.DOMAIN_NAME}/files/download/${uuid}`
        });        
    } catch (error) {
        res.render("download",{
            error,
        })
    }
})

router.get("/download/:uuid", async (req, res) => {
    try {
        const file = await uploadFile.findOne({uuid : req.params.uuid});    
        res.download(file.path);   
    } catch (error) {
        res.render("download",{
            error,
        })
    }

})

module.exports = router;