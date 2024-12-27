// const express = require('express');
import express from 'express';
// const routes = require('./routes');
import routes from './routes';

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json());
    }

    routes() {
        this.app.use(routes);
    }
}

// module.exports = new App().app;
export default new App().app;