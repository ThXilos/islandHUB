const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator");
const auth = require("../../middleware/auth");
const { populate } = require("../../models/Profile");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
//@route    Get api/profile/me
//@desc     get current users profile by id in token.
//@access   Private.
router.get("/me",auth, async (req,res) => {
    try{
        const profile = await Profile.findOne({user:req.user.id})
        .populate("user",["name","avatar"]);

        if(!profile){
            return res.status(400).json({msg:"There is no profile for this user"});
        }
        res.json(profile);

    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});
//@route    Post api/profile
//@desc     Creat or update user profile.
//@access   Private.
router.post("/", [auth, [
    check("mainJobInterest","This field is required")
    .not().isEmpty()
]], async(req,res) => {
const errors = validationResult(req);
if (!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
}
const {
    mainJobInterest,
    bio,
    experience,
    facebook,
    instagram
} = req.body;

//Build the profile object
const profileFields  = {};
    profileFields.user = req.user.id;
    if (mainJobInterest) profileFields.mainJobInterest = mainJobInterest;
    if (bio) profileFields.bio = bio;
    if (experience) profileFields.experience = experience;
//Build social object
profileFields.social = {}
if (facebook) profileFields.social.facebook = facebook;
if (instagram) profileFields.social.instagram = instagram;
try{
    let profile = await Profile.findOne({user: req.user.id});
    if (profile){
        //Update
        profile = await Profile.findOneAndUpdate(
            {user: req.user.id},
            {$set: profileFields},
            {new: true}
        );
        return res.json(profile);
    }
        //Create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
}catch(err){
    console.error(err.message);
    res.status(500).send("Server Error");
}});
//@route    Get api/profile
//@desc     get all profiles
//@access   Public.
router.get("/", async(req,res) =>{
try {
    const profiles = await Profile
    .find()
    .populate("user",["name","avatar"]);
    res.json(profiles);
} catch (err) {
console.error(err.message);
res.status(500).send("Server Error");    
}
});
//@route    Get api/profile/user/:user_id
//@desc     get profile by user id.
//@access   Public.
router.get("/user/:user_id", async(req,res) =>{
    try {
        //Singular profile.
        const profile = await Profile
        .findOne({user: req.params.user_id})
        .populate("user",["name","avatar"]);
        if(!profile) return res.status(400).json({msg:'Profile not found.'})
        res.json(profile);
    } catch (err) {
    console.error(err.message);
    if(err.kind === "ObjectId"){
        return res.status(400).json({msg:'Profile not found.'})  
    }
    res.status(500).send("Server Error");    
    }
    });
//@route    DELETE api/profile
//@desc     delete profile, user & posts.
//@access   Private.
router.delete("/", auth, async(req,res) =>{
    try {
        //@todo - remove users posts (in the future.)
        //remove profile.
        await Profile.findOneAndRemove({ user: req.user.id});
        //remove user.
        await User.findOneAndRemove({ _id: req.user.id});
        res.json({msg:"User removed."});
    } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");    
    }
    });
//@route    PUT api/profile/experience
//@desc     add exp to profile.
//@access   Private.
router.put("/experience",[auth, [
    check("title","Title is required").not().isEmpty(),
    check("expLvl","Experience level is required").not().isEmpty()
]], async (req,res) =>{
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
}
const {title,expLvl} = req.body;
const newExp = {title,expLvl}
try{
const profile = await Profile.findOne({user: req.user.id});
//pushing on to the experience Array.
profile.experience.unshift(newExp);
await profile.save();
res.json(profile);
}catch(err){
console.error(err.message);
res.status(500).send("Server Error");    
}
});
//@route    DELETE api/profile/experience/:exp_id
//@desc     delete exp from profile.
//@access   Private.
router.delete("/experience/:exp_id", auth, async (req,res) =>{
    try{
    const profile = await Profile.findOne({user: req.user.id});
    //Get remove index
    const removeIndex = profile.experience
    .map(item => item.id)
    .indexOf(req.params.exp_id);
    
    profile.experience.splice(removeIndex, 1);
    
    await profile.save();
    res.json(profile);

    }catch(err){
    console.error(err.message);
    res.status(500).send("Server Error"); 
    }
})
//@route    PUT api/profiles/bump/:id
//@desc     bump a post
//@access   Private.
router.put("/bump/:id", auth, async(req,res)=>{
    try{
        const profile = await Profile.findById(req.params.id);
        //Check if profile already bumped.
        if(profile.bumps.filter(bump => 
            bump.user.toString() === req.user.id).length > 0){
            return res.status(400).json({msg:"You already bumped that user."});
        }
        profile.bumps.unshift({user: req.user.id});
        await profile.save();
        res.json(profile.bumps);

    }catch(err){
        console.error(err.message);
        res.status(500).send("Not working"); 
    }
});
//@route    PUT api/profiles/bump/:id
//@desc     Unbump a post
//@access   Private.
router.put("/unbump/:id", auth, async(req,res)=>{
    try{
        const profile = await Profile.findById(req.params.id);
        //Check if profile already bumped.
        if(profile.bumps.filter(bump => 
            bump.user.toString() === req.user.id).length === 0){
            return res.status(400).json({msg:"You havent bumped that user."});
        }

        //Get remove index
        const removeIndex = profile.bumps.map(bump => bump.user.toString())
        .indexOf(req.user.id);
        profile.bumps.splice(removeIndex, 1);
        await profile.save();
        res.json(profile.bumps);

    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error"); 
    }
});



module.exports = router;