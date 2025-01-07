import Button from "react-bootstrap/Button";
import "./VD_CSS/Details.css";

export function Details() {
  return (
    <div className="main">
      <div className="outerBox mt-3">
        <div className="row">
          <div className="box1 col-sm-12 col-md-6 col-lg-6">
            <b>
              <div>
                Address: <span>Andheri West</span>
              </div>
              <div>
                Nearby Places: <span>Mall, Metro, Railway Station</span>
              </div>
              <div>
                Rent: <span>Rs. 30,000</span>
              </div>
            </b>
          </div>

          <div className="box2 col-sm-12 col-md-6 col-lg-6">
            <b>
              <div>
                Deposit: <span>Rs. 2,000</span>
              </div>
            </b>
            <b>
              <div>
                Amenities: <span>Wi-Fi, Geyser</span>
              </div>
            </b>
          </div>
        </div>
      </div>

      <div className="btnBox">
        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-6">
            {/* <Button variant="primary" size="sm">
              Book Appointment
            </Button> */}
          </div>
          <div className="col-sm-6 col-md-6 col-lg-6">
            {/* <Button variant="warning" size="sm">
              Request Callback
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

