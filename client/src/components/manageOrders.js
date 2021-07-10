import React, { Component } from 'react';
 
import "react-datepicker/dist/react-datepicker.css";



export class AddProduct extends Component {
    

  render () {
    return (
      <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Orders</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> Order ID </th>
                        <th> Product Name </th>
                        <th> Product Image </th>
                        <th> Date </th>
                        <th> Status </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td> WD-0001 </td>
                        <td> Glasses-0034 </td>
                        <td>
                          <img src={require("../assets/images/product_images_2/product1.jpg").default} alt=""/></td>
                        <td> May 12, 2021 </td>
                        <td>
                          <label className="badge badge-success">DONE</label>
                        </td>
                      </tr>
                      <tr>
                        <td> WD-0002 </td>
                        <td> Glasses-0024 </td>
                        <td>
                          <img src={require("../assets/images/product_images_2/product2.jpg").default} className="mr-2" alt="face" /></td>
                        <td> Apr 22, 2021 </td>
                        <td>
                          <label className="badge badge-primary">Pending</label>
                        </td>
                      </tr>
                      <tr>
                        <td> WD-0003 </td>
                        <td> Glasses-0987 </td>
                        <td>
                          <img src={require("../assets/images/product_images_2/product5.jpg").default} className="mr-2" alt="face" /></td>
                        <td> Apr 15, 2021 </td>
                        <td>
                          <label className="badge badge-warning">In Progress</label>
                        </td>
                      </tr>
                      <tr>
                        <td> WD-0004 </td>
                        <td> Glasses-0675 </td>
                        <td>
                          <img src={require("../assets/images/product_images_2/product6.jpg").default} className="mr-2" alt="face" /></td>
                        <td> Mar 5, 2021 </td>
                        <td>
                          <label className="badge badge-success">DONE</label>
                        </td>
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