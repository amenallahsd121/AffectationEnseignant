/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import React from "react";
import { useNavigate } from "react-router-dom";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

function Tables() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/AddNiveau");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                position="relative"
                display="flex" // Add display flex
                alignItems="center" // Center align vertically
              >
                <MDTypography variant="h6" color="white">
                  Liste des niveaux
                  <button
                    onClick={handleButtonClick}
                    style={{
                      backgroundColor: "blue", // Change to green color
                      color: "white",
                      padding: "12px 20px", // Increase padding for bigger size
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      position: "absolute",
                      top: "50%", // Adjust top to center vertically
                      transform: "translateY(-50%)", // Center vertically using translateY
                      right: "16px", // Adjust right property for spacing
                      fontSize: "14px", // Increase font size
                      fontWeight: "bold", // Set font weight to bold
                    }}
                  >
                    Ajouter
                  </button>
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Tables;
