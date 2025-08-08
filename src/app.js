import express from 'express'
import routes from './routes'
//cors
import cors from 'cors'
import './database'

// Para encontrar a pasta Uploads
import { resolve } from 'node:path'

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
        // Express entende a url da imagem product-file
        this.app.use('/product-file', express.static(resolve(__dirname, '..', 'uploads')));
        // Express entende a url da imagem category-file
        this.app.use('/category-file', express.static(resolve(__dirname, '..', 'uploads')));

    }

    routes() {
        this.app.use(routes);
    }
}

export default new App().app;