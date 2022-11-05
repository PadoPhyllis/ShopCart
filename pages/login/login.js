// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    getUserProfile(e){
        wx.getUserProfile({
          desc: '用于完善会员资料',
          success: (res)=>{
            wx.setStorageSync('userInfo', res.userInfo)
            wx.navigateBack({
                delta: 1,
              })
          }
        })  
    }

})