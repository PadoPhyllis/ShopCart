import {request} from '../../request/index'
// pages/goods_detail/goods_detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsObj: [],
        isCollect: false
    },

    //商品列表
    GoodsInfo: {},

    //收藏事件
    handleCollect(){
        let isCollect = false
        let collect = wx.getStorageSync('collect') || []
        let index = collect.findIndex(v=>v.goods_id === this.GoodsInfo.goods_id)
        if(index !== -1){
            collect.splice(index,1)
            isCollect = false
            wx.showToast({
              title: '取消成功',
              icon: 'success',
              mask: true
            })
        }
        else{
            collect.push(this.GoodsInfo)
            isCollect = true
            wx.showToast({
                title: '收藏成功',
                icon: 'success',
                mask: true
              })
        }
        wx.setStorageSync('collect', collect)
        this.setData({
            isCollect
        })
    },

    //点击加入购物车
    handleCartAdd(){
        let cart = wx.getStorageSync('cart') || []
        let index = cart.findIndex(v=>v.goods_id === this.GoodsInfo.goods_id)
        if(index === -1){
            this.GoodsInfo.num = 1
            this.GoodsInfo.checked = true
            cart.push(this.GoodsInfo)
        }
        else{
            cart[index].num++
        }
        wx.setStorageSync('cart', cart)
        wx.showToast({
          title: '加入成功!',
          icon: 'success',
          mask: true
        })
    },

    //点击轮播图放大预览
    handlePrevewImage(e){
        const urls = this.GoodsInfo.pics.map(v=>v.pics_mid)
        const current = e.currentTarget.dataset.url
        wx.previewImage({
          urls,
          current
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        let pages = getCurrentPages()
        let currentPage = pages[pages.length-1]
        const {goods_id} = currentPage.options
        this.getGoodsDetail(goods_id)
    },

    getGoodsDetail(goods_id){
        request({url: '/goods/detail',data: {goods_id}}).then(
            res=>{
                this.GoodsInfo = res
                let collect = wx.getStorageSync('collect') || []
                let isCollect = collect.some(v=>v.goods_id === this.GoodsInfo.goods_id)
                this.setData({
                    goodsObj: {
                        goods_name: res.goods_name,
                        goods_price: res.goods_price,
                        goods_introduce: res.goods_introduce.replace(/\.webp/g,'.jpg'),
                        pics: res.pics
                    },
                    isCollect
                })
            }
        )
    }

})