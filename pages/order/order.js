import {request} from '../../request/index'
// pages/order/order.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [
            {
                id: 0,
                value: '全部',
                isActive: true
            },
            {
                id: 1,
                value: '待付款',
                isActive: false
            },
            {
                id: 2,
                value: '代收货',
                isActive: false
            },
            {
                id: 3,
                value: '退款/退货',
                isActive: false
            }
        ],
        orders: []
    },

    //获取订单列表
    getOrder(type){
        let header = {}
        header['Authorization'] = wx.getStorageSync('token')
        request({url: '/my/orders/all',header,data: {type}}).then(
            res=>{
                this.setData({
                    orders: res.orders.map(v=>({...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))
                })
            }
        )
    },

    changeTitleIndex(index){
        let {tabs} = this.data
        tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
        this.setData({
            tabs
        })
    },

    tabsItemChange(e){
        const {index} = e.detail
        this.changeTitleIndex(index)
        this.getOrder(index+1)
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        const token = wx.getStorageSync('token')
        if(!token){
            wx.navigateTo({
                url: '/pages/auth/auth',
            })
            return
        }
        let pages = getCurrentPages()
        let currentPage = pages[pages.length-1]
        const {type} = currentPage.options
        this.changeTitleIndex(type-1)
        this.getOrder(type)
    }
})