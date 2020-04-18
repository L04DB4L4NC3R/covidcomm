![Alt text](https://fontmeme.com/permalink/200418/dedae629b737f5d5f6d44250e7ce8ca2.png)

## CovidComm

A project for communication aid during the COVID-19 outbreak. Note that this project is made for the Twilio DEV community Hackathon. The following is the track being followed in this project:

> COVID-19 Communications

[![Alt text](https://img.shields.io/badge/docs-view%20documentation-yellowgreen)](https://documenter.getpostman.com/view/3896915/Szf3aW6y)

#### Getting started

* Create a file called `config.ts` with the following content. You can configure it according to your own desired settings.

```ts
export default {
  JWT_SECRET : "sajndaskdnsakdnaksndjs",
  PORT: 3000,
  LOGGING_FMT: "combined",
  INFO_API_URL: "https://google.com",
  CRON_DEFAULT_TIME: "* * * 1 * *",
  CRON_TESTING_TIME: "10 * * * * *",
  HASH_SALT: "kwenf;wnqkcwqegkvnqwkfkwekfnwkefwbefjbwejfbwejff",
  DB_URI: "mongodb://<dbuser>:<dbpassword>@<hostname>:<port>/<database_name>",
  API_VERSION: "/api/v1"
};
```

* Run the following commands to get started:

```sh
# Install dependancies
npm i

# Compile typescript and run server in filewatch mode
npm run dev
```
