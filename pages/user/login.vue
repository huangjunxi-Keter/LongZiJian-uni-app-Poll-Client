<template>
	<view class="background">
		<view class="content">
			<view class="title">登录</view>
			<u--form>
				<u-form-item borderBottom>
					<u--input type="email" placeholder="请输入邮箱" prefixIcon="email" clearable border="none" />
				</u-form-item>
				<u-form-item borderBottom>
					<u--input type="password" placeholder="请输入密码" prefixIcon="lock-open" clearable password
						border="none" />
				</u-form-item>
				<u-form-item>
					<u-button class="login-button" type="primary" text="登录" />
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
	export default {
		name: 'login',
		data() {
			return {

			}
		},
		methods: {
			toRegister() {
				uni.navigateTo({
					url: '/pages/user/register'
				})
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
