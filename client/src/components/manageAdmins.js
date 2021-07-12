import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
 
import "react-datepicker/dist/react-datepicker.css";


const ManageAdmins = ({
    admins : {
    }

  
  }) => {  return (
      <div className="row">
        <div className="col-3 mb-3"><Link to="/AppRoutes/addAdmin" className="btn btn-gradient-primary mr-2">Add Admin</Link></div>
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Admins</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> Admin ID </th>
                        <th> Admin Name </th>
                        <th> Admin Email</th>
                        <th>  </th>
                        <th> Status </th>
                      </tr>
                    </thead>
                    <tbody>
                      <td>Name:</td>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

    );
  }
  


ManageAdmins.propTypes = {
  admins: PropTypes.object.isRequired
}

export default ManageAdmins;