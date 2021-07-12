import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
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
               
                <div className="row col-lg-6 float-left bg-primary" style={{position:"fixed", width:"100%", height:"100%", left:"0", top:"0"}}>
                    {/* <img  src={ LoginCover } style={{ width:"100%", height:"100%" }}></img> */}
                    <div className="col-lg-6 float-right ml-5" style={{position: "absolute", top: "45%"}}>
                        <h1>SpectAR</h1>
                    </div>
                </div>
                <div className="col-lg-6 float-right ml-5" style={{marginTop:"200px"}}>
                    <form className="col-lg-10" onSubmit={e => onSubmit(e)}>
                    <div><Alert/></div>
                        <h3>Sign In</h3>

                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" name="email" onChange={e => onChange(e)} placeholder="Enter email" />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password" onChange={e => onChange(e)} placeholder="Enter password" />
                        </div>

                        {/* <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div> */}

                        <input type="submit"className="btn btn-primary btn-block" name="submit" value="Login" />
                        {/* <p className="forgot-password text-right">
                            Forgot <a href="#">password?</a>
                        </p> */}
                    </form>
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