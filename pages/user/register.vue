<template>
	<view class="background">
		<view class="content">
			<view class="title">注册</view>
			<u--form ref="form" :model="formData" :rules="formRules">
				<u-form-item borderBottom prop="email">
					<u--input v-model="formData.email" type="email" placeholder="请输入邮箱" prefixIcon="email" clearable
						border="none" />
				</u-form-item>
				<u-form-item borderBottom prop="verificationCode">
					<u-input v-model="formData.verificationCode" placeholder="请输入验证码" prefixIcon="email-fill"
						border="none">
						<template slot="suffix">
							<u-button @click="sendCode" text="获取验证码" size="mini" :loading="getCodeBtnLoad" />
						</template>
					</u-input>
				</u-form-item>
				<u-form-item borderBottom prop="password">
					<u--input v-model="formData.password" type="password" placeholder="请输入密码" prefixIcon="lock" password
						clearable border="none" />
				</u-form-item>
				<u-form-item borderBottom prop="confirmPassword">
					<u--input v-model="formData.confirmPassword" type="password" placeholder="请确认密码"
						prefixIcon="lock-fill" password clearable border="none" />
				</u-form-item>
				<u-form-item>
					<u-button class="submie-button" type="primary" text="提交" @click="submit" />
				</u-form-item>
			</u--form>
			<view class="other-box">
				<view @click="toLogin">返回登录</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getVerificationCode,
		sendEmail
	} from '@/api/system.js';
	import {
		getUserDataByEmail,
		createUser
	} from '@/api/user.js';

	export default {
		name: 'register',
		data() {
			return {
				formData: {
					email: '',
					password: '',
					nickname: '',
					avatar: '.png',
					state: 0,
					type: 1,
					//----验证用
					confirmPassword: '',
					verificationCode: '',
				},
				formRules: {
					email: [{
						required: true,
						message: '请输入邮箱',
						trigger: ['blur', 'change']
					}, {
						type: 'email',
						message: '邮箱格式不正确',
						trigger: ['blur', 'change']
					}, {
						validator: async (rule, value, callback) => {
							if (await getUserDataByEmail(value))
								callback(new Error('邮箱已存在'));
						},
						trigger: ['blur']
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: ['blur', 'change']
					}],
					confirmPassword: [{
						required: true,
						message: '请确认密码',
						trigger: ['blur', 'change']
					}, {
						validator: (rule, value, callback) => {
							if (value != this.formData.password)
								callback(new Error('两次密码输入不一致'))
						},
						trigger: ['blur', 'change']
					}],
					verificationCode: [{
						required: true,
						message: '请输入验证码'
					}, {
						validator: (rule, value, callback) => {
							if (value != this.verificationCode)
								callback(new Error('验证码错误'))
						},
						trigger: ['blur', 'change']
					}]
				},
				verificationCode: '',
				getCodeBtnLoad: false
			}
		},
		methods: {
			async sendCode() {
				this.$refs.form.validateField('email', async (errorArray) => {
					if (errorArray.length === 0 && !await getUserDataByEmail(this.formData.email)) {
						this.getCodeBtnLoad = true;
						this.verificationCode = await getVerificationCode();

						let response = await sendEmail(this.formData.email, '欢迎注册投票系统',
							`您的验证码是：${this.verificationCode}`);

						if (response)
							uni.showToast({
								icon: 'success',
								title: '验证码已发送'
							});
						else
							uni.showToast({
								icon: 'error',
								title: '发送失败'
							});
						this.getCodeBtnLoad = false;
					}
				});
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
			},
			submit() {
				this.$refs.form.validate().then(async (res) => {
					if (res) {
						this.formData.nickname = this.formData.email;
						let response = await createUser(this.formData);
						if (response)
							this.toLogin();
						else
							uni.showToast({
								icon: 'error',
								title: '注册失败'
							});
					}
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
