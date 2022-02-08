import React, { useState, useEffect } from "react";
import { Form } from 'react-bootstrap';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import { updateAdmin } from '../actions/add';
import PropTypes from 'prop-types';
import axios from 'axios';
import { URL } from './../actions/types';


const UpdateAdmin = ({ auth: { admin },setAlert, updateAdmin , history }) => {

  let _id = localStorage.getItem('_id');

  const [adminData,setAdminData]=useState({});

  const [formData, setFormData] = useState({
      name: '',
      email:  '',
      password: '',
      confirmPassword: '',
      role: ''
  });
   let addedBy = admin && admin.name;
   var addedDate = new Date();
var dd = String(addedDate.getDate()).padStart(2, '0');
var mm = String(addedDate.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = addedDate.getFullYear();

addedDate = mm + '/' + dd + '/' + yyyy;
var status = "Active";
var adminId = _id;
var nupassword = adminData.password;

useEffect(async () => {
  const a= await axios.get(URL + 'api/getAdmin/'+_id);
  setAdminData(a.data);
},[]);

useEffect(() => {
  setFormData({
    name: !adminData.name ? '' : adminData.name,
    email: !adminData.email ? '' : adminData.email,
    role: !adminData.role ? '' : adminData.role
   });
}, [adminData])

  var { name, email, password, confirmPassword, role } = formData;

  const onChange = e => 
      setFormData({ ...formData, [e.target.name]: e.target.value});

  const onSubmit = async e => {
      e.preventDefault();
      if(password !== confirmPassword){
          setAlert('Password do not match','danger');
      }else if(!password && !confirmPassword){
        password = nupassword;
        updateAdmin({ adminId, name, email, password, role, addedBy, addedDate, status }, history);
      }else{
        updateAdmin({ adminId, name, email, password, role, addedBy, addedDate, status }, history);
      }
  };


    return (
      <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Add Admin</h4>
                <p className="card-description">  </p>
                <form className="forms-sample" onSubmit={e => onSubmit(e)}>
                  <Form.Group>
                    <label htmlFor="name">Name</label>
                    <Form.Control type="text" name="name" className="form-control" onChange={e => onChange(e)} value={name} placeholder="Enter Name" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="email">Email</label>
                    <Form.Control type="email" name="email" className="form-control" onChange={e => onChange(e)} value={email} placeholder="Enter Email" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="password">Password</label>
                    <Form.Control type="password" name="password" className="form-control" onChange={e => onChange(e)} placeholder="Enter Password" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Form.Control type="password" name="confirmPassword" className="form-control" onChange={e => onChange(e)} placeholder="Enter Confirm Password" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="role">Role</label>
                    <select className="form-control" name="role" value={role} onChange={e => onChange(e)}>
                      <option selected disabled>Select Role</option>
                      <option value="Admin">Admin</option>
                      <option value="Moderator">Moderator</option>
                    </select>
                  </Form.Group>
                  <input type="submit" className="btn btn-gradient-primary mr-2" name="submit" value="submit" / >
                  <Link to="/ManageAdmins" className="btn btn-light">Cancel</Link>
                </form>
              </div>
            </div>
          </div>
    );
  }


UpdateAdmin.propTypes = {
    setAlert: PropTypes.func.isRequired,
    updateAdmin: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
    mapStateToProps,
    { setAlert, updateAdmin }
    )(withRouter(UpdateAdmin));