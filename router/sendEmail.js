const rout = require("express").Router();
const uploadFile = require("../models/uploadFiles");

rout.post("/", async (req, res) => {
    const {uuid, emailFrom, emailTo} = req.body;

    if(!uuid || !emailFrom  || !emailTo ){
        return res.status(422).json({error : "All field are requied"});
    }

    try {
        const data = await uploadFile.findOne({uuid : uuid});     
        if (!data.sendExpired){
            return res.status(422).json({error : "You have already sent two time"});
        }else{
            
            // send data to dataBase 
            
            data.sender = emailFrom;
            data.receiver = emailTo;
            
            const response = await data.save();

            // send Mail

            const sendEmail = require("../services/emailService");
            const emailTemplate  = require("../services/emailTemplet");
            sendEmail({
                from : emailFrom,
                to : emailTo,
                subject : `inShare File Sharing`,
                text : `${emailFrom} send this file with you`,
                html : emailTemplate({
                    emailFrom : emailFrom,
                    downloadLink : `${process.env.DOMAIN_NAME}/files/${data.uuid}`,
                    size : parseInt(data.size/1000) + "Kb", 
                    expires : "24 hours",
                }),
            });


        }
    } catch (error) {
        return res.status(422).json({error : "file expired"});
    }
})




module.exports = rout;