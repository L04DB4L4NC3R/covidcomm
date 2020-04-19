import {
  Request,
  Response,
  NextFunction
} from "express";

export interface IUserAuthHandler {
  signup(req: Request, res: Response, next?: NextFunction): any;
  login(req: Request, res: Response, next?: NextFunction): any;
  checkAuthentication(req: Request, res: Response, next?: NextFunction): any;
	subscribe(req: Request, res: Response, next?: NextFunction): any;
	unsubscribe(req: Request, res: Response, next?: NextFunction): any;
};

export interface IUserReqHandler {
  makeRequest(req: Request, res: Response, next?: NextFunction): any;
  respondToRequest(req: Request, res: Response, next?: NextFunction): any;
  markAsFulfilled(req: Request, res: Response, next?: NextFunction): any;
  rejectResponse(req: Request, res: Response, next?: NextFunction): any;
}
