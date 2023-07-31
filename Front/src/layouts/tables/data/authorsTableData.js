import React, { useState, useEffect } from "react";
import { getNiveaux } from "../../../service/api"; // Replace this with the correct path to your API file
import { useNavigate } from "react-router-dom";

export default function DataTable() {
  const navigate = useNavigate();
  const [dataRows, setDataRows] = useState([]);

  useEffect(() => {
    // Fetch data from the API using the getNiveaux function
    getNiveaux()
      .then((response) => {
        // Assuming the response.data contains an array of objects with "nom" and "nombre_de_classe" properties
        const newDataRows = response.data.map((item) => ({
          nom: item.nom,
          nombreclasse: item.nombreclasse,
        }));
        setDataRows(newDataRows);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // The empty dependency array makes this effect run only once, similar to componentDidMount

  // Function to handle button click
  const handleButtonClick1 = () => {
    // Add your logic for what happens when the first button is clicked
    navigate("/updateNiveau");
  };

  // Function to handle button click
  const handleButtonClick2 = () => {
    // Add your logic for what happens when the second button is clicked
    console.log("Button 2 clicked!");
  };
  return {
    columns: [
      {
        Header: "Nom",
        accessor: "nom",
        width: "30%",
        align: "left",
      },
      {
        Header: "Nombre de classe",
        accessor: "nombreclasse",
        width: "30%",
        align: "left",
      },
      {
        Header: "Action",
        accessor: "action",
        width: "40%",
        align: "center",
        Cell: () => (
          <>
            <button
              onClick={handleButtonClick1}
              style={{
                backgroundColor: "blue",
                color: "white",
                padding: "8px 16px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginRight: "8px",
              }}
            >
              Modifier
            </button>
            <button
              onClick={handleButtonClick2}
              style={{
                backgroundColor: "blue",
                color: "white",
                padding: "8px 16px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Supprimer
            </button>
          </>
        ),
      },
    ],
    rows: dataRows,
  };
}
