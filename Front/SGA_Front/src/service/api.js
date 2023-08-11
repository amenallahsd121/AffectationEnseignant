import axios from "axios";

const url = "http://127.0.0.1:8000/";


//Utilisateur 


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
  


  export const getLoggedInUserInfo = async () => {
    try {
      const response = await axios.get(url + 'user-info', {
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error while fetching user info:", error);
      throw error; // Handle error appropriately
    }
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

  export const list_user = async () => {
    console.log("Sending list_user details request...");
    try {
      const response = await axios.get(`${url}/list_user`);
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
  

//Option

export const getOptions = async () => {
  return await axios.get(`${url}/options`);
};


export const getOption = async (id) => {
  id = id || "option";
  console.log("Sending option details request...");
  try {
    const response = await axios.get(`${url}/option/${id}`);
    console.log("List option details response:", response.data);
    console.log("Returned response data:", response);
    return response.data;
  } catch (error) {
    console.error("Error while fetching option:", error);
    throw error;
  }
};

export const addOption = async (Option) => {
  console.log(Option);
  return await axios.post(url + "options/add", Option, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateOption = async (id, Option) => {
  console.log(`${url}/options/update/${id}`);
  return await axios.put(`${url}/options/update/${id}`, Option, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteOption = async (id) => {
  return await axios.delete(`${url}/options/delete/${id}`);
};


//Competence
export const getCompetences = async () => {
  return await axios.get(`${url}/competences`);
};


export const getCompetence = async (id) => {
  id = id || "competence";
  console.log("Sending option details request...");
  try {
    const response = await axios.get(`${url}/competence/${id}`);
    console.log("List competence details response:", response.data);
    console.log("Returned response data:", response);
    return response.data;
  } catch (error) {
    console.error("Error while fetching competence:", error);
    throw error;
  }
};

export const addCompetence = async (Competence) => {
  console.log(Competence);
  return await axios.post(url + "competences/add", Competence, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateCompetence = async (id, Competence) => {
  console.log(`${url}/competences/update/${id}`);
  return await axios.put(`${url}/competences/update/${id}`, Competence, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteCompetence = async (id) => {
  return await axios.delete(`${url}/competences/delete/${id}`);
};


//Module 
export const getModules = async () => {
  return await axios.get(`${url}/modules`);
};


export const getModule = async (id) => {
  id = id || "module";
  console.log("Sending module details request...");
  try {
    const response = await axios.get(`${url}/module/${id}`);
    console.log("List module details response:", response.data);
    console.log("Returned response data:", response);
    return response.data;
  } catch (error) {
    console.error("Error while fetching module:", error);
    throw error;
  }
};

export const addModule = async (Module) => {
  console.log(Module);
  return await axios.post(url + "modules/add", Module, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateModule = async (id, Module) => {
  console.log(`${url}/modules/update/${id}`);
  return await axios.put(`${url}/modules/update/${id}`, Module, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteModule = async (id) => {
  return await axios.delete(`${url}/modules/delete/${id}`);
};

