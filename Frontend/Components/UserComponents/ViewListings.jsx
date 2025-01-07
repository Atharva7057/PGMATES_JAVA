import UserNavbar from './UserNavbar'
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import cardImage from "../../Images/room.jpg";
import "../../CSS/ViewListings.css";
import { useNavigate } from 'react-router-dom';
import UserServices from '../../Services/UserServices/uservice.js'

function ViewListings() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter cards based on search query
  const filteredCards = cards.filter((card) =>
    Object.values(card).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Handle click on "View Details" button
  function onclickViewDetails(property_id) {
    navigate('/user/view-details?id='+ property_id);
  }

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await UserServices.getAllProperties();
        console.log(response.data);
        
        setCards(response.data); // Assuming the response data is an array of property objects
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    }
    fetchProperties();
  }, []);

  return (
    <div>
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Card List */}
      <div className="mt-3">
        <div className="row">
          <div className="col-12">
            <div className="card-list">
              {filteredCards.length > 0 ? (
                filteredCards.map((card) => (
                  <Card className="card-container" key={card.id}>
                    <Card.Img variant="top" src={cardImage} className="card-img" />
                    <Card.Body className="card-body">
                      <Card.Title>{card.type}</Card.Title>
                      <Card.Text>
                        <h4>{card.details}</h4>
                        <h3>Facility: {card.amenities}</h3>
                        <h5>Rent: {card.rent}</h5>
                        <h5>Deposit: {card.deposit}</h5>
                        <h5>location: {card.location}</h5>
                        <h5>Gender: {card.forGender}</h5>
                        {/* <div>
                          <strong>Owner Details:</strong>
                          <p>{card.owner.fullName}</p>
                          <p>{card.owner.contact}</p>
                          <p>{card.owner.email}</p>
                        </div> */}
                        <button
                          className="view-details"
                          onClick={() => onclickViewDetails(card.propertyId)}
                        >
                          View Details
                        </button>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <p>No results found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewListings;
