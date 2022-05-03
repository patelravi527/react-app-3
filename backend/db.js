const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/reactapp3?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

const connectToMongo = () =>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Sucseesfully Connected");
    })
}

module.exports = connectToMongo; 