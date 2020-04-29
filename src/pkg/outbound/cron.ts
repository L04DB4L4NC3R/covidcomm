import {
  Outbound
} from "./on_demand";

// Got this file from here:
// https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/cron
// or npm i cron @types/cron
// TODO: to be repeated daily
export function InfoAPICronFunc(nums: string[]): any {
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
      		ob.callAll(nums, truncate)
      		.then(resolve)
      		.catch(reject)
    	}).catch(reject)
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
      ob.callAll([process.env.TWILIO_VERIFIED_NUMBER], truncate)
      .then(resolve)
      .catch(reject)
    }).catch(reject)
   })
}
