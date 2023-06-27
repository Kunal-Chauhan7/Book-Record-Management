const express = require('express');
const { books } = require('../data/books.json');
const {users} = require('../data/users.json');
const router = express.Router();
const { getAllBooks, getBookById, getAllIssuedBooks, updateBookByID, addNewBook, getSingleBookByname, getBookByName } = require('../controllers/Book-controller');


/**
 * Route :- /books
 * method :- GET
 * Decription :- get all the books 
 * Access :- Public
 * parameters :- none
*/

router.get('/', getAllBooks);

/**
 * Route :- /books/:id
 * method :- GET
 * Decription :- get the requested book specifed by id
 * Access :- Public
 * parameters :- id
*/

router.get('/getbook/:name',getBookByName);

/**
 * Route :- /books/:id
 * method :- GET
 * Decription :- get the requested book specifed by id
 * Access :- Public
 * parameters :- id
*/

router.get('/:id',getBookById);

/**
 * Route :- /books/issued/by-user
 * method :- GET
 * Decription :- get all the issued books
 * Access :- Public
 * parameters :- none
*/
router.get('/issued/by-user',getAllIssuedBooks);

/**
 * Route :- /books
 * method :- POST
 * Decription :- Add new Book
 * Access :- Public
 * parameters :- none
 * Data :- id, name, author, genre, price, publisher
*/

router.post('/',addNewBook);

/**
 * Route :- /books/:id
 * method :- PUT
 * Decription :- Updating Book
 * Access :- Public
 * parameters :- id
 * Data :- id, name, author, genre, price, publisher, etc...
*/

router.put('/:id',updateBookByID);


/**
 * Route :- /books/:id
 * method :- PUT
 * Decription :- Updating Book
 * Access :- Public
 * parameters :- id
 * Data :- id, name, author, genre, price, publisher, etc...
*/

router.get('/IssuedBooksWithFine',(req,res)=>{
    console.log("ok");
    let issuedBooksWithFine = [];
    books.forEach(element => {
        let id = element.id
        const user = users.find((each)=>each.id == id);
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

        if(data.fine>0){
            issuedBooksWithFine.push(element);
        }
    }
    );

    res.status(200).json({
        success:true,
        data:issuedBooksWithFine,
    })
});

module.exports = router;