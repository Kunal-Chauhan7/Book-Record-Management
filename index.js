const express = require('express');

const { users } = require('./data/users.json')

const app = express();

const port = 7770;

app.use(express.json());

/**
 * Route :- /users
 * method :- get
 * Decription :- get all the users 
 * Access :- Public
 * parameters :- none
 */

app.get('/users', (req, res) => {
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

app.get("/users/:id", (req, res) => {
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

app.post('/users', (req, res) => {
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

app.put('/users/:id',(req,res)=>{
    const {id} = req.params;
    const {data} = req.body;
    const user = users.find((element)=>element.id === id);
    if(!user){
        res.status(404).json({
            success:false,
            message:"User Not found"
        });
    }
    else{
        const UpdatedUser = users.map((each)=>{
            if(each.id === id){
                return{}
            }
            return each;
        });
        res.sendStatus(202).json({
            success:true,
            data:UpdatedUser,
        });
    }
});


app.get('/', (req, res) => {
    res.status(200);
    res.send({
        "message": "Server is working great"
    });
});

app.get('*', (req, res) => {
    res.status(500).json({
        "message": "Route yet to be made"
    });
});

app.listen(port, () => {
    console.log("server is running on the 7770 port");
});