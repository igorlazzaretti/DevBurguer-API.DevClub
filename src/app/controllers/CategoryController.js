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
        const { filename: path } = req.file;
        const { name } = req.body;

        // Verifica se a categoria já existe
        const categoryExists = await Category.findOne({ where: { name } });
        if (categoryExists) {
            return res.status(400).json({ error: 'Category already exists' });
        }

        const {id} = await Category.create({
            name, path,
        });
        return res.status(201).json({id, name});
    }
    // Update de categoria
    async update(request, response) {
        // Se não for passadas nennhuma informação, apresenta erro
        // if (!name && !path) {
        //     return response.status(400).json({ error: 'You must provide a name or an image' });
        // }
        // Validação do schema
        const schema = Yup.object({
            name: Yup.string(),
        });
        try {
            schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }
        // Verifica se o usuário é um administrador
        const {admin: isAdmin} = await User.findByPk(request.userId);
        if (!isAdmin) {
            return response.status(401).json({ error: 'Unauthorized' });
        }
        const { id } = request.params;
        // Path opcional
        let path;
        if (request.file) {
            path = request.file.filename;
        }
        // Verifica se a categoria existe
        const category = await Category.findByPk(id);
        if (!category) {
            return response.status(400).json({ error: 'Make sure Category ID is correct' });
        }
        // Verifica se o nome da categoria já existe
        const { name } = request.body;


        if ( name ) {
            const categoryNameExists = await Category.findOne({ where: { name } });
            // Aceita nome idêntico apenas se for o mesmo ID
            if (categoryNameExists && categoryNameExists.id != id) {
                return response.status(400).json({
                    error: 'Category name already exists'
                });
            }
        }

        await Category.update(
            { name, path },
            { where: { id } }
        );

        return response.status(200).json();
    }

    // Listagem de categorias
    async index(request, response) {
        const categories = await Category.findAll();
        return response.json(categories);
    }
}

export default new CategoryController();