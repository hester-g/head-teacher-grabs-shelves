import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export function Nav ({ children }) {
  return <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
    <Container>
    <Navbar.Brand href="#"><h1>head teacher grabs shelves (3,6)</h1></Navbar.Brand>
    <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>
        {children}
      </Navbar.Text>
    </Navbar.Collapse>
    </Container>
  </Navbar>
}
