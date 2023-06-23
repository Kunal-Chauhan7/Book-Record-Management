const { mongoose } = require("mongoose");
const moongoose = require("mongoose");
function Dbconnection() {
    const DB_URL = process.env.MONGO_URI;

    moongoose.connect(DB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    });
    
    const db = mongoose.connection;
    db.on("error",console.error.bind(console,"Connection error"));
    db.once("open",function(){
        console.log("Db Connected...");
    });
}

module.exports = Dbconnection;