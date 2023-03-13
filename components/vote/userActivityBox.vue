<template>
	<view class="user-activity-box">
		<view class="title">
			{{ activity.title }}
		</view>
		<u--image class="cover-image" :showLoading="true" :src="activity.image" width="100%"></u--image>
		<!-- 数据 -->
		<u-grid class="info" :border="false">
			<u-grid-item>
				<text class="number">1</text>
				<text class="text">选手数</text>
			</u-grid-item>
			<u-grid-item>
				<text class="number">1</text>
				<text class="text">总票数</text>
			</u-grid-item>
			<u-grid-item>
				<text class="number">1</text>
				<text class="text">浏览量</text>
			</u-grid-item>
		</u-grid>
		<!-- 操作 -->
		<u-grid class="operate-box" :border="false">
			<u-grid-item>
				<u-button size="mini" text="编辑活动" />
			</u-grid-item>
			<u-grid-item></u-grid-item>
			<u-grid-item>
				<u-button size="mini" text="项目管理" @click="toItemList" />
			</u-grid-item>
		</u-grid>
	</view>
</template>

<script>
	export default {
		name: 'userActivityBox',
		data() {
			return {
				activity: {
					title: '标题',
					image: 'https://cdn.uviewui.com/uview/album/1.jpg'
				}
			}
		},
		methods: {
			toItemList() {
				uni.navigateTo({
					url: '/pages/vote/userItemList'
				})
			}
		}
	}
</script>

<style scoped>
	.user-activity-box {
		border-radius: 15rpx;
		box-shadow: 0 0 10rpx 5rpx #dddddd;
		padding: 20rpx;
		margin-top: 30rpx;
	}

	.title {
		font-size: 25rpx;
	}

	.cover-image {
		margin: 20rpx 0;
	}

	.info {
		font-size: 20rpx;
	}

	.info .number {
		color: #333333;
	}

	.info .text {
		color: #666666;
	}
	
	.operate-box {
		padding-top: 20rpx;
	}
</style>
