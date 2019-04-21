import {ApiUrl} from './env.js'

const API = {
	//登陆接口
    LOGIN: ApiUrl + 'api/jk/denglu',
	//巡检首页接口
    XUNJIANHOME: ApiUrl + 'api/jk/index',
	//获取当前位置接口
	CurrentLocation: ApiUrl + 'api/jk/caiji'
}

export default API;

