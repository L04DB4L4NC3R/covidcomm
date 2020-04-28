import { hashSync, compareSync } from "bcryptjs";
import { MongoRepo } from "./mongodb"
import { RequestsStruct, Coordinates } from "./entity"

interface Service {
  Login(email: string, password: string): any;
  Signup(email: string, password: string, phoneNumber: string, latitude: number, longitude: number): any;
  MakeRequest(id: string, item: string, qty: number): any;
  RespondToRequest(id: string, other_user_id: string, req_id: string): any;
  MarkAsFulfilled(id: string, request_id: string): any;
  RejectResponse(id: string, request_id: string): any;
  FetchPhoneNumbers(skip: number, limit: number): any;
	Subscription(id: string, set: boolean): any;
	ViewRequests(id: string): any;
	ViewAllRequests(id: string): any;
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
  Signup(email: string, password: string, phoneNumber: string, latitude: number, longitude: number) {
    // TODO: verify phone number
    let newpass = hashSync(password, parseInt(<string>process.env.HASH_SALT));
    let coordinates = new Coordinates(latitude, longitude);

    return this.repo.CreateUser(email, newpass, phoneNumber, coordinates)
  }
	Subscription(id: string, set: boolean) {
		if (set)
			return this.repo.SetSubscribed(id);
		return this.repo.UnsetSubscribed(id);
	}
  MakeRequest(id: string, item: string, qty: number) {
			let request = new RequestsStruct(
					item,
					qty
			);
			return this.repo.AppendRequest(id, request);
  }
  RespondToRequest(id: string, other_user_id: string, req_id: string) {
			return this.repo.UpdateRespondee(id, other_user_id, req_id);
  }

  MarkAsFulfilled(id: string, request_id: string) {
			return this.repo.SetFullfilled(id, request_id);
  }
  RejectResponse(id: string, request_id: string) {
			return this.repo.ResetRespondee(id, request_id);
  }
  FetchPhoneNumbers(skip: number, limit: number): any {
    return this.repo.ShowAllPhoneNumbers(skip, limit)
  }
	ViewRequests(id: string): any {
			return new Promise((resolve, reject) => {
				this.repo.FindByID(id)
				.then((user: any) => {
					return resolve(user.requests);
				}).catch(reject);
		})
	}
	ViewAllRequests(id: string): any {
			return new Promise((resolve, reject) => {
				this.repo.FindAllRequestsWithoutID(id)
				.then((user: any) => {
					let reqArray: any = [];
					for(let u of user) 
					  reqArray.push(...u.requests)
						return resolve({requests: reqArray});
				}).catch(reject);
		})
	}
}
