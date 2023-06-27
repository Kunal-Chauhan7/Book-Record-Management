const {UserModel , BookModel} = require('../models/index');
const userModel = require('../models/user-model');

exports.getallusers = async (req, res) => {
    const users = await UserModel.find();

    if(users.length === 0){
        res.status(400).json({
            success: false,
            message : "No user found",
        });
    }

    res.status(200).json({
        success: true,
        data: users,
    })
};

exports.singleUserById = async (req, res) => {
    const { id } = req.params;
    const user = await userModel.findById({_id:id})
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "user not found",
        });
    }
    return res.status(200).json({
        success: true,
        data: user,
    });
};

exports.CreateNewUser = async (req, res) => {
    const {name, surname, email, subscriptionType, subscriptionDate } = req.body;
    
    const newUser = await userModel.create({
        name,
        surname, 
        email, 
        subscriptionType, 
        subscriptionDate,
    });

        res.status(201).json({
            success: true,
            data: newUser,
        });
};

exports.updateUserById = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const UpdatedUserData = await userModel.findOneAndUpdate({
        _id:id,
    },{
        $set:{
            ...data,
        }
    },{
        new:true,
    }) 

    if (!UpdatedUserData)
        return res.status(404).json({ success: false, message: "User not found" });


    return res.status(200).json({
        success: true,
        data: UpdatedUserData,
        });
    };

exports.deleteUser = async (req,res)=>{
    const {id} = req.params;
    const user = await UserModel.deleteOne({
        _id:id,
    })

    if(!user){
        return res.status(404).json({
            success:false,
            message:"user trying to delete not found"
        });
    }
    
    return res.status(404).json({success : true , message : "User deleted"});
};

exports.getSubscriptionDetailsById = async (req,res)=>{
    const {id} = req.params;

    const user = await userModel.findById({id});  

    if (!user) {
        return res.status(404).json({
            success:false,
            message:"user not found",
        });
    }

    const getDateInDays = (data = "") => {
        let date;
        if (data === ""){
            // getting the current date
            date = new Date();
        } else {
            // gertting date on data var
            date = new Date(data);
        }
        let days = Math.floor(date/(1000*60*60*24));
        return days;
    };

    const getSubscriptionType = (date) => {
        if (user.subscriptionType === "basic"){
            date = date + 90;
        }
        else if(user.subscriptionType === "standard"){
            date = date + 180;
        }
        else if(user.subscriptionType === "premium"){
            date = date + 365;
        }
        return date;
    };
    let returndate = getDateInDays(user.returnDate);
    let currentdate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionexpire = getSubscriptionType(subscriptionDate);
    
    const data = {
        ...user,
        subscriptionexpired : subscriptionexpire < currentdate,
        daysleftforExpiration:
            subscriptionexpire <= currentdate ? 0 : subscriptionDate - currentdate,
        fine:
        returndate < currentdate ? subscriptionexpire <= currentdate ? 200 :100 :0, 
    };


    res.status(200).json({
        success:true,
        data: data
    });
};
