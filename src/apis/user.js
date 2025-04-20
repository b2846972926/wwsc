import http from '@/utils/http'

export function loginAPI(user) {
  return http.post('/login', user)
}

export const getLikeListAPI = ({ limit = 4 }) => {
  return http.get('/goods/relevant', { params: { limit } })
}
