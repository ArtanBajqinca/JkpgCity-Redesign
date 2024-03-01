import React, { useState, useEffect } from "react";
import "./App.css";
import "./Font.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Data from "./companies.json";
import { IoIosArrowRoundUp } from "react-icons/io";

// fetches districts from the backend
async function fetchDistricts() {
  const response = await fetch("http://localhost:3001/districts");
  const districts = await response.json();
  return districts;
}

// Main App Component
function App() {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const districts = await fetchDistricts();
      setDistricts(districts);
    };

    fetchData();
  }, []);

  return (
    <>
      <FirstSection />
      <SecondSection />
      <ThirdSection districts={districts} />
    </>
  );
}

// First Section including Navbar
function FirstSection({ districts }) {
  return (
    <div className="firstSectionBody">
      <CustomNavbar />
      <div className="firstSectionContentDiv">
        <h1>REKREATION</h1>
        <h2>
          I Jönköpings stadskärna hittar du allt för att må bra, med ett stort
          utbud av olika gym, frisörer och salonger - allt för att skämma bort
          dig själv.
        </h2>
      </div>
    </div>
  );
}

// Custom Navbar Component
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
              <a href="dropdown-link3" className="dropdownLink">
                Om
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Second Section Component
function SecondSection() {
  return (
    <div className="secondSectionBody">
      <img
        src="./img/jkpgDistricts.svg"
        alt="jkpgcity districts"
        className="jkpgDistrictsLogo"
      />
    </div>
  );
}

// Third Section including Districts and Categories
function ThirdSection({ districts }) {
  return (
    <div className="thirdSectionBody">
      <div className="districtDiv">
        {districts.map((district, index) => (
          <District
            key={index}
            name={district.toUpperCase()}
            className="districtName"
          />
        ))}
      </div>

      <div className="categoryDiv">
        <Category name="GYM & TRÄNING" />
        <Category name="SKÖNHET & FRISÖR" />
        <Category name="SPA & MASSAGE" />
      </div>
      <AccordionList />
    </div>
  );
}

// District Component
function District(props) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div
      className="districtCard customCheckbox"
      onClick={() => setIsChecked(!isChecked)}
      style={{ cursor: "pointer", position: "relative" }}
    >
      <h1>{props.name}</h1>
      <input
        type="checkbox"
        className="checkBox"
        checked={isChecked}
        onChange={(e) => e.stopPropagation()}
        style={{ cursor: "pointer" }}
      />
      <span className="customCheckmark"></span>
    </div>
  );
}

// Category Component
function Category(props) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div
      className="districtCard customCheckbox districtCard-Category"
      onClick={() => setIsChecked(!isChecked)}
      style={{ cursor: "pointer", position: "relative" }}
    >
      <h1>{props.name}</h1>
      <input
        type="checkbox"
        className="checkBox"
        checked={isChecked}
        onChange={(e) => e.stopPropagation()}
        style={{ cursor: "pointer" }}
      />
      <span className="customCheckmark"></span>
    </div>
  );
}

// Accordion List Component
function AccordionList() {
  const groupedData = {
    trainingHealth: [],
    salonBeauty: [],
    massageSpa: [],
  };

  Data.forEach((item) => {
    switch (item.type) {
      case "trainingHealth":
        groupedData.trainingHealth.push(item);
        break;
      case "salonBeauty":
        groupedData.salonBeauty.push(item);
        break;
      case "massageSpa":
        groupedData.massageSpa.push(item);
        break;
      default:
        break;
    }
  });

  return (
    <div className="accordion-list">
      <CategoryTitle name="GYM & TRÄNING" />
      <AccordionGroup items={groupedData.trainingHealth} />
      <CategoryTitle name="SKÖNHET & FRISÖR" />
      <AccordionGroup items={groupedData.salonBeauty} />
      <CategoryTitle name="SPA & MASSAGE" />
      <AccordionGroup items={groupedData.massageSpa} />
    </div>
  );
}

// Category Title Component
function CategoryTitle(props) {
  return (
    <div className="categoryTitleDiv">
      <h1>{props.name}</h1>
    </div>
  );
}

// Accordion Group Component
function AccordionGroup({ items }) {
  return (
    <div className="accordion-group">
      {items.map((item, index) => (
        <Accordion
          key={index}
          name={item.name}
          district={item.district}
          url={item.url}
        />
      ))}
    </div>
  );
}

// Accordion Component
function Accordion({ name, district, url }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const selectIcon = (district) => {
    switch (district) {
      case "rådhusparken":
        return <img src="./img/rådhusparkenIcon.svg" alt="rådhusparken" />;
      case "atollen":
        return <img src="./img/atollenIcon.svg" alt="atollen" />;
      case "öster":
        return <img src="./img/österIcon.svg" alt="Home" />;
      case "kulturhuset spira":
        return <img src="./img/kulturHusetSpiraIcon.svg" alt="Home" />;
      case "högskolan":
        return <img src="./img/högskolanIcon.svg" alt="Home" />;
      case "väster":
        return <img src="./img/västerIcon.svg" alt="Home" />;
      case "stationen":
        return <img src="./img/stationenIcon.svg" alt="Home" />;
      case "tändsticksområdet":
        return <img src="./img/tändSticksOmrådetIcon.svg" alt="Home" />;
      // Add more cases for other districts as needed
      default:
        return <img src="./img/default.png" alt="Default" />; // Default icon
    }
  };

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={toggleAccordion}>
        <h3>{name}</h3>
        {isOpen ? (
          <IoIosArrowRoundUp className="accordionArrow open" />
        ) : (
          <IoIosArrowRoundUp className="accordionArrow" />
        )}
      </div>
      <div className={`accordion-content ${isOpen ? "open" : ""}`}>
        <span>
          {selectIcon(district)}
          <h1>Distrikt: {district}</h1>
        </span>
        <br />
        <span>
          <img src="./img/webIcon.svg" alt="webIcon" />
          <h1>
            Hemsida: <a href={url}>{url}</a>
          </h1>
        </span>
      </div>
    </div>
  );
}

export default App;
