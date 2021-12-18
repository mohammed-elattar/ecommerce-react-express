import React from 'react';
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { logout } from '../store/features/user-api-slice';
import { useDispatch } from 'react-redux';
import SearchBox from './SearchBox';

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
                  <NavDropdown.Item href='/admin/userlist'>
                    Users
                  </NavDropdown.Item>
                  <NavDropdown.Item href='/admin/productlist'>
                    Products
                  </NavDropdown.Item>
                  <NavDropdown.Item href='/admin/orderlist'>
                    Orders
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
            <SearchBox />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
