import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
} from "reactstrap";
import Header from "components/Headers/Header";
import { useState, useEffect } from "react";
import { deleteConges, getCongess } from "../../../service/api";
import { useNavigate } from "react-router-dom";

const Conges = () => {
  const navigate = useNavigate();

  const handleAffecterClick = () => {
    navigate("/admin/ajouterconges");
  };

  const handleModifierClick = (congesId) => {
    navigate(`/admin/modifierconges/${congesId}`);
  };

  const handleSupprimerClick = async (congesId) => {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer ce congé ?"
    );
    if (confirmDelete) {
      try {
        await deleteConges(congesId);
        fetchData(); 
      } catch (error) {
        console.error("Error deleting congé:", error);
      }
    }
  };

  const [congesData, setCongesData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getCongess();
      setCongesData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 



  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col lg="12">
            <div className="d-flex justify-content-end mb-3">
              <Button
                color="success"
                onClick={handleAffecterClick}
                style={{ marginTop: "130px" }}
              >
                Affecter Congés
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          {congesData.map((conges, index) => (
            <Col lg="4" key={index}>
              <Card
                style={{
                  width: "22rem",
                  marginLeft: "10px",
                  marginTop: "40px",
                }}
              >
                <CardBody>
                  <div style={{ textAlign: "center" }}>
                    <CardTitle>Nom & Prénom : {conges.nom} {conges.prenom} </CardTitle>
                    <CardTitle>Type du congé: {conges.type}</CardTitle>
                    <CardTitle>Durée: {conges.duree} Jour(s)</CardTitle>
                    <CardTitle>Date Début: {conges.datedebut}</CardTitle>
                    <CardTitle>Date Reprise: {conges.datefin}</CardTitle>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                  >
                    <Button color="info" type="button"
                    onClick={() => handleModifierClick(conges.id)}>
                      Modifier
                        
                    </Button>
                    <Button
                      color="danger"
                      type="button"
                      style={{ marginLeft: "10px" }}
                      onClick={() => handleSupprimerClick(conges.id)}
                    >
                      Supprimer
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Conges;
