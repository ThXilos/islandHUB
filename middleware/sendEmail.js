const nodemailer = require("nodemailer");
const { getMaxListeners } = require("../models/User");

module.exports = async function(userEmail,userName,userConfirmationCode){
const testAccount = await nodemailer.createTestAccount();
let transporter = nodemailer.createTransport({
    host:"smtp.ethereal.email",
    port: 587,
    secure: false,
    auth:{
        user: testAccount.user,
        pass: testAccount.pass
    }
});

let info = await transporter.sendMail({
   
    from:"hi@islandGo.gr",
    to: `${userEmail}`,
    subject:"Hello, please confirm account ✔",
    html:`
    <div>
    <h1>Email Confirmation</h1>
    <h2>Hello ${userName} </h2>
    <p>Thank you for registering. Please confirm your email by clicking the link</p>
    <a href = http://localhost:5000/api/auth/confirm/${userConfirmationCode}>Click here</a>
    </div>
    `
})

console.log("Message sent: %s", info.messageId);
// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

// Preview only available when sending through an Ethereal account
console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};


