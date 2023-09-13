# mern-with-auth

A MERN application with authentication using passport and jwt.

Tech stack contains: react, express and mongodb.

## configuration

Set your own mongodb url in `server/config.js`.

```js
module.exports = {
  DB_URL: "YOUR_OWN_MONGODB_URL",
  secretOrKey: "xsimnh",
  expires: "1m",
};
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
