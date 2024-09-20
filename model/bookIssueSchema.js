import mongoose from "mongoose";

const bookIssueSchema = mongoose.Schema({
    book:{type:mongoose.Schema.Types.ObjectId,ref:"book"},
    student:{type:mongoose.Schema.Types.ObjectId,ref:"register"},
    issue_date:{type:Date,default:Date.now},
    due_date:{type:Date},
    Fine:{type:Number},
    status:{type:String, enum:["ISSUED","EXPIRED","RETURNED"],default:"ISSUED"},
    return_date:{type:Date},
})

bookIssueSchema.pre('save', function(next) {
    // Calculate due_date by adding 30 days to issue_date
    const dueDate = new Date(this.issue_date);
    dueDate.setDate(dueDate.getDate() + 30);
    this.due_date = dueDate;
    next();
});

const bookIssue = mongoose.model("bookIssue",bookIssueSchema);

export default bookIssue;