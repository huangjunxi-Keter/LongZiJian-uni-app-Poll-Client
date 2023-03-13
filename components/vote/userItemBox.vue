<template>
	<view class="user-item-box">
		<view class="title">标题</view>
		<view class="content">
			<view class="info">这是介绍</view>
			<u--image class="image" :showLoading="true" :src="src" width="100rpx" height="100rpx"></u--image>
			<view class="operate-box">
				<view class="poll">共 0 票</view>
				<view class="but-box">
					<u-button size="mini" text="编辑" />
					<u-button size="mini" text="删除" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'userItemBox',
		data() {
			return {
				src: 'https://cdn.uviewui.com/uview/album/1.jpg'
			}
		},
		methods: {
			toItemList() {
				uni.navigateTo({
					url: '/pages/vote/activityItemList'
				})
			}
		}
	}
</script>

<style scoped>
	.user-item-box {
		border-radius: 15rpx;
		margin-top: 30rpx;
		padding-bottom: 20rpx;
		box-shadow: 0 0 10rpx 5rpx #dddddd;
		font-size: 25rpx;
	}

	.title {
		padding: 10rpx 30rpx;
		color: #333333;
		border-bottom: 5rpx solid rgba(0, 0, 0, 0.1);
	}

	.info {
		padding: 10rpx;
		color: #888888;
		background-color: rgba(0, 0, 0, 0.1);
		border-radius: 10rpx;
	}
	
	.image {
		margin-top: 20rpx;
		border-radius: 10rpx;
	}
	
	.operate-box {
		padding-top: 20rpx;
		padding-left: 5rpx;
		display: flex;
	}
	
	.poll {
		flex: 1;
		color: #2979ff;
	}
	
	.but-box{
		display: flex;
	}
	
	.but-box > *:nth-child(1) {
		margin-right: 10rpx;
	}
</style>
