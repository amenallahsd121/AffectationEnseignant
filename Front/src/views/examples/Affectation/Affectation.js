import React, { useState, useEffect } from "react";
import {
  Badge,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Button,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import { deleteAffectation, getAffectations } from "../../../service/api"; 
import { useNavigate } from "react-router-dom";

const Affectation = () => {
  const navigate = useNavigate();
  const [affectationsData, setAffectationsData] = useState([]);

  const handleAjouterClick = () => {
    navigate("/admin/ajouteraffectation");
  };

  const fetchData = async () => {
    try {
      const response = await getAffectations();
      setAffectationsData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleModifierClick = (AffectationId) => {
    navigate(`/admin/modifieraffectation/${AffectationId}`);
  };

  const handleSupprimerClick = async (AffectationId) => {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer cette affectation ?"
    );
    if (confirmDelete) {
      try {
        await deleteAffectation(AffectationId);
        fetchData();
      } catch (error) {
        console.error("Error deleting affectation:", error);
      }
    }
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row style={{ marginTop: '150px' }} className="justify-content-center">
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between">
                <h3 className="mb-0">Affectation d'Enseignant</h3>
                <Button
                  className="mr-6 btn-success btn-lg"
                  color="success"
                  size="sm"
                  onClick={handleAjouterClick}
                >
                  Affecter
                </Button>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col" />
                    <th className="text-left" style={{ paddingLeft: "33px" }}>
                        Nom Enseignant
                    </th>
                    <th className="text-center">Module Relatif</th>
                    <th className="text-right" style={{ paddingRight: "193px" }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {affectationsData.map((affectation, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td style={{ verticalAlign: "middle" }}>{affectation.prenomuser} {affectation.nomuser}</td>
                      <td
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        <Badge color="" className="badge-dot mr-4">
                         
                          {affectation.nommodule}
                        </Badge>
                      </td>
                      <td className="text-right">
                        <Button
                          className="mr-2"
                          color="info"
                          size="sm"
                          style={{ marginLeft: "20px" }}
                          onClick={() => handleModifierClick(affectation.id)}
                        >
                          Modifier
                        </Button>
                        <Button
                          className="mr-7"
                          color="danger"
                          size="sm"
                          style={{ marginLeft: "20px" }}
                          onClick={() => handleSupprimerClick(affectation.id)}
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

export default Affectation;
