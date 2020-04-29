<p align="center">
<img src="https://fontmeme.com/permalink/200418/03eb6d29fa600fb86446393494a44f7a.png">
</p>

## CovidComm

A project for communication aid during the COVID-19 outbreak. Note that this project is made for the Twilio DEV community Hackathon. The following is the track being followed in this project:

> COVID-19 Communications

Head over to the [official user interface repository](https://github.com/L04DB4L4NC3R/covidcomm-ui/blob/master/README.md) for CovidComm to look at it's features, demo, and installation.

[![Alt text](https://img.shields.io/badge/docs-view%20documentation-yellowgreen)](https://documenter.getpostman.com/view/3896915/SzfDx5Hi)

#### Getting started

* Create a file called `.env` with the following content. You can configure it according to your own desired settings.

```bash
# JSON Web Token
JWT_SECRET="sajndaskdnsakdnaksndjs"

# Morgan logging level
LOGGING_FMT="combined"

# The full API URL being used for fetching news
INFO_API_URL= ""

# Calling CRONJOB time
CRON_DEFAULT_TIME="* * * 1 * *"

# Calling CRONJOB time for testing
CRON_TESTING_TIME="10 * * * * *"

# SALT for hashing, should be an integer
HASH_SALT=771

# Database URI
DB_URI="mongodb://<dbuser>:<dbpassword>@<hostname>:<port>/<database_name>"

# Base URL
API_VERSION= "/api/v1"

# Account SID
TWILIO_ACCOUNT_SID= ""

# Auth token for programmable voice API
TWILIO_AUTH_TOKEN= ""

# Given phone number by twilio
TWILIO_PHONE_NUMBER= ""

# A verified phone number (for testing)
TWILIO_VERIFIED_NUMBER= ""

# Service SID for Verifying phone numbers on the fly
TWILIO_SERVICE_SID=""
```

* Run the following commands to get started:

```sh
# Install dependancies
npm i

# Compile typescript and run server in filewatch mode
npm run dev
```
