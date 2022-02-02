# Node.js recruitment task

The movie application that allows users to save movies to their collections by searching for movies' titles.

## Prerequisites

You need to have `docker` and `docker-compose` installed on your computer to run the service

## Run locally

1. Clone this repository
2. Run the following command:

```
npm i
```

3. Add .env file and variables inside it

```
MONGODB_URI=your-MongoDB-URI
MongoDB URI looks like: mongodb://localhost:27017/your-project-name-here
JWT_SECRET=your-JWT-secret key
OMDBAPI_KEY= your-API-key from https://omdbapi.com/
```

3. Compose your docker files

```
JWT_SECRET=-your-JWT-secret docker-compose up -d
```

By default the auth service will start on port `3000` but you can override
the default value by setting the `APP_PORT` env var

```
APP_PORT=8081 JWT_SECRET=secret docker-compose up -d
```

To stop the authorization service run

```
docker-compose down
```

## Server routes

POST `/auth` -  Authorization route. 
POST `/movies` - Private route. Sends saved by user movies to DB.
GET `/movies` - Private route. Retrives saved by user movies.

## Users

The auth service defines two user accounts that you should use

1. `Basic` user - can only save five movies per month.

```
 username: 'basic-thomas'
 password: 'sR-_pcoow-27-6PAwCD8'
```

1. `Premium` user - unlimited

```
username: 'premium-jim'
password: 'GBLtTyq3E_UNjFnpo9m6'
```

## Example request

## POST/auth request

To authorize user call the auth service using for example `curl`. We assume
that the auth service is running of the default port `3000`.

Request

```
curl --location --request POST '0.0.0.0:3000/auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "basic-thomas",
    "password": "sR-_pcoow-27-6PAwCD8"
}'
```

Response

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTYwNjIyMTgzOCwiZXhwIjoxNjA2MjIzNjM4LCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.KjZ3zZM1lZa1SB8U-W65oQApSiC70ePdkQ7LbAhpUQg"
}
```

## POST/movies example request

To save a movie to the DB, call POST request to endpoint /movies through an application used for API testing (e.g., Postman).
The service must be running.

1. Verify user's authorization token. The token should be passed in request's Authorization header.

```
Authorization: Bearer <token>
```

2. In request body under x-www-form-urlencoded add your OMDBAPI_KEY.

```
KEY: OMDBAPI_KEY Value: your-API-key
```

3. In request body under raw add searchQuery (JSON).

```
{
"searchQuery" : "avengers"
}
```

4. Response

```
{
 "Title": "The Avengers",
    "Released": "2012-05-03T23:00:00.000Z",
    "Genre": "Action, Adventure, Sci-Fi",
    "Director": "Joss Whedon",
    "createdBy": "123",
    "_id": "61f9efb7f1a6c81803257cf4",
    "created_at": "2022-02-02T02:43:03.763Z",
    "updated_at": "2022-02-02T02:43:03.763Z",
    "__v": 0
}
```

## GET/movies example request

To retrieve one's user-saved movies, send a GET request to endpoint /movies through an application used for API testing (e.g., Postman).
The service must be running.

1. Verify user's authorization token. The token should be passed in request's Authorization header and send the request.

```
Authorization: Bearer <token>
```

2. Response 

```
[
    {
        "_id": "61f9ec67d85096cbf3ad2d10",
        "Title": "100",
        "Released": "2019-05-02T23:00:00.000Z",
        "Genre": "Action",
        "Director": "Sam Anton",
        "createdBy": "123",
        "created_at": "2022-02-02T02:28:55.564Z",
        "updated_at": "2022-02-02T02:28:55.564Z",
        "__v": 0
    },
    {
        "_id": "61f9ef4be7c318ac5daeaf4a",
        "Title": "Happy",
        "Released": "2012-02-11T00:00:00.000Z",
        "Genre": "Documentary, Drama, Family",
        "Director": "Roko Belic",
        "createdBy": "123",
        "created_at": "2022-02-02T02:41:15.870Z",
        "updated_at": "2022-02-02T02:41:15.870Z",
        "__v": 0
    }
]
```

## Sample test result from CircleCI
```
Build-agent version 1.0.105680-924e1373 (2022-01-31T21:01:13+0000)
System information:
 Server Version: 20.10.12
 Storage Driver: overlay2
  Backing Filesystem: xfs
 Cgroup Driver: cgroupfs
 Cgroup Version: 1
 Kernel Version: 5.11.0-1027-aws
 Operating System: Ubuntu 20.04.3 LTS
 OSType: linux
 Architecture: x86_64

Starting container cimg/base:stable
cimg/base:stable:
  using image cimg/base@sha256:bf1a115683b4b0366dce294accf87ba967b9ad0d78f29d974b71dc7e79ffbee2
  pull stats: Image was already available so the image was not pulled
  time to create container: 69ms
Warning: No authentication provided, using CircleCI credentials for pulls from Docker Hub.
  image is cached as cimg/base:stable, but refreshing...
stable: Pulling from cimg/base
Digest: sha256:bf1a115683b4b0366dce294accf87ba967b9ad0d78f29d974b71dc7e79ffbee2
Status: Image is up to date for cimg/base:stable
Time to upload agent and config: 353.695034ms
Time to start containers: 338.938457ms
```