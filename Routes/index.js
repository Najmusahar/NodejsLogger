import expressRouter from "express";
import registerRouter from "./registerRouter.js";
import bookRouter from "./bookRouter.js";
import bookIssueRouter from "./bookIssueRouter.js";

const router = expressRouter.Router();

router.use("/register",registerRouter);
router.use("/book",bookRouter);
router.use("/bookIssue",bookIssueRouter);

export default router;