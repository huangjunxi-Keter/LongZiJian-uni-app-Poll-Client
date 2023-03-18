<template>
	<view class="content">
		<!-- 表单 -->
		<u--form ref="itemForm" labelPosition="top" labelWidth="90" :model="itemFormData" :rules="itemFormDataRules">
			<u-form-item label="项目名称" prop="item_title" border-bottom>
				<u--input v-model="itemFormData.item_title" border="none"></u--input>
			</u-form-item>
			<u-form-item label="项目图片" prop="item_image" border-bottom>
				<!-- 文件上传 -->
				<u-upload :previewFullImage="true" :fileList="fileList" :maxCount="1" @afterRead="afterRead"
					@delete="deletePic">
				</u-upload>
			</u-form-item>
			<u-form-item label="项目介绍" prop="item_introduce" border-bottom>
				<u--textarea v-model="itemFormData.item_introduce" placeholder="请输入内容" count></u--textarea>
			</u-form-item>
			<u-form-item>
				<u-button class="continue" type="primary" :text="itemFormData.id ? '保存' : '保存并返回'"
					@click="submit(true)" />
				<u-button v-if="!itemFormData.id" class="toback" type="success" text="保存并继续" @click="submit(false)" />
			</u-form-item>
		</u--form>
		<!-- 底部导航 -->
		<tabbar :current="1"></tabbar>
	</view>
</template>

<script>
	import {
		getPollActivityItem,
		updatePollActivityItem,
		createPollActivityItem
	} from '../../api/poll_activity_item';
	import {
		getRequestAddress
	} from '@/utils/request.js'
	import {
		upload
	} from '@/api/system.js'

	export default {
		name: 'editItem',
		data() {
			return {
				itemFormData: {
					item_title: '',
					item_introduce: '',
					item_image: '',
					item_poll: 0,
					activity_id: 0,
					id: null
				},
				itemFormDataRules: {
					item_title: [{
						type: 'string',
						required: true,
						message: '请填写标题',
						trigger: ['blur', 'change']
					}],
					item_introduce: [{
						type: 'string',
						required: true,
						message: '请填写介绍',
						trigger: ['blur', 'change']
					}],
					item_image: [{
						type: 'string',
						required: true,
						message: '请选择图片',
						trigger: ['blur', 'change']
					}]
				},
				oldFileName: '',
				fileList: []
			}
		},
		methods: {
			async loadPageData(id) {
				if (id) {
					uni.setNavigationBarTitle({
						title: "编辑活动项目"
					});
					this.itemFormData = await getPollActivityItem(id);
					this.oldFileName = this.itemFormData.item_image;
					this.fileList.push({
						url: `${getRequestAddress()}/image/${this.itemFormData.item_image}`
					});
				}
			},
			afterRead(event) {
				let file = event.file;
				this.fileList.push(file);
				this.itemFormData.item_image = file.url;
			},
			deletePic() {
				this.fileList = [];
				this.itemFormData.item_image = "";
			},
			async uploadFile() {
				let result = true;
				if (this.oldFileName != this.itemFormData.item_image) {
					let response = await upload(this.itemFormData.item_image, "/img/activity_item", this.oldFileName);
					if (response) {
						this.itemFormData.item_image = response;
					} else {
						result = false;
						uni.showToast({
							title: "图片上传失败",
							icon: 'error'
						})
					}
				}
				return result;
			},
			submit(isBack) {
				this.$refs.itemForm.validate().then(async (res) => {
					if (res) {
						if (await this.uploadFile()) {
							// 根据是否存在id判断更新或新增
							let response = null;
							if (this.itemFormData.id)
								response = await updatePollActivityItem(this.itemFormData);
							else
								response = await createPollActivityItem(this.itemFormData);
							// 是否成功
							if (response) {
								uni.showToast({
									title: "保存成功",
									icon: "success",
									success: () => {
										// 返回或继续（只有新增时能继续）
										if (isBack)
											uni.navigateBack();
										else {
											this.$refs.itemForm.resetFields();
											this.fileList = [];
										}
									}
								});
							} else {
								uni.showToast({
									title: "保存失败",
									icon: 'error'
								})
							}
						}
					}
				});
			}
		},
		onLoad(option) {
			this.loadPageData(option.aiid);
			if (!option.aiid)
				this.itemFormData.activity_id = option.aid;
		}
	}
</script>

<style scoped>
	.continue {
		margin-right: 10rpx;
	}

	.toback {
		margin-left: 10rpx;
	}
</style>
