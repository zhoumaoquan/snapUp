<template>
	<view class="container">
		<view class="app-header">
			<view class="app-header-top">
				<view class="app-top-title">
					<text>{{income.brokerage}}</text>
				</view>
				<view class="app-top-text">
					<text>收益总额(元)</text>
				</view>
			</view>
			<view class="app-header-bottom">
				<view class="app-header-bottom-item">
					<text class="title">{{income.member_money}}</text>
					<text class="text">已提现金额(元)</text>
				</view>
				<view class="app-header-bottom-item">
					<text class="title">{{income.shen_money}}</text>
					<text class="text">剩余金额(元)</text>
				</view>

			</view>
		</view>
		<view class="app-box">
			<!-- 抢购收益 -->
			<view class="app-box-item">
				<view class="app-box-title">
					<text>抢购收益(元)</text>
					<u-icon @click="routerRule(5)" name="question-circle" color="#999999" size="34"></u-icon>
				</view>
				<view class="app-box-cont">
					<view class="app-box-single">
						<text class="title color-1">收益总额</text>
						<view class="price">
							<text class="num color-1">{{income.qiang_gou_money}}</text>
							<text class="param color-1">元</text>
						</view>
					</view>
					<view class="app-box-single line">
						<text class="title">已提现金额</text>
						<view class="price">
							<text class="num">{{income.qiang_gou_ti_money}}</text>
							<text class="param">元</text>
						</view>
					</view>
					<view class="app-box-single">
						<text class="title">剩余金额</text>
						<view class="price">
							<text class="num">{{income.qiang_gou_shen_money}}</text>
							<text class="param">元</text>
						</view>
					</view>
				</view>
				<view class="app-box-btn">
					<view class="app-btn-l btn-1" @click="Detail(1)">查看明细</view>
					<view class="app-btn-r" @click="withdraw(2)">提现</view>
				</view>
			</view>
			
			<!-- 购物收益 -->
			<view class="app-box-item">
				<view class="app-box-title">
					<text>购物收益(元)</text>
					<u-icon @click="routerRule(4)" name="question-circle" color="#999999" size="34"></u-icon>
				</view>
				<view class="app-box-cont">
					<view class="app-box-single">
						<text class="title color-2">收益总额</text>
						<view class="price">
							<text class="num color-2">{{income.gou_goods_money}}</text>
							<text class="param color-2">元</text>
						</view>
					</view>
					<view class="app-box-single line">
						<text class="title">已提现金额</text>
						<view class="price">
							<text class="num">{{income.gou_goods_ti_money}}</text>
							<text class="param">元</text>
						</view>
					</view>
					<view class="app-box-single">
						<text class="title">剩余金额</text>
						<view class="price">
							<text class="num">{{income.gou_goods_shen_money}}</text>
							<text class="param">元</text>
						</view>
					</view>
				</view>
				<view class="app-box-btn">
					<view class="app-btn-l btn-2" @click="Detail(2)">查看明细</view>
					<view class="app-btn-r" @click="withdraw(3)">提现</view>
				</view>
			</view>
			
			<!-- 分红收益 -->
			<view class="app-box-item">
				<view class="app-box-title">
					<text>分红收益(元)</text>
					<u-icon @click="routerRule(6)" name="question-circle" color="#999999" size="34"></u-icon>
				</view>
				<view class="app-box-cont">
					<view class="app-box-single">
						<text class="title color-3">收益总额</text>
						<view class="price">
							<text class="num color-3">{{income.share_sales_money}}</text>
							<text class="param color-3">元</text>
						</view>
					</view>
					<view class="app-box-single line">
						<text class="title">已提现金额</text>
						<view class="price">
							<text class="num">{{income.share_sales_ti_money}}</text>
							<text class="param">元</text>
						</view>
					</view>
					<view class="app-box-single">
						<text class="title">剩余金额</text>
						<view class="price">
							<text class="num">{{income.share_sales_shen_money}}</text>
							<text class="param">元</text>
						</view>
					</view>
				</view>
				<view class="app-box-cont">
					<view class="app-box-single">
						<text class="title">总销售额</text>
						<view class="price">
							<text class="num">{{income.share_sales_zong_money}}</text>
							<text class="param">元</text>
						</view>
					</view>
					<view class="app-box-single" @click="market">
						<text class="title">今日销售额</text>
						<view class="price">
							<text class="num">{{income.share_sales_today_money}}</text>
							<text class="param">元</text>
						</view>
						<view class="icon">
							<u-icon name="arrow-right" color="#999" size="26"></u-icon>
						</view>
					</view>
				</view>
				<view class="app-box-btn">
					<view class="app-btn-l btn-3" @click="dividend(3)">查看明细</view>
					<view class="app-btn-r" @click="withdraw(4)">提现</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { incomePage } from '@/network/My-api'
	export default {
		data() {
			return {
				m_id: '',
				flag: false,
				income: null
			};
		},
		onLoad(option) {
			uni.showLoading({
				title: '正在加载...'
			})
			this.m_id = option.m_id
		},
		onShow() {
			this.getIncomePage()
		},
		methods: {
			async getIncomePage() {
				try{
					let res = await incomePage(this.m_id)
					this.income = res.list
					if(!this.flag) {
						this.flag = true
						uni.hideLoading()
					}
				}catch(e){
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			// 查看明细
			Detail(type) {
				uni.navigateTo({
					url: '/pages/My/income-detailed?type=' + type + '&m_id=' + this.m_id
				})
			},
			dividend(type) {
				uni.navigateTo({
					url: '/pages/My/over-detailed?type=2&m_id=' + this.m_id
				})
			},
			withdraw(type) {
				uni.navigateTo({
					url: '/pages/My/withdraw?type=' + type + '&m_id=' + this.m_id
				})
			},
			market() {
				uni.navigateTo({
					url: '/pages/My/sell-detailed?m_id=' + this.m_id
				})
			},
			// 协议
			routerRule(type) {
				uni.navigateTo({
					url: '/pages/Home/rule?type=' + type
				})
			}
			
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
		padding-bottom: 100rpx;
	}

	.app-header {
		width: 100%;
		height: 349rpx;
		background: linear-gradient(0deg, #F16028, #FE6F44);
		display: flex;
		flex-direction: column;

		&-top {
			width: 100%;
			height: 200rpx;
			@include flex-center();
			flex-direction: column;

			.app-top-title {
				font-size: 60rpx;
				color: #FFFFFF;
				font-weight: 400;
				line-height: 70rpx;
				font-family: Bahnschrift;
				margin-bottom: 10rpx;
			}

			.app-top-text {
				font-size: 30rpx;
				color: #FFFFFF;
				opacity: 0.7;
				font-weight: 400;
			}
		}

		&-bottom {
			height: 149rpx;
			@include flex-al();
			position: relative;

			&-item {
				flex: 1;
				@include flex-center();
				flex-direction: column;

				.title {
					font-size: 48rpx;
					color: #FFFFFF;
					font-weight: 400;
					font-family: Bahnschrift;
					line-height: 70rpx;
				}

				.text {
					font-size: 28rpx;
					color: #FFFFFF;
					opacity: 0.7;
					font-weight: 400;
				}
			}
		}
	}

	.app-header-bottom::after {
		content: "";
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 1px;
		height: 80rpx;
		background-color: #FFFFFF;
		opacity: .3;
	}

	.app-box {
		@include box(0 30rpx);
	}

	.app-box-item {
		margin-top: 35rpx;
		background-color: #FFFFFF;
		width: 100%;
		border-radius: 20rpx;

		.app-box-title {
			@include flex-al();
			@include box(0 30rpx);
			height: 80rpx;
			border-bottom: 1rpx solid #F2F2F2;

			text {
				font-size: 30rpx;
				color: #333333;
				margin-right: 10rpx;
			}
		}

		.app-box-cont {
			width: 100%;
			height: 130rpx;
			@include flex-al();

			.app-box-single {
				flex: 1;
				@include flex-center();
				flex-direction: column;
				position: relative;
				.title {
					font-size: 26rpx;
					margin-bottom: 10rpx;
					font-weight: bold;
					color: #666;
				}

				.num {
					font-size: 36rpx;
					color: #333333;
					font-weight: 600;
				}

				.param {
					font-size: 22rpx;
					color: #333333;
					font-weight: 600;
					margin-left: 10rpx;
				}
				.icon {
					position: absolute;
					top: 50%;
					right: 40rpx;
					transform: translateY(-50%);
				}
			}

			.line {
				position: relative;

			}
		}
		.app-box-btn {
			@include flex-al();
			justify-content: space-evenly;
			height: 100rpx;
			.app-btn-l, .app-btn-r {
				width: 200rpx;
				height: 68rpx;
				
				border-radius: 34rpx;
				
				@include flex-center();
				font-size: 26rpx;
			}
			.app-btn-l {
				box-sizing: border-box;
				border: 2rpx solid;
			}
			.app-btn-r {
				background: linear-gradient(90deg, #ED343D, #FF6638);
				color: #FFFFFF;
			}
		}
	}
	.line::after,
	.line::before {
		content: "";
		width: 2rpx;
		height: 78rpx;
		background-color: #F5F5F5;
		position: absolute;
		@include position-al();
	}
	
	.line::after {
		right: 0;
	}
	
	.line::before {
		left: 0;
	}
	
	.color-1 {
		color: #ED353D !important;
	}
	.btn-1 {
		color: #ED353D;
		border-color: #ED353D;
	}
	.color-2 {
		color: #FF7039 !important;
	}
	.btn-2 {
		color: #FF7039;
		border-color: #FF7039;
	}
	.color-3 {
		color: #E8246E !important;
	}
	.btn-3 {
		color: #E8246E;
		border-color: #E8246E;
	}
</style>
