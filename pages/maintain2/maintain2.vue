<template>
    <view class="maintain">
		<view class="title">
		    <text>资料上传</text>
		    <text></text>
		</view>
		<view class="dizhi">{{showData.xiaoqu}}&nbsp;&nbsp;{{showData.dong}}-{{showData.danyuan}}-{{showData.menpai}}</view>
		<view class="time">
			<text class="eosfont">&#xe60a;</text>
			<text class="shijian">{{showData.end}}</text>
		</view>
		<view class="content" style="font-size: 36upx;">{{showData.content}}</view>
		<view class="wimg">问题图片</view>
		<view class="yuan">
			<text>远景:</text>
			<image :src="'http://bdh-ranqi.qhd58.net' + showData.yuan_img"></image>
		</view>
		<view class="jin">
			<text>近景:</text>
			<image :src="'http://bdh-ranqi.qhd58.net' + showData.jin_img"></image>
		</view>
		<view class="te">
			<text>特写:</text>
			<image :src="'http://bdh-ranqi.qhd58.net' + showData.texie_img"></image>
		</view>
		<view class="dispose">处理图片</view>
		<view class="upload">
			<view @click="UploadImg2">
				<text class="center">远景</text>
				<view class="uploadImg"><lazy-image  :realSrc="'http://bdh-ranqi.qhd58.net' + showData.yuan_img" :placeholdSrc="placeholderSrc"></lazy-image></view>
			</view>
			<view @click="UploadImg1">
				<text class="center">近景</text>
				<view class="uploadImg"><lazy-image  :realSrc="'http://bdh-ranqi.qhd58.net' + showData.jin_img" :placeholdSrc="placeholderSrc"></lazy-image></view>
			</view>			
			<view @click="UploadImg3">
				<text class="center">特写</text>
				<view class="uploadImg"><lazy-image :realSrc="'http://bdh-ranqi.qhd58.net' + showData.texie_img" :placeholdSrc="placeholderSrc"></lazy-image></view>
			</view>		
		</view>	
		<view class="content5">
			<text class="text6">详细描述：</text>
			<textarea placeholder-style="color:#F76260" placeholder="请输入具体内容" v-model="content" maxlength=500 />			
		</view>
		<view class="btn" @click="upload">上传</view>	
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
			jinBase64: '',
			yuanBase64: '',
			teBase64: '',
			jin: '',
			yuan: '',
			te: '',
			id: '',
			content: '',
			placeholderSrc: '../../static/images/common/abc.png',
			show: false,
			loaded: false
        }
    },
    onLoad(options) {
		_self = this;
		_self.id = options.id;
		uni.getStorage({
			key: 'status',
			success: function (res) {
				_self.status = res.data;
			}
		});
		uni.request({
			url: 'http://bdh-ranqi.qhd58.net/api/jk/find',
			method: 'POST',
			data: {
				id: _self.id,
				xun: _self.status
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
		},
		UploadImg1() {
			_self = this;
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['compressed'],//可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album','camera'], //从相册选择
				success: function (res) {
					_self.jin = res.tempFilePaths[0];
					// 预览图片
					uni.previewImage({
						urls: res.tempFilePaths
					});
					uni.showLoading({
						title: '读取中...'
					})
					pathToBase64(_self.jin).then(base64 => {
						_self.jinBase64 = base64;
						uni.hideLoading();
					}) 
					
				}
			});	
		
		},
		UploadImg2() {
		_self = this;
		uni.chooseImage({
		count: 1, //默认9
		sizeType: ['compressed'],//可以指定是原图还是压缩图，默认二者都有
		sourceType: ['album','camera'], //从相册选择
		success: function (res) {
		console.log(res.tempFilePaths[0]);
		_self.yuan = res.tempFilePaths[0];
		// 预览图片
		uni.previewImage({
			urls: res.tempFilePaths
		});
		uni.showLoading({
			title: '读取中...'
		})
		pathToBase64(_self.yuan)
		.then(base64 => {
			_self.yuanBase64 = base64;	
			uni.hideLoading();
		})
		.catch(error => {
			console.error(error);
		})					
		}
		});														
		},
		UploadImg3() {
		_self = this;
		uni.chooseImage({
		count: 1, //默认9
		sizeType: ['compressed'],//可以指定是原图还是压缩图，默认二者都有
		sourceType: ['album','camera'], //从相册选择
		success: function (res) {
		_self.te = res.tempFilePaths[0];
		// 预览图片
		uni.previewImage({
			urls: res.tempFilePaths
		});
		uni.showLoading({
			title: '读取中...'
		})
		pathToBase64(_self.te)
		.then(base64 => {
			_self.teBase64 = base64;
			uni.hideLoading();
		})
		.catch(error => {
		console.error(error);
		})					
		}
		});														
		},
		upload() {
			_self = this;
			console.log(_self.jinBase64)
			uni.showModal({
				title: '是否提交数据？',
				content: '确认无误后即可提交数据',
				success: function (res) {
					if (res.confirm) {
						console.log('用户点击确定');
						uni.showLoading({
							title: '提交中...'
						})
						uni.request({
							url: 'http://bdh-ranqi.qhd58.net/api/jk/weixiu_qk',
							method: 'POST',
							data: {
								id: _self.id,
								xun: _self.status,
								wei_jin: _self.jinBase64,
								wei_yuan: _self.yuanBase64,
								wei_te: _self.teBase64,
								wei_content: _self.content
							},
							success: (res) => {
								uni.hideLoading();
								console.log(res.data)
								if(res.data === 1) {
									uni.showToast({
										title: '提交成功！'
									})
									setTimeout(() => {
										uni.navigateBack({
											delta: 1
										});	
									},1500)
								}else {
									uni.showToast({
										title: '提交失败,请重新提交！'
									})
								}
							}
						});						
					}else if (res.cancel) {
						console.log('用户点击取消');
					}
				}				
			})
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
		justify-content: center;
		padding: 0 21upx;
		position: fixed;
		box-sizing: border-box;
		top: 0upx;
		left: 0;
		z-index: 9;
		background: #fff;
		border-top: 50upx solid #000;
		.goback {
			font-size: 36upx;
		}
	}
	.dizhi {
		margin-top: 174upx;
		font-size: 40upx;
	}
	.time {
		font-size: 36upx;
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
		font-size: 36upx;
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
		font-size: 36upx;
	}
	.dispose {
		font-size: 40upx;
		padding-bottom: 10upx;
		border-bottom: 1upx solid #dbdbdb;
	}
	.upload {
		display: flex;
		justify-content: space-around;
		margin-top: 19upx;
		.center {
			text-align: center;
			display: block;
			font-size: 36upx;
			margin-bottom: 10upx;
		}
		.uploadImg {
			width: 164upx;
			height: 164upx;
			background: #f6f2ef url('~@/static/images/condition/add.png') center center no-repeat;
			background-size: 46upx;
			border-radius: 10upx;
			border: 1upx dashed #bababa;
			position: relative;
			image {
				width: 164upx;
				height: 164upx;
				position: absolute;
				left: 0;
				top: 0;
			}
		}
	}
	.content5 {
		margin-top: 30upx;
		.text6 {
			font-size: 36upx;	
		}
		textarea {
			margin-top: 15upx;
			width: 100%;
			height: 200upx;
			border: 3upx solid #f6f6fb;
			font-size: 36upx;
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
		font-size: 36upx;
	}
}

</style>
