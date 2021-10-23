import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { Trans } from 'react-i18next';

class Sidebar extends Component {

  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({[menuState] : false});
    } else if(Object.keys(this.state).length === 0) {
      this.setState({[menuState] : true});
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({[i]: false});
      });
      this.setState({[menuState] : true});
    }
  }


  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({[i]: false});
    });


 
  }

  render () {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item nav-profile">
            <a href="!#" className="nav-link" onClick={evt =>evt.preventDefault()}>
              
            </a>
          </li>
          <li className={ this.isPathActive('/AppRoutes/dashboard') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/AppRoutes/dashboard">
              <span className="menu-title"><Trans>Dashboard</Trans></span>
              <i className="mdi mdi-home menu-icon"></i>
            </Link>
          </li>
          <li className={ this.isPathActive('/AppRoutes/manageProduct') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/AppRoutes/manageProduct">
              <span className="menu-title"><Trans>Manage Product</Trans></span>
              <i className="mdi mdi-buffer menu-icon"></i>
            </Link>
          </li>
          <li className={ this.isPathActive('/AppRoutes/manageOrders') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/AppRoutes/manageOrders">
              <span className="menu-title"><Trans>Manage Orders</Trans></span>
              <i className="mdi mdi-briefcase-check menu-icon"></i>
            </Link>
          </li>
          <li className={ this.isPathActive('/AppRoutes/manageAdmins') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/AppRoutes/manageAdmins">
              <span className="menu-title"><Trans>Manage Admins</Trans></span>
              <i className="mdi mdi-account menu-icon"></i>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);