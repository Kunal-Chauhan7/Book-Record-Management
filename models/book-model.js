const moongoose = require("mongoose");
const schema = moongoose.Schema;
const bookSchema = new schema({
    name:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    genre:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    publisher:{
        type:String,
        required:true,
    },
},
{
    timestamps : true,
}
);

module.exports = moongoose.model("Book",bookSchema);