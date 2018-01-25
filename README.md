[![Build Status](https://travis-ci.org/FerreiraRaphael/EmpresasApp.svg?branch=master)](https://travis-ci.org/FerreiraRaphael/EmpresasApp) [![Coverage Status](https://coveralls.io/repos/github/FerreiraRaphael/EmpresasApp/badge.svg?branch=master)](https://coveralls.io/github/FerreiraRaphael/EmpresasApp?branch=master)

# Empresas App

App for the Oobj selective process.

App build can be seen in [travis-ci](https://travis-ci.org/FerreiraRaphael/EmpresasApp).

App test coverage can be seen in [coveralls](https://coveralls.io/github/FerreiraRaphael/EmpresasApp).

App can be seen in [http://empresas-app.heroku-app.com/](http://empresas-app.heroku-app.com/)

Deploy done automatically when commite is done in the master branch and build in travis-ci succeeds

## Starting App

### Backend

Rename `config/config.example.js` to `config/config.js` 
and adjust the it to fit your environment. 
Once thats done, your database configuration is ready!

Run the following commands:
```
npm install
node_modules/.bin/sequelize db:create
node_modules/.bin/sequelize db:migrate
npm start
```

This will start the application and create an database and run it's migrations.
Just open [http://localhost:3001](http://localhost:3001).

### Angular Client

Run the following commands:
```
cd client
npm install
npm start
```

## Tests

There is some [Mocha](https://mochajs.org) based test. You can run them by `npm test`

## Eslint

Eslint rules extends [eslint-config-airbnb-base](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base) and [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier).

## Tslint
Tslint rules are the default of the [angular-cli](https://github.com/angular/angular-cli) project.

## Travis CI and Heroku

To add a deploy key to .travis.yml run:
`travis encrypt heroku auth:token --add deploy.api_key`
Obs: Make sure that you are logged at the travis cli and heroku cli.
