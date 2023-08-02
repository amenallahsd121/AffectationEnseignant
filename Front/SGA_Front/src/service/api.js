import axios from "axios";

const url = "http://127.0.0.1:8000/";

export const register_user_api_view = async (Utilisateur) => {
  return await axios.post(url + "register", Utilisateur, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const user_login = async (Utilisateur) => {
  return await axios.post(url + "login", Utilisateur, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const list_users = async () => {
  try {
    const response = await axios.get(url + "list_users");
    return response.data;
  } catch (error) {
    throw error;
  }
};
