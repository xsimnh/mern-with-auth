# mern-with-auth

A MERN application with authentication using passport and jwt.

Tech stack contains: react, express and mongodb.

## configuration

create your own environment parameters in an env file, an example in `.env.example`

```
NODE_ENV = development
PORT = YOUR_OWN_PORT
ACCESS_TOKEN_SECRET = YOUR_OWN_ACCESS_TOKEN_SECRET
REFRESH_TOKEN_SECRET = YOUR_OWN_REFRESH_TOKEN_SECRET
ACCESS_TOKEN_EXPIRES = YOUR_OWN_ACCESS_TOKEN_EXPIRES
REFRESH_TOKEN_EXPIRES = YOUR_OWN_REFRESH_TOKEN_EXPIRES
MONGODB_URI = YOUR_OWN_MONGODB_URI
```

## quick start

### client side

```terminal
// install packages
$ npm i or yarn

// for development
$ npm run start // use webpack-dev-server to serve website
$ npm run build // build static files
$ npm run watch // watch files and dynamically build static files
$ npm run eslint // check eslint rule
$ npm run eslint fix // check eslint rule and auto fix problems

// for deployment
$ npm run prod // build static files with compression
```

### server side

```terminal
// start mock api
$ npm run mock

// serve web app
$ npm run serve
```

or using vscode task, see details in [tasks.json](./.vscode/tasks.json)
