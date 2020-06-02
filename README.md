# PipeBling
Systems integration: Pipedrive and Bling with Node.JS

## Instalation

The project requires [Node.js](https://nodejs.org/) to run. (I'm using Node 12.16.1 LTS)

Install the dependencies with [NPM](https://docs.npmjs.com/) or [Yarn](https://yarnpkg.com/).

With Yarn:

inside the project's root directory

```sh
$ yarn
$ yarn start
```

With NPM:

inside the project's root directory

```sh
$ npm i
$ npm start
```

## Dependencies:

- [Nodemon](https://nodemon.io/): is a utility that will monitor for any changes in your source and automatically restart your server
- [Sentry](https://sentry.io/welcome/): Sentry provides self-hosted and cloud-based error monitoring that helps all software
teams discover, triage, and prioritize errors in real-time.
- [HelmetJS](https://www.npmjs.com/package/youch): helps you secure your Express apps by setting various HTTP headers
- [.env](https://www.npmjs.com/package/dotenv): Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
- [Youch](https://www.npmjs.com/package/youch): Reading stack trace of the console slows you down from active development. Instead Youch print those errors in structured HTML to the browser.
- [express-async-errors](https://www.npmjs.com/package/express-async-errors): Async/await error handling support for expressjs.
- [Axios](https://github.com/axios/axios): Promise based HTTP client for the browser and node.js
- [Sucrase](https://www.npmjs.com/package/sucrase): to use import/export syntax

## Linters


- [ESLint](https://eslint.org/): Find and fix problems in your JavaScript code (I'm using the Airbnb package)
- [Prettier](https://prettier.io/): An opinionated code formatter
