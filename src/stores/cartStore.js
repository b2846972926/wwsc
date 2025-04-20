import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './userStore'
import { delCartAPI, findNewCartListAPI, insertCartAPI, updateCartItem } from '@/apis/cart'

export const useCartStore = defineStore(
  'cart',
  () => {
    const cartList = ref([])
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.user.token)

    const updateLoginCartList = async () => {
      const res = await findNewCartListAPI()
      cartList.value = res.result
    }

    const addCart = async (goods) => {
      if (isLogin.value) {
        //登陸狀態下 先獲得'已加入購物車列表'
        //再更新當前購物車列表
        await insertCartAPI(goods)
        await updateLoginCartList()
      } else {
        //如果不在登錄狀態下
        //判斷商品是否在購物車
        const findItem = cartList.value.find((item) => item.skuId === goods.skuId)
        if (findItem) {
          findItem.count += goods.count
        } else {
          cartList.value.push(goods)
        }
      }
    }
    const delCart = async (skuId) => {
      if (isLogin.value) {
        await delCartAPI([skuId])
        await updateLoginCartList()
      } else {
        const index = cartList.value.findIndex((item) => item.skuId === skuId)
        cartList.value.splice(index, 1)
      }
    }

    //全選功能
    const checkAll = (selected) => {
      cartList.value.forEach((item) => {
        item.selected = selected
      })
    }

    //清除購物車
    const clearCart = () => {
      cartList.value = []
    }

    const updateCart = async (goods) => {
      const { skuId, count, selected } = goods
      if (isLogin.value) {
        await updateCartItem(skuId, { count, selected })
      }
    }

    const allCount = computed(() => {
      return cartList.value.reduce((acc, cur) => {
        return acc + cur.count
      }, 0)
    })
    const allPrice = computed(() =>
      cartList.value.reduce((acc, cur) => acc + cur.count * cur.price, 0),
    )

    const isAllSelected = computed(() => cartList.value.every((item) => item.selected))

    const selectedCount = computed(() =>
      cartList.value.filter((item) => item.selected).reduce((acc, cur) => acc + cur.count, 0),
    )
    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((acc, cur) => acc + cur.count * cur.price, 0),
    )

    return {
      cartList,
      addCart,
      delCart,
      isAllSelected,
      allCount,
      allPrice,
      checkAll,
      selectedCount,
      selectedPrice,
      updateLoginCartList,
      clearCart,
      updateCart,
    }
  },
  {
    persist: true,
  },
)
