import http from '@/utils/http'

export function getCheckInfoAPI() {
  return http.get('/member/order/pre')
}

export function addAddressAPI() {
  return http.post('/member/address')
}

export function createOrderAPI(data) {
  return http.post('/member/order', data)
}
