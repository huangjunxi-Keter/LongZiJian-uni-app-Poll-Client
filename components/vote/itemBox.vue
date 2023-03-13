<template>
	<view class="item-box">
		<u--image :showLoading="true" :src="src" width="100%" />
		<view class="operate-box">
			<view class="title">标题</view>
			<view class="poll">76票</view>
			<u-button class="detailed-bth" text="详情" size="mini" @click="toDetailed" />
			<u-button type="primary" text="投票" size="mini" />
		</view>
	</view>
</template>

<script>
	export default {
		name: 'itemBox',
		data() {
			return {
				src: 'https://cdn.uviewui.com/uview/album/1.jpg'
			}
		},
		methods: {
			toDetailed() {
				uni.navigateTo({
					url: '/pages/vote/itemDetailed'
				})
			}
		}
	}
</script>

<style scoped>
	.item-box {
		width: calc(50vw - 45rpx);
		background-color: #3c9cff;
		margin: 30rpx 15rpx 0 30rpx;
		border-radius: 15rpx;
		box-shadow: 0 0 10rpx 5rpx #ddd;
		overflow: hidden;
	}

	.item-box:nth-child(2n) {
		margin: 30rpx 30rpx 0 15rpx;
	}

	.operate-box {
		background-color: white;
		padding: 20rpx;
		font-size: 24rpx;
		text-align: center;
	}
	
	.poll {
		margin-bottom: 10rpx;
		color: #398ade;
	}
	
	.detailed-bth {
		margin-bottom: 15rpx;
	}
</style>
