import React from 'react'
import { api } from '../../utils/Config';

const ProductItem = ({ product }) => {
  return (
    <>
      <div className="card m-2" style={{ width: "20rem" }}>
        <img
          src={`${api}/product/product-photo/${product._id}`}
          alt={product.name}
          className="card-img-toproduct"
        />
        <div className="card-body">
          <h6 className="card-title">{product.name}</h6>
          <p className="card-text">R$ {product.price}</p>
          <button className="btn btn-primary btn-sm me-2">Detalhes</button>
          <button className="btn btn-secondary btn-sm">ADD</button>
        </div>
      </div>
    </>
  )
}

export default ProductItem