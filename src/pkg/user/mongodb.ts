import { Repository } from "./repository";
import { User, IUser, Coordinates } from "./entity";
import mongoose, { Schema } from "mongoose";


const UserSchema: Schema = new Schema({
 email: {
   type: String,
   required: true,
   unique: true
 },
 password: {
   type: String,
   required: true
 },
 phoneNumber: {
   type: String,
   required: true,
   unique: true
 },
subscribed: {
	type: String,
	default: false
},
coordinates: {
		type: {
				latitude: Number,
				longitude: Number
		},
		required: true
},
 requests: {
   type: 
     [{
        item: {
          type: String,
          required: true
        },
        qty: {
          type: Number,
          default: 1
        },
        fulfilled: {
          type: Boolean,
          default: false
        },
        madeAt: {
          type: Date,
          default: new Date()
        },
        respondeeID: {
          type: String,
          default: null
        }
     }],
   default: []
 }
})

const UserModel = mongoose.model<IUser>('user', UserSchema);

export class MongoRepo implements Repository {
  public FindByID(id: string) {
      return UserModel.findOne({_id: id})
  }
  public FindByEmail(email: string) {
    return UserModel.findOne({email: email})
  }
  public ShowAllUsers(skip: number, limit: number) {
    return UserModel.find({}, {_id: 0, password: 1})
    .skip(skip)
    .limit(limit)
    .exec()
  }
  public AppendRequest(id: string, request: any) {
    return UserModel.findOneAndUpdate({_id: id}, {
      $push: {
        requests: request
      }
    })
  }
  public RemoveRequest(id: string, request_id: string) {
    return UserModel.findOneAndUpdate({_id: id}, {
      $pull: {
        "requests.$._id": request_id
      }
    })
  }
  public SetFullfilled(id: string, request_id: string) {
    return UserModel.findOneAndUpdate({_id: id, 
				"requests" : {$elemMatch: {_id: request_id}}
    }, {
      $set: {
        "requests.$.fulfilled": true
      }
    })
  }
  public ShowAllRequests(skip: number, limit: number) {
    return UserModel.find({}, {_id: 0, requests: 1})
    .skip(skip)
    .limit(limit)
    .exec()
  }
  public UpdateRespondee(id: string, req: string) {
    return UserModel.findOneAndUpdate({
				"requests": {$elemMatch: {_id: req}}
    }, {
      $set: {
					"requests.$.respondeeID": id,
					fulfilled: true
      }
    })
  }
  public ResetRespondee(id: string, request_id: string) {
    return UserModel.findOneAndUpdate({_id: id, 
				"requests": {$elemMatch: {_id: request_id}}
    }, {
      $set: {
        "requests.$.respondeeID": null,
        "requests.$.fulfilled": false,
      }
    })
  }
  public ShowAllPhoneNumbers(skip: number, limit: number) {
    return UserModel.find({subscribed: true}, {_id: 0, phoneNumber: 1})
    .skip(skip)
    .limit(limit)
    .exec()
  }

  CreateUser(email: string, password: string, phoneNumber: string, coordinates: Coordinates) {
    let newUser: User = new User(
      email,
      password,
      phoneNumber,
			[],
      false,
      coordinates,
    )
    return UserModel.create(newUser)
  }
	SetSubscribed(id: string): any {
		return new Promise((resolve, reject) => {
			UserModel.findOneAndUpdate({_id: id}, {
				$set: {subscribed: true}
				}).then((user: any) => {
					UserModel.findById(id, {_id: 0, password: 0})
					.then(resolve)
					.catch(reject)
				}).catch(reject)
		})
	}
	UnsetSubscribed(id: string) {
		return UserModel.findOneAndUpdate({_id: id}, {
			$set: {subscribed: false}
		})
	}
	FindAllRequestsWithoutID(id: string) {
			return UserModel.find({_id: {$ne: id}, "requests.fulfilled": false}, {_id: 0, requests: 1})
	}
}
