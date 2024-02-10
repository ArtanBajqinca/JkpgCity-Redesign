import React from 'react';
import './App.css'; 
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

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
      </Container>


      <Container fluid style={{
        padding: 0,
        margin: 0,
        backgroundColor: "black",
        height: "6vh" 
      }}>
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
      <Navbar.Brand href="#home" className='text'>jkpgcity.</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className='text' >Home</Nav.Link>
            <Nav.Link href="#link" className='text'>Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown" >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default App;
