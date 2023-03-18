<template>
	<view class="content" :style="{'margin-top': `${statusBarHeight}rpx`}">
		<!-- 表单 -->
		<u--form ref="activityForm" :model="activityFormData" :rules="activityFormRules" labelPosition="top"
			labelWidth="90">
			<u-form-item label="活动标题" prop="activity_title" border-bottom>
				<u--input v-model="activityFormData.activity_title" border="none"></u--input>
			</u-form-item>
			<u-form-item label="活动封面" prop="cover_image" border-bottom>
				<!-- 文件上传 -->
				<u-upload :previewFullImage="true" :fileList="fileList" :maxCount="1" @afterRead="afterRead"
					@delete="deletePic">
				</u-upload>
			</u-form-item>
			<u-form-item label="活动介绍" prop="activity_introduce" border-bottom>
				<u--textarea v-model="activityFormData.activity_introduce" placeholder="请输入内容" count></u--textarea>
			</u-form-item>
			<u-form-item>
				<u-button type="primary" text="保存" @click="submit"></u-button>
			</u-form-item>
			<u-form-item>
				<u-button type="error" text="重置" @click="clearForm"></u-button>
			</u-form-item>
		</u--form>
		<!-- 底部导航 -->
		<tabbar :current="1"></tabbar>
		<!-- 确认模态框 -->
		<u-modal ref="confirmModal" :show="showConfirmModal" :showCancelButton="true" :buttonReverse="true"
			@confirm="onConsent" @cancel="showConfirmModal = false">
			需要登录后才能创建活动，是否前往登录？
		</u-modal>
	</view>
</template>

<script>
	import {
		getRequestAddress
	} from '@/utils/request.js'
	import {
		createPollActivity
	} from '@/api/poll_activity.js';
	import {
		upload
	} from '@/api/system.js'

	export default {
		name: 'editActivity',
		data() {
			return {
				loginUser: null,
				showConfirmModal: false,
				activityFormData: {
					activity_title: '',
					activity_introduce: '',
					cover_image: '',
					poll_count: 0,
					item_count: 0,
					page_view: 0,
					user_id: 0,
					state: 1
				},
				activityFormRules: {
					activity_title: [{
						type: 'string',
						required: true,
						message: '请填写标题',
						trigger: ['blur', 'change']
					}],
					activity_introduce: [{
						type: 'string',
						required: true,
						message: '请填写介绍',
						trigger: ['blur', 'change']
					}],
					cover_image: [{
						type: 'string',
						required: true,
						message: '请选择图片',
						trigger: ['blur', 'change']
					}]
				},
				fileList: []
			}
		},
		methods: {
			// 选择图片时
			afterRead(event) {
				let file = event.file;
				this.fileList.push(file);
				this.activityFormData.cover_image = file.url;
			},
			// 点击删除按钮时
			deletePic(event) {
				this.fileList = [];
				this.activityFormData.cover_image = "";
			},
			onConsent() {
				this.showConfirmModal = false;
				uni.navigateTo({
					url: '/pages/user/login'
				});
			},
			async submit() {
				if (this.loginUser) {
					// 表单验证
					this.$refs.activityForm.validate().then(async res => {
						if (res) {
							// 上传
							let uploadFileName = await upload(this.activityFormData.cover_image,
								"/img/activity/", "");
							// 是否成功
							if (uploadFileName) {
								this.activityFormData.cover_image = uploadFileName;
								// 创建
								let response = await createPollActivity(this.activityFormData);
								// 是否成功
								if (response) {
									this.$refs.activityForm.resetFields();
									this.fileList = [];
									uni.showToast({
										title: '创建成功',
										icon: 'success'
									});
								} else {
									uni.showToast({
										title: '创建失败',
										icon: 'error'
									});
								}
							} else {
								uni.showToast({
									title: '文件上传失败',
									icon: 'error'
								});
							}
						}
					});
				} else
					this.showConfirmModal = true;
			},
			clearForm() {
				this.$refs.activityForm.resetFields();
				this.fileList = [];
			}
		},
		onShow() {
			this.statusBarHeight = getApp().globalData.statusBarHeight
			this.loginUser = getApp().globalData.loginUser;
			if (this.loginUser)
				this.activityFormData.user_id = this.loginUser.id;
		}
	}
</script>

<style scoped>

</style>
