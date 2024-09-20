import express from "express";
import { BookIssue, bookReturn, getAllIssueBooks, getAllIssueBooksById, getAllIssueBooksByStudentId } from "../controller/bookIssueController.js";

const bookIssueRouter = express.Router();

bookIssueRouter.route("/IssueBook").post(BookIssue);
bookIssueRouter.route("/bookReturn").post(bookReturn);
bookIssueRouter.route("/getAllIssueBooks").get(getAllIssueBooks);
bookIssueRouter.route("/getAllIssueBooksById/:id").get(getAllIssueBooksById);
bookIssueRouter.route("/getAllIssueBooksByStudentId/:student").get(getAllIssueBooksByStudentId);

export default bookIssueRouter;