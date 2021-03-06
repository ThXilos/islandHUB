const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoURI");

const connectDB = async () => {
 try{
    await mongoose.connect(db,{useFindAndModify:false,useCreateIndex:true, useUnifiedTopology: true, useNewUrlParser: true})
    console.log("Database connected.")
 }catch(err){
    console.error(err.message);
    process.exit(1);
 }   
}


module.exports = connectDB;