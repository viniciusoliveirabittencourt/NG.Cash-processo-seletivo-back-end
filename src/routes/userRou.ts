import { Router } from "express";
import controllerCon from "../controller/controllerClass";
import userBodyVerify from "../middleware/userBodyVerify";

const route = Router();

const userController = new controllerCon();

route.post("/register", userBodyVerify, userController.register);
route.post("/login", userBodyVerify, userController.login)

export default route;
