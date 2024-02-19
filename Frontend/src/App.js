import React, { useRef, useEffect } from 'react';
import './App.css';
import './Font.css';  
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { GrMenu } from "react-icons/gr";
import { IoIosArrowRoundUp } from "react-icons/io";

function App() {
  return (
    <>

      <FirstSection/>

      <SecondSection/>

      <ThirdSection/>

    </>
  );
}

function FirstSection() {

  return (

    <div className='firstSectionBody'>

    <CustomNavbar/>

    <div className='firstSectionContentDiv'>

      <h1>
        REKREATION
      </h1>

      <h2>
        I Jönköpings stadskärna hittar du allt för att må bra, med ett stort utbud av olika gym, frisörer och salonger - allt för att skämma bort dig själv.
      </h2>

    </div>

    </div>

  )

}

function CustomNavbar() {
  return (
    <Navbar expand="lg" style={{ backgroundColor: "transparent", margin:0}}>
      <Container style={{ padding:0,margin:0}}>
        <Navbar.Brand href="#home"className='jkpgcitylogo'>
          <img
            src= "./img/jkpgcity.svg"
            height="40"
            alt="jkpgcity logo"
          />
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className='text' style={{ color: "black", fontSize: 16, fontWeight: 'bold', backgroundColor: 'white', fontFamily: "Acumin Pro"}}>UPPTÄCK</Nav.Link>
            <Nav.Link href="#link" className='text' style={{ color: "white", fontSize: 16, fontWeight: 'bold', fontFamily: "Acumin Pro" }}>EVENEMANG</Nav.Link>
            <Nav.Link href="#link" className='text' style={{ color: "white", fontSize: 16, fontWeight: 'bold', fontFamily: "Acumin Pro" }}>STADSDELAR</Nav.Link>
            <Nav.Link href="#link" className='text' style={{ color: "white", fontSize: 16, fontWeight: 'bold', fontFamily: "Acumin Pro" }}>INFORMATION</Nav.Link>
            <NavDropdown title={<GrMenu  style={{ fontSize: "24px", color: "white" }} />} id="basic-nav-dropdown" >
              <NavDropdown.Item href="#action/3.1">Dropdown Link 1</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Dropdown Link 2</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Dropdown Link 3</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function SecondSection() {
  return (
    <div className='secondSectionBody'>
      <img
        src = "./img/jkpgDistricts.svg"
        alt = "jkpgcity districts"
        className='jkpgDistrictsLogo'
      />
    </div>
  )
}

function ThirdSection() {
  return (
    <div className='thirdSectionBody'>

      <div className='districtDiv'>
        <District name="TÄNDSTICKSOMRÅDET"/>
        <District name="STATIONEN"/>
        <District name="RÅDHUSPARKEN"/>
        <District name="HÖGSKOLAN"/>
        <District name="VÄSTER"/>
        <District name="ATOLLEN"/>
        <District name="ÖSTER"/>
      </div>

      <div className='categoryDiv'>
        <Category name="GYM & TRÄNING"/>
        <Category name="SKÖNHET & FRISÖR"/>
        <Category name="SPA & MASSAGE"/>
      </div>

      <CategoryTitle name="GYM & TRÄNING"/>

      <AccordionList/>

      <CategoryTitle name="SKÖNHET & FRISÖR"/>


    </div>
  )
}

function District(props) {
  return (
        <div className='districtCard'>
          <h1>
            {props.name}
          </h1>
          <input type="checkbox" className='checkBox'/>
        </div>
  )
}

function Category(props) {
  return (
        <div className='categoryCard'>
          <h1>
            {props.name}
          </h1>
          <input type="checkbox" className='checkBox'/>
        </div>
  )
}

function CategoryTitle(props) {
  return (
    <div className='categoryTitleDiv'>
      <h1>
        {props.name}
      </h1>
    </div>
  )
}

function AccordionList() {
  const data = [
    { name: 'Store 1', district: 'Rådhusparken', url: "https://www.google.com"},
    { name: 'Store 2', district: 'Atollen', url: "https://www.google.com" },
    { name: 'Store 3', district: 'Öster', url: "https://www.google.com"},
    { name: 'Store 4', district: 'Kulturhuset spira', url: "https://www.google.com" },
    { name: 'Store 5', district: 'Högskolan', url: "https://www.google.com" },
    { name: 'Store 6', district: 'Väster', url: "https://www.google.com" },
    { name: 'Store 7', district: 'Stationen', url: "https://www.google.com" },
    { name: 'Store 8', district: 'Tändsticksområdet', url: "https://www.google.com" },

  ];

  const groupedData = chunkArray(data, 2);

  // Function to chunk the data array into pairs
  function chunkArray(array, size) {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  }

  return (
    <div className="accordion-list">
      {groupedData.map((row, rowIndex) => (
        <div key={rowIndex} className="accordion-row">
          {row.map((item, index) => (
            <div key={index} className="accordion-item">
              <Accordion name={item.name} district={item.district} url={item.url} />
            </div>
          ))}
        </div>
      ))}
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
        case 'Rådhusparken':
        return <img src="./img/rådhusparkenIcon.svg" alt="rådhusparken" />;
        case 'Atollen':
        return <img src="./img/atollenIcon.svg" alt="atollen" />;
        case 'Öster':
        return <img src="./img/österIcon.svg" alt="Home" />;
        case 'Kulturhuset spira':
        return <img src="./img/kulturHusetSpiraIcon.svg" alt="Home" />;
        case 'Högskolan':
        return <img src="./img/högskolanIcon.svg" alt="Home" />;
        case 'Väster':
        return <img src="./img/västerIcon.svg" alt="Home" />;
        case 'Stationen':
        return <img src="./img/stationenIcon.svg" alt="Home" />;
        case 'Tändsticksområdet':
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
      <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
        <span>
          {selectIcon(district)} {/* Render the selected icon */}
          <h1>Distrikt: {district}</h1>
        </span>
        <br></br>
        <span>
          <img
            src= "./img/webIcon.svg"
            alt="webIcon"
          />
          <h1>Hemsida: {url}</h1>
        </span>
      </div>
    </div>
  );
}




export default App;
