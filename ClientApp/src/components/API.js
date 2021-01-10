import axios from "axios";
import Adapter from "./Adapter";

const API = axios.create({
    baseURL: Adapter.base_url,
    transformRequest: [(data) => JSON.stringify(data)],
    headers: {
        // 'Authorization' : _token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

export default API;
