/**
 * 封装axios;
 * 1,设置基准路径；
 * axios.default.baseURL=''
 * 2，返回promise对象;
 * axios({}).then().catch()
 * 3,统一处理请求错误，监听错误
 * axios.onError(回调函数)
 */

// axios是一个函数，返回promise对象
const request=function(config={}){
  // 判断调用时有没传入url
  if(!config.url){
    // 没传url就抛出错误
    throw new Error("请输入地址");
    // 阻止请求发送
    return
  }
  // 请求路径为基准路径情况下添加基准路径
  if (config.url.search(/^http/)===-1){
    config.url = request.defaults.baseURL + config.url
  }
  // 请求路径为其他https请求时不设置基准路径
  // new promise实例对象里传回调函数，有两个参数resolve,reject
  // resolve接受成功数据
    return new Promise((resolve,reject)=>{
      // 用wx.request发ajax请求，success是成功的回调，fail是失败的回调，complete是所有请求的回调
        wx.request({
          ...config,
          success(res){
            resolve(res)
          },  
          fail(){},
          complete(res){
            request.errors.forEach(fn=>{
              fn(res)
            })
          }

        })
    })
}

request.defaults={
  baseURL:""
}

request.errors=[];

request.onError=function(callback){
  request.errors.push(callback)
}

export default request