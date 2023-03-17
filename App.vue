<script>
	import {
		getUserData
	} from '@/api/user.js';

	export default {
		globalData: {
			statusBarHeight: 0,
			loginUser: null,
		},
		onLaunch: async function() {
			console.log('App Launch');
			// 获取状态栏高度
			uni.getSystemInfo({
				success(e) {
					getApp().globalData.statusBarHeight = e.statusBarHeight
				}
			});
			// 获取本地用户信息
			let loginUserId = uni.getStorageSync("loginUserId")
			if (loginUserId) {
				let loginUser = await getUserData(parseInt(loginUserId));
				getApp().globalData.loginUser = loginUser;
			}
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";

	.content {
		padding: 25rpx 20rpx 0 20rpx;
	}
</style>
