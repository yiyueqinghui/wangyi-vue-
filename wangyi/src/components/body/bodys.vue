<template>
   <div class="main">
	    <div class="music_cate">
		    <p class="category">
			     <i class="icon icon-music"></i>
			     <span>我的音乐(28)</span>
				 <i class="icon-volume-medium"></i>
		    </p>
			<p class="category">
			     <i class="icon icon-zuijinplay"></i>
			     <span>最近播放(18)</span>
		    </p>
			<p class="category">
			     <i class="icon icon-diantai"></i>
			     <span>我的电台(1)</span>
		    </p>
			<p class="category">
			     <i class="icon icon-collect"></i>
			     <span>我的收藏(2)</span>
		    </p>
		</div>
		<p class="musicList" @click="slide('musicList')">
		   <i class="icon-right resolve"></i>
		   <a>我创建的歌单(5)</a>
		   <i class="icon-setting"></i>
		</p>
		<div class="myCreat" v-if="creatBol">
		    <ul>
			    <li v-for="item in creatMusic" @click="enterdetail(item)">
				    <p class="pic">
					    <img :src="item.imgSrc"/>
					</p>
					<table class="content">
					     <tr>
						     <td>{{item.txt}}<br/><a>{{item.allNum}}首歌曲</a></td>
						     <td><i class="icon-list-circle"></i></td>
						 </tr>
					</table>
				</li>
			</ul>
		</div>
		<p class="musicList collectList" @click="slide('collectList')">
		   <i class="icon-right"></i>
		   <a>我收藏的歌单(5)</a>
		   <i class="icon-setting"></i>
		</p>
		<div class="myCreat" v-if="collectBol">
		    <ul>
			    <li v-for="item in collect" @click="enterdetail(item)">
				    <p class="pic">
					    <img :src="item.imgSrc"/>
					</p>
					<table class="content">
					     <tr>
						     <td>
							    <p>
							      {{item.txt}}<br/><a>{{item.allNum}}首歌曲</a>
							    </p>
							  </td>
						     <td><i class="icon-list-circle"></i></td>
						 </tr>
					</table>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>

export default{
   data(){
      return {
	     creatMusic:[
		     {
		       category:'mylove',
			   imgSrc:"http://oiq8j9er1.bkt.clouddn.com/music_far%20away.jpg",
			   txt:"我喜欢的音乐",
			   allNum:30,
			   userSrc:"http://oiq8j9er1.bkt.clouddn.com/music_Summertime%20.jpg",
			   usertxt:'MYlove'
			 },
			 {
			   category:'europe',
			   imgSrc:"http://oiq8j9er1.bkt.clouddn.com/music_owl_city.jpg",
			   txt:"在欧洲田园般的乡村上骑单车",
			   allNum:15,
			   userSrc:"http://oiq8j9er1.bkt.clouddn.com/music_Summertime%20.jpg",
			   usertxt:'erropean'
			 },
			 {
			   category:'caomei',
			   imgSrc:"http://oiq8j9er1.bkt.clouddn.com/music_1989.jpg",
			   txt:"大卫爱上泰勒斯福特",
			   allNum:3,
			   userSrc:"http://oiq8j9er1.bkt.clouddn.com/music_Summertime%20.jpg",
			   usertxt:'Dewei'
			 },
			 {
			   category:'saonian',
			   imgSrc:"http://oiq8j9er1.bkt.clouddn.com/music_faded-1.jpg",
			   txt:"【电竞】抖腿必备",
			   allNum:18,
			   userSrc:"http://oiq8j9er1.bkt.clouddn.com/music_Summertime%20.jpg",
			   usertxt:'dianjing'
			 },
			 {
			   category:'nianqing',
			   imgSrc:"http://oiq8j9er1.bkt.clouddn.com/music_%E6%88%91%E8%BF%98%E6%83%B3%E5%A5%B9.jpg",
			   txt:"华语经典,是青春,是会议",
			   allNum:25,
			   userSrc:"http://oiq8j9er1.bkt.clouddn.com/music_Summertime%20.jpg",
			   usertxt:'qingchunhuiyi'
			 }
		 ],
		 collect:[
		     {
		       category:'likesong',
			   imgSrc:"http://oiq8j9er1.bkt.clouddn.com/music_chinaO.jpg",
			   txt:"这应该市你比较喜欢听的歌曲,生生世世永相随",
			   allNum:25,
			   userSrc:"http://oiq8j9er1.bkt.clouddn.com/music_Summertime%20.jpg",
			   usertxt:'生生世世'
			 },
			 {
			   category:'anjing',
			   imgSrc:"http://oiq8j9er1.bkt.clouddn.com/music_You%E2%80%99re%20Not%20Alone.jpg",
			   txt:"欧美风格的音乐，安静的听",
			   allNum:15,
			   userSrc:"http://oiq8j9er1.bkt.clouddn.com/music_Summertime%20.jpg",
			   usertxt:'安静小调'
			 },
			 {
			   category:'lovers',
			   imgSrc:"http://oiq8j9er1.bkt.clouddn.com/music_red.jpg",
			   txt:"我心爱的爱人",
			   allNum:14,
			   userSrc:"http://oiq8j9er1.bkt.clouddn.com/music_Summertime%20.jpg",
			   usertxt:'lover'
			 },
			 {
			   category:'candou',
			   imgSrc:"http://oiq8j9er1.bkt.clouddn.com/music_autumn.jpg",
			   txt:"颤抖吧，骚年！！！",
			   allNum:19,
			   userSrc:"http://oiq8j9er1.bkt.clouddn.com/music_Summertime%20.jpg",
			   usertxt:'我的年华'
			 },
			 {
			   category:'qingchun',
			   imgSrc:"http://oiq8j9er1.bkt.clouddn.com/music_qingnianwanbao.jpg",
			   txt:"年轻时候追的歌曲",
			   allNum:25,
			   userSrc:"http://oiq8j9er1.bkt.clouddn.com/music_Summertime%20.jpg",
			   usertxt:'青春一去不复返'
			   
			 }
		 ],
		 //控制我收藏的歌单和我喜欢的歌单的收放
		 creatBol:true,
		 collectBol:true
	  }
   },
   methods:{
     slide:function(cla){
	    var tag = document.getElementsByClassName(cla)[0],
		    icon = tag.firstChild,
		    bool = true,
		    current = 0;
		if(cla=='musicList'){
		   this.creatBol = !this.creatBol;
		   bool = this.creatBol;
		}else{
		   this.collectBol = !this.collectBol;
		   bool = this.collectBol;
		}
		if(bool){
			current = 90;
		}else{
			current = 0;
		}
		icon.style.transform = "rotate("+current+"deg)";
		icon.style.transition = "all 0.3s linear";
		    
	 },
//	 进入详情页
	 enterdetail:function(txt){
	 	this.$store.commit('changedetail',txt);
	 }
  },
  computed:{
  	all(){
  		return this.$store.state.allmusic;
  	}
  },
  watch:{
  	all:function(newval,oldval){
  		if(newval){
  			for(var i in this.creatMusic){
  				var cate = this.creatMusic[i]['category'];
  				this.creatMusic[i]['allNum'] = newval[cate]['music'].length;
				//console.log(this.creatMusic[i]['allNum']);
  			}
			for(var j in this.collect){
				var cates = this.collect[j]['category'];
				this.collect[j]['allNum'] = newval[cates]['music'].length;
			}
  		}
  	}
  }
}
</script>

<style scoped>
   .main{
     width:100%;
	 font-size:15px;
	 background-color:rgb(247,247,247);
	 margin-top:39px;
	 color:#333;
	 margin-bottom:50px;
   }
   .music_cate .category{ 
	 padding:12px 0 12px 0px;
	 margin-left:40px;
	 border-bottom:1px solid lightgrey;
	 position:relative;
   }
   .category span{
     position:relative;
	 left:-30px;
   }
   .category .icon-volume-medium{
     display:inline-block;
     position:absolute;
	 top:16px;
	 left:88%;
	 font-size:15px;
   }
   .main .icon{
     color:red;
	 font-size:20px;
	 margin-right:10px;
	 position:relative;
	 left:-30px;
	 top:2px;
   }
   .icon-volume-medium{
     color:red;
   }
   
   .musicList{
      width:100%;
	  height:30px;
	  background-color:#e1e1e1;
	  line-height:30px;
	  color:#666;
	  padding-left:10px;
	  font-size:13px;
	  position:relative;
	  
   }
   .musicList .icon-setting{
      position:absolute;
	  top:8px;
	  right:15px;
	  font-size:15px;
   }
   .myCreat{
      width:100%;
	  padding:5px 0;
	  display:block;
   }
   .myCreat ul li{
      list-style:none;
   }
   .myCreat ul li:last-child .content{
      border-bottom:none;
   }
   .myCreat .pic{
      width:15%;
      height:100%;
	  padding-left:8px;
	  margin-right:5px;
	  display:inline-block;
	  position:relative;
	  top:-5px;
   }
   .pic img{
      width:100%;
	  height:auto;
   }
   .myCreat .content{
      width:80%;
	  display:inline-block;
	  height:100%;
	  color:#333;
	  padding:5px 0;
	  border-bottom:1px solid lightgrey;
   }
   .content>tr>td:nth-of-type(1){
      width:100%;
	  max-width:230px;
   }
   .content>tr>td:nth-of-type(1)>p{
      max-width:100%;
	  overflow:hidden;
	  text-overflow:ellipsis;
	  white-space:nowrap;
   }
   .content td a{
      font-size:12px;
   }
   .content .icon-list-circle{
      font-size:18px;  
	  color:gray;
   }
   .icon-right{
   	 display: inline-block;
   }
   .resolve{
   	 transform: rotate(90deg);
   }
   
  
   
 
   
   
  


</style>