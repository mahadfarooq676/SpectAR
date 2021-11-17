import React, { Component,Suspense } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Alert from './components/layout/Alert';
import { Provider } from 'react-redux'; 
import store from './store';

import Dashboard from "./components/dashboard";
import AddProduct from "./components/addProduct";
import manageProduct from "./components/manageProduct";
import updateProduct from "./components/updateProduct";
import viewProduct from "./components/viewProduct";
import manageOrders from "./components/manageOrders";
import manageAdmins from "./components/manageAdmins";
import manageBanners from "./components/manageBanner";
import addAdmin from "./components/addAdmin";
import updateAdmin from "./components/updateAdmin";
import Navbar from './components/shared/Navbar';
import Sidebar from './components/shared/Sidebar';
import Footer from './components/shared/Footer';
import SettingsPanel from './components/shared/SettingsPanel';
import Spinner from './components/shared/Spinner';
import App from './App';
import PrivateRoute from './components/routing/privateRoute';
import addBanner from './components/addBanner';

class AppRoutes extends Component {
  render () {
    return (
      <Provider store={store}>
      <Router>
        <div className="container-scroller">
          <Navbar/>
          <div className="container-fluid page-body-wrapper">
          <Sidebar/>
            <div className="main-panel">
              <div className="content-wrapper">
                  <Alert />
                  <Suspense fallback={<Spinner/>}>
                    <Switch>
                      <Route path='/Login' component={App}/>
                      <PrivateRoute path='/AppRoutes/dashboard' component={Dashboard} />
                      <PrivateRoute path='/AppRoutes/addProduct' component={AddProduct} />
                      <PrivateRoute path='/AppRoutes/manageProduct' component={manageProduct} />
                      <PrivateRoute path='/AppRoutes/updateProduct' component={updateProduct} />
                      <PrivateRoute path='/AppRoutes/viewProduct' component={viewProduct} />
                      <PrivateRoute path='/AppRoutes/manageOrders' component={manageOrders} />
                      <PrivateRoute path='/AppRoutes/addBanner' component={addBanner} />
                      <PrivateRoute path='/AppRoutes/manageAdmins' component={manageAdmins} />
                      <PrivateRoute path='/AppRoutes/manageBanner' component={manageBanners} />
                      <PrivateRoute path='/AppRoutes/addAdmin' component={addAdmin} />
                      <PrivateRoute path='/AppRoutes/updateAdmin' component={updateAdmin} />
                    </Switch>
                  </Suspense>
                < SettingsPanel />
                </div>
                <Footer/>
            </div>
          </div>
        </div>
      </Router>
    </Provider>
    );
  }
}

export default AppRoutes;