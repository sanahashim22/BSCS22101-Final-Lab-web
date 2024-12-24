import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div className="admin-page">
      <h1 className='adminhead'>Admin Panel</h1>
      <p className='para'>Welcome, Admin! Please choose an option below:</p>
      
      <div className="admin-options">
        <Link to="/admin/listings" className="admin-option">
          <button className="admin-btn">View records</button>
        </Link>
        <Link to="/admin/listings/add" className="admin-option">
          <button className="admin-btn">Add record</button>
        </Link>
        <Link to="/admin/listings/delete" className="admin-option">
          <button className="admin-btn">Delete record</button>
        </Link>
        <Link to="/" className="admin-option">
          <button className="admin-btn">Go Back</button>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
