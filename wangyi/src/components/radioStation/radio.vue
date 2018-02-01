<template>
   <div class="radio">
     <!--头部导航-->
     <div class="navs">
     	<ul>
     		<li>
     			<router-link to="/radio" exact>个性推荐</router-link>
     		</li>
     		<li>
     			<router-link to="/radio/songsheet">歌单</router-link>
     		</li>
     		<li>
     			<router-link to="/radio/zuboradio">主播电台</router-link>
     		</li>
     		<li>
     			<router-link to="/radio/ranklist">排行榜</router-link>
     		</li>
     	</ul>
     </div>
     <div class="content">
     	<router-view></router-view>
     </div>
        
   </div>
</template>

<script>
export default({
   data(){
      return {
	  
	  }
   },
   methods:{
   
   }


})

</script>

<style scoped>
   .radio{
      width:100%;
	  margin-top:39px;
	  margin-bottom:50px;
   }
   .navs{
   	  width: 100%;
   	  height: 35px;
   	  line-height: 35px;
   	  background-color: #FFFFFF;
      position: fixed;
      top:40px;
      left: 0;
      z-index: 500;
   }
   .navs ul{
   	  /*display: flex;
   	  justify-content:space-around;*/
   	  width: 100%;
   	  overflow: hidden;
      font-size:4.5vw;
      list-style: none;
   }
   .navs ul li{
   	  width:25%;
   	  text-align: center;
   	  float: left;
   }
   .navs ul li a{
   	  display: block;
   	  text-decoration: none;
      color: #000000;
   }
   .content{
     width: 100%;
     margin-top:75px;
   }
   .router-link-active{
   	 color:#c62f2f!important;
   	 border-bottom: 2px solid #c62f2f;
   }

</style>