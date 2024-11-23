import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout'
import { getCategories } from '../../slices/category';
import { useSelector, useDispatch } from 'react-redux';
import { api } from '../../utils/Config';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import axios from 'axios';
import { IoCartSharp } from 'react-icons/io5';
import * as Styled from './styled'

const HomePage = () => {
  const { cartData, addItemToCart } = useCart();
  const [product, setProduct] = useState([]);
  const [loadingMore, setLoadingMore] = useState(1);

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [quantity, setQuantity] = useState();
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const { products, isLoading } = useSelector((state) => state.product);
  const { categories, isLoading: loading } = useSelector((state) => state.category);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${api}/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!checked.length || !radio.length) {
      getAllProducts();
      setProduct(products);
    }
  }, [checked, radio]);

  useEffect(() => {
    dispatch(getCategories());
    getTotal();
  }, [dispatch]);

  const loadMore = async () => {
    try {
      setLoadingMore(true);
      const { data } = await axios.get(`${api}/product/product-list/${page}`)
      setLoadingMore(false);
      setProduct([...product, ...data?.products]);
    } catch (error) {
      setLoadingMore(false);
      console.log(error);
    }
  }

  useEffect(() => {
    if (page === 1) return
    loadMore();
  }, [page]);

  const handleCart = (product) => {
    addItemToCart(product);
  }

  const getAllProducts = async () => {
    try {
      setLoadingMore(true);
      const { data } = await axios.get(`${api}/product/product-list/${page}`)
      setLoadingMore(false);
      setProduct(data.products);

    } catch (error) {
      setLoadingMore(false);
      console.log(error);
    }
  }

  return (
    <>
      <Layout title={"All Products - Best offers"} cartData={cartData}>
        <div className="row mt-3">
          <div className="col-md-9">
            <h1 className='text-center'>All Products</h1>
            <div className="d-flex flex-wrap">
              {product.length > 0 && product.map((p) => (
                <div className="card m-2" style={{ width: "15rem" }} key={p._id}>
                  <button onClick={() => navigate(`/product/${p.slug}`)}>
                    <img
                      src={`${api}/product/product-photo/${p._id}`}
                      alt={p.name}
                      className="card-img-top"
                    />
                  </button>
                  <div className="card-body">
                    <h6 className="card-title">{p.name}</h6>
                    <Styled.Input
                      type="number" value={quantity || p.quantity} onChange={(e) => setQuantity(e.target.value)}
                    />
                    <p className="card-text money">
                      {p?.price?.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </p>
                    {user ? (
                      <button
                        className="buttonAddCart"
                        onClick={() => handleCart(p)}
                      >
                        <IoCartSharp style={{ marginRight: "5px" }} />
                        Comprar
                      </button>
                    ) : (
                      <button
                        className="buttonAddCart"
                        onClick={() => navigate("/login")}
                      >
                        <IoCartSharp style={{ marginRight: "5px" }} />
                        Comprar
                      </button>
                    )}
                  </div>
                </div>
              ))
              }
            </div>
            <div className="m-2 p-3">
              {product && product.length < total && (
                <button
                  className="btn btn-warning btn-sm"
                  onClick={(e) => {
                    e.preventDefault()
                    setPage(page + 1)
                  }}
                >
                  {loadingMore ? (
                    "Carregando ..."
                  ) : (
                    "Carregar mais"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </Layout>

    </>
  )
}

export default HomePage