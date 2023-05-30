import axios from 'axios'

export default axios.create({
    baseURL: 'https://47.101.203.157',
    timeout: 6000,
})