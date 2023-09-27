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
  InputGroup,
  Label,
  InputGroupText,
  InputGroupAddon,
  FormFeedback
} from "reactstrap";
import Header from "components/Headers/Header";
import { update_user, list_user } from "service/api";
import { useNavigate, useParams } from "react-router-dom";
import { isValidUsername , isValidNomUtilisateur, isValidPrenomUtilisateur , isValidCustomEmail , isValidPassword  ,isValidNumeroTelephone } from "validation";


const UpdateUserForUser = () => {
  const { id } = useParams();


  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const rolesData = [
      { id: "1", value: "Enseignant" },
      { id: "2", value: "Coordinateur unité pédagogique" },
      { id: "3", value: "Responsable module" },
      { id: "4", value: "Responsable option" },
      { id: "5", value: "Coordiateur projet" },
      { id: "6", value: "Chef département" },
      { id: "7", value: "Vacataire" },
    ];
  
    setRoles(rolesData); // Set the roles state with the rolesData array
  }, []);
  
    const [username, setPseudo] = useState("");
    const [nom_utilisateur, setNomUtilisateur] = useState("");
    const [prenom_utilisateur, setPrenomUtilisateur] = useState("");
    const [grade, setGrade] = useState([]);
    const [email, setEmail] = useState("");
    const [photo_de_profil, setPhotoDeProfil] = useState(null);
    const [ password, setPassword] = useState("");
    const [numero_de_telephone, setNumeroDeTelephone] = useState("");

    useEffect(() => {
      const fetchUtilisateurDetails = async () => {
        try {
          const response = await list_user(id);
          console.log("API Response:", response);
          const utilisateur = response;
          setPseudo(utilisateur.username);
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

  const navigate = useNavigate(); // Initialize the navigate function

  const handleModifierClick = async (e) => {
    e.preventDefault();
  
    const userData = new FormData();
    userData.append("username", username);
    userData.append("nom_utilisateur", nom_utilisateur);
    userData.append("prenom_utilisateur", prenom_utilisateur);
    userData.append("email", email);
    userData.append("password", password);
  
    if (photo_de_profil) {
      userData.append("photo_de_profil", photo_de_profil);
    }
  
    if (numero_de_telephone) {
      userData.append("numero_de_telephone", numero_de_telephone);
    }
  
    // Append the selected competence IDs to userData
    grade.forEach((roleId) => {
      userData.append("grade", roleId);
    });
  
    console.log(userData);
  
    try {
      const response = await update_user(id,userData);
      console.log(response.data);
      navigate("/admin/user-profile");
    } catch (error) {
      console.error("Erreur lors de la modication de l'utilisateur:", error);
    }
  };
  


  const handleAnnulerClick = () => {
    navigate("/admin/user-profile");
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
                      <h3 className="mb-0">Modifier mon compte</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Informations de mon compte
                    </h6>
                    <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-hat-3" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Pseudo"
                  type="text"
                  name="username"
                  value={username}
                  autoComplete="off"
                  onChange={(e) => setPseudo(e.target.value)}
                  invalid={!isValidUsername(username) || username === ""} 
                  />
                  {(!isValidUsername(username) || username === "") && (
                    <FormFeedback>Le username ne peut pas être vide et doit commencer par une majuscule et contenir uniquement des lettres et des underscores.</FormFeedback>
                  )}
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-badge" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Nom"
                  type="text"
                  name="nom_utilisateur"
                  autoComplete="off"
                  value={nom_utilisateur}
                  onChange={(e) => setNomUtilisateur(e.target.value)}
                  invalid={!isValidNomUtilisateur(nom_utilisateur) || nom_utilisateur === ""} 
                  />
                   {(!isValidNomUtilisateur(nom_utilisateur) || nom_utilisateur === "") && (
                   <FormFeedback>Le nom ne peut pas être vide et doit commencer par une majuscule et contenir uniquement des lettres et des espaces.</FormFeedback>
                 )}
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-badge" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Prenom"
                  type="text"
                  name="prenom_utilisateur"
                  autoComplete="off"
                  value={prenom_utilisateur}
                  onChange={(e) => setPrenomUtilisateur(e.target.value)}
                  invalid={!isValidPrenomUtilisateur(prenom_utilisateur) || prenom_utilisateur === ""} 
                  />
                   {(!isValidPrenomUtilisateur(prenom_utilisateur) || prenom_utilisateur === "") && (
                   <FormFeedback>Le prenom ne peut pas être vide et doit commencer par une majuscule et contenir uniquement des lettres et des espaces.</FormFeedback>
                 )}
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-email-83" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Email"
                  type="email"
                  name="email"
                  autoComplete="new-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  invalid={!isValidCustomEmail(nom_utilisateur, prenom_utilisateur, email) || email === ""} 
                  />
                   {(!isValidCustomEmail(nom_utilisateur, prenom_utilisateur, email) || email === "") && (
                   <FormFeedback>L'email doit être sous la forme "prenom_utilisateur.nom_utilisateur@esprit.tn".</FormFeedback>
                 )}
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Mot De Passe"
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  invalid={!isValidPassword(password) || password === ""} 
                  />
                   {(!isValidPassword(password) || password === "") && (
                   <FormFeedback>Le mot de passe doit comporter entre 8 et 20 caractères et inclure des lettres, des chiffres et des caractères spéciaux.</FormFeedback>
                 )}
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label for="photo">Photo De Profil</Label>
              <Input
                  type="file"
                  name="photo_de_profil"
                  id="photo"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => setPhotoDeProfil(e.target.files[0])}
              />
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-mobile-button" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Numéro de téléphone"
                  type="text"
                  name="numero_de_telephone"
                  autoComplete="off"
                  onChange={(e) => setNumeroDeTelephone(e.target.value)}
                  invalid={!numero_de_telephone || !isValidNumeroTelephone(numero_de_telephone)}
                  />
                  {(!numero_de_telephone || !isValidNumeroTelephone(numero_de_telephone)) && (
                    <FormFeedback>Le numéro de téléphone doit comporter exactement 8 chiffres.</FormFeedback>
                  )}
              </InputGroup>
            </FormGroup>
            <FormGroup>
                <Label for="roles">Grade</Label>
                <Input
                  type="select"
                  multiple
                  className="form-control-alternative"
                  id="grade"
                  value={grade}
                  onChange={(e) =>
                    setGrade(
                      Array.from(e.target.selectedOptions, (option) => option.value)
                    )
                  }
                >
                  {roles?.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.value} 
                    </option>
                  ))}
                </Input>
              </FormGroup>

           
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

export default UpdateUserForUser;