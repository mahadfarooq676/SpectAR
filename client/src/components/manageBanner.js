import React, { Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Link  } from 'react-router-dom'
import { connect } from 'react-redux';
import { getBanners } from '../actions/getData';
import Spinner from './layout/spinner';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { URL } from './../actions/types';


const ManageBanner = ({ getBanners, getData: { banners, loading }, history }) => {

  const [ searchTerm, setSerachTerm ] = useState("");

    useEffect(() => {
        getBanners();
    }, []);

    // const deleteProduct = async (_id) => {
    //   confirmAlert({
    //     title: 'Confirm to delete',
    //     message: 'Are you sure to do this.',
    //     buttons: [
    //       {
    //         label: 'Yes',
    //         onClick: () => products.filter(product => (product._id !== _id))
    //       },
    //       {
    //         label: 'No'
    //       }
    //     ]
    //   });
    // }

    return loading && banners === null ? <Spinner /> : <Fragment>
        <div className="row">
        <div className="col-3 mb-3"><Link to="/AppRoutes/addBanner" className="btn btn-gradient-primary"><i className="mdi mdi-plus menu-icon"></i>Add Banner</Link></div>
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Banner</h4>
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
                        <th> Image </th>
                        <th> Name</th>
                        <th> Action </th>
                      </tr>
                    </thead>
                    <tbody>
                    
                        {banners.length > 0 ? (
                            banners.filter((banner) => {
                              if(searchTerm == ""){
                                return banner
                              } else if(banner.bannerName.toLowerCase().includes(searchTerm.toLowerCase())){
                                return banner
                              }
                            }).map(banner => (
                              <tr>
                              <img src={URL+"public/banner/"+banner.bannerImage} className="img-fluid"style={{maxHeight: '100px', maxWidth: '100'}} ></img>
                              <td>{banner.bannerName}</td>
                              <td><Link className="btn btn-sm btn-gradient-danger mr-2"  ><i className="mdi mdi-delete"></i></Link></td>
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

ManageBanner.propTypes = {
    getBanners: PropTypes.func.isRequired,
    getData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    getData: state.getData
})

export default connect( mapStateToProps, {getBanners})(ManageBanner);
