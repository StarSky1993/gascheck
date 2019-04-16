<template>
    <view class="currentTask">
        <view class="title">
            <view class="goback">
                <text class="eosfont">&#xef07;返回</text>
            </view>
            <text>当前任务</text>
            <text class="eosfont">&#xe670;</text>
        </view>
        <view class="list">
            <view class="item" v-for="(item,index) in 3" :key="index">
                <view class="img"></view>
                <view class="content">
                    <view class="title2">环境学院教学楼402</view>
                    <view class="content2">燃气问题描述燃气问题描述燃气问题描述燃气问题描述燃气问题描述燃气问题描述</view>
                    <view class="time-box">
                        <text class="time_ico eosfont">&#xe60a;</text>
                        <text class="time">2019-04-26</text>
                    </view>
                </view>
            </view>
        </view>
	
    </view>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    onLoad() {

    },
    methods: {

    } 
}
</script>

<style lang="scss" scoped>
    .currentTask {
        .title {
            display: flex;
            width: 100%;
            height: 87upx;
            line-height: 87upx;
            justify-content: space-between;
            padding: 0 21upx;
            position: absolute;
            box-sizing: border-box;
            top: 50upx;
            left: 0;
            background: #fff;
            .goback {
                font-size: 30upx;
            }
        }
    }
    .list {
		padding: 0 32upx;
		padding-top: 146upx;
        background: #fbfbfb;
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
</style>
