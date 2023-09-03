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
  FormFeedback
} from "reactstrap";
import Header from "components/Headers/Header";
import { addOption } from "service/api";
import { useNavigate } from "react-router-dom";
import { isValidNomOption , isValidNombreDeClasse } from "validation";


const AjouterOption = () => {
  const navigate = useNavigate();
  const [nom, setNomOption] = useState("");
  const [nb_classes, setNombreDeClasse] = useState("");

  const handleAnnulerClick = () => {
    navigate("/admin/options");
  };

  const handleAjouterClick = async (e) => {
    e.preventDefault();
    if (nom && nb_classes) {
      try {
        const response = await addOption({
          nom: nom,
          nb_classes: nb_classes,
        });
        console.log(response.data);
        navigate("/admin/options");
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'option:", error);
      }
    } else {
         console.log("Erreur");
    }
  };

  return (
    <>
      <Header />
      <div className="bg-secondary" style={{ minHeight: "100vh" }}>
        <Container className="mt--7" fluid>
          <Row className="justify-content-center">
            <Col lg="10">
              <Card className="shadow p-4">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Ajouter une option</h3>
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
                            value={nom}
                            autoComplete="off"
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
                            placeholder="1 - &"
                            type="number"
                            autoComplete="off"
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
                        <Button
                          color="primary"
                          onClick={handleAjouterClick}
                        >
                          Ajouter
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

export default AjouterOption;