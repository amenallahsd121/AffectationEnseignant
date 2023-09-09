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

// reactstrap components
import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { getLoggedInUserInfo } from "service/api.js";


const UserHeader = () => {

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

  if (!userInfo) {
    return <div>Loading user data...</div>;
  }

  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage:
            "",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">
                Bienvenue <span>{userInfo.last_name},{userInfo.first_name}</span>
              </h1>
              <p className="text-white mt-0 mb-5">
                
              </p>
            
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
