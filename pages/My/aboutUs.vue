<template>
	<view class="container">
		<view class="logo">
			<u-image :src="logo" width="130" height="130" border-radius="20"></u-image>
			<view class="title">
				<text>公司介绍</text>
			</view>
		</view>
		<u-parse :html="content"></u-parse>
	</view>
</template>

<script>
	import { aboutUs } from '@/network/My-api'
	export default {
		data() {
			return {
				logo: '',
				content: ''
			};
		},
		onLoad(option) {
			
			this.getAboutUs();
		},
		methods: {
			async getAboutUs() {
				try{
					let res = await aboutUs()
					
					this.logo = res.logo
					this.content = res.content
				}catch(e){
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.container {
		@include box(30rpx);
	}
	.logo {
		width: 100%;
		height: 315rpx;
		@include flex-center();
		flex-direction: column;
	}
	.title {
		font-size: 34rpx;
		color: #333333;
		margin-top: 30rpx;
	}
</style>
