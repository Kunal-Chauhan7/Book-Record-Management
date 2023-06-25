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