import Form from "react-bootstrap/Form";
import "./OwnerCSS/ContactUs.css";

const ContactUs = () => {
  return (
    <div className="contact-form-container">
      <h2 className="contact-title">Contact Us</h2>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="custom-label">Name</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label className="custom-label">Email</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label className="custom-label">Message</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" />
        </Form.Group>
        <div className="form-submit-container">
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
};

export default ContactUs;
