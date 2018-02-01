<template>
	<div class="footBottom">
	    <table class="footLeft" @click="converts" v-show="!lists">
	    	<tr>
	    		<td>
		           <img src="http://oiq8j9er1.bkt.clouddn.com/music_%E6%88%91%E8%BF%98%E6%83%B3%E5%A5%B9.jpg"/>
	    		</td>
	    		<td class="musicName">
	    			<span class="song">{{musicname}}</span> <br />
			        <span class="singer" style="font-size:4vw;color:#aaa;">{{author}}</span>
	    		</td>
	    		<td class="icon-log">
	    			<i :class="icons" @click.stop='plays'></i>
		            <i class="icon-list-music"  @click.stop="changelist"></i>
	    		</td>
	    	</tr>
		</table>
		 <!--歌单列表-->
       <Musiclist :trans='lists' :space='tops' @changetrans='translist'></Musiclist> 
       <div v-show="lists" class="masks"></div>

	</div>
</template>

<script>
	import Musiclist from '../musiclist/musiclist'
	export default({
		data(){
			return {
                icons:'icon-playdetail',
                musicname:'',
                author:'',
                lists:false,
                tops:{
                	top:'-100vh',
                }
			}
		},
		computed:{
			sted(){
				return this.$store.state.st;
			},
			infos(){
				return this.$store.state.currentmusic;
			}
		},
		methods:{
			converts(){
				this.$store.commit('changeface');
			},
			plays(){
				this.$store.commit('changeSt');
			},
//			歌单列表消失
			translist(){
				this.lists = !this.lists;
				//pc端防止遮罩层下面的页面滚动
			    var bod = document.getElementsByTagName('body')[0];
				bod.style.overflow = '';
			},
//			歌单列表出现
			changelist(){
				this.lists = !this.lists;
				//pc端防止遮罩层下面的页面滚动
			    var bod = document.getElementsByTagName('body')[0];
				bod.style.overflow = 'hidden';
			},
		},
		watch:{
			sted:function(newval,oldval){
//				console.log(newval);
				if(newval){
					this.icons = 'icon-pause-detail'
				}else{
					this.icons = 'icon-playdetail'
				}
			},
			infos:function(newval,oldval){
				this.musicname = newval['name'];
				this.author = newval['author'];
			}
		},
		components:{
			Musiclist
		}
	})
</script>

<style scoped>
   .footBottom{
   	 width: 100vw;
   	 background-color:#FFFFFF;
   	 position: fixed;
   	 bottom:0;
   	 z-index: 505;
  
   }
   .footLeft{
   	 width:100vw;
   	 float: left;
   }
   .footLeft td:first-child{
   	  width:14vw;
   	  padding-right: 2vw;
   }
   .footLeft td.musicName{
   	  width:60vw;
   }
   .footLeft img{
   	  width:100%;
   	  height: auto;
   }
   .footLeft td.icon-log{
   	  width:24vw;
   	  padding-right:2vw;
   }
   .icon-log>i{
   	 font-size: 7vw;
   	 margin-right:2vw;
   }
   .song{
   	 font-size: 5vw;
   }
   .singer{
   	 font-size: 4vw;
   	 color:#aaa;
   }
   /*遮罩层*/
  .masks{
  	width: 100vw;
  	height: 100vh;
  	position: fixed;
  	top: 0;
  	left: 0;
  	z-index:400;
  	background-color: lightgray;
  	opacity: 0.5;
  }
</style>
