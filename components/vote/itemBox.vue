<template>
	<view class="item-box">
		<u--image :showLoading="true" :src="src" width="100%" />
		<view class="operate-box">
			<view class="title">{{ activityItem.item_title }}</view>
			<view class="poll">{{ activityItem.item_poll }}票</view>
			<u-button class="detailed-bth" text="详情" size="mini" @click="toDetailed" />
			<u-button type="primary" text="投票" size="mini" @click="handlePoll" />
		</view>
		<!-- 确认模态框 -->
		<u-modal ref="confirmModal" :show="showConfirmModal" :showCancelButton="true" :buttonReverse="true"
			:asyncClose="true" @confirm="onConsent" @cancel="showConfirmModal = false">
			{{ `要为【${activityItem.item_title}】投票吗？` }}
		</u-modal>
	</view>
</template>

<script>
	import {
		getRequestAddress
	} from '@/utils/request.js'

	export default {
		name: 'itemBox',
		props: ['activityItem'],
		data() {
			return {
				showConfirmModal: false,
			}
		},
		computed: {
			src() {
				return `${getRequestAddress()}/image/${this.activityItem.item_image}`
			}
		},
		methods: {
			toDetailed() {
				uni.navigateTo({
					url: '/pages/vote/itemDetailed'
				})
			},
			handlePoll() {
				this.showConfirmModal = true;
			},
			onConsent() {
				console.log("确定投票");
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
