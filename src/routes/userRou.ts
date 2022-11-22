import { Router } from "express";
import controllerCon from "../controller/controllerClass";
import registerBodyVerify from "../middleware/registerBodyVerify";

const route = Router();

const userController = new controllerCon();

route.post("/register", registerBodyVerify, userController.register);

export default route;
