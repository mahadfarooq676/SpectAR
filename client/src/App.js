import React, { useEffect } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { Switch, Route, Redirect } from "react-router-dom";
import Alert from './components/layout/Alert';
import Login from "./components/auth/login";
import NotFound from "./components/notFound";
import AppRoutes from './AppRoutes';
import { loadUser } from './actions/auth';
// Redux
import { Provider } from 'react-redux'; 
import store from './store';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {   

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
                <Provider store={store}>
                  <Switch>
                    <Route path='/Login' exact component={Login} />
                    <Route path='/AppRoutes' component={AppRoutes} />
                    <Route path='/notFound' component={NotFound} />
                    <Redirect exact from="/" to="/Login" />
                    <Redirect to="/notFound"/>
                  </Switch>
                </Provider>
               
 )}; 

export default App;
