import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { getClasses } from "../../../../service/api";

function BillingInformation() {
  const [billingData, setBillingData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getClasses();
        console.log("API Response:", response.data);
        setBillingData(response.data);
      } catch (error) {
        console.error("Error fetching class data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <Box id="billing-information">
      <h6 style={{ fontWeight: "medium" }}>Classes</h6>
      <Box pt={1} pb={2}>
        {billingData.map((item) => (
          <Card key={item.id} variant="outlined" style={{ marginBottom: "16px" }}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Box flex="1">
                  <p>
                    <strong>Nom du Classe :</strong> {item.nom}
                  </p>
                  <p>
                    <strong>Niveau :</strong> {item.niveau_nom}
                  </p>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: "8px", color: "white" }}
                  >
                    Modifier
                  </Button>
                  <Button variant="contained" style={{ backgroundColor: "red", color: "white" }}>
                    Supprimer
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default BillingInformation;
