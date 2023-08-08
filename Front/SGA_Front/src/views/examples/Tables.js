/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
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
import { list_users } from "service/api";
import { useNavigate } from "react-router-dom";
import { delete_user } from "service/api";

const Utilisateurs = () => {
  const navigate = useNavigate();

  const handleAjouterClick = () => {
    navigate("/auth/register");
  };

  const handleModifierClick = (utilisateurId) => {
     navigate(`/admin/modifierUtilisateur/${utilisateurId}`);
  }; 

  const handleSupprimerClick = async (utilisateurId) => {
    try {
      await delete_user(utilisateurId);
      fetchData();
    } catch (error) {
      console.error("Error deleting niveau:", error);
    }
  };

  const [utilisateursData, setUtilisateursData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await list_users();
      //console.log("API Response:", response.data);
      setUtilisateursData(response); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  //console.log(utilisateursData)

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between">
                <h3 className="mb-0">Utilisateurs</h3>
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
                      Pseudo
                    </th>
                    <th className="text-center">Nom</th>
                    <th className="text-center">Prenom</th>
                    <th className="text-center">Email</th>
                    <th className="text-center">Grade</th>
                    <th
                      className="text-right"
                      style={{ paddingRight: "193px" }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {utilisateursData?.map((utilisateur, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td style={{ verticalAlign: "middle" }}>{utilisateur.username}</td>
                      <td style={{ verticalAlign: "middle" }}>{utilisateur.nom_utilisateur}</td>
                      <td style={{ verticalAlign: "middle" }}>{utilisateur.prenom_utilisateur}</td>
                      <td style={{ verticalAlign: "middle" }}>{utilisateur.email}</td>
                      <td style={{ verticalAlign: "middle" }}>{utilisateur.grade}</td>
                      <td className="text-right">
                        <Button
                          className="mr-2"
                          color="info"
                          size="sm"
                          style={{ marginLeft: "20px" }}
                          onClick={() => handleModifierClick(utilisateur.id)}
                        >
                          Modifier
                        </Button>
                        <Button
                          className="mr-7"
                          color="danger"
                          size="sm"
                          style={{ marginLeft: "20px" }}
                          onClick={() => handleSupprimerClick(utilisateur.id)}
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

export default Utilisateurs;