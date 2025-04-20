import ImageView from '@/components/imageView/IndexView.vue'
import Sku from '@/components/sku/SkuIndexView.vue'

export const componentPlugin = {
  install(app) {
    app.component('ImageView', ImageView)
    app.component('SkuComponent', Sku)
  },
}
