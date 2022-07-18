import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';

const Header = ({setSearch}) => {
  const nav=useNavigate();
  const dispatch=useDispatch();
  const userLogin=useSelector(state=>state.userLogin)
  const {userDet}=userLogin;
  const logoutHandler=()=>{
    dispatch(logout());
    nav('/');
  }
  return (
    <Navbar bg="primary" expand="lg" variant='dark'>
    <Container>
      <Navbar.Brand><Link to='/'>React-Bootstrap</Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className='m-auto'>
        <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e)=>setSearch(e.target.value)}
            />
            </Form>
        </Nav>
        <Nav>
        {userDet?
        <>
          <Nav.Link>
            <Link to="/mynotes">
            My Notes</Link></Nav.Link>
          <NavDropdown title={userDet.name} id="basic-nav-dropdown">
            <NavDropdown.Item><Link to='/profile'>My Profile</Link></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>logoutHandler()}>
              Logout
            </NavDropdown.Item>
          </NavDropdown></>
          : (
              <Nav.Link><Link to='/login'>Login</Link></Nav.Link>
            )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header
