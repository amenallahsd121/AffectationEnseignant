import React, { useState } from "react";
import {
  Button,
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
import Header from "components/Headers/Header";
import { useNavigate } from "react-router-dom";
import { addConfiguration } from "service/api";

const AjouterConfiguration = () => {
  const navigate = useNavigate();
  const [AnnéeUniversitaire, setAnnéeUniversitaire] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [archive, setArchive] = useState("Non Archivée");

  // Add state variables for validation
  const [annéeUniversitaireError, setAnnéeUniversitaireError] = useState("");
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");

  const handleAnnulerClick = () => {
    navigate("/admin/configuration");
  };

  const handleAjouterClick = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (!AnnéeUniversitaire.trim()) {
      setAnnéeUniversitaireError("L'année Universitaire est obligatoire");
      isValid = false;
    } else {
      setAnnéeUniversitaireError("");
    }

    if (!startDate) {
      setStartDateError("Date début est obligatoire");
      isValid = false;
    } else {
      setStartDateError("");
    }

    if (!endDate) {
      setEndDateError("Date fin est obligatoire");
      isValid = false;
    } else {
      setEndDateError("");
    }

    // If all fields are valid, proceed with the API call
    if (isValid) {
      const configurationData = {
        Année_Universitaire: AnnéeUniversitaire,
        Archive: archive,
        DD_Annee: startDate,
        DF_Annee: endDate,
      };

      try {
        const response = await addConfiguration(configurationData);
        navigate("/admin/configuration");
      } catch (error) {
        console.error("Error:", error);
      }
    }
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
                      <h3 className="mb-0">Ajouter une configuration</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Informations de la configuration
                    </h6>
                    <Row>
                      <Col xs="12">
                        <FormGroup>
                          <label className="form-control-label">
                            Année Universitaire
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="AnnéeUniversitaire"
                            placeholder="Exemple : 2021/2022"
                            type="text"
                            value={AnnéeUniversitaire}
                            onChange={(e) =>
                              setAnnéeUniversitaire(e.target.value)
                            }
                          />
                          {/* Display error message */}
                          {annéeUniversitaireError && (
                            <div className="text-danger">
                              {annéeUniversitaireError}
                            </div>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs="12" md="6">
                        {" "}
                        <FormGroup>
                          <label className="form-control-label">
                            Date début
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                          />
                          {startDateError && (
                            <div className="text-danger">{startDateError}</div>
                          )}
                        </FormGroup>
                      </Col>
                      <Col xs="12" md="6">
                        {" "}
                        <FormGroup>
                          <label className="form-control-label">Date fin</label>
                          <Input
                            className="form-control-alternative"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                          />

                          {endDateError && (
                            <div className="text-danger">{endDateError}</div>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs="12">
                        <FormGroup>
                          <label className="form-control-label">Etat</label>
                          <Input
                            className="form-control-alternative"
                            type="select"
                            value={archive}
                            onChange={(e) => setArchive(e.target.value)}
                          >
                            <option value="Archivée">Archivée</option>
                            <option value="Non Archivée">Non Archivée</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row className="justify-content-center mt-5">
                      {" "}
                      <Col xs="12" className="text-center">
                        <Button color="primary" onClick={handleAjouterClick}>
                          Ajouter
                        </Button>
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

export default AjouterConfiguration;
