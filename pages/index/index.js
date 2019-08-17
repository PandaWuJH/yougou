//index.js
import request from '../../utils/request.js'
//获取应用实例
const app = getApp()

Page({
 data:{
   bannerImg:[],
   categroy:[],
   mainImg:[]
 },
  onLoad(){
    request({
      url:"/home/swiperdata"
    }).then(res=>{
      console.log(res)
      const {message}=res.data
      this.setData({
        bannerImg: message
      })
    })
    request({
      url:"/home/catitems"
    }).then(res=>{
      const {message}=res.data
      console.log(res)
      this.setData({
        categroy: message
      })
    })
    request({
      url:"/home/floordata"
    }).then(res=>{
      console.log(res)
      const {message}=res.data;
      this.setData({
        mainImg: message
      })
      
    })
  }
})
