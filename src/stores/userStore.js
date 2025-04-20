import { loginAPI } from '@/apis/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCartStore } from './cartStore'
import { mergeCartAPI } from '@/apis/cart'

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref({})
    const cartStore = useCartStore()
    const getUser = async (form) => {
      const { result } = await loginAPI(form)
      user.value = result
      await mergeCartAPI(
        cartStore.cartList.map((item) => {
          return {
            skuId: item.skuId,
            selected: item.selected,
            count: item.count,
          }
        }),
      )
      await cartStore.updateLoginCartList()
    }
    const clearUser = () => {
      user.value = {}
    }

    return {
      user,
      getUser,
      clearUser,
    }
  },
  {
    persist: true,
  },
)
