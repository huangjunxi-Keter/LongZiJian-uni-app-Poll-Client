<template>
	<view>
		<u-tabbar :value="current" @change="changeTab" :fixed="true" :placeholder="true"
			:safeAreaInsetBottom="true">
			<u-tabbar-item v-for="item in navigation" :text="item.title" :icon="item.icon"></u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script scoped>
	export default {
		name: 'tabbar',
		props: {
			current: Number
		},
		data() {
			return {
				navigation: [
					{
						icon: 'home',
						title: '主页',
						path: 'pages/vote/index'
					},
					{
						icon: 'plus-circle-fill',
						title: '创建活动',
						path: 'pages/vote/addActivity'
					},
					{
						icon: 'account',
						title: '我的',
						path: 'pages/user/index'
					}
				]
			}
		},
		methods: {
			changeTab(e) {
				// console.log(e);
				uni.switchTab({
					url: `/${this.navigation[e].path}`
				})
			}
		},
		created() {
			// 隐藏原生tabbar
			uni.hideTabBar()
		}
	}
</script>

<style>
</style>
