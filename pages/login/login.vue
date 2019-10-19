<template>
	<view class="login">
		<view class="logo">
			
		</view>
		<view class="form">
			<text class="icon1 eosfont">&#xe768;</text><input type="text" v-model="user.username" :value="user.username" placeholder="请输入您的账号" />
			<text class="icon2 eosfont">&#xe64c;</text><input type="text" v-model="user.password" :value="user.password" class="input2" placeholder="请输入密码" />
			<button @click="login" :disabled="isDisable">登陆</button>
			<view style="margin-top: 40rpx;margin-left: 20rpx;" @click="Show">用户协议和隐私政策</view>
		</view>
		<view class="mask" v-show="isShow">
						<view class="popup">
							<text class="close" @click="close">关闭</text>
							<view class="content8">
								本软件尊重并保护所有使用服务用户的个人隐私权。为了给您提供更准确、更有个性化的服务，本软件会按照本隐私权政策的规定使用和披露您的个人信息。但本软件将以高度的勤勉、审慎义务对待这些信息。除本隐私权政策另有规定外，在未征得您事先许可的情况下，本软件不会将这些信息对外披露或向第三方提供。本软件会不时更新本隐私权政策。您在同意本软件服务使用协议之时，即视为您已经同意本隐私权政策全部内容。本隐私权政策属于本软件服务使用协议不可分割的一部分。
								
								1.适用范围
								
								a)在您使用本软件网络服务，本软件自动接收并记录的您的手机上的信息，包括您的手机型号、形式轨迹、照相机功能、打电话功能：但不限于您的健康数据、使用的语言、访问日期和时间、软硬件特征信息及您需求的网页记录等数据；
								
								2.信息的使用
								
								a)在获得您的数据之后，本软件会将其上传至服务器，以生成您的数据，以便您能够更好地使用服务。
								
								3.信息披露
								
								a)本软件不会将您的信息披露给不受信任的第三方。
								
								b)根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露；
								
								c)如您出现违反中国有关法律、法规或者相关规则的情况，需要向第三方披露；
								
								4.信息存储
								
								本软件收集的有关您的信息和资料将保存在本软件及（或）其关联公司的服务器上。
								
								5.信息安全
								
								a)在使用本软件网络服务进行网上交易时，您不可避免的要向交易对方或潜在的交易对方披露自己的个人信息，如联络方式或者邮政地址。请您妥善保护自己的个人信息，仅在必要的情形下向他人提供。如您发现自己的个人信息泄密，请您立即联络本软件客服，以便本软件采取相应措施。
							</view>
						</view>
		</view>
	</view>
</template>

<script>
	var _self;
	export default {
		data() {
			return {
				user: {
					"username": '',
					"password": '',
					//防止表单重复提交开关
					isDisable: false,
					userPhone: '',
					Password: '',
					imsi: '',
				},
				isShow: false
			}
		},
		onLoad() {
			_self = this;
			// uni.removeStorageSync('userPhone');
			// uni.removeStorageSync('Password');
			uni.setKeepScreenOn({
				keepScreenOn: true
			})
			_self.userPhone = uni.getStorageSync('userPhone');
			_self.Password = uni.getStorageSync('Password');
			if(_self.userPhone) {
				_self.user.username = _self.userPhone;
				_self.user.password = _self.Password;
				console.log(_self.user.password)
			}
		},
		methods: {
			//关闭
			close() {
				this.isShow = false;
				console.log(this.isShow)
			},
			//显示
			Show() {
				this.isShow = true;
				console.log(this.isShow)
			},
			async login() {
				const result = 	await new Promise((resolve, reject) => {
					plus.device.getInfo({
						success:function(e){
							resolve(e.imsi); 
						}
					});
				})
				this.imsi = Number(result);
				console.log(this.imsi)
				uni.request({
					url: 'http://bdh-ranqi.qhd58.net/api/jk/denglu',
					data: {
						username: this.user.username,
						password: this.user.password,
						uuid: this.imsi
					},
					header: {
						'custom-header': 'application/x-www-form-urlencoded; charset=UTF-8' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data)
						if(res.data === 1) {
							this.isDisable = true;
							uni.setStorageSync('userPhone',this.user.username);
							uni.setStorageSync('Password',this.user.password);
							if(!this.userPhone && !this.Password) {

								uni.navigateTo({
									//巡检主页
									url: `/pages/xunjianHome/xunjianHome?username=${this.user.username}&password=${this.user.password}`
								})

							}else if(this.userPhone && !this.Password) {
								uni.navigateTo({
									//巡检主页
									url: `/pages/xunjianHome/xunjianHome?username=${this.user.username}&password=${this.user.password}`
								})
							}
/* 							else if(this.userPhone != this.user.username) {
								uni.showToast({
									title: '请使用指定手机登陆！',
									icon: "none"
								})
							} */else {
								uni.navigateTo({
									//巡检主页
									url: `/pages/xunjianHome/xunjianHome?username=${this.user.username}&password=${this.user.password}`
								})
							}
						}else if(res.data === 2) {
							this.isDisable = true;
							uni.setStorageSync('userPhone',this.user.username);
							uni.setStorageSync('Password',this.user.password);
							uni.navigateTo({
								//安检列表
								url: `/pages/securityList/securityList?username=${this.user.username}&password=${this.user.password}`
							})
						}else if(res.data === 3) {
							this.isDisable = true;
							uni.setStorageSync('userPhone',this.user.username);
							uni.setStorageSync('Password',this.user.password);
							uni.setStorage({
								key: 'status',
								data: res.data,
								success: function() {
									console.log('success')
								}
							})
							uni.navigateTo({
								//维修工页面1
								url: `/pages/Task/currentTask?username=${this.user.username}&password=${this.user.password}`
							})
						}else if(res.data === 4) {
							this.isDisable = true;
							uni.setStorageSync('userPhone',this.user.username);
							uni.setStorageSync('Password',this.user.password);
							uni.setStorage({
								key: 'status2',
								data: res.data,
								success: function() {
									console.log('success')
								}
							})
							uni.navigateTo({
								//维修工页面2
								url: `/pages/Task2/currentTask2?username=${this.user.username}&password=${this.user.password}`
							})
						}else if(res.data === 5) {
							uni.showToast({
								title: '请使用指定手机登陆！',
								icon: "none"
							})
						}
						else if(res.data === 0) {
							this.isDisable = false;
							uni.showToast({
								title: '账号或密码错误！',
								icon: 'none',						
								duration: 2000
							});						
						}else {
							this.isDisable = false;
							uni.showToast({
								title: '账号或密码错误！',
								icon: 'none',
								duration: 2000
							});	
							uni.removeStorageSync('userPhone');
							uni.removeStorageSync('Password');				
						}						
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mask {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		background: rgba(0,0,0,.5);
		z-index:8;
		.popup {
			width: 600rpx;height: 800rpx;background-color: #fff;position: absolute;left: 50%;top: 50%;margin-top: -400rpx;margin-left: -300rpx;z-index: 9;
			padding: 0 30rpx;
			padding-top: 50rpx;
			box-sizing: border-box;
			.content8 {
				height: 700rpx;background-color: #fff;overflow-y:scroll;
				box-sizing: border-box;
			}
			.close {
				position: absolute;
				right: 10rpx;
				top: 10rpx;
				font-size: 32rpx;
				z-index: 12;
			}
		}
	}
	.login {
		width: 100%;
		height: 1334upx;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: url('~@/static/images/login/bg.png') center top no-repeat;
		background-size: 100% 472upx;
		.logo {
			width: 100%;
			height: 316upx;
			background: url('~@/static/images/login/logo.png') no-repeat;
			background-size: 100% 316upx;
			position: absolute;
			left: 0;
			top: 320upx;
			a {
				display: block;
				line-height: 316upx;
				text-indent: -9999upx;
			}
		}
		.form {
			width: 539upx;
			position: absolute;
			left: 109upx;
			bottom: 288upx;
			input {
				height: 67upx;
				line-height: 67upx;
				font-size: 28upx;
				border-bottom: 2upx solid #b7b5b7;
				padding-left: 100upx;
				box-sizing: border-box;
			}
			.input2 {
				margin-top: 72upx;
				
			}
			text {
				position: absolute;
				left: 25upx;
			}
			.icon2 {
				top: 137upx;	
				font-size: 45upx;	
				left: 33upx;		
			}
			.icon1 {
				top: 0upx;
				font-size: 55upx;
				
			}
			button {
				width: 537upx;
				height: 82upx;
				line-height: 82upx;
				margin-top: 97upx;
				background: #187efe;
				color: #fff;
				border-radius: 270upx;
			}
		}
	}
</style>
