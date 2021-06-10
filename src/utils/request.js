
import axios from 'axios';
import router from '../router/index';
import { message } from 'ant-design-vue';


let service = axios.create({
    // baseURL: 'http://192.168.2.132:8082', //斌的
    baseURL: 'http://wys.hciot.top/', //测试服
    timeout: 60000
})

service.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem("token")
        if (navigator.onLine==false){
            return message.error("请检查网络")
        }
        if (token) {
            config.headers.accessToken = token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
service.interceptors.response.use(response => {
    const { data } = response
    if (data.code == 10000 || data.code == 2000 || data.code == 1032|| data.code == 1023) {
        sessionStorage.removeItem('token')
        setTimeout(() => {
            router.push("/login")
        }, 0);
    }
    return data
})



export default service
