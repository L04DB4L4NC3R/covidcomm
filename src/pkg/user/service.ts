import { hashSync, compareSync } from "bcryptjs";
import { MongoRepo } from "./mongodb"

interface Service {
  Login(email: string, password: string): any;
  Signup(email: string, password: string, phoneNumber: string): any;
  MakeRequest(id: string, item: string, qty: number): any;
  RespondToRequest(id: string, other_user_id: string, req_id: string): any;
  MarkAsFulfilled(id: string, request_id: string): any;
  RejectResponse(id: string, request_id: string): any;
  FetchPhoneNumbers(skip: number, limit: number): any;
	Subscription(id: string, set: boolean): any;
}


export class service implements Service {

  repo: MongoRepo;
  constructor(repo: MongoRepo) {
    this.repo = repo;
  }

  Login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.repo.FindByEmail(email)
      .then(user => {
        if (!user) {
          reject(new Error("User not found"));
          return
        }
        if (!compareSync(password, user.password)) {
          reject(new Error("Passwords do not match"));
          return
        }
        resolve(user);
      })
    })
  }
  Signup(email: string, password: string, phoneNumber: string) {
    // TODO: verify phone number
    let newpass = hashSync(password, parseInt(<string>process.env.HASH_SALT));
    return this.repo.CreateUser(email, newpass, phoneNumber)
  }
	Subscription(id: string, set: boolean) {
		if (set)
			return this.repo.SetSubscribed(id);
		return this.repo.UnsetSubscribed(id);
	}
  MakeRequest(id: string, item: string, qty: number) {
  }
  RespondToRequest(id: string, other_user_id: string, req_id: string) {
  }
  MarkAsFulfilled(id: string, request_id: string) {
  }
  RejectResponse(id: string, request_id: string) {
  }
  FetchPhoneNumbers(skip: number, limit: number): any {
    return this.repo.ShowAllPhoneNumbers(skip, limit)
  }
}
