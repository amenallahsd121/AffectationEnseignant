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
import { updateModule, getModule , getCompetences , list_user } from "service/api";
import { useNavigate, useParams } from "react-router-dom";

const ModifierModule = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [heures_enseignement, setHeuresEnseignement] = useState("");
  const [competences, setCompetences] = useState([]);
  const [ects, setEcts] = useState("");
  const [fiche_module, setFicheModule] = useState(null);
  const [enseignants_a_affecter, setEnseignantsAAffecter] = useState("");
  const [responsableModule, setResponsableModule] = useState("");



  const [competenceOptions, setCompetenceOptions] = useState([]);

  useEffect(() => {

    getCompetences().then((response) => {
      setCompetenceOptions(response.data);
    });
  }, []);


  const [responsableOptions, setResponsableOptions] = useState([]);

  useEffect(() => {
    
    list_user().then((response) => {
      setResponsableOptions(response);
    });
  }, []);


  useEffect(() => {
    const fetchModuleDetails = async () => {
      try {
        const response = await getModule(id);
        console.log("API Response:", response);
        const module = response;
        console.log(module); 
        const competencesArray = module.competences_list.map(competence => competence.id);
        setNom(module.nom);
        setDescription(module.description);
        setHeuresEnseignement(module.heures_enseignement);
        setEcts(module.ects);
        setCompetences(competencesArray);
        setFicheModule(module.fiche_module);
        setEnseignantsAAffecter(module.enseignants_a_affecter);
        setResponsableModule(module.responsable_module)
      } catch (error) {
        console.error("Erreur lors du chargement des détails du module:", error);
      }
    };

    fetchModuleDetails();
  }, [id]);

  const handleModifierClick = async () => {
    if (nom && description && heures_enseignement && competences && ects && fiche_module && enseignants_a_affecter && responsableModule) {
      try {
        const response =  await updateModule(id, {
          nom: nom,
          description: description,
          heures_enseignement: heures_enseignement,
          competences: competences.join(','), 
          ects: ects,
          fiche_module: fiche_module,
          enseignants_a_affecter: enseignants_a_affecter,
          responsableModule: responsableModule.toString(), 
        });
  
        console.log(response.data);
        navigate("/admin/modules");
      } catch (error) {
        console.error("Erreur lors de la modification du module", error);
        // Handle error, display an error message, or perform other actions
      }
    } else {
      // Handle missing data or show validation error
    }
  };
  

  const handleAnnulerClick = () => {
    navigate("/admin/modules");
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
                      <h3 className="mb-0">Modifier un module</h3>
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
                              value={heures_enseignement}
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
                              value={enseignants_a_affecter}
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

export default ModifierModule;