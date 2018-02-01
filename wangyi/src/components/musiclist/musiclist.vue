<template>
	<transition name='fades'>
		<div class="musiclist" v-show='trans' :style="space" @scroll.prevent>
			<div class="musictop" @click="changetrans"></div>
			<div class="musicbg">
				<h4 class="title">
				    <span> <i class="icon icon-music-shunxu">列表循环（{{allnum}}）</i></span>
				    <span>
				    	<i class="icon icon-add">收藏</i>
				    	<i class="icon icon-delete">清空</i>
				    </span>
				</h4>
				<ul class="lists">
					<li v-for="(item,index) in all" @click="played(index)">
						<i class="icon-volume-medium" v-if="index==ids"></i>
						{{item.name}} - {{item.author}}
					</li>
				</ul>
			</div>
			<!--<div id="mask" v-show='trans'></div>-->
		</div>
		
	</transition>
</template>

<script>
	export default({
		data(){
			return {
				allnum:0,     //列表长度
				all:null,    //所有列表信息
//				ids:0,        //默认播放的歌曲序列
				lists:true
			}
		},
		props:['trans','space'],
		methods:{
			played(order){
				this.$store.commit('changeids',order);
			},
			changetrans(){
				this.$emit('changetrans')
			}
		},
		computed:{
			alllist(){
				return this.$store.state.musiclist;
			},
			ids(){
			   return this.$store.state.ids;
			}
		},
		watch:{
			alllist:function(newval,oldval){
				if(newval){
					this.all = newval['music'];
					this.allnum = this.all.length;
				}
			}
		}
	})
</script>

<style scoped>
    .musiclist{
    	width:100vw;
    	height:100vh;
    	padding:0;
    	z-index:3000000;
    	position:absolute;
    	top: 0;
    }
    .musictop{
    	width: 100vw;
    	height:50vh;
    	
    }
    .musicbg{
    	width:100vw;
    	height:50vh;
    	overflow-y: scroll;
    	background-color: #FFFFFF;
    	padding-left: 5vw;
    }
    .musicbg .title{
    	display: flex;
    	justify-content: space-between;
    	height: 6vh;
    	line-height: 6vh;
    	padding-right:5vw;
    }
    .icon{
    	font-size:16px;
    	color: #000000;
    }
    .lists{
    	width: 100%;
    	height: 44vh;
    	overflow-y: auto;
    }
    .lists li{
    	color:#666;
    	border-top:1px solid lightgray;
    	height:6vh;
    	font-size: 13px;
    	line-height: 6vh;
    }
    .icon-volume-medium{
    	color: red;
    	font-size: 13px;
    }
    
    /*出现时的动画*/
    .fades-enter, .fades-leave-active {
	   transform: translateY(100vh);
	}

    .fades-enter-active, .fades-leave-active {
	   transition: all 0.6s;
     }
     
     /*遮罩层*/
    #mask{
    	width: 100vw;
    	height: 100vh;
    	position: absolute;
    	top: 0;
    	background-color: #E1E1E1;
    	opacity: 0.3;
    }
    

</style>