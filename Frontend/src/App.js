import React from 'react';
import './App.css'; 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { GrMenu } from "react-icons/gr";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <>
      <Container fluid style={{ 
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/gym1.png)`,
        backgroundSize: 'cover',
        padding: 0,
        margin: 0,
        height: "50vh"
      }}>
        <CustomNavbar/>
        <Container style={{ paddingLeft: 220, paddingTop: 40}}>
          <h1 style={{color: "white", fontFamily: "Acumin Pro Regular", fontWeight: 'bolder', fontSize: 60}}>
            REKREATION
          </h1>
          <h2 style={{color: "white", fontFamily: "Acumin Pro Regular", fontWeight: 'lighter', fontSize: 16, width: 400, paddingLeft: 4, paddingTop: 30,}}>
          I Jönköpings stadskärna hittar du allt för att må bra, med ett stort utbud av olika gym, frisörer och salonger - allt för att skämma bort dig själv.
          </h2>
        </Container>
      </Container>

      <Container fluid style={{
        padding: 0,
        margin: 0,
        backgroundColor: "black",
        height: "6vh" 
      }}>
      <SpinningRow/>
      </Container>

      <Container fluid style={{
        padding: 0,
        margin: 0,
        height: "100vh"  
      }}>
      </Container>
    </>
  );
}

function CustomNavbar() {
  return (
    <Navbar expand="lg" style={{ backgroundColor: "transparent" }}>
      <Container>
        <Navbar.Brand href="#home" className='text' style={{ color: "white", fontFamily: "Acumin Pro Regular", fontWeight: 'bold', fontSize: 40, paddingLeft: 210, paddingRight: 340}}>jkpgcity.</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className='text' style={{ color: "black", fontSize: 16, backgroundColor: 'white', fontFamily: "Acumin Pro Regular"}}>UPPTÄCK</Nav.Link>
            <Nav.Link href="#link" className='text' style={{ color: "white", fontSize: 16, fontFamily: "Acumin Pro Regular" }}>EVENEMANG</Nav.Link>
            <Nav.Link href="#link" className='text' style={{ color: "white", fontSize: 16, fontFamily: "Acumin Pro Regular" }}>STADSDELAR</Nav.Link>
            <Nav.Link href="#link" className='text' style={{ color: "white", fontSize: 16, fontFamily: "Acumin Pro Regular" }}>INFORMATION</Nav.Link>
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

function SpinningRow() {
  return (
    <Container fluid className="spinning-row">
      <div className="spinning-items">
        {[...Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            <div className="spinning-item">POGGGGGGGGGG</div>
            <div className="spinning-item">SUCKKKKKKKKk</div>
            <div className="spinning-item">DOGGGGGGGGGG</div>
            <div className="spinning-item">LUCCCKKKKKKK</div>
            <div className="spinning-item">MUUUUUUUCKKK</div>
            <div className="spinning-item">JUUUUCKKKKKK</div>
            <div className="spinning-item">FUDGEEEEEEEE</div>
            <div className="spinning-item">CUUUUUUUUUUH</div>
          </React.Fragment>
        ))}
      </div>
    </Container>
  );
}


export default App;
