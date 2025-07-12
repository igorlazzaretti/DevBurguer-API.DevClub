import * as Yup from 'yup';
import Category from '../models/Category';


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