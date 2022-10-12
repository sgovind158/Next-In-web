const nodeMailer = require("nodemailer")

const sendEmail = async (options)=>{
  //  console.log("sendEmail",options)
    const transporter = nodeMailer.createTransport({
        host : process.env.SMPT_HOST,
        port : process.env.SMPT_PORT,
        service:process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD
        },
    });
// console.log(transporter,"transporter")
    const mailOptions = {
        from : process.env.SMPT_MAIL,
        to : options.email,
        subject : options.subject,
        text : options.message
    }
  // console.log(mailOptions,"mailOptions")
  console.log("my res1")
 let res=   await transporter.sendMail(mailOptions);
console.log(res,"my res2")

}


module.exports = sendEmail;