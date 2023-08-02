import React, { useState, useEffect } from "react";
import { list_users } from "service/api.js";
import { useNavigate } from "react-router-dom";

export default function usersTableData() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    columns: [
      { Header: "ID", accessor: "id", width: "10%", align: "left" },
      { Header: "Username", accessor: "nom_utilisateur", width: "30%", align: "left" },
      { Header: "First Name", accessor: "prenom_utilisateur", width: "30%", align: "left" },
      { Header: "Email", accessor: "email", width: "30%", align: "left" },
      { Header: "Grade", accessor: "grade", width: "20%", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],
    rows: [],
  });

  useEffect(() => {
    // Fetch data from the API
    async function fetchData() {
      try {
        const response = await list_users();
        const users = response.data;

        // Format the data for the table
        const formattedRows = users.map((user) => ({
          id: user.id,
          nom_utilisateur: user.nom_utilisateur,
          prenom_utilisateur: user.prenom_utilisateur,
          email: user.email,
          grade: user.grade,
          action: (
            <>
              <button onClick={() => handleEdit(user.id)}>Edit</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </>
          ),
        }));

        setData((prevData) => ({ ...prevData, rows: formattedRows }));
      } catch (error) {
        // Handle API call errors
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handleEdit = (userId) => {
    // Implement your logic for handling the edit button click
    // For example, you can navigate to the edit page for the user with the given ID
    navigate(`/edit-user/${userId}`);
  };

  const handleDelete = (userId) => {
    // Implement your logic for handling the delete button click
    // For example, you can show a confirmation dialog and then make an API call to delete the user
    console.log(`Deleting user with ID: ${userId}`);
  };

  return data;
}
