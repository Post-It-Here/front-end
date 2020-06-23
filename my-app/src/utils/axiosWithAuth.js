import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: "https://unit-4-build.herokuapp.com/",
    headers: {
      Authorization: token
    }
  });
};

export default axiosWithAuth;