<template>
	<view class="z-empty">
		<view class="z-empty-icon">
			<u-image :src="src" width="300" height="300" duration="200">
				<u-loading slot="loading"></u-loading>
			</u-image>
		</view>
		<view class="z-empty-text" :style="{ color: color }">
			<text>{{text}}</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		name: 'z-empty',
		props: {
			src: {
				type: String,
				default: require('@/static/image/not-data.png')
			},
			text: {
				type: String,
				default: '暂时没有更多数据~'
			},
			color: {
				type: String,
				default: '#999999'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.z-empty {
		width: 100%;
		height: 600rpx;
		@include flex-center();
		flex-direction: column;
		&-icon {
			width: 300rpx;
			height: 300rpx;
		}
		&-text {
			margin-top: 20rpx;
			font-size: 28rpx;
			font-weight: bold;
		}
	}
</style>
