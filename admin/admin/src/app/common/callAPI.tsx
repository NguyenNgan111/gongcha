import axios from "axios";

function CallAPI(endpoint: any, method: any, body: any) {
  // const transformRequest = [(data, headers) => {
  //   headers: {"Authorization" : `Bearer ${token}` }

  //   return data;
  // }]
  const token = localStorage.getItem("token")
  
  return axios({ method: method, url: endpoint, headers: {"Authorization" : `Bearer ${token}`}, data: body });
}
export default CallAPI;
