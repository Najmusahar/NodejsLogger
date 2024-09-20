import { response } from "express";
import bookIssue from "../model/bookIssueSchema.js";
import Book from "../model/bookSchema.js";
import Register from "../model/registeration.js";
import { register } from "./registerController.js";

export const BookIssue = async(req,res)=>{
    try{
        const {student,book,issue_date,due_date,status}=req.body;

        const userDoc = await Register.findById(student);
        if(!userDoc){
            console.log("User Not found");
            return res.status(404).json({success:false,msg:"User Not found"});
        }

        const bookDoc = await Book.findById(book);
        if(!bookDoc){
            console.log("Book Not found");
            return res.status(404).json({success:false,msg:"Book Not found"});
        }

        if(bookDoc.quantity > 0){
            // Calculate due date (30 days from now)
            const issue_date = new Date();
            const due_date = new Date();
            due_date.setDate(issue_date.getDate() + 30);
    
            // Create book issue document
            const bookIssued = await bookIssue.create({
                student,
                book,
                issue_date,
                due_date,
                status,
            })
            // Update book quantity
            bookDoc.quantity--; // Decrement book quantity by 1
            await bookDoc.save();
            
            return res.status(200).json({success:true,msg:"book issued successfully",bookIssued});
        }
        return res.status(300).json({success:false,msg:"Book not available at the moment"});
        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success:false,error});
    }
}

export const bookReturn = async(req, res) => {
    try{
        const {book, student, id, due_date, return_date, status, fine} = req.body;
        let return_book;

        return_book = await bookIssue.findOne({student});
        if(!return_book){
            console.log("Invalid user id");
            return res.status(404).json({success:false,msg:"Invalid user id "});
        }

        return_book = await bookIssue.findOne({book});
        if(!return_book){
            console.log("Invalid book id");
            return res.status(404).json({success:false,msg:"Invalid book id "});
        }
        
        const issuedBooks = await bookIssue.findOne({id});
        
        if(issuedBooks.status == "ISSUED" || issuedBooks.status == "EXPIRED"){

            issuedBooks.status = "RETURNED";
            issuedBooks.return_date = new Date();
            
            if (issuedBooks.statuss === "EXPIRED") {
                const fine = 10 * (return_date - due_date);
                return_book.fine = fine > 0 ? fine : 0;
            }
            issuedBooks.save();
            console.log(issuedBooks);
        }
        else{
            console.log("Book has been already been returned");
            return res.status(201).json({success:false,msg:"Book has been already been returned"});
        }
        
        
        
        const bookDoc = await Book.findById(book);

        bookDoc.quantity++;
        await bookDoc.save();

        console.log("Book Returned");
        return res.status(200).json({success:true,msg:"Book Returned  ",issuedBooks});

    }
    catch(error){
        console.log(error);
        return res.status(500).json({success:false,error});
    }
}

export const getAllIssueBooks = async(req,res)=>{
    try{
        
        const issuedBooks = await bookIssue.find({}).populate("book");

        console.log("success");
        return res.status(200).json({success:true,issuedBooks});
    }
    
    catch(error){
        console.log(error);
        return res.status(500).json({success:false,error});
    }
}

export const getAllIssueBooksById = async(req,res)=>{
    try{
        const id = req.params.id;

        const issuedBook = await bookIssue.findById({_id:id}).populate("student").populate("book");
        if(!issuedBook){
            console.log("Not found");
            return res.status(404).json({success:false,msg:"Invalid issued book id"});
        }
        console.log("success");
        return res.status(200).json({success:true,issuedBook});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success:false,error});
    }
}

export const getAllIssueBooksByStudentId = async(req,res)=>{
    try{
        const student = req.params.student;

        const studentDoc = await bookIssue.findOne({student}).populate("book");
        if(!studentDoc){
            console.log("invalid student id");
            return res.status(404).json({success:false,msg:"invalid student id"});
        }

        return res.status(200).json({success:false,studentDoc});

    }
    catch(error){
        console.log(error);
        return res.status(500).json({success:false,error});
    }
}