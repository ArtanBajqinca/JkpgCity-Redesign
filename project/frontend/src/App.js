import React from "react";
import "./App.css";
import "./Font.css";
import { IoIosArrowRoundUp } from "react-icons/io";
import Data from "./companies.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

function App() {
  return (
    <>
      <FirstSection />

      <SecondSection />

      <ThirdSection />
    </>
  );
}

function FirstSection() {
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

function CustomNavbar() {
  const [isOpen, setIsOpen] = React.useState(false);

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
          <a href="uptäck" className="Links">
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

function ThirdSection() {
  return (
    <div className="thirdSectionBody">
      <div className="districtDiv">
        <District name="TÄNDSTICKSOMRÅDET" />
        <District name="STATIONEN" />
        <District name="RÅDHUSPARKEN" />
        <District name="HÖGSKOLAN" />
        <District name="VÄSTER" />
        <District name="ATOLLEN" />
        <District name="ÖSTER" />
        <District name="KULTURHUSET SPIRA" />
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

function District(props) {
  return (
    <div className="districtCard">
      <h1>{props.name}</h1>
      <input type="checkbox" className="checkBox" />
    </div>
  );
}

function Category(props) {
  return (
    <div className="categoryCard">
      <h1>{props.name}</h1>
      <input type="checkbox" className="checkBox" />
    </div>
  );
}

function CategoryTitle(props) {
  return (
    <div className="categoryTitleDiv">
      <h1>{props.name}</h1>
    </div>
  );
}

function AccordionList() {
  const groupedData = {
    trainingHealth: [],
    salonBeauty: [],
    massageSpa: [],
  };

  // Filter data into respective categories
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
      {/* Render GYM & TRÄNING category */}
      <div className="accordion-category">
        <CategoryTitle name="GYM & TRÄNING" />
        <AccordionGroup items={groupedData.trainingHealth} />
      </div>
      {/* Render SKÖNHET & FRISÖR category */}
      <div className="accordion-category">
        <CategoryTitle name="SKÖNHET & FRISÖR" />
        <AccordionGroup items={groupedData.salonBeauty} />
      </div>
      {/* Render SPA & MASSAGE category */}
      <div className="accordion-category">
        <CategoryTitle name="SPA & MASSAGE" />
        <AccordionGroup items={groupedData.massageSpa} />
      </div>
    </div>
  );
}

function Accordion({ name, district, url }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  // Function to select the appropriate icon based on the district
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
          {selectIcon(district)} {/* Render the selected icon */}
          <h1>Distrikt: {district}</h1>
        </span>
        <br></br>
        <span>
          <img src="./img/webIcon.svg" alt="webIcon" />
          <h1>
            Hemsida: <a href={url}>{url}</a>{" "}
          </h1>
        </span>
      </div>
    </div>
  );
}

function AccordionGroup({ items }) {
  return (
    <div className="accordion-list">
      {items.map((item, index) => (
        <div key={index} className="accordion-item">
          <Accordion
            key={index}
            name={item.name}
            district={item.district}
            url={item.url}
          />
        </div>
      ))}
    </div>
  );
}

export default App;
