import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout'
import { getAllProducts } from '../slices/Product'
import { getCategories } from '../slices/category';
import { useSelector, useDispatch } from 'react-redux';
import { api } from '../utils/Config';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { IoCartSharp } from 'react-icons/io5';

const HomePage = () => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState();
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(1);

  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.product);
  const { categories, isLoading: loading } = useSelector((state) => state.category);

  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${api}/product/product-count`);
      setTotal(data?.total);
    }catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    dispatch(getCategories());
    getTotal();
  }, [dispatch]);

  const handleFilter = (value, id) => {
    let all = [...checked];
    
    if(value) {
      all.push(id);
    } else {
      all = all.filter(item => item !== id);
    }
    setChecked(all);
  }

  const getAllProducts = async () => {
    try {
      setLoadingMore(true);
      const { data } = await axios.get(`${api}/product/product-list/${page}`)
      setLoadingMore(false);
      setProduct(data.products);

    }catch (error) {
      setLoadingMore(false);
      console.log(error);
    } 
  }

  const loadMore = async () => {
    try {
      setLoadingMore(true);
      const { data } = await axios.get(`${api}/product/product-list/${page}`)
      setLoadingMore(false);
      setProduct([...product, ...data?.products]);
    }catch (error) {
      setLoadingMore(false);
      console.log(error);
    }
  }

  useEffect(() => {
    if(page === 1) return 
    loadMore();
  }, [page]);

  useEffect(() => {
    if(!checked.length || !radio.length) {
      getAllProducts();
      setProduct(products);
    }
  }, [checked, radio]);

  useEffect(() => {
    if(checked.length || radio.length) {
      filterProducts();
    }
  }, [checked, radio]);

  const filterProducts = async () => {
    try {
      const { data } = await axios.post(`${api}/product/product-filters`, {
        checked,
        radio,
      })
      setProduct(data?.products);
    }catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Layout title={"All Products - Best offers"} >
        <div className="row mt-3">
          <div className="col-md-2">
            <h4 className='text-center'>Filtre Por Categorias</h4>
            <div className="d-flex flex-column">
              {categories?.map((category) => (
                <Checkbox key={category._id} onChange={(e) => handleFilter(e.target.checked, category._id)}>
                  {category.name}
                </Checkbox>
              ))}
            </div>
            <h4 className='text-center'>Filtre Por Preços</h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((price) => (
                  <div key={price._id}>
                    <Radio value={price.array}>{price.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <button 
              className="btn btn-danger btn-sm mt-2"
              onClick={() => window.location.reload()}
            >
              Resetar Filtros
            </button>
          </div>
          <div className="col-md-9">
            <h1 className='text-center'>All Products</h1>
            <div className="d-flex flex-wrap">    
                  {product.length > 0 && product.map((p) => (
                    <div className="card m-2" style={{width: "15rem"}}>
                      <Link to={`/product/${p.slug}`}>
                        <img 
                          src={`${api}/product/product-photo/${p._id}`} 
                          alt={p.name} 
                          className="card-img-top"  
                        />
                      </Link>
                      <div className="card-body">
                        <h6 className="card-title">{p.name}</h6>
                        <p className="card-text money">
                          {p.price.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })  }
                        </p>
                        <button className="buttonAddCart">
                          <IoCartSharp style={{marginRight: "5px"}}/> 
                          Comprar
                        </button>
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
                ): (
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