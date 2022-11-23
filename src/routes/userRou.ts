import { Router } from "express";
import controllerCon from "../controller/controllerClass";
import userBodyVerify from "../middleware/userBodyVerify";
import verifyJwt from "../middleware/verifyJwt";

const route = Router();

const userController = new controllerCon();

route.post("/register", userBodyVerify, userController.register);
route.post("/login", userBodyVerify, userController.login)
route.get("/account", verifyJwt, userController.account)

export default route;
