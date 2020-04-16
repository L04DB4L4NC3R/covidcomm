import {
  Request,
  Response,
  NextFunction,
  Router
} from "express";
import { MongoRepo } from "../../registration/model/mongodb";
import config from "../../../config";
import request from "request";
const client = require('twilio')(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);

let userRepo = new MongoRepo();

export class Outbound {
  public sendMessage(infoAPIData: any, phoneNumbers: any) {
    return new Promise((resolve, reject) => {
    })
  }
  public fetchInfoAPI() {
    return new Promise((resolve, reject) => {
      request(config.INFO_API_URL, (err, response, body) => {
        if (err) 
          reject(err)
        else 
          resolve(JSON.parse(body))
      })
    })
  }
  public fetchSubscribers() {
    return new Promise((resolve, reject) => {
      const skip = 0;
      const limit = 0;
      return userRepo.ShowAllPhoneNumbers(skip, limit);
    })
  }
  public callAll(phoneNumbers: any, message: string) {
    let payload = {
      twiml: `<?xml version="1.0" encoding="UTF-8"?><Response><Say>${message}</Say></Response>`,
      to: "",
      from: config.TWILIO_PHONE_NUMBER
    }
    let pmArray = [];
    for(let num of phoneNumbers) {
      payload.to = num;
      pmArray.push(client.calls.create(payload))
    }
    return Promise.all(pmArray)
  }
}
