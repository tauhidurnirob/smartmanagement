# Consap Smart FM Platform Webportal


## Installation

Consap-Smart FM Platform [Node.js](https://nodejs.org/) v14+ to run.
Node version: v18.13.0 (LTS)


Download the latest node version manager from https://github.com/nvm-sh/nvm

### Install the latest nodejs and dependencies and start the application.
```sh
nvm install --lts
npm install
```
### Install pre-commit using husky
```
yarn prepare:init
```

### Running the application
```sh
npm install
npm start
```

### Building the application

#### Build staging
```sh
npm build:dev
```
#### Build production
```sh
npm build:prod
```

### To run tests, run the following command

```sh
npm run test
```

## Technologies

| Plugin | README |
| ------ | ------ |
| Web Framework | React 18 |
| CSS Framework | React Material UI, React Emotion |
| State management | Redux-Toolkit |
| API Query | React query |
| Formatting Code | Prettier |
| Code styling rules check | Eslint |

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`               3001                                         
`GENERATE_SOURCEMAP`    true                              

## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Example Color | ![#0a192f](https://via.placeholder.com/10/0a192f?text=+) #0a192f |
| Example Color | ![#f8f8f8](https://via.placeholder.com/10/f8f8f8?text=+) #f8f8f8 |
| Example Color | ![#00b48a](https://via.placeholder.com/10/00b48a?text=+) #00b48a |
| Example Color | ![#00d1a0](https://via.placeholder.com/10/00b48a?text=+) #00d1a0 |


## Libraries

- [@emotion/react](https://www.npmjs.com/package/@emotion/react)
- [@emotion/styled](https://www.npmjs.com/package/@emotion/styled)
- [@mui/icons-material](https://www.npmjs.com/package/@mui/icons-material)
- [@mui/material](https://www.npmjs.com/package/@mui/material)
- [@reduxjs/toolkit](https://www.npmjs.com/package/@reduxjs/toolkit)
- [react-redux](https://www.npmjs.com/package/react-redux)
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [react-topbar-progress-indicator](https://www.npmjs.com/package/react-topbar-progress-indicator)
- [redux-persist](https://www.npmjs.com/package/redux-persist)

## Development

Want to contribute? Great!


## Deployment

To deploy this project
