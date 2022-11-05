import {request} from '../../request/index'

// pages/home/home.js
Page({
    //基础数据
    data: {
        swiperList: [],
        cateList: [],
        floorList: []
    },

    //获取轮播图数据
    getSwiperList(){
        request({url: '/home/swiperdata'}).then(
            res=>{
                this.setData({
                    swiperList: res
                })
            }
        )
    },

    //获取分类导航数据
    getCateList(){
        request({url: '/home/catitems'}).then(
            res=>{
                this.setData({
                    cateList: res
                })
            }
        )
    },

    getFloorList(){
        request({url: '/home/floordata'}).then(
            res=>{
                this.setData({
                    floorList: res
                })
            }
        )
    },

    //生命周期函数
    onLoad(options) {
        this.getSwiperList()
        this.getCateList()
        this.getFloorList()
    }
})