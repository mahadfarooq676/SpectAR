import React, { Component } from 'react';
 
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';


export class AddProduct extends Component {
    

  render () {
    return (
      <div className="row">
      <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Manage Products</h4>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th> Product ID </th>
                    <th> Product Name </th>
                    <th> Product Price </th>
                    <th> Product Quantity </th>
                    <th> Product Image </th>
                    <th> Date </th>
                    <th> Action </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> P-0001 </td>
                    <td> Glasses-0034 </td>
                    <td> PKR 1299 </td>
                    <td> 200 </td>
                    <td>
                      <img src={require("../assets/images/product_images_2/product1.jpg").default} alt=""/></td>
                    <td> May 12, 2021 </td>
                    <td><Link to="/AppRoutes/updateProduct" className="btn btn-gradient-primary mr-2">Update</Link>
                    <Link to="/AppRoutes/manageProduct" className="btn btn-gradient-danger mr-2">Delete</Link></td>
                  </tr>
                  <tr>
                    <td> P-0002 </td>
                    <td> Glasses-0024 </td>
                    <td> PKR 1499 </td>
                    <td> 150 </td>
                    <td>
                      <img src={require("../assets/images/product_images_2/product2.jpg").default} className="mr-2" alt="face" /></td>
                    <td> Apr 22, 2021 </td>
                    <td><Link to="/AppRoutes/updateProduct" className="btn btn-gradient-primary mr-2">Update</Link>
                    <Link to="/AppRoutes/manageProduct" className="btn btn-gradient-danger mr-2">Delete</Link></td>
                  </tr>
                  <tr>
                    <td> P-0003 </td>
                    <td> Glasses-0987 </td>
                    <td> PKR 999 </td>
                    <td> 300 </td>
                    <td>
                      <img src={require("../assets/images/product_images_2/product5.jpg").default} className="mr-2" alt="face" /></td>
                    <td> Apr 15, 2021 </td>
                    <td><Link to="/AppRoutes/updateProduct" className="btn btn-gradient-primary mr-2">Update</Link>
                    <Link to="/AppRoutes/manageProduct" className="btn btn-gradient-danger mr-2">Delete</Link></td>
                  </tr>
                  <tr>
                    <td> P-0004 </td>
                    <td> Glasses-0675 </td>
                    <td> PKR 1599 </td>
                    <td> 240 </td>
                    <td>
                      <img src={require("../assets/images/product_images_2/product6.jpg").default} className="mr-2" alt="face" /></td>
                    <td> Mar 5, 2021 </td>
                    <td><Link to="/AppRoutes/updateProduct" className="btn btn-gradient-primary mr-2">Update</Link>
                    <Link to="/AppRoutes/manageProduct" className="btn btn-gradient-danger mr-2">Delete</Link></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default AddProduct;