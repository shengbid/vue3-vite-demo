import Loading from './index.vue'
import {
  createVNode,
  render
} from 'vue'

export default {
  install(app) {
    const Vnode = createVNode(Loading)
    render(Vnode, document.body)
    app.config.globalProperties.$myLoading = Vnode.component.ctx
    console.log(app, Vnode)
  }
}