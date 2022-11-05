import {request} from '../../request/index'
// pages/cate/cate.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        leftMenuList:[],
        rightContent:[],
        currentIndex: 0, //被点击的左侧菜单
        scrollTop: 0
        
        
    },
    
    //分类列表
    Cates: [],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const Cates = wx.getStorageSync('cates')
        if(!Cates){
            this.getCates()
        }
        else{
            if(Date.now()-Cates.time>1000*10){
                this.getCates()
            }
            else{
                this.Cates = Cates.data
                let leftMenuList = this.Cates.map(v=>v.cat_name)
                let rightContent = this.Cates[0].children
                this.setData({
                    leftMenuList,
                    rightContent
                })
            }
        }
    },

    //获取分类列表
    getCates(){
        request({url: '/categories'}).then(
            res=>{
                this.Cates = res
                wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})
                let leftMenuList = this.Cates.map(v=>v.cat_name)
                let rightContent = this.Cates[0].children
                this.setData({
                    leftMenuList,
                    rightContent
                })
            }
        )
    },
    
    //左侧点击事件
    handleItemTap(e){
        const {index} = e.currentTarget.dataset
        let rightContent = this.Cates[index].children
        this.setData({
            currentIndex: index,
            rightContent,
            scrollTop:0
        })
    }

})