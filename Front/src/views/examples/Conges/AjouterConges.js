import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Container,
  Row,
  Col,
  Input,
} from "reactstrap";
import Header from "components/Headers/Header";
import "react-datepicker/dist/react-datepicker.css"; // Import the default styles
import { getUsers, addConges } from "../../../service/api";
import { useNavigate } from "react-router-dom";

const AjouterConges = () => {
  
  const [startDate, setStartDate] = useState(null);
  const [finDate, setFintDate] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(""); // Add this line
  const [selectedType, setSelectedType] = useState(""); // Add this line

  const differenceInDays =
    startDate && finDate
      ? Math.floor((finDate - startDate) / (1000 * 60 * 60 * 24))
      : 0;

  const navigate = useNavigate();
  const handleAnnulerClick = () => {
    navigate("/admin/conges");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleAjouterClick = async () => {
    try {
      const selectedUser = users.find(user => user.id === parseInt(selectedUserId));
      const congesData = {
        user: selectedUser.id,
        type: selectedType,
        duree: differenceInDays,
        datedebut: startDate ? startDate.toISOString().split("T")[0] : null,
        datefin: finDate ? finDate.toISOString().split("T")[0] : null,
      };

      const response = await addConges(congesData);
      console.log("API Response:", response.data);

      navigate("/admin/conges");
    } catch (error) {
      console.error("Error adding conges:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-secondary" style={{ minHeight: "100vh" }}>
        <Container className="mt--7" fluid>
          <Row style={{ marginTop: "150px" }} className="justify-content-center">
            <Col lg="10">
              <Card className="shadow p-4">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Affecter un congé</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Informations du congé
                    </h6>

                    <Row>
                      <Col xs="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="personne"
                          >
                            Personne concernée
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="personne"
                            type="select"
                            onChange={(e) => setSelectedUserId(e.target.value)}
                          >
                            <option value="" disabled selected>
                              Sélectionnez la personne
                            </option>
                            {users.map((user) => (
                              <option key={user.id} value={user.id}>
                                {user.prenom_utilisateur} {user.nom_utilisateur}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="typeconges"
                          >
                            Type du congé
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="typeconges"
                            type="select"
                            onChange={(e) => setSelectedType(e.target.value)}
                          >
                            <option value="" disabled selected>
                              Sélectionnez le type
                            </option>
                            <option>Maternité</option>
                            <option>Maladie</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="nombredeclasse"
                          >
                            Nombre des jours
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="nombredeclasse"
                            placeholder=""
                            type="text"
                            value={differenceInDays} // Display calculated difference here
                            readOnly // Make the input read-only
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs="6">
                        <FormGroup>
                          <label className="form-control-label">Date de début</label>
                          <Input
                            className="form-control-alternative"
                            type="date"
                            value={startDate ? startDate.toISOString().split("T")[0] : ""}
                            onChange={(e) => setStartDate(new Date(e.target.value))}
                          />
                        </FormGroup>
                      </Col>
                      <Col xs="6">
                        <FormGroup>
                          <label className="form-control-label">Date de reprise</label>
                          <Input
                            className="form-control-alternative"
                            type="date"
                            value={finDate ? finDate.toISOString().split("T")[0] : ""}
                            onChange={(e) => setFintDate(new Date(e.target.value))}
                            min={startDate ? startDate.toISOString().split("T")[0] : ""}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row className="justify-content-center">
                      <Col xs="12" className="text-center">
                        <Button color="primary" onClick={handleAjouterClick}>
                          Affecter
                        </Button>
                        <Button
                          color="primary"
                          onClick={handleAnnulerClick}
                          size="mg"
                        >
                          Annuler
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AjouterConges;
