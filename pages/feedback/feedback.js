import {showToast} from '../../request/index'
// pages/feedback/feedback.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [
            {
                id: 0,
                value: '体验问题',
                isActive: true
            },
            {
                id: 1,
                value: '商品、商家投诉',
                isActive: false
            }
        ],
        chooseImg: [],
        textValue: ''
    },

    handleChange(e){
        let {value} = e.detail
        this.setData({
            textValue: value
        })
    },

    handleSubmit(){
        let {textValue} = this.data
        if(!textValue){
            showToast({title: '请您完善信息'})
            return
        }
        this.setData({
            chooseImg: [],
            textValue: ''
        })
        wx.showToast({title: '提交成功'})
    },

    handleRemoveImg(e){
        const {index} = e.currentTarget.dataset
        let {chooseImg} = this.data
        chooseImg.splice(index,1)
        this.setData({chooseImg})
    },

    handleChooseImg(){
        wx.chooseMedia({
          count: 9,
          mediaType: ['image'],
          sourceType: ['album', 'camera'],
          camera: 'back',
          success: (res)=>{
            this.setData({
                chooseImg: [...this.data.chooseImg,...res.tempFiles]
            })
          }
        })
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
    }
    
})