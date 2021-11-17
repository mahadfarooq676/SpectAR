import React, { Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect  } from 'react-router-dom'
import { history } from 'react-router'
import { connect } from 'react-redux';
import { getAllProducts } from '../actions/getData';
import { deleteProduct } from '../actions/delete';
import Spinner from './layout/spinner';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import { URL } from './../actions/types';


const ManageProducts = ({ getAllProducts, deleteProduct, getData: { products, loading }, history }) => {

    const [ searchTerm, setSerachTerm ] = useState("");

    useEffect(() => {
        getAllProducts();
    }, []);


    const viewProduct = async (_id) => {
      localStorage.setItem('_id',_id);
      history.push("/appRoutes/viewProduct")
    }

    const updateProduct = async (_id) => {
      localStorage.setItem('_id',_id);
      history.push("/appRoutes/updateProduct")
    }

    const deleteProductt = async (_id, products) => {
      confirmAlert({
        title: 'Confirm to delete',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => ( deleteProduct({_id}) )
          },
          {
            label: 'No'
          }
        ]
      });
    }

    return loading && products === null ? <Spinner /> : <Fragment>
        <div className="row">
        <div className="col-3 mb-3"><Link to="/AppRoutes/addProduct" className="btn btn-gradient-primary"><i className="mdi mdi-plus menu-icon"></i>Add Product</Link></div>
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Products</h4>
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
                            products.filter((product) => {
                              if(searchTerm == ""){
                                return product
                              } else if(product.productName.toLowerCase().includes(searchTerm.toLowerCase())){
                                return product
                              }
                            }).map((product, pkey) => (
                              <tr key={pkey}>
                              <img src={URL+"public/uploads/"+product.productImage} className="img-fluid"style={{maxHeight: '100px', maxWidth: '100'}} ></img>
                              {/* <td>{URL+"public/uploads/"+product.productImage}</td> */}
                              <td>{product.productName}</td>
                              <td>{product.productPrice}</td>
                              <td>{product.productCategory}</td>
                              <td>{product.productQuantity}</td>
                              <td>{product.status}</td>
                              <td><Link className="btn btn-sm btn-gradient-success mr-2" onClick={() => viewProduct(product._id)} ><i className="mdi mdi-eye"></i></Link>
                              <Link className="btn btn-sm btn-gradient-info mr-2" onClick={() => updateProduct(product._id)} ><i className="mdi mdi-rotate-left"></i></Link>
                              <Link className="btn btn-sm btn-gradient-danger mr-2" onClick={() => deleteProductt(product._id)} ><i className="mdi mdi-delete"></i></Link></td>
                            </tr>
                            ))
                        ) : <Spinner/>}

                              
                            <p>{products.filter(p => p.salesPrice !== p.salesPrice )}</p>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        
    </Fragment>
};

ManageProducts.propTypes = {
    getAllProducts: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func.isRequired,
    getData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    getData: state.getData
})

export default connect( mapStateToProps, {getAllProducts, deleteProduct})(ManageProducts);
