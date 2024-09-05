import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:3000/api/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

Api.interceptors.request.use(
  (request) => {
    if (!request.url) {
      return Promise.reject(new Error("Request URL is undefined"));
    }
    const unauthUrl = ["auth/login", "auth/register"];
    if (!unauthUrl.includes(request.url)) {
      const { token } = JSON.parse(
        localStorage.getItem("PlayServiceAuth") || "{}"
      );
      if (token) {
        request.headers["Authorization"] = `Bearer ${token}`;
      } else {
        return Promise.reject(
          new Error("Unauthorized. Please login or singnup")
        );
      }
    }
    return request;
  },
  (error) => Promise.reject(error)
);

export default Api;
