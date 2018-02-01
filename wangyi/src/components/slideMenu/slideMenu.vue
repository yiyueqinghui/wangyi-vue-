<template>
   <transition name="fade">
   	 <div class="slideMenu" v-show="bols" >
   	 	<div>
	   	  <!--头部-->
	      <div class="slideHead">
	          <img :src='headurl' />  <br />
	          <p class="infoLine">
	          	 <span class="nickname">指间沙的记忆</span>
	          	 <span class="member">
	          	 	<img :src="memberUrl" />
	          	 </span>
	          	 <span class="grade">
	          	 	 LV9
	          	 </span>
	          	 <span class="sign" @click="coin">
	          	 	<i class="icon-coin" v-if="iconCoin"></i>
	          	 	签到
	          	 </span>
	          </p>
	      </div>
	      <!--主体-->
	      <div class="list">
	      	  <ul class="listItem">
	      	  	<li>
	      	  		<i class="icon icon-message"></i>
	      	  		<span>我的消息</span>
	      	  	</li>
	      	  	<li>
	      	  		<i class="icon icon-vip"></i>
	      	  		<span>我的会员</span>
	      	  		<span class="rightInfo">2018.05.10到期</span>
	      	  	</li>
	      	  	<li>
	      	  		<i class="icon icon-market"></i>
	      	  		<span>商城</span>
	      	  	</li>
	      	  </ul>
	      	  <ul class="listItem">
	      	  	<li>
	      	  		<i class="icon icon-friend"></i>
	      	  		<span>我的好友</span>
	      	  	</li>
	      	  	<li>
	      	  		<i class="icon icon-place"></i>
	      	  		<span>附近的人</span>
	      	  	</li>
	      	  </ul>
	      	  <ul class="listItem">
	      	  	<li>
	      	  		<i class="icon icon-theme"></i>
	      	  		<span>个性换肤</span>
	      	  		<span class="rightInfo">官方红</span>
	      	  	</li>
	      	  	<li>
	      	  		<i class="icon icon-set-time"></i>
	      	  		<span>定时播放</span>
	      	  	</li>
	      	  	<li>
	      	  		<i class="icon icon-lock"></i>
	      	  		<span>音乐闹钟</span>
	      	  	</li>
	      	  	<li>
	      	  		<i class="icon icon-car"></i>
	      	  		<span>驾驶模式</span>
	      	  	</li>
	      	  	<li>
	      	  		<i class="icon icon-cloud"></i>
	      	  		<span>音乐云盘</span>
	      	  	</li>
	      	  </ul>
	      </div>
	      <!--底部-->
	      <table class="slideBottom">
	      	 <tr>
	      	 	<td class="icon-night">
	      	 		夜间模式
	      	 	</td>
	      	 	<td class="icon-setting">
	      	 		设置
	      	 	</td>
	      	 	<td class="icon-exit">
	      	 		退出
	      	 	</td>
	      	 </tr>
	      </table>
	     </div>
	   </div>
	</transition>
     
   
  
</template>
import {mapState} from 'vuex'
<script>
	export default({
		data(){
			return {
			   headurl:require('../../assets/img/tou.jpg'),
			   memberUrl:require('../../assets/img/vip.png'),
			   iconCoin:true
			}
		},
		methods:{
			coin(){
			   var _this = document.getElementsByClassName('sign')[0];
			   _this.innerHTML = '已签到';
			   this.iconCoin = !this.iconCoin;
			}
		},
		computed:{
			bols(){
				return this.$store.state.slide;
			}
		}
	})
</script>

<style scoped>
   .slideMenu{
   	  width:85vw;
   	  height:100vh;
   	  box-sizing: border-box;
   	  background:rgb(240,240,240);
   	  position:fixed;
   	  top:0;
   	  left:0;
   	  z-index:1000;
   	  /*transform: translateX(-85vw);*/
   }
   .slideHead{
   	  width: 100%;
   	  height:30vh;
   	  background-image: url('http://www.daiwei.org/index/images/img/indeximg.jpg');
   	  background-size:cover;
   	  color:#FFFFFF;
   	  padding:13vh 4vw;
   }
   .slideHead>img{
   	  width:18vw;
   	  height:auto;
   	  border-radius: 50%;
   }
   .slideHead .member{
   	  position: relative;
   	  top:1vh;
   	  padding-top:1vh;
   }
   .slideHead .grade{ 
   	  border:1px solid #FFFFFF;
   	  padding:0.5vh 2vw;
   	  border-radius:5vw;
   	  font-size: 1vw;
   }
   .infoLine{
   	  width:100%;
   	  position: relative;
   }
   .coin{
   	  position: relative;
   	  top: 2px;
   }
   .slideHead .sign{
   	 display: inline-block;
   	 padding: 0.5vh 2vw;
   	 border: 1px solid #FFFFFF;
   	 border-radius: 5vw;
   	 font-size:3vw;
   	 position:absolute;
   	 right:2vw;
   	 top:1vh;  	
   }
   .list .listItem:last-child{
   	 margin-bottom:0;
   }
   .listItem{
   	 width:100%;
   	 margin-bottom:1vh;
   	 background-color:#FFFFFF;
   	 padding-left:5vw;
   	 list-style: none;
   }
   .listItem li{
   	 padding:1.5vh 0;
   	 position: relative;
   }
   .listItem li .rightInfo{
   	 position: absolute;
   	 right:2vw;
   	 top:1.5vh;
   	 font-size: 15px;
   	 color: darkgray;
   }
   .listItem li i{
   	 font-size: 18px;
   	 position: relative;
   	 top:2px;
   }
   /*底部*/
  .slideBottom{
  	 width: 100%;
  	 height:7vh;
  	 position: fixed;
  	 bottom: 0;
  	 width:100%;
  	 max-width: 85vw;
  	 background-color:#FFFFFF;
  	 padding-left:5vw;
  	 border-top:1px solid lightgray;
  }
  .icon-setting{
  	font-size: 18px;
  }
 
  /*滑动动画*/
  .fade-enter,.fade-leave-active{
  	 transform: translateX(-85vw);
  }
  .fade-enter-active,.fade-leave-active{
  	transition: all 0.6s;
  }
   
</style>