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
import Header from "components/Headers/Header";
import { getNiveaux, deleteNiveau } from "../../../service/api";
import { useNavigate } from "react-router-dom";

const Niveaux = () => {
  const navigate = useNavigate();

  const handleAjouterClick = () => {
    navigate("/admin/ajouterniveau");
  };

  const handleModifierClick = (niveauId) => {
    navigate(`/admin/modifierniveau/${niveauId}`);
  };

 const handleSupprimerClick = async (niveauId) => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer ce niveau ?");
    if (confirmDelete) {
      try {
        await deleteNiveau(niveauId);
        fetchData();
      } catch (error) {
        console.error("Error deleting niveau:", error);
      }
    }
  };

  const [niveauxData, setNiveauxData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getNiveaux();
      setNiveauxData(response.data);
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
      <Row style={{ marginTop: '150px' }} className="justify-content-center" >
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between">
                <h3 className="mb-0">Niveaux</h3>
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
                      Nom du niveau
                    </th>
                    <th className="text-center">Nombre des classes</th>
                    <th
                      className="text-right"
                      style={{ paddingRight: "193px" }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {niveauxData.map((niveau, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td style={{ verticalAlign: "middle" }}>{niveau.nom}</td>
                      <td
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-success" />
                          {niveau.nombreclasse}
                        </Badge>
                      </td>
                      <td className="text-right">
                        <Button
                          className="mr-2"
                          color="info"
                          size="sm"
                          style={{ marginLeft: "20px" }}
                          onClick={() => handleModifierClick(niveau.id)}
                        >
                          Modifier
                        </Button>
                        <Button
                          className="mr-7"
                          color="danger"
                          size="sm"
                          style={{ marginLeft: "20px" }}
                          onClick={() => handleSupprimerClick(niveau.id)}
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

export default Niveaux;
