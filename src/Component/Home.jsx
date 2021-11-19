import { Container, Nav, Dropdown, Navbar, NavItem, Carousel } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import React from 'react'
import '../App.css'

const Home = () => {
  return (
    <>
      <div style={{ backgroundColor: '#FFC300' }}>
        <Nav>
          <Container style={{ textAlign: 'center' }}>
            <Navbar.Brand ><h2 style={{ marginTop: '30px' }}>Cherry Products Management</h2></Navbar.Brand>
          </Container>
          <Dropdown as={NavItem} style={{ marginTop: '35px', marginRight: '10px' }}>
            <Dropdown.Toggle variant="dark" size='sm' id="dropdown-basic">
              Menue
            </Dropdown.Toggle>
            <Dropdown.Menu >
              <Dropdown.Item>
                <LinkContainer to='/login' style={{ color: 'black' }}>
                  <Nav.Link>LOGIN</Nav.Link>
                </LinkContainer>
              </Dropdown.Item>
              <Dropdown.Item>
                <LinkContainer to='/signup' style={{ color: 'black' }}>
                  <Nav.Link eventKey="link-1">SIGNUP</Nav.Link>
                </LinkContainer>
              </Dropdown.Item>
              <Dropdown.Item>
                <LinkContainer to='/productlist' style={{ color: 'black' }}>
                  <Nav.Link eventKey="link-1">Management</Nav.Link>
                </LinkContainer>
              </Dropdown.Item>
              <Dropdown.Item>
                <LinkContainer to='/orderlist' style={{ color: 'black' }}>
                  <Nav.Link eventKey="link-1">Orders</Nav.Link>
                </LinkContainer>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </div>
      <Container style={{ marginTop: '100px' }}>
        <Carousel fade className='carousel' >
          <Carousel.Item >
            <img
              className="d-block w-100"
              src="https://www.globaltimes.cn/Portals/0/attachment/2020/2020-11-29/5046d941-7a9f-4404-8903-b149547a2508.jpeg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/high-angle-view-of-cherries-on-pink-table-royalty-free-image-1584714228.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://assets.bonappetit.com/photos/60ef61f34d6cfb72ea6baeec/master/pass/Sweet-Sour-Cherries.jpg"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </Container>
    </>
  )
}

export default Home


