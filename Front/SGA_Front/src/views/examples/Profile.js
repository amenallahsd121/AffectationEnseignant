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
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";
import { getLoggedInUserInfo } from "service/api.js";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  const userInfoFromLocation = location.state.userInfo;
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const user = await getLoggedInUserInfo();
        if (user.message === "Utilisateur non connecté.") {
          // L'utilisateur n'est pas connecté, vous pouvez gérer cela en conséquence
        } else {
          // L'utilisateur est connecté, vous pouvez accéder aux informations de l'utilisateur
          console.log(user.data); // Contient les données de l'utilisateur
          setUserInfo(user.data);
        }
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
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("../../assets/img/theme/team-4-800x800.jpg")}
                      />
                    
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                 
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                     {userInfo.username}
                  </h3>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {userInfo.grade}
                  </div>
                  
                  <hr className="my-4" />
                  <p>
                    ESPRIT: Ecole Sup Privée d'Ingénierie et de Technologie
                  </p>
                  
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Mon Compte</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Informations de l'utilisateur
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                    <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-username">
                            Pseudo
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={userInfo.username}
                            id="input-username"
                            placeholder="Username"
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email 
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={userInfo.email}
                            id="input-email"
                            placeholder="Email"
                            type="email"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Nom
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={userInfo.nom_utilisateur}
                            id="input-first-name"
                            placeholder="Nom"
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Prénom
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={userInfo.prenom_utilisateur}
                            id="input-last-name"
                            placeholder="Prénom"
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Fonction
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                    <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-grade"
                          >
                           Grade
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={userInfo.grade}
                            id="input-grade"
                            placeholder="Grade"
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    
                  </div>
                 
          
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
