import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		slide:false,   //控制侧拉菜单滑动
		st:false,      //控制音乐暂停播放
		currenttime:0 ,  //音乐播放时自动传递的当前播放时间
		current:0,       //点击进度条修改后的当前应该的播放时间
		alltime:0,        //当前音乐的总时长
		playface:false ,    //播放界面是否显示
		vols:0.5 ,           //当前音量的大小
		allmusic:{},         //请求返回的所有数据，即data 
		musiclist: {} ,      //歌曲列表详细信息,形式 {"music":[]}
		currentmusic:{} ,       //当前播放歌曲的信息对象   上方数组里边的某一项
		ids:0 ,                //当前播放歌曲的序列
		detailbol:false,        //详情页显示消失动画
		category:{},            //我创建的歌单和我收藏的歌单的详情页显示的信息
		categorylist:{},         //详情页显示的歌曲列表集合,形式 {"music":[]}
		cate:'default' ,           // musiclist.vue里面的歌曲属于哪种类型

	},
	mutations:{
//		侧面滑动菜单
		changeSlide(state){
			state.slide = !state.slide;
//			pc端防止遮罩层下面的页面滚动
			var bod = document.getElementsByTagName('body')[0];
			if(state.slide){
				bod.style.overflow = 'hidden';
			}else{
				bod.style.overflow = 'auto';
			}
		},
//		播放暂停
        changeSt(state){
        	state.st = !state.st;
        },
//      从播放器audio获取到播放时间
        equal(state){
        	var audio = document.getElementById("myaudio");
        	var times =parseInt(audio.currentTime);
        	state.currenttime = times;
        },
//      改变当前时间
        changeTime(state,time){
        	state.st = !state.st;
        	state.current = time;
        },
//      改变当前音乐的总时长
        totaltime(state,all){
        	state.alltime = all;
        },
        changeface(state){
        	state.playface = !state.playface;
        },
//      改变音量的大小
        changevol(state,nums){
        	state.vols = nums;
        },
////      请求歌曲列表信息
//      getObj(state){
//      	axios.get('../../static/data02.json')
//      	.then(function(response){
//      		state.musiclist = response.data;
////      		console.log(state.musiclist);
////              默认的第一首歌
//              state.currentmusic= state.musiclist['music'][state.ids];
//              console.log("成功了！")
//      	})
//      	.catch(function(res){
//      		console.log('请求失败',res);
//      	})
//      },
//      调节播放上一首   下一首
        currentplay(state,type){
//      	console.log(type);
        	var len =state.musiclist['music'].length-2;
        	if(type=='next'){
				if(state.ids>=0&& state.ids<=len){
					state.ids++;
				}else{
					state.ids=0;
				}
			}
			if(type=='prev'){
				if(state.ids>0&&state.ids<=len){
					state.ids--;
				}else{
					state.ids = len+1;
				}
			}
        	state.currentmusic = state.musiclist['music'][state.ids];
        },
//      如果点击详情页的歌曲,整体更换歌曲目录
        changelists(state,cates){
        	state.musiclist = state.categorylist;
        	state.cate = cates;
        },
        //改变当前播放歌曲
        changeids(state,id){
        	state.ids = id;
        	state.currentmusic = state.musiclist['music'][id];
        },
//      改变详情页显示消失
        changedetail(state,txt){
            if(txt){
            	var cates = txt['category'];
             	state.category = txt;
             	state.categorylist = state.allmusic[cates];
            }
        	state.detailbol = !state.detailbol;
        	
        }
	},
	getters:{
		getst:state=>state.st,
		recomendsheet:function(state){
			var recomend = state.allmusic['recommendMinSheets'];
			return recomend
		}
	},
	actions:{
		newJson(obj){
			obj.commit('getObj');
		},
		//请求歌曲列表信息
        getObj(obj){              //obj 是指向vuex对象
        	axios.get('static/data02.json')
        	.then(function(response){
        		obj.state.allmusic = response.data;
        		console.log(obj.state.allmusic);
        		obj.state.musiclist = response.data['default'];
//              默认的第一首歌
                obj.state.currentmusic= obj.state.musiclist['music'][obj.state.ids];
        	})
        	.catch(function(res){
        		console.log('请求失败',res);
        	})
        }
	},
	modules:{

	}
})
export default store

