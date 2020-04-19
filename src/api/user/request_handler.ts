import {
    Request,
    Response,
    NextFunction
  } from "express";
  
  import { IUserReqHandler } from "./contract";
  import { service } from "../../pkg/user/service";
  import { MongoRepo } from "../../pkg/user/mongodb";
  
  let userRepo = new MongoRepo();
  let userSvc = new service(userRepo);
  
  
  export class UserRequestsHandler implements IUserReqHandler {
    public makeRequest(req: Request, res: Response, next?: NextFunction) {
    }
    public respondToRequest(req: Request, res: Response, next?: NextFunction) {
    }
    public markAsFulfilled(req: Request, res: Response, next?: NextFunction) {
    }
    public rejectResponse(req: Request, res: Response, next?: NextFunction) {
    }
  };
  