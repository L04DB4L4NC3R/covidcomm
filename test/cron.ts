import {
  Probe
} from "../src/pkg/outbound/cron";

setInterval(() => {
  Probe()
  .then(console.log)
  .catch(console.error)
}, 1000 * 60 * 2);
