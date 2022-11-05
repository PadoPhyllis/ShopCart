// pages/user/user.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: [],
        collectNums: 0
    },

    //退出登录
    logOut(){
        wx.removeStorageSync('cart')
        wx.removeStorageSync('userInfo')
        wx.removeStorageSync('token')
        wx.removeStorageSync('collect')
        wx.removeStorageSync('address')
        wx.switchTab({
          url: '/pages/home/home',
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        const userInfo = wx.getStorageSync('userInfo')
        const collect = wx.getStorageSync('collect')
        this.setData({userInfo,collectNums: collect.length})
    }

})