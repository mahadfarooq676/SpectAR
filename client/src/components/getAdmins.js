import React, { Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllAdmins } from '../actions/getData';

const GetAdmins = ({ getAllAdmins, auth: { admins, loading } }) => {
    useEffect(() => {
        getAllAdmins();
    }, []);

    return <div />
};

GetAdmins.propTypes = {
    getAllAdmins: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect( mapStateToProps, {getAllAdmins})(GetAdmins);
