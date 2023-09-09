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

  const handleAnnulerClick = () => {
    navigate("/admin/configuration");
  };

  const handleAjouterClick = async (e) => {
    e.preventDefault();

   
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
                            onChange={(e) => setAnnéeUniversitaire(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12">
                        <FormGroup>
                          <label className="form-control-label">
                            Date de début
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12">
                        <FormGroup>
                          <label className="form-control-label">
                            Date de fin
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12">
                        <FormGroup>
                          <label className="form-control-label">
                            Archive
                          </label>
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
                    <Row className="justify-content-center">
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
