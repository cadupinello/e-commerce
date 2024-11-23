import React, { useEffect, useState } from 'react'
import { api } from '../../utils/Config';
import Layout from '../../components/layout';
import { useSelector, useDispatch } from 'react-redux'
import { getSingleProducts } from '../../slices/Product';
import { useParams, useNavigate } from 'react-router-dom';
import { IoMail, IoLogoXbox } from 'react-icons/io5';
import Loading from '../../components/Loading';

const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, singleProduct, isLoading } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(getSingleProducts(`${params.slug}`));
  }, [dispatch, params.slug]);

  return (
    <Layout>
      {isLoading && singleProduct.length < 1 ? (
        <>
          <div className='align-loading'>
            <Loading />
          </div>
        </>
      ) : (
        <div style={{ background: "#f5f5f5" }}>
          <div>
            <h3>...</h3>
          </div>
          <div className='d-flex'>
            <div className='col-md-6 div-details'>
              <img
                src={`${api}/product/product-photo/${singleProduct._id}`}
                alt="img do jogo"
                style={{ width: "23rem" }}
                className='img-details'
              />
            </div>
            <div className=' div-info-details'>
              <p>{singleProduct.name}</p>
              <h5>{singleProduct.price && singleProduct.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}</h5>
              <span className='cartao'>3x de R$33,30 sem juros</span>
              <button>COMPRAR</button>
              <span className='info'>
                <IoMail /> Envio por E-mail
              </span>
              <hr />
              <span className='info'>
                <IoLogoXbox /> Compatibilidade: Somente xbox e xbox series
              </span>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default ProductDetails