import axios from "axios";

const api = axios.create({
    baseURL: "https://apicoleta.hostnetprovedor.com.br:8090/api/",
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;