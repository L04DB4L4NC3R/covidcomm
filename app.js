const express = require("express");
const VoiceResponse = require("twilio").twiml.VoiceResponse;
const morgan = require("morgan");

const app = express();
app.use(morgan("combined"));

app.get("/ping", (req, res, next) => {
  return res.json({status: true}).status(200);
})

app.post("/voice", (req, res, next) => {
  const twiml = new VoiceResponse();
  twiml.say({ voice: "alice" }, "Hello, World!");

  response.type('"text/xml"');
  response.send(twiml.toString());
});

app.get("/*", (req, res, next) => {
  return res.json({message: "Not Found"}).status(404);
})

app.use((err, req, res, next) => {
  return res.json({message: "Error occurred", error_log: err}).status(500);
})

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.info(
    `Serving on port ${port}`
  );
});
