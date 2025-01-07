

import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { Helmet } from "react-helmet"; // Import Helmet for adding Bootstrap CSS dynamically
// import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./OwnerCSS/RegisterPropertyCss.css";

function RegisterProperty() {
  const [formData, setFormData] = useState({
    rent: "",
    deposit: "",
    propertyType: "",
    furnishedType: "",
    address: "",
    nearbyPlaces: "",
    amenities: "",
    capacity: "",
    gender: "",
    image: null,
  });

  const [errors, setErrors] = useState({});

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate the field immediately on input
    validateField(name, value);
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));

    // Validate image field immediately
    validateField("image", file);
  };

  // Validate individual fields
  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "rent":
        if (!value || value <= 0) {
          newErrors.rent = "Rent must be a positive number.";
        } else {
          delete newErrors.rent;
        }
        break;
      case "deposit":
        if (!value || value <= 0) {
          newErrors.deposit = "Deposit must be a positive number.";
        } else {
          delete newErrors.deposit;
        }
        break;
      case "address":
        if (!value) {
          newErrors.address = "Address is required.";
        } else {
          delete newErrors.address;
        }
        break;
      case "nearbyPlaces":
        if (!value) {
          newErrors.nearbyPlaces = "Nearby places are required.";
        } else {
          delete newErrors.nearbyPlaces;
        }
        break;
      case "amenities":
        if (!value) {
          newErrors.amenities = "Amenities are required.";
        } else {
          delete newErrors.amenities;
        }
        break;
      case "capacity":
        if (!value || value <= 0) {
          newErrors.capacity = "Capacity must be a positive number.";
        } else {
          delete newErrors.capacity;
        }
        break;
      case "gender":
        if (!value) {
          newErrors.gender = "Gender is required.";
        } else {
          delete newErrors.gender;
        }
        break;
      case "image":
        if (!value) {
          newErrors.image = "Please upload a property image.";
        } else {
          delete newErrors.image;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent form from refreshing the page on submit

    // Final validation check on submit
    if (Object.keys(errors).length === 0) {
      console.log("Form Submitted!");
      console.log("Form Data:", formData); // Log the form data before submitting

      // Log the image file details if uploaded
      if (formData.image) {
        console.log("Image file:", formData.image);
      }

      // Optionally reset form data after successful submission
      setFormData({
        rent: "",
        deposit: "",
        propertyType: "",
        furnishedType: "",
        address: "",
        nearbyPlaces: "",
        amenities: "",
        capacity: "",
        gender: "",
        image: null,
      });
    } else {
      console.log("Form has errors. Cannot submit.");
      console.log(errors); // Log errors if any
    }
  };

  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        />
      </Helmet>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh", // Ensures the form is vertically centered
          marginTop: "80px", // Adds margin between navbar and heading
        }}
      >
        <div className="w-100" style={{ maxWidth: "600px" }}>
          <h1 className="text-center mb-4">Register Your Property</h1>
          <Form onSubmit={handleSubmit} className="d-flex flex-column">
            {/* Rent and Deposit */}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formRent">
                  <Form.Label>Rent</Form.Label>
                  <Form.Control
                    type="number"
                    name="rent"
                    value={formData.rent}
                    onChange={handleChange}
                    placeholder="Enter rent price"
                    required
                    min="1"
                  />
                  {errors.rent && <Alert variant="danger">{errors.rent}</Alert>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formDeposit">
                  <Form.Label>Deposit</Form.Label>
                  <Form.Control
                    type="number"
                    name="deposit"
                    value={formData.deposit}
                    onChange={handleChange}
                    placeholder="Enter deposit amount"
                    required
                    min="1"
                  />
                  {errors.deposit && <Alert variant="danger">{errors.deposit}</Alert>}
                </Form.Group>
              </Col>
            </Row>

            {/* Property Type and Furnished Type */}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formPropertyType">
                  <Form.Label>Property Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select property type</option>
                    <option>1BHK</option>
                    <option>2BHK</option>
                    <option>3BHK</option>
                    <option>Studio</option>
                    <option>Duplex</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formFurnishedType">
                  <Form.Label>Furnished Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="furnishedType"
                    value={formData.furnishedType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select furnishing type</option>
                    <option>Fully Furnished</option>
                    <option>Semi Furnished</option>
                    <option>Unfurnished</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            {/* Address and Nearby Places */}
            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter full address"
                required
              />
              {errors.address && <Alert variant="danger">{errors.address}</Alert>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNearbyPlaces">
              <Form.Label>Nearby Places</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="nearbyPlaces"
                value={formData.nearbyPlaces}
                onChange={handleChange}
                placeholder="Enter nearby places (e.g., market, schools, hospital)"
                required
              />
              {errors.nearbyPlaces && <Alert variant="danger">{errors.nearbyPlaces}</Alert>}
            </Form.Group>

            {/* Amenities */}
            <Form.Group className="mb-3" controlId="formAmenities">
              <Form.Label>Amenities</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="amenities"
                value={formData.amenities}
                onChange={handleChange}
                placeholder="Enter amenities (e.g., WiFi, parking, pool)"
                required
              />
              {errors.amenities && <Alert variant="danger">{errors.amenities}</Alert>}
            </Form.Group>

            {/* Capacity and Gender */}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formCapacity">
                  <Form.Label>Capacity</Form.Label>
                  <Form.Control
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    placeholder="Enter capacity (e.g., 3 people)"
                    required
                    min="1"
                  />
                  {errors.capacity && <Alert variant="danger">{errors.capacity}</Alert>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formGender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select gender preference</option>
                    <option>Male</option>
                    <option>Female</option>
                  </Form.Control>
                  {errors.gender && <Alert variant="danger">{errors.gender}</Alert>}
                </Form.Group>
              </Col>
            </Row>

            {/* Image Upload */}
            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Upload Property Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              {errors.image && <Alert variant="danger">{errors.image}</Alert>}
            </Form.Group>

            <div className="settings-section">
       
        <button className="btn-1" >Submit</button>
      </div>
          </Form>
        </div>
      </Container>
    </>
  );
}

export default RegisterProperty;

