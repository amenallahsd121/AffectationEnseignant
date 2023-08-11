import React, { useState , useEffect } from "react";
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
import { addModule , getCompetences} from "service/api"; // Make sure this path is correct
import { useNavigate } from "react-router-dom";
import { list_users } from "service/api";

// ... (import statements)

const AjouterModule = () => {
    const navigate = useNavigate();
    const [nom, setNom] = useState("");
    const [description, setDescription] = useState("");
    const [heuresEnseignement, setHeuresEnseignement] = useState("");
    const [competences, setCompetences] = useState([]);
    const [ects, setEcts] = useState("");
    const [ficheModule, setFicheModule] = useState(null);
    const [enseignantsAAffecter, setEnseignantsAAffecter] = useState("");
    const [responsableModule, setResponsableModule] = useState("");
  
    const handleAnnulerClick = () => {
      navigate("/admin/modules");
    };

    const [competenceOptions, setCompetenceOptions] = useState([]);

    useEffect(() => {

      getCompetences().then((response) => {
        setCompetenceOptions(response.data);
      });
    }, []);


    const [responsableOptions, setResponsableOptions] = useState([]);

    useEffect(() => {
      
      list_users().then((response) => {
        setResponsableOptions(response);
      });
    }, []);

    console.log(responsableOptions)
   
  
    const handleAjouterClick = async (e) => {
      e.preventDefault();
      
      const moduleData = new FormData();
      moduleData.append("nom", nom);
      moduleData.append("description", description);
      moduleData.append("heures_enseignement", heuresEnseignement);
      moduleData.append("ects", ects);
      moduleData.append("fiche_module", ficheModule);
      moduleData.append("enseignants_a_affecter", enseignantsAAffecter);
      moduleData.append("responsable_module", responsableModule);
  
      // Append the selected competence IDs to moduleData
      competences.forEach((competenceId) => {
        moduleData.append("competences", competenceId);
      });
  
      try {
        const response = await addModule(moduleData);
        console.log(response.data);
        navigate("/admin/competences");
      } catch (error) {
        console.error("Erreur lors de l'ajout du module:", error);
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
                        <h3 className="mb-0">Ajouter un module</h3>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <h6 className="heading-small text-muted mb-4">
                        Informations du module
                      </h6>
                      <Row>
                        <Col xs="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-nom"
                            >
                              Nom du module
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="nom"
                              placeholder="Nom module"
                              type="text"
                              value={nom}
                              onChange={(e) => setNom(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-description"
                            >
                              Description du module
                            </label>
                            <textarea
                              className="form-control form-control-alternative"
                              id="description"
                              placeholder="Texte descriptif du module"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              rows={4}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-heures"
                            >
                              Heures d'enseignement
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="heures"
                              placeholder="Heures d'enseignement"
                              type="number"
                              value={heuresEnseignement}
                              onChange={(e) => setHeuresEnseignement(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-competences"
                          >
                            Compétences (sélection multiple)
                          </label>
                          <Input
                            type="select"
                            multiple
                            className="form-control-alternative"
                            id="competences"
                            value={competences}
                            onChange={(e) =>
                              setCompetences(
                                Array.from(e.target.selectedOptions, (option) => option.value)
                              )
                            }
                          >
                            {competenceOptions?.map((competence) => (
                              <option key={competence.id} value={competence.id}>
                                {competence.nom} 
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-ects"
                            >
                              ECTS
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="ects"
                              placeholder="ECTS"
                              type="number"
                              value={ects}
                              onChange={(e) => setEcts(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-fiche"
                            >
                              Fiche du module
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="fiche"
                              placeholder="Fiche du module"
                              type="file"
                              onChange={(e) => setFicheModule(e.target.files[0])}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-enseignants"
                            >
                              Enseignants à affecter
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="enseignants"
                              placeholder="Enseignants à affecter"
                              type="number"
                              value={enseignantsAAffecter}
                              onChange={(e) => setEnseignantsAAffecter(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-responsable"
                          >
                            Responsable du module
                          </label>
                          <Input
                            type="select"
                            className="form-control-alternative"
                            id="responsable"
                            value={responsableModule}
                            onChange={(e) => setResponsableModule(e.target.value)}
                          >
                            <option value="">Sélectionner le responsable</option>
                            {responsableOptions?.map((utilisateur) => (
                              <option key={utilisateur.id} value={utilisateur.id}>
                                {utilisateur.username} 
                              </option>
                            ))}
                          </Input>
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
                            size="md"
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
  
  export default AjouterModule;
  
