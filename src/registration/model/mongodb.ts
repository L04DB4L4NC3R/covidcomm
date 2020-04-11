import { Repository } from "./repository";
import { User, Requests } from "./entity";
import mongoose, { Schema, Model } from "mongoose";


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
        }
     }],
   default: []
 }
})

const UserModel = mongoose.model<User>('user', UserSchema);

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
  public AppendRequest(id: string, request: Requests) {
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
      $elemMatch: {"request.$._id" :request_id}
    }, {
      $set: {
        "fulfilled": true
      }
    })
  }
  public ShowAllRequests(skip: number, limit: number) {
    return UserModel.find({}, {_id: 0, requests: 1, password: 0})
    .skip(skip)
    .limit(limit)
    .exec()
  }
}
