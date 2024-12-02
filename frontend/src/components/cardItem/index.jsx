import React from 'react'
import * as Styled from './styled'
import { api } from '../../utils/Config';

import { IoCartSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const CardItem = ({ product, quantity, setQuantity, user, handleCart }) => {
	const navigate = useNavigate();

	const onChange = (value) => {
		setQuantity(value)
	}

	return (
		<Styled.Container key={product._id}>
			<Styled.Img
				src={`${api}/product/product-photo/${product._id}`}
				alt={product?.name}
				onClick={() => navigate(`/product/${product.slug}`)}
				style={{ cursor: "pointer" }}
			/>
			<Styled.Content>
				<Styled.Title>
					{product?.name}
				</Styled.Title>
				<div>
					<span>{product?.price?.toLocaleString('pt-BR', {
						style: 'currency',
						currency: 'BRL',
					})}</span>
					<Styled.Input
						type="number"
						defaultValue={quantity}
						min={1}
						max={10}
						onChange={onChange}
					/>
				</div>
			</Styled.Content>
			<Styled.Footer>
				<Styled.Button onClick={() => {
					if (user) {
						handleCart(product, quantity)
					} else {
						navigate("/login")
					}
				}}>
					<IoCartSharp style={{ marginRight: "5px" }} />
					Comprar
				</Styled.Button>
			</Styled.Footer>
		</Styled.Container>
	)
}

export default CardItem
