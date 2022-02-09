import React from 'react';
import { ProgressBar } from 'react-bootstrap';
 
import "react-datepicker/dist/react-datepicker.css";



    
   const Dashboard = ({ auth }) => {

    return (
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
                <h2 className="mb-5">PKR 11,150</h2>
                <h6 className="card-text">Increased by 60%</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-info card-img-holder text-white">
              <div className="card-body">
                <img src={require("../assets/images/dashboard/circle.svg").default} className="card-img-absolute" alt="circle" />
                <h4 className="font-weight-normal mb-3">Monthly Sales <i className="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">245</h2>
                <h6 className="card-text">Decreased by 10%</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-success card-img-holder text-white">
              <div className="card-body">
                <img src={require("../assets/images/dashboard/circle.svg").default} className="card-img-absolute" alt="circle" />
                <h4 className="font-weight-normal mb-3">Weekly Orders <i className="mdi mdi-diamond mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">95,574</h2>
                <h6 className="card-text">Increased by 5%</h6>
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
                        <th> # </th>
                        <th> Name </th>
                        <th> Due Date </th>
                        <th> Progress </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td> 1 </td>
                        <td> Glasses-0034 </td>
                        <td> May 15, 2021 </td>
                        <td>
                          <ProgressBar variant="gradient-success" now={95}/>
                        </td>
                      </tr>
                      <tr>
                        <td> 2 </td>
                        <td> Sunglasses-0056 </td>
                        <td> Jun 01, 2021 </td>
                        <td>
                        <ProgressBar variant="gradient-warning" now={85}/>
                        </td>
                      </tr>
                      <tr>
                        <td> 3 </td>
                        <td> Glasses-0032 </td>
                        <td> Apr 12, 2021 </td>
                        <td>
                        <ProgressBar variant="gradient-warning" now={80}/>
                        </td>
                      </tr>
                      <tr>
                        <td> 4 </td>
                        <td> Glasses-0087 </td>
                        <td> May 15, 2021 </td>
                        <td>
                        <ProgressBar variant="gradient-primary" now={70}/>
                        </td>
                      </tr>
                      <tr>
                        <td> 5 </td>
                        <td> Glasses-0042 </td>
                        <td> May 03, 2021 </td>
                        <td>
                        <ProgressBar variant="gradient-primary" now={60}/>
                        </td>
                      </tr>
                      <tr>
                        <td> 6 </td>
                        <td> Sunglasses-0023 </td>
                        <td> Jun 05, 2021 </td>
                        <td>
                        <ProgressBar variant="gradient-info" now={55}/>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Best Selling Products</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> # </th>
                        <th> Name </th>
                        <th> Due Date </th>
                        <th> Progress </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td> 1 </td>
                        <td> Glasses-0042 </td>
                        <td> Apr 15, 2021 </td>
                        <td>
                          <ProgressBar variant="gradient-success" now={95}/>
                        </td>
                      </tr>
                      <tr>
                        <td> 2 </td>
                        <td> Glasses-0076 </td>
                        <td> Jul 01, 2021 </td>
                        <td>
                        <ProgressBar variant="gradient-warning" now={77}/>
                        </td>
                      </tr>
                      <tr>
                        <td> 3 </td>
                        <td> Sunglasses-0047 </td>
                        <td> Mar 12, 2021 </td>
                        <td>
                        <ProgressBar variant="gradient-warning" now={70}/>
                        </td>
                      </tr>
                      <tr>
                        <td> 4 </td>
                        <td> Glasses-0020 </td>
                        <td> May 15, 2021 </td>
                        <td>
                        <ProgressBar variant="gradient-primary" now={65}/>
                        </td>
                      </tr>
                      <tr>
                        <td> 5 </td>
                        <td> Sunglasses-0064 </td>
                        <td> Apr 03, 2021 </td>
                        <td>
                        <ProgressBar variant="gradient-primary" now={55}/>
                        </td>
                      </tr>
                      <tr>
                        <td> 6 </td>
                        <td> Glasses-0093 </td>
                        <td> Feb 05, 2021 </td>
                        <td>
                        <ProgressBar variant="gradient-info" now={45}/>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    );
  
}
  
export default Dashboard;