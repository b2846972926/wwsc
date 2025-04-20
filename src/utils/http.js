import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/userStore'
import router from '@/router/index'

const http = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 15000,
})

http.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    const token = userStore.user.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (e) => Promise.reject(e),
)

http.interceptors.response.use(
  (res) => res.data,
  (e) => {
    ElMessage({ type: 'error', message: e.response?.data?.message })
    if (e.response?.status === 401) {
      const userStore = useUserStore()
      userStore.clearUser()
      router.push('/login')
    }
    return Promise.reject(e)
  },
)

export default http
