import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth'

const Navbar = ({ auth: {isAuthenticated, loading, admin}, logout }) => {


  const toggleOffcanvas = () => {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }

    return (
      <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <Link className="navbar-brand brand-logo" to="/AppRoutes/dashboard"><img src={require('../../assets/images/SpectARLogo.png').default} style={{ width:"170px", height:"auto" }} alt="logo" /></Link>
          <Link className="navbar-brand brand-logo-mini" to="/AppRoutes/dashboard"><img src={require('../../assets/images/SpectARLogoSm.png').default} alt="logo" /></Link>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-stretch">
          <button className="navbar-toggler navbar-toggler align-self-center" type="button" onClick={ () => document.body.classList.toggle('sidebar-icon-only') }>
            <span className="mdi mdi-menu"></span>
          </button>
          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item nav-profile">
              <Dropdown alignRight>
                <Dropdown.Toggle className="nav-link">
                  <div className="nav-profile-img">
                    <img src={require("../../assets/images/faces/face1.jpg").default} alt="user"/>
                    <span className="availability-status online"></span>
                  </div>
                  <div className="ml-3">
                    <p className="mb-0 text-black"><Trans>{admin && admin.name}</Trans></p>
                  </div>
                </Dropdown.Toggle>
              </Dropdown>
            </li>
            <li className="nav-item nav-logout d-lg-block">
              <a onClick={logout} href="/Login" >
                <i className="mdi mdi-power" style={{fontSize: "22px"}}></i>
              </a>
            </li>
          </ul>
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={toggleOffcanvas}>
            <span className="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
    );
  }


Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect( mapStateToProps, { logout } )(Navbar);
