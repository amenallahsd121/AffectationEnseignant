import React, { useState, useEffect } from "react";
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
import { getConfiguration, updateConfiguration } from "../../../service/api";
import { useNavigate, useParams } from "react-router-dom";

const ModifierConfiguration = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [annéeUniversitaire, setAnnéeUniversitaire] = useState("");
  const [archive, setArchive] = useState("");
  const [DD_Annee, setDD_Annee] = useState("");
  const [DF_Annee, setDF_Annee] = useState("");

  useEffect(() => {
    const fetchConfigurationData = async () => {
      try {
        const response = await getConfiguration(id);
        const configurationData = response.data;
        setAnnéeUniversitaire(configurationData.Année_Universitaire);
        setArchive(configurationData.Archive);
        setDD_Annee(configurationData.DD_Annee);
        setDF_Annee(configurationData.DF_Annee);
      } catch (error) {
        console.error("Error fetching configuration:", error);
      }
    };

    fetchConfigurationData();
  }, [id]);

  const handleAnnulerClick = () => {
    navigate("/admin/configuration");
  };

  const handleModifierClick = async () => {
    if (annéeUniversitaire && archive && DD_Annee && DF_Annee) {
      try {
        await updateConfiguration(id, {
          Année_Universitaire: annéeUniversitaire,
          Archive: archive,
          DD_Annee: DD_Annee,
          DF_Annee: DF_Annee,
        });
        navigate("/admin/configuration");
      } catch (error) {
        console.error("Error updating configuration:", error);
      }
    } else {
      
    }
  };

  return (
    <>
      <Header />
      <div className="bg-secondary" style={{ minHeight: "100vh" }}>
        <Container className="mt--7" fluid>
          <Row style={{ marginTop: "150px" }} className="justify-content-center">
            <Col lg="10">
              <Card className="shadow p-4">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Modifier une configuration</h3>
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
                            id="annéeUniversitaire"
                            placeholder="Exemple : 2021/2022"
                            type="text"
                            value={annéeUniversitaire}
                            onChange={(e) =>
                              setAnnéeUniversitaire(e.target.value)
                            }
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
                    <Row>
                      <Col xs="12">
                        <FormGroup>
                          <label className="form-control-label">
                            Date de début
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="date"
                            value={DD_Annee}
                            onChange={(e) => setDD_Annee(e.target.value)}
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
                            value={DF_Annee}
                            onChange={(e) => setDF_Annee(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="justify-content-center">
                      <Col xs="12" className="text-center">
                        <Button color="primary" onClick={handleModifierClick}>
                          Modifier
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

export default ModifierConfiguration;
