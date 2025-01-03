// const { Router } = require('express');
import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)


// module.exports = routes;
export default routes;