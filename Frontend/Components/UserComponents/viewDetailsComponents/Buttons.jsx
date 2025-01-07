import Button from "react-bootstrap/Button";
import "./Buttons.css";

export function Buttons() {
  return (
    <div className="btnBox">
      <div className="innerBtnBox ml-5">
        <div className="btn1">
          <Button variant="primary">Book Appointment</Button>
        </div>
        <div>
          <Button variant="warning">Request Callback</Button>
        </div>
      </div>
    </div>
  );
}
