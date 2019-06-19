<template>
    <view class="maintain">
		<view class="title">
		    <view class="goback">
		        <text class="eosfont" @click="goback">&#xef07;返回</text>
		    </view>
		    <text>资料上传</text>
		    <text></text>
		</view>
		<view class="dizhi">{{showData.dizhi}}</view>
		<view class="time">
			<text class="eosfont">&#xe60a;</text>
			<text class="shijian">{{showData.end}}</text>
		</view>
		<view class="content">{{showData.content}}</view>
		<view class="wimg">问题图片</view>
		<view class="yuan">
			<text>远景:</text>
			<lazy-image :realSrc="'http://bdh-ranqi.qhd58.net' + showData.yuan_img" :placeholdSrc="placeholderSrc"></lazy-image>
		</view>
		<view class="jin">
			<text>近景:</text>
			<lazy-image :realSrc="'http://bdh-ranqi.qhd58.net' + showData.jin_img" :placeholdSrc="placeholderSrc"></lazy-image>
		</view>
		<view class="te">
			<text>特写:</text>
			<lazy-image :realSrc="'http://bdh-ranqi.qhd58.net' + showData.texie_img" :placeholdSrc="placeholderSrc"></lazy-image>
		</view>
		<view class="dispose">处理图片</view>
		<view class="upload">
			<view>
				<text class="center">远景</text>
				<lazy-image class="uploadImg" :realSrc="'http://bdh-ranqi.qhd58.net' + showData.wei_yuan" :placeholdSrc="placeholderSrc"></lazy-image>
			</view>
			<view>
				<text class="center">近景</text>
				<lazy-image class="uploadImg" :realSrc="'http://bdh-ranqi.qhd58.net' + showData.wei_jin" :placeholdSrc="placeholderSrc"></lazy-image>
			</view>			
			<view>
				<text class="center">特写</text>
				<lazy-image class="uploadImg" :realSrc="'http://bdh-ranqi.qhd58.net' + showData.wei_te" :placeholdSrc="placeholderSrc"></lazy-image>
			</view>		
		</view>	
		<view class="content5">
			<text class="text6">详细描述：</text>
			<view class="textarea">{{showData.wei_content}}</view>		
		</view>	
	</view>
</template>

<script>
import { pathToBase64, base64ToPath } from '../../js_sdk/gsq-image-tools/image-tools/index.js'
var _self;
export default {
    data() {
        return {
			status: '',
			showData: {},
			id: '',
			placeholderSrc: '../../static/images/common/abc.png',
			show: false,
			loaded: false
        }
    },
    onLoad(options) {
		_self = this;
		_self.id = options.id;
		console.log(_self.id)

		uni.getStorage({
			key: 'status',
			success: function (res) {
				_self.status = res.data;
			}
		});
		uni.request({
			url: 'http://bdh-ranqi.qhd58.net/api/jk/find_wx',
			method: 'POST',
			data: {
				id: _self.id,
				xun: 3
			},
			success: (res) => {
				
				console.log(_self.status)
				uni.hideLoading()
				_self.showData = res.data;
			}
		});
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
	padding: 0 50upx;
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
		z-index: 9;
		background: #fff;
		border-top: 50upx solid #000;
		.goback {
			font-size: 30upx;
		}
	}
	.dizhi {
		margin-top: 174upx;
		font-size: 40upx;
	}
	.time {
		font-size: 30upx;
		color: #bababa;
		position: relative;
		padding-bottom: 10upx;
		border-bottom: 1upx solid #dbdbdb;
		.eosfont {
			position: absolute;
			top: 6upx;
		}
		.shijian {
			padding-left: 40upx;
		}
	}
	.content {
		font-size: 28upx;
		line-height: 38upx;
		margin-top: 19upx;
		color: #888888;
	}
	.wimg {
		margin-top: 30upx;
		padding-bottom: 10upx;
		border-bottom: 1upx solid #dbdbdb;
	}
	.yuan,.jin,.te {
		margin-top: 27upx;
		font-size: 30upx;
	}
	.dispose {
		font-size: 40upx;
		padding-bottom: 10upx;
		border-bottom: 1upx solid #dbdbdb;
	}
	.upload {
		display: flex;
		flex-direction: column;
		margin-top: 19upx;
		.center {
			display: block;
			font-size: 30upx;
			margin-bottom: 10upx;
		}
		.uploadImg {
			width: 100%;
			height: 400upx;
			border-radius: 10upx;
			border: 1upx dashed #bababa;
			position: relative;
			image {
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;
			}
		}
	}
	.content5 {
		margin-top: 30upx;
		.text6 {
			font-size: 30upx;	
		}
		.textarea {
			margin-top: 15upx;
			width: 100%;
			height: 200upx;
			border: 3upx solid #f6f6fb;
			font-size: 28upx;
			padding: 10upx;
			box-sizing: border-box;
			margin-bottom: 40upx;
		}		
	}
	
	.btn {
		width: 410upx;
		height: 72upx;
		margin: 30upx auto;
		line-height: 72upx;
		border-radius: 20upx;
		background: #5497f7;
		text-align: center;
		color: #fff;
		font-size: 30upx;
	}
}

</style>
