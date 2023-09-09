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
import { addAffectation, getUsers, getModules } from "../../../service/api";
import { useNavigate } from "react-router-dom";

const AjouterAffectation = () => {
  const navigate = useNavigate();
  const [selectedEnseignant, setSelectedEnseignant] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedSemestre, setSelectedSemestre] = useState("");
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchUtilisateursData = async () => {
      try {
        const response = await getUsers();
        setUtilisateurs(response.data);
      } catch (error) {
        console.error("Error fetching utilisateurs:", error);
      }
    };

    const fetchModulesData = async () => {
        try {
          const response = await getModules();
          setModules(response.data);
        } catch (error) {
          console.error("Error fetching modules:", error);
        }
      };
      

    fetchUtilisateursData();
    fetchModulesData();
  }, []);

  const handleAnnulerClick = () => {
    navigate("/admin/affectation");
  };

  const handleAjouterClick = async (e) => {
    e.preventDefault();

    if (selectedEnseignant && selectedModule && selectedSemestre) {
      try {
        const affectationData = {
          Utilisateur: selectedEnseignant,
          Module: selectedModule,
          Semestre: selectedSemestre, 
        };

        const response = await addAffectation(affectationData);

        navigate("/admin/affectation");
      } catch (error) {
        console.error("Error:", error);
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
                      <h3 className="mb-0">Affecter un Enseignant</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Informations d'affectation
                    </h6>
                    <FormGroup>
                      <label className="form-control-label" htmlFor="input-enseignant">
                        Nom d'Enseignant
                      </label>
                      <Input
                        className="form-control-alternative"
                        id="input-enseignant"
                        type="select"
                        value={selectedEnseignant}
                        onChange={(e) => setSelectedEnseignant(e.target.value)}
                      >
                        <option value="" disabled>
                          Sélectionnez un Enseignant
                        </option>
                        {utilisateurs.map((utilisateur) => (
                          <option key={utilisateur.id} value={utilisateur.id}>
                            {utilisateur.nom_utilisateur} {utilisateur.prenom_utilisateur}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <label className="form-control-label" htmlFor="input-module">
                        Nom Module relatif
                      </label>
                      <Input
                        className="form-control-alternative"
                        id="input-module"
                        type="select"
                        value={selectedModule}
                        onChange={(e) => setSelectedModule(e.target.value)}
                      >
                        <option value="" disabled>
                          Sélectionnez un Module
                        </option>
                        {modules.map((module) => (
                          <option key={module.id} value={module.id}>
                            {module.nom}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <label className="form-control-label" htmlFor="input-semestre">
                        Semestre
                      </label>
                      <Input
                        className="form-control-alternative"
                        id="input-semestre"
                        type="select"
                        value={selectedSemestre}
                        onChange={(e) => setSelectedSemestre(e.target.value)}
                      >
                        <option value="" disabled>
                          Sélectionnez un Semestre
                        </option>
                        <option value="1">Semestre 1</option>
                        <option value="2">Semestre 2</option>
                      </Input>
                    </FormGroup>
                    <Row className="justify-content-center">
                      <Col xs="12" className="text-center">
                        <Button color="primary" onClick={handleAjouterClick}>
                          Affecter
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

export default AjouterAffectation;
