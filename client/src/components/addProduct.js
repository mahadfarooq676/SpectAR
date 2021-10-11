import React, {  useState, useEffect } from "react";
import { Form } from 'react-bootstrap';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import { addProduct } from '../actions/add';
import { getCategories } from '../actions/getData';
import PropTypes from 'prop-types';


const AddProduct = ({ auth: { admin }, setAlert, getCategories, addProduct , history, getData: { categories } }) => {

  useEffect(() => {
    getCategories()
  }, [])

      const [inputField, setInputField] = useState({
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
  var lastUpdateBy = "None";
  var lastUpdateDate = "None";

  
    const onChange = e => 
    setInputField({ ...inputField, [e.target.name]: e.target.value});

    const imageUpload = (event) => {
      setInputField({ ...inputField, productImage: event.target.files[0]});
    }
  
    const onSubmit = async e => {
        e.preventDefault();
        if( !inputField.productName || !inputField.productPrice || !inputField.productCategory || !inputField.productQuantity || !inputField.frameLength ||
          !inputField.frameWeight || !inputField.lensWidth || !inputField.lensHeight || !inputField.templeLength || 
          !inputField.bridgeWidth || inputField.productImage.length <= 0 || !inputField.status ){
          setAlert('All fiels are required','danger');
      }else{

        const formdata = new FormData();
        formdata.append('myFile', inputField.productImage, inputField.productImage.name)
        formdata.append('productName', inputField.productName);
        formdata.append('productPrice', inputField.productPrice);
        formdata.append('productCategory', inputField.productCategory);
        formdata.append('productQuantity', inputField.productQuantity);
        formdata.append('frameLength', inputField.frameLength);
        formdata.append('frameWeight', inputField.frameWeight);
        formdata.append('lensWidth', inputField.lensWidth);
        formdata.append('lensHeight', inputField.lensHeight);
        formdata.append('templeLength', inputField.templeLength);
        formdata.append('bridgeWidth', inputField.bridgeWidth);
        formdata.append('status', inputField.status);
        formdata.append('addedBy', addedBy);
        formdata.append('addedDate', addedDate);

      addProduct(formdata, history);
      }
    };

    return (
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Add Product</h4>
                <p className="card-description">  </p>
                <form className="forms-sample" onSubmit={e => onSubmit(e)} encType='multipart/form-data' >
                  <Form.Group>
                    <label htmlFor="productName">Name</label>
                    <Form.Control type="text" name="productName" className="form-control" onChange={e => onChange(e)}  placeholder="Enter Name" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="productPrice">Price</label>
                    <Form.Control type="number" name="productPrice" className="form-control" onChange={e => onChange(e)} placeholder="Enter Price" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="productCategory">Category</label>
                    <select className="form-control" name="productCategory" onChange={e => onChange(e)}>
                      <option>Select Category</option>
                      {categories.length > 0 ? (
                            categories.map(category => (
                            <option value={category.id}>{category.name}</option>
                            
                            ))
                        ) : <option>No Category Found</option>}
                    </select>
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="productQuantity">Quantity</label>
                    <Form.Control type="number" name="productQuantity" className="form-control" onChange={e => onChange(e)} placeholder="Enter Quantity" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="frameLength">Frame Length</label>
                    <Form.Control type="number" name="frameLength" className="form-control" onChange={e => onChange(e)} placeholder="Enter Frame Length" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="frameWeight">Frame Weigth</label>
                    <Form.Control type="number" name="frameWeight" className="form-control" onChange={e => onChange(e)} placeholder="Enter Frame Weigth" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="lensWidth">Lens Width</label>
                    <Form.Control type="number" name="lensWidth" className="form-control" onChange={e => onChange(e)} placeholder="Enter Lens Width" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="lensHeight">Lens Height</label>
                    <Form.Control type="number" name="lensHeight" className="form-control" onChange={e => onChange(e)} placeholder="Enter Lens Height" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="templeLength">Temple Length</label>
                    <Form.Control type="number" name="templeLength" className="form-control" onChange={e => onChange(e)} placeholder="Enter Temple Length" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="bridgeWidth">Bridge Width</label>
                    <Form.Control type="number" name="bridgeWidth" className="form-control" onChange={e => onChange(e)} placeholder="Enter Bridge Width" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="status">Status</label>
                    <select className="form-control" name="status" onChange={e => onChange(e)}>
                      <option>Select Status</option>
                      <option value="Active">Active</option>
                      <option value="Deactive">Deactive</option>
                      <option value="Deleted">Deleted</option>
                    </select>
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="productImage">Product Image</label>
                    <Form.Control type="file" accept=".png, .jpg, .jpeg" name="productImage" className="form-control" onChange={imageUpload} placeholder="Enter Product Image" />
                  </Form.Group>
                  <input type="submit" className="btn btn-gradient-primary mr-2" name="submit" value="submit" / >
                  <Link to="/AppRoutes/manageProduct" className="btn btn-light">Cancel</Link>
                </form>
              </div>
            </div>
            <div class="preview-images"></div>
          </div>

    );
  }

  AddProduct.propTypes = {
    setAlert: PropTypes.func.isRequired,
    addProduct: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    getData: PropTypes.object.isRequired,
    getCategories: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  getData: state.getData
});

export default connect(
    mapStateToProps,
    { setAlert, addProduct, getCategories }
    )(withRouter(AddProduct));