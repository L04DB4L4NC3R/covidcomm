import {
  Outbound
} from "./handlers/on_demand";

// Got this file from here:
// https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/cron
// or npm i cron @types/cron
import { CronJob } from "cron";

function InfoAPICronFunc(infoAPIUrl: string) {

  return new Promise((resolve, reject) => {
    let ob = new Outbound(infoAPIUrl);

    Promise.all([ob.fetchInfoAPI(), ob.fetchSubscribers])
    .then(data => {
      ob.sendMessage(data[0], data[1])
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

export function CronWrapper(infoAPIUrl: string, freq: string) {
  new CronJob(freq, () => {
    InfoAPICronFunc(infoAPIUrl)
    .then(console.log)
    .catch(console.error)
  });
}
