// express server
import express from "express";
// import VoiceResponse = require("twilio").twiml.VoiceResponse;

// your settings
import config from "./config";

// database
import mongoose from "mongoose";

// body parser for request payload
import bp = require("body-parser");

// handler imports
import {
  UsersRouter
} from "./src/registration/handlers/entrypoint";

// initializing express server 
const app : express.Application = express();

// request logging layer
const morgan = require("morgan");
app.use(morgan(config.LOGGING_FMT));

// handling json request payload
app.use(bp.json());

// health route
app.get("/ping", (req, res, next) => {
  return res.send({message: "Live!"}).status(200);
})

// application endpoint handlers
app.use(`${config.API_VERSION}/user`, UsersRouter);

  /*
app.post("/voice", (req, res, next) => {
  const twiml = new VoiceResponse();
  twiml.say({ voice: "alice" }, "Hello, World!");

  response.type('"text/xml"');
  response.send(twiml.toString());
});
*/

// mongoDB connection promise
mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB")
}).catch((err: any) => {
  console.error(err);
  process.exit(1);
})


// not found handler
app.get("/*", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  return res.json({message: "Hello world"})
})


// error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  return res.json({message: "Error occurred", error_log: err.message}).status(500);
})

// server hosting section
let port = process.env.PORT || config.PORT;
app.listen(port, () => {
  console.info(
    `Serving on port ${port}`
  );
});
