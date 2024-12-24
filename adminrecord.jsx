import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminListings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/listings')
      .then(response => {
        console.log('Listings data:', response.data); 
        setListings(response.data);
      })
      .catch(error => {
        console.error('Error fetching listings:', error);
      });
  }, []);

  return (
    <div className="admin-listings">
    <h2>Admin Listings</h2>
    <div className="listings-container2">
      {listings.map(listing => (
        <div key={listing._id} className="listing-card2">
          <h3 className='listh3'>Record:</h3>
          <p className='listp'><strong>Name:</strong> {listing.name}</p>
          <p className='listp'><strong>Date:</strong> {listing.date}</p>
          <p className='listp'><strong>Description:</strong> {listing.description || 'No description available'}</p>
        </div>
      ))}
    </div>
    
  </div>
);
};

export default AdminListings;
