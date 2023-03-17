<template>
	<view class="item-box">
		<u--image :showLoading="true" :src="src" width="100%" />
		<view class="operate-box">
			<view class="title">{{ activityItem.item_title }}</view>
			<view class="poll">{{ activityItem.item_poll }}票</view>
			<u-button class="detailed-bth" text="详情" size="mini" @click="toDetailed" />
			<u-button v-if="!isPoll" type="primary" text="投票" size="mini" @click="showConfirmModal = true" />
		</view>
		<!-- 确认模态框 -->
		<u-modal ref="confirmModal" :show="showConfirmModal" :showCancelButton="true" :buttonReverse="true"
			:asyncClose="true" @confirm="onConsent" @cancel="showConfirmModal = false">
			{{ confirmModalContent }}
		</u-modal>
	</view>
</template>

<script>
	import {
		getRequestAddress
	} from '@/utils/request.js';
	import {
		createPollLog
	} from '@/api/poll_log.js';

	export default {
		name: 'itemBox',
		props: ['loginUser', 'activityItem', 'isPoll'],
		data() {
			return {
				showConfirmModal: false,
				confirmModalContent: '',
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
					url: `/pages/vote/itemDetailed?aiid=${this.activityItem.id}`
				})
			},
			async onConsent() {
				if (this.loginUser) {
					// 创建投票记录
					let response = await createPollLog({
						user_id: this.loginUser.id,
						activity_id: this.activityItem.activity_id,
						activity_item_id: this.activityItem.id
					});

					// 成功：刷新页面
					if (response) {
						uni.redirectTo({
							url: `/pages/vote/activityDetailed?aid=${this.activityItem.activity_id}`
						});
					} else {
						this.showConfirmModal = false;
						uni.showToast({
							title: '投票失败',
							icon: 'error'
						});
					}
				} else {
					this.showConfirmModal = false;
					uni.navigateTo({
						url: '/pages/user/login'
					});
				}
			}
		},
		mounted() {
			if (this.loginUser)
				this.confirmModalContent = `要为【${this.activityItem.item_title}】投票吗？`;
			else
				this.confirmModalContent = "需要登录后才能投票，是否前往登录？";
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
