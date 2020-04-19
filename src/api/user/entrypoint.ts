import { Router } from "express";
import { UserAuthHandler } from "./auth_handler"
import { UserRequestsHandler } from "./request_handler"

import { checkJwt } from "../middleware/authorization";

const usersAuth = new UserAuthHandler();
const usersRequests = new UserRequestsHandler();

export const UsersRouter = Router();

UsersRouter.post("/signup", usersAuth.signup);
UsersRouter.post("/login", usersAuth.login);
UsersRouter.get("/checkAuthentication", checkJwt, usersAuth.checkAuthentication);

UsersRouter.get("/subscribe", checkJwt, usersAuth.subscribe);
UsersRouter.get("/unsubscribe", checkJwt, usersAuth.unsubscribe);
