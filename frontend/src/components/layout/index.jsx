import React from 'react'
import { Helmet } from 'react-helmet'
import Navbar from '../navbar';
import Sidebar from '../sidebar';
import * as Styled from './styled'

const Layout = ({ children, title, description, keywords, author, cartData }) => {
  return (
    <Styled.Container>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Navbar cartData={cartData} />
      <div>
        <Sidebar />
        <Styled.Main>
          {children}
        </Styled.Main>
      </div>
    </Styled.Container>
  )
}

Layout.defaultProps = {
  title: 'Ecommerce app - shop now',
  description: 'mern stack project',
  keywords: 'electronics, buy electronics, cheap electronics, mern, react, node, mongodb',
  author: 'Script Technologys Solutions ltd',
}

export default Layout