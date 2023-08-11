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
import { getCongess } from "../../../service/api";
import { useNavigate } from "react-router-dom";

const Conges = () => {
  const [congesData, setCongesData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCongess();
        console.log("API Response:", response.data);
        setCongesData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAffecterClick = () => {
    navigate("/admin/ajouterconges");
  };

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
                    <CardTitle>User: {conges.user}</CardTitle>
                    <CardTitle>Type: {conges.type}</CardTitle>
                    <CardTitle>Durée: {conges.duree} Jour(s)</CardTitle>
                    <CardTitle>Date Début: {conges.datedebut}</CardTitle>
                    <CardTitle>Date Fin: {conges.datefin}</CardTitle>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                  >
                    <Button color="info" type="button">
                      Modifier
                    </Button>
                    <Button
                      color="danger"
                      type="button"
                      style={{ marginLeft: "10px" }}
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
