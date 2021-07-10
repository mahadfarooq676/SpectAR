import React, {  useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

// import LoginCover from '../images/loginCover.jpg';

const Register = ({ setAlert, register, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        name: '',
        email:  '',
        password: '',
        confirmPassword: ''
    });

    const { name, email, password, confirmPassword } = formData;

    const onChange = e => 
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if(password !== confirmPassword){
            setAlert('Password do not match','danger');
        }else{
            register({ name, email, password }); 
        }
    };

    // Redirect After Registration
    if(isAuthenticated) {
            
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
                        <h3>Register</h3>

                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" name="name" onChange={e => onChange(e)} placeholder="Enter name" />
                        </div>

                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" name="email" onChange={e => onChange(e)} placeholder="Enter email" />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password" onChange={e => onChange(e)} placeholder="Enter password" />
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" className="form-control" name="confirmPassword" onChange={e => onChange(e)} placeholder="Enter confirm password" />
                        </div>

                        {/* <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div> */}

                        <input type="submit" className="btn btn-primary btn-block" name="submit" value="submit" / >
                        {/* <p className="forgot-password text-right">
                            Forgot <a href="#">password?</a>
                        </p> */}
                    </form>
                </div>
            </div>
        );
    
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated 
});

export default connect(
    mapStateToProps,
    { setAlert, register }
    )(Register);