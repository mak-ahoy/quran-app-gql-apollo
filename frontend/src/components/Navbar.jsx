import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaUser } from 'react-icons/fa';
import axios from 'axios';
import { useEffect, useState } from 'react';
import "../App.css"
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';


function NavBar() {
  const [profilePic, setProfilePic] = useState()
  const location = useLocation();
  const {user, logout} = useAuth();



const setProfile= async()=>{
  try {
    let para =  user.profile_img_uri
    const response = await axios.get(`http://localhost:9000/api/images/${para}`, { responseType: 'blob' });
    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    const imageUrl = URL.createObjectURL(blob);
    setProfilePic(imageUrl);
  } catch (error) {
    console.error('Error fetching image:', error);
  }
}

useEffect(()=>{
  setProfile();
}, [])
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" data-bs-theme="light">
      <Container>
        <Navbar.Brand as={Link} to="/home">Quran App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {location.pathname==="/users"? null :  <Nav.Link as={Link} to="/users">Users</Nav.Link>}
            {/* <Nav.Link >Features</Nav.Link> */}
          </Nav>
          {/* <Nav>
            <Nav.Link  onClick={()=>{localStorage.clear()}}>Logout</Nav.Link>
          </Nav> */}
      <ul className='navbar-nav'>
      <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle d-flex align-items-center text-decoration-none" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" href ="/">
        {profilePic ? (
          <img src={profilePic} alt='something' className="profile-image rounded-circle" width="40" height="40" />
        ) : (
          <div className="profile-pic">
            <FaUser />
          </div>
        )}
        <span className="ms-2 d-none d-lg-inline-block">{user.username}</span> {/* Display username */}
      </a>
      <ul className="dropdown-menu dropdown-menu-end " aria-labelledby="navbarDropdown">
        {/* <li><a className="dropdown-item" href="#"><i className="fas fa-sliders-h fa-fw"></i>Settings</a></li> */}
        {/* <li><a className="dropdown-item" href="#"><i className="fas fa-user-cog fa-fw"></i> Account Settings</a></li> */}
        {/* <li><hr className="dropdown-divider" /></li> */}
        <li><Link className="dropdown-item" to="/" onClick={() => { localStorage.clear(); logout()  }}><i className="fas fa-sign-out-alt fa-fw"></i> Log Out</Link></li>
      </ul>
    </li>
    </ul>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;