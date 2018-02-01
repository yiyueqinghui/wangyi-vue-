<template>
	<div id="audio">
		<!-- HTML5audio duration返回NaN问题及歌曲切换总时间改变问题
                                歌曲切换歌曲总时间的对应改变使用durationchange事件-->
		<audio :src="musicUrl" id="myaudio"  @durationchange="all"   @timeupdate="change()" >
			
		</audio>
		
	</div>
</template>

<script>
	export default{
		data(){
			return {
				musicUrl:'http://www.daiwei.org/vue/music/%E6%9E%97%E4%BF%8A%E6%9D%B0,%E8%94%A1%E5%8D%93%E5%A6%8D%20-%20%E5%B0%8F%E9%85%92%E7%AA%9D.mp3',
				allTime:0    //当前播放音乐的时长（单位s）
				
			}
		},
		methods:{
//			更新状态,开始播放
			change(){
				var current = myaudio.currentTime;
				this.$store.commit('equal');
			},
			all(){
				this.allTime = parseInt(myaudio.duration);
//			    console.log(this.allTime);
			    this.$store.commit('totaltime',this.allTime);
			},
			aplay(){
				myaudio.play();
			}

		},
		computed:{
			//接受控制播放的数据
			stop(){
//				console.log(this.$store.state.st);
				return this.$store.state.st;
			},
			current(){
				return this.$store.state.current;
			},
			volum(){
				return this.$store.state.vols;
			},
			urls(){
				return this.$store.state.currentmusic;
			}
			
			
		},
		watch:{
//			改变播放暂停的状态
			stop:function(newval,oldval){
				if(newval){
					myaudio.play();
				}else{
					myaudio.pause();
				}
			},
			current:function(newval,oldval){
				myaudio.currentTime = newval;
				this.$store.commit('changeSt');
			},
			volum:function(newval,oldval){
				myaudio.volume = newval;       //audio.volume = num   (num 0---1之间)  控制音量的大小
			},
			urls:function(newval,oldval){
				this.musicUrl = newval['url'];
                if(this.stop){ 
                	//更改音乐链接时,必须先暂停再播放。此处采用的是setTimeout延时器,确定在src更换完成后在执行播放操作
	               setTimeout(function(){
					   myaudio.play();
				   })
                }
				

			}
			
		},
		mounted(){
//		       挂载之前定义好要操作的对象  （注意对象不可以写入data）
           var myaudio = document.getElementById('myaudio');
           this.$store.dispatch('getObj');    
           
		}
	}
</script>

<style scoped>
	#audio{
		display: none;
	}
</style>