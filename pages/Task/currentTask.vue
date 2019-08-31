<template>
    <view class="currentTask">
        <view class="title">
            <text v-if="idx==1" :class="{active:idx==1}">当前任务</text>
            <text v-else :class="{active2:idx==2}">已完成任务</text>
			<text class="zhuxiao" @click="zhuxiao">注销</text>
            <text></text>
        </view>
        <view class="list" v-show="idx==1">
            <view class="item" v-for="(item,index) in xunjianList" :key="index" @click="onDetail(item.id)" >
                <view class="img"></view>
                <view class="content">
                    <view class="title2">{{item.dizhi}}</view>
                    <view class="content2">{{item.content}}</view>
                    <view class="time-box">
                        <text class="time_ico eosfont">&#xe60a;</text>
                        <text class="time">{{item.end}}</text>
                    </view>
                </view>
            </view>
        </view>
		<view class="list" v-show="idx==2">
		    <view class="item" v-for="(items,index) in ywList" :key="index" @click="ywclick(items.id)">
		        <view class="img2"></view>
		        <view class="content">
		            <view class="title2">{{items.dizhi}}</view>
		            <view class="content2">{{items.wei_content}}</view>
		            <view class="time-box">
		                <text class="time_ico eosfont">&#xe60a;</text>
		                <text class="time">{{items.wx_time}}</text>
		            </view>
		        </view>
		    </view>
		</view>
		<view class="hujiao" @click="call">呼叫</view>
		<view class="tab">
			<view>
				<text class="t1" :class="{active:idx==1}" @click="idx=1">当前任务</text>
				<text class="t2" :class="{active2:idx==2}" @click="idx=2">已完成任务</text>				
			</view>
		</view>
		<mask v-if="showMask"></mask>  
    </view>
</template>

<script>
	import {coordinate} from '../../common/js/coordinate.js';
	import {mask} from '../../components/mask';
	
	var _self;
export default {
	components: {
		mask
	},
    data() {
        return {
			idx: 1,
			xunjianList: [],
			ywList: [],
			username: '',
			password: '',
			lat1: '',
			lng1: '',
			lat2: '',
			lng2: '',
			time: '',
			distance: '',
			coordinate2: '',
			coordinate6: '',
			timer: null,
			onlinetime: null,
			realTime: this.$realTime.wakeLock(),
			releaseWakeLock: this.$realTime.releaseWakeLock(),
			coordinate: {},
			showMask: false
        }
    },
    onLoad(options) {
		_self = this;
		_self.username = options.username;
		_self.password = options.password;
		uni.showLoading({
			title: '加载中...'
		})
		uni.request({
			url: 'http://bdh-ranqi.qhd58.net/api/jk/weixiu_xun',
			method: 'POST',
			success: (res) => {
				uni.hideLoading()
				
				_self.xunjianList = res.data;
			}
		});
		uni.request({
			url: 'http://bdh-ranqi.qhd58.net/api/jk/yw?xun=3',
			data: {
				username: _self.username,
				password: _self.password
			},
			method: 'POST',
			success: (res) => {
				console.log(res.data)
				_self.ywList = res.data;
			}
		});
		
		uni.getLocation({
			type: 'gcj02',
			success: function (res) {
				_self.realTime
				_self.coordinate = coordinate(res.longitude,res.latitude);
				_self.lng1 = _self.coordinate.bd_lng;
				_self.lat1 = _self.coordinate.bd_lat;
				_self.distance = _self.getDistance(_self.lat1, _self.lng1, _self.lat1, _self.lng1)
				console.log(_self.distance)	
				uni.request({
					url: 'http://bdh-ranqi.qhd58.net/api/Jk/zuobiao',
					data: {
						username: _self.username,
						password: _self.password,
						jing: _self.lng1,
						wei: _self.lat1,
						mm: _self.distance
					},
					success: (res) => {
						console.log(res.data)
						if(res.data !== 0 && res.data !== 1) {
							uni.showToast({
								title: '自动获取坐标失败，请重新登录！',
								icon: "none"
							});
						}
						
						uni.hideLoading();
		
					},
					fail: (res) => {
						uni.showToast({
							title: "请检查网络状态！",
							icon: "none",
							duration: 2000
						})
					}						
				});				
			}
		});
			
		uni.request({
			url: 'http://bdh-ranqi.qhd58.net/api/Jk/jiange',
			success: (res) => {
				_self.time = parseInt(res.data)*1000;
				clearInterval(_self.timer)
				_self.timer = null;
				_self.timer = setInterval(()=> {
					uni.request({
						url: 'http://bdh-ranqi.qhd58.net/api/jk/fandian',
						method: "GET",
						data: {
							username: _self.username,
							password: _self.password
						},
						success: (res) => {
							if(res.data == null) {
								_self.lng3 = _self.lng1;
								_self.lat3 = _self.lat1;	
							}else {
								_self.lng3 = res.data.jing;
								_self.lat3 = res.data.wei;	
							}
							uni.getLocation({
								type: 'gcj02',
								success: (res) => {
									_self.realTime
									_self.coordinate2 = coordinate(res.longitude,res.latitude);
									/* 这里到底是等于lat1,还有_self.coordinate.bd_lat待测试 */
									_self.lng2 = _self.coordinate2.bd_lng;
									_self.lat2 = _self.coordinate2.bd_lat;
									console.log(_self.lng2);
									console.log(_self.lat2)
									_self.distance2 = _self.getDistance(_self.lat2, _self.lng2, _self.lat3, _self.lng3)
									console.log(_self.distance2)
									uni.request({
										url: 'http://bdh-ranqi.qhd58.net/api/Jk/zuobiao',
										data: {
											username: _self.username,
											password: _self.password,
											jing: _self.lng2,
											wei: _self.lat2,
											mm: _self.distance2
										},
										success: (res) => {
											console.log(res.data)
											if(res.data == 9) {
												uni.redirectTo({
													url: '/pages/login/login'
												})
											}
										},
										fail: (res) => {
											uni.showToast({
												title: "网络异常，请检查网络重新登录！",
												icon: "none",
												duration: 2000
											})
										}
									});										
								}
							})	
		
						}
					})
				},_self.time)					
			}
		})
    },
	onShow() {
		uni.request({
			url: 'http://bdh-ranqi.qhd58.net/api/jk/weixiu_xun',
			method: 'POST',
			success: (res) => {
				uni.hideLoading()
				
				_self.xunjianList = res.data;
			}
		});
		uni.request({
			url: 'http://bdh-ranqi.qhd58.net/api/jk/yw?xun=3',
			data: {
				username: _self.username,
				password: _self.password
			},
			method: 'POST',
			success: (res) => {
				console.log(res.data)
				_self.ywList = res.data;
			}
		});
		uni.showLoading({
			title: '加载中...'
		})
		uni.request({
			url: 'http://bdh-ranqi.qhd58.net/api/jk/weixiu_xun',
			method: 'POST',
			success: (res) => {
				uni.hideLoading()
				
				_self.xunjianList = res.data;
			}
		});
		uni.request({
			url: 'http://bdh-ranqi.qhd58.net/api/jk/yw?xun=3',
			data: {
				username: _self.username,
				password: _self.password
			},
			method: 'POST',
			success: (res) => {
				console.log(res.data)
				_self.ywList = res.data;
			}
		});
		
		uni.getLocation({
			type: 'gcj02',
			success: function (res) {
				_self.realTime
				_self.coordinate = coordinate(res.longitude,res.latitude);
				_self.lng1 = _self.coordinate.bd_lng;
				_self.lat1 = _self.coordinate.bd_lat;
				_self.distance = _self.getDistance(_self.lat1, _self.lng1, _self.lat1, _self.lng1)
				console.log(_self.distance)	
				uni.request({
					url: 'http://bdh-ranqi.qhd58.net/api/Jk/zuobiao',
					data: {
						username: _self.username,
						password: _self.password,
						jing: _self.lng1,
						wei: _self.lat1,
						mm: _self.distance
					},
					success: (res) => {
						console.log(res.data)
						if(res.data !== 0 && res.data !== 1) {
							uni.showToast({
								title: '自动获取坐标失败，请重新登录！',
								icon: "none"
							});
						}
						
						uni.hideLoading();
		
					},
					fail: (res) => {
						uni.showToast({
							title: "请检查网络状态！",
							icon: "none",
							duration: 2000
						})
					}						
				});				
			}
		});
			
		uni.request({
			url: 'http://bdh-ranqi.qhd58.net/api/Jk/jiange',
			success: (res) => {
				_self.time = parseInt(res.data)*1000;
				clearInterval(_self.timer)
				_self.timer = null;
				_self.timer = setInterval(()=> {
					uni.request({
						url: 'http://bdh-ranqi.qhd58.net/api/jk/fandian',
						method: "GET",
						data: {
							username: _self.username,
							password: _self.password
						},
						success: (res) => {
							if(res.data == null) {
								_self.lng3 = _self.lng1;
								_self.lat3 = _self.lat1;	
							}else {
								_self.lng3 = res.data.jing;
								_self.lat3 = res.data.wei;	
							}
							uni.getLocation({
								type: 'gcj02',
								success: (res) => {
									_self.realTime
									_self.coordinate2 = coordinate(res.longitude,res.latitude);
									/* 这里到底是等于lat1,还有_self.coordinate.bd_lat待测试 */
									_self.lng2 = _self.coordinate2.bd_lng;
									_self.lat2 = _self.coordinate2.bd_lat;
									console.log(_self.lng2);
									console.log(_self.lat2)
									_self.distance2 = _self.getDistance(_self.lat2, _self.lng2, _self.lat3, _self.lng3)
									console.log(_self.distance2)
									uni.request({
										url: 'http://bdh-ranqi.qhd58.net/api/Jk/zuobiao',
										data: {
											username: _self.username,
											password: _self.password,
											jing: _self.lng2,
											wei: _self.lat2,
											mm: _self.distance2
										},
										success: (res) => {
											console.log(res.data)
											if(res.data == 9) {
												uni.redirectTo({
													url: '/pages/login/login'
												})
											}
										},
										fail: (res) => {
											uni.showToast({
												title: "网络异常，请检查网络重新登录！",
												icon: "none",
												duration: 2000
											})
										}
									});										
								}
							})	
		
						}
					})
				},_self.time)					
			}
		})
	},
	onHide() {
		uni.showLoading({
			title: '加载中...'
		})
		uni.request({
			url: 'http://bdh-ranqi.qhd58.net/api/jk/weixiu_xun',
			method: 'POST',
			success: (res) => {
				uni.hideLoading()
				
				_self.xunjianList = res.data;
			}
		});
		uni.request({
			url: 'http://bdh-ranqi.qhd58.net/api/jk/yw?xun=3',
			data: {
				username: _self.username,
				password: _self.password
			},
			method: 'POST',
			success: (res) => {
				console.log(res.data)
				_self.ywList = res.data;
			}
		});
		
		uni.getLocation({
			type: 'gcj02',
			success: function (res) {
				_self.realTime
				_self.coordinate = coordinate(res.longitude,res.latitude);
				_self.lng1 = _self.coordinate.bd_lng;
				_self.lat1 = _self.coordinate.bd_lat;
				_self.distance = _self.getDistance(_self.lat1, _self.lng1, _self.lat1, _self.lng1)
				console.log(_self.distance)	
				uni.request({
					url: 'http://bdh-ranqi.qhd58.net/api/Jk/zuobiao',
					data: {
						username: _self.username,
						password: _self.password,
						jing: _self.lng1,
						wei: _self.lat1,
						mm: _self.distance
					},
					success: (res) => {
						console.log(res.data)
						if(res.data !== 0 && res.data !== 1) {
							uni.showToast({
								title: '自动获取坐标失败，请重新登录！',
								icon: "none"
							});
						}
						
						uni.hideLoading();
		
					},
					fail: (res) => {
						uni.showToast({
							title: "请检查网络状态！",
							icon: "none",
							duration: 2000
						})
					}						
				});				
			}
		});
			
		uni.request({
			url: 'http://bdh-ranqi.qhd58.net/api/Jk/jiange',
			success: (res) => {
				_self.time = parseInt(res.data)*1000;
				clearInterval(_self.timer)
				_self.timer = null;
				_self.timer = setInterval(()=> {
					uni.request({
						url: 'http://bdh-ranqi.qhd58.net/api/jk/fandian',
						method: "GET",
						data: {
							username: _self.username,
							password: _self.password
						},
						success: (res) => {
							if(res.data == null) {
								_self.lng3 = _self.lng1;
								_self.lat3 = _self.lat1;	
							}else {
								_self.lng3 = res.data.jing;
								_self.lat3 = res.data.wei;	
							}
							uni.getLocation({
								type: 'gcj02',
								success: (res) => {
									_self.realTime
									_self.coordinate2 = coordinate(res.longitude,res.latitude);
									/* 这里到底是等于lat1,还有_self.coordinate.bd_lat待测试 */
									_self.lng2 = _self.coordinate2.bd_lng;
									_self.lat2 = _self.coordinate2.bd_lat;
									console.log(_self.lng2);
									console.log(_self.lat2)
									_self.distance2 = _self.getDistance(_self.lat2, _self.lng2, _self.lat3, _self.lng3)
									console.log(_self.distance2)
									uni.request({
										url: 'http://bdh-ranqi.qhd58.net/api/Jk/zuobiao',
										data: {
											username: _self.username,
											password: _self.password,
											jing: _self.lng2,
											wei: _self.lat2,
											mm: _self.distance2
										},
										success: (res) => {
											console.log(res.data)
											if(res.data == 9) {
												uni.redirectTo({
													url: '/pages/login/login'
												})
											}
										},
										fail: (res) => {
											uni.showToast({
												title: "网络异常，请检查网络重新登录！",
												icon: "none",
												duration: 2000
											})
										}
									});										
								}
							})	
		
						}
					})
				},_self.time)					
			}
		})
	},
	onBackPress(options) {
		if (options.from === 'navigateBack') {
		  return false;
		}
		this.onreturn();
		return true;
	},
	onUnload(){ 
		_self = this;				  			 
		clearInterval(_self.timer);  
		_self.timer = null;
		//禁止后台运行
		_self.releaseWakeLock			 
	},
    methods: {
		//注销
		zhuxiao() {
			uni.showModal({
				title: '提示',
				content: '您确定注销该账号吗？（请慎重）',
				success: function (res) {
					if (res.confirm) {
						// uni.removeStorageSync("userPhone");
						uni.removeStorageSync("Password");
						uni.redirectTo({
							url: '/pages/login/login'
						})
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		onreturn() {
			uni.showModal({
				title: '提示',
				content: '您确定退出吗？',
				success: function (res) {
					if (res.confirm) {
						console.log('用户点击确定');
						uni.reLaunch({
							url: '/pages/login/login'
						});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});

		},
		Rad(d) {
			//经纬度转三角函数
			return d * Math.PI / 180.0; 
		},
		getDistance: function (lat1, lng1, lat2, lng2) {
		
			lat1 = lat1 || 0;
		
			lng1 = lng1 || 0;
		
			lat2 = lat2 || 0;
		
			lng2 = lng2 || 0;
		
			var rad1 = lat1 * Math.PI / 180.0;
		
			var rad2 = lat2 * Math.PI / 180.0;
		
			var a = rad1 - rad2;
		
			var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
		
			var r = 6378137;
		
			return r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))
		
		},
		//获取位置
		GetLocation(e) {
			_self = this;
			uni.getLocation({
				type: 'gcj02',
				success: (res) => {
					_self.coordinate6 = coordinate(res.longitude,res.latitude);
					/* 这里到底是等于lat1,还有_self.coordinate.bd_lat待测试 */
					var lng6 = _self.coordinate6.bd_lng;
					var lat6 = _self.coordinate6.bd_lat;
				//请求获取当前位置接口
					uni.request({
						url: "http://bdh-ranqi.qhd58.net/api/jk/caiji",
						data: {
							username: _self.username,
							password: _self.password,
							jing: lng6,
							wei: lat6
						},
						header: {
							'custom-header': 'application/x-www-form-urlencoded; charset=UTF-8' //自定义请求头信息
						},
						success: (res) => {	
							console.log(res.data);
							if(res.data === 0) {
								_self.modal3 = true;
								this.contant = '请在指定地点采集！';
							}
							if(res.data === 1) {
								console.log(lng6,lat6)
								console.log(_self.username,_self.password)
								uni.hideLoading()
								_self.modal3= true;	
								this.contant = '采集成功！';
							}
						},
						fail: (res) => {
							uni.showToast({
								title: "位置获取失败,请检查网络",
								icon: "none",
								duration: 2000
							})
						}
					});
				}
			})
		},
		onDetail(id) {
			uni.navigateTo({
				url: `/pages/maintain/maintain?id=${id}&username=${_self.username}&password=${_self.password}`
			})
		},
		ywclick(id) {
			uni.navigateTo({
				url: `/pages/Look/look?id=${id}`
			})
		},
		goback() {
			uni.showModal({
				title: '提示',
				content: '确定退出登录？',
				success: function (res) {
					if (res.confirm) {
						uni.navigateBack({
							delta: 1
						});
					} else if (res.cancel) {
						
					}
				}
			});
		},
		call() {
			//拨打电话
			uni.makePhoneCall({
				phoneNumber: '13903355649'
			});
		}
    } 
}
</script>

<style lang="scss" scoped>
	.uni-tabbar__icon {
		height: 27upx;
	}
    .currentTask {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background: #f6f6f6;
        .title {
            display: flex;
            width: 100%;
            height: 87upx;
            line-height: 87upx;
            justify-content: center;
            padding: 0 21upx;
            position: fixed;
            box-sizing: border-box;
            top: 50upx;
            left: 0;
			z-index: 9;
            background: #ff9000;
			color: #fff;
			position: relative;
            .goback {
                font-size: 36upx;
            }
        }
		.zhuxiao {
			position: absolute;
			right: 50rpx;
			top: 0;
			font-size: 35rpx;
			color: #4CD964;
		}
		.list {
			padding: 0 32upx;
			padding-top: 85upx;
		    background: #fbfbfb;
			border-top: 50upx solid #000;
			.item {
				display: flex;
				padding: 40upx 0;
				border-bottom: 1upx solid #dbdbdb;
				.img {
					width: 175upx;
					height: 133upx;
					background: url("~@/static/images/currentTask/img.png");
					background-size: 100% 100%;
				}
				.img2 {
					width: 175upx;
					height: 133upx;
					background: url("~@/static/images/currentTask/success.png");
					background-size: 100% 100%;
				}
				.content {
					margin-left: 15upx;
					width: 475upx;
					height: 133upx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					.title2 {
						font-size: 36upx;
						font-weight: bold;
					}
					.content2 {
						width: 450upx;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
						font-size: 34upx;
						color: #888;
					}
					.time-box {
						.time_ico {
							position: relative;
							top: 4upx;
							font-size: 36upx;
							color: #b4b4b4;
						}
						.time {
							font-size: 32upx;
							color: #b3b3b3;
						}
					}
				}
			}
		}
		.tab {
			width: 100%;	
			position: fixed;
			bottom: 0;
			left: 0;
			background: #fff;
			height: 122upx;
			line-height: 122upx;
			view {
				display: flex;
				justify-content: space-around;
				text {
					font-size: 36upx;
					padding-top: 27upx;
				}
				.t1 {
					position: relative;
				}
				.t1::before {
					position: absolute;
					left: 44upx;
					top: 35upx;
					display: block;
					width: 56upx;
					height: 27upx;
					content: "";
					background: url("~@/static/images/common/current_bar.png");
					background-size: 56upx 27upx;
				}
				.active {
					color: #fd9938;
					position: relative;
				}
				.active::before {			
					position: absolute;
					left: 44upx;
					top: 35upx;
					display: block;
					width: 56upx;
					height: 27upx;
					content: "";
					background: url("~@/static/images/common/current_bar2.png");
					background-size: 56upx 27upx;					
				}
				.t2 {
					position: relative;
				}
				.t2::before {
					position: absolute;
					left: 62upx;
					top: 23upx;
					display: block;
					width: 56upx;
					height: 45upx;
					content: "";
					background: url("~@/static/images/common/finish_bar.png");
					background-size: 56upx 45upx;
				}
				.active2 {
					color: #fd9938;
					position: relative;
				}
				.active2::before {			
					position: absolute;
					left: 62upx;
					top: 23upx;
					display: block;
					width: 56upx;
					height: 45upx;
					content: "";
					background: url("~@/static/images/common/finish_bar2.png");
					background-size: 56upx 45upx;					
				}				
			}
		}
		.hujiao {
			position: fixed;
			right: 60upx;
			top: 50%;
			margin-top: -50upx;
			width: 120upx;
			height: 120upx;
			line-height: 120upx;
			border-radius: 50%;
			background: rgba(120,120,120,.5);
			color: #fff;
			font-size: 36upx;
			text-align: center;
			box-sizing: border-box;
			
		}
    }

</style>
