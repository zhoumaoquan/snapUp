<template>
	<view class="container">
		<view class="app-box">
			<view class="app-box-title">充值金额</view>
			<view class="app-input">
				<text class="text">￥</text>
				<input type="number" v-model="money" placeholder="请输入充值金额" placeholder-class="place" />
			</view>
		</view>
		
		<view class="default-btn" @click="confirm">
			<text>确认充值</text>
		</view>
	</view>
</template>

<script>
	import { topupOrder, topupOrderPay } from '@/network/My-api'
	export default {
		data() {
			return {
				money: '',
				m_id: ''
			};
		},
		onLoad(option) {
			this.m_id = option.m_id
		},
		methods: {
			confirm() {
				if(this.money === '') {
					return uni.showToast({
						title: '请输入需充值金额',
						icon: 'none'
					})
				}
				if(this.money == 0) {
					return 
				}
				topupOrder({
					m_id: this.m_id,
					number: this.money
				}).then(res => {
					if(res.recharge_order_id !== '') {
						this.topUpPay(res.recharge_order_id)
					}
				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			topUpPay(id) {
				topupOrderPay({
					m_id: this.m_id,
					orderId: id
				}).then(res => {
					wx.requestPayment({
						timeStamp: res.timeStamp,
						nonceStr: res.nonceStr,
						package: res.package,
						paySign: res.paySign,
						signType: res.signType,
						success(res) {
							return uni.showToast({
								title: '充值成功',
								 mask: true,
								 success() {
								 	setTimeout(() => {
										uni.navigateBack({
											delta: 1
										})
									}, 1500)
								 }
							})
						},
						fail(e) {
							console.log(e)
							uni.showToast({
								title: '支付失败',
								icon: 'none'
							})
						}
					})
				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			}
		}
		
	}
</script>

<style lang="scss">
	.app-box {
		margin-top: 170rpx;
		@include box(0 45rpx);
		background-color: #FFFFFF;
		&-title {
			font-size: 34rpx;
			color: #333333;
			font-weight: 400;
		}
		.app-input {
			width: 100%;
			height: 120rpx;
			border-bottom: 1rpx solid #F2F2F2;
			@include flex-al();
			margin-top: 10rpx;
			.place {
				font-size: 50rpx;
				color: #606266;
				font-weight: 400;
			}
			input {
				width: 100%;
				height: 100%;
				font-size: 72rpx;
				font-weight: bold;
				color: #333333;
			}
			.text {
				font-size: 72rpx;
				font-family: SourceHanSansSC-Medium;
				color: #333333;
				margin-right: 10rpx;
			}
		}
	}
	
	.default-btn {
		font-weight: 400;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 108rpx;
		
		z-index: 99;
	}
</style>
