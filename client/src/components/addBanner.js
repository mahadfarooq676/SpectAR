import React, {  useState, useEffect } from "react";
import { Form } from 'react-bootstrap';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import { addBanner } from '../actions/add';
import { getCategories } from '../actions/getData';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const AddBanner = ({ auth: { admin }, setAlert, addBanner , history }) => {

  useEffect(() => {
    getCategories()
  }, [])

      const [inputField, setInputField] = useState({
        bannerName: '',
        productGallery: ''
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
      setInputField({ ...inputField, productGallery: event.target.files});
    }

    
  
    const onSubmit = async e => {
        e.preventDefault();
        if( !inputField.bannerName || !inputField.productGallery){
          setAlert('All fiels are required','danger');
      }else{
        const formData = new FormData();
        for (const key of Object.keys(inputField.productGallery)) {
            formData.append('productGallery', inputField.productGallery[key])
        }
        formData.append('bannerName', inputField.bannerName);

        addBanner(formData, history);
      }
    };

    return (
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Add Banner</h4>
                <p className="card-description">  </p>
                <form className="forms-sample" onSubmit={e => onSubmit(e)} encType='multipart/form-data' >
                  <Form.Group>
                    <label htmlFor="productName">Title</label>
                    <Form.Control type="text" name="bannerName" className="form-control" onChange={e => onChange(e)}  placeholder="Enter Title" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="productGallary">Banner Images</label>
                    <Form.Control type="file" multiple accept=".png, .jpg, .jpeg" name="productGallary" className="form-control" onChange={galleryUpload} placeholder="Enter Gallery Images" />
                  </Form.Group>
                  <input type="submit" className="btn btn-gradient-primary mr-2" name="submit" value="submit" / >
                  <Link to="/AppRoutes/manageBanner" className="btn btn-light">Cancel</Link>
                </form>
              </div>
            </div>
            <div class="preview-images"></div>
          </div>

    );
  }

  AddBanner.propTypes = {
    setAlert: PropTypes.func.isRequired,
    addBanner: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    getData: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  getData: state.getData
});

export default connect(
    mapStateToProps,
    { setAlert, addBanner, getCategories }
    )(withRouter(AddBanner));