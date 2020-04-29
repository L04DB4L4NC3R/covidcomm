import { InfoAPICronFunc } from "../src/pkg/outbound/cron";
import mongoose from "mongoose";
//
// dotenv
const dotenv = require("dotenv");
dotenv.config("../.env");

// mongoDB connection promise
mongoose.connect(<string>process.env.DB_URI, {
  useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
}).then(() => {
  console.log("Connected to MongoDB")
	InfoAPICronFunc([])
	.then(console.log)
	.catch(console.error)
}).catch((err: any) => {
  console.error(err);
  process.exit(1);
})

