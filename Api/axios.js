import {ApiUrl} from './env.js';

const axios = (opt, data) => {
	let httpServer = {
		url: opt.url,
		data: data,
		method: opt.method,
		header: opt.method == 'get'? {
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8"
		}:{
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'	
		},
		dataType: 'json'
	};
	
	let promise = new Promise((resolve,reject) => {
		uni.showLoading({
			title: '加载中'
		})
		uni.request(httpServer).then((res) => {
			uni.hideLoading();
			resolve(res[1]);
		}).catch((response) => {
			uni.hideLoading();
			reject(response);
			uni.showToast({
				title: '请稍后重试'
			})
		})
	})
	return promise;
}

export default axios;



