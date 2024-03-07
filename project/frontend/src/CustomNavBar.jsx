// CustomNavbar component for the navigation bar,

// managing its open/close state for responsive design.

import React, {useState} from "react";

function CustomNavbar() {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className="navbarContainer">
        <div className="navbarSection">
          <div className="navbarLogo">
            <img src="./img/jkpgcity.svg" alt="jkpgCity" />
          </div>
          <div className="navbarLinks">
            <a href="uptäck" className="Links activeLink">
              UPPTÄCK
            </a>
            <a href="evenemang" className="Links">
              EVENEMANG
            </a>
            <a href="stadsdelar" className="Links">
              STADSDELAR
            </a>
            <a href="information" className="Links">
              INFORMATION
            </a>
            <div className="Hamburger-menu" onClick={toggleDropdown}>
              {isOpen ? (
                <img src="/img/hamburger-menu-closed.svg" alt="" />
              ) : (
                <img src="/img/hamburger-menu-open.svg" alt="" />
              )}
            </div>
            {isOpen && (
              <div className="dropdownMenu">
                <a href="dropdown-link1" className="dropdownLink">
                  Artiklar
                </a>
                <a href="dropdown-link2" className="dropdownLink">
                  Kontakt
                </a>
                <a href="dropdown-link3" className="dropdownLink">
                  Aktör
                </a>
                <a href="dropdown-link4" className="dropdownLink">
                  Om
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  export default CustomNavbar;