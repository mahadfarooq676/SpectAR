import React, { Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect  } from 'react-router-dom'
import { history } from 'react-router'
import { connect } from 'react-redux';
import { getAllBanners } from '../actions/getData';
import Spinner from './layout/spinner';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { URL } from './../actions/types';


const ManageBanner = ({ getAllBanners, getData: { products, loading }, history }) => {
    useEffect(() => {
        getAllBanners();
    }, []);

    const viewProduct = async (_id) => {
      localStorage.setItem('_id',_id);
      // <Redirect to="/appRoutes/viewProduct" />
      history.push("/appRoutes/viewProduct")
    }

    const updateProduct = async (_id) => {
      localStorage.setItem('_id',_id);
      // <Redirect to="/appRoutes/viewProduct" />
      history.push("/appRoutes/updateProduct")
    }

    const deleteProduct = async (_id) => {
      confirmAlert({
        title: 'Confirm to delete',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => products.filter(product => (product._id !== _id))
          },
          {
            label: 'No'
          }
        ]
      });
    }

    return loading && products === null ? <Spinner /> : <Fragment>
        <div className="row">
        <div className="col-3 mb-3"><Link to="/AppRoutes/addBanner" className="btn btn-gradient-primary"><i className="mdi mdi-plus menu-icon"></i>Add Banner</Link></div>
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Banner</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> Product Image </th>
                        <th> Product Name </th>
                        <th> Product Price</th>
                        <th> Category </th>
                        <th> Quantity </th>
                        <th> Status </th>
                        <th> Action </th>
                      </tr>
                    </thead>
                    <tbody>
                    
                        {products.length > 0 ? (
                            products.map(product => (
                              <tr>
                              <img src={URL+"public/uploads/"+product.productImage} className="img-fluid"style={{maxHeight: '100px', maxWidth: '100'}} ></img>
                              <td>{product.productName}</td>
                              <td>{product.productPrice}</td>
                              <td>{product.productCategory}</td>
                              <td>{product.productQuantity}</td>
                              <td>{product.status}</td>
                              <td><Link className="btn btn-sm btn-gradient-success mr-2" onClick={() => viewProduct(product._id)} ><i className="mdi mdi-eye"></i></Link>
                              <Link className="btn btn-sm btn-gradient-info mr-2" onClick={() => updateProduct(product._id)} ><i className="mdi mdi-rotate-left"></i></Link>
                              <Link className="btn btn-sm btn-gradient-danger mr-2" onClick={() => deleteProduct(product._id)} ><i className="mdi mdi-delete"></i></Link></td>
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

ManageBanner.propTypes = {
    getAllBanners: PropTypes.func.isRequired,
    getData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    getData: state.getData
})

export default connect( mapStateToProps, {getAllBanners})(ManageBanner);
