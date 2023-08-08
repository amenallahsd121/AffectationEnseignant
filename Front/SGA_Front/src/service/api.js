import axios from "axios";

const url = "http://127.0.0.1:8000/";

export const register_user_api_view = async (Utilisateur) => {
  console.log("Sending registration request:", Utilisateur);
  try {
    return await axios.post(url + "register", Utilisateur, {
        headers: {
            "Content-Type": "multipart/form-data",
          },
    });
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const user_login = async (Utilisateur) => {
  console.log("Sending login request:", Utilisateur);
    return await axios.post(url + "login", Utilisateur, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

export const list_users = async (id) => {
    id = id || "list_users";
    console.log("Sending list_users request...");
    try {
      const response = await axios.get(`${url}/${id}`);
      console.log("List users response:", response.data);
      console.log("Returned response data:", response);
      return response.data;
    } catch (error) {
      console.error("Error while fetching users:", error);
      throw error;
    }
  };

  export const list_user = async (id) => {
    id = id || "list_user";
    console.log("Sending list_user details request...");
    try {
      const response = await axios.get(`${url}/list_user/${id}`);
      console.log("List user details response:", response.data);
      console.log("Returned response data:", response);
      return response.data;
    } catch (error) {
      console.error("Error while fetching users:", error);
      throw error;
    }
  };

  export const update_user = async (id, Utilisateur) => {
    id = id || "update_user";
    console.log("Updating user:", id);
    console.log("Update data:", Utilisateur);
    
    try {
      console.log("Sending update_user request...");
      const response = await axios.put(`${url}/update_user/${id}`, Utilisateur, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("Update user response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error while updating user:", error);
      throw error;
    }
  };
  


  export const delete_user = async (id) => {
    return await axios.delete(`${url}/delete_user/${id}`);
  };
  