import {  register, getAllUsers, update, deleteUser, changePassword, login } from "../controller/registerController.js";
import express from "express";

const registerRouter = express.Router();

registerRouter.route("/register").post(register);
registerRouter.route("/getUsers").get(getAllUsers);
//registerRouter.route("/updateUser/:id").post(updateUser);
registerRouter.route("/update/:userId").put(update);
registerRouter.route("/delete/:userId").delete(deleteUser);
registerRouter.route("/changePassword/:userId").post(changePassword);
//registerRouter.route("/createUser").post(createUser);
registerRouter.route("/login").post(login);

export default registerRouter;