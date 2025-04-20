import http from '@/utils/http'

export function findNewCartListAPI() {
  return http.get('/member/cart')
}

export function insertCartAPI(sku) {
  return http.post('/member/cart', sku)
}

export function delCartAPI(ids) {
  return http.delete('/member/cart', { data: { ids } })
}

export function mergeCartAPI(data) {
  return http.post('/member/cart/merge', data)
}

export function updateCartItem(skuId, data) {
  return http.put(`/member/cart/${skuId}`, data)
}
