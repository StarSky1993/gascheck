<template>
	<view class="login">
		<view class="logo">
			<a href="javascript:;">秦皇岛市北戴河区燃气公司</a>
		</view>
		<view class="form">
			<text class="icon1 eosfont">&#xe768;</text><input type="number" v-model="username" maxlength="11" placeholder="请输入您的手机号" />
			<text class="icon2 eosfont">&#xe64c;</text><input type="text" v-model="password" class="input2" placeholder="请输入密码" />
			<button @click="login">登陆</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: ''
			}
		},
		methods: {
			login() {
				this.$axios(this.$api.LOGIN,{
					username: this.username,
					password: this.password
				}).then(res => {
					console.log(res);
					if(res.data === 1) {
						uni.navigateTo({
							url: '/pages/xunjianHome/xunjianHome'
						})
					}else if(res.data === 2) {
						uni.navigateTo({
							url: '/pages/currentTask/currentTask'
						})
					}else if(res.data === 3) {
						uni.navigateTo({
							url: '/pages/condition/condition'
						})
					}else if(res.data === 0) {
						uni.showToast({
							title: '账号或密码错误！',
							icon: 'none',						
							duration: 2000
						});						
					}else {
						uni.showToast({
							title: '账号或密码错误！',
							icon: 'none',
							duration: 2000
						});													
					}
					

				},(error) => {
					console.log(error);
				})

			}
		},
		onLoad() {

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
