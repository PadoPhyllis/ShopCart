import {request,showToast} from '../../request/index'
// pages/auth/auth.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        code: ''
    },

    //获取用户信息
    handleGetUserInfo(e){
        try {
            const {encryptedData,rawData,iv,signature} = e.detail
            wx.login({
                timeout: 10000,
                success: (res)=>{
                    this.setData({
                        code: res.code
                    })
                }
            })
            const {code} = this.data
            const loginParams = {encryptedData,rawData,iv,signature,code}
            request({url: '/users/wxlogin',data: loginParams,method: 'POST'}).then(
                res=>{
                    //token待后台开发
                    wx.setStorageSync('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
                    wx.navigateBack({
                        delta: 1,
                    })
                }
            )
        } 
        catch (error) {
            showToast({title: '未登录'})
        }
    }
})