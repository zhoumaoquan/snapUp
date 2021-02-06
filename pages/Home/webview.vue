<template>
	<web-view :src="webUrl" @load="success" @error="error"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				webUrl: ''
			}
		},
		onLoad(option) {
			uni.showLoading({
				title:  '网页加载中...'
			})
			this.webUrl = JSON.parse(decodeURIComponent(option.url))
		},
		methods: {
			success() {
				uni.hideLoading()
			},
			error() {
				uni.hideLoading()
				uni.showToast({
					title: '网页加载失败，请重试',
					icon: 'none'
				})
			}
		}
	}
</script>

<style>
</style>
