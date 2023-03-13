<template>
	<view class="background">
		<view class="content">
			<view class="title">注册</view>
			<u--form>
				<u-form-item borderBottom>
					<u--input type="email" placeholder="请输入邮箱" prefixIcon="email" clearable border="none" />
				</u-form-item>
				<u-form-item borderBottom>
					<!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
					<!-- #ifndef APP-NVUE -->
					<u-input placeholder="请输入验证码" prefixIcon="email-fill" border="none">
						<!-- #endif -->
						<!-- #ifdef APP-NVUE -->
						<u--input placeholder="请输入验证码" prefixIcon="email-fill" border="none">
							<!-- #endif -->
							<template slot="suffix">
								<!-- <u-code ref="uCode" @change="codeChange" seconds="20" changeText="X秒重新获取哈哈哈"></u-code> -->
								<u-button @click="getCode" text="获取验证码" size="mini"></u-button>
							</template>
							<!-- #ifndef APP-NVUE -->
					</u-input>
					<!-- #endif -->
					<!-- #ifdef APP-NVUE -->
					</u--input>
					<!-- #endif -->
				</u-form-item>
				<u-form-item borderBottom>
					<u--input type="password" placeholder="请输入密码" prefixIcon="lock" password clearable border="none" />
				</u-form-item>
				<u-form-item borderBottom>
					<u--input type="password" placeholder="请确认密码" prefixIcon="lock-fill" password clearable border="none" />
				</u-form-item>
				<u-form-item>
					<u-button class="submie-button" type="primary" text="登录" />
				</u-form-item>
			</u--form>
			<view class="other-box">
				<view @click="toLogin">已有账户前往登录</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'register',
		data() {
			return {

			}
		},
		methods: {
			getCode() {
				uni.hideLoading();
				uni.$u.toast('验证码已发送');
			},
			toLogin() {
				let pages = getCurrentPages();
				let beforPage = pages[pages.length - 2];
				if (beforPage && beforPage.route.indexOf("login") > -1) {
					uni.navigateBack(1);
				} else {
					uni.navigateTo({
						url: '/pages/user/login'
					})
				}
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

	.submie-button {
		margin-top: 10%;
	}

	.other-box {
		display: flex;
		font-size: 25rpx;
		color: #aaaaaa;
		margin: 2%;
	}
</style>
