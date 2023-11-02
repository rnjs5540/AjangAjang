import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.PROD ?
    '' : 'http://localhost:4000'
})

// 요청이 보내지기 전에 가로채서 뭐 하기
// 헤더에 token넣기
axiosInstance.interceptors.request.use(function(config) {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken');
    return config;
}, function (error) {
    return Promise.reject(error);
})

// 응답이 올 때 가로채서 뭐 하기
axiosInstance.interceptors.response.use(function(response) {
    return response;
}, function (error) {
    if (error.response.data === 'jwt expired') {
        window.location.reload();
    }
    return Promise.reject(error);
})
  
export default axiosInstance;