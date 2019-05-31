<template>
	<view class="login">
		<view class="logo">
			
		</view>
		<view class="form">
			<text class="icon1 eosfont">&#xe768;</text><input type="number" v-model="user.username" :value="user.username" maxlength="11" placeholder="请输入您的手机号" />
			<text class="icon2 eosfont">&#xe64c;</text><input type="text" v-model="user.password" :value="user.password" class="input2" placeholder="请输入密码" />
			<button @click="login" :disabled="isDisable">登陆</button>
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
					isDisable: false
				}				
			}
		},
		methods: {
			login() {
				uni.request({
					url: 'http://bdh-ranqi.qhd58.net/api/jk/denglu',
					data: {
						username: this.user.username,
						password: this.user.password
					},
					header: {
						'custom-header': 'application/x-www-form-urlencoded; charset=UTF-8' //自定义请求头信息
					},
					success: (res) => {	

						uni.setStorage({
							key: 'user',
							data: this.user,
							success: function() {
								console.log('success')
							}
						})
						uni.setStorageSync('userPhone',this.user.username);
						uni.setStorageSync('Password',this.user.password);
						if(res.data === 1) {
							this.isDisable = true;
							uni.navigateTo({
								//巡检主页
								url: '/pages/xunjianHome/xunjianHome'
							})
						}else if(res.data === 2) {
							this.isDisable = true;
							uni.navigateTo({
								//安检列表
								url: '/pages/securityList/securityList'
							})
						}else if(res.data === 3) {
							this.isDisable = true;
							uni.setStorage({
								key: 'status',
								data: res.data,
								success: function() {
									console.log('success')
								}
							})
							uni.navigateTo({
								//维修工页面1
								url: "/pages/Task/currentTask"
							})
						}else if(res.data === 4) {
							this.isDisable = true;
							uni.setStorage({
								key: 'status2',
								data: res.data,
								success: function() {
									console.log('success')
								}
							})
							uni.navigateTo({
								//维修工页面1
								url: "/pages/Task2/currentTask2"
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
							uni.removeStorage({
								key: 'user',
								success: function (res) {
									console.log('移除成功！');
								}
							});						
						}						
					}
				});


			}
		},
		onLoad() {
			_self = this;
			uni.setKeepScreenOn({
				keepScreenOn: true
			})
			//页面加载完成，获取本地存储的用户名及密码
			const userPhone = uni.getStorageSync('userPhone');
			const Password = uni.getStorageSync('Password');
			if(userPhone && Password) {
				_self.user.username = userPhone;
				_self.user.password = Password;
			}
		},
		onShow() {
			
		},
		onReady() {
			
		},
		onHide() {
			
		}
	}
</script>

<style lang="scss" scoped>

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
