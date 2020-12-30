import React from 'react'
import { Link } from 'react-router-dom'
import { Col } from 'reactstrap'

export const Navigationbar = () => {

  const urlImg ="https://www.stsitaliana.it/wp-content/uploads/2018/04/PORTFOLIO_848x572consorzio.jpg"

  return (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
  <a href="https://www.consorziobalsamico.it"><img alt="" src= {urlImg} width= "130px" height="80px"/></a>
  <Col><Link to='/' className="navbar-brand"> <h3>Acetaia Tenuta Honningbrew </h3></Link></Col>
  
     <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to ='/about'>Chi siamo?</Link>
        </li>
      </ul>
  </div>
</nav>
  );
};
export default Navigationbar;