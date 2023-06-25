const moongoose = require("mongoose");
const schema = moongoose.Schema;
const UserSchema = new schema(
    {
        
        name:{
            type:String,
            required:true,
        },
        surname:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        issuedBook:{
            type:String,
            type:moongoose.Schema.Types.ObjectId,
            ref:"Book",
            required:false,
        },
        returnDate: {
            type:String,
            required:false,
        },
        subsriptionType:{
            type:String,
            required:true,
        },
        subsriptionDate:{
            type:String,
            required:true,
        },
    },
    {
    timestamps : true,
}
);

module.exports = moongoose.model("User",UserSchema);