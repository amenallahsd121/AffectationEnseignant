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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { updateConges, getConges, getUsers } from "../../../service/api";
import { useParams, useNavigate } from "react-router-dom";

const ModifierConges = () => {
  const [startDate, setStartDate] = useState(null);
  const [finDate, setFinDate] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [differenceInDays, setDifferenceInDays] = useState(0);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [users, setUsers] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleAnnulerClick = () => {
    navigate("/admin/conges");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const congessResponse = await getConges(id);

        setSelectedType(congessResponse.data.type);
        setSelectedUserId(congessResponse.data.user);
        setStartDate(new Date(congessResponse.data.datedebut));
        setFinDate(new Date(congessResponse.data.datefin));
        setDifferenceInDays(congessResponse.data.duree);

        const usersResponse = await getUsers();

        const selectedUserId = congessResponse.data.user;
        const selectedUser = usersResponse.data.find(
          (user) => user.id === selectedUserId
        );

        setSelectedUserName(
          `${selectedUser.nom_utilisateur} ${selectedUser.prenom_utilisateur} `
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (startDate && finDate) {
      const daysDifference = Math.floor((finDate - startDate) / (1000 * 60 * 60 * 24));
      setDifferenceInDays(daysDifference);
    }
  }, [startDate, finDate]);

  const handleModifierClick = async () => {
    try {
      const congessResponse = {
        user: selectedUserId,
        type: selectedType,
        duree: differenceInDays,
        datedebut: startDate.toISOString().split("T")[0],
        datefin: finDate.toISOString().split("T")[0],
      };

      const response = await updateConges(id, congessResponse);
      console.log("API Response:", response.data);

      navigate("/admin/conges");
    } catch (error) {
      console.error("Error updating congé:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-secondary" style={{ minHeight: "100vh" }}>
        <Container className="mt--7" fluid>
          <Row
            style={{ marginTop: "150px" }}
            className="justify-content-center"
          >
            <Col lg="10">
              <Card className="shadow p-4">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Modifier un congé</h3>
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
                            type="text"
                            value={selectedUserName}
                            readOnly
                          />
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
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                          >
                            <option value="" disabled>
                              Sélectionnez le type
                            </option>
                            <option value="Maternité">Maternité</option>
                            <option value="Maladie">Maladie</option>
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
                            id="nombredejours"
                            placeholder=""
                            type="text"
                            value={differenceInDays}
                            readOnly
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
        onChange={(e) => setFinDate(new Date(e.target.value))}
        min={startDate ? startDate.toISOString().split("T")[0] : ""}
      />
    </FormGroup>
  </Col>
</Row>

                   


                    <Row className="justify-content-center">
                      <Col xs="12" className="text-center">
                        <Button color="primary" onClick={handleModifierClick}>
                          Modifier
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

export default ModifierConges;
