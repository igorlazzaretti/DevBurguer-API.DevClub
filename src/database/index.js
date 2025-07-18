import Sequelize from 'sequelize'
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
    }
    init() {
        this.connection = new Sequelize(configDatabase)
        models.map((model) => model.init(this.connection))
    }
}

export default new Database()
