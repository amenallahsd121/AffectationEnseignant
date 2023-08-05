import React, { useState, useEffect } from "react";
import { getNiveaux, deleteNiveau } from "../../../service/api";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */

export default function DataTable() {
  const navigate = useNavigate();
  const [dataRows, setDataRows] = useState([]);

  const fetchData = () => {
    getNiveaux()
      .then((response) => {
        const newDataRows = response.data.map((item) => ({
          id: item.id,
          nom: item.nom,
          nombreclasse: item.nombreclasse,
        }));
        setDataRows(newDataRows);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleButtonClick1 = (id) => {
    navigate(`/updateNiveau/${id}`);
  };

  const handleButtonClick2 = (id) => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer ?");
    if (confirmDelete) {
      deleteNiveau(id)
        .then(() => {
          fetchData(); // Fetch data again after successful deletion
          navigate(`/Niveaux`);
        })
        .catch((error) => {
          console.error("Error deleting Niveau:", error);
        });
    }
  };

  return {
    columns: [
      {
        Header: "Nom",
        accessor: "nom",
        width: "30%",
        align: "center",
        Cell: ({ value }) => <div style={{ fontSize: "18px", fontWeight: "bold" }}>{value}</div>,
      },
      {
        Header: "Nombre de classe",
        accessor: "nombreclasse",
        width: "30%",
        align: "center",
        Cell: ({ value }) => <div style={{ fontSize: "18px", fontWeight: "bold" }}>{value}</div>,
      },
      {
        Header: "Action",
        accessor: "action",
        width: "40%",
        align: "center",
        Cell: ({ row }) => (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={() => handleButtonClick1(row.original.id)}
              style={{
                backgroundColor: "blue", // Change the background color to blue
                color: "white",
                padding: "8px 16px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginRight: "8px",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              Modifier
            </button>
            <button
              onClick={() => handleButtonClick2(row.original.id)}
              style={{
                backgroundColor: "red", // Change the background color to red
                color: "white",
                padding: "8px 16px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              Supprimer
            </button>
          </div>
        ),
      },
    ],
    rows: dataRows,
  };
}
