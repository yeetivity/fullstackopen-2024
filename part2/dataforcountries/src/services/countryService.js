import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'
const endPointAll = 'all'
const endpointSpecific = 'name'

const getAll = () => {
    return axios.get(`${baseUrl}/${endPointAll}`).then(response => response.data)
}

const getSpecific = (name) => {
    return axios.get(`${baseUrl}/${endpointSpecific}/${name}`).then(response => response.data)
}

export default { getAll, getSpecific }