import React, { useRef, useEffect } from 'react';
import './App.css';
import './Font.css';  
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { GrMenu } from "react-icons/gr";
import Form from 'react-bootstrap/Form';

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
        width="95%"
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

      <CategoryTitle/>

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

function CategoryTitle() {
  return (
    <div className='categoryTitleDiv'>
      <h1>
        GYM & TRÄNING
      </h1>
    </div>
  )
}

function AccordionList() {
  const data = [
    { title: 'Store 1', content: 'Information about Store 1' },
    { title: 'Store 2', content: 'Information about Store 2' },
    { title: 'Store 3', content: 'Information about Store 3' },
    
    
    // Add more items as needed
  ];

  return (
    <div className="accordion-list">
      {data.map((item, index) => (
        <Accordion key={index} title={item.title} content={item.content} />
      ))}
    </div>
  );
}

function Accordion({ title, content }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={toggleAccordion}>
        <h3>{title}</h3>
        <span className={`arrow ${isOpen ? 'open' : ''}`}></span>
      </div>
      {isOpen && (
        <div className="accordion-content">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
}

export default App;
