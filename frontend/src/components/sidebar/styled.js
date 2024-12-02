import styled from "styled-components";
import { Select as AntSelect } from "antd";

export const Container = styled('div')({
	width: '400px',
	height: '60px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '10px',
	borderRadius: '5px',
	boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
})

export const Title = styled('h3')({
	margin: 0,
	padding: 0,
	fontSize: '14px',
	color: '#3d465a',
})

export const Select = styled(AntSelect)({
	width: '150px',
	height: '32px',
})
