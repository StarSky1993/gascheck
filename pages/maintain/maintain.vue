<template>
    <view class="maintain">
		<view class="title">
		    <view class="goback">
		        <text class="eosfont" @click="goback">&#xef07;返回</text>
		    </view>
		    <text>资料上传</text>
		    <text class="eosfont">&#xe670;</text>
		</view>
		<view class="dizhi">秦皇小区</view>
		<view class="time">
			<text></text>
			<text>2019-05-01</text>
		</view>
		<view class="content">我是问题描述我是问题描述我是问题描述我是问题描述我是问题描述我是问题描述我是问题描述我是问题描述我是问题描述我是问题描述我是问题描述我是问题描述我是问题描述我是问题描述我是问题描述我是问题描述我是问题描述我是问题描述我是问题描述我是问题描述</view>
		<view class="wimg">问题图片</view>
		<view>
			<text>远景</text>
			<image></image>
		</view>
		<view>
			<text>近景</text>
			<image></image>
		</view>
		<view>
			<text>特写</text>
			<image></image>
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
		goback() {
			uni.navigateBack({
				delta: 1
			});
		}
    } 
}
</script>

<style lang="scss" scoped>
.maintain {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	background: #f6f6f6;
	padding: 0 40upx;
	.title {
		display: flex;
		width: 100%;
		height: 137upx;
		line-height: 87upx;
		justify-content: space-between;
		padding: 0 21upx;
		position: fixed;
		box-sizing: border-box;
		top: 0upx;
		left: 0;
		background: #fff;
		border-top: 50upx solid #000;
		.goback {
			font-size: 30upx;
		}
	}
	.dizhi {
		margin-top: 174upx;
		font-size: 46upx;
	}
	.time {
		margin-top: 19upx;
		font-size: 12upx;
		color: #bababa;
	}
}

</style>
