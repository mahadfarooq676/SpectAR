import React, { Fragment, useEffect, Component, useState} from 'react';
import { ProgressBar } from 'react-bootstrap';
import axios from 'axios';
import Spinner from './layout/spinner';
import { URL } from '../actions/types';

import "react-datepicker/dist/react-datepicker.css";



    
   const Dashboard = ({ auth }) => {

    let [report,setReport]=useState({});
    let [products,setProducts]=useState({});
    let [orders,setOrders]=useState({});
    let [banners,setBanners]=useState({});
    let [flag,setFlag]=useState(false);

    let mounted =true;

    useEffect(() => {

    async function getData(){
      const r = await axios.get(URL + 'api/getReport');
      setReport(r.data);
      const p = await axios.get(URL + 'api/getProductData');
      setProducts(p.data);
      const o = await axios.get(URL + 'api/getOrders');
      setOrders(o.data);
      const b = await axios.get(URL + 'api/getBanners');
      setBanners(b.data);
      setFlag(true);
    }

    if(mounted){
      getData();
    }
      
    return()=>mounted=false
}, []);

    return report === null || !flag ? <Spinner/> : <Fragment>
      <div>
        <div className="page-header">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white mr-2">
              <i className="mdi mdi-home"></i>
            </span> Dashboard </h3>
        </div>
        <div className="row">
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-danger card-img-holder text-white">
              <div className="card-body">
                <img src={require("../assets/images/dashboard/circle.svg").default} className="card-img-absolute" alt="circle" />
                <h4 className="font-weight-normal mb-3">Weekly Sales <i className="mdi mdi-chart-line mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">PKR {report[0]}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-info card-img-holder text-white">
              <div className="card-body">
                <img src={require("../assets/images/dashboard/circle.svg").default} className="card-img-absolute" alt="circle" />
                <h4 className="font-weight-normal mb-3">Monthly Sales <i className="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">PKR {report[2]}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-success card-img-holder text-white">
              <div className="card-body">
                <img src={require("../assets/images/dashboard/circle.svg").default} className="card-img-absolute" alt="circle" />
                <h4 className="font-weight-normal mb-3">Weekly Orders <i className="mdi mdi-diamond mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">{report[1]}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Trending Products</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> Image </th>
                        <th> Name </th>
                        <th> Price </th>
                        <th> productCategory </th>
                      </tr>
                    </thead>
                    <tbody>
                    { products.slice(0, 5).map((product, pkey) => (
                              <tr key={pkey}>
                              <img src={URL+"public/uploads/"+product.productImage} className="img-fluid"style={{maxHeight: '100px', maxWidth: '100'}} ></img>
                              <td>{product.productName}</td>
                              <td>{product.productPrice}</td>
                              <td>{product.productCategory}</td>
                              </tr>
                              ))
                    }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Orders</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> # </th>
                        <th> Date </th>
                        <th> Status </th>
                      </tr>
                    </thead>
                    <tbody>
                    { orders.slice(0, 5).map((order, pkey) => (
                              <tr key={pkey}>
                              <td style={{ height:"100px"}}>{order._id.substr(18,24)}</td>
                              <td>{order.createdTimestamp}</td>
                              <td>{order.status}</td>
                              </tr>
                              ))
                    }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Banner</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> # </th>
                        <th> Image </th>
                        <th> Name </th>
                      </tr>
                    </thead>
                    <tbody>
                    { banners.slice(0, 5).map((banner, pkey) => (
                              <tr key={pkey}>
                              <td>{pkey}</td>
                              <img src={URL+"public/banner/"+banner.bannerImage} className="img-fluid"style={{maxHeight: '100px', maxWidth: '100'}} ></img>
                              <td>{banner.bannerName}</td>
                              </tr>
                              ))
                    }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
      </Fragment>
  
}
  
export default Dashboard;