<template>
	<view class="activity-box" @click="toDetailed">
		<u--image :showLoading="true" :src="src" width="100%"></u--image>
		<view class="title">{{activity.activity_title}}</view>
		<view class="pageview">{{ activity.page_view }}次浏览</view>
	</view>
</template>

<script>
	import {
		getRequestAddress
	} from '@/utils/request.js';

	export default {
		name: 'activityBox',
		props: ['activity'],
		computed: {
			src() {
				return `${getRequestAddress()}/image/${this.activity.cover_image}`;
			}
		},
		methods: {
			toDetailed() {
				uni.navigateTo({
					url: `/pages/vote/activityDetailed?aid=${this.activity.id}`
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
