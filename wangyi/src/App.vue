<template>
  <div id="app" v-cloak>
     <Headers></Headers>
     <Foots></Foots>
     <Slide></Slide>
     <Audios></Audios>     <!--音乐播放-->
     <Play></Play>
     <Detail></Detail>
    
  </div>
</template>

<script>
import Audios from './components/music/audio'
import Headers from './components/header/headers'
import Foots from './components/foot/footers'
import Slide from './components/slideMenu/slideMenu'
import Play from './components/playpage/playpage'
import Detail from './components/detail/detail'


export default {
  name: 'app',
  data(){
     return {
 
	  }
  },
  components:{
     Headers,
	   Foots,
	   Slide,
	   Audios,
	   Play,
	   Detail


  }
  
}
</script>

<style>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}
#app {
  width:100%;
  margin:0;
  padding:0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}



</style>
