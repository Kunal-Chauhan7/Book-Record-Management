# Book-Record-Management

This is a book management API backend for the managemnt of records and books

# Routes and Endpoints

## /user
POST :- Create a new user ✅
GET :- Get list of the all users ✅ 

## /user/{id}
GET :- get user data regarding thier id ✅
PUT :- update user by thier id ✅
DELETE :- Delete user by thier id (check if they have issued any book or not)(is there any fine) ✅

## /user/subscription-details/{id}
GET :- get user subscription details 
1.dateofsub
2. valid date
3. Fine if any

## /books
GET :- Get all the books 
PUT :- Add new book 

## /books/{id}
GET :- get a specif book by id
POST :- Update the book by id

## /books/issued
GET :- Gwt all issed book

## /books/IssuedBooksWithFine
GET :- Get all the books with fine

# Subscription 
Basic (3 months)
Standard (6 months)
Premium (12 months)