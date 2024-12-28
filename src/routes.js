// const { Router } = require('express');
import { Router } from 'express';
// UUID
import { v4 } from 'uuid'

import User from './app/models/User'
import { password } from './config/database';

const routes = new Router();

routes.get('/', async (req, res) => {
    const user = await User.create({
        id: v4(),
        name: 'Harry Potter One',
        email: 'hp@email.com',
        password_hash: '12i2ji2i2h3u23bnndj#wsavada',
        admin: true,
    })
    return res.status(201).json(user)
})


// module.exports = routes;
export default routes;