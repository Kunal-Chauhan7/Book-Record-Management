const express = require('express');
const { books } = require('../data/books.json');
const {users} = require('../data/users.json');
const router = express.Router();


/**
 * Route :- /books
 * method :- GET
 * Decription :- get all the books 
 * Access :- Public
 * parameters :- none
*/

router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: books
    });
});

/**
 * Route :- /books/:id
 * method :- GET
 * Decription :- get the requested book specifed by id
 * Access :- Public
 * parameters :- id
*/

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const book = books.find((each)=> each.id == id);
    if(!book){
        return res.status(404).json({
            success:false,
            message:"Requested Book is not found"
        });
    }

    res.status(201).json({
        success:true,
        data:book
    });
});

/**
 * Route :- /books/issued/by-user
 * method :- GET
 * Decription :- get all the issued books
 * Access :- Public
 * parameters :- none
*/
router.get('/issued/by-user',(req,res)=>{
    const UsersWithIssuedBook = users.filter((each)=>{
        if(each.issuedBook) return each;
    });

    const issuedbooks = [];

    UsersWithIssuedBook.forEach((each)=>{
        const book = books.find((b)=> b.id === each.issuedBook);

        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDay = each.returnDate;
        issuedbooks.push(book);
    });

    //const issuedbooksid = [];
    //UsersWithIssuedBook.forEach((each)=>{
    //    issuedbooksid.push(each.issuedBook);
    //});
    //const issuedbook =  [];
    //issuedbooksid.forEach((element) => {
    //    const book = books.find((each)=>each.id ===  element);
    //    issuedbook.push(book)
    //});

    if(issuedbooks.length === 0){
        return res.status(404).json({
            success:false,
            message:"no issed books"
        });
    }
    return res.status(200).json({
        success:true,
        data:issuedbooks
    });
});

/**
 * Route :- /books
 * method :- POST
 * Decription :- Add new Book
 * Access :- Public
 * parameters :- none
 * Data :- id, name, author, genre, price, publisher
*/

router.post('/',(req,res)=>{
    const {data} = req.body;
    if (!data) {
        res.status(404).json({
            success:false,
            message:"Data not recived",
        });
    }

    const book = books.find((each)=>each.id === data.id);

    if (book) {
        return res.status(404).json({
            success:false,
            message:"book with this id already exist",
        });
    }

    const newBooks = [...books,data];

    res.status(200).json({
        success:true,
        data:newBooks,
    });
});

/**
 * Route :- /books/:id
 * method :- PUT
 * Decription :- Updating Book
 * Access :- Public
 * parameters :- id
 * Data :- id, name, author, genre, price, publisher, etc...
*/

router.put(('/:id'),(req,res)=>{
    const {data} = req.body;
    const {id} = req.params;

    const book = books.find((each)=> each.id === id);

    if (!book) {
        return res.status(404).json({
            success:false,
            message:"Book with that do not exist",
        });
    }
    const updatedBook = books.map((each)=>{
        if(each.id === id){
            return {...each,...data};
        }
        return each;
    });

    res.status(200).json({
        success:true,
        data:updatedBook,
    });
});


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