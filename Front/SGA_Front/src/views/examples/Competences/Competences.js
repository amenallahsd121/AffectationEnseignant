import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Button,
} from "reactstrap";
import Header from "components/Headers/Header";
import { getCompetences, deleteCompetence } from "service/api";
import { useNavigate } from "react-router-dom";

const Competences = () => {
  const navigate = useNavigate();

  const handleAjouterClick = () => {
    navigate("/admin/ajoutercompetence");
  };

  const handleModifierClick = (competenceId) => {
    navigate(`/admin/modifiercompetence/${competenceId}`);
  };

  const handleSupprimerClick = async (competenceId) => {
    try {
      await deleteCompetence(competenceId);
      fetchData();
    } catch (error) {
      console.error("Erreur lors de la suppression de la competence :", error);
    }
  };

  const [competencesData, setCompetencesData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getCompetences();
      setCompetencesData(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des competences:", error);
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
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between">
                <h3 className="mb-0">Compétences</h3>
                <Button
                  className="mr-6 btn-success btn-lg"
                  color="success"
                  size="sm"
                  onClick={handleAjouterClick}
                >
                  Ajouter
                </Button>
              </CardHeader>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col" />
                    <th className="text-left" style={{ paddingLeft: "0px" }}>
                      Nom de la compétence
                    </th>
                    <th className="text-center">Description</th>
                    <th
                      className="text-right"
                      style={{ paddingRight: "193px" }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {competencesData?.map((competence, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                        <td style={{ verticalAlign: "middle" }}>{competence.nom}</td>
                        <td style={{ verticalAlign: "middle"}}>{competence.description}</td>
                      <td className="text-right">
                        <Button
                          className="mr-2"
                          color="info"
                          size="sm"
                          style={{ marginLeft: "20px" }}
                          onClick={() => handleModifierClick(competence.id)}
                        >
                          Modifier
                        </Button>
                        <Button
                          className="mr-7"
                          color="danger"
                          size="sm"
                          style={{ marginLeft: "20px" }}
                          onClick={() => handleSupprimerClick(competence.id)}
                        >
                          Supprimer
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Competences;