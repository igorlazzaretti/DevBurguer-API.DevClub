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
        const category = await Category.create({
            name,
        });
        return res.status(201).json({category});
    }

    // Listagem de categorias
    async index(req, res) {
        const categories = await Category.findAll();
        return res.json(categories);
    }
}

export default new CategoryController();