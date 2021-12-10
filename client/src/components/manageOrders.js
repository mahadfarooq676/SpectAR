import React, { Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect  } from 'react-router-dom'
import { history } from 'react-router'
import { connect } from 'react-redux';
import { getOrders } from '../actions/getData';
import { deleteProduct } from '../actions/delete';
import Spinner from './layout/spinner';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import { URL } from './../actions/types';


const ManageOrders = ({ getOrders, getData: { orders, loading }, history }) => {

    const [ searchTerm, setSerachTerm ] = useState("");

    useEffect(() => {
        getOrders();
    }, []);

    const viewOrder = async (_id) => {
      localStorage.setItem('_id',_id);
      history.push("/AppRoutes/viewOrder")
    }
    

    return loading && orders === null ? <Spinner /> : <Fragment>
      <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Orders</h4>
                <div className="search-field d-none d-md-block mt-4 mb-4">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <i className="input-group-text border-0 mdi mdi-magnify text-gradient-primary bg-gradient-primary"></i>
                      </div>
                      <input type="text" className="form-control bg-light border-1 text-dark" placeholder="Search..."
                      onChange={(e) => {
                        setSerachTerm(e.target.value);
                      }}
                      />
                    </div>
                </div>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> Order Id </th>
                        <th> User Id </th>
                        <th> Date </th>
                        <th> Status </th>
                        <th> Action </th>
                      </tr>
                    </thead>
                    <tbody>
                    
                        {orders.length > 0 ? (
                            orders.filter((order) => {
                              if(searchTerm == ""){
                                return order
                              } else if(order._id.toLowerCase().includes(searchTerm.toLowerCase())){
                                return order
                              }
                            }).map((order, okey) => (
                              <tr key={okey}>
                              <td>{order._id}</td>
                              <td>{order.userId}</td>
                              <td>{order.createdTimestamp}</td>
                              <td><label className="badge badge-primary">{order.status}</label></td>
                              <td>
                                <Link className="btn btn-sm btn-gradient-success mr-2" onClick={() => viewOrder(order._id)} ><i className="mdi mdi-eye"></i></Link>
                              {/* <Link className="btn btn-sm btn-gradient-info mr-2" onClick={() => updateProduct(product._id)} ><i className="mdi mdi-rotate-left"></i></Link>
                              <Link className="btn btn-sm btn-gradient-danger mr-2" onClick={() => deleteProductt(product._id)} ><i className="mdi mdi-delete"></i></Link>  */}
                              </td>
                            </tr>
                            ))
                        ) : <Spinner/>}

                              
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
    </Fragment>
    };
  
  ManageOrders.propTypes = {
    getOrders: PropTypes.func.isRequired,
    getData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    getData: state.getData
})

export default connect( mapStateToProps, {getOrders})(ManageOrders);