import React, { Fragment, useState } from 'react';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';


const Navbar1 = ({ auth: { isAuthenticated }, logout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const authLinks = (
    <ul className="navbar-nav ms-md-auto">
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{' '}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to="/cards">
          <i className="fas  fa-credit-card" />{' '}
          <span className="hide-sm">Cards</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />{' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );



  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );


  // const guestLinks = (
  //   <Nav className="mr-auto" navbar>
  //     <NavItem>
  //       <NavLink  href="/profiles">Developers</NavLink>
  //     </NavItem>
  //     <NavItem>
  //       <NavLink  href="/register">Register</NavLink>
  //     </NavItem>
  //     <NavItem>
  //       <NavLink  href="/login">Login</NavLink>
  //     </NavItem>
  //   </Nav>
  // );

  return (
    // <nav className="navbar bg-dark">
    //   <h1>
    //     <Link to="/">
    //       <i className="fas fa-code" /> Dev Communo
    //     </Link>
    //   </h1>
    //   <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    // </nav>
    <div>
      <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        </Collapse>
        </div>
      </Navbar>
    </div>
  );
};

Navbar1.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar1);
