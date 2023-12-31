import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleDropdownClick = () => {
    // Toggle the dropdown visibility
    setDropdownVisible(!dropdownVisible);
  };

  const handleWindowClick = (e) => {
    if (!e.target.matches('.dropButton')) {
      setDropdownVisible(false);
    }
  };

  // Attach the event listener when the component mounts
  React.useEffect(() => {
    window.addEventListener('click', handleWindowClick);
    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  return (
    <nav className="nav">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li>
          <div className="dropdown">
            <button className="dropButton" onClick={handleDropdownClick}>Categories</button>
            {dropdownVisible && (
              <div className="dropdownContent" id="myDropdown">
                <Link to="/cake" onClick={handleDropdownClick}>Cake & Dessert</Link>
                <Link to="/decor" onClick={handleDropdownClick}>Decoration</Link>
              </div>
            )}
          </div>
        </li>
        <li><Link to="/about">Our Story</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/admin">Admin</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
