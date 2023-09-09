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
import { updateNiveau, getNiveaux } from "../../../service/api";
import { useNavigate, useParams } from "react-router-dom";

const ModifierNiveau = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nomNiveau, setNomNiveau] = useState("");
  const [nombreDeClasse, setNombreDeClasse] = useState("");

  // Add state variables for validation errors
  const [nomNiveauError, setNomNiveauError] = useState("");
  const [nombreDeClasseError, setNombreDeClasseError] = useState("");

  useEffect(() => {
    const fetchNiveauDetails = async () => {
      try {
        const response = await getNiveaux(id);
        const niveau = response.data;
        setNomNiveau(niveau.nom);
        setNombreDeClasse(niveau.nombreclasse);
      } catch (error) {
        console.error("Error fetching niveau details:", error);
      }
    };

    fetchNiveauDetails();
  }, [id]);

  const handleModifierClick = async () => {
    setNomNiveauError("");
    setNombreDeClasseError("");


    let isValid = true;

    if (!nomNiveau) {
      setNomNiveauError("Le nom du niveau est obligatoire");
      isValid = false;
    }

    if (!nombreDeClasse) {
      setNombreDeClasseError("Le nombre des classes est obligatoire");
      isValid = false;
    }

    if (isValid) {
      try {
        await updateNiveau(id, {
          nom: nomNiveau,
          nombreclasse: nombreDeClasse,
        });
        navigate("/admin/niveaux");
      } catch (error) {
        console.error("Erreur lors de la modification du niveau:", error);
      }
    }
  };

  const handleAnnulerClick = () => {
    navigate("/admin/niveaux");
  };

  return (
    <>
      <Header />
      <div className="bg-secondary" style={{ minHeight: "100vh" }}>
        <Container className="mt--7" fluid>
          <Row style={{ marginTop: '150px' }} className="justify-content-center" >
            <Col lg="8">
              <Card className="shadow p-4">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Modifier un niveau</h3>
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
                            <div className="text-danger">{nomNiveauError}</div>
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

export default ModifierNiveau;
