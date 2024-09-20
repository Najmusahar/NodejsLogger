import Book from "../model/bookSchema.js";
//import Register from "../model/registeration.js";

export const addBook = async (req, res) => {
  try {
    const { name, author, price, quantity } = req.body;

    const bookDoc = await Book.create({
      name,
      author,
      price,
      quantity,
    });
    res.status(201).json({ message: "Book added successfully", book: bookDoc });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});

    return res.status(200).json({ success: true, books });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const { name, price } = req.body;

    const books = await Book.findById(bookId);

    if (!books) {
      console.log("Book does not exists" + bookId);
      return res.status(400).json({success: false,msg: "Book does not exists with id " + bookId,});
    }

    await Book.updateOne({ _id: bookId },{
        name,
        price,
      }
    );

    return res.status(201).json({ success: true, msg: "Book details updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json("internal server error");
  }
};

export const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;

    const deleteDoc = await Book.findOneAndDelete({ _id: bookId });
    if (deleteDoc) {
      console.log("Book deleted successfully");
      return res
        .status(200)
        .json({ success: true, msg: "Book deleted successfully" });
    }
    console.log("Book does not exists");
    return res.status(400).json({ success: false, msg: "Book not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};

export const getBookById = async(req,res)=>{
    try{
        const BookId = req.params.BookId;

        const books = await Book.findOne({_id:BookId});
        if(!books){
            return res.status(400).json({success:false,msg:"not found"});
        }

        return res.status(201).json({success:true,books});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success:false,error})
    }
}