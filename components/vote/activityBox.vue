<template>
	<view class="activity-box" @click="toDetailed">
		<u--image :showLoading="true" :src="src" width="100%"></u--image>
		<view class="title">投票活动标题</view>
		<view class="pageview">1231231次浏览</view>
	</view>
</template>

<script>
	export default {
		name: 'activityBox',
		data() {
			return {
				src: 'https://cdn.uviewui.com/uview/album/1.jpg'
			}
		},
		methods: {
			toDetailed() {
				uni.navigateTo({
					url: '/pages/vote/activityDetailed?vaId=123'
				})
			}
		}
	}
</script>

<style scoped>
	.activity-box {
		border-radius: 20rpx;
		overflow: hidden;
		box-shadow: 0 20rpx 20rpx -10rpx #ddd;
		background-color: white;
		margin-bottom: 25rpx;
	}

	.title {
		padding: 15rpx 20rpx 0 20rpx;
		font-size: 30rpx;
	}

	.pageview {
		padding: 10rpx 20rpx 20rpx 20rpx;
		font-size: 20rpx;
		color: #555;
	}
</style>
