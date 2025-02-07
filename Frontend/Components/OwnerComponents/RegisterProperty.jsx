import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { Helmet } from "react-helmet"; // Import Helmet for adding Bootstrap CSS dynamically
// import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import OwnerServices from "../../Services/OwnerServices/ownerServices.js";
import { toast } from "react-toastify";
// import "./OwnerCSS/RegisterPropertyCss.css";
function RegisterProperty() {
  const [formData, setFormData] = useState({
    rent: "",
    deposit: "",
    propertyType: "",
    furnishedType: "",
    location: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    nearbyPlaces: "",
    amenities: "",
    description:"",
    capacity: "",
    gender: "",
    owner:0,
    image:null,
  });

  const [errors, setErrors] = useState({});

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      // image:image.name
    }));

    // Validate the field immediately on input
    validateField(name, value);
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file.name);
    formData.image = file.name;
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
      case "addressLine1":
        if (!value) {
          newErrors.addressLine1 = "Address Line 1 is required.";
        } else {
          delete newErrors.addressLine1;
        }
        break;
      case "city":
        if (!value) {
          newErrors.city = "City is required.";
        } else {
          delete newErrors.city;
        }
        break;
      case "state":
        if (!value) {
          newErrors.state = "State is required.";
        } else {
          delete newErrors.state;
        }
        break;
      case "pincode":
        if (!value || !/^\d{6}$/.test(value)) {
          newErrors.pincode = "Pincode must be exactly 6 digits.";
        } else {
          delete newErrors.pincode;
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
  const handleSubmit = async(e) => {
    e.preventDefault();  // Prevent form from refreshing the page on submit

    // Final validation check on submit
    if (Object.keys(errors).length === 0) {
      console.log("Form Submitted!");
      console.log("Form Data:", formData); // Log the form data before submitting
       
      // Log the image file details if uploaded
      if (formData.image) {
        formData.image = formData.image.name;
        console.log("Image file:", formData.image.name);
      }

      //setting owner id to owner
      const ownerdetails = JSON.parse(sessionStorage.getItem('userDetails'));
      const ownerId = ownerdetails.userId;
      formData.owner = ownerId;
      console.log(ownerId);
      
      const response = await OwnerServices.registerProperty(formData);
      // Optionally reset form data after successful submission
      console.log(response);
      
      toast.success(response.message);
      setFormData({
        rent: "",
        deposit: "",
        propertyType: "",
        furnishedType: "",
        location: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
        nearbyPlaces: "",
        amenities: "",
        capacity: "",
        gender: "",
        image: null,
        owner:0
      });
    } else {
      console.log("Form has errors. Cannot submit.");
      console.log(errors); // Log errors if any
      toast.error(errors);
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
      id="RegisterForm-Container"
        className="d-flex justify-content-center align-items-center"
        // style={{
        //   minHeight: "100vh", // Ensures the form is vertically centered
        //   marginTop: "50px", // Adds margin between navbar and heading
        // }}
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

            <Form.Group className="mb-3" controlId="Location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter Location"
                required
              />
              {errors.addressLine1 && <Alert variant="danger">{errors.addressLine1}</Alert>}
            </Form.Group>
            {/* Address Fields */}
            <Form.Group className="mb-3" controlId="formAddressLine1">
              <Form.Label>Address Line 1</Form.Label>
              <Form.Control
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                placeholder="Enter address line 1"
                required
              />
              {errors.addressLine1 && <Alert variant="danger">{errors.addressLine1}</Alert>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAddressLine2">
              <Form.Label>Address Line 2</Form.Label>
              <Form.Control
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                placeholder="Enter address line 2 (optional)"
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    required
                  />
                  {errors.city && <Alert variant="danger">{errors.city}</Alert>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formState">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                    required
                  />
                  {errors.state && <Alert variant="danger">{errors.state}</Alert>}
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formPincode">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Enter 6-digit pincode"
                required
              />
              {errors.pincode && <Alert variant="danger">{errors.pincode}</Alert>}
            </Form.Group>

            {/* Nearby Places */}
            <Form.Group className="mb-3" controlId="formNearbyPlaces">
              <Form.Label>Nearby Places</Form.Label>
              <Form.Control
                as="textarea"
                name="nearbyPlaces"
                value={formData.nearbyPlaces}
                onChange={handleChange}
                placeholder="Enter nearby places"
                required
              />
              {errors.nearbyPlaces && <Alert variant="danger">{errors.nearbyPlaces}</Alert>}
            </Form.Group>

            {/* Amenities */}
            <Form.Group className="mb-3" controlId="formAmenities">
              <Form.Label>Amenities</Form.Label>
              <Form.Control
                as="textarea"
                name="amenities"
                value={formData.amenities}
                onChange={handleChange}
                placeholder="Enter amenities"
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
                    placeholder="Enter capacity"
                    required
                  />
                  {errors.capacity && <Alert variant="danger">{errors.capacity}</Alert>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formGender">
                  <Form.Label>Gender Preference</Form.Label>
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
                    <option>Any</option>
                  </Form.Control>
                  {errors.gender && <Alert variant="danger">{errors.gender}</Alert>}
                </Form.Group>
              </Col>
            </Row>

            {/* Image Upload */}
            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Property Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleImageChange}
                required
              />
              {errors.image && <Alert variant="danger">{errors.image}</Alert>}
            </Form.Group>

            <div id="Registerbtn">
                <button >
                  Register Property
                </button>
            </div>
            
          </Form>
        </div>
      </Container>
    </>
  );
}

export default RegisterProperty;

