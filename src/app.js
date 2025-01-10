import express from 'express'
import routes from './routes'
//cors
import cors from 'cors'
import './database'

class App {
    constructor() {
        this.app = express();
        //cors
        this.app.use(cors());
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

export default new App().app;