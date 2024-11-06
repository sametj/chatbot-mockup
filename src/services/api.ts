import axios from "axios";



const api = axios.create({

  baseURL: 'http://localhost:8102',

})

export default api;