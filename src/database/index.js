import Sequelize from 'sequelize'
import mongoose from 'mongoose'
import configDatabase from '../config/database'
// Importando as models
import User from '../app/models/User'
import Product from '../app/models/Product'
import Category from '../app/models/Category'

// Array com todos os models da aplicação
const models = [User, Product, Category]

class Database {
    constructor() {
        this.init()
        this.mongo()
    }
    init() {
        this.connection = new Sequelize(configDatabase);
        models
            .map(
                (model) => model.init(this.connection))
            .map(
                (model) => model.associate && model.associate(this.connection.models)
            );
    }
    mongo() {
        // Implementa conexão com o MongoDB
        this.mongoConnection = mongoose.connect(
            'mongodb://localhost:27017/devburguer'
        );

    }
}

export default new Database()
