<template>
	<view class="user-item-box">
		<view class="title">{{ activityItem.item_title }}</view>
		<view class="content">
			<view class="info">{{ activityItem.item_introduce }}</view>
			<u--image class="image" :showLoading="true" :src="src" width="100rpx" height="100rpx"></u--image>
			<view class="operate-box">
				<view class="poll">共 {{ activityItem.item_poll }} 票</view>
				<view class="but-box">
					<u-button size="mini" text="编辑" @click="toItemEdit" />
					<u-button type="error" size="mini" text="删除" @click="showConfirmModal = true" />
				</view>
			</view>
		</view>
		<!-- 确认模态框 -->
		<u-modal ref="confirmModal" :show="showConfirmModal" :showCancelButton="true" :buttonReverse="true"
			:asyncClose="true" @confirm="onConsent" @cancel="showConfirmModal = false">
			{{ `确定要删除【${activityItem.item_title}】吗？` }}
		</u-modal>
	</view>
</template>

<script>
	import {
		getRequestAddress
	} from '@/utils/request.js'

	import {
		deletePollActivityItem
	} from '@/api/poll_activity_item.js';

	export default {
		name: 'userItemBox',
		props: ["activityItem"],
		computed: {
			src() {
				return `${getRequestAddress()}/image/${this.activityItem.item_image}`
			}
		},
		data() {
			return {
				showConfirmModal: false
			}
		},
		methods: {
			toItemEdit() {
				uni.navigateTo({
					url: `/pages/vote/editItem?aiid=${this.activityItem.id}&aid=${this.activityItem.activity_id}`
				})
			},
			async onConsent() {
				let response = await deletePollActivityItem(this.activityItem);
				if (response) {
					uni.redirectTo({
						url: `/pages/vote/userItemList?aid=${this.activityItem.activity_id}`
					})
				} else {
					uni.showToast({
						icon: "error",
						title: "删除失败"
					})
				}
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

	.but-box {
		display: flex;
	}

	.but-box>*:nth-child(1) {
		margin-right: 10rpx;
	}
</style>
