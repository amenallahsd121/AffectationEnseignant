import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/singup-background.png";
import { register_user_api_view } from "service/api.js";

function Cover() {
  const roles = [
    { id: "1", value: "Enseignant" },
    { id: "2", value: "Coordinateur unité pédagogique" },
    { id: "3", value: "Responsable module" },
    { id: "4", value: "Responsable option" },
    { id: "5", value: "Coordiateur projet" },
    { id: "6", value: "Ched département" },
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (event) => {
    setFormData({ ...formData, photo_de_profil: event.target.files[0] });
  };

  const handleRoleChange = (event) => {
    setFormData({ ...formData, grade: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await register_user_api_view(formData);
      // Handle the response (e.g., show success message, redirect, etc.)
      console.log(response.data);
    } catch (error) {
      // Handle the error (e.g., show error message)
      console.error(error);
    }
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your information to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <form onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                name="username"
                label="Pseudo"
                variant="standard"
                fullWidth
                value={formData.username}
                onChange={handleChange}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                name="nom_utilisateur"
                label="Nom"
                variant="standard"
                fullWidth
                value={formData.nom_utilisateur}
                onChange={handleChange}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                name="prenom_utilisateur"
                label="Prénom"
                variant="standard"
                fullWidth
                value={formData.prenom_utilisateur}
                onChange={handleChange}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                name="email"
                label="Email"
                variant="standard"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                name="password"
                label="Mot de passe"
                variant="standard"
                fullWidth
                value={formData.password}
                onChange={handleChange}
                required
              />
            </MDBox>

            <MDBox mb={2}>
              <InputLabel htmlFor="role-select">Grade</InputLabel>
              <Select id="role-select" value={formData.grade} onChange={handleRoleChange}>
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.value}
                  </MenuItem>
                ))}
              </Select>
            </MDBox>

            <MDBox mb={2}>
              <InputLabel htmlFor="photo-select">Photo de profil</InputLabel>
              <MDInput
                type="file"
                id="photo-select"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </MDBox>

            <MDBox mb={2}>
              <MDInput
                type="text"
                name="numero_de_telephone"
                label="Numéro de téléphone"
                variant="standard"
                fullWidth
                value={formData.numero_de_telephone}
                onChange={handleChange}
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton type="submit" variant="gradient" color="info" fullWidth>
                Sign Up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </form>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
