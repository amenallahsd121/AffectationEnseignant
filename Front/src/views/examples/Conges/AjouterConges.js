import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Container,
  Row,
  Col,
  Input,
} from "reactstrap";
import Header from "components/Headers/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the default styles
import { addNiveau } from "../../../service/api";
import { useNavigate } from "react-router-dom";

const AjouterConges = () => {
  const [startDate, setStartDate] = useState(null);
  const [finDate, setFintDate] = useState(null);

  const navigate = useNavigate();
  const handleAnnulerClick = () => {
    navigate("/admin/conges ");
  };

  return (
    <>
      <Header />
      <div className="bg-secondary" style={{ minHeight: "100vh" }}>
        <Container className="mt--7" fluid>
          <Row
            style={{ marginTop: "150px" }}
            className="justify-content-center"
          >
            <Col lg="10">
              <Card className="shadow p-4">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Ajouter un congé</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Informations du congé
                    </h6>

                    <Row>
                      <Col xs="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Personne concernée
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="personne"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Type du congé
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="typeconges"
                            type="select"
                            // value={niveaurelatif}
                            // onChange={(e) => setNiveauRealtif(e.target.value)}
                          >
                            <option value="" disabled selected>
                              Sélectionnez le type
                            </option>
                            <option>Maternité</option>
                            <option>Maladie</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Nombre des jours
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="nombredeclasse"
                            placeholder=""
                            type="number"
                            min={1}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Date début et fin du congé
                          </label>
                          <div className="d-flex justify-content-center">
                            <DatePicker
                              className="form-control form-control-alternative"
                              selected={startDate}
                              onChange={(date) => setStartDate(date)}
                              dateFormat="yyyy-MM-dd"
                              //style={datePickerStyle}
                              placeholderText="Date début"
                            />
                            <DatePicker
                              className="form-control form-control-alternative ml-2"
                              selected={finDate}
                              onChange={(date) => setFintDate(date)}
                              dateFormat="yyyy-MM-dd"
                              //style={datePickerStyle}
                              placeholderText="Date fin"
                            />
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row className="justify-content-center">
                      <Col xs="12" className="text-center">
                        <Button color="primary">Ajouter</Button>
                        <Button
                        color="primary"
                        onClick={handleAnnulerClick}
                        size="mg"
                      >
                        Annuler
                      </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AjouterConges;
