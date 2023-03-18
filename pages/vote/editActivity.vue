<template>
	<view class="content">
		<!-- 表单 -->
		<u--form ref="activityForm" :model="activityFormData" :rules="activityFormRules" labelPosition="top"
			labelWidth="90">
			<u-form-item label="活动标题" prop="activity_title" border-bottom>
				<u--input v-model="activityFormData.activity_title" border="none"></u--input>
			</u-form-item>
			<u-form-item label="活动封面" prop="cover_image" border-bottom>
				<!-- 文件上传 -->
				<u-upload :previewFullImage="true" :maxCount="1" :fileList="fileList" @afterRead="afterRead"
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
	</view>
</template>

<script>
	import {
		getRequestAddress
	} from '@/utils/request.js'
	import {
		getPollActivity,
		updatePollActivity
	} from '@/api/poll_activity.js';
	import {
		upload
	} from '@/api/system.js'

	export default {
		name: 'editActivity',
		data() {
			return {
				activityFormData: {
					activity_title: '',
					activity_introduce: '',
					cover_image: '',
					poll_count: 0,
					item_count: 0,
					page_view: 0,
					user_id: 0,
					state: 1,
					id: null
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
				fileList: [],
				oldFileName: ''
			}
		},
		methods: {
			async loadPageData(id) {
				let response = await getPollActivity(id);
				Object.keys(this.activityFormData).forEach(key => {
					this.activityFormData[key] = response[key];
				});
				this.fileList.push({
					url: `${getRequestAddress()}/image/${response.cover_image}`
				});
				this.oldFileName = response.cover_image;
			},
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
			async uploadFile() {
				let result = true;
				if (this.oldFileName != this.activityFormData.cover_image) {
					// 上传文件
					let uploadFileName = await upload(
						this.activityFormData.cover_image,
						"/img/activity/", this.oldFileName);
					// 是否成功
					if (uploadFileName) {
						this.activityFormData.cover_image = uploadFileName;
					} else {
						result = false;
						uni.showToast({
							title: '文件上传失败',
							icon: 'error'
						});
					}
				}
				return result;
			},
			async submit() {
				// 表单验证
				this.$refs.activityForm.validate().then(async res => {
					if (res) {
						if (await this.uploadFile()) {
							let response = await updatePollActivity(this.activityFormData);
							if (response) {
								uni.showToast({
									title: '更新成功',
									icon: 'success',
									success() {
										uni.navigateBack();
									}
								});
							} else {
								uni.showToast({
									title: '更新失败',
									icon: 'error'
								});
							}
						}
					}
				});
			},
			clearForm() {
				this.$refs.activityForm.resetFields();
				this.fileList = [];
			}
		},
		onLoad(option) {
			this.loadPageData(option.aid);
		}
	}
</script>

<style scoped>

</style>
