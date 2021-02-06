<template>
	<view class="container">
		<view class="app-cont">
			<view class="app-cont-title">
				<text>提现金额</text>
			</view>
			<view class="app-cont-input">
				<text>￥</text>
				<input type="digit" v-model="money" placeholder="输入提现金额" placeholder-class="tips" />
			</view>
			<view class="app-cont-text">
				<text>可提现金额￥{{canMoney}}</text>
				<text class="active" @click="allChooise">全部提现</text>
			</view>
		</view>
		<!-- <view class="app-option">
			<image src="@/static/icon/wx-2.png"></image>
			<text>提现到微信零钱</text>
		</view> -->
		<view class="app-option">
			<u-icon name="zhifubao-circle-fill" color="#1576FF" size="50"></u-icon>
			<text class="title">提现到支付宝</text>
		</view>
		<view class="app-input">
			<view class="app-input-item boder">
				<input type="text" v-model="username" placeholder-class="placeholder" placeholder="请输入支付宝实名姓名" />
			</view>
			<view class="app-input-item">
				<input type="text" v-model="number" placeholder="请输入支付宝账号" />
			</view>
		</view>
		<view class="app-rule">
			<view class="app-rule-title">
				<text>规则说明</text>
			</view>
			<u-parse :html="content"></u-parse>
		</view>
		
		<view class="app-btn" @click="submitMoney">
			<text>提现至支付宝</text>
		</view>
	</view>
</template>

<script>
	import { withdrawPage, withdrawMoney } from '@/network/My-api'
	export default {
		data() {
			return {
				canMoney: 0,
				content: '',
				money: '',
				username: '',
				number: '',
				type: 1,
				m_id: ''
			}
		},
		onLoad(option) {
			if(option.type) {
				this.type = option.type
			}
			this.m_id = option.m_id
			this.getWithdrawPage(option.type, option.m_id)
		},
		methods: {
			async getWithdrawPage(type, m_id) {
				try{
					let res = await withdrawPage({ type, m_id })
					this.canMoney = res.list.money
					this.content = res.list.rule.content
					this.username = res.list.account_name
					this.number = res.list.account_number
				}catch(e){
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			allChooise() {
				this.money = this.canMoney
			},
			submitMoney() {
				if(this.money === '') {
					return uni.showToast({
						title: '请输入需提现金额',
						icon: 'none'
					})
				}
				if(this.money <= 0) {
					return uni.showToast({
						title: '请输入正确的提现金额',
						icon: 'none'
					})
				}
				
				if(this.username.trim().length === 0) {
					return uni.showToast({
						title: '请输入支付宝实名姓名',
						icon: 'none'
					})
				}
				if(this.number.trim().length === 0) {
					return uni.showToast({
						title: '请输入支付宝账号',
						icon: 'none'
					})
				}
				uni.showLoading({
					title: '提现发起中...',
					mask: true
				})
				withdrawMoney({
					m_id: this.m_id,
					amounts: this.money,
					type: this.type,
					username: this.username,
					number: this.number
				}).then(res => {
					uni.showToast({
						title: '提现已申请,请耐心等待',
						mask: true,
						success() {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1500)
						}
					})
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
	}
	.app-cont {
		width: 100%;
		height: 308rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		@include box(30rpx 30rpx 0 30rpx);
		&-title {
			font-size: 32rpx;
			color: #333333;
			font-weight: 400;
		}
		&-input {
			height: 130rpx;
			border-bottom: 1rpx solid #F2F2F2;
			@include flex-al();
			text {
				font-size: 48rpx;
				font-weight: 400;
				color: #606266;
				margin-right: 10rpx;
			}
			input {
				width: 100%;
				height: 100%;
				font-size: 48rpx;
				font-weight: 600;
				color: #333333;
			}
			.tips {
				color: #999999;
			}
		}
		&-text {
			height: 105rpx;
			@include flex-al-ju(space-between);
			font-size: 26rpx;
			color: #333333;
			font-weight: 400;
			.active {
				font-size: 28rpx;
				color: #ED343D;
				font-weight: bold;
			}
		}
	}
	.app-option {
		width: 100%;
		height: 94rpx;
		@include box(0 30rpx);
		background-color: #FFFFFF;
		@include flex-al();
		margin-top: 20rpx;
		
		image {
			width: 42rpx;
			height: 42rpx;
			margin-right: 19rpx;
		}
		.title {
			font-size: 30rpx;
			font-weight: 400;
			color: #333333;
			margin-left: 10rpx;
		}
	}
	.app-rule {
		margin-top: 20rpx;
		background-color: #FFFFFF;
		@include box(35rpx 30rpx);
		min-height: 280rpx;
		&-title {
			font-size: 32rpx;
			color: #333333;
			margin-bottom: 20rpx;
		}
	}
	.boder {
		border-top: 1px solid #F2F2F2;
		border-bottom: 1px solid #F2F2F2;
	}
	.app-input {
		background-color: #FFFFFF;
		@include box(0 30rpx);
		&-item {
			width: 100%;
			height: 100rpx;
			@include flex-al();
			
			.title {
				font-size: 30rpx;
				color: #333333;
				margin-right: 20rpx;
			}
			input {
				flex: 1;
				font-size: 28rpx;
				color: #333333;
			}
			.placeholder {
				color: #999999;
				font-size: 28rpx;
			}
		}
	}
	.app-btn {
		width: 100%;
		height: 98rpx;
		background: linear-gradient(90deg, #ED343D, #FF6638);
		color: #FFFFFF;
		font-size: 32rpx;
		@include flex-center();
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		
		z-index: 99;
	}
</style>
