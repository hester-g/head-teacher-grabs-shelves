import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Auth } from './Auth'
import Nav from 'react-bootstrap/Nav'
import { useLocation } from 'react-router-dom';
import { useLogin } from './login-context'

const locationMap = {
  tracks: 'head teacher grabs shelves for courses [6]',
  artists: 'messy rats surround first creators [7]',
  default: 'default title tbc'
}

export function CustomNav ({ children }) {
  const location = useLocation();
  const locationName = location.pathname === '/' ? 'default' : location.pathname.replace(/\//g, '')

  const { loggedIn } = useLogin()

  return <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
    <Container>
    <Navbar.Brand href="#"><h1>{locationMap[locationName]}</h1></Navbar.Brand>
    <Nav>
      {loggedIn && children}
    </Nav>
    <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>
        <Auth />
      </Navbar.Text>
    </Navbar.Collapse>
    </Container>
  </Navbar>
}
