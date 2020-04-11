import {
  Router,
  Request,
  Response,
  NextFunction
} from "express";
import { UserAuthHandler, UserRequestsHandler } from "./handlers"

const usersAuth = new UserAuthHandler();
const usersRequests = new UserRequestsHandler();

export const UsersRouter = Router();

UsersRouter.post("/signup", usersAuth.signup);
UsersRouter.post("/login", usersAuth.login);
UsersRouter.post("/checkAuthentication", usersAuth.checkAuthentication);
