import React from 'react'

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h2>About</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates, quisquam.
            </p>
          </div>
          <div className="col-md-4">
            <h2>Services</h2>
            <ul className="list-unstyled">
              <li>
                <a href="#">Web Design</a>
              </li>
              <li>
                <a href="#">Web Development</a>
              </li>
              <li>
                <a href="#">Product Management</a>
              </li>
              <li>
                <a href="#">Marketing</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer