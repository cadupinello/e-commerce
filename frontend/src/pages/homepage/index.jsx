import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout'
import { getCategories } from '../../slices/category';
import { useSelector, useDispatch } from 'react-redux';
import { api } from '../../utils/Config';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { IoCartSharp } from 'react-icons/io5';
import * as Styled from './styled'
import { getAllProducts } from '../../slices/Product';
import { Flex, Skeleton } from 'antd';
import { Layout as AntLayout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import CardItem from '../../components/cardItem';
import Sidebar from '../../components/sidebar';

const HomePage = () => {
	const { cartData, addItemToCart } = useCart();
	const [product, setProduct] = useState([]);
	const [loadingMore, setLoadingMore] = useState(1);
	const { products, isLoading: isLoadingProduct } = useSelector((state) => state.product);
	const { categories, isLoading: isLoadingCategory } = useSelector((state) => state.category);
	console.table(products);
	console.log(categories);

	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(1);
	const [quantity, setQuantity] = useState(1);
	const [checked, setChecked] = useState([]);
	const [radio, setRadio] = useState([]);

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

	useEffect(() => {
		if (!checked.length || !radio.length) {
			dispatch(getAllProducts());
			dispatch(getCategories());
			getTotal();
		}
	}, [checked, radio]);



	return (
		<>
			<Layout title={"All Products - Best offers"} cartData={cartData}>
				<AntLayout style={{ backgroundColor: '#fff' }}>
					<Sidebar />
					{isLoadingProduct && (
						<Skeleton active />
					)}
					<Content style={{ marginTop: '24px' }}>
						<Flex gap={16} wrap>
							{products?.length > 0 && products?.map((product) => (
								<CardItem product={product} quantity={quantity} setQuantity={setQuantity} user={user} handleCart={handleCart} />
							))
							}
						</Flex>
					</Content>
					<div className="m-2 p-3">
						{products && products?.length < total && (
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
				</AntLayout>
			</Layout>

		</>
	)
}

export default HomePage
