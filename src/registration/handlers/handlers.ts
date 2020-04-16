import {
  Request,
  Response,
  NextFunction
} from "express";
import {
  generateJWT
} from "../middleware/authorization";

import { User } from "../model/entity";
import { service } from "../model/service";
import { MongoRepo } from "../model/mongodb";

let userRepo = new MongoRepo()
let userSvc = new service(userRepo);

export class UserAuthHandler {
  // SignUp User
  public signup(req: Request, res: Response, next?: NextFunction) {
    // TODO: input sanitization
    let {
      email, password, phone_number
    } = req.body;
    userSvc.Signup(email, password, phone_number)
    .then(user => {
      let jwt = generateJWT(user._id);
      return res.status(201).json({
        _id: user._id,
        token: jwt
      })
    }).catch(next)
  }

  // Login User
  public login(req: Request, res: Response, next?: NextFunction) {
    // TODO: input sanitization
    let {
      email, password
    } = req.body;

    userSvc.Login(email, password)
    .then((user: any) => {
      let jwt = generateJWT(user._id);
      return res.status(200).json({
        _id: user._id,
        token: jwt
      })
    }).catch(err => {
      if (next)
        next(err);
    });
  }
  public checkAuthentication(req: Request, res: Response, next?: NextFunction) {
    return res.status(200).json(req.params.jwtPayload);
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
