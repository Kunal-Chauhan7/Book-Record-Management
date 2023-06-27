const bookModel = require('../models/book-model');
const {UserModel , BookModel} = require('../models/index');

exports.getAllBooks = async(req,res) => {
    const books = await BookModel.find();
    if(books.length === 0){
        return res.status(404).json({
            success:false,
            message:"No book was found",
        });
    }
    return res.status(200).json({
        success:true,
        data:books,
    });
}

exports.getBookById = async(req, res) => {
    const { id } = req.params;
    const book = await BookModel.findById(id);
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
};

exports.getAllIssuedBooks = async (req, res) => {
    const users = await UserModel.find({
      issuedBook: { $exists: true },
    }).populate("issuedBook");
  
    const issuedBooks = users.map((each) => new IssuedBook(each));
  
    if (issuedBooks.length === 0)
      return res.status(404).json({
        success: false,
        message: "No books issued yet",
      });
  
    return res.status(200).json({
      success: true,
      data: issuedBooks,
    });
  };

exports.addNewBook = async (req,res) => {
  const {data} = req.body;
    if (!data) {
        res.status(404).json({
            success:false,
            message:"Data not recived",
        });
    }

    await bookModel.create(data);

    const allBooks = await bookModel.find();
    
    res.status(200).json({
        success:true,
        data:allBooks,
    });
};

exports.updateBookByID = async (req,res) => {
  const {data} = req.body;
  const {id} = req.params;

  const updatedBook = await bookModel.findOneAndUpdate({
    _id:id,
  },data,{
    new:true,
  }) 

  res.status(200).json({
      success:true,
      data: updatedBook,
  });
};