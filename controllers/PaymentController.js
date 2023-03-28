import Mercadopago from "mercadopago";
import orderModel from "../models/orderModel.js";
import dotenv from "dotenv";
dotenv.config();

Mercadopago.configure({
  sandobox: true,
  access_token: process.env.ACCESS_TOKEN_MP,
})

export const payment = async (req, res) => {
  const { cart } = req.body;

  const order = await orderModel.create({
    products: cart.products,
    buyer: cart.userId,
    status: "pending",
  })

  order.save()

  try {
    const data = {
      items: cart.products.map((item) => {
        return {
          title: item.title,
          quantity: item.quantity,
          currency_id: "BRL",
          unit_price: parseFloat(item.price),
        };
      }),
      payer: {
        email: cart.Email.email,
      },
      external_reference: JSON.parse(JSON.stringify(order._id)),
    }

    const payment = await Mercadopago.preferences.create(data);

    return res.status(201).send({
      success: true,
      message: "Pedido realizado com sucesso",
      payment,
    })

  }catch (error) {
    console.log(error)
  }

}

export const paymentStatus = async (req, res) => {
  payment = await Mercadopago.preferences.find({
    external_reference: req.params.id,
  })

  console.log(payment);

  if(payment.body.status === "approved"){
    res.status(200).send({
      success: true,
      message: "Pagamento realizado com sucesso",
    })
  }

}

  // var data = {
  //   items: [
  //     item = {
  //       title: item.title,
  //       quantity: 1,
  //       currency_id: "BRL",
  //       unit_price: parseFloat(item.price),
  //     }
  //   ],
  //   payer: {
  //     email: email,
  //   },
  //   external_reference: id,
  // }

  // try {
  //   const payment = await Mercadopago.preferences.create(data);
  //   return res.redirect(payment.body.init.point)
  // }catch (error) {
  //   console.log(error)
  // }
