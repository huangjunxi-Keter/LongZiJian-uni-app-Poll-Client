<template>
	<view class="content" :style="{'margin-top': `${statusBarHeight}rpx`}">
		<view class="avatar-box">
			<u-row>
				<u-col :span="3">
					<u-avatar size="75" :src="src"></u-avatar>
				</u-col>
				<u-col :span="9" @click="changePage">
					<u-row>
						<u-col>
							<text class="nickname">{{ loginUser.nickname }}</text>
						</u-col>
					</u-row>
					<u-row>
						<u-col>
							<text class="email">{{ loginUser.email }}</text>
						</u-col>
					</u-row>
				</u-col>
			</u-row>
		</view>
		<u-cell-group>
			<u-cell icon="grid" title="我的活动" isLink :url="userActivityURL" />
			<u-cell icon="clock" title="投票记录" isLink :url="pollLogListURL" />
			<u-cell v-if="loginUser.id" icon="close-circle" title="退出登录" @click="showConfirmModal = true" />
		</u-cell-group>
		<!-- 底部导航 -->
		<tabbar :current="2"></tabbar>
		<!-- 确认模态框 -->
		<u-modal ref="confirmModal" :show="showConfirmModal" :showCancelButton="true" :buttonReverse="true" async-close
			@confirm="onConsent" @cancel="showConfirmModal = false">
			确定要退出登录吗？
		</u-modal>
	</view>
</template>

<script scoped>
	import {
		getRequestAddress
	} from '@/utils/request.js'

	export default {
		name: 'userIndex',
		data() {
			return {
				loginUser: {
					nickname: '点击登录',
					email: '',
				},
				userActivityURL: '',
				pollLogListURL: '',
				showConfirmModal: false
			}
		},
		computed: {
			src() {
				return `${getRequestAddress()}/image/${this.loginUser.avatar}`
			}
		},
		methods: {
			changePage() {
				if (!this.loginUser.id)
					uni.navigateTo({
						url: '/pages/user/login'
					});
				else
					uni.navigateTo({
						url: '/pages/user/userInfo'
					});
			},
			onConsent() {
				this.loginUser = {
					nickname: '点击登录',
					email: '',
				};
				this.userActivityURL = '';
				this.pollLogListURL = '';
				getApp().globalData.loginUser = null;
				uni.removeStorageSync("loginUserId");
				this.showConfirmModal = false;
			}
		},
		onLoad() {
			this.statusBarHeight = getApp().globalData.statusBarHeight
		},
		onShow() {
			let loginUser = getApp().globalData.loginUser;
			if (loginUser) {
				this.loginUser = loginUser;
				this.userActivityURL = "/pages/vote/userActivityList";
				this.pollLogListURL = "/pages/log/pollLogList";
			} else {
				this.loginUser = {
					nickname: '点击登录',
					email: '',
				};
				this.userActivityURL = "";
			}
		}
	}
</script>

<style scoped>
	.avatar-box {
		padding: 30rpx 0;
	}

	.email {
		font-size: 25rpx;
		color: #888;
	}
</style>
