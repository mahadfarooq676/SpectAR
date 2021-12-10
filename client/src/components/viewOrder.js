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


  // useEffect(async () => { 
  //   const p= await axios.get(URL + 'api/getOrder/'+_id);
  //   setOrder(p.data);
  //   console.log(order);
  //   order.productList.map((c)=>{
  //     console.log(c[0].productId);
  //   })
  // },[]);

  
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
  });
  
    return order === null || !flag ? <Spinner/> : <Fragment>
        <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                    <h4>{order._id}</h4>
                    <h6>$ {order.totalPrice} PKR</h6>
                    {flag? order.productList.map((c)=>(
                       <div style={{ backgroundColor:"#eeeeee", borderRadius:"10px", boxShadow: "10px 20px 30px lightblue", padding:"5px", marginBottom:"3px" }} ><p><b>Product {c[0].productId}: </b><br></br>Quantity: {c[0].quantity}<br></br>Price: {order.totalPrice} PKR</p></div>
                    )):null
                    }
                    {/* <div style={{ backgroundColor:"#eeeeee", borderRadius:"10px", boxShadow: "10px 20px 30px lightblue", padding:"5px", marginBottom:"3px" }} ><p><b>Product 2: </b><br></br>Quantity: 3<br></br>Price: 3000 PKR</p></div>
                    <div style={{ backgroundColor:"#eeeeee", borderRadius:"10px", boxShadow: "10px 20px 30px lightblue", padding:"5px", marginBottom:"9px" }} ><p><b>Product 3: </b><br></br>Quantity: 3<br></br>Price: 3000 PKR</p></div> */}
                
                <div style={{ width: "70%", paddingTop:"40px" }}>
                  <Link className="btn btn-primary mt-1" style={{ width:"200px" }} to="/AppRoutes/manageOrders"><i className="mdi mdi-arrow-left"></i>Go Back</Link>
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
