import styled from "styled-components";
import { InputNumber, Button as AntButton } from "antd";

export const Container = styled("div")({
	width: '176px',
	height: '320px',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',

	boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
})

export const Img = styled("img")({
	width: '100%',
	height: '176px',
	borderRadius: '5px',
	alignSelf: 'center',
})

export const Title = styled("h3")({
	width: '100%',
	fontSize: '14px',
	color: '#3d465a',
})

export const Input = styled(InputNumber)({
	width: '65px',
	height: '32px',
})

export const Content = styled("div")({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	flex: 1,
	padding: '8px',

	'> div': {
		display: 'flex',
		justifyContent: 'space-between',

		'> span': {
			fontWeight: 'bold',
			display: 'flex',
			alignItems: 'center',
			color: '#3d465a',
			fontSize: '14px',
		},
	},
})

export const Footer = styled("div")({
	width: '100%',
	display: 'flex',
	justifyContent: 'space-between',
	padding: '8px',
})

export const Button = styled(AntButton)({
	width: 'fit-content',
	height: '32px',
})
