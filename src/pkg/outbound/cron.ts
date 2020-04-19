import {
  Outbound
} from "./on_demand";

// Got this file from here:
// https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/cron
// or npm i cron @types/cron
import config from "../../../config";

// TODO: to be repeated daily
function InfoAPICronFunc() {
  return new Promise((resolve, reject) => {
    let ob = new Outbound();

    Promise.all([ob.fetchSubscribers(), ob.fetchInfoAPI()])
    .then((data: any) => {
      // because max twiml size is 4000
      ob.callAll(data[0].slice(0, 3900), data[1])
      .then((returnedData) => {
        resolve(returnedData);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      })
    }).catch(error => {
      console.error(error);
      reject(error);
    })
  })
}

// for testing
export function Probe(): any {
  return new Promise((resolve, reject) => {
    let ob = new Outbound();
    ob.fetchInfoAPI()
    .then((response: any) => {
      let str = "";
      for(let news of response) {
        str += ".  " + news.description;
      }

      // 4000 is max twiml size
      let truncate = str.slice(0, 3900);
      ob.callAll([config.TWILIO_VERIFIED_NUMBER], truncate)
      .then(resolve)
      .catch(reject)
    }).catch(reject)
   })
}
