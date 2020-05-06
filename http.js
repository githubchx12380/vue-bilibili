import axios from 'axios'
import router from './src/router'
import Vue from 'vue'
const http = axios.create({
    baseURL:'http://112.74.99.5:3000/web/api'
})


http.interceptors.request.use(function (config) {
    if(localStorage.getItem('token') && localStorage.getItem('id')){
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
 
http.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
     if(error.response.status == 401 || error.response.status == 402){
         router.push('/login')
         Vue.prototype.$msg.fail(error.response.data.message)
     }
    return Promise.reject(error);
  });


export default http