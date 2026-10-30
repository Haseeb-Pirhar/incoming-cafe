// import axios, { AxiosInstance } from 'axios'
// import { API_URL } from '@/constants/env'
// import { useAuthStore } from '@/store/profileStore';

// const api: AxiosInstance = axios.create({
//   baseURL: API_URL,
//   timeout: 30000,
// })
// const {user} = useAuthStore();
// api.interceptors.request.use(
//   async (config: any) => {
//     if (user?.token) {
//       config.headers.Authorization = `Bearer ${user?.token}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   },
// )

// export default api
