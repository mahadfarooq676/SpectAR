import React, {  useState, useEffect, Fragment } from "react";
import { Form } from 'react-bootstrap';
import { Link, Redirect, useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import { addProduct } from '../actions/add';
import { getCategories, getProduct } from '../actions/getData';
import PropTypes from 'prop-types';
import Spinner from './layout/spinner';


const UpdateProduct = ({ auth: { admin }, setAlert, getProduct, getCategories, addProduct , history, getData: { categories, productById } }) => {

  const { _id } = useParams;

  useEffect(() => {
    getCategories()
    // getProduct({ _id })
  }, [])

  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    productPrice:  '',
    productCategory: '',
    productQuantity: '',
    frameLength:  '',
    frameWeight: '',
    lensWidth: '',
    lensHeight: '',
    templeLength:  '',
    bridgeWidth: '',
    productImage: '',
    status: ''
  });
   let addedBy = admin && admin.name;
   var addedDate = new Date();
var dd = String(addedDate.getDate()).padStart(2, '0');
var mm = String(addedDate.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = addedDate.getFullYear();

addedDate = mm + '/' + dd + '/' + yyyy;

  const { productId, productName, productPrice, productCategory, productQuantity, frameLength, frameWeight, lensWidth, lensHeight, templeLength, bridgeWidth, productImage, status } = formData;

  const onChange = e => 
        setFormData({ ...formData, [e.target.name]: e.target.value});
  
    const onSubmit = async e => {
        e.preventDefault();
        addProduct({ productId, productName, productPrice, productCategory, productQuantity, frameLength, frameWeight, lensWidth, lensHeight, templeLength, bridgeWidth, productImage, status, addedBy, addedDate }, history);
    };

  
    return productById === null ? <Spinner /> : <Fragment>
      <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Update Product</h4>
                <p className="card-description">  </p>
                <form className="forms-sample" onSubmit={e => onSubmit(e)} >
                <Form.Control type="hidden" name="productId" className="form-control" onChange={e => onChange(e)} value={productById._id} />
                  <Form.Group>
                    <label htmlFor="productName">Name</label>
                    <Form.Control type="text" name="productName" className="form-control" onChange={e => onChange(e)} value={productById.productName} placeholder="Enter Name" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="productPrice">Price</label>
                    <Form.Control type="number" name="productPrice" className="form-control" onChange={e => onChange(e)} value={productById.productPrice} placeholder="Enter Price" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="productCategory">Category</label>
                    <select className="form-control" name="productCategory" onChange={e => onChange(e)} value={productById.productCategory}>
                      <option>Select Category</option>
                      {categories.length > 0 ? (
                            categories.map(category => (
                            <option value={category.name}>{category.name}</option>
                            
                            ))
                        ) : <option>No Category Found</option>}
                    </select>
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="productQuantity">Quantity</label>
                    <Form.Control type="number" name="productQuantity" className="form-control" onChange={e => onChange(e)} value={productById.productQuantity} placeholder="Enter Quantity" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="frameLength">Frame Length</label>
                    <Form.Control type="number" name="frameLength" className="form-control" onChange={e => onChange(e)} value={productById.frameLength} placeholder="Enter Frame Length" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="frameWeight">Frame Weigth</label>
                    <Form.Control type="number" name="frameWeight" className="form-control" onChange={e => onChange(e)} value={productById.frameWeight} placeholder="Enter Frame Weigth" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="lensWidth">Lens Width</label>
                    <Form.Control type="number" name="lensWidth" className="form-control" onChange={e => onChange(e)} value={productById.lensWidth} placeholder="Enter Lens Width" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="lensHeight">Lens Height</label>
                    <Form.Control type="number" name="lensHeight" className="form-control" onChange={e => onChange(e)} value={productById.lensHeight} placeholder="Enter Lens Height" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="templeLength">Temple Length</label>
                    <Form.Control type="number" name="templeLength" className="form-control" onChange={e => onChange(e)} value={productById.templeLength} placeholder="Enter Temple Length" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="bridgeWidth">Bridge Width</label>
                    <Form.Control type="number" name="bridgeWidth" className="form-control" onChange={e => onChange(e)} value={productById.bridgeWidth} placeholder="Enter Bridge Width" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="status">Status</label>
                    <select className="form-control" name="status" onChange={e => onChange(e)} value={productById.status}>
                      <option>Select Status</option>
                      <option value="Active">Active</option>
                      <option value="Deactive">Deactive</option>
                      <option value="Deleted">Deleted</option>
                    </select>
                  </Form.Group>
                  {/* <Form.Group>
                    <label>Image</label>
                    <div className="custom-file">
                      <Form.Control type="file" className="form-control" name="productImage" id="customFileLang" lang="es" style={{ height:"40px" }}/>
                    </div>
                  </Form.Group> */}
                  <Form.Group>
                    <label htmlFor="productImage">Product Image</label>
                    <Form.Control type="text" name="productImage" className="form-control" value={productById.productImage} onChange={e => onChange(e)} placeholder="Enter Product Image" />
                  </Form.Group>
                  <input type="submit" className="btn btn-gradient-primary mr-2" name="submit" value="Update" / >
                  <Link to="/AppRoutes/manageProduct" className="btn btn-light">Cancel</Link>
                </form>
              </div>
            </div>
          </div>
          </Fragment>
}

UpdateProduct.propTypes = {
    setAlert: PropTypes.func.isRequired,
    addProduct: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    getData: PropTypes.object.isRequired,
    getCategories: PropTypes.func.isRequired,
    getProduct: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  getData: state.getData
});

export default connect(
    mapStateToProps,
    { setAlert, addProduct, getCategories, getProduct }
    )(withRouter(UpdateProduct));