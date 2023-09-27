/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import React, { useState, useEffect } from "react";
// reactstrap components
import {

  Collapse,

  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,

} from "reactstrap";
import { getLoggedInUserInfo } from "service/api.js";

var ps;

const Sidebar = (props) => {


  const [userInfo, setUserInfo] = useState();
  
  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const userInfo = await getLoggedInUserInfo();
        setUserInfo(userInfo);
        console.log("User info:", userInfo);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }
  
    fetchUserInfo();
  }, []);


  const [collapseOpen, setCollapseOpen] = useState();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {

    return routes.map((prop, key) => {
      return ( prop.name ? <NavItem key={key}>
        
        <NavLink
          to={prop.layout + prop.path}
          tag={NavLinkRRD}
          onClick={closeCollapse}
        >
          <i className={prop.icon} />
          {prop.name}
        </NavLink>  
      </NavItem> : <></>  
      );
    });
  };

  const { bgColor, routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }






  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={logo.imgSrc}
            />
          </NavbarBrand>
        ) : null}
       
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Navigation */}
            <Nav navbar>
              {userInfo && userInfo.is_superuser? (
                // If userInfo.is_superuser is true, render links based on your route configuration
                createLinks(routes)
              ) : (
                
                <NavItem>
                <NavLink to="/admin/user-profile" tag={NavLinkRRD} onClick={closeCollapse}>
                  <i className="ni ni-single-02 text-yellow" />
                  User Profile
                </NavLink>
              </NavItem>
          
              )}
          </Nav>

          {/* Divider */}
          <hr className="my-3" />
          {/* Heading */}
        </Collapse>
      </Container>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
