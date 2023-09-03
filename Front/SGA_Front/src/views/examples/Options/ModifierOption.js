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
import { updateOption, getOption } from "service/api";
import { useNavigate, useParams } from "react-router-dom";
import { isValidNomOption , isValidNombreDeClasse } from "validation";

const ModifierOption = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nom, setNomOption] = useState("");
  const [nb_classes, setNombreDeClasse] = useState("");

  useEffect(() => {
    const fetchOptionDetails = async () => {
      try {
        const response = await getOption(id);
        console.log("API Response:", response);
        const option = response;
        setNomOption(option.nom);
        setNombreDeClasse(option.nb_classes);
      } catch (error) {
        console.error("Erreur lors du chargement des détails de l'option:", error);
      }
    };

    fetchOptionDetails();
  }, [id]);

  const handleModifierClick = async () => {
    if (nom && nb_classes) {
      try {
        const response =  await updateOption(id, {
          nom: nom,
          nb_classes: nb_classes,
        });
        console.log(response.data);
        navigate("/admin/options");
      } catch (error) {
        console.error("Erreur lors de la modification de l'option:", error);
        // Handle error, display an error message, or perform other actions
      }
    } else {
      // Handle missing data or show validation error
    }
  };

  const handleAnnulerClick = () => {
    navigate("/admin/options");
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
                      <h3 className="mb-0">Modifier une option</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Informations de l'option
                    </h6>
                    <Row>
                      <Col xs="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Nom de l'option
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="nom"
                            placeholder="Nom option"
                            type="text"
                            autoComplete="off"
                            value={nom}
                            onChange={(e) => setNomOption(e.target.value)}
                            invalid={!isValidNomOption(nom) || nom === ""} 
                            />
                             {(!isValidNomOption(nom) || nom === "") && (
                             <FormFeedback>Le nom ne peut pas être vide et doit commencer par une majuscule et contenir uniquement des lettres et des espaces.</FormFeedback>
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
                            id="nb_classes"
                            placeholder="1-&"
                            autoComplete="off"
                            type="number"
                            value={nb_classes}
                            onChange={(e) => setNombreDeClasse(e.target.value)}
                            invalid={!isValidNombreDeClasse(nb_classes) || nb_classes === ""} 
                            />
                             {(!isValidNombreDeClasse(nb_classes) || nb_classes === "") && (
                             <FormFeedback>Le nombre de classe doit être compris entre 1 et +&.</FormFeedback>
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

export default ModifierOption;