import { hashSync } from "bcryptjs";
import config from "../../../config"
import { MongoRepo } from "./mongodb"

export interface Service {
  Login(email: string, password: string): any;
  Signup(email: string, password: string, phoneNumber: string): any;
  MakeRequest(id: string, item: string, qty: number): any;
  RespondToRequest(id: string, other_user_id: string, req_id: string): any;
  MarkAsFulfilled(id: string, request_id: string): any;
  RejectResponse(id: string, request_id: string): any;
}


class service implements Service {

  repo: MongoRepo;
  constructor(repo: MongoRepo) {
    this.repo = repo;
  }

  Login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      let hashpass = hashSync(password, config.HASH_SALT);
      this.repo.FindByEmail(email)
      .then(user => {
        if (!user) {
          return reject(new Error("User not found"));
        }
        if (user.password != hashpass) {
          return reject(new Error("Passwords do not match"));
        }
        resolve(user);
      })
    })
  }
  Signup(email: string, password: string, phoneNumber: string) {
    // TODO: verify phone number
    let newpass = hashSync(password, config.HASH_SALT);
    return this.repo.CreateUser(email, newpass, phoneNumber)
  }
  MakeRequest(id: string, item: string, qty: number) {
  }
  RespondToRequest(id: string, other_user_id: string, req_id: string) {
  }
  MarkAsFulfilled(id: string, request_id: string) {
  }
  RejectResponse(id: string, request_id: string) {
  }
}
