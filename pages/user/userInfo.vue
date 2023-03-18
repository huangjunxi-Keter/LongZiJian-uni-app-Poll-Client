<template>
	<view>
		<u-cell-group>
			<u-cell title="头像" isLink @click="showModal('avatar')">
				<u-avatar slot="value" :src="src" />
			</u-cell>
			<u-cell title="昵称" :value="loginUser.nickname" isLink @click="showModal('nickname')" />
			<u-cell title="邮箱" :value="loginUser.email" @click="showModal('email')" isLink />
			<u-cell title="密码" :value="loginUser.password" @click="showModal('password')" isLink />
		</u-cell-group>
		<u-modal :show="!!updateProp" showCancelButton buttonReverse @confirm="submit" @cancel="closeModel">
			<u--form ref="form" :model="formData" :rules="formRules"
				:errorType="updateProp == 'avatar' ? 'toast' : 'message'">
				<u-form-item v-if="updateProp == 'avatar'" prop="avatar">
					<!-- 文件上传 -->
					<u-upload :previewFullImage="true" :fileList="fileList" :maxCount="1" @afterRead="afterRead"
						@delete="deletePic">
					</u-upload>
				</u-form-item>
				<u-form-item v-if="updateProp == 'nickname'" prop="nickname" border-bottom>
					<u--input v-model="formData.nickname" placeholder="请输入新的昵称" clearable border="none" />
				</u-form-item>
				<u-form-item v-if="updateProp == 'email'" prop="email" border-bottom>
					<u--input v-model="formData.email" placeholder="请输入新的邮箱" clearable border="none" />
				</u-form-item>
				<u-form-item v-if="updateProp == 'email'" prop="verificationCode" border-bottom>
					<u-input v-model="formData.verificationCode" placeholder="请输入验证码" border="none">
						<template slot="suffix">
							<u-button @click="sendCode" text="获取验证码" size="mini" :loading="getCodeBtnLoad" />
						</template>
					</u-input>
				</u-form-item>
				<u-form-item v-if="updateProp == 'password'" prop="password" border-bottom>
					<u--input v-model="formData.password" placeholder="请输入新的密码" clearable border="none" />
				</u-form-item>
			</u--form>
		</u-modal>
	</view>
</template>

<script>
	import {
		getRequestAddress
	} from '@/utils/request.js';
	import {
		updateUser,
		getUserDataByEmail,
		getUserData
	} from '@/api/user.js';
	import {
		upload,
		sendEmail,
		getVerificationCode
	} from '@/api/system.js'

	export default {
		name: 'userInfor',
		data() {
			return {
				loginUser: {},
				updateProp: null,
				formData: {
					avatar: '',
					nickname: '',
					password: '',
					email: '',
					verificationCode: ''
				},
				formRules: {
					avatar: [{
						required: true,
						message: '请上传新的头像',
						trigger: ['blur']
					}],
					nickname: [{
						required: true,
						message: '请输入新的昵称',
						trigger: ['blur']
					}],
					password: [{
						required: true,
						message: '请输入新的密码',
						trigger: ['blur']
					}],
					email: [{
						required: true,
						message: '请输入新的邮箱',
						trigger: ['blur']
					}, {
						type: 'email',
						message: '邮箱格式不正确',
						trigger: ['blur']
					}, {
						validator: async (rule, value, callback) => {
							if (await getUserDataByEmail(value))
								callback(new Error('邮箱已存在'));
						},
						trigger: ['blur']
					}],
					verificationCode: [{
						required: true,
						message: '请输入验证码',
						trigger: ['blur']
					}, {
						validator: (rule, value, callback) => {
							if (value != this.verificationCode)
								callback(new Error('验证码错误'));
						},
						trigger: ['blur']
					}],
				},
				fileList: [],
				getCodeBtnLoad: false,
				hasEmail: false,
				verificationCode: '',
			}
		},
		computed: {
			src() {
				return `${getRequestAddress()}/image/${this.loginUser.avatar}`
			}
		},
		methods: {
			showModal(propName) {
				this.updateProp = propName;
			},
			afterRead(event) {
				let file = event.file;
				this.fileList.push(file);
				this.formData.avatar = file.url;
			},
			deletePic() {
				this.formData.avatar = '';
				this.fileList = [];
			},
			async sendCode() {
				this.$refs.form.validateField('email', async (errorArray) => {
					if (errorArray.length === 0 && !await getUserDataByEmail(this.formData.email)) {
						this.getCodeBtnLoad = true;
						this.verificationCode = await getVerificationCode();

						let response = await sendEmail(this.formData.email, '您正在更改邮箱',
							`如果不是您本人的操作，请忽略此邮件，您的验证码是：${this.verificationCode}`);

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
			cloneUserData() {
				let data = {};
				Object.keys(this.loginUser).forEach(key => {
					data[key] = this.loginUser[key];
				});
				return data;
			},
			reloadPage() {
				uni.redirectTo({
					url: '/pages/user/userInfo'
				})
			},
			async submitUser() {
				let data = this.cloneUserData();
				data[this.updateProp] = this.formData[this.updateProp];
				if (await updateUser(data)) {
					getApp().globalData.loginUser = await getUserData(data.id);
					this.reloadPage();
				} else {
					uni.showToast({
						icon: 'error',
						title: '更新失败'
					});
				}
			},
			submit() {
				this.$refs.form.validate().then(async (res) => {
					if (res) {
						if (this.updateProp == "avatar") {
							console.log("1231231231231231");
							let newAvatarName = await upload(this.formData.avatar, "/img/user/", this.loginUser
								.avatar);
							if (newAvatarName) {
								this.formData.avatar = newAvatarName;
								this.submitUser();
							} else {
								uni.showToast({
									icon: 'error',
									title: '头像上传失败'
								});
							}
						} else {
							this.submitUser();
						}
					}
				});
			},
			closeModel() {
				this.updateProp = null;
				this.$refs.form.resetFields();
				this.$refs.form.clearValidate();
				this.fileList = [];
			}
		},
		onShow() {
			this.loginUser = getApp().globalData.loginUser;
		}
	}
</script>

<style>

</style>
