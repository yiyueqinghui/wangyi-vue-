<template>
  <transition name="fade">
    <div class="playpage" v-show="playFace">
      <!--头部/-->
      <p class="musicInfo">
        <i class="icon icon-back" @click="flank"></i>
        <span class="info">
				    <b>{{musicname}}</b> <br/>
				    <a>{{author}}</a>
				</span>
        <i class="icon icon-share"></i>
      </p>
      <div @click.stop="trans" v-show="convert">
        <p class="topBottom"></p>
        <!--播放按钮-->
        <p class="switch">
          <img src="../../assets/img/swith.png" v-bind:class="{'pause': isPause,'start': !isPause }"/>
        </p>
        <!--光碟-->
        <div class="CD">
          <p class="disc">
            <img :src="bgurl"/>
          </p>
        </div>
        <p class="collect">
          <i class="icon icon-like"></i>
          <i class="icon icon-download"></i>
          <i class="icon icon-msg"></i>
          <i class="icon icon-list-circle-small"></i>
        </p>
      </div>
      <!--音量/歌词界面-->
      <div @click.stop="trans" v-show="!convert">
        <p class="vol">
          <a :class="volum2"></a>
          <a class="vols">
            <Range :all-time=100 :range-type='"volum"' :play-color='"#ffffff"' :bg-color='"grey"'></Range>
          </a>

        </p>
        <ul class="lyric">
          <li v-for="(item,index) in lyricall" :data="index" v-text="item.txt" :class='{"active":line==index}'
              :style="moved">

          </li>
        </ul>
      </div>

      <!--进度条-->
      <div class="process">
        <span class="begin">{{startTimes | formTime}}</span>
        <!--<span class="processBar" @click.stop="adjust($event)">
                    <a class="slot" @touchstart.stop="move($event)" @touchmove.stop="moving"  @touchend.stop()="movend"></a>
                    <strong class="played"></strong>
                </span>-->
        <Range :all-time=endTime :play-st=isPause style="margin-top:7vh;"></Range>
        <span class="end">{{endTimes | formTime }}</span>
      </div>
      <p class="control">
        <i id="mode" class="icon-music-shunxu" :data='playmode' data-type=0 @click="Playmode($event,mode)"></i>
        <span>
					<i class="icon icon-prevdetail" @click="prenext('prev')"></i>
					<i :class="icons" id="start" data-st="state" data-type=1 @click="Playmode($event,start)"></i>
					<i class="icon icon-nextdetail" @click="prenext('next')" ></i>
				</span>
        <i id="list" class="icon-list-music " @click="slideins"></i>
      </p>
      <!--歌单列表-->
      <Musiclist :trans=listanimate :space='classA' @changetrans='translist'></Musiclist>

    </div>
  </transition>
</template>

<script>
  import Range from '../range/range'
  import Musiclist from '../musiclist/musiclist'

  export default ({
    data() {
      return {
        mode: ['icon-music-shunxu', 'icon-music-danqu1', 'icon-music-random'],
        start: ['icon-playdetail', 'icon-pause-detail'],
        icons: 'icon-playdetail',
        playmode: 0,
        isPause: true,
        angel: 0,
        cdTime: null,     //CD旋转动画的定时器
        startTime: 0,     //歌曲当前播放时间（单位s）
        endTime: 0,     //歌曲总时长（单位s）
        processSpace: 0,
        processTime: null,
        current: 0,     //移动dot前其距离
        maxRight: 0,   //最大的右侧距离
        maxLeft: 0,     //最大的左侧距离
        convert: true,    //CD与歌词界面的转换
        volum2: 'icon-volume2',
        index: 0,            //当前歌曲的播放模式的变化
        currentlyric: null,
        lyricall: [],
        musicname: '',
        author: '',
        bgurl: 'http://oiq8j9er1.bkt.clouddn.com/music_%E6%88%91%E8%BF%98%E6%83%B3%E5%A5%B9.jpg',  //默认的CD图片
        line: 0,             //当前显示的行数，第几行
        moved: {
          transform: "translateY(30vh)"
        },
        listanimate:false ,        //歌曲列表动画
        classA:{}

      }
    },
    computed: {
      startTimes() {
        this.startTime = parseInt(this.$store.state.currenttime);
        return this.$store.state.currenttime;
      },
//			接收当前播放音乐的总时长
      endTimes() {
        this.endTime = this.$store.state.alltime;
        return this.$store.state.alltime;
      },
      playFace() {
        return this.$store.state.playface;
      },
//			监听音量的变化
      vols() {
        return this.$store.state.vols;
      },
//			监听播放暂停的变化
      sts() {
        return this.$store.state.st;
      },
//    从store获取到 歌曲信息(包括歌词)
      lyric() {
        return this.$store.state.currentmusic;
      }
//   

    },
    methods: {
//			标注播放模式的变化
      Playmode: function (e, arrs) {
        var _this = e.target;
        var classAll = _this.getAttribute('class'),
          index = arrs.indexOf(classAll);
        index++;
        if (index == arrs.length) {
          index = 0;
        }
        _this.setAttribute('class', arrs[index]);
        var data = _this.getAttribute('data-type');
        if (data == 1) {
          this.plays();
          this.icons = arrs[index];
        } else {
          this.playmode = index;
        }
      },
      //开始暂停
      plays: function () {
        this.isPause = !this.isPause;   //是否播放
        this.spin();            //是否旋转CD
        this.$store.commit('changeSt');    //把播放状态传递给store
      },
//			CD旋转效果
      spin: function () {
        clearInterval(this.cdTime);

        if (this.isPause) {
          clearInterval(this.cdTime);
        } else {
          this.cdTime = setInterval(this.interTime, 100);
        }
      },
      interTime: function () {
        var disc = document.getElementsByClassName('disc')[0];
        this.angel += 1.5;
        var ange = this.angel + 'deg';
        disc.style.transform = 'rotateZ(' + ange + ')';
      },
//    CD与歌词,音量页面的转换
      trans: function () {
        this.convert = !this.convert;
      },
//    触发返回主页的动画
      flank: function () {
        this.$store.commit('changeface');
      },
//          歌词整理
      listlyric: function (str) {
      	this.lyricall = [];
        var arr = str.split(/\]*\[/g);
        for (var i = 1; i < arr.length; i++) {
          var obj = {},
            times = "",
            txt = "";
          var s = arr[i];
          if (s.length > 8) {
            times = s.match(/[0-9]{2}:[0-9]{2}.[0-9]{2}/g)[0];
            txt = s.split(']')[1];
          } else {
            times = s.substring(0, s.length);
            txt = "";
          }
          var timeSecond = times.split(/[:.]/g);
          var seconds = parseInt(timeSecond[0]) * 60 + parseInt(timeSecond[1]);
          obj['time'] = seconds;
          obj['txt'] = txt;
          this.lyricall.push(obj); 
        }
      },
      //上一首    下一首
     prenext:function(type){	     
		    // 歌词清空
			 this.lyricall = [];
			 //触发store方法
			 this.$store.commit('currentplay',type);
      },
     //  歌词列表出现
      slideins(){
      	this.listanimate = true;
      },
//      歌词列表消失
      translist(){
      	this.listanimate = false;
      }
      


    },
    watch: {
      // 进度条
      startTime: function (val, oldval) {
        var slot = document.getElementsByClassName('slot')[0];
        var played = document.getElementsByClassName('played')[0];
        var proced = ((this.startTime / this.endTime).toFixed(3)) * 100;
        played.style.width = proced + "%";
        slot.style.left = proced + "%";
        // 播放完这一首自动播放下一首
        if (val == this.endTime) {
          console.log(val,this.endTime);
//        this.plays();
          this.prenext('next');
          clearInterval(this.interTime);
        }
      },
//         如果音量是0,更换为静音图标
      vols: function (newval, oldval) {
        if (newval == 0) {
          this.volum2 = 'icon-volume';
        } else {
          this.volum2 = 'icon-volume2';
        }
      },
      //监听播放状态的变化
      sts: function (newval, oldval) {
        if (newval) {
          this.isPause = false;
        } else {
          this.isPause = true;
        }
        this.spin();            //是否旋转CD

//			      根据播放状态的变化改变图标
        if (!this.isPause) {
          this.icons = 'icon-pause-detail'
        } else {
          this.icons = 'icon-playdetail'
        }
      },
      lyric: function (newval, oldval) {
//    	console.log(newval);
        this.currentlyric = newval['lyric'];
        this.musicname = newval['name'];
        this.author = newval['author'];
        if(!!newval['imgurl']){
          this.bgurl = newval['imgurl'];
        }else{
          this.bgurl = "http://oiq8j9er1.bkt.clouddn.com/music_%E6%88%91%E8%BF%98%E6%83%B3%E5%A5%B9.jpg";
        }
        this.listlyric(this.currentlyric);
      },
//       监控时间,改变歌词
      startTimes: function (newval, oldval) {
        var min = 0;     //上一次循环的数值
        var oldtxt = '123';   //上一次循环的内容
        var noline = 0;     //空行累计
        for (var i in this.lyricall) {
          var max = this.lyricall[i]['time'];
          var txts = this.lyricall[i]['txt'];
          if (newval >= min && newval < max) {
            this.line = i - 1 >= 0 ? i - 1 : 0;
            var s = 30 - (this.line) * 6;
            this.moved['transform'] = "translateY(" + s + "vh)";
            oldtxt = txts;
            min = max;
            break;
          }
        }
      }

    },
    filters: {
//			播放进度条的时间格式过滤器
      formTime: function (s) {
        var mins = Math.floor(s / 60),
          ss = s % 60;
        if (mins < 10) mins = "0" + mins;
        if (ss < 10) ss = "0" + ss;

        return mins + ":" + ss
      }
    },
    components: {
      Range,
      Musiclist
    }

  })
</script>

<style scoped>
  .playpage {
    width: 100vw;
    height: 100vh;
   /* padding: 2vh 3vw;*/
    position: fixed;
    top: 0vh;
    left: 0;
    z-index: 110;
    background: radial-gradient(lightgrey, grey, black);
    color: #ffffff;
    z-index: 1000;
    overflow: hidden;

  }

  .musicInfo {
    width: 100%;
    height: 8vh;
    line-height: 8vh;
    padding: 0 3vw;
    margin-top: 2vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .musicInfo .icon {
    display: inline-block;
    width: 10%;
    font-size: 25px;
  }

  .icon-share {
    font-size: 30px !important;
  }

  .musicInfo .info {
    display: inline-block;
    width: 80%;
    line-height: 4vh;
  }

  .musicInfo .info b {
    font-size: 14px;
  }

  .musicInfo .info a {
    font-size: 13px;
  }

  .topBottom {
    width: 80%;
    height: 1px;
    margin: 0 auto;
    background-image: linear-gradient(to right, rgba(245, 245, 245, 0), rgba(245, 245, 245, .3), rgba(245, 245, 245, 0));
  }

  .switch {
    width: 100%;
    padding-left: 60px;
    text-align: center;
    overflow: hidden;
  }

  .switch > img {
    width: 100px;
    height: 135px;
    position: relative;
    top: -18px;
    z-index: 1000;
  }

  .CD {
    width: 100%;
    height: 45vh;
    text-align: center;
    margin-top: -16vh;
  }

  .CD .disc {
    width: 45vh;
    height: 45vh;
    padding: 7.5vh;
    position: absolute;
    top: 21vh;
    left: 0;
    right: 0;
    margin: 0 auto;
    background-image: url(../../assets/img/cd-mine.png);
    background-size: 100% 100%;
    z-index: 500;
  }

  .CD .disc img {
    display: inline-block;
    width: 30vh;
    height: 30vh;
    border-radius: 50%;
  }

  /*switch动画*/
  .pause {
    /*transform:rotateZ(-30deg) translate3d(20px,-15px,0);*/
    transform: rotateZ(-30deg) translateX(42px);
    transition: all ease .6s;
  }

  .start {
    /*transform:rotateZ(-30deg) translate3d(20px,-15px,0);*/
    transform: rotateZ(0deg) translateX(0px);
    transition: all ease .6s;
  }

  .collect {
    width: 100%;
    padding: 12vh 20vw 0;
    display: flex;
    justify-content: space-between;
  }

  .collect .icon {
    font-size: 20px;
    display:inline-block;
  }

  /*进度条*/
  .process {
    width: 80vw;
    height: 15vh;
    line-height: 15vh;
    /*margin:0vh 7vw;*/
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 7vh;
    left: 10vw;
  }

  .process .begin, .process .end {
    display: inline-block;
    width: 13vw;
    line-height: 15vh;

  }

  .process .processBar {
    display: inline-block;
    width: 60vw;
    margin: 0 1vw;
    height: 2px;
    margin-top: 7vh;
    background: #F1F1F1;
    position: relative;
    cursor: pointer;
    margin-right: 20px;
  }

  .slot {
    display: block;
    width: 15px;
    height: 15px;
    position: absolute;
    top: -6px;
    left: 0%;
    border-radius: 50%;
    background-color: #FFFFFF;
    cursor: pointer;
  }

  .processBar .played {
    display: block;
    width: 0%;
    height: 2px;
    background-color: red;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1001;
  }

  /*控制播放的按钮*/
  .control {
    width: 100%;
    padding: 2vh 8vw;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
  }

  .control span {
    width: 50%;
    display: flex;
    justify-content: space-between;
  }

  .control i {
    font-size: 25px;
  }

  #mode {
    width: 10%;
  }

  #list {
    width: 10%;
  }

  #start {
    font-size: 40px !important;
    position: relative;
    top: -10px;
  }

  /*滑动进入动画*/
  .fade-enter{
    transform: translateY(100vh);
  }
   .fade-leave-active{
   	transform: translateX(100vw);
   	opacity: .5;
   }

  .fade-enter-active, .fade-leave-active {
    transition: all 0.6s;
  }


  /*调音量*/
  .vol {
    width: 90vw;
    margin-left: 5vw;
    margin-top: 2vh;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
  }

  .icon-volume-medium {
    display: inline-block;
    font-size: 18px;
  }

  .vol .vols {
    display: inline-block;
    width: 80vw;
  }

  /*歌词*/
  .lyric {
    width: 80vw;
    height: 60vh;
    margin: 3vh auto;
    list-style: none;
    overflow: hidden;
  }

  .lyric li {
    text-align: center;
    height: 6vh;
    line-height:6vh;
    font-size: 13px;
  }

  /*激活当前行的样式*/
  .active {
    font-weight: 600;
    color: darkgoldenrod;
  }

</style>
