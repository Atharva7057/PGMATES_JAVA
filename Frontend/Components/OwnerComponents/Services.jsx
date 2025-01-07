import React from "react";
import "../OwnerComponents/OwnerCSS/service.css";

function Service(props) {
    console.log("props", props);
    return (
        <>
            {props.data && props.data.length > 0 ? (
                <div className="service-container">
                    {props.data.map((element, index) => (
                        <div className="service" key={index}>
                            <img src={element.img} alt={element.name} />
                            <h3>{element.name}</h3>
                            <p>{element.des}</p>
                            <a href="#" className="btn">
                                Read More
                            </a>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No services available.</p>
            )}
        </>
    );
}

export default Service;


