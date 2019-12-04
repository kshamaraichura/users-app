import axios from 'axios'
import config from '../config'

const api = axios.create({
    baseURL: config.apiURL,
})

const insertUser = payload => api.post(`/user`, payload)
const getAllUsers = () => api.get(`/users`)
const updateUserById = (id, payload) => api.put(`/user/${id}`, payload)
const deleteUserById = id => api.delete(`/user/${id}`)
const getUserById = id => api.get(`/user/${id}`)

const apis = {
    insertUser,
    getAllUsers,
    updateUserById,
    deleteUserById,
    getUserById,
}

export default apis
