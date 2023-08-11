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
import { getClasses, updateClasse, getNiveaux } from "../../../service/api";
import { useNavigate, useParams } from "react-router-dom";

const ModifierClasse = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nomClasse, setNomClasse] = useState("");
  const [niveaurelatif, setNiveauRealtif] = useState("");
  const [niveaux, setNiveaux] = useState([]);

  useEffect(() => {
    const fetchClasseData = async () => {
      try {
        const responseClasse = await getClasses(id);
        setNomClasse(responseClasse.data.nom);
        setNiveauRealtif(responseClasse.data.niveau);
        /////////////////////////////////////////////////////////////////////////////////////////////
        const responseNiveaux = await getNiveaux();
        setNiveaux(responseNiveaux.data);
      } catch (error) {
        console.error("Error fetching niveaux:", error);
      }
    };

    fetchClasseData();
  }, [id]);

  const handleAnnulerClick = () => {
    navigate("/admin/classes");
  };

  const handleModifierClick = async () => {
    if (nomClasse && niveaurelatif) {
      try {
        await updateClasse(id, {
          nom: nomClasse,
          niveau: niveaurelatif,
        });
        navigate("/admin/classes");
      } catch (error) {
        console.error("Erreur lors de la modification du Classe:", error);
      }
    } else {
    }
  };
  return (
    <>
      <Header />
      <div className="bg-secondary" style={{ minHeight: "100vh" }}>
        <Container className="mt--7" fluid>
        <Row style={{ marginTop: '150px' }} className="justify-content-center" >
            <Col lg="10">
              <Card className="shadow p-4">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Ajouter une classe</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Informations de la classe
                    </h6>
                    <Row>
                      <Col xs="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Nom de la classe
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="nomClasse"
                            placeholder="Exemple : 1A3"
                            type="text"
                            value={nomClasse}
                            onChange={(e) => setNomClasse(e.target.value)}
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
                            Niveau relatif
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="niveaurelatif"
                            type="select"
                            value={niveaurelatif}
                            onChange={(e) => setNiveauRealtif(e.target.value)}
                          >
                            {niveaux.map((niveau) => (
                              <option key={niveau.id} value={niveau.id}>
                                {niveau.nom}
                              </option>
                            ))}
                          </Input>
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

export default ModifierClasse;
