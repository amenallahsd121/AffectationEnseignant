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
import { getModules, deleteModule } from "service/api";
import { useNavigate } from "react-router-dom";

const Modules = () => {
  const navigate = useNavigate();

  const handleAjouterClick = () => {
    navigate("/admin/ajoutermodule");
  };

  const handleModifierClick = (moduleId) => {
    navigate(`/admin/modifiermodule/${moduleId}`);
  };

  const handleSupprimerClick = async (moduleId) => {
    try {
      await deleteModule(moduleId);
      fetchData();
    } catch (error) {
      console.error("Erreur lors de la suppression du module :", error);
    }
  };

  const [modulesData, setModulesData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getModules();
      setModulesData(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des modukes:", error);
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
                <h3 className="mb-0">Modules</h3>
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
                      Nom
                    </th>
                    <th className="text-center">Description </th>
                    <th className="text-center">Heures d'enseignement </th>
                    <th className="text-center">Compétences </th>
                    <th className="text-center">Nombres d'ECTS </th>
                    <th className="text-center">Fiche module </th>
                    <th className="text-center">Nombres d'enseignants à affecter </th>
                    <th className="text-center">Responsable module </th>
                    <th
                      className="text-right"
                      style={{ paddingRight: "193px" }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {modulesData?.map((module, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td style={{ verticalAlign: "middle" }}>{module.nom}</td>
                      <td style={{ verticalAlign: "middle" }}>{module.description}</td>
                      <td style={{ verticalAlign: "middle" }}>{module.heures_enseignement}</td>
                      <td style={{ verticalAlign: "middle" }}>{module.competences}</td>
                      <td style={{ verticalAlign: "middle" }}>{module.ects}</td>
                      <td style={{ verticalAlign: "middle" }}>{module.fiche_module}</td>
                      <td style={{ verticalAlign: "middle" }}>{module.enseignants_a_affecter}</td>
                      <td style={{ verticalAlign: "middle" }}>{module.responsable_module}</td>                    

                      <td className="text-right">
                      <Button
                          className="mr-2"
                          color="info"
                          size="sm"
                          style={{ marginLeft: "20px" }}
                          onClick={() => handleModifierClick(module.id)}
                        >
                          Modifier
                        </Button>
                        <Button
                          className="mr-7"
                          color="danger"
                          size="sm"
                          style={{ marginLeft: "20px" }}
                          onClick={() => handleSupprimerClick(module.id)}
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

export default Modules;