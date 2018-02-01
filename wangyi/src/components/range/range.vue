<template>
	<div class="range">
		<span :class="processBar" @click.stop="adjust($event)" v-bind:style="{'background':bgColor}" >
			<a :class="slot" v-bind:style="{'background':dotColor}" @touchstart.stop="move($event)"  @touchmove.stop="moving"  @touchend.stop()="movend" ></a>
			<!--已播放时长-->
			<strong :class="played" v-bind:style="{'background':playColor}"></strong>
		</span>
	</div>
</template>

<script>
	export default({
		data(){
			return {
				current:0,
				playing:true,
				maxLeft:0,
				maxRight:0,
				processBar:'processBar',
				slot:'slot',
				played:'played',
				rate:0.5    //音量的变化
			}
		},
		props:{
			rangeType:{
				type:String,
			    default:'process'
			},
			allTime:{
				type:Number,
				default:0
			},
			bgColor:{
				type:String,
				default:'gray'
			},
			dotColor:{
				type:String,
				default:'lightgrey'
			},
			playSt:{
				type:Boolean,
				default:true
			},
			playColor:{
				type:String,
				default:'red'
			}
			
		},
		methods:{
			space:function(num){
				 var slot = document.getElementsByClassName(this.slot)[0];
				 var played = document.getElementsByClassName(this.played)[0];
			 	 played.style.width = num +"%";
			 	 slot.style.left = num +"%";
			},
//			点击进度条调整播放进度
        	adjust:function(e){
    	        var allLength =parseInt(document.getElementsByClassName(this.processBar)[0].offsetWidth);
    		    var rate =(e.offsetX/allLength).toFixed(2);
    		    var dura =parseInt(this.allTime * rate);
    		    var nums= rate*100;
    		    this.space(nums);
//      		  传送当前播放时间到store,调整播放进度
                if(this.rangeType=='process'){
    		       this.$store.commit('changeTime',dura);
                }else if(this.rangeType=='volum'){
                   this.$store.commit('changevol',rate);
                }

        	},

//      	滑动dot调节音乐播放进度touchstart
        	move:function(e){
        	        var dot = document.getElementsByClassName(this.slot)[0];
        	        this.current =parseInt(event.touches[0].clientX);
//      	        console.log(this.current);
//      	                   获取当前位置(也是当前距离左侧的距离)
        		    this.maxLeft = dot.offsetLeft;
					var maxlength =parseInt(document.getElementsByClassName(this.processBar)[0].offsetWidth);
					this.maxRight =maxlength - this.maxLeft; // 向右最大可拖动距离
				   // 禁止事件冒泡
					event.cancelBubble = true;

        	},

//      	滑动dot调节音乐播放进度touchmove
        	moving:function(e){
        		var _this = e.target;
        		var yidong =parseInt(event.touches[0].clientX);
                var spacd = yidong - this.current;

                var spa = this.maxLeft + spacd;
                if(spacd>0&&spacd>this.maxRight){
                	spacd = this.maxRight;
                }else if(spacd<0&&Math.abs(spacd)>this.maxLeft){
                	spacd = -this.maxLeft;
                }

                var endSpacd = this.maxLeft + spacd;

        		var rates =parseFloat(endSpacd/(this.maxLeft + this.maxRight));
        		this.rate = rates;
                this.startTime =parseInt(this.allTime * rates);
//              改变样式
                var nums = rates*100;
                this.space(nums);
        	},

//          滑动dot调节音乐播放进度touchend
        	movend:function(e){
//             改变当前的播放时间
               if(this.rangeType=='process'){
	        	   this.$store.commit('changeTime',this.startTime);
	        	}else if(this.rangeType=='volum'){
                   this.$store.commit('changevol',this.rate);
                }
        	}
		},
		mounted(){
			if(this.rangeType=='volum'){
				this.processBar = 'processBar02';
				this.slot = 'slot02';
				this.played = 'played02';
			}else{
				this.processBar = 'processBar';
				this.slot = 'slot';
				this.played = 'played';
				this.space(50);
			}
		}
	})
</script>

<style scoped>
	/*进度条*/
	.range{
		width:100%;
		/*margin-top:15px;*/
	    /*height:15vh;
	    line-height: 15vh;*/
		/*margin:0vh 7vw;*/
		display:flex;
		justify-content: space-between;
		/*position: absolute;
		bottom: 7vh;
		left: 10vw;*/
	}
	.range .begin,.range .end{
		display: inline-block;
		width:13vw;
		/*line-height: 15vh;*/

	}
	.range .processBar{
		display: inline-block;
		width:100%;
		margin:0 1vw;
		height: 2px;
		/*margin-top:7vh;*/
		background:gray;
		position: relative;
        cursor: pointer;
        margin-right: 20px;
	}
	.range .processBar02{
		display: inline-block;
		width:100%;
		margin:0 1vw;
		height: 2px;
		/*margin-top:7vh;*/
		background:gray;
		position: relative;
        cursor: pointer;
        margin-right: 20px;
	}
	
	
    .slot{
		display:block;
		width:15px;
		height:15px;
		position:absolute;
		top:-6px;
		left:0%;
		border-radius: 50%;
		background-color:black;
		cursor: pointer;
	}
	.slot02{
		display:block;
		width:15px;
		height:15px;
		position:absolute;
		top:-6px;
		left:0%;
		border-radius: 50%;
		background-color:black;
		cursor: pointer;
	}

	.processBar .played{
		display:block;
		width:0%;
		height:2px;
		background-color:red;
		position:absolute;
		top:0;
		left:0;
		z-index:1001;
	}
	.processBar02 .played02{
		display:block;
		width:0%;
		height:2px;
		background-color:red;
		position:absolute;
		top:0;
		left:0;
		z-index:1001;
	}
	
</style>