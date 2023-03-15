<template>
	<view class="background">
		<view class="content">
			<view class="title">登录</view>
			<u--form ref="loginForm" :model="loginFormData" :rules="loginFormRules">
				<u-form-item borderBottom prop="email">
					<u--input v-model="loginFormData.email" type="email" placeholder="请输入邮箱" prefixIcon="email"
						clearable border="none" />
				</u-form-item>
				<u-form-item borderBottom prop="password">
					<u--input v-model="loginFormData.password" type="password" placeholder="请输入密码"
						prefixIcon="lock-open" clearable password border="none" />
				</u-form-item>
				<u-form-item>
					<u-button class="login-button" type="primary" text="登录" @click="login" />
				</u-form-item>
			</u--form>
			<view class="other-box">
				<view @click="toRegister">注册用户</view>
				<view>忘记密码</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		login
	} from '@/api/user.js';

	import {
		request
	} from '@/utils/request.js';

	export default {
		name: 'login',
		data() {
			return {
				loginFormData: {
					email: null,
					password: null
				},
				loginFormRules: {
					email: [{
						type: 'email',
						required: true,
						message: '请输入邮箱',
						trigger: ['blur', 'change']
					}],
					password: [{
						type: 'string',
						required: true,
						message: '请输入密码',
						trigger: ['blur', 'change']
					}]
				}
			}
		},
		methods: {
			toRegister() {
				uni.navigateTo({
					url: '/pages/user/register'
				})
			},
			async login() {
				// 表单验证
				this.$refs.loginForm.validate().then(async res => {
					if (res) {
						// 发起登录请求 并 保存返回值
						let response = await login(this.loginFormData);
						console.log(response);
					}
				});
			}
		}
	}
</script>

<style scoped>
	.background {
		width: 100vw;
		height: 100vh;
		background-color: #f5f5f5;
		/* 子元素居中 */
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.content {
		width: 65%;
		height: 75%;
		padding: 10%;
		background-color: #ffffff;
		border-radius: 20rpx;
		box-shadow: 0 0 10rpx 5rpx #dddddd;
	}

	.title {
		text-align: center;
		font-size: 50rpx;
		font-weight: 700;
		color: #404040;
		margin-bottom: 10%;
	}

	.login-button {
		margin-top: 10%;
	}

	.other-box {
		display: flex;
		font-size: 25rpx;
		color: #aaaaaa;
		margin: 2%;
	}

	.other-box>*:nth-child(2) {
		flex: 1;
		text-align: right;
	}
</style>
