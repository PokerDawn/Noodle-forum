import axios from 'axios'

export default axios.create({
    baseURL: 'http://47.101.203.157',
    timeout: 6000,
})