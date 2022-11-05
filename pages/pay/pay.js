import {showToast} from '../../request/index'

// pages/pay/pay.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: {},
        cart: [],
        totalPrice: 0,
        totalNum: 0
    },

    //支付事件
    handleOrderPay(){
        const token = wx.getStorageSync('token')
        if(!token){
            wx.navigateTo({
              url: '/pages/auth/auth',
            })
            return
        }
        wx.showModal({
          title: '提示',
          content: '本项目仅供学习使用，无需任何支付',
          success: (res) => {
            if (res.confirm) {
                showToast({title: '支付成功'})
                let newCart = wx.getStorageSync('cart')
                newCart = newCart.filter(v=>!v.checked)
                wx.setStorageSync('cart', newCart)
                wx.navigateTo({
                  url: '/pages/order/order?type=1',
                })
            } 
            else if (res.cancel) {
                showToast({title: '支付失败'})
            }
          }
        })
    },

    //购物车状态总函数
    setCart(cart){
        let totalPrice = 0
        let totalNum = 0 
        cart.forEach(v=>{
            if(v.checked){
                totalPrice += v.num*v.goods_price
                totalNum += v.num
            }
            else{
                
            }
        })
        this.setData({
            cart,
            totalPrice,
            totalNum
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        const address = wx.getStorageSync('address')
        const cart = wx.getStorageSync('cart') || []
        this.setData({address})
        this.setCart(cart)
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})