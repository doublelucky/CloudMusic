// pages/index/index.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[],//轮播图数据
    recommendList:[],//推荐歌单数据
    topList:[],//排行榜数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    //滑块数据
    let bannerListData = await request('/banner', {type:2});
    this.setData({
      bannerList: bannerListData.banners
    })
    //推荐歌单数据
    let recommendListData = await request('/personalized', {limit:10})
    this.setData({
      recommendList: recommendListData.result
    })
    // 排行榜数据
    let index = 0;
    let resultArr = [{"name": "飙升榜",
    "id": 19723756,},{"name": "新歌榜",
    "id": 3779629,},{"name": "原创榜",
    "id": 2884035,},{"name": "热歌榜",
			"id": 3778678}];
      resultArr.forEach(async(item)=>{
        let topListData = await request('/playlist/detail', {id:item.id});
        // console.log(topListData)
          item.tracks=topListData.playlist.tracks.slice(0, 5)
      this.setData({
        topList: resultArr
      })
      })

  },
  //跳转到每日推荐歌曲页面
  toRecommendSong(){
    wx.navigateTo({
      url: '/pages/recommendSong/recommendSong',
    })
  },
  //跳转到搜索页面
  toSearch(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  toSongDetail(event){
    wx.navigateTo({
      url: '/pages/songDetail/songDetail?song=' + event.currentTarget.id
    })
  },
  //跳转到歌单歌曲列表页面
  toPlayList(event){
    wx.navigateTo({
      url: '/pages/playlist/playlist?id=' + event.currentTarget.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})