import { getBannerAPI } from '@/apis/home'
import { onMounted, ref } from 'vue'

export function useBanner() {
  const bannerList = ref([])
  async function getBanner() {
    const res = await getBannerAPI('2')
    bannerList.value = res.result
  }
  onMounted(() => getBanner())
  return {
    bannerList,
  }
}
