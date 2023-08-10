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
import { getOptions, deleteOption } from "service/api";
import { useNavigate } from "react-router-dom";

const Options = () => {
  const navigate = useNavigate();

  const handleAjouterClick = () => {
    navigate("/admin/ajouteroption");
  };

  const handleModifierClick = (optionId) => {
    navigate(`/admin/modifieroption/${optionId}`);
  };

  const handleSupprimerClick = async (optionId) => {
    try {
      await deleteOption(optionId);
      fetchData();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'option :", error);
    }
  };

  const [optionsData, setOptionsData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getOptions();
      setOptionsData(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des options:", error);
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
                <h3 className="mb-0">Options</h3>
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
                      Nom de l'option
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
                  {optionsData?.map((option, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td style={{ verticalAlign: "middle" }}>{option.nom}</td>
                      <td
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        <Badge color="" className="badge-dot mr-4">
                          {option.nb_classes}
                        </Badge>
                      </td>
                      <td className="text-right">
                      <Button
                          className="mr-2"
                          color="info"
                          size="sm"
                          style={{ marginLeft: "20px" }}
                          onClick={() => handleModifierClick(option.id)}
                        >
                          Modifier
                        </Button>
                        <Button
                          className="mr-7"
                          color="danger"
                          size="sm"
                          style={{ marginLeft: "20px" }}
                          onClick={() => handleSupprimerClick(option.id)}
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

export default Options;