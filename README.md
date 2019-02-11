# ExpressJS Simple Boilerplate

This repo is the simple ExpressJS application with implementation of JWT authentication. Database connection also included which only configured into MongoDB at this moment.

## Install

1.  `git clone https://github.com/irfanrosly/boilerexpress.git`
2.  `npm install` or `yarn install`
3.  Create .env file and define PORT, DB and SECRET
    ```dosini
    PORT=8080
    DB='mongodb://root@localhost:27017/boilerexpress'
    SECRET='iloveboilerexpress'
    ```
4.  For window, please change `nodemon server.js` into `node server.js` if you happened to experience error while running the application
5.  Run `npm start` or `yarn start`
