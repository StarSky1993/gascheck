//配置域名
// module.exports = {
// 	Api: {
// 		//代理域名
// 		env: '/dpc',
// 		//线上域名
// 		pro: 'http://ranqi.qhd58.net/api/jk/denglu'
// 	}
// }
// 
// if(process.env.NODE_ENV === 'development'){
//     console.log('开发环境')
// 	Api.env= '/dpc'
// }else{
//     console.log('生产环境')
// 	Api.pro= 'http://ranqi.qhd58.net/api/jk/denglu'
// }
// 

let Api = '';

if (process.env.NODE_ENV == 'development') {
	//本地跨域代理接口
    Api = '/dpc';
}else if(process.env.NODE_ENV == 'production') {
	//正式接口
    Api = 'http://ranqi.qhd58.net/'
}
switch(uni.getSystemInfoSync().platform){
	case 'android':
       console.log('运行Android上')
	   Api = 'http://ranqi.qhd58.net/'
       break;
}
export {
    Api//导出baseUrl
}