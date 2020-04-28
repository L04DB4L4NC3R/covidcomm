import {
  Request,
  Response,
  NextFunction
} from "express";

import {
  generateJWT
} from "../middleware/authorization";

import { IUserAuthHandler } from "./contract";
import { service } from "../../pkg/user/service";
import { MongoRepo } from "../../pkg/user/mongodb";

let userRepo = new MongoRepo();
let userSvc = new service(userRepo);


export class UserAuthHandler implements IUserAuthHandler {
  // SignUp User
  public signup(req: Request, res: Response, next?: NextFunction) {
    // TODO: input sanitization
    let {
      email, password, phone_number, latitude, longitude
    } = req.body;
    userSvc.Signup(email, password, phone_number, latitude, longitude)
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
	return res.status(200).json({_id: req.params.jwtPayload});
  }

	public subscribe(req: Request, res: Response, next?: NextFunction) {
		userSvc.Subscription(req.params.jwtPayload, true)
		.then((user: any) => {
			const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
			client.verify.services(process.env.TWILIO_SERVICE_SID)
      .verifications
      .create({to: user.phoneNumber, channel: 'sms'})
			.then((verification: any) => {
			res.status(202).json({sid: verification.sid})
			}).catch(next)
		}).catch(next)
	}
	public unsubscribe(req: Request, res: Response, next?: NextFunction) {
		userSvc.Subscription(req.params.jwtPayload, false)
		.then(() => {
			res.status(200).json(req.params.jwtPayload)
		}).catch(next)
	}
};
