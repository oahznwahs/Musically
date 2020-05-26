/*
  1:music search API
    request url:https://autumnfish.cn/search
    request method:get
    request parameter:keywords
    response:search result

  2:music url API
    request url:https://autumnfish.cn/song/url
    request method:get
    request parameter:id
    repsonse: music url
    
  3.music info
    request url:https://autumnfish.cn/song/detail
    request method:get
    requets paramter:ids
    repsonse:music infor(cover page)
    
  4.popular comments
    request url:https://autumnfish.cn/comment/hot?type=0
    request method:get
    reuqest parameter:id
    response:popular comments for the song
    
  5.mv url
    request url:https://autumnfish.cn/mv/url
    request method:get
    resquest parameter:id(0 means no resources)
    response:mv url
*/
var app = new Vue({
  el: "#player",
  data: {
    // keyword
    query: "",
    // music list
    musicList: [],
    // music url
    musicUrl: "",
    // cover
    musicCover: "",
    // comments
    hotComments: [],
    // animation status
    isPlaying: false,
    // mv interface status
    isShow: false,
    // mv url
    mvUrl: ""
  },
  methods: {
    // search
    searchMusic: function() {
      var that = this;
      axios.get("https://autumnfish.cn/search?keywords=" + this.query).then(
        function(response) {
          // console.log(response);
          that.musicList = response.data.result.songs;
          console.log(response.data.result.songs);
        },
        function(err) {}
      );
    },
    // play
    playMusic: function(musicId) {
      //   console.log(musicId);
      var that = this;
      // retrive music url
      axios.get("https://autumnfish.cn/song/url?id=" + musicId).then(
        function(response) {
          // console.log(response);
          // console.log(response.data.data[0].url);
          that.musicUrl = response.data.data[0].url;
        },
        function(err) {}
      );

      // mmusic info
      axios.get("https://autumnfish.cn/song/detail?ids=" + musicId).then(
        function(response) {
          // console.log(response);
          // console.log(response.data.songs[0].al.picUrl);
          that.musicCover = response.data.songs[0].al.picUrl;
        },
        function(err) {}
      );

      // music comments
      axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId).then(
        function(response) {
          // console.log(response);
          // console.log(response.data.hotComments);
          that.hotComments = response.data.hotComments;
        },
        function(err) {}
      );
    },
    // play
    play: function() {
      // console.log("play");
      this.isPlaying = true;
    },
    // pause
    pause: function() {
      // console.log("pause");
      this.isPlaying = false;
    },
    // play mv
    playMV: function(mvid) {
      var that = this;
      axios.get("https://autumnfish.cn/mv/url?id=" + mvid).then(
        function(response) {
          // console.log(response);
          console.log(response.data.data.url);
          that.isShow = true;
          that.mvUrl = response.data.data.url;
        },
        function(err) {}
      );
    },
    // hide
    hide: function() {
      this.isShow = false;
    }
  }
});
