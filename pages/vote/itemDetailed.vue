<template>
	<view class="background">
		<u--image :showLoading="true" :src="src" width="100%"></u--image>
		<view class="content">
			<view class="top-box">
				<view class="title">标题</view>
				<u-grid class="info" :border="false">
					<u-grid-item>
						<text class="number">1</text>
						<text class="text">排名</text>
					</u-grid-item>
					<u-grid-item>
						<text class="number">1</text>
						<text class="text">票数</text>
					</u-grid-item>
					<u-grid-item>
						<text class="number">1</text>
						<text class="text">距上一名</text>
					</u-grid-item>
				</u-grid>
			</view>
			<view class="introduce-box">
				<view class="title">选手作品</view>
				<u--image class="item-image" :showLoading="true" :src="src" width="100%"></u--image>
				<view class="introduce-text">
					这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍
				</view>
			</view>
			<u-button type="primary" text="为他投票" />
		</view>
	</view>
</template>

<script>
	export default {
		name: 'itemDetailed',
		data() {
			return {
				src: 'https://cdn.uviewui.com/uview/album/1.jpg'
			}
		},
		methods: {

		}
	}
</script>

<style scoped>
	.background {
		width: 100vw;
		min-height: 100vh;
		background-color: #ecf5ff;
		padding-bottom: 20rpx;
	}

	.top-box {
		background-color: white;
		border-radius: 15rpx;
		box-shadow: 0 0 5rpx 1rpx #eeeeee;
	}

	.title {
		text-align: center;
		border-bottom: 3rpx solid rgba(0, 0, 0, 0.1);
		padding: 15rpx 0;
		font-size: 25rpx;
		color: #555555;
	}

	.info {
		font-size: 20rpx;
		padding: 20rpx 0;
	}

	.info .number {
		color: #333333;
	}

	.info .text {
		color: #666666;
	}

	.introduce-box {
		background-color: white;
		margin: 20rpx 0;
		padding: 0 15rpx 15rpx 15rpx;
		border-radius: 15rpx;
		box-shadow: 0 0 5rpx 1rpx #eeeeee;
		overflow: hidden;
	}

	.item-image {
		margin: 15rpx 0;
	}
	
	.introduce-text {
		font-size: 22rpx;
		color: #333333;
	}
</style>
