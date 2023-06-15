import axios from "axios";

const api = axios.create({
    baseURL: "https://cloud.ntiamerica.inf.br:55471/v1/",
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;