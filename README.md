  <!-- Dependency Status -->
<a href="https://david-dm.org/sidhantpanda/docker-express-typescript-boilerplate">
  <img src="https://david-dm.org/flexdinesh/react-redux-boilerplate.svg" alt="Dependency Status" />
</a>
<!-- devDependency Status -->
<a href="https://david-dm.org/sidhantpanda/docker-express-typescript-boilerplate#info=devDependencies">
  <img src="https://david-dm.org/flexdinesh/react-redux-boilerplate/dev-status.svg" alt="devDependency Status" />
</a>
<a href="https://travis-ci.org/sidhantpanda/docker-express-typescript-boilerplate">
  <img src="https://travis-ci.org/sidhantpanda/docker-express-typescript-boilerplate.svg?branch=master" alt="Build Status" />
</a>
<a href="https://snyk.io//test/github/sidhantpanda/docker-express-typescript-boilerplate?targetFile=package.json">
  <img src="https://snyk.io//test/github/sidhantpanda/docker-express-typescript-boilerplate/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io//test/github/sidhantpanda/docker-express-typescript-boilerplate?targetFile=package.json" style="max-width:100%;">
</a>

# Express TypeScript Boilerplate
This repo can be used as a starting point for backend development with Nodejs. It comes bundled with Docker and is CI/CD optimized. The development environment uses `docker-compose` to start dependent services like mongo.

A few things to note in the project:
* **[Dockerfile](https://github.com/sidhantpanda/docker-express-typescript-boilerplate/blob/master/Dockerfile)** - Dockerfile to generate docker builds.
* **[docker-compose](https://github.com/sidhantpanda/docker-express-typescript-boilerplate/blob/master/docker-compose.yml)** - Docker compose script to start service in production mode.
* **[Containerized Mongo for development](#development)** - Starts a local mongo container with data persistence across runs.
* **[Mongo Connection Helper](https://github.com/sidhantpanda/docker-express-typescript-boilerplate/blob/master/src/mongo-connection.ts)** - A helper class to connect to MongoDB reliably.
* **[Middleware for easier async/await](https://github.com/sidhantpanda/docker-express-typescript-boilerplate/blob/master/src/middleware/handle-error-middleware.ts)** - Catches errors from routes and throws them to express error handler to prevent app crash due to uncaught errors.
* **[OpenAPI 3.0 Spec](https://github.com/sidhantpanda/docker-express-typescript-boilerplate/blob/master/openapi.json)** - A starter template to get started with API documentation using OpenAPI 3.0. This API spec is also available when running the development server at `http://localhost:8000/dev/api-docs`
* **[.env file for configuration](#environment)** - Change server config like app port, mongo url etc
* **[Winston Logger](#logging)** - Uses winston as the logger for the application.
* **ESLINT** - ESLINT is configured for linting.
* **Jest** - Using Jest for running test cases
* **Travis CI** - Pre-configured to a sample Travis CI pipepline for linting, building and running the test suite.

## Installation

### Using `curl`

```
$ bash <(curl -s https://raw.githubusercontent.com/sidhantpanda/public/master/scripts/generate-express-ts-app.sh)
```

### Manual Method

#### 1. Clone this repo

```
$ git clone git@github.com:sidhantpanda/docker-express-typescript-boilerplate.git your-app-name
$ cd your-app-name
```

#### 2. Install dependencies

```
$ npm i
```

## Development

### Start dev server
Starting the dev server also starts MongoDB as a service in a docker container using the compose script at `docker-compose.dev.yml`.

```
$ npm run dev
```
Running the above commands results in 
* 🌏**API Server** running at `http://localhost:8000`
* ⚙️**Swagger UI** at `http://localhost:8000/dev/api-docs`
* 🛢️**MongoDB** running at `mongodb://localhost:27017`

## Packaging and Deployment
#### 1. Run with docker-compose

```
$ docker-compose up
```

#### 2. Run with docker

```
$ docker build -t api-server .
$ docker run -t -i -p 8000:8000 api-server
```

#### 3. Build and run

```
$ npm run build && npm run start
```

---

## Environment
To edit environment variables, create a file with name `.env` and copy the contents from `.env.default` to start with.

| Var Name  | Type  | Default | Description  |
|---|---|---|---|
| NODE_ENV  | string  | `development` |API runtime environment. eg: `staging`  |
|  PORT | number  | `8000` | Port to run the API server on |
|  MONGO_URL | string  | `mongodb://localhost:27017/books` | URL for MongoDB |

## Logging
The application uses [winston](https://github.com/winstonjs/winston) as the default logger. The configuration file is at `src/logger.ts`.
* All logs are saved in `./logs` directory and at `/logs` in the docker container.
* The `docker-compose` file has a volume attached to container to expose host directory to the container for writing logs.
* Console messages are prettified
* Each line in error log file is a stringified JSON.


### Directory Structure

```
+-- scripts
|   +-- dev.sh
+-- src
|   +-- controllers
|   |   +-- book
|   |   |   +-- add.ts
|   |   |   +-- all.ts
|   |   |   +-- index.ts
|   |   |   +-- search.ts
|   +-- errors
|   |   +-- index.ts
|   +-- middleware
|   |   +-- handle-error-middleware.ts
|   +-- models
|   |   +-- Book.ts
|   +-- app.ts
|   +-- mongo-connection.ts
|   +-- routes.ts
|   +-- server.ts
+-- .env
+-- .env.default
+-- .eslintrc.json
+-- .gitignore
+-- .travis.yml
+-- docker-compose.dev.yml
+-- docker-compose.yml
+-- Dockerfile
+-- jest.config.js
+-- nodemon.json
+-- openapi.json
+-- package-lock.json
+-- package.json
+-- README.md
+-- tsconfig.json
```
