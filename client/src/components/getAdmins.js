import React, { Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import  ManageAdmins  from './manageAdmins';
import { getAllAdmins } from '../actions/getData';
import getData from '../reducers/getData';

const GetAdmins = ({ getAllAdmins, getData: { admins } }) => {
    useEffect(() => {
        getAllAdmins();
    }, []);

    return <Fragment>
        <div className="admins">
            {admins.length > 0 ? (
                admins.map(admin => (
                    <ManageAdmins key={admin._id} admin={admins} />
                ))
            ) : <h4> No Admins Found </h4>}
        </div>
    </Fragment>
};

GetAdmins.propTypes = {
    getAllAdmins: PropTypes.func.isRequired,
    getData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    getData: state.getData
})

export default connect( mapStateToProps, {getAllAdmins})(GetAdmins);
