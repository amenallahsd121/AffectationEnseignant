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
import { addNiveau } from "../../../service/api";
import { useNavigate } from "react-router-dom";

const AjouterNiveau = () => {
  const navigate = useNavigate();
  const [nomNiveau, setNomNiveau] = useState("");
  const [nombreDeClasse, setNombreDeClasse] = useState("");


  const [nomNiveauError, setNomNiveauError] = useState("");
  const [nombreDeClasseError, setNombreDeClasseError] = useState("");

  const handleAnnulerClick = () => {
    navigate("/admin/niveaux");
  };

  const handleAjouterClick = async (e) => {
    e.preventDefault();


    let isValid = true;

    if (!nomNiveau.trim()) {
      setNomNiveauError("Le nom du niveau est obligatoire");
      isValid = false;
    } else {
      setNomNiveauError("");
    }

    if (!nombreDeClasse) {
      setNombreDeClasseError("Le nombre de classes est obligatoire");
      isValid = false;
    } else {
      setNombreDeClasseError("");
    }

    if (isValid) {
      try {
        const response = await addNiveau({
          nom: nomNiveau,
          nombreclasse: nombreDeClasse,
        });
        navigate("/admin/niveaux");
      } catch (error) {
        console.error("Erreur lors de l'ajout du niveau:", error);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="bg-secondary" style={{ minHeight: "100vh" }}>
        <Container className="mt--7" fluid>
          <Row style={{ marginTop: '150px' }} className="justify-content-center">
            <Col lg="10">
              <Card className="shadow p-4">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Ajouter un niveau</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Informations du niveau
                    </h6>
                    <Row>
                      <Col xs="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Nom du niveau
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="nomniveau"
                            placeholder="Exemple : 1A"
                            type="text"
                            value={nomNiveau}
                            onChange={(e) => setNomNiveau(e.target.value)}
                          />
                          {nomNiveauError && (
                            <div className="text-danger">
                              {nomNiveauError}
                            </div>
                          )}
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
                            Nombre des classes
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="nombredeclasse"
                            placeholder=""
                            type="number"
                            min={1}
                            value={nombreDeClasse}
                            onChange={(e) => setNombreDeClasse(e.target.value)}
                          />
                          {nombreDeClasseError && (
                            <div className="text-danger">
                              {nombreDeClasseError}
                            </div>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="justify-content-center">
                      <Col xs="12" className="text-center">
                        <Button
                          color="primary"
                          onClick={handleAjouterClick}
                        >
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

export default AjouterNiveau;
