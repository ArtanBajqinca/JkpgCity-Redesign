import React, { useRef, useEffect } from 'react';
import './App.css';
import './Font.css';  
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { GrMenu } from "react-icons/gr";

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
        <Navbar.Brand href="#home" style={{ paddingLeft: 300, paddingRight: 275}}>
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
        height = "28"
        alt = "jkpgcity districts"
      />
    </div>
  )
}

function ThirdSection() {
  return (
    <div className='thirdSectionBody'>
      
    </div>
  )
}

export default App;
