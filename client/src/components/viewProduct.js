import React, { Fragment, useEffect, Component, useState} from 'react';
import PropTypes from 'prop-types';
import { Link  } from 'react-router-dom'
import { connect } from 'react-redux';
import Spinner from './layout/spinner';
import { getProduct } from '../actions/getData';
import axios from 'axios';
import { URL } from './../actions/types';
// class ViewProducts extends Component{
//    state={
//      product:{}
//       }
//   async componentDidMount(){
//     let id = JSON.stringify(window.location.href);
//     var _id = id.substring(45, id.length-1);

//     const p= await axios.get('http://localhost:5000/api/getProduct/'+_id);

//     this.setState({product:p.data});
//   }

//   render(){
//     return this.state.product._id === null ? <Spinner/> : <Fragment>
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
//                               <td>{this.state.product.productName}</td>
//                             </tr>
//                             <tr>
//                               <th>Product Price</th>
//                               <td>{this.state.product.productPrice} PKR</td>
//                             </tr>
//                             <tr>
//                               <th>Product Categroy</th>
//                               <td>{this.state.product.productCategory}</td>
//                             </tr>
//                             <tr>
//                               <th>Product Quantity</th>
//                               <td>{this.state.product.productQuantity} peice</td>
//                             </tr>
//                             <tr>
//                               <th>Frame Length</th>
//                               <td>{this.state.product.frameLength} mm</td>
//                             </tr>
//                             <tr>
//                               <th>Frame Weight</th>
//                               <td>{this.state.product.frameWeight} g</td>
//                             </tr>
//                             <tr>
//                               <th>Lens Width</th>
//                               <td>{this.state.product.lensWidth} mm</td>
//                             </tr>
//                             <tr>
//                               <th>Lens Height</th>
//                               <td>{this.state.product.lensHeight} mm</td>
//                             </tr>
//                             <tr>
//                               <th>Temple Length</th>
//                               <td>{this.state.product.templeLength} mm</td>
//                             </tr>
//                             <tr>
//                               <th>Bridge Width</th>
//                               <td>{this.state.product.bridgeWidth} mm</td>
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
//   }
// }

const ViewProducts = () => {

  let id = JSON.stringify(window.location.href);
  var _id = id.substring(45, id.length-1);

  const [product,setProduct]=useState({});


  useEffect(async () => {
    const p= await axios.get(URL + 'api/getProduct/'+_id);
    setProduct(p.data);

},[]);
  
    return product === null ? <Spinner/> : <Fragment>
        <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">View Product</h4>
                <div className="table-responsive">
                  <table className="table">
                    <tbody>
                            <tr>
                              <th>Product Image</th>
                              <img src={URL +"public/uploads/"+product.productImage} className="img-fluid"style={{maxHeight: '200px', maxWidth: '200'}} ></img>
                            </tr>
                            <tr>
                              <th>Product Title</th>
                              <td>{product.productName}</td>
                            </tr>
                            <tr>
                              <th>Product Price</th>
                              <td>{product.productPrice} PKR</td>
                            </tr>
                            <tr>
                              <th>Product Categroy</th>
                              <td>{product.productCategory}</td>
                            </tr>
                            <tr>
                              <th>Product Quantity</th>
                              <td>{product.productQuantity} peice</td>
                            </tr>
                            <tr>
                              <th>Frame Length</th>
                              <td>{product.frameLength} mm</td>
                            </tr>
                            <tr>
                              <th>Frame Weight</th>
                              <td>{product.frameWeight} g</td>
                            </tr>
                            <tr>
                              <th>Lens Width</th>
                              <td>{product.lensWidth} mm</td>
                            </tr>
                            <tr>
                              <th>Lens Height</th>
                              <td>{product.lensHeight} mm</td>
                            </tr>
                            <tr>
                              <th>Temple Length</th>
                              <td>{product.templeLength} mm</td>
                            </tr>
                            <tr>
                              <th>Bridge Width</th>
                              <td>{product.bridgeWidth} mm</td>
                            </tr>
                            <tr>
                              <th>Status</th>
                              <td>{product.status}</td>
                            </tr>
                    </tbody>
                  </table>
                            <div style={{ width: "70%", margin:"0 auto", paddingTop:"40px" }}>
                            <Link className="btn btn-warning" style={{ width:"200px" }} to={`/appRoutes/updateProduct/${product._id}`}><i className="mdi mdi-rotate-left"></i>Update</Link>
                            <Link className="btn btn-danger" style={{ width:"200px" }}><i className="mdi mdi-delete"></i>Delete</Link>
                            <Link className="btn btn-primary" style={{ width:"200px" }} to="/appRoutes/manageProduct"><i className="mdi mdi-arrow-left"></i>Go Back</Link>
                            </div>
                </div>
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
export default ViewProducts;
