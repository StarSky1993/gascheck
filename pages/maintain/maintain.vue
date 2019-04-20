<template>
    <view class="maintain">
		<view class="title">
		    <view class="goback">
		        <text class="eosfont" @click="goback">&#xef07;返回</text>
		    </view>
		    <text>资料上传</text>
		    <text class="eosfont">&#xe670;</text>
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
	.title {
		display: flex;
		width: 100%;
		height: 137upx;
		line-height: 157upx;
		justify-content: space-between;
		padding: 0 21upx;
		position: absolute;
		box-sizing: border-box;
		top: 0upx;
		left: 0;
		background: #fff;
		.goback {
			font-size: 30upx;
		}
	}
}

</style>
