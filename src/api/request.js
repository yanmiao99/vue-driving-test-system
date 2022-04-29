/*
* axios 二次封装
* */

// 引入文件
import axios from "axios"
import {Message} from 'element-ui';
import qs from 'qs'


// 请求异常
const NETWORK_ERROR = "请求错误"

// 全局配置
const service = axios.create({
    baseURL: '/api',
    timeout: 8000,
})

// 请求拦截
service.interceptors.request.use((req) => {
    return req
})

// 响应拦截
service.interceptors.response.use((res) => {
    const {statusCode, result, desc} = res.data
    if (statusCode === '000000') {
        return result // 返回数据正确
    } else {
        Message.error(desc || NETWORK_ERROR) // 常规报错
        return Promise.reject(desc || NETWORK_ERROR)
    }
})

// request 方法
function request(options) {
    options.headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    options.method = options.method || 'get'
    if (options.method.toLowerCase() === 'get') {
        options.params = options.data
    }
    return service(options)
}

// 使用对象的方式调用
['get', 'post', 'put', 'delete', 'patch'].forEach(item => {
    request[item] = (url, data, options) => {
        return request({
            url,
            data: qs.stringify({
                apiKey: 'WAbnB1za247b2c8b5fcc95a660399b80a4d8b813d901a1e', // 请求必须的参数
                ...data
            }),
            method: item,
            ...options
        })
    }
})

export default request
