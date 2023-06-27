const express = require('express');
const {users} = require('../data/users.json');
const { getallusers, singleUserById, deleteUser, updateUserById, CreateNewUser, getSubscriptionDetailsById } = require('../controllers/User-controller');
const router = express.Router();

/**
 * Route :- /users
 * method :- get
 * Decription :- get all the users 
 * Access :- Public
 * parameters :- none
 */

router.get('/',getallusers);


/**
 * Route :- /users/:id
 * method :- GET
 * Decription :- get the single user by id
 * Access :- Public
 * parameters :- id
 */

router.get("/:id", singleUserById);

/**
 * Route :- /users
 * method :- POST
 * Decription :- add new user 
 * Access :- Public
 * parameters :- none
 */

router.post('/', CreateNewUser);

/**
 * Route :- /users/:id
 * method :- PUT
 * Decription :- Updating user data 
 * Access :- Public
 * parameters :- id
 */

router.put("/:id",updateUserById);


    /**
    * Route :- /users/:id
    * method :- PUT
    * Decription :- Updating user data 
    * Access :- Public
    * parameters :- id
    */

        router.delete('/:id',deleteUser);

/** 
    * Route :- /users/subscription-details/:id
    * method :- GET
    * Decription :- Get all user subscription details 
    * Access :- Public
    * parameters :- id
    */

router.get('/subscription-details/:id',getSubscriptionDetailsById);

module.exports = router;
