import React, { Fragment, useEffect, Component, useState} from 'react';
import PropTypes from 'prop-types';
import { Link  } from 'react-router-dom'
import { connect } from 'react-redux';
import Spinner from './layout/spinner';
import { getProduct } from '../actions/getData';
import axios from 'axios';
import { URL } from './../actions/types';
import { deleteProduct } from '../actions/delete';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import style from '../assets/styles/productImage.css';

const ViewProducts = ({ deleteProduct, history }) => {

  let _id = localStorage.getItem('_id');

  const [product,setProduct]=useState({});
  let [flag,setFlag]=useState(false)


  useEffect(async () => { 
    const p= await axios.get(URL + 'api/getProduct/'+_id);
    setProduct(p.data);
    setFlag(true)
  },[]);

  const updateProduct = async (_id) => {
    localStorage.setItem('_id',_id);
    history.push("/UpdateProduct")
  }

  const deleteProductt = async (_id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => ( deleteProduct({_id}) )
        },
        {
          label: 'No'
        }
      ]
    });
  }
  
    return product === null || !flag ? <Spinner/> : <Fragment>
        <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                  <div className="col-lg-6 col-md-12 float-left">
                      <div class="img-thumbnail">
                        <img src={URL+"public/uploads/"+product.productImage} alt="" width="100%" />
                      </div>
                  </div>
                  <div className="col-lg-6 col-md-12 float-right">
                    <h4>{product.productCategory}</h4>
                    <h2>{product.productName}</h2>
                    <h6>$ {product.productPrice} PKR</h6>
                    <h6>Sales Price: {product.salesPrice} PKR</h6>
                    <h6># {product.productQuantity} piece</h6>
                    <div style={{ backgroundColor:"#eeeeee", borderRadius:"10px", boxShadow: "10px 20px 30px lightblue", padding:"5px", marginBottom:"3px" }} ><p><b>Highlights: </b><br></br>{product.highlights}</p></div>
                    <div style={{ backgroundColor:"#eeeeee", borderRadius:"10px", boxShadow: "10px 20px 30px lightblue", padding:"5px", marginBottom:"3px" }} ><p><b>Short Description: </b><br></br>{product.shortDescription}</p></div>
                    <div style={{ backgroundColor:"#eeeeee", borderRadius:"10px", boxShadow: "10px 20px 30px lightblue", padding:"5px", marginBottom:"10px" }} ><p><b>Long Description: </b><br></br>{product.detailedDescription}</p></div>
                      <div style={{ backgroundColor:"#eeeeee", padding:"5px" }} className="col-lg-6 col-md-12 float-left"><p>Frame Length: <b>{product.frameLength} mm</b></p></div>
                      <div style={{ backgroundColor:"#eeeeee", padding:"5px" }} className="col-lg-6 col-md-12 float-right"><p>Frame Weight: <b>{product.frameWeight} g</b></p></div>
                      <div style={{ backgroundColor:"#eeeeee", padding:"5px" }} className="col-lg-6 col-md-12 float-left"><p>Lens Width: <b>{product.lensWidth} mm</b></p></div>
                      <div style={{ backgroundColor:"#eeeeee", padding:"5px" }} className="col-lg-6 col-md-12 float-right"><p>Lens Height: <b>{product.lensHeight} mm</b></p></div>
                      <div style={{ backgroundColor:"#eeeeee", padding:"5px" }} className="col-lg-6 col-md-12 float-left"><p>Temple Length: <b>{product.templeLength} mm</b></p></div>
                      <div style={{ backgroundColor:"#eeeeee", padding:"5px" }} className="col-lg-6 col-md-12 float-right"><p>Bridge Width: <b>{product.bridgeWidth} mm</b></p></div>
                  </div>
                </div>
                <div style={{ margin:"auto", paddingTop:"30px", paddingBottom:"30px" }}>
                  <Link className="btn btn-warning mt-1" style={{ width:"200px" }} onClick={() => updateProduct(product._id)} ><i className="mdi mdi-rotate-left"></i>Update</Link>
                  <Link className="btn btn-danger mt-1" style={{ width:"200px" }} onClick={() => deleteProductt(product._id)} ><i className="mdi mdi-delete"></i>Delete</Link>
                  <Link className="btn btn-primary mt-1" style={{ width:"200px" }} to="/ManageProduct"><i className="mdi mdi-arrow-left"></i>Go Back</Link>
                </div>
            </div>
          </div>
        </div>
        
    </Fragment>
};


// const ViewProducts = ({ getProduct, getData: { productById, loading } }) => {

//   let id = JSON.stringify(window.location.href);
//   var _id = id.substring(45, id.length-1);

//   useEffect(async () => {
//   await getProduct(_id);
// },[]);
  
//     return loading && productById === null ? <Spinner/> : <Fragment>
//         <div className="row">
//           <div className="col-12 grid-margin">
//             <div className="card">
//               <div className="card-body">
//                 <h4 className="card-title">View Product</h4>
//                 <div className="table-responsive">
//                   <table className="table">
//                     <tbody>
//                             <tr>
//                               <th>Product Name</th>
//                               <td>{productById.productName}</td>
//                             </tr>
//                             <tr>
//                               <th>Product Price</th>
//                               <td>{productById.productPrice} PKR</td>
//                             </tr>
//                             <tr>
//                               <th>Product Categroy</th>
//                               <td>{productById.productCategory}</td>
//                             </tr>
//                             <tr>
//                               <th>Product Quantity</th>
//                               <td>{productById.productQuantity} peice</td>
//                             </tr>
//                             <tr>
//                               <th>Frame Length</th>
//                               <td>{productById.frameLength} mm</td>
//                             </tr>
//                             <tr>
//                               <th>Frame Weight</th>
//                               <td>{productById.frameWeight} g</td>
//                             </tr>
//                             <tr>
//                               <th>Lens Width</th>
//                               <td>{productById.lensWidth} mm</td>
//                             </tr>
//                             <tr>
//                               <th>Lens Height</th>
//                               <td>{productById.lensHeight} mm</td>
//                             </tr>
//                             <tr>
//                               <th>Temple Length</th>
//                               <td>{productById.templeLength} mm</td>
//                             </tr>
//                             <tr>
//                               <th>Bridge Width</th>
//                               <td>{productById.bridgeWidth} mm</td>
//                             </tr>
//                     </tbody>
//                   </table>
//                             <div style={{ width: "70%", margin:"0 auto", paddingTop:"40px" }}>
//                             <Link className="btn btn-warning" style={{ width:"200px" }} to="updateProduct"><i className="mdi mdi-rotate-left"></i>Update</Link>
//                             <Link className="btn btn-danger" style={{ width:"200px" }}><i className="mdi mdi-delete"></i>Delete</Link>
//                             <Link className="btn btn-primary" style={{ width:"200px" }} to="/appRoutes/manageProduct"><i className="mdi mdi-arrow-left"></i>Go Back</Link>
//                             </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//     </Fragment>
// };

// ViewProducts.propTypes = {
//     getData: PropTypes.object.isRequired,
//     getProduct: PropTypes.func.isRequired
// };

// const mapStateToProps = state => ({
//     getData: state.getData
// })

// export default connect( mapStateToProps, {getProduct})(ViewProducts);



ViewProducts.propTypes = {
  deleteProduct: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  getData: state.getData
})

export default connect( mapStateToProps, {deleteProduct})(ViewProducts);
