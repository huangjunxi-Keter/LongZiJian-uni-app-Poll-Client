<template>
	<view class="content" :style="{'margin-top': `${statusBarHeight}rpx`}">
		<view class="avatar-box">
			<u-row>
				<u-col :span="3">
					<u-avatar font-size="40" size="75"></u-avatar>
				</u-col>
				<u-col :span="9" @click="toLogin">
					<u-row>
						<u-col>
							<text class="nickname">{{ nickname }}</text>
						</u-col>
					</u-row>
					<u-row>
						<u-col>
							<text class="email">{{ email }}</text>
						</u-col>
					</u-row>
				</u-col>
			</u-row>
		</view>
		<u-cell-group>
			<u-cell icon="grid" title="我的活动" isLink url="/pages/vote/userActivityList" />
			<u-cell icon="clock" title="投票记录" isLink />
			<u-cell icon="close-circle" title="退出登录" />
		</u-cell-group>
		<!-- 底部导航 -->
		<tabbar :current="2"></tabbar>
	</view>
</template>

<script scoped>
	export default {
		name: 'userIndex',
		data() {
			return {
				nickname: '点击登录',
				email: '',
				src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
			}
		},
		methods: {
			toLogin() {
				if (this.loginUser === null)
					uni.navigateTo({
						url: '/pages/user/login'
					})
			}
		},
		onLoad() {
			this.statusBarHeight = getApp().globalData.statusBarHeight
		},
		onShow() {
			this.loginUser = getApp().globalData.loginUser
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
