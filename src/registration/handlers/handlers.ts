import {
  Request,
  Response,
  NextFunction
} from "express";
import { User } from "../model/entity";


export class UserAuthHandler {
  public signup(req: Request, res: Response, next?: NextFunction) {
  }
  public login(req: Request, res: Response, next?: NextFunction) {
  }
  public checkAuthentication(req: Request, res: Response, next?: NextFunction) {
  }
};

export class UserRequestsHandler {
  public makeRequest(req: Request, res: Response, next?: NextFunction) {
  }
  public respondToRequest(req: Request, res: Response, next?: NextFunction) {
  }
  public markAsFulfilled(req: Request, res: Response, next?: NextFunction) {
  }
  public rejectResponse(req: Request, res: Response, next?: NextFunction) {
  }
};
