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

UsersRouter.put("/subscribe", checkJwt, usersAuth.subscribe);
UsersRouter.put("/unsubscribe", checkJwt, usersAuth.unsubscribe);
UsersRouter.post("/verifyotp", checkJwt, usersAuth.verifyOTP);

// Request handlers
UsersRouter.post("/request", checkJwt, usersRequests.makeRequest);
UsersRouter.post("/respond", checkJwt, usersRequests.respondToRequest);
UsersRouter.post("/fulfilled", checkJwt, usersRequests.markAsFulfilled);
UsersRouter.post("/reject", checkJwt, usersRequests.rejectResponse);
UsersRouter.get("/viewrequests", checkJwt, usersRequests.viewRequests);
UsersRouter.get("/viewallrequests", checkJwt, usersRequests.viewAllRequests);
UsersRouter.post("/find", checkJwt, usersRequests.findUser);
