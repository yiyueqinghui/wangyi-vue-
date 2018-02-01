<template>
	<transition name="fade">
	    <div class="detail" v-show="detailbol" id="detail" ref="all"  @scroll="scroll()">
			<!--头部-->
			<div class="fix" :style="bg" ref="navs">
				<span><i class="icon-back" @click="fadePage"></i> 歌单</span>
				<span>
					<i class="icon-search"></i>
				    <i class="icon-list-circle"></i>
				</span>
			</div>
			<!--主体内容-->
			<div class="content"  >
			<!--简单信息，操作列表-->	
				<div class="infos" ref="infos" :style="bg" :data = "detailinfo['category']" >   <!--data是当前页面的歌曲类型-->
					<div class="headinfo">
						<div class="cover">
						    <img :src="detailinfo['imgSrc']"  />
						</div>
						<div class="detailinfo">
							<p>
								<a>{{detailinfo['txt']}}</a>  <br />
							    <img :src="detailinfo['userSrc']"  />
							   {{detailinfo['usertxt']}}
							   <i class="icon-right"></i>
							</p>
						</div>
					</div>
				    <p class="iconall">
				    	<i class="icon icon-collect"><br/> 收藏</i>
				    	<i class="icon icon-community"><br/> 评论</i>
				    	<i class="icon icon-share"><br/> 分享</i>
				    	<i class="icon icon-download"><br/> 下载</i>
				    </p>
			    </div>
				<!--歌曲列表-->
				<div class="musiclists">
					<p class="head">
						<span><i class="icon-music"></i> 播放全部<a class="size">(共{{allnum}}首)</a></span>
						<span><i class="icon-menu">多选</i></span>
					</p>
					<ul class="lists" >                                                                                                          
						<li class="clearfix" v-for="(item,index) in alllist['music']" @click="plays(index)">
							<p class="listleft">
							    <span v-if="index!=currentnum || category!=data ">{{index+1}}</span>
							    <span v-if="index==currentnum&& category == data" class="icon-volume-medium"></span>
							</p>
							<p class="listcen">
								<span>{{item['name']}}</span><br />
								<span class="author">{{item['author']}}</span>
							</p>
							<p class="listright">
								<i class="icons icon-list-circle"></i>
							</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default({
		data(){
			return {
				bg:{
					background:'#2c3e50',
					opacity:.8,
					filter:'alpha(opacity:.8)'
				},
				imgurl:'http://oiq8j9er1.bkt.clouddn.com/music_1989.jpg',
				album:'大卫托夫斯基',
				users:'未曾遗忘的青春',
				allnum:0,
				all:'',
				currentnum:null,
				point:0,
				id:'detail',
				bools:false,   //判断当前播放的歌曲列表和打开的详情歌曲列表是否是一个列表
				data:''          //当前播放的歌曲类型
			}
		},
		computed:{
		   alllist(){
				return this.$store.state.categorylist;
		   },
		   detailbol(){
		   	    return this.$store.state.detailbol;
		   },
		   detailinfo(){
		   	    this.data = this.$store.state.category['category'];
		   	    return this.$store.state.category;
		   },
		   ids(){
		   	    return this.$store.state.ids;
		   },
		   category(){
		   	    return this.$store.state.cate; 
		   }
		   
		},
		watch:{
//		   动态修改歌曲总数
			alllist:function(newval,oldval){
				if(newval){
     				this.allnum = newval['music'].length;
				}

			},
			ids:function(newval,oldval){
//				console.log(this.currentnum);
			     this.currentnum = newval;

			}
		},
		methods:{
			plays(ids){
				this.currentnum = ids;
				var category = this.data;
				this.$store.commit('changelists',category);
				this.$store.commit('changeids',ids);
			},
//			滚动到歌单时自动更改透明度
			scroll(){
					var h = this.$refs.all.scrollTop;
					this.point = this.$refs.infos.offsetHeight - this.$refs.navs.offsetHeight;
			   	    if(h>this.point){
			   	    	this.bg['opacity'] = 1;
			   	    	this.bg['filter'] = 'alpha(opacity:1)';
			   	    }else{
			   	        this.bg['opacity'] = .8;
			   	        this.bg['filter'] = 'alpha(opacity:0.8)';
			   	    }
		   },
//		   推出该页面
		   fadePage(){
		   	   this.$store.commit('changedetail');
//		   	        让页面滚动回顶部,使得下次打开时滚动条在顶部，否则页面显示的会是上一次浏览离开时的位置
		   	   var detail = document.querySelector('.detail');
		   	   detail.scrollTop = 0;
		   }
		}
})
</script>

<style scoped>
	.detail{
		width:100%;
		height:100vh;
		padding-top:8vh;
		position:fixed;
		top: 0;
		left: 0;
		z-index: 500;
		background-color: #FFFFFF;
		overflow:scroll;
	}
	.fix{
		width: 100vw;
		height: 8vh;
		line-height:8vh;
		display: flex;
		justify-content: space-between;
		position: fixed;
		top: 0;
		color: #FFFFFF;
		padding:0 4vw;
		z-index: 5000;
	}

	.fix .icon-search{
		margin-right: 8px;
	}
	.icon-search,.icon-list-circle{
		font-size: 20px;
	}
	/*详情信息*/
	.infos{
		width: 100vw;
		padding:0 4vw 3vh;
	}
	.headinfo{
		width: 100%;
		height: 20vh;
		overflow: hidden;
	}
	.headinfo .cover{
		width: 40vw;
		height: 20vh;
		float: left;
		padding-right: 3vw;
	}
	.cover img{
		width: 100%;
		height: auto;
	}
	.headinfo .detailinfo{
		width: 52vw;
		height: 20vh;
		float: left;
		color: #FFFFFF;
	}
	.detailinfo p{
		width: 100%;
		height:20vh;
		padding-top:2vh;
		line-height:1.5;
	}
	.detailinfo img{
		width:5vh;
		height: auto;
		border-radius: 50%;
		position: relative;
		top: 1vh;
	}
	.iconall{
		width: 100%;
		margin-top:10px;
		display: flex;
		justify-content: space-around;
		color: #FFFFFF;
	}
	.icon{
		text-align: center;
		line-height: 1.2;
		font-size: 16px;
	}
	/*播放列表*/
	.musiclists{
		padding-bottom:12vh;
	}
	.musiclists .head{
		width: 100%;
		height: 7vh;
		line-height:7vh;
		display: flex;
		justify-content: space-between;
		background: #FFFFFF;
		padding:0 3vw;
		border-bottom: 1px solid lightgrey;
	}
	.head .size{
		font-size: 13px;
		color: grey;
	}
	.clearfix:before,.clearfix:after {
		height: 0;
        content: "";
        display: block;
        clear: both;
    }
    .clearfix {
        zoom: 1;
    }
	.lists li{
		width: 100vw;
		height: 8vh;
		line-height:8vh;
		box-sizing: border-box;
	}
	.lists li .listleft{
		width: 15vw;
		text-align: center;
		color: gray;
		float: left;
	}
	.lists li .listcen{
		width:70vw;
       display: inline-block;
		line-height: 4vh;
		float: left;
		border-bottom: 1px solid lightgray;
	}
	.lists li .listright{
		width: 15vw;
		text-align: center;
		float: left;
		border-bottom: 1px solid lightgray;
	}
	.icons{
		color: grey;
	}
	.icon-volume-medium{
		color: red;
	}
	.author{
		font-size: 13px;
		color: darkgray;
	}
	.icon-music{
		position: relative;
		top: 2px;
		font-size: 17px;
	}
	/*详情页显示消失动画*/
	.fade-enter{
		transform: translateY(100vh);
	}
	.fade-leave-active{
		transform:translateX(100vw);
		opacity: 0.3;
	}
	.fade-enter-active{
		transition: all 0.5s;
	}
	.fade-leave-active{
		transition: all 0.5s;
	}
</style>
