<template>
	<view class="content">
		<u-sticky offset-top="20rpx">
			<u-search v-model="searchStr" placeholder="搜索项目" :showAction="false"></u-search>
		</u-sticky>
		<user-item-box />
		<user-item-box />
		<user-item-box />
		<user-item-box />
		<user-item-box />
		<user-item-box />
		<u-button :customStyle="createButtonStyle" type="primary" icon="plus" @click="toEditItem" />
	</view>
</template>

<script>
	import userItemBox from '@/components/vote/userItemBox.vue'

	export default {
		name: 'activityItemList',
		components: {
			"user-item-box": userItemBox
		},
		data() {
			return {
				searchStr: '',
				createButtonStyle: {
					position: 'fixed',
					right: '50rpx',
					bottom: '50rpx',
					width: '100rpx',
					height: '100rpx',
					borderRadius: '50%',
					boxShadow: '0 0 10rpx 3rpx #999999'
				}
			}
		},
		methods: {
			toEditItem() {
				uni.navigateTo({
					url: '/pages/vote/editItem'
				})
			}
		}
	}
</script>

<style scoped>
	
</style>
