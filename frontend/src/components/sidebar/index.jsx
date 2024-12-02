import { useDispatch, useSelector } from 'react-redux';
import * as Styled from './styled';
import { filterProducts as filterProductsAction } from '../../slices/Product';
import { Prices } from '../Prices';
import { useMemo, useState } from 'react';

const Sidebar = () => {
	const dispatch = useDispatch();
	const { categories } = useSelector(state => state.category);
	const [category, setCategory] = useState();
	const [price, setPrice] = useState();

	const categoryOptions = categories?.map((category) => ({
		label: category.name,
		value: category._id,
	}));

	const priceOptions = Prices?.map((price) => ({
		label: price.name,
		value: price.range,
	}));

	useMemo(() => {
		if (category?.length || price?.length) {

			dispatch(filterProductsAction({
				categoryId: category,
				price
			}));

		}
	}, [category, price]);

	return (
		<Styled.Container>
			<Styled.Title>Filtrar por</Styled.Title>
			<Styled.Select
				options={categoryOptions}
				placeholder="Categorias"
				onChange={(value) => setCategory(value)}
				name="category"
			/>
			<Styled.Select
				options={priceOptions}
				placeholder="Preços"
				onChange={(value) => setPrice(value)}
				name="price"
			/>
		</Styled.Container>
	);
};

export default Sidebar;
