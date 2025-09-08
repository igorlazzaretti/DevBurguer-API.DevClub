import Stripe from 'stripe'
require('dotenv').config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import * as Yup from 'yup'

const calculateOrderAmount  = (items) => {
  const total = items.reduce((acc, current) => {
    return current.price * current.quantity + acc;
  }, 0);
  return total;
}

class CreatePaymentIntentController {
  async store(request, response) {
    const schema = Yup.object({
      products:  Yup.array().required().of(
          Yup.object({
              id: Yup.number().required(),
              quantity: Yup.number().required(),
              price: Yup.number().required(),
          })
      ),
    })

    try {
      await schema.validate(request.body, { abortEarly: false })
    } catch (err) {
        return response.status(400).json({ error: err.errors })
    }
    // Produtos
    const { products } = request.body;
    // Calcula o Valor Total do Pagamento
    const amount = calculateOrderAmount(products);
    // Documentação do Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'brl',
      automatic_payment_methods: {
        enabled: true, },
    });
    response.send({
      clientSecret: paymentIntent.client_secret,
      dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
    });
    console.log('paymentIntent:', paymentIntent);
  }
}
export default new CreatePaymentIntentController()