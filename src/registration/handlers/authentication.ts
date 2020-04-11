import {
  Router,
  Request,
  Response,
  NextFunction
} from "express";


export class Users {
  public signup(req: Request, res: Response, next?: NextFunction) {
  }
  public login(req: Request, res: Response, next?: NextFunction) {
  }
  public checkAuthentication(req: Request, res: Response, next?: NextFunction) {
  }
}

const users = new Users();

export const UsersRouter = Router();
UsersRouter.post("/signup", users.signup);
UsersRouter.post("/login", users.login);
UsersRouter.post("/checkAuthentication", users.checkAuthentication);
