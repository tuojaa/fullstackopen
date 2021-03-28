import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAllPersons = () => {
    return axios.get(baseUrl)
}
  
const createPerson = person => {
    return axios.post(baseUrl, person)
}
  
const updatePerson = (id, person) => {
    return axios.put(`${baseUrl}/${id}`, person)
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const personService = { 
    getAllPersons,
    createPerson,
    updatePerson,
    deletePerson
}

export default personService