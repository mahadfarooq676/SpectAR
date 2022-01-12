import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from "react";
import { Form } from 'react-bootstrap';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addBanner } from '../actions/add';
import { setAlert } from '../actions/alert';
import { getAllProducts } from '../actions/getData';
import Spinner from './layout/spinner';

const AddBanner = ({ getAllProducts, auth: { admin }, getData: { products, loading }, setAlert, addBanner , history }) => {

  let [flag,setFlag]=useState(false)

  useEffect(() => {
    getAllProducts();
    setFlag(true)
  }, [])

      const [inputField, setInputField] = useState({
        bannerName: '',
        bannerProduct: '',
        bannerImage: ''
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

    const galleryUpload = (event) => {
      setInputField({ ...inputField, bannerImage: event.target.files[0]});
    }

    
  
    const onSubmit = async e => {
        e.preventDefault();
        if( !inputField.bannerName || !inputField.bannerImage){
          setAlert('All fiels are required','danger');
      }else{
        const formData = new FormData();
        formData.append('bannerImage', inputField.bannerImage, inputField.bannerImage.name);
        formData.append('bannerName', inputField.bannerName);
        formData.append('bannerProduct', inputField.bannerProduct);

        addBanner(formData, history);
      }
    };

    return !flag || products == null ? <Spinner /> : <Fragment>
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Add Banner</h4>
                <p className="card-description">  </p>
                <form className="forms-sample" onSubmit={e => onSubmit(e)} encType='multipart/form-data' >
                  <Form.Group>
                    <label htmlFor="bannerName">Title</label>
                    <Form.Control type="text" name="bannerName" className="form-control" onChange={e => onChange(e)}  placeholder="Enter Title" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="bannerName">Title</label>
                    <select className="form-control" name="bannerProduct" onChange={e => onChange(e)}>
                      <option selected disabled>Select Product</option>
                      {products.length > 0 ? (
                            products.map(product => (
                            <option value={product._id}>{product.productName } --- {product.productPrice} PKR</option>
                            ))
                        ) : <option>No Product Found</option>}
                    </select>
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="bannerImage">Banner Images</label>
                    <Form.Control type="file" accept=".png, .jpg, .jpeg" name="bannerImage" className="form-control" onChange={galleryUpload} placeholder="Enter Banner Image" />
                  </Form.Group>
                  <input type="submit" className="btn btn-gradient-primary mr-2" name="submit" value="submit" / >
                  <Link to="/AppRoutes/manageBanner" className="btn btn-light">Cancel</Link>
                </form>
              </div>
            </div>
            <div class="preview-images"></div>
          </div>
        </Fragment>
  }

  AddBanner.propTypes = {
    setAlert: PropTypes.func.isRequired,
    addBanner: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    getData: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  getAllProducts: PropTypes.func.isRequired,
  auth: state.auth,
  getData: state.getData
});

export default connect(
    mapStateToProps,
    { setAlert, addBanner, getAllProducts}
    )(withRouter(AddBanner));