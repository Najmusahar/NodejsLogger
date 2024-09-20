import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    name:{type:String,require:true},
    author:[{type:String, require:true}],
    //author:{type:mongoose.Schema.Types.ObjectId, ref:"register"},
    price:{type:Number},
    quantity:{type:Number, require:true},
})

const Book = mongoose.model("book",bookSchema)

export default Book;