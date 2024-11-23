import React from 'react'
import Layout from '../../components/layout'
import { useCart } from '../../hooks/useCart'
import { api } from '../../utils/Config';
import { useSelector } from 'react-redux';
import axios from 'axios';

const CartPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { cartData, removeItemFromCart } = useCart();

  const removeItemCart = (itemId) => {
    console.log(itemId);
    removeItemFromCart(itemId);
  }

  const handlePaymentCart = async (cartData) => {
    const storedToken = JSON.parse(localStorage.getItem('user'));
    console.log(storedToken.token);
    console.log(user.user._id);

    const cart = {
      userId: user.user._id,
      Email: user.user.email,
      products: cartData,
    }

    try {
      const { data } = await axios.post(`${api}/payment`, {
        cart
      })
      console.log(data.payment.response.init_point);
      window.location.href = data.payment.response.init_point

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <h1>Você tem {cartData && cartData?.length || 0} items em seu carrinho</h1>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cartData && cartData?.map((p) => (
              <div className="row mb-3 card flex-row p-2">
                <div className="col-md-4">
                  <img src={`${api}/product/product-photo/${p._id}`} alt={p.name} style={{ width: "8rem" }} />
                </div>
                <div className="col-md-8">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>{p.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                  }</p>
                  <p>
                    Quantidade: {p.quantity}
                  </p>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeItemCart(p._id)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <p>{cartData && cartData?.reduce((acc, p) => acc + p.price, 0).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}</p>
            <button className='btn btn-primary' onClick={() => handlePaymentCart(cartData)}>
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CartPage