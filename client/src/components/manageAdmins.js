import React, { Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Link  } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllAdmins } from '../actions/getData';
import Spinner from './layout/spinner';
import { deleteAdmin } from '../actions/delete';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';


const ManageAdmins = ({ getAllAdmins, deleteAdmin, getData: { admins, loading }, history }) => {

  const [ searchTerm, setSerachTerm ] = useState("");

    useEffect(() => {
        getAllAdmins();
    }, []);

    const updateAdmin = async (_id) => {
      localStorage.setItem('_id',_id);
      history.push("/UpdateAdmin")
    }

    const deleteAdminn = async (_id, products) => {
      confirmAlert({
        title: 'Confirm to delete',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => ( deleteAdmin({_id}) )
          },
          {
            label: 'No'
          }
        ]
      });
    }

    return loading && admins === null ? <Spinner /> : <Fragment>
        <div className="row">
        <div className="col-3 mb-3"><Link to="/AddAdmin" className="btn btn-gradient-primary mr-2"><i className="mdi mdi-plus menu-icon"></i>Add Admin</Link></div>
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Admins</h4>
                <div className="search-field d-none d-md-block mt-4 mb-4">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <i className="input-group-text border-0 mdi mdi-magnify text-gradient-primary bg-gradient-primary"></i>
                      </div>
                      <input type="text" className="form-control bg-light border-1 text-dark" placeholder="Search..."
                      onChange={(e) => {
                        setSerachTerm(e.target.value);
                      }}
                      />
                    </div>
                </div>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> Name </th>
                        <th> Email</th>
                        <th> Role</th>
                        <th> Status </th>
                        <th> Action </th>
                      </tr>
                    </thead>
                    <tbody>
                    
                        {admins.length > 0 ? (
                            admins.filter((admin) => {
                              if(searchTerm == ""){
                                return admin
                              } else if(admin.name.toLowerCase().includes(searchTerm.toLowerCase())){
                                return admin
                              }
                            }).map(admin => (
                              <tr>
                              <td>{admin.name}</td>
                              <td>{admin.email}</td>
                              <td>{admin.role}</td>
                              <td>{admin.status}</td>
                              <td><Link className="btn btn-sm btn-gradient-info mr-2" onClick={() => updateAdmin(admin._id)} ><i className="mdi mdi-rotate-left"></i></Link>
                              <Link className="btn btn-sm btn-gradient-danger mr-2" onClick={() => deleteAdminn(admin._id)} ><i className="mdi mdi-delete"></i></Link></td>                            </tr>
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
    deleteAdmin: PropTypes.func.isRequired,
    getAllAdmins: PropTypes.func.isRequired,
    getData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    getData: state.getData
})

export default connect( mapStateToProps, {getAllAdmins, deleteAdmin})(ManageAdmins);
