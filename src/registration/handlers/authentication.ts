import {
  Router,
  Request,
  Response,
  NextFunction
} from "express";
import { User } from "../model/entity"


export class UserHandler {
  public signup(req: Request, res: Response, next?: NextFunction) {
  }
  public login(req: Request, res: Response, next?: NextFunction) {
  }
  public checkAuthentication(req: Request, res: Response, next?: NextFunction) {
  }
}

const users = new UserHandler();

export const UsersRouter = Router();
UsersRouter.post("/signup", users.signup);
UsersRouter.post("/login", users.login);
UsersRouter.post("/checkAuthentication", users.checkAuthentication);
