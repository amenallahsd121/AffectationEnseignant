import axios from "axios";

const url = "http://127.0.0.1:8000/api";


/////////////////////////////////////////////////////////////  NIVEAU  ////////////////////////////////////////////////////////////////////////


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


/////////////////////////////////////////////////////////////  CLASSE  ////////////////////////////////////////////////////////////////////////


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


/////////////////////////////////////////////////////////////  CONGES  ////////////////////////////////////////////////////////////////////////


export const getCongess = async (id) => {
  let apiUrl = `${url}/congess`;

  if (id) {
    apiUrl += `/${id}`;
  }
    return await axios.get(apiUrl);

};

export const getConges = async (id) => {
  return await axios.get(`${url}/conges/${id}`);
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


/////////////////////////////////////////////////////////////  USER  ////////////////////////////////////////////////////////////////////////


export const getUsers = async (id) => {
  let apiUrl = `${url}/user`;

  if (id) {
    apiUrl += `/${id}`;
  }
    return await axios.get(apiUrl);

};


/////////////////////////////////////////////////////////////  AFFECTATION  ////////////////////////////////////////////////////////////////////////


export const getAffectations = async (id) => {
  let apiUrl = `${url}/affectation`;

  if (id) {
    apiUrl += `/${id}`;
  }
    return await axios.get(apiUrl);

};

export const getAffectation = async (id) => {
  return await axios.get(`${url}/affectation/${id}`);
};

export const addAffectation = async (Affectation) => {
  console.log(Affectation);
  return await axios.post(url + "/affectation/add/", Affectation, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateAffectation = async (id, Affectation) => {
  console.log(`${url}/update/${id}`);
  return await axios.put(`${url}/affectation/update/${id}`, Affectation, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteAffectation = async (id) => {
  return await axios.delete(`${url}/affectation/delete/${id}`);
};


//////////////////////////////////////////////////////////  MODULE  ////////////////////////////////////////////////////////////////////


export const getModules = async (id) => {
  let apiUrl = `${url}/module`;

  if (id) {
    apiUrl += `/${id}`;
  }
    return await axios.get(apiUrl);

};


//////////////////////////////////////////////////////////  CONFIGURATION  ////////////////////////////////////////////////////////////////////


export const getConfigurations = async (id) => {
  let apiUrl = `${url}/configuration`;

  if (id) {
    apiUrl += `/${id}`;
  }
    return await axios.get(apiUrl);

};

export const getConfiguration = async (id) => {
  return await axios.get(`${url}/configuration/${id}`);
};

export const addConfiguration = async (Configuration) => {
  console.log(Configuration);
  return await axios.post(url + "/configuration/add/", Configuration, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateConfiguration = async (id, Configuration) => {
  console.log(`${url}/update/${id}`);
  return await axios.put(`${url}/configuration/update/${id}`, Configuration, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteConfiguration = async (id) => {
  return await axios.delete(`${url}/configuration/delete/${id}`);
};