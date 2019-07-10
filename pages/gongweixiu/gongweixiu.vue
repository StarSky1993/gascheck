<template>
    <view class="currentTask">
        <view class="title">
            <view class="goback">
                <text class="eosfont" @click="goback">&#xef07;退出</text>
            </view>
            <text v-if="idx==1" :class="{active:idx==1}">当前任务</text>
            <text v-else :class="{active2:idx==2}">已完成任务</text>	
            <text></text>
        </view>
		<view class="tabs">
			<text class="cun" @click="back">小区</text>
			<text class="cun" @click="cun">村村通</text>
		</view>
        <view class="list" v-show="idx==1">
            <view class="item" v-for="(item,index) in anjianList" :key="index" @click="onDetail(item.id)" >
                <view class="img"></view>
                <view class="content">
                    <view class="title2">{{item.gongjianhu}}</view>
                    <view class="content2" v-if="item.aj_wz !== null">{{item.aj_wz}}</view>
                    <view class="time-box">
                        <text class="time_ico eosfont">&#xe60a;</text>
                        <text class="time">{{item.add_time}}</text>
                    </view>
                </view>
            </view>
        </view>
		<view class="list" v-show="idx==2">
		    <view class="item" v-for="(items,index) in ywList" :key="index" @click="ywclick(items.id)">
		        <view class="img2"></view>
		        <view class="content">
		            <view class="title2">{{items.gongjianhu}}</view>
		            <view class="content2">{{items.wx_wz}}</view>
		            <view class="time-box">
		                <text class="time_ico eosfont">&#xe60a;</text>
		                <text class="time">{{items.wx_time}}</text>
		            </view>
		        </view>
		    </view>
		</view>
		<view class="hujiao" @click="call">呼叫调度中心</view>
		<view class="tab">
			<view>
				<text class="t1" :class="{active:idx==1}" @click="idx=1">当前任务</text>
				<text class="t2" :class="{active2:idx==2}" @click="idx=2">已完成任务</text>				
			</view>
		</view>
    </view>
</template>

<script>
export default {
    data() {
        return {
			idx: 1,
			anjianList: [],
			ywList: [],
			username: '',
			password: ''
        }
    },
    onLoad(options) {
		this.username = options.username;
		this.password = options.password;
		console.log(this.username)
		console.log(this.password)
		uni.showLoading({
			title: '加载中...'
		})
		uni.request({
			url: 'http://bdh-ranqi.qhd58.net/api/jk/weixiu_gong',
			method: 'POST',
			success: (res) => {
				uni.hideLoading()
				this.anjianList = res.data;
			}
		});
		uni.request({
			url: 'http://bdh-ranqi.qhd58.net/api/jk/yw?xun=5',
			method: 'POST',
			data: {
				username: this.username,
				password: this.password
			},
			success: (res) => {
				uni.hideLoading()
				this.ywList = res.data;
				console.log(this.ywList)
			}
		});	
    },
    methods: {
		onDetail(id) {
			uni.navigateTo({
				url: `/pages/maintain4/maintain4?id=${id}&username=${this.username}&password=${this.password}`
			})
		},
		ywclick(id) {
			uni.navigateTo({
				url: `/pages/Look2/look2?id=${id}&xun=5`
			})
		},
		goback() {
			uni.showModal({
				title: '提示',
				content: '确定退出登录？',
				success: function (res) {
					if (res.confirm) {
						//  #ifdef  APP-PLUS
						plus.runtime.quit(); 
						//  #endif
					} else if (res.cancel) {
						
					}
				}
			});
		},
		call() {
			//拨打电话
			uni.makePhoneCall({
				phoneNumber: '0335-8888888'
			});
		},
		//返回小区
		back() {
			uni.navigateBack({
				delta: 1
			})
		},
		//进入工建户
		cun() {
			uni.navigateTo({
				url: `/pages/cunweixiu/cunweixiu?username=${this.username}&password=${this.password}`
			})			
		},				
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
            justify-content: space-between;
            padding: 0 21upx;
            position: fixed;
            box-sizing: border-box;
            top: 50upx;
            left: 0;
			z-index: 9;
            background: #ff9000;
			color: #fff;
            .goback {
                font-size: 30upx;
            }
        }
		.tabs {
			width: 100%;
			display: flex;
			justify-content: space-around;
			align-items: center;
			position: absolute;
			top: 137upx;
			left: 0;
			background-color: #ff9000;
			text {
				font-size: 30upx;
				color: #fff;
				background-color: green;
				border-radius: 30upx;
				padding: 6upx 18upx;
				margin: 10px 0;
			}
		}
		.list {
			padding: 0 32upx;
			padding-top: 200upx;
		    background: #fbfbfb;
			border-top: 50upx solid #000;
			.item {
				display: flex;
				padding: 30upx 0;
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
					display: flex;
					flex-direction: column;
					.title2 {
						font-size: 30upx;
						font-weight: bold;
					}
					.content2 {
						width: 450upx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						font-size: 24upx;
						color: #888;
						line-height: 30upx;
					}
					.time-box {
						line-height: 20upx;
						.time_ico {
							top: 4upx;
							font-size: 20upx;
							color: #b4b4b4;
						}
						.time {
							line-height: 20upx;
							font-size: 20upx;
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
					font-size: 22upx;
					padding-top: 27upx;
				}
				.t1 {
					position: relative;
				}
				.t1::before {
					position: absolute;
					left: 18upx;
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
					left: 18upx;
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
					left: 25upx;
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
					left: 25upx;
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
			width: 100upx;
			height: 100upx;
			border-radius: 50%;
			background: rgba(120,120,120,.5);
			color: #fff;
			font-size: 22upx;
			line-height: 30upx;
			text-align: center;
			padding-top: 20upx;
			box-sizing: border-box;
			
		}
    }

</style>
