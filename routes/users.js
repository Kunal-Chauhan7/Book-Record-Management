const express = require('express');
const {users} = require('../data/users.json');

const router = express.Router();

/**
 * Route :- /users
 * method :- get
 * Decription :- get all the users 
 * Access :- Public
 * parameters :- none
 */

router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: users,
    })
});


/**
 * Route :- /users/:id
 * method :- GET
 * Decription :- get the single user by id
 * Access :- Public
 * parameters :- id
 */

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((element) => element.id === id);
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
});

/**
 * Route :- /users
 * method :- POST
 * Decription :- add new user 
 * Access :- Public
 * parameters :- none
 */

router.post('/', (req, res) => {
    const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;
    const user = users.find((element) => element.id === id);

    if (user) {
        res.status(404).json({
            success: false,
            message: "User already Exist with this id",
        });
    }
    else {
        users.push({
            id,
            name,
            surname,
            email,
            subscriptionType,
            subscriptionDate,
        });
        res.status(201).json({
            success: true,
            data: users,
        })
    }
});

/**
 * Route :- /users/:id
 * method :- PUT
 * Decription :- Updating user data 
 * Access :- Public
 * parameters :- id
 */

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const user = users.find((each) => each.id === id);

    if (!user)
        return res.status(404).json({ success: false, message: "User not found" });

    const updatedUser = users.map((each) => {
        if (each.id === id) {
            return {
                ...each,
                ...data,
            };
        }
        return each;
    });


    return res.status(200).json({
        success: true,
        data: updatedUser,
        });
    });


    /**
    * Route :- /users/:id
    * method :- PUT
    * Decription :- Updating user data 
    * Access :- Public
    * parameters :- id
    */

        router.delete('/:id',(req,res)=>{
            const {id} = req.params;
            const user = users.find((element)=> element.id===id);
    
            if(!user){
                return res.status(404).json({
                    success:false,
                    message:"user trying to delete not found"
                });
            }
                const index_to_del = users.indexOf(user);
                users.splice(index_to_del,1);
                return res.status(200).json({
                    success:true,
                    data : users
                });
            });

/**
    * Route :- /users/subscription-details/:id
    * method :- GET
    * Decription :- Get all user subscription details 
    * Access :- Public
    * parameters :- id
    */

router.get('/subscription-details/:id',(req,res)=>{
    const {id} = req.params;

    const user = users.find((each)=>each.id === id);

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
});

module.exports = router;
