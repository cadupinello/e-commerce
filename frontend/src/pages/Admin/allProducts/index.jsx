import React, { useEffect, useState } from 'react'
import Layout from '../../../components/layout';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../../slices/Product';
import MenuDashboard from '../../../components/menuDashboard';
import { Link } from 'react-router-dom';
import { api } from '../../../utils/Config';
import * as Styled from './styled'
import { Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
import EmptyImg from '../../../assets/imgEmpty.jpg';

const AllProducts = () => {

  const dispatch = useDispatch();

  const { products, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      <Layout>
        <Styled.Container>
          <h4>Painel Administrativo</h4>
          <span>Gerencie seus produtos e categorias, além de visualizar seus dados pessoais</span>
          <hr />
          <Styled.Content>
            <MenuDashboard />
            <div className='main'>
              <h4>Todos os Produtos</h4>
              {isLoading && <div className="spinner-border text-primary d-flex justify-content-center" role="status"></div>}
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Foto</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>Preço</TableCell>
                    <TableCell>Categoria</TableCell>
                    <TableCell>Quantidade</TableCell>
                    <TableCell>Envio</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>
                        <img src={product.photo ? photo : EmptyImg} alt={product.name} style={{ width: '50px' }} />
                      </TableCell>
                      <TableCell><Link to={`/dashboard/admin/product/${product.slug}`}>{product.name}</Link></TableCell>
                      <TableCell>{product?.price?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                      <TableCell>{product.category?.name}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>{product?.shipping === true ? "Sim" : "Não"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Styled.Content>
        </Styled.Container>
      </Layout>
    </>
  )
}

export default AllProducts