import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrders } from '../actions/getData';
import Spinner from './layout/spinner';
import { Modal,  } from 'react-bootstrap';
import { deleteAdmin } from '../actions/delete';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ExportCSV } from './exportToCsv';

const ManageOrders = ({ getOrders, getData: { orders, loading }, history }) => {

    const [ searchTerm, setSerachTerm ] = useState("");
    let [ flag, setFlag ]=useState(false);

    useEffect(() => {
        getOrders();
        setFlag(true);
    }, []);

    const date = new Date();
    const time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

    const viewOrder = async (_id) => {
      localStorage.setItem('_id',_id);
      history.push("/ViewOrder")
    }
    const [formData, setFormData] = useState({
      orderStatus: '',
    });

    var { orderStatus } = formData;

    const onChange = e => 
      setFormData({ ...formData, [e.target.name]: e.target.value});

    return flag === true && orders === null ? <Spinner /> : <Fragment>
      <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <div className='row'>
                  <div className='col-6'><h4 className="">Orders</h4></div>
                  <div className="col-6"><ExportCSV csvData={orders} fileName={"Orders-"+time+".xlsx"} /></div>
                </div>
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
                  <table className="table text-center">
                    <thead>
                      <tr>
                        <th className='w-25'> Order Id </th>
                        <th className='w-25'> Date </th>
                        <th className='w-25'> Status </th>
                        <th className='w-25'> Action </th>
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
                              <td>{order._id.substr(18,24)}</td>
                              <td>{order.createdTimestamp}</td>
                              {/* <td><label className="badge badge-gradient-primary" style={{ width:"100px" }}>{order.status}</label></td> */}
                              {/* <td>
                                <form>
                                  <select className="form-control badge-dark badge" name="orderStatus" onChange={e => onChange(e)} value={orderStatus}>
                                    <option className="form-control badge badge-danger" value="Rejected">Rejected</option>
                                    <option className="form-control badge badge-primary" value="Pending">Pending</option>
                                    <option className="form-control badge badge-warning" value="Processing">Processing</option>
                                    <option className="form-control badge badge-success" value="Completed">Completed</option>
                                  </select>
                                </form>
                              </td> */}
                              {/* <td>
                                <form>
                                  <select className="badge badge-gradient-primary" name="orderStatus" value={orderStatus} onChange={e => onChange(e)}>
                                    <option value="Pending" className="bg-dark">Pending</option>
                                    <option value="InProgress" className="bg-secondary">InProgress</option>
                                    <option value="Processed" className="bg-success">Processed</option>
                                    <option value="Rejected" className="bg-danger">Rejected</option>
                                  </select>
                                </form>
                              </td> */}
                              <td>
                                <Link className="btn btn-sm btn-gradient-primary mr-2" style={{ width:"100px" }} >{order.status}</Link>
                              </td>
                              <td>
                                <Link className="btn btn-sm btn-gradient-success mr-2" onClick={() => viewOrder(order._id)} ><i className="mdi mdi-eye"></i></Link>
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