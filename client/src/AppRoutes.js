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
import viewOrder from './components/viewOrder';

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
                      <PrivateRoute path='/Dashboard' component={Dashboard} />
                      <PrivateRoute path='/AddProduct' component={AddProduct} />
                      <PrivateRoute path='/ManageProduct' component={manageProduct} />
                      <PrivateRoute path='/UpdateProduct' component={updateProduct} />
                      <PrivateRoute path='/ViewProduct' component={viewProduct} />
                      <PrivateRoute path='/ManageOrders' component={manageOrders} />
                      <PrivateRoute path='/AddBanner' component={addBanner} />
                      <PrivateRoute path='/ManageAdmins' component={manageAdmins} />
                      <PrivateRoute path='/ManageBanner' component={manageBanners} />
                      <PrivateRoute path='/AddAdmin' component={addAdmin} />
                      <PrivateRoute path='/UpdateAdmin' component={updateAdmin} />
                      <PrivateRoute path='/ViewOrder' component={viewOrder} />
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