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
import { getClasses } from "../../../service/api";

const Classes = () => {
  const [classesData, setClassesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getClasses();
        setClassesData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

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
                <h3 className="mb-0">Classes</h3>
                <Button
                  className="mr-6 btn-success btn-lg"
                  color="success"
                  size="sm"
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
                  {classesData.map((niveau, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td style={{ verticalAlign: "middle" }}>{niveau.nom}</td>
                      <td
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-success" />
                          {niveau.niveau_nom}
                        </Badge>
                      </td>
                      <td className="text-right">
                        <Button
                          className="mr-2"
                          color="info"
                          size="sm"
                          style={{ marginLeft: "20px" }}
                        >
                          Modifier
                        </Button>
                        <Button
                          className="mr-7"
                          color="danger"
                          size="sm"
                          style={{ marginLeft: "20px" }}
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
