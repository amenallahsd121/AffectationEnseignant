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
import { useNavigate } from "react-router-dom";
import { getConfigurations, deleteConfiguration } from "../../../service/api";

const Configuration = () => {
  const navigate = useNavigate();
  const [configurations, setConfigurations] = useState([]);

  const fetchConfigurations = async () => {
    try {
      const response = await getConfigurations();

      const modifiedConfigurations = response.data.map((configuration) => ({
        ...configuration,
      }));

      modifiedConfigurations.sort((a, b) => {
        const numA = parseInt(a.Année_Universitaire, 10);
        const numB = parseInt(b.Année_Universitaire, 10);
        return numB - numA;
      });

      setConfigurations(modifiedConfigurations);
    } catch (error) {
      console.error("Error fetching configurations:", error);
    }
  };

  const handleAjouterClick = () => {
    navigate("/admin/ajouterconfiguration");
  };

  const handleSupprimerClick = async (configurationId) => {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer cette Configuration ?"
    );
    if (confirmDelete) {
      try {
        await deleteConfiguration(configurationId);
        fetchConfigurations();
      } catch (error) {
        console.error("Error deleting configuration:", error);
      }
    }
  };

  const handleModifierClick = async (configurationId) => {
    navigate(`/admin/modifierconfiguration/${configurationId}`);
  };

  useEffect(() => {
    fetchConfigurations();
  }, []);


  const formatAnnéeUniversitaire = (année) => {
    const [startYear, endYear] = année.split("/");
    return `${startYear}/${endYear}`;
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row style={{ marginTop: "150px" }} className="justify-content-center">
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between">
                <h3 className="mb-0">Configuration</h3>
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
                      Année Universitaire
                    </th>
                    <th className="text-center">Date Début</th>
                    <th className="text-center">Date Fin</th>
                    <th
                      className="text-center"
                      style={{ paddingRight: "38px" }}
                    >
                      Etat
                    </th>
                    <th
                      className="text-right"
                      style={{ paddingRight: "193px" }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {configurations.map((configuration) => (
                    <tr key={configuration.id}>
                      <th scope="row"></th>
                      <td style={{ verticalAlign: "middle" }}>
                        {formatAnnéeUniversitaire(configuration.Année_Universitaire)}
                      </td>
                      <td
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        {formatDate(configuration.DD_Annee)}
                      </td>
                      <td
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        {formatDate(configuration.DF_Annee)}
                      </td>
                      <td
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        <Badge color="" className="badge-dot mr-4">
                          {configuration.Archive === "Archivée" ? (
                            <i className="bg-success"></i>
                          ) : (
                            <i className="bg-danger"></i>
                          )}
                          {configuration.Archive}
                        </Badge>
                      </td>
                      <td className="text-right">
                        <Button
                          className="mr-2"
                          color="info"
                          size="sm"
                          style={{ marginLeft: "20px" }}
                          onClick={() => handleModifierClick(configuration.id)}
                        >
                          Modifier
                        </Button>
                        <Button
                          className="mr-7"
                          color="danger"
                          size="sm"
                          style={{ marginLeft: "20px" }}
                          onClick={() => handleSupprimerClick(configuration.id)}
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

export default Configuration;
