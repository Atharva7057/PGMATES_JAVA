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
    navigate('/user/view-details?id=' + property_id);
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
      <div id="search-bar">
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
                  <Card className="card-container" key={card.id} style={{ width: '21rem' }}>
                    <Card.Img variant="top" src={`../../Images/${card.image}`} className="card-img" />
                    <Card.Body className="card-body">
                      <Card.Title>{card.type}</Card.Title>
                      <Card.Text>
                        <table>
                          <tbody>
                            <tr>
                              <td>🏠 <strong>Facility:</strong></td>
                              <td>{card.amenities}</td>
                            </tr>
                            <tr>
                              <td>💰 <strong>Rent:</strong></td>
                              <td>{card.rent}</td>
                            </tr>
                            <tr>
                              <td>💵 <strong>Deposit:</strong></td>
                              <td>{card.deposit}</td>
                            </tr>
                            <tr>
                              <td>📍 <strong>Location:</strong></td>
                              <td>{card.location}</td>
                            </tr>
                            <tr>
                              <td>🚻 <strong>Gender:</strong></td>
                              <td>{card.forGender}</td>
                            </tr>
                          </tbody>
                        </table>
                      </Card.Text>

                      <button
                        className="view-details"
                        onClick={() => onclickViewDetails(card.propertyId)}
                      >
                        View Details
                      </button>
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
