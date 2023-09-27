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
  try {
    const response = await axios.post(url+ "login", Utilisateur, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Login response:", response.data);
    // Stockez le token dans localStorage
    localStorage.setItem('userToken', response.data.token);
    return response.data;
  } catch (error) {
    console.error("Error while logging in:", error);
    throw error;
  }
};

export const user_logout = async () => {
  console.log("Sending logout request...");
  try {
    // Récupérez le token depuis localStorage
    const userToken = localStorage.getItem('userToken');

    const config = {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    };

    const response = await axios.post(url+"logout", {}, config);

    console.log("logout response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error while logging out:", error);
    throw error;
  }
};


export const getLoggedInUserInfo = async () => {
  console.log("Sending user_info request...");
  try {
    // Récupérez le token depuis localStorage
    const userToken = localStorage.getItem('userToken');

    const response = await axios.get(url+"user-info", {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    });

    console.log("User info response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error while fetching user info:", error);
    throw error;
  }
};



export const list_users = async () => {
   
    console.log("Sending list_users request...");
    try {
      const response = await axios.get(url+"list_users");
      console.log("List users response:", response.data);
      console.log("Returned response data:", response);
      return response.data;
    } catch (error) {
      console.error("Error while fetching users:", error);
      throw error;
    }
  };

export const list_user = async (id) => {
    console.log("Sending list_user details request...");
    try {
      const response = await axios.get(url+"list_user/"+id);
      console.log("List user details response:", response.data);
      console.log("Returned response data:", response);
      return response.data;
    } catch (error) {
      console.error("Error while fetching user:", error);
      throw error;
    }
  };

  export const update_user = async (id, Utilisateur) => {
    id = id || "update_user";
    console.log("Updating user:", id);
    console.log("Update data:", Utilisateur);
    
    try {
      console.log("Sending update_user request...");
      const response = await axios.put(url+"update_user/"+id, Utilisateur, {
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
    return await axios.delete(url+"delete_user/"+id);
  };
  

//Option

export const getOptions = async () => {
  return await axios.get(url+"options");
};


export const getOption = async (id) => {
  console.log("Sending option details request...");
  try {
    const response = await axios.get(url+"option/"+id);
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
  return await axios.put(url+"options/update/"+id, Option, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteOption = async (id) => {
  return await axios.delete(url+"options/delete/"+id);
};


//Competence
export const getCompetences = async () => {
  return await axios.get(url+"competences");
};


export const getCompetence = async (id) => {
  console.log("Sending option details request...");
  try {
    const response = await axios.get(url+"competence/"+id);
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
  return await axios.put(url+"competences/update/"+id, Competence, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteCompetence = async (id) => {
  return await axios.delete(url+"competences/delete/"+id);
};


//Module 
export const getModules = async () => {
  return await axios.get(url+"modules");
};


export const getModule = async (id) => {
  console.log("Sending module details request...");
  try {
    const response = await axios.get(url+"module/"+id);
    console.log("List module details response:", response.data);
    console.log("Returned response data:", response);
    return response.data;
  } catch (error) {
    console.error("Error while fetching module:", error);
    throw error;
  }
};

export const addModule = async (Module) => {
  console.log("Module to be sent:", Module);
  try {
    const response = await axios.post(url + "modules/add", Module, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
    
    console.log("API Response:", response.data);
    return response;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const updateModule = async (id, Module) => {
  console.log("Module to be sent:", Module);
  
  try {
    const response = await axios.put(url+"modules/update/"+id, Module, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("API Response:", response.data);
    return response;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};


export const deleteModule = async (id) => {
  return await axios.delete(url+"modules/delete/"+id);
};

