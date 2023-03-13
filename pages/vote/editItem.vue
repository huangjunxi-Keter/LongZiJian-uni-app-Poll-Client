<template>
	<view class="content">
		<!-- 表单 -->
		<u--form labelPosition="top" labelWidth="90" :model="formData">
			<u-form-item label="项目名称" prop="formData.title" border-bottom>
				<u--input v-model="formData.title" border="none"></u--input>
			</u-form-item>
			<u-form-item label="项目介绍" prop="formData.introduce" border-bottom>
				<u--textarea v-model="formData.introduce" placeholder="请输入内容" count></u--textarea>
			</u-form-item>
			<u-form-item label="项目图片" prop="formData.image" border-bottom>
				<!-- 文件上传 -->
				<u-upload width="100%" height="50vw" :fileList="fileList" :maxCount="1" multiple name="6"
					@afterRead="afterRead" @delete="deletePic">
				</u-upload>
			</u-form-item>
			<u-form-item>
				<u-button class="continue" type="primary" text="保存并继续"></u-button>
				<u-button class="toback" type="success" text="保存并返回"></u-button>
			</u-form-item>
		</u--form>
		<!-- 底部导航 -->
		<tabbar :current="1"></tabbar>
	</view>
</template>

<script>
	export default {
		name: 'editItem',
		data() {
			return {
				formData: {
					image: '',
					title: '',
					introduce: ''
				},
				fileList: []
			}
		},
		methods: {
			afterRead() {},
			deletePic() {},
		},
		onLoad() {
			this.statusBarHeight = getApp().globalData.statusBarHeight
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
