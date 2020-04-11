import {
  Request,
  Response,
  NextFunction,
  Router
} from "express";

class InfoAPI {

}
export class Outbound {
  public infoAPIUrl: string;
  constructor(infoAPIUrl: string) {
    this.infoAPIUrl = infoAPIUrl;
  }
  public sendMessage(infoAPIData: any, phoneNumbers: any) {
    return new Promise((resolve, reject) => {
    })
  }
  public fetchInfoAPI() {
    return new Promise((resolve, reject) => {
    })
  }
  public fetchSubscribers() {
    return new Promise((resolve, reject) => {
    })
  }
}
