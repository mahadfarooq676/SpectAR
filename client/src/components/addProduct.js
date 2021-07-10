import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";



class AddProduct extends Component {
    

  render () {
    return (
      <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Add Product</h4>
                <p className="card-description">  </p>
                <form className="forms-sample">
                  <Form.Group>
                    <label htmlFor="exampleInputName1">Name</label>
                    <Form.Control type="text" className="form-control" id="exampleInputName1" placeholder="Name" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="exampleInputPrice">Price</label>
                    <Form.Control type="number" className="form-control" id="exampleInputPrice" placeholder="Price" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="exampleSelectCategory">Category</label>
                    <select className="form-control" id="exampleSelectCategory">
                    <option>Select Category</option>
                      <option>Sunglasses</option>
                      <option>Spectacles</option>
                    </select>
                  </Form.Group>
                    <Form.Group>
                    <label htmlFor="exampleSelectFor">For</label>
                    <select className="form-control" id="exampleSelectFor">
                    <option>Select For</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Both</option>
                    </select>
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="exampleInputQuantity">Quantiy</label>
                    <Form.Control type="number" className="form-control" id="exampleInputQuantity" placeholder="Quantity" />
                  </Form.Group>
                  <Form.Group>
                    <label>Image</label>
                    <div className="custom-file">
                      <Form.Control type="file" className="form-control visibility-hidden" id="customFileLang" lang="es"/>
                      <label className="custom-file-label" htmlFor="customFileLang">Upload image</label>
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="exampleTextarea1">Desciption</label>
                    <textarea className="form-control" id="exampleTextarea1" rows="4"></textarea>
                  </Form.Group>
                  <Link to="/AppRoutes/manageProduct" className="btn btn-gradient-primary mr-2">Submit</Link>
                  <button className="btn btn-light">Cancel</button>
                </form>
              </div>
            </div>
          </div>
    );
  }
}

export default AddProduct;