import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { getNiveaux, updateNiveau } from "../../service/api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateNiveau = () => {
  let { id } = useParams();
  const [nom, setNom] = useState("");
  const [nombreclasse, setNombreclasse] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNiveau = async () => {
      try {
        const response = await getNiveaux(id);
        console.log(response.data);
        setNom(response.data.nom);
        setNombreclasse(response.data.nombreclasse);
      } catch (error) {
        console.error("Error fetching Niveau:", error);
      }
    };

    fetchNiveau();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nom", nom);
      formData.append("nombreclasse", nombreclasse);
      const response = await updateNiveau(id, formData);
      console.log(response.data);
      navigate("/Niveaux");
    } catch (error) {
      console.error("Error editing Niveau:", error);
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
            Edit Niveau
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default UpdateNiveau;
