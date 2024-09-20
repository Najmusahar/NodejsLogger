import express from "express";
import { addBook, getAllBooks, updateBook, deleteBook, getBookById } from "../controller/bookController.js";

const bookRouter = express.Router();

bookRouter.route("/addBook").post(addBook);
bookRouter.route("/getAllBooks").get(getAllBooks);
bookRouter.route("/updateBook/:bookId").put(updateBook);
bookRouter.route("/deleteBook/:bookId").delete(deleteBook);
bookRouter.route("/getBookById/:BookId").get(getBookById);

export default bookRouter;