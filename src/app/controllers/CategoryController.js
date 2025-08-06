import * as Yup from 'yup';
import Category from '../models/Category';
import User from '../models/User';


class CategoryController {
    // Criação de categoria
    async store(req, res) {
        const schema = Yup.object({
            name: Yup.string().required(),
        });
        try {
            schema.validateSync(req.body, { abortEarly: false });
        } catch (err) {
            return res.status(400).json({ error: err.errors });
        }
        // Verifica se o usuário é um administrador
        const {admin: isAdmin} = await User.findByPk(req.userId);
        if (!isAdmin) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { name } = req.body;

        // Verifica se a categoria já existe
        const categoryExists = await Category.findOne({ where: { name } });
        if (categoryExists) {
            return res.status(400).json({ error: 'Category already exists' });
        }

        const {id} = await Category.create({
            name,
        });
        return res.status(201).json({id, name});
    }

    // Listagem de categorias
    async index(req, res) {
        const categories = await Category.findAll();
        return res.json(categories);
    }
}

export default new CategoryController();