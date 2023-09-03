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
  FormFeedback
} from "reactstrap";
import Header from "components/Headers/Header";
import { updateCompetence, getCompetence } from "service/api";
import { useNavigate, useParams } from "react-router-dom";
import { isValidNomCompetence , isValidDescriptionCompetence } from "validation";

const ModifierCompetence = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nom, setNomCompetence] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchCompetenceDetails = async () => {
      try {
        const response = await getCompetence(id);
        console.log("API Response:", response);
        const competence = response;
        setNomCompetence(competence.nom);
        setDescription(competence.description);
      } catch (error) {
        console.error("Erreur lors du chargement des détails de la compétence:", error);
      }
    };

    fetchCompetenceDetails();
  }, [id]);

  const handleModifierClick = async () => {
    if (nom && description) {
      try {
        const response =  await updateCompetence(id, {
          nom: nom,
          description: description,
        });
        console.log(response.data);
        navigate("/admin/competences");
      } catch (error) {
        console.error("Erreur lors de la modification de la compétence:", error);
        // Handle error, display an error message, or perform other actions
      }
    } else {
      // Handle missing data or show validation error
    }
  };

  const handleAnnulerClick = () => {
    navigate("/admin/competences");
  };

  return (
    <>
      <Header />
      <div className="bg-secondary" style={{ minHeight: "100vh" }}>
        <Container className="mt--7" fluid>
          <Row className="justify-content-center">
            <Col lg="8">
              <Card className="shadow p-4">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Modifier une compétence</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Informations de la compétence
                    </h6>
                    <Row>
                      <Col xs="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Nom de la compétence
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="nom"
                            placeholder="Nom compétence"
                            type="text"
                            value={nom}
                            autoComplete="off"
                            onChange={(e) => setNomCompetence(e.target.value)}
                            invalid={!isValidNomCompetence(nom) || nom === ""} 
                            />
                             {(!isValidNomCompetence(nom) || nom === "") && (
                             <FormFeedback>Le nom ne peut pas être vide et doit commencer par une majuscule et contenir uniquement des lettres, des caractères spéciaux et des espaces.</FormFeedback>
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
                            Description de la compétence
                          </label>
                          <textarea
                            className="form-control form-control-alternative"
                            id="description"
                            placeholder="Texte descriptif de la compétence"
                            value={description}
                            autoComplete="off"
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4} // Specify the number of rows for the textarea
                            invalid={!isValidDescriptionCompetence(description) || description === ""} 
                            />
                              {(!isValidDescriptionCompetence(description) || description === "") && (
                                 <FormFeedback>La description ne peut pas être vide et doit commencer par une majuscule et contenir uniquement des lettres, des caractères spéciaux et des espaces.</FormFeedback>
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
                        color="secondary"
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

export default ModifierCompetence;