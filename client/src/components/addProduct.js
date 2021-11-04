import React, {  useState, useEffect } from "react";
import { Form } from 'react-bootstrap';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import { addProduct } from '../actions/add';
import { getCategories } from '../actions/getData';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const AddProduct = ({ auth: { admin }, setAlert, getCategories, addProduct , history, getData: { categories } }) => {

  useEffect(() => {
    getCategories()
  }, [])

      const [inputField, setInputField] = useState({
      productName: '',
      brandName: 'No Brand',
      productPrice:  '',
      salesPrice: '0',
      sku: '',
      productCategory: '',
      productQuantity: '',
      shortDescription: '',
      highlights: 'No Highlights',
      detailedDescription: '',
      materialType: '',
      frameLength:  '',
      frameWeight: '',
      lensWidth: '',
      lensHeight: '',
      templeLength:  '',
      bridgeWidth: '',
      productImage: '',
      productGallery: '',
      product3dFile: '',
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

    const galleryUpload = (event) => {
      setInputField({ ...inputField, productGallery: event.target.files});
    }

    const File3dUpload = (event) => {
      setInputField({ ...inputField, product3dFile: event.target.files[0]});
    }

    // const highlights = (event) => {
    //   setInputField({ ...inputField, highlights: event.target.highlights});
    // }
  
    const onSubmit = async e => {
        e.preventDefault();
        if( !inputField.productName || !inputField.productPrice || !inputField.sku || !inputField.productCategory || !inputField.productQuantity|| !inputField.shortDescription || !inputField.detailedDescription || !inputField.materialType || !inputField.frameLength || !inputField.frameWeight || !inputField.lensWidth || !inputField.lensHeight || !inputField.templeLength || !inputField.bridgeWidth || !inputField.productGallery || !inputField.status ){
          setAlert('All fiels are required','danger');
      }else if(!inputField.brandName){
        setInputField({ ...inputField, brandName: 'No Brand'})
      }else if(!inputField.salesPrice){
        setInputField({ ...inputField, salesPrice: '0'})
      }else if(!inputField.highlights){
        setInputField({ ...inputField, highlights: 'No Highlights'})
      }else{

        const formdata = new FormData();
        formdata.append('productImage', inputField.productImage, inputField.productImage.name);
        for (const key of Object.keys(inputField.productGallery)) {
          formdata.append('productGallery', inputField.productGallery[key])
      }
        formdata.append('product3dFile', inputField.product3dFile, inputField.product3dFile.name);
        formdata.append('productName', inputField.productName);
        formdata.append('brandName', inputField.brandName);
        formdata.append('productPrice', inputField.productPrice);
        formdata.append('salesPrice', inputField.salesPrice);
        formdata.append('sku', inputField.sku);
        formdata.append('productCategory', inputField.productCategory);
        formdata.append('productQuantity', inputField.productQuantity);
        formdata.append('shortDescription', inputField.shortDescription);
        formdata.append('highlights', inputField.highlights);
        formdata.append('detailedDescription', inputField.detailedDescription);
        formdata.append('materialType', inputField.materialType);
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
                    <label htmlFor="productName">Title</label>
                    <Form.Control type="text" name="productName" className="form-control" onChange={e => onChange(e)}  placeholder="Enter Title" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="brandName">Brand Name</label>
                    <Form.Control type="text" name="brandName" className="form-control" onChange={e => onChange(e)}  placeholder="Enter Brand Name" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="productPrice">Price</label>
                    <Form.Control type="number" name="productPrice" className="form-control" onChange={e => onChange(e)} placeholder="Enter Price" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="salesPrice">Sales Price</label>
                    <Form.Control type="number" name="salesPrice" className="form-control" onChange={e => onChange(e)} placeholder="Enter Sales Price" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="salesPrice">SKU</label>
                    <Form.Control type="text" name="sku" maxlength="16" className="form-control" onChange={e => onChange(e)} placeholder="Enter SKU" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="productCategory">Category</label>
                    <select className="form-control" name="productCategory" onChange={e => onChange(e)}>
                      <option selected disabled>Select Category</option>
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
                    <label htmlFor="shortDescription">Short Description</label>
                    <textarea name="shortDescription" className="form-control" onChange={e => onChange(e)}  placeholder="Enter Short Description" rows="5"></textarea>
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="highlights">Highlights</label>
                    <textarea name="highlights" className="form-control" onChange={e => onChange(e)}  placeholder="Enter Highlights" rows="5"></textarea>
                  </Form.Group>
                  {/* <Editor
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    toolbar={{
                      options: ['inline','list', 'history'],
                      
                  }} onChange={e => highlights(e)} 
                  /> */}
                  
                  <Form.Group>
                    <label htmlFor="detailedDescription">Detailed Description</label>
                    <textarea name="detailedDescription" className="form-control" onChange={e => onChange(e)}  placeholder="Enter Detailed Description" rows="5"></textarea>
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="materialType">Material Type</label>
                    <select className="form-control" name="materialType" onChange={e => onChange(e)}>
                      <option selected disabled >Select Material Type</option>
                      <option value="Plastic">Plastic</option>
                      <option value="Metal">Metal</option>
                      <option value="Steel">Steel</option>
                    </select>
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
                      <option selected disabled>Select Status</option>
                      <option value="Active">Active</option>
                      <option value="Deactive">Deactive</option>
                      <option value="Deleted">Deleted</option>
                    </select>
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="productImage">Product Thumbnail</label>
                    <Form.Control type="file" accept=".png, .jpg, .jpeg" name="productImage" className="form-control" onChange={imageUpload} placeholder="Enter Product Thumbnail" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="productGallery">Product Gallery Images</label>
                    <Form.Control type="file" multiple accept=".png, .jpg, .jpeg" name="productGallary" className="form-control" onChange={galleryUpload} placeholder="Enter Gallery Images" />                  
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="product3dFile">Product 3d File </label>
                    <Form.Control type="file" accept=".obj" name="product3dFile" className="form-control" onChange={File3dUpload} placeholder="Enter Product 3d File" />
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