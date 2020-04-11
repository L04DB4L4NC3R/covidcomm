import express from "express";
// import VoiceResponse = require("twilio").twiml.VoiceResponse;
const morgan = require("morgan");
import config from "./config";

const app : express.Application = express();
app.use(morgan(config.LOGGING_FMT));

app.get("/ping", (req, res, next) => {
  return res.send({message: "Live!"}).status(200);
})

  /*
app.post("/voice", (req, res, next) => {
  const twiml = new VoiceResponse();
  twiml.say({ voice: "alice" }, "Hello, World!");

  response.type('"text/xml"');
  response.send(twiml.toString());
});
*/

app.get("/*", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  return res.json({message: "Hello world"})
})

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  return res.json({message: "Error occurred", error_log: err}).status(500);
})

let port = process.env.PORT || config.PORT;
app.listen(port, () => {
  console.info(
    `Serving on port ${port}`
  );
});
