import React, { useEffect, useState } from 'react'
import Layout from '../../../components/layout';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../../slices/Product';
import MenuDashboard from '../../../components/menuDashboard';
import { Link } from 'react-router-dom';
import { api } from '../../../utils/Config';

const AllProducts = () => {

  const dispatch = useDispatch();

  const { products, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      <Layout>
        <div className="row">
          <div className="col-md-3 mt-5">
            <MenuDashboard />
          </div>
          <div className="col-md-9 mt-1">
            <h1 className='text-center'>All Products List</h1>
            <div className="d-flex flex-wrap justify-content-center">
              {isLoading && <div className="spinner-border text-primary d-flex justify-content-center" role="status"></div>}
              {products.map((p) => (
                <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className="product-link">
                  <div className="card m-2" style={{ width: "15rem" }}>
                    <img src={`${api}/product/product-photo/${p._id}`} alt={p.name} className="card-img-top" />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </Layout>
    </>
  )
}

export default AllProducts