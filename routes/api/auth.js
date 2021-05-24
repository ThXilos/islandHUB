const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const {check, validationResult} = require("express-validator");
//@route    Get api/auth
//@desc     Test route
//@access Public
router.get("/", auth, async (req,res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});
//@route    POST api/auth
//@desc     Authenticate user & get token
//@access Public
router.post("/", [
    check("email","Please include a valide email").isEmail(),
    check("password","Password is required").exists()
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

 if (!user){
     res.status(400).json({errors:[{msg:"Invalid Credentials"}]});
 }
 
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
    return res.status(400).json({errors:[{ msg:"Invalid Credentials" }] });
}

if (user.status === "pending"){
    res.status(400).json({errors:[{msg:"You need to activate account. Check your email."}]});
}

//Return jsonwebtoken
const payload ={
    user:{
        id: user.id
    }
}

const token = user.confirmationCode = jwt.sign(payload, config.get("jwtToken"),{expiresIn: 36000},
(err, token) => {
    if (err) throw err;
    res.json({token});
});

}catch(err){
    console.error(err.message);
    res.status(500).send("Server Error")
}


});
//@route    GET api/auth/confirm/:confirmationCode
//@desc     Confirmation route
//@access Public
router.get("/confirm/:confirmationCode", 
async (req,res) => {
try{
//we access the data we send with req.body
//Finds the user with the confirmationCode = to params confirmationCode and sets status to Active.
let user = await User.findOneAndUpdate({confirmationCode: req.params.confirmationCode},{status:"Active"});

if (!user){
     res.status(400).json({errors:[{msg:"User not found"}]});
 }
 await user.save((err) =>{
    if (err) {res.status(500).send({msg: "Something went wrong."})}
    res.send({msg:"All done, user account activated."});
    //Redirect to login screen.
});

}catch(err){
    console.error(err.message);
    res.status(500).send("Server Error")
}
});


module.exports = router;