import {request} from '../../request/index'

// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goods: [],
        isFocus: false,
        inputValue: ''
    },

    TimeId: -1,

    handleCancel(){
        this.setData({
            inputValue: '',
            isFocus: false,
            goods: []
        })
        clearTimeout(this.TimeId)
    },

    qsearch(query){
        request({url: '/goods/qsearch',data: {query}}).then(
            res=>{
                this.setData({
                    goods: res
                })
            }
        )
    },

    handleInput(e){
        const {value} = e.detail
        if (!value.trim()) {
            this.setData({
                goods: [],
                isFocus: false
            })
            clearTimeout(this.TimeId)
            return
        }
        this.setData({
            isFocus: true
        })
        clearTimeout(this.TimeId)
        this.TimeId = setTimeout(()=>{
            this.qsearch(value)
        },1000)
    }

})