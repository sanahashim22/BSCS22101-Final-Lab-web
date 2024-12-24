import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
import Login from './login';
import Signup from './signup';
import SuccessPage from "./successpage";
import Home from "./home";
import AdminPasswordPage from './Adminpass';
import Admin from './admin'
import AdminListings from './adminrecord';
import AdminAddListing from './adminadd';
import AdminDeleteListing from './admindel';



const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/admin-password" element={<AdminPasswordPage />} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/admin/listings" element={<AdminListings />} />
        <Route path="/admin/listings/add" element={<AdminAddListing />} />
        <Route path="/admin/listings/delete" element={<AdminDeleteListing />} />
      </Routes>
    </Router>
  );
};

export default App;
