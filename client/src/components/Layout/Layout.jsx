import React from 'react'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// styled
import { Main } from './style.js';

const Layout = ({ children, title, description, keywords, author }) => {
  return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
          <title>{title}</title>
        </Helmet>
        <Header />
        <Main >
          <ToastContainer />
          {children}
        </Main>
        <Footer />
      </>
  )
}

Layout.defaultProps = {
  title: 'Ecommerce app - shop now',
  description: 'mern stack project',
  keywords: 'electronics, buy electronics, cheap electronics, mern, react, node, mongodb',
  author: 'Script Technologys Solutions ltd',
}

export default Layout