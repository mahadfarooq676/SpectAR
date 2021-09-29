import React, {  useState, useEffect, Fragment } from "react";
import { Form } from 'react-bootstrap';
import { Link, Redirect, useParams, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import { updateProduct } from '../actions/add';
import { getCategories } from '../actions/getData';
import PropTypes from 'prop-types';
import Spinner from './layout/spinner';
import axios from 'axios';


const UpdateProduct = ({ auth: { admin }, setAlert, getCategories, updateProduct , history, getData: { categories, productById } }) => {

  let id = JSON.stringify(window.location.href);
  var _id = id.substring(47, id.length-1);
  

  const [product,setProduct]=useState({});


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
var productId = _id;

useEffect(async () => {
  getCategories();
  const p= await axios.get('http://localhost:5000/api/getProduct/'+_id);
  setProduct(p.data);
},[]);

useEffect(() => {
  setFormData({
    productName: !product.productName ? '' : product.productName,
    productPrice: !product.productPrice ? '' : product.productPrice,
    productCategory: !product.productCategory ? '' : product.productCategory,
    productQuantity: !product.productQuantity ? '' : product.productQuantity,
    frameLength: !product.frameLength ? '' : product.frameLength,
    frameWeight: !product.frameWeight ? '' : product.frameWeight,
    lensWidth: !product.lensWidth ? '' : product.lensWidth,
    lensHeight: !product.lensHeight ? '' : product.lensHeight,
    templeLength: !product.templeLength ? '' : product.templeLength,
    bridgeWidth: !product.bridgeWidth ? '' : product.bridgeWidth,
    productImage: !product.productImage ? '' : product.productImage,
    status: !product.status ? '' : product.status
   });
}, [product])


  const { productName, productPrice, productCategory, productQuantity, frameLength, 
    frameWeight, lensWidth, lensHeight, templeLength, bridgeWidth, productImage, status } = formData;

  const onChange = e => 
        setFormData({ ...formData, [e.target.name]: e.target.value});
  
    const onSubmit = async e => {
        e.preventDefault();
        updateProduct({ productId, productName, productPrice, productCategory, productQuantity, frameLength, frameWeight, lensWidth, lensHeight, templeLength, bridgeWidth, productImage, status, addedBy, addedDate }, history);
    };


    return product === null ? <Spinner/> : <Fragment>
      <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Update Product</h4>
                <p className="card-description">  </p>
                <form className="forms-sample" onSubmit={e => onSubmit(e)} >
                  <Form.Group>
                    <label htmlFor="productName">Name</label>
                    <Form.Control type="text" name="productName" className="form-control" onChange={e => onChange(e)} value={productName} placeholder="Enter Name" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="productPrice">Price</label>
                    <Form.Control type="number" name="productPrice" className="form-control" onChange={e => onChange(e)} value={productPrice} placeholder="Enter Price" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="productCategory">Category</label>
                    <select className="form-control" name="productCategory" onChange={e => onChange(e)} value={productCategory}>
                      <option value="">Select Category</option>
                      {categories.length > 0 ? (
                            categories.map(category => (
                            <option value={category.name}>{category.name}</option>
                            
                            ))
                        ) : <option>No Category Found</option>}
                    </select>
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="productQuantity">Quantity</label>
                    <Form.Control type="number" name="productQuantity" className="form-control" onChange={e => onChange(e)} value={productQuantity} placeholder="Enter Quantity" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="frameLength">Frame Length</label>
                    <Form.Control type="number" name="frameLength" className="form-control" onChange={e => onChange(e)} value={frameLength} placeholder="Enter Frame Length" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="frameWeight">Frame Weigth</label>
                    <Form.Control type="number" name="frameWeight" className="form-control" onChange={e => onChange(e)} value={frameWeight} placeholder="Enter Frame Weigth" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="lensWidth">Lens Width</label>
                    <Form.Control type="number" name="lensWidth" className="form-control" onChange={e => onChange(e)} value={lensWidth} placeholder="Enter Lens Width" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="lensHeight">Lens Height</label>
                    <Form.Control type="number" name="lensHeight" className="form-control" onChange={e => onChange(e)} value={lensHeight} placeholder="Enter Lens Height" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="templeLength">Temple Length</label>
                    <Form.Control type="number" name="templeLength" className="form-control" onChange={e => onChange(e)} value={templeLength} placeholder="Enter Temple Length" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="bridgeWidth">Bridge Width</label>
                    <Form.Control type="number" name="bridgeWidth" className="form-control" onChange={e => onChange(e)} value={bridgeWidth} placeholder="Enter Bridge Width" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="status">Status</label>
                    <select className="form-control" name="status" onChange={e => onChange(e)} value={status}>
                      <option value="">Select Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
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
                    <Form.Control type="text" name="productImage" className="form-control" value={productImage} onChange={e => onChange(e)} placeholder="Enter Product Image" />
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
    updateProduct: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    getData: PropTypes.object.isRequired,
    getCategories: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  getData: state.getData
});

export default connect(
    mapStateToProps,
    { setAlert, updateProduct, getCategories }
    )(withRouter(UpdateProduct));