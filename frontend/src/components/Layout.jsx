import React from 'react'
import { Helmet } from 'react-helmet'
import Navbar from './Navbar';
import Footer from './Footer';

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
      <Navbar />
      <main style={{minHeight: "80vh"}} >
        {children}
      </main>
      <Footer/>
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