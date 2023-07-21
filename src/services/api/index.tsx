import axios from "axios";

const api = axios.create({
    baseURL: "http://cloud.ntiamerica.inf.br:55472/v1/",
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;