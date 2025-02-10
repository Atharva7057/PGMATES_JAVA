import React from "react";
import "../OwnerComponents/OwnerCSS/service.css";
import logo1 from "./images/img1.svg";
import logo2 from "./images/img2.svg";
import logo3 from "./images/img3.svg";

function Service() {
    const services = [
        {
            img: logo1,
            name: "Time Efficient",
            des: "User can send requests to owner to let them join their PG home to get daily updates from owner and keep their payment records.",
        },
        {
            img: logo2,
            name: "User-Friendly UI",
            des: "Our user-friendly interface lets users easily find the nearest and best-rated PGs. Our search filter uses user search history and the most viewed PGs according to popularity rating to provide the best results.",
        },
        {
            img: logo3,
            name: "Map Service",
            des: "Users can find the nearest and best-rated PGs based on their location. Our system utilizes search history and popularity ratings to enhance recommendations.",
        }
    ];

    console.log("services", services);

    return (
        <>
            {services.length > 0 ? (
                <div className="service-container">
                    {services.map((element, index) => (
                        <div className="service" key={index}>
                            <img src={element.img} alt={element.name} />
                            <h3>{element.name}</h3>
                            <p>{element.des}</p>
                            {/* <a href="#" className="btn">
                                Read More
                            </a> */}
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
