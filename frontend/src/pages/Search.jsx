import React from 'react'

// hooks
import { useQuery } from '../Hooks/useQuery'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// redux
import { searchProduct } from '../slices/Product'

// components
import ProductItem from '../components/ProductItem'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'

const Search = () => {
  const query = useQuery();
  const search = query.get('q');

  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const { products, isLoading } = useSelector(state => state.product);

  useEffect(() => {
    if(search) {
      dispatch(searchProduct(search))
    }else {
      console.log('no search')
    }
  }, [dispatch,search])

  if(isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <Layout>
        <h2>Você está buscando por {search}</h2>
        {products && products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </Layout>
    </>
  )
}

export default Search