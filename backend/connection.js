const mongoose = require("mongoose");

async function connectDB() {  
  try {  
    await mongoose.connect("mongodb://127.0.0.1:27017/RealEstateApp", {  
      useNewUrlParser: true,  
      useUnifiedTopology: true  
    });  
    console.log("MongoDB Connected!");  
  } catch (error) {  
    console.error("MongoDB Connection Failed!", error);  
  }  
}  

module.exports = connectDB;
