import * as Yup from 'yup';
import Order from '../schemas/Order';
import Product from '../models/Product';
import Category from '../models/Category';

class OrderController {
    async store(req, response) {
        const schema = Yup.object({
            products:  Yup.array().required().of(
                Yup.object({
                    id: Yup.number().required(),
                    quantity: Yup.number().required(),
                })
            ),
        })
        try {
            await schema.validate(req.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }

        const { products } = req.body;

        // Buscando os dados dos produtos no banco de dados
        // Retorna os Ids dos produtos
        const productsIds = products.map(product => product.id);
        // Retorna os dados dos produtos que possuem os Ids do Pedido
        const findProducts = await Product.findAll({
            where: {
                id: productsIds
            },
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['name']
                }
            ]
        });
        // Formata os dados dos produtos para serem retornados para o Usuário
        const formattedProducts = findProducts.map(product => {
            // Verifica o Id do produto para informar a quantidade
            const productIndex = products.findIndex(item => item.id === product.id);

            const newProduct = {
                id: product.id,
                name: product.name,
                price: product.price,
                category: product.category. name,
                url: product.url,
                quantity: products[productIndex].quantity,
            }
        return newProduct;
        });

        const order = {
            user: {
                id: req.userId,
                name: req.userName,
            },
            productsIds,
            formattedProducts,
        }

        return response.status(201).json(order)
    }
}

export default new OrderController();