import { useState } from 'react';
import axios from 'axios';

const AdminAddListing = () => {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    price: '',
    image: '',
    guests: '',
    bedrooms: '',
    bathrooms: '',
    description: ''
  });

  const [adminProperties, setAdminProperties] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:5000/api/admin/listings', formData)
    .then((response) => {
        console.log('Updated Admin Listings:', response.data);
        setAdminProperties(response.data);
        alert('Listing added successfully!');
    })
    .catch(error => {
        console.error('Error adding listing:', error);
        alert('Error adding listing');
    });
  };
  

  return (
    <div className="admin-add-listing-container">
      <h2 className="admin-add-listing-title">Add New Listing</h2>
      <form onSubmit={handleSubmit} className="admin-add-listing-form">
        <input
          type="text"
          name="name"
          className="admin-input"
          placeholder="Name"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="date"
          className="admin-input"
          placeholder="Date"
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          className="admin-textarea"
          placeholder="Description"
          onChange={handleInputChange}
        ></textarea>
        <button type="submit" className="admin-submit-btn">Add Listing</button>
      </form>

      <div className="admin-properties-list">
      <h3 style={{ fontWeight: 'bold' }}>Admin Listings Titles After Adding New Listing:</h3>
        <br />
        <ul>
          {adminProperties.map(property => (
            <li key={property._id}>
            <h4>{property.name}</h4>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminAddListing;
