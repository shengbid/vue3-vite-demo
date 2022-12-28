class Bus {
  constructor() {
    this.list = {}
  }
  // 发布
  emit(name, args) {
    let eventName = this.list[name] || []
    eventName.forEach(fn => {
      fn.call(this, args)
    })
  }
  // 订阅
  on(name, callback) {
    let fn = this.list[name] || []
    fn = [callback]
    this.list[name] = fn
  }
}

export default new Bus()