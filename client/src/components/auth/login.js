import React, { useState } from "react";
import { Form } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { set } from "mongoose";
// import { Alert } from "bootstrap";
import Alert from '../layout/Alert';


const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email:  '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => 
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        login(email,password);
        }

// Redirect If Looged In
if(isAuthenticated) {
    return <Redirect to="/AppRoutes/dashboard" />
}

        return (
            
            <div>
                <div className="d-flex align-items-center auth px-0" style={{ marginTop:"80px" }}>
                <div className="row w-100 mx-0">
                    <div className="col-lg-4 mx-auto">
                    <div><Alert/></div>
                    <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                        <div className="brand-logo">
                        <img src={require('../../assets/images/SpectARLogo1.png').default} alt="logo" />
                        </div>
                        <h4>Hello! let's get started</h4>
                        <h6 className="font-weight-light">Sign in to continue.</h6>
                        <form onSubmit={e => onSubmit(e)} className="pt-3">
                        <Form.Group className="d-flex search-field">
                        <input type="email" className="form-control h-auto" name="email" onChange={e => onChange(e)} placeholder="Enter email"/>
                        </Form.Group>
                        <Form.Group className="d-flex search-field">
                        <input type="password" className="form-control h-auto" name="password" onChange={e => onChange(e)} placeholder="Enter password" />
                        </Form.Group>
                        <div className="mt-3">
                            <input type="submit"className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" name="submit" value="SIGN IN" />
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>  
            </div>
        );
    
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated 
});

export default connect(
    mapStateToProps,
    { login }
    )(Login);