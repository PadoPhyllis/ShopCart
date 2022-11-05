import {request} from '../../request/index'
// pages/goods_list/goods_list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [
            {
                id: 0,
                value: '综合',
                isActive: true
            },
            {
                id: 1,
                value: '销量',
                isActive: false
            },
            {
                id: 2,
                value: '价格',
                isActive: false
            }
        ],
        goodsList: []
    },

    //接口参数
    QueryParams:{
        query: '',
        cid: '',
        pagenum: 1,
        pagesize: 10
    },

    //总页数
    totalPages: 1,

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.QueryParams.cid = options.cid || ''
        this.QueryParams.query = options.query || ''
        this.getGoodsList()
    },

    getGoodsList(){
        request({url: '/goods/search',data:this.QueryParams}).then(
            res=>{
                const total = res.total
                this.totalPages = Math.ceil(total/this.QueryParams.pagesize)
                this.setData({
                    goodsList: [...this.data.goodsList,...res.goods]
                })
                wx.stopPullDownRefresh()
            }
        )
    },

    tabsItemChange(e){
        const {index} = e.detail
        let {tabs} = this.data
        tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
        this.setData({
            tabs
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        this.setData({
            goodsList: []
        })
        this.QueryParams.pagenum = 1
        this.getGoodsList()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        if(this.QueryParams.pagenum >= this.totalPages){
            wx.showToast({title: '数据已加载到底'})
        }
        else{
            this.QueryParams.pagenum++
            this.getGoodsList()
        }
    }

})