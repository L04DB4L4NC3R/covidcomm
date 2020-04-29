import {
  Request,
  Response,
  NextFunction,
  Router
} from "express";
import { MongoRepo } from "../user/mongodb";
import request from "request";

const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

let userRepo = new MongoRepo();

export class Outbound {
  public sendMessage(infoAPIData: any, phoneNumbers: any) {
    return new Promise((resolve, reject) => {
    })
  }
  public fetchInfoAPI() {
    return new Promise((resolve, reject) => {
      request(<string>process.env.INFO_API_URL, (err, response, body) => {
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
      from: process.env.TWILIO_PHONE_NUMBER
    }
    let pmArray = [];
    for(let num of phoneNumbers) {
      payload.to = num;
      pmArray.push(client.calls.create(payload))
    }
    return Promise.all(pmArray)
  }
}
