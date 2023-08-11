import React, { useState, useEffect } from "react";
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Row,
  Button,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import { deleteClasse, getClasses } from "../../../service/api";
import { useNavigate } from "react-router-dom";

const Classes = () => {
  const navigate = useNavigate();
  const [classesData, setClassesData] = useState([]);
  const handleAjouterClick = () => {
    navigate("/admin/ajouterclasse");
  };

  const fetchData = async () => {
    try {
      const response = await getClasses();
      setClassesData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleModifierClick = (Classeid) => {
    navigate(`/admin/modifierclasse/${Classeid}`);
  };

  const handleSupprimerClick = async (Classeid) => {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer cette classe ?"
    );
    if (confirmDelete) {
      try {
        await deleteClasse(Classeid);
        fetchData(); 
      } catch (error) {
        console.error("Error deleting classe:", error);
      }
    }
  };



  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
      <Row style={{ marginTop: '150px' }} className="justify-content-center" >
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between">
                <h3 className="mb-0">Classes</h3>
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
                      Nom de classe
                    </th>
                    <th className="text-center">Niveau Relatif</th>
                    <th
                      className="text-right"
                      style={{ paddingRight: "193px" }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {classesData.map((classe, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td style={{ verticalAlign: "middle" }}>{classe.nom}</td>
                      <td
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-success" />
                          {classe.niveau_nom}
                        </Badge>
                      </td>
                      <td className="text-right">
                        <Button
                          className="mr-2"
                          color="info"
                          size="sm"
                          style={{ marginLeft: "20px" }}
                          onClick={() => handleModifierClick(classe.id)}
                        >
                          Modifier
                        </Button>
                        <Button
                          className="mr-7"
                          color="danger"
                          size="sm"
                          style={{ marginLeft: "20px" }}
                          onClick={() => handleSupprimerClick(classe.id)}
                        >
                          Supprimer
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {/* ... */}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Classes;
