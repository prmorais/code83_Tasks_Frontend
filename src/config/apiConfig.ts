import axios from "axios";

const apiConfig = axios.create({
	baseURL: "http://localhost:3000",
});

export default apiConfig;
