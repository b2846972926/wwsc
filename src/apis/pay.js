import http from '@/utils/http'

export const getOrderAPI = (id) => {
  return http.get(`/member/order/${id}`)
}
