<template>
	<view class="user-activity-box">
		<view class="title">
			{{ activity.activity_title }}
		</view>
		<u--image class="cover-image" :showLoading="true" :src="src" width="100%"></u--image>
		<!-- 数据 -->
		<u-grid class="info" :border="false">
			<u-grid-item>
				<text class="number">{{ activity.item_count }}</text>
				<text class="text">项目数</text>
			</u-grid-item>
			<u-grid-item>
				<text class="number">{{ activity.poll_count }}</text>
				<text class="text">总票数</text>
			</u-grid-item>
			<u-grid-item>
				<text class="number">{{ activity.page_view }}</text>
				<text class="text">浏览量</text>
			</u-grid-item>
		</u-grid>
		<!-- 操作 -->
		<u-grid class="operate-box" :border="false">
			<u-grid-item class="operate-item">
				<u-button size="mini" text="编辑活动" @click="toEditActivity" />
			</u-grid-item>
			<u-grid-item class="operate-item">
				<u-button size="mini" text="项目管理" @click="toItemList" />
			</u-grid-item>
			<u-grid-item class="operate-item">
				<u-button v-if="!activity.state" type="error" size="mini" text="关闭活动" @click="changActivityState(1)" />
				<u-button v-else size="mini" type="success" text="开启活动" @click="changActivityState(0)" />
			</u-grid-item>
		</u-grid>
	</view>
</template>

<script>
	import {
		getRequestAddress
	} from '@/utils/request.js';
	import {
		updatePollActivity
	} from '@/api/poll_activity.js';

	export default {
		name: 'userActivityBox',
		props: ["activity"],
		computed: {
			src() {
				return `${getRequestAddress()}/image/${this.activity.cover_image}`
			}
		},
		methods: {
			toItemList() {
				uni.navigateTo({
					url: `/pages/vote/userItemList?aid=${this.activity.id}`
				})
			},
			toEditActivity() {
				uni.navigateTo({
					url: `/pages/vote/editActivity?aid=${this.activity.id}`
				})
			},
			async changActivityState(state) {
				let data = {};
				Object.keys(this.activity).forEach(key => {
					data[key] = this.activity[key];
				});
				data.state = state;
				let response = await updatePollActivity(data);
				if (response) {
					uni.redirectTo({
						url: '/pages/vote/userActivityList'
					})
				} else {
					uni.showToast({
						icon: 'error',
						title: '更新失败'
					})
				}
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

	.operate-item {
		padding: 0 10rpx;
	}
</style>
