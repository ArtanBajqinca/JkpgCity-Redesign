import React from 'react';
import './App.css';
import './Font.css';  
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { GrMenu } from "react-icons/gr";
import { IoIosArrowRoundUp } from "react-icons/io";
import Data from "./companies.json"; // Import JSON data

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
        <District name="KULTURHUSET SPIRA"/>
      </div>

      <div className='categoryDiv'>
        <Category name="GYM & TRÄNING"/>
        <Category name="SKÖNHET & FRISÖR"/>
        <Category name="SPA & MASSAGE"/>
      </div>

      <AccordionList/>

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
  const groupedData = {
    trainingHealth: [],
    salonBeauty: [],
    massageSpa: [],
  };

  // Filter data into respective categories
  Data.forEach(item => {
    switch (item.type) {
      case 'trainingHealth':
        groupedData.trainingHealth.push(item);
        break;
      case 'salonBeauty':
        groupedData.salonBeauty.push(item);
        break;
      case 'massageSpa':
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
        <CategoryTitle name="GYM & TRÄNING"/>
        <AccordionGroup items={groupedData.trainingHealth}/>
      </div>
      {/* Render SKÖNHET & FRISÖR category */}
      <div className="accordion-category">
        <CategoryTitle name="SKÖNHET & FRISÖR"/>
        <AccordionGroup items={groupedData.salonBeauty}/>
      </div>
      {/* Render SPA & MASSAGE category */}
      <div className="accordion-category">
        <CategoryTitle name="SPA & MASSAGE"/>
        <AccordionGroup items={groupedData.massageSpa}/>
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
          case 'rådhusparken':
          return <img src="./img/rådhusparkenIcon.svg" alt="rådhusparken" />;
          case 'atollen':
          return <img src="./img/atollenIcon.svg" alt="atollen" />;
          case 'öster':
          return <img src="./img/österIcon.svg" alt="Home" />;
          case 'kulturhuset spira':
          return <img src="./img/kulturHusetSpiraIcon.svg" alt="Home" />;
          case 'högskolan':
          return <img src="./img/högskolanIcon.svg" alt="Home" />;
          case 'väster':
          return <img src="./img/västerIcon.svg" alt="Home" />;
          case 'stationen':
          return <img src="./img/stationenIcon.svg" alt="Home" />;
          case 'tändsticksområdet':
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
            <h1>Hemsida: <a href={url}>{url}</a> </h1>
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
          <Accordion key={index} name={item.name} district={item.district} url={item.url} />
          </div>

        ))}

      </div>
    );
  }

export default App;
