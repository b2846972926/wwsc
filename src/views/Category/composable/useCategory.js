import { getTopCategoryAPI } from '@/apis/category'
import { onMounted, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

export function useCategory() {
  const categoryData = ref({})
  const route = useRoute()
  const getCategory = async (id) => {
    const { result } = await getTopCategoryAPI(id)
    categoryData.value = result
  }

  onMounted(() => getCategory(route.params.id))

  onBeforeRouteUpdate((to) => {
    getCategory(to.params.id)
  })
  return {
    categoryData,
  }
}
