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
import React, { useState } from "react";
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
  CustomInput,
  CardHeader
} from "reactstrap";
import { register_user_api_view } from "service/api";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const roles = [
    { id: "1", value: "Enseignant" },
    { id: "2", value: "Coordinateur unité pédagogique" },
    { id: "3", value: "Responsable module" },
    { id: "4", value: "Responsable option" },
    { id: "5", value: "Coordiateur projet" },
    { id: "6", value: "Chef département" },
    { id: "7", value: "Vacataire" },
  ];


  const [formData, setFormData] = useState({
    username: "",
    nom_utilisateur: "",
    prenom_utilisateur: "",
    email: "",
    password: "",
    photo_de_profil: null,
    numero_de_telephone: "",
    grade: [],
  });

  const handlePhotoChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFormData({ ...formData, photo_de_profil: selectedFile });
    } else {
      // Clear the value for the photo_de_profil field
      setFormData({ ...formData, photo_de_profil: null });
    }
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (event) => {
    setFormData({ ...formData, grade: event.target.value });
  };

  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {

      const response = await register_user_api_view(formData);
      navigate("/auth/login", { replace: true });
      console.log(response.data);
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
          <Form role="form" onSubmit={handleSubmit}>
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
                  value={formData.username}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-user" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Nom"
                  type="text"
                  name="nom_utilisateur"
                  value={formData.nom_utilisateur}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-user" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Prenom"
                  type="text"
                  name="prenom_utilisateur"
                  value={formData.prenom_utilisateur}
                  onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
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
                  value={formData.password}
                  onChange={handleChange}
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
                  onChange={handlePhotoChange}
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
                  placeholder="Phone Number"
                  type="text"
                  name="numero_de_telephone"
                  value={formData.numero_de_telephone}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label for="roles">Grade</Label>
              <CustomInput
                type="select"
                name="grade"
                id="role-select" 
                value={formData.grade}
                onChange={handleRoleChange}
              >
                {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.value}</option>
                ))}
              </CustomInput>
            </FormGroup>
           
            <div className="text-center">
              <Button className="mt-4" color="primary" onSubmit={handleSubmit}>
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
