import * as Yup from 'yup';
import Product from '../models/Product';

class ProductController {
    async store(request, response) {
        const schema = Yup.object({
            name:  Yup.string().required(),
            price: Yup.number().required(),
            category: Yup.string().required()
        })
        try {
            await schema.validate(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }

        const { filename: path } = request.file;
        const { name, price, category } = request.body;

        const product = await Product.create({
            name,
            price,
            category,
            path
        });

        return response.status(201).json(product)
    }
    // Lista todos os produtos / List all products
    async index(request, response) {
        const products = await Product.findAll();
        return response.json(products);
    }
}

export default new ProductController();