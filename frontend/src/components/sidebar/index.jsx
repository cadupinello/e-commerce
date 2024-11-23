import React, { useEffect, useState } from 'react'
import { Checkbox, Radio } from 'antd';
import { Prices } from '../../components/Prices';
import { getAllProducts } from '../../slices/Product'
import { useSelector } from 'react-redux';
import * as Styled from './styled'

const Sidebar = () => {
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const { products, isLoading } = useSelector((state) => state.product);
  const { categories, isLoading: loading } = useSelector((state) => state.category);
  const [product, setProduct] = useState([]);
  const [loadingMore, setLoadingMore] = useState(1);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      getAllProducts();
      setProduct(products);
    }
  }, [checked, radio]);

  useEffect(() => {
    if (checked.length || radio.length) {
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
    } catch (error) {
      console.log(error);
    }
  }

  const handleFilter = (value, id) => {
    let all = [...checked];

    if (value) {
      all.push(id);
    } else {
      all = all.filter(item => item !== id);
    }
    setChecked(all);
  }



  return (
    <Styled.Sidebar>
      <div>
        <h4>Filtrar</h4>
        <hr />

        <Styled.GroupFilter>
          <h4>Por Categorias</h4>
          {categories?.map((category) => (
            <Checkbox key={category._id} onChange={(e) => handleFilter(e.target.checked, category._id)}>
              {category.name}
            </Checkbox>
          ))}
        </Styled.GroupFilter>
        <Styled.GroupFilter>
          <h4>Por Preços</h4>
          <Radio.Group onChange={(e) => setRadio(e.target.value)}>
            {Prices?.map((price) => (
              <div key={price._id}>
                <Radio value={price.array}>{price.name}</Radio>
              </div>
            ))}
          </Radio.Group>
        </Styled.GroupFilter>
        <button
          onClick={() => window.location.reload()}
        >
          Resetar Filtros
        </button>
      </div>
    </Styled.Sidebar>
  )
}

export default Sidebar