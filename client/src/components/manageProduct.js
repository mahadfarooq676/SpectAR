import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct } from '../actions/delete';
import { getAllProducts } from '../actions/getData';
import { URL } from './../actions/types';
import Spinner from './layout/spinner';
import { ExportCSV } from './exportToCsv';

const ManageProducts = ({ getAllProducts, deleteProduct, getData: { products, loading }, history }) => {

    const [ searchTerm, setSerachTerm ] = useState("");

    useEffect(() => {
        getAllProducts();
    }, []);

    const date = new Date();
    const time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();


    const viewProduct = async (_id) => {
      localStorage.setItem('_id',_id);
      history.push("/ViewProduct")
    }

    const updateProduct = async (_id) => {
      localStorage.setItem('_id',_id);
      history.push("/UpdateProduct")
    }

    const deleteProductt = async (_id) => {
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
        <div className="col-3 mb-3"><Link to="/AddProduct" className="btn btn-gradient-primary"><i className="mdi mdi-plus menu-icon"></i>Add Product</Link></div>
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
              <div className='row'>
                  <div className='col-6'><h4 className="">products</h4></div>
                  <div className="col-6"><ExportCSV csvData={products} fileName={"Products-"+time+".xlsx"} /></div>
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
