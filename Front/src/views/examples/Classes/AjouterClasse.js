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
import { addClasse, getNiveaux } from "../../../service/api";
import { useNavigate } from "react-router-dom";

const AjouterClasse = () => {
  const navigate = useNavigate();
  const [nomClasse, setNomClasse] = useState("");
  const [niveaurelatif, setNiveauRealtif] = useState("");
  const [niveaux, setNiveaux] = useState([]);

  useEffect(() => {
    const fetchNiveauxData = async () => {
      try {
        const response = await getNiveaux();
        setNiveaux(response.data);
      } catch (error) {
        console.error("Error fetching niveaux:", error);
      }
    };
    fetchNiveauxData();
  }, []);

  const handleAnnulerClick = () => {
    navigate("/admin/classes");
  };

  const handleAjouterClick = async (e) => {
    e.preventDefault();

    if (nomClasse && niveaurelatif) {
      try {
        // Find the selected niveau object based on the niveau name
        const selectedNiveau = niveaux.find(
          (niveau) => niveau.nom === niveaurelatif
        );

        if (selectedNiveau) {
          // Prepare the data for adding a new class
          const classeData = {
            nom: nomClasse,
            niveau: selectedNiveau.id,
          };

          // Add the class by making an API call
          const response = await addClasse(classeData);

          navigate("/admin/classes");
        } else {
          console.error("Selected niveau not found.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      // Handle missing data or show validation error
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
                            <option value="" disabled>
                              Sélectionnez un niveau
                            </option>
                            {niveaux.map((niveau) => (
                              <option key={niveau.id} value={niveau.nom}>
                                {niveau.nom}
                              </option>
                            ))}
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

export default AjouterClasse;
