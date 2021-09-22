import React, { Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Link  } from 'react-router-dom'
import { connect } from 'react-redux';
import { getAllAdmins } from '../actions/getData';
import Spinner from './layout/spinner';


const ManageAdmins = ({ getAllAdmins, getData: { admins, loading } }) => {
    useEffect(() => {
        getAllAdmins();
    }, []);

    return loading && admins === null ? <Spinner /> : <Fragment>
        <div className="row">
        <div className="col-3 mb-3"><Link to="/AppRoutes/addAdmin" className="btn btn-gradient-primary mr-2"><i className="mdi mdi-plus menu-icon"></i>Add Admin</Link></div>
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Admins</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> Admin Name </th>
                        <th> Admin Email</th>
                        <th> Added Date </th>
                        <th> Action </th>
                      </tr>
                    </thead>
                    <tbody>
                    
                        {admins.length > 0 ? (
                            admins.map(admin => (
                              <tr>
                              <td>{admin.name}</td>
                              <td>{admin.email}</td>
                              <td>{admin.addedDate}</td>
                              <td><Link to="/AppRoutes/manageAdmins" className="btn btn-sm btn-gradient-info mr-2"><i className="mdi mdi-rotate-left"></i></Link>
                              <Link to="/AppRoutes/manageAdmins" className="btn btn-sm btn-gradient-danger mr-2"><i className="mdi mdi-delete"></i></Link></td>
                            </tr>
                            ))
                        ) : <Spinner/>}
                    
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        
    </Fragment>
};

ManageAdmins.propTypes = {
    getAllAdmins: PropTypes.func.isRequired,
    getData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    getData: state.getData
})

export default connect( mapStateToProps, {getAllAdmins})(ManageAdmins);
