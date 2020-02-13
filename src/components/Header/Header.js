import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Emoji from 'react-emoji-render'

const title = {
  color: '#343a40',
  fontSize: '25px',
  fontFamily: 'Delius'
}

const font = {
  fontFamily: 'Delius',
  fontSize: '16px',
  color: '#343a40'
}

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#get-photos" style={font}>Puppies</Nav.Link>
    <Nav.Link href="#liked-photos" style={font}>Favorites</Nav.Link>
    <Nav.Link href="#change-password" style={font}>Change Password</Nav.Link>
    <Nav.Link href="#sign-out" style={font}>Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up" style={font} >Sign Up</Nav.Link>
    <Nav.Link href="#sign-in" style={font} >Sign In</Nav.Link>
  </Fragment>
)
//
// const alwaysOptions = (
//   <Fragment>
//     <Nav.Link to="/">Home</Nav.Link>
//   </Fragment>
// )

const Header = ({ user }) => (
  <Navbar bg="light" variant="dark" expand="md">
    <Navbar.Brand href="#" style={title}>
      PUPS <Emoji size={50} text=':paw_prints:'/>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav style={font} className="ml-auto">
        { user && <span className="navbar-text mr-2">Wuff, {user.email}</span>}
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
