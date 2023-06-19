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

module.exports = router;