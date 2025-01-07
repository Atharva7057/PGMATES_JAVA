import React from 'react';

import '../../CSS/Services.css';

function ServicesList(props) {
  return (
    <>
    <div className="service">
      <img src={props.image} alt={props.name} />
      <h3>{props.name}</h3>
      <p>{props.des}</p>
      {/* <a href="#" className="btn">
        Read More
      </a> */}
    </div>
    </>
    
  );
}

export default ServicesList;
