import {showToast} from '../../request/index'
// pages/cart/cart.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: {},
        cart: [],
        allChecked: false,
        totalPrice: 0,
        totalNum: 0
    },

    //购物车状态总函数
    setCart(cart){
        let allChecked = true
        let totalPrice = 0
        let totalNum = 0 
        cart.forEach(v=>{
            if(v.checked){
                totalPrice += v.num*v.goods_price
                totalNum += v.num
            }
            else{
                allChecked = false
            }
        })
        allChecked = cart.length!=0?allChecked:false
        wx.setStorageSync('cart', cart)
        this.setData({
            cart,
            allChecked,
            totalPrice,
            totalNum
        })
    },

    //结算事件
    handlePay(){
        const {address,totalNum} = this.data
        if(!address.userName){
            showToast({title: '您还没有选择收货地址'})
            return
        }
        else if(totalNum ===0){
          showToast({title: '您还没有选购商品'})
          return
        }
        else{
            wx.navigateTo({
                url: '/pages/pay/pay',
            })
        }
    },

    //商品数量的编辑功能
    handleItemNumEdit(e){
        const {operation,id} = e.currentTarget.dataset
        let {cart} = this.data
        const index = cart.findIndex(v=>v.goods_id === id)
        if(cart[index].num === 1 && operation === -1){
            wx.showModal({
              title: '提示',
              content: '您是否要删除',
              success: (res)=>{
                if (res.confirm) {
                    cart.splice(index,1)
                    wx.setStorageSync('cart', cart)
                    this.setCart(cart)
                }
              }
            })
        }
        else{
            cart[index].num += operation
            wx.setStorageSync('cart', cart)
            this.setCart(cart)
        }
    },

    //商品全选功能
    handleItemAllCheck(){
        let {cart,allChecked} = this.data
        allChecked = !allChecked
        cart.forEach(v=>v.checked = allChecked)
        wx.setStorageSync('cart', cart)
        this.setCart(cart)
    },

    //商品选中事件
    handleItemChange(e){
        const goods_id = e.currentTarget.dataset.id
        let {cart} = this.data
        let index = cart.findIndex(v=>v.goods_id === goods_id)
        cart[index].checked = !cart[index].checked
        this.setCart(cart)
    },

    //地址获取事件
    handleChooseAddress(){
        var that = this
        // wx.chooseAddress({
        //     success: (result) => {
        //         this.setData({
        //             address: result
        //         })
        //         console.log(result);
        //         wx.setStorageSync('address', result)
        //     }
        // })
        const address = {
            cityName: "广州市",
            countyName: "海珠区",
            detailInfo: "新港中路397号",
            errMsg: "chooseAddress:ok",
            nationalCode: "510000",
            postalCode: "510000",
            provinceName: "广东省",
            telNumber: "020-81167888",
            userName: "张三"
        }
        wx.showModal({
            title: '提示',
            content: '本程序采用虚拟地址，不会获取真实地址',
            success (res) {
              if (res.confirm) {
                showToast({title: '获取地址成功'})
                that.setData({address})
                wx.setStorageSync('address', address)
              } else if (res.cancel) {
                showToast({title: '获取地址失败'})
              }
            }
          })
    },
    
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        const address = wx.getStorageSync('address')
        const cart = wx.getStorageSync('cart') || []
        this.setData({address})
        this.setCart(cart)
    }

})