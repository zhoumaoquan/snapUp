<template>
	<view class="container">
		<view class="app-header">
			<view class="app-header-item">
				<view class="app-header-title">
					<text>总余额(元）</text>
				</view>
				<view class="app-header-num">
					<text>{{balance}}</text>
				</view>
				<u-icon @click="router('over-detailed')" name="arrow-right" size="26" top="-1" color="#fff" label-pos="left" label="查看明细" label-size="28" label-color="#fff"></u-icon>
			</view>
			<view class="app-header-item">
				<view class="app-header-title">
					<text>总收益(元）</text>
				</view>
				<view class="app-header-num">
					<text>{{brokerage}}</text>
				</view>
				<u-icon @click="router('income')" name="arrow-right" size="26" top="-1" color="#fff" label-pos="left" label="查看收益" label-size="28" label-color="#fff"></u-icon>
			</view>
			<view class="app-header-line"></view>
		</view>
		<view class="app-box">
			<view class="app-box-item" @click="router('topUp')">
				<image src="@/static/icon/chongzhi.png"></image>
				<view class="app-box-title">
					<text>充值</text>
				</view>
				<u-icon name="arrow-right" size="30" color="#999"></u-icon>
			</view>
			<view class="app-box-item" @click="router('withdraw')">
				<image src="@/static/icon/tix.png"></image>
				<view class="app-box-title">
					<text>提现</text>
				</view>
				<u-icon name="arrow-right" size="30" color="#999"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	import { myWallet } from '@/network/My-api'
	export default {
		data() {
			return {
				m_id: '',
				balance: '', // 余额
				brokerage: '' // 收益
			};
		},
		onLoad(option) {
			uni.showLoading({
				title: '正在加载...',
				mask: false
			})
			this.m_id = option.m_id
		},
		onShow() {
			this.getMyWallet()
		},
		methods: {
			async getMyWallet() {
				try{
					let res = await myWallet(this.m_id);
					this.balance = res.balance
					this.brokerage = res.brokerage
					uni.hideLoading()
				}catch(e){
					uni.showToast({
						title: 'e',
						icon: 'none'
					})
				}
				 
			},
			router(path) {
				uni.navigateTo({
					url: `/pages/My/${path}?m_id=${this.m_id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
	}
	.app-header {
		width: 100%;
		height: 316rpx;
		background: linear-gradient(0deg,#FE6E44 ,#F12D27);
		@include flex-al();
		position: relative;
		&-item {
			flex: 1;
			height: 100%;
			display: flex;
			flex-direction: column;
			@include box(30rpx 0);
			align-items: center;
			justify-content: space-around;
		}
		&-title {
			font-size: 30rpx;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 70rpx;
			opacity: 0.7;
		}
		&-num {
			font-size: 60rpx;
			font-family: Bahnschrift;
			color: #FFFFFF;
			font-weight: 400;
			letter-spacing: 6rpx;
		}
		&-line {
			width: 1px;
			height: 120rpx;
			border-radius: 1rpx;
			
			opacity: .4;
			background-color: #FFFFFF;
			position: absolute;
			z-index: 2;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
		}
	}
	.app-box {
		margin-top: 31rpx;
		background-color: #FFFFFF;
		&-item {
			width: 100%;
			@include box(0 30rpx);
			height: 104rpx;
			border-bottom: 1rpx solid #F2F2F2;
			@include flex-al();
			image {
				width: 50rpx;
				height: 42rpx;
			}
			
		}
		&-title {
			flex: 1;
			margin-left: 25rpx;
			font-size: 32rpx;
			color: #333333;
			height: 100%;
			@include flex-al();
		}
	}
</style>
