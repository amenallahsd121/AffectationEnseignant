import axios from "axios";

const url = "http://127.0.0.1:8000/api";

//////////////////////////////////////////////////////////

export const getNiveaux = async (id) => {
  id = id || "";
  return await axios.get(`${url}/${id}`);
};

export const addNiveau = async (Niveau) => {
  console.log(Niveau);
  return await axios.post(url + "/add/", Niveau, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateNiveau = async (id, Niveau) => {
  console.log(`${url}/update/${id}`);
  return await axios.put(`${url}/update/${id}`, Niveau, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const deleteNiveau = async (id) => {
  return await axios.delete(`${url}/delete/${id}`);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getClasses = async (id) => {
  let apiUrl = `${url}/classe`;

  if (id) {
    apiUrl += `/${id}`;
  }
    return await axios.get(apiUrl);

};

export const addClasse = async (Classe) => {
  console.log(Classe);
  return await axios.post(url + "/classe/add/", Classe, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateClasse = async (id, Classe) => {
  console.log(`${url}/update/${id}`);
  return await axios.put(`${url}/classe/update/${id}`, Classe, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const deleteClasse = async (id) => {
  return await axios.delete(`${url}/classe/delete/${id}`);
};


/////////////////////////////////////////////////////////////////////


export const getCongess = async (id) => {
  let apiUrl = `${url}/congess`;

  if (id) {
    apiUrl += `/${id}`;
  }
    return await axios.get(apiUrl);

};

export const addConges = async (Conges) => {
  console.log(Conges);
  return await axios.post(url + "/conges/add/", Conges, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateConges = async (id, Classe) => {
  console.log(`${url}/update/${id}`);
  return await axios.put(`${url}/conges/update/${id}`, Classe, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const deleteConges = async (id) => {
  return await axios.delete(`${url}/conges/delete/${id}`);
};
