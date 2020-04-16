import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../../../config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const token = <string>req.headers["authorization"];
  let jwtPayload;
  
  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, config.JWT_SECRET);
    req.params.jwtPayload = jwtPayload;
    next()
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    console.table(error)
    res.status(401).send();
    return;
  }

};

export const generateJWT = (id: string): string => {

  //The token is valid for 1 day
  //We want to send a new token on every request
  const newToken = jwt.sign({ _id: id }, config.JWT_SECRET, {
    expiresIn: "1d"
  });

  //Call the next middleware or controller
  return newToken
}
