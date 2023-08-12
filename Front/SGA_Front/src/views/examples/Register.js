/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import React, { useState , useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Label,
  CardHeader
} from "reactstrap";
import { register_user_api_view } from "service/api";
import { useNavigate } from "react-router-dom";

const Register = () => {

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


  const navigate = useNavigate(); // Initialize the navigate function

  const handleAjouterClick = async (e) => {
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
      const response = await register_user_api_view(userData);
      console.log(response.data);
      navigate("/auth/login");
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur:", error);
    }
  };
  

  return (
    <Col lg="6" md="8">
      <Card className="bg-secondary shadow border-0">
      <CardHeader className="bg-transparent text-white pb-5 text-center">
        <div className="text-muted mt-3 mb-4">
          <h2>Formulaire d'inscription</h2>
        </div>
      </CardHeader>
        <CardBody className="px-lg-5 py-lg-5">
          <Form role="form" onSubmit={handleAjouterClick}>
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
                />
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
                  value={nom_utilisateur}
                  autoComplete="off"
                  onChange={(e) => setNomUtilisateur(e.target.value)}
                />
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
                  value={prenom_utilisateur}
                  autoComplete="off"
                  onChange={(e) => setPrenomUtilisateur(e.target.value)}
                />
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
                />
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
                />
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
                  value={numero_de_telephone}
                  onChange={(e) => setNumeroDeTelephone(e.target.value)}
                />
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
                            {roles?.map((roles) => (
                              <option key={roles.id} value={roles.id}>
                                {roles.value} 
                              </option>
                            ))}
                          </Input>
            </FormGroup>
           
            <div className="text-center">
              <Button className="mt-4" color="primary" onSubmit={handleAjouterClick}>
                S'inscrire
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Register;
