import React, { Fragment, useEffect, Component, useState} from 'react';
import PropTypes from 'prop-types';
import { Link  } from 'react-router-dom'
import { connect } from 'react-redux';
import Spinner from './layout/spinner';
import { getOrder } from '../actions/getData';
import axios from 'axios';
import { URL } from '../actions/types';
import { deleteProduct } from '../actions/delete';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import style from '../assets/styles/productImage.css';

const ViewOrder = ({ history }) => {

  let [order,setOrder]=useState({});
  let [flag,setFlag]=useState(false);

  
  useEffect(() => {

    let mounted =true;

    async function getOrders(){
      let _id = localStorage.getItem('_id');
      const p= await axios.get(URL + 'api/getOrder/'+_id);
      setOrder(p.data);
      setFlag(true);
    }

    if(mounted){
      getOrders();
    }
      
    return()=>mounted=false;
  }, []);

  let TotalPrice = 0;

      if(flag){
        order[2].map((c)=>(
          TotalPrice = parseInt(TotalPrice) + parseInt(c.salesPrice)
       ))
      }
          
  
    return order === null || !flag ? <Spinner/> : <Fragment>
        <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                {console.log(order)}
                    <h3><b>Order Details</b></h3> 
                    <h5 className='ml-2 mt-4'>Order ID: <b>{order[1]}</b></h5>
                    <h5 className='ml-2 mt-4'>Total Price: <b>{TotalPrice}</b> PKR</h5>
                    <div style={{ backgroundColor:"#efefef", borderRadius:"10px", boxShadow: "10px 20px 30px lightblue", padding:"5px", marginBottom:"3px"  }} >
                          <p className='m-3'>
                              <h4>User Details</h4> 
                              <p>Name: <b >{order[0].firstName} {order[0].lastName}</b></p>
                              <p>Email: <b >{order[0].email}</b></p>
                              <p>Contact: <b >{order[0].phone}</b></p>
                              <p>Address: <b >{order[0].address}</b></p>
                              <p>City: <b >{order[0].city}</b></p>
                              <p>Postal Code: <b >{order[0].postalCode}</b></p>
                          </p>
                       </div>
                    {flag? order[2].map((c)=>(
                       <div style={{ backgroundColor:"#efefef", borderRadius:"10px", boxShadow: "10px 20px 30px lightblue", padding:"5px", marginBottom:"3px",  height:"120px" }} >
                         <img className='float-left mr-4' src={URL+"public/uploads/"+c.productImage} alt="" width="100px" />
                          <p className='mt-3'>
                              <b>Product {c.productName}: </b><br></br>
                              Price: {c.salesPrice} PKR
                          </p>
                       </div>
                    )):null
                    }
                
                <div style={{ width: "70%", paddingTop:"40px" }}>
                  <Link className="btn btn-primary mt-1" style={{ width:"200px" }} to="/ManageOrders"><i className="mdi mdi-arrow-left"></i>Go Back</Link>
                </div>
                </div>
            </div>
          </div>
        </div>
        
    </Fragment>
};


ViewOrder.propTypes = {
};

const mapStateToProps = state => ({
  getData: state.getData
})

export default connect( mapStateToProps, {})(ViewOrder);
