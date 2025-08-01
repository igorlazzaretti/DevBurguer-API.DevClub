import * as Yup from 'yup';
import Product from '../models/Product';
import Category from '../models/Category';

class ProductController {
    async store(request, response) {
        const schema = Yup.object({
            name:  Yup.string().required(),
            price: Yup.number().required(),
            category_id: Yup.number().required()
        })
        try {
            await schema.validate(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }

        const { filename: path } = request.file;
        const { name, price, category_id } = request.body;

        const product = await Product.create({
            name,
            price,
            category_id,
            path
        });

        return response.status(201).json(product)
    }
    // Lista todos os produtos / List all products
    async index(request, response) {
        const products = await Product.findAll({
            include: [
                { model: Category,
                    as: 'category',
                    attributes: ['id', 'name'] }
                ]
        });
        return response.json(products);
    }
}

export default new ProductController();