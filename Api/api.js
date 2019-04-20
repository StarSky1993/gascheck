import {Api} from './env.js'

//用来存放所以接口地址
const API = {
	//登陆接口
	LOGIN: {
		url: Api + 'api/jk/denglu',
		method: 'post'
	},
	XUNJIANHOME: {
		url: Api + 'api/jk/index.html',
		method: 'post'
	}
};

const APIS = {...API};

export default APIS;
