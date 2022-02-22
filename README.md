# Applications API

![](https://cdn.lendo.se/v4/svg/logodark.svg)

## Tech Stack

> Node, Express, PostgreSQL

## API documentation:

https://app.swaggerhub.com/apis-docs/tarcea/applicatins-api-002/0.0.2

## Deployed version:

https://gt-applications-api.herokuapp.com

## Example endpoints:

### Get applications by status

[/api/applications?status=completed](https://gt-applications-api.herokuapp.com/api/applications?status=completed)

[/api/applications?status=rejected](https://gt-applications-api.herokuapp.com/api/applications?status=rejected)

### Get application by id

[/api/applications/8207faa3-7c9b-4a45-864c-ebef08bbffe4
](https://gt-applications-api.herokuapp.com/api/applications/8207faa3-7c9b-4a45-864c-ebef08bbffe4)

### POST an application

Post works just in localhost:
- assure that Lendo's API is running on port 8000
- clone this repo, install dependencies and insert a .env file in the root directory with the next content filled out with real data from an ElephantSQL database (https://www.elephantsql.com/):

```bash

DB_USER=
DB_HOST=
DB_NAME=
DB_PASSWORD=
DB_USER_TEST=
DB_HOST_TEST=
DB_NAME_TEST=
DB_PASSWORD_TEST=

```
- start the project 

```bash
npm run dev 
```
- the project is running on port 8080, use Postman to post applications
