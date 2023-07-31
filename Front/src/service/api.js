import axios from 'axios';

const url = "http://127.0.0.1:8000/api";


export const getNiveaux = async (id) => {
    id = id || '';
    return await axios.get(`${url}/${id}`);
}
export const addNiveau = async (Niveau) => {
    console.log(book);
    return await axios.post(url+"/add/",Niveau,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
}
export const updateNiveau = async (id, Niveau) => {
    console.log(`${url}/update/${id}`);
    return await axios.put(`${url}/update/${id}`,Niveau,{
        headers: {
          'Content-Type': 'multipart/form-data',
        }});
}
export const deleteNiveau = async (id) => {
    return await axios.delete(`${url}/delete/${id}`);
}