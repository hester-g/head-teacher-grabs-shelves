import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Auth } from './Auth'
import Nav from 'react-bootstrap/Nav'

export function CustomNav ({ children }) {
  return <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
    <Container>
    <Navbar.Brand href="#"><h1>head teacher grabs shelves (3,6)</h1></Navbar.Brand>
    <Nav>
      {children}
    </Nav>
    <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>
        <Auth />
      </Navbar.Text>
    </Navbar.Collapse>
    </Container>
  </Navbar>
}
