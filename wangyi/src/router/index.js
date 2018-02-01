import Vue from 'vue'
import Router from 'vue-router'
import Header from '../components/header/headers'
import Bodys from '../components/body/bodys'
import Radiostation from '../components/radioStation/radio'
import Community from '../components/community/community'
import Recommendself from '../components/recommendself/recommend'
import Songsheet from '../components/songsheet/songsheet'
import Radio from '../components/radio/radio'
import Ranklist from '../components/ranklist/ranklist'

Vue.use(Router)

export default new Router({
  routes: [
    {
       path: '/',
       component: Bodys
    },
		{
		  path:'/bodyMusic',
		  component: Bodys
		},
		{
		  path:'/radio',
		  component:Radiostation,
		  children:[
			  {
			  	path:'/radio',
			  	component:Recommendself
			  },		       
				{
					path:'/radio/songsheet',
					component:Songsheet
				},
				{
					path:'/radio/zuboradio',
					component:Radio
				},
				{
					path:'/radio/ranklist',
					component:Ranklist
				}
		  ]
		},
		{
		  path:'/community',
		  component:Community
		},
		
  ]
})
