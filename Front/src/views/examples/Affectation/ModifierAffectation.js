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
import {
  getAffectations,
  getUsers,
  getModules,
  updateAffectation,
} from "../../../service/api";
import { useParams, useNavigate } from "react-router-dom";

const ModifierAffectation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedEnseignant, setSelectedEnseignant] = useState(""); // Set initial value
  const [selectedModule, setSelectedModule] = useState(""); // Set initial value
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [modules, setModules] = useState([]);
  const [currentAffectation, setCurrentAffectation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAffectations(id);
        const affectationData = response.data;

        const usersResponse = await getUsers();
        const modulesResponse = await getModules();

        setUtilisateurs(usersResponse.data);
        setModules(modulesResponse.data);
        setCurrentAffectation(affectationData);

       
        setSelectedEnseignant(affectationData.Utilisateur);
        setSelectedModule(affectationData.Module); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleAnnulerClick = () => {
    navigate("/admin/affectation");
  };

  const handleUpdateClick = async (e) => {
    e.preventDefault();

   

    if (selectedEnseignant && selectedModule) {
      try {
        const updatedAffectationData = {
          id: id,
          Utilisateur: selectedEnseignant,
          Module: selectedModule, 
        };

      //  console.log("wwwwwwwwwwwwwwwwwwwwwwwwwww", updatedAffectationData);

        await updateAffectation(id, updatedAffectationData);

       

        navigate("/admin/affectation");
      } catch (error) {
        console.error("Error updating affectation:", error);
      }
    } else {
     // console.error(
       // "fffffffffffffffffffffffffff" 
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
                      <h3 className="mb-0">Modifier une Affectation</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Affectation Information
                    </h6>

                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-enseignant"
                      >
                        Nom d'Enseignant
                      </label>
                      <Input
                        className="form-control-alternative"
                        id="input-enseignant"
                        type="select"
                        value={selectedEnseignant}
                        onChange={(e) => setSelectedEnseignant(e.target.value)}
                      >
                       
                   

                       
                        {utilisateurs.map(
                          (utilisateur) =>
                            utilisateur.id !==
                              currentAffectation?.Utilisateur.id && (
                              <option
                                key={utilisateur.id}
                                value={utilisateur.id}
                              >
                                {utilisateur.nom_utilisateur}{" "}
                                {utilisateur.prenom_utilisateur}
                              </option>
                            )
                        )}
                      </Input>
                    </FormGroup>

                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-module"
                      >
                        Nom Module relatif
                      </label>
                      <Input
                        className="form-control-alternative"
                        id="input-module"
                        type="select"
                        value={selectedModule}
                        onChange={(e) => setSelectedModule(e.target.value)}
                      >
                       
                        

                       
                        {modules.map(
                          (module) =>
                            module.id !== currentAffectation?.Module.id && (
                              <option key={module.id} value={module.id}>
                                {module.nom}
                              </option>
                            )
                        )}
                      </Input>
                    </FormGroup>

                    <Row className="justify-content-center">
                      <Col xs="12" className="text-center">
                        <Button color="primary" onClick={handleUpdateClick}>
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

export default ModifierAffectation;
