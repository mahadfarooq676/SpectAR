import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth'

const Navbar = ({ auth: {isAuthenticated, loading, admin}, logout }) => {
    return (
      <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <Link className="navbar-brand brand-logo" to="/AppRoutes/dashboard"><img src={require('../../assets/images/logo2.png').default} alt="logo" /></Link>
          <Link className="navbar-brand brand-logo-mini" to="/AppRoutes/dashboard"><img src={require('../../assets/images/logo-mini.png').default} alt="logo" /></Link>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-stretch">
          <button className="navbar-toggler navbar-toggler align-self-center" type="button" onClick={ () => document.body.classList.toggle('sidebar-icon-only') }>
            <span className="mdi mdi-menu"></span>
          </button>
          <div className="search-field d-none d-md-block">
            <form className="d-flex align-items-center h-100" action="#">
              <div className="input-group">
                <div className="input-group-prepend bg-transparent">
                  <i className="input-group-text border-0 mdi mdi-magnify"></i>
                </div>
                <input type="text" className="form-control bg-transparent border-0" placeholder="Search "/>
              </div>
            </form>
          </div>
          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item nav-profile">
              <Dropdown alignRight>
                <Dropdown.Toggle className="nav-link">
                  <div className="nav-profile-img">
                    <img src={require("../../assets/images/faces/face1.jpg").default} alt="user"/>
                    <span className="availability-status online"></span>
                  </div>
                  <div className="nav-profile-text">
                    <p className="mb-1 text-black"><Trans>{admin && admin.name}</Trans></p>
                  </div>
                </Dropdown.Toggle>
              </Dropdown>
            </li>
            <li className="nav-item nav-logout d-none d-lg-block">
              <a onClick={logout} href="/Login" >
                <i className="mdi mdi-power" style={{fontSize: "22px"}}></i>
              </a>
            </li>
          </ul>
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
