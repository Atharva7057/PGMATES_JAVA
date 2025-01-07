import React from 'react'
import UserNavbar from './UserNavbar'
import '../../CSS/Services.css';
import data from './ServicesData';
import Service from './Service';
function Services() {
  return (
    <div>
      {/* <UserNavbar /> */}
      <h1 id="heading">Services</h1>
      <hr/>
      <div id='outer-servicelist'>
        <div className="services-list">
          {data.map((service, index) => (
            <Service
              key={index} // Unique key for each element
              image={service.img}
              name={service.name}
              des={service.des}
            />
          ))}
        </div>

      </div>

    </div>
  )
}

export default Services
