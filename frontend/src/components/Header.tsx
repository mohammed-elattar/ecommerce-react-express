import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { logout } from '../store/features/user-api-slice';
import { useDispatch } from 'react-redux';

const Header: React.FC = () => {
  const { user: userInfo } = useAuth();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  const navigate = useNavigate();
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand onClick={() => navigate('/')} href='/'>
            React-Bootstrap
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Nav.Link href='/cart'>
                <FontAwesomeIcon icon={faShoppingCart} /> Cart
              </Nav.Link>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <NavDropdown.Item href='/profile'>Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link href='/login'>
                  <FontAwesomeIcon icon={faUser} /> Sign In
                </Nav.Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <Nav.Link href='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </Nav.Link>
                  <Nav.Link href='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </Nav.Link>
                  <Nav.Link href='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </Nav.Link>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
