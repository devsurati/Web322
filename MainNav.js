import { useRouter } from 'next/router';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';

const MainNav = () => {
  const router = useRouter();

  return (
    <Navbar expand="lg" bg="light" variant="light">
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav>
          <Nav.Link as={Link} href="/" active={router.pathname === '/'}>Home</Nav.Link>
          <Nav.Link as={Link} href="/search" active={router.pathname === '/search'}>Search</Nav.Link>
          <NavDropdown title="User" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} href="/favourites" active={router.pathname === '/favourites'}>Favourites</NavDropdown.Item>
            <NavDropdown.Item as={Link} href="/history" active={router.pathname === '/history'}>History</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNav;
