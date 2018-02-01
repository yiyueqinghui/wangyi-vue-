<template>
    <div>
		<div class="header" >
			<i class="icon-menu" @click="$store.commit('changeSlide')"></i>
			<div class="svg">
			   <router-link class="tabs" to="/" exact >
				   <i class="icon-music"></i>
			   </router-link>
			   <router-link class="tabs" to="/radio">
				   <i class="icon-wangyiyun"></i>
			   </router-link>
			   <router-link class="tabs" to="/community">
				   <i class="icon-community"></i>
			   </router-link>
			</div>
			<i class="icon-search"></i>		 
		</div>
		<div class="bodys">
		    <router-view></router-view>
		</div>
		<!--遮罩层   @scroll.prevent  防止移动端页面的滚动-->
		<div :class="{mask:bol}" @click="$store.commit('changeSlide')" @scroll.prevent >
      	     
        </div>
	    <!--<Foot></Foot>-->
        
    </div>
</template>

<script>

import Foot from '../foot/footers'
export default{
   data(){
      return {
	     
	  }
   },
   methods:{
   	
   },
   computed:{
   	 bol(){
   	 	return this.$store.state.slide;
   	 }
   },
   components:{
   	 Foot
   }
  
}
</script>

<style scoped>
   .header{
      width:100%;
	  height:40px;
	  padding:8px 14px;
	  background-color:#c62f2f;
	  display:flex;
	  justify-content:space-between;
	  font-size:22px;
	  color:#ffffff;
	  position:fixed;
	  top:0;
	  left:0;
	  right:0;
	  margin:0 auto;
	  z-index:200;
   }
   .svg{
      width:38%;
	  display:flex;
	  justify-content:space-between;
   }
   .tabs{
      color:#fff;
	  text-decoration:none;
   }
   .bodys{
   	 position: fixed;
   	 top: 0;
   	 bottom: 0;
   	 left: 0;
   	 right: 0;
   	 overflow: auto;
   }
   
   /*当前激活路由的样式(router-link-active是系统自动增加的,这里不过是利用其来改变样式)*/
   .router-link-active{              
      color:lightgrey;
   }
   
    /*遮罩层*/
    .mask{
	  	width:100vw;
	  	height:100vh;
	  	background-color:rgba(0,0,0,.5);
		position:fixed;
	  	top: 0;
	  	left: 0;
	  	z-index:300;
	}

     


</style>