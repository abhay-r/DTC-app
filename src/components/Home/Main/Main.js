import React, { useEffect, useState } from 'react';
import './Main.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Main({ setIssue, data, setData }) {
  const navigate = useNavigate();
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const Support = () => {
    setIssue(data.issues);

    if (data.brand === '' || data.issues === '' || data.model === '' || data.case === '') {
      alert('Please provide details');
    } else {
      axios.post('http://localhost:5000/submit-data', data)
        .then(response => {
          // Handle the response from the Flask app if needed
          navigate(`/${data.issues}/0`);
        })
        .catch(error => {
          console.error('Error submitting data:', error);
        });
    }
  };

  return (
    <div className="mainContainer">
      <div className='container1'>
        <div className="form">
          <div className="form-group">
            <label htmlFor="brandSelect"><h5>Brand Name:</h5></label>
            <div className="drop">
              <Form.Select size="lg" name='brand' onChange={handleChange} className='form-control' id="brandSelect">
                <option defaultValue>Dell</option>
              </Form.Select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="productSelect"><h5>Select product group:</h5></label>
            <div className="drop">
              <Form.Select size="lg" name='product' onChange={handleChange} id="productSelect">
                <option defaultValue>select</option>
                <option>Inspiron Desktop</option>
                <option>Inspiron Notebook</option>
                <option>Vostro Desktop</option>
                <option>Vostro Notebook</option>
                <option>Monitor</option>
                <option>peripherals</option>
              </Form.Select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="modelInput"><h5>Model Number:</h5></label>
            <input type="text" className="form-control" id="modelInput" name='model' onChange={handleChange} placeholder="Enter Model No." />
          </div>
          <div className="form-group">
            <label htmlFor="caseInput"><h5>Case Id:</h5></label>
            <input type="text" className="form-control" id="caseInput" name='case' onChange={handleChange} placeholder="Enter Case Id" />
          </div>
          <div className="form-group">
            <label htmlFor="issuesSelect"><h5>Select Issue:</h5></label>
            <div className="drop">
              <Form.Select size="lg" name='issues' onChange={handleChange} id="issuesSelect">
                <option defaultValue>select</option>
                <option>No power</option>
                <option>No post</option>
                <option>No Audio</option>
                <option>No Boot</option>
                <option>Keyboard not working</option>
                <option>Touchpad not working</option>
                <option>Black screen issue</option>
                <option>Overheating</option>
              </Form.Select>
            </div>
          </div>
          <div className="form-group">
            <div className="buttons">
              <Button variant="dark" onClick={Support}>Go With Premium Support</Button>
              <Button variant="dark" onClick={Support}>Go With Basic Support</Button>
            </div>
          </div>
        </div>
      </div>

      <section></section>
    </div>
  );
}

export default Main;
