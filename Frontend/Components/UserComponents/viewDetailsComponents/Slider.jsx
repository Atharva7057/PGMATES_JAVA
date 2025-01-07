import { Carousel }  from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap.min.css';


import './VD_CSS/Slider.css';

import slide1 from '../../../Images/slide1.png';
import slide2 from '../../../Images/slide2.png';
export function Slider() {
  // const [text] = useState("");
  return (
    <div className="carauselDiv" >
      <Carousel>
        <Carousel.Item>
          <img src={slide1} alt="" />
          {/* <ExampleCarouselImage text="First slide" /> */}
          <Carousel.Caption>
            <h3>First slide label</h3>
            {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <img src={slide2} alt="" />
          {/* <ExampleCarouselImage text="Second slide" /> */}
          <Carousel.Caption>
            <h3>Second slide label</h3>
            {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <img src={slide1} alt="" />
          {/* <ExampleCarouselImage text="Third slide" /> */}
          <Carousel.Caption>
            <h3>Third slide label</h3>
            {/* <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p> */}
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
   </div>
  );
}
export default Slider;