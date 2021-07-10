import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
 
import "react-datepicker/dist/react-datepicker.css";


const ManageProduct = ({ admin }) => {
    // const adminsData =  admin(adm => (
    //   <td key={adm._id}>
    //     <td>{adm.name}</td>
    //     <td>{adm.email}</td>
    //     <td>{adm.addedBy}</td>
    //     <td>{adm.addedDate}</td>
    //     <td><button className="btn btn-danger btn-gradient"></button></td>
    //   </td>
    // ))

  
    return (
      <div className="row">
        <div className="col-3"><Link to="/AppRoutes/addAdmin" className="btn btn-gradient-primary mr-2">Add Admin</Link></div>
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
                    {/* <tbody>{adminsData}</tbody> */}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

    );
  
}

ManageProduct.propTypes = {
  admin: PropTypes.array.isRequired
}

export default ManageProduct;