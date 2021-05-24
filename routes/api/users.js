const express = require("express");
const config = require("config");
const router = express.Router();

const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const {check, validationResult} = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const sendEmail = require("../../middleware/sendEmail");



//@route    Get api/users
//@desc     Register User
//@access Public
router.post("/", [
    check("name","Name is required")
    .not()
    .isEmpty(),
    check("email","Please include a valide email").isEmail(),
    check("password","Please enter a password with 6 or more characters").isLength({min:6})
],
async (req,res) => {

const errors = validationResult(req);
if (!errors.isEmpty()){
    return res.status(400).json( { errors: errors.array() } )
}

const {name,email,password,isBussinesOwner,confirmationCode} = req.body;

try{
//we access the data we send with req.body
 let user = await User.findOne({email});

 if (user){
     res.status(400).json({errors:[{msg:"User already exists"}]});
 }else{

    console.log("after user check");
//Get users gravatar
 const avatar = gravatar.url(email,{
     s:"50",
     r:"pg",
     d:"mm"
 })

 user = new User({
    name,
    email,
    avatar,
    password,
    isBussinesOwner,
    confirmationCode

});

//Return jsonwebtoken
const payload ={
    user:{
        id: user.id
    }
}

const token = user.confirmationCode = jwt.sign(payload, config.get("jwtToken"),{expiresIn: 36000});

//Encrypt password
 const salt = await bcrypt.genSalt(10);

 user.password = await bcrypt.hash(password, salt);

//  Save user to DB
console.log("Saving user.")
 await user.save((err) =>{
     if (err) {res.status(500).send({msg: "something happend"})}
     res.send({token, msg:"Yeyyy, you have registered. Please check your email"});
     sendEmail(user.email,user.name,user.confirmationCode);
    
 });


}
 
}catch(err){
    console.log("this error");
    console.error(err.message);
    res.status(500).send("Server Error")
}


});


module.exports = router;