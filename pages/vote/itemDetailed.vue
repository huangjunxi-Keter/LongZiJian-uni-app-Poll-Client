<template>
	<view class="background">
		<u-sticky v-if="isPoll">
			<view class="poll_state">您已为此活动投票</view>
		</u-sticky>
		<u--image :showLoading="true" :src="activitySrc" width="100%"></u--image>
		<view class="content">
			<view class="top-box">
				<view class="title">{{ activityItem.item_title }}</view>
				<u-grid class="info" :border="false" :col="1">
					<u-grid-item>
						<text class="number">{{ activityItem.item_poll }}</text>
						<text class="text">票数</text>
					</u-grid-item>
				</u-grid>
			</view>
			<view class="introduce-box">
				<view class="title">选手作品</view>
				<u--image class="item-image" :showLoading="true" :src="itemSrc" width="100%"></u--image>
				<view class="introduce-text">{{ activityItem.item_introduce }}</view>
			</view>
			<u-button v-if="!isPoll" type="primary" text="为他投票" @click="showConfirmModal = true" />
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
		getPollActivity
	} from '@/api/poll_activity.js';
	import {
		getPollActivityItem
	} from '@/api/poll_activity_item.js';
	import {
		findPollLogsCount,
		createPollLog
	} from '@/api/poll_log.js';

	export default {
		name: 'itemDetailed',
		data() {
			return {
				loginUser: null,
				activity: {},
				activityItem: {},
				isPoll: false,
				showConfirmModal: false,
				confirmModalContent: '',
			}
		},
		computed: {
			activitySrc() {
				return `${getRequestAddress()}/image/${this.activity.cover_image}`;
			},
			itemSrc() {
				return `${getRequestAddress()}/image/${this.activityItem.item_image}`;
			}
		},
		methods: {
			async LoadPageData(id) {
				if (id)
					this.activityItem = await getPollActivityItem(id);
				uni.setNavigationBarTitle({
					title: this.activityItem.item_title
				});
				this.activity = await getPollActivity(this.activityItem.activity_id);
				if (this.loginUser) {
					this.confirmModalContent = `要为【${this.activityItem.item_title}】投票吗？`;
					this.isPoll = await findPollLogsCount({
						uid: this.loginUser.id,
						aid: this.activity.id
					}) > 0;
				} else {
					this.confirmModalContent = "需要登录后才能投票，是否前往登录？";
				}
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
							url: `/pages/vote/itemDetailed?aiid=${this.activityItem.id}`
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
		onLoad(option) {
			this.loginUser = getApp().globalData.loginUser;
			this.LoadPageData(option.aiid);
		},
		onShow() {
			this.loginUser = getApp().globalData.loginUser;
			this.LoadPageData();
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

	.poll_state {
		background-color: #f5fff0;
		color: #5ac725;
		padding: 10rpx;
		text-align: center;
	}
</style>
