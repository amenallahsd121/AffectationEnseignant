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
  CustomInput,
} from "reactstrap";
import Header from "components/Headers/Header";
import { list_user } from "service/api";
import { useNavigate, useParams } from "react-router-dom";
import { update_user } from "service/api";

const ModifierUtilisateur = () => {

    const roles = [
        { id: "1", value: "Enseignant" },
        { id: "2", value: "Coordinateur unité pédagogique" },
        { id: "3", value: "Responsable module" },
        { id: "4", value: "Responsable option" },
        { id: "5", value: "Coordiateur projet" },
        { id: "6", value: "Chef département" },
        { id: "7", value: "Vacataire" },
      ];

  const navigate = useNavigate();
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [nom_utilisateur, setNomUtilisateur] = useState("");
  const [prenom_utilisateur, setPrenomUtilisateur] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo_de_profil, setPhotoDeProfil] = useState("");
  const [numero_de_telephone, setNumeroDeTelephone] = useState("");
  const [grade, setGrade] = useState([]);



  useEffect(() => {
    const fetchUtilisateurDetails = async () => {
      try {
        const response = await list_user(id);
        console.log("API Response:", response);
        const utilisateur = response;
        setUsername(utilisateur.username);
        setNomUtilisateur(utilisateur.nom_utilisateur);
        setPrenomUtilisateur(utilisateur.prenom_utilisateur);
        setEmail(utilisateur.email);
        setPassword(utilisateur.password);
        setPhotoDeProfil(utilisateur.photo_de_profil);
        setNumeroDeTelephone(utilisateur.numero_de_telephone);
        setGrade(utilisateur.grade);
      } catch (error) {
        console.error("Error fetching utilisateur details:", error);
      }
    };

    fetchUtilisateurDetails();
  }, [id]);

  const handleModifierClick = async () => {
    if (username&&nom_utilisateur&& prenom_utilisateur&&email&&password&&grade) {
      try {
        const response = await update_user(id, {
          username: username,
          nom_utilisateur: nom_utilisateur,
          prenom_utilisateur: prenom_utilisateur,
          email: email,
          password: password,
          photo_de_profil: null,
          numero_de_telephone: '',
          grade: grade,          
        });
        console.log(response.data);
        navigate("/admin/tables");
      } catch (error) {
        console.error("Erreur lors de la modification du utilisateur:", error);
        // Handle error, display an error message, or perform other actions
      }
    } else {
      // Handle missing data or show validation error
    }
  };

  const handleAnnulerClick = () => {
    navigate("/admin/tables");
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
                      <h3 className="mb-0">Modifier un utilisateur</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Informations de l'utilisateur
                    </h6>
                    <Row>
                      <Col xs="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Pseudo
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="username"
                            placeholder="Pseudo"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                           Nom
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="nom_utilisateur"
                            placeholder="Nom"
                            type="text"
                            value={nom_utilisateur}
                            onChange={(e) => setNomUtilisateur(e.target.value)}
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
                           Prenom
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="prenom_utilisateur"
                            placeholder="Prenom"
                            type="text"
                            value={prenom_utilisateur}
                            onChange={(e) => setPrenomUtilisateur(e.target.value)}
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
                           Email
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="email"
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                           Mot De Passe
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="password"
                            placeholder="Mot De Passe"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                           Photo De Profil
                          </label>
                          <Input
                              type="file"
                              name="photo_de_profil"
                              id="photo"
                              accept=".jpg,.jpeg,.png"
                              onChange={(e) => setPhotoDeProfil(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                     <Row>
                      <Col xs="12">
                      <FormGroup>
                            <label className="form-control-label" htmlFor="input-country">
                              Grade
                            </label>
                            <CustomInput
                              type="select"
                              name="grade"
                              id="role-select" 
                              value={grade}
                              onChange={(e) => setGrade(e.target.value)}
                            >
                              {roles.map(role => (
                                <option key={role.id} value={role.id}>{role.value}</option>
                              ))}
                            </CustomInput>
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

export default ModifierUtilisateur;