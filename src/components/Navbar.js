import React ,{useState} from 'react'

import {Link, useLocation, useNavigate} from 'react-router-dom';
import './Navbar.css'
import inote from './inotebook.jpeg'
function Navbar() {
  let location =useLocation();
  let navigate=useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const navStyle=
  {
    backgroundColor:"rgba(18,18,62)",
      color:"white",
      fontSize:"20px",
      gap:"15px"
    
  }



  const handleLogout=()=>
  {
    localStorage.removeItem('token');
    navigate('/login');

  }

  const toggleMode = () => {
    setDarkMode(!darkMode); // Toggle the mode

    if (darkMode) {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    } else {
      document.body.style.backgroundColor = "rgb(0, 0, 33)";
      document.body.style.color = "white";
    }
  };



  return (
      <nav className="navbar navbar-expand-lg " style={navStyle}>
  <div className="container-fluid">
    <Link  className="navbar-brand" to="/"><img src={inote} alt="inotebook logo"  height='40px' width='50px'/></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
        <li className="nav-item">
          <Link  className={`nav-link ${location.pathname==="/"?"active":""}`}  aria-current="page" to="/" style={{color:"white"}}>Home</Link>
        </li>
        <li className="nav-item">
          <Link  className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about" style={{color:"white"}}>About</Link>
        </li>
        <li className="nav-item">
          <Link  className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/contact" style={{color:"white"}}>Contact</Link>
        </li>
      </ul>
      <div className=" d-flex ms-auto">
        <button className="btn btn-primary  d-none d-lg-block mode-btn" onClick={toggleMode}>Mode</button>
        </div>
      {!localStorage.getItem('token')?<form className="d-flex" role="search">
        <Link className="btn btn-primary mx-1 mode-btn " to="/login" role='button'>login</Link>
        <Link className="btn btn-primary mx-1 mode-btn" to="/signup" role='button'>SignUp</Link>
      </form>:<button onClick={handleLogout} className='btn btn-primary mx-2 mode-btn'>Log out</button>}
    </div>
  </div>
</nav>
  )
}

export default Navbar
