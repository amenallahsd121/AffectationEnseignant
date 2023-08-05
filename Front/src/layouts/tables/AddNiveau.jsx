import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { addNiveau } from "../../service/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddNiveau = () => {
  const [nom, setNom] = useState("");
  const [nombreclasse, setNombreclasse] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nom", nom);
      formData.append("nombreclasse", nombreclasse);
      await addNiveau(formData);
      navigate("/Niveaux");
    } catch (error) {
      // Handle error
      console.error("Error adding Niveau : ", error);
      throw error;
    }
  };

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Nom du niveau</Form.Label>
            <Form.Control type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formDate">
            <Form.Label>Nombre de classes</Form.Label>
            <Form.Control
              type="text"
              value={nombreclasse}
              onChange={(e) => setNombreclasse(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Niveau
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default AddNiveau;
