<template>
	<div class="recommend">
		<div class="lunbo">
			<mt-swipe :auto="4000">
			  <mt-swipe-item class="myswiper" v-for="item in swipers" :key="item.id">
			  	  <img :src="item['img']" />
			  </mt-swipe-item>
			</mt-swipe>
		</div>
		<div class="iconNav">
			<ul class="clearfix">
				<li>
					<i class="icon-fm icon-style"></i><br />
					私人FM
				</li>
				<li>
					<i class="icon-date icon-style"></i><br />
					每日听歌推荐
				</li>
				<li>
					<i class="icon-rank-list icon-style"></i><br />
					私人FM
				</li>
			</ul>
		</div>
		<div class="recomlist">
			<h4 class="recomhead" @click="shows">推荐歌单 &nbsp;<i class="icon-right"></i></h4>
			<ul class="sheets clearfix">
				<li v-for="item in sheets">
					<img :src="item['bg']" style="width: 100%;height: auto;" /><br />
					<p class="infos">{{item['name']}}</p>
					<span class="statics"><i class="icon-erji">{{item['count']}}万</i></span>
				</li>
			</ul>
		</div>
		
	</div>
</template>

<script>
	export default({
		data(){
			return {
				swipers:[
				    {
				    	img:require('../../assets/img/swiper01.jpg'),
				        id:0
				    },
				    {
				    	img:require('../../assets/img/swiper02.jpg'),
				    	id:1
				    },
				    {
				    	img:require('../../assets/img/swiper03.jpg'),
				        id:2
				    },
				    {
				    	img:require('../../assets/img/swiper04.jpg'),
				        id:3
				    },
				    {
				    	img:require('../../assets/img/swiper05.jpg'),
				        id:4
				    }
				]
			}
		},
		computed:{
			sheets(){
				return this.$store.getters.recomendsheet;
			}
		},
		methods:{
			shows(){
				console.log(this.sheets);
			}
		}
	})
</script>

<style>
	.clearfix:after,.clearfix:before{
	   content:""; 
	   display: block; 
	   clear:both; 
	}
	.lunbo{
		width: 100%;
		height:30vh;
		box-sizing: border-box;
	}
	.myswiper>img{
		width: 100%;
		height:100%;
	}
	.mint-swipe-indicator{
		opacity: 0.8!important;
	}
	.mint-swipe-indicator.is-active{
		background:red!important;
	}
	.iconNav{
		width: 100%;
		padding:4vh 0 0vh;
	}
	.iconNav ul{
		list-style: none;
		box-sizing: border-box;
	}
	.iconNav ul li{
		width:33%;
		line-height:2;
		text-align: center;
		float: left;
	}
	.icon-style{
		color: red;
		font-size:35px;
		border:1px solid red;
		padding:8px;
		border-radius: 50%;
	}
	.recomhead{
		padding-left: 2vw;
		border-left: 3px solid red;
		font-weight: 500;
		margin:2vh 0;
	}
	.recomhead .icon-right{
		color: gray;
		font-size: 18px;
	}
	.recomlist .sheets li{
		width: 33%;
		float: left;
		padding:5px 2px;
		list-style: none;
		position: relative;
	}
	.sheets li .infos{                  /*省略号效果*/
		width:100%;
		font-size: 13px;
		display: -webkit-box;
		padding: 0 3px;
		line-height:4vh;             
		height:8vh;             
		overflow: hidden;
		-webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        box-sizing: border-box;
	}
	.sheets li .statics{
		position: absolute;
		top:8px;
		right: 2px;
		color: #FFFFFF;
		font-size: 14px;
	}
	
</style>