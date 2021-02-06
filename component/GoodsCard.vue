<template>
	<view class="goods-box" @click="jumpDatail">
		<image :src="produce.cover_path" class="goods-box-img"></u-loading></image>
		<view class="goods-info">
			<view class="goods-info-title">{{produce.goods_name}}</view>
			<view class="goods-info-cont" v-if="produce.sold_out_status == 1">
				<view class="goods-info-cont-ing" v-if="isAction">
					<view class="goods-info-cont-l">第{{produce.few_nums}}轮进行中</view>
					<view class="goods-info-cont-r">已抢{{produce.rounds_nums}}份</view>
				</view>
				<view class="goods-info-cont-time" v-else>
					<view class="goods-info-cont-l">开抢倒计时</view>
					<view class="goods-info-cont-r">
						<u-count-down @end="downEnd" :timestamp="produce.time" show-days separator-size="20" separator-color="#FF563E" font-size="20" color="#FF563E"></u-count-down>
					</view>
				</view>
			</view>
			<view class="goods-info-box">
				<view class="goods-info-box-l">
					<view class="goods-info-income">
						<text>预估收益￥{{produce.goods_moeny}}</text>
					</view>
					<view class="goods-info-price">
						<text class="param">￥</text>
						<text class="price">{{produce.price}}</text>
						<text class="not">￥{{produce.market_price}}</text>
					</view>
				</view>
				<view class="goods-info-box-r">
					<view class="goods-info-btn" v-if="isAction">
						<text>去抢购</text>
					</view>
					<block v-else>
						<view class="goods-info-remind" v-if="produce.is_coll == 0" @click.stop="follow">
							<view class="goods-info-remind-title">关注提醒</view>
							<view class="goods-info-remind-text">{{produce.member_coll}}人已关注</view>
						</view>
						<view class="goods-info-remind" @click.stop="notFollow" :class="{ active: produce.is_coll == 1 }" v-if="produce.is_coll == 1">
							<view class="goods-info-remind-title">取消提醒</view>
							<view class="goods-info-remind-text">{{produce.member_coll}}人已设置</view>
						</view>
					</block>
					
				</view>
			</view>
		</view>
		
		<view class="goods-mask" v-if="produce.sold_out_status == 0">
			<image src="@/static/image/shouqing.png"></image>
		</view>
	</view>
</template>

<script>
	import { attentionGoods } from '@/network/Goods-api'
	export default {
		name: 'GoodsCard',
		props: {
			detail: {
				type: [Object, Array],
				default() {
					return {}
				}
			}
		},
		watch: {
			detail: {
				handler: function(e) {
					
					this.produce = e
				}
			},
		},
		data() {
			return {
				produce: this.detail
			}
		},
		computed: {
			isAction() {
				return this.produce.time_status == 1
			}
		},
		methods: {
			downEnd() {
				this.produce.time_status = 1
			},
			jumpDatail() {
				uni.navigateTo({
					url: '/pages/Goods/details?id=' + this.produce.goods_id
				})
			},
			// 关注提醒
			follow() {
				const m_id = uni.getStorageSync('m_id')
				
				if(m_id === '' || m_id === undefined) {
					uni.showModal({
						title: '提示',
						content: '需要登录之后才能进行该操作',
						success(res) {
							if(res.confirm) {
								return uni.navigateTo({
									url: '/pages/My/login'
								})
							} else {
								return;
							}
						}
					})
				}
				
				let that = this
				
				
				wx.requestSubscribeMessage({
					tmplIds: ['8zAwSsr4C0iiyCB-PdamDm1DVn2Xfg1FfWKcaZGLjes'],
					success: function(res) {
						if(res['8zAwSsr4C0iiyCB-PdamDm1DVn2Xfg1FfWKcaZGLjes'] == 'reject') {
							return
						}
						that.network(m_id, that.produce.goods_id)
					},
					fail: function(err) {
						console.log(err)
						return uni.showToast({
							title: '订阅消息失败',
							icon: 'none'
						})
					}
				})
			},
			network(m_id, id) {
				let coll = 0
				this.produce.is_coll == 0 ? coll = 0 : coll = 1
				
				attentionGoods({
					m_id,
					goods_id: id,
					is_coll: coll
				}).then(res => {
					
					this.$emit('isColl');
					
				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			notFollow() {
				const m_id = uni.getStorageSync('m_id')
				this.network(m_id, this.produce.goods_id)
			}
		}
	}
</script>

<style lang="scss">
	.goods-box {
		width: 690rpx;
		height: 262rpx;
		@include box(27rpx 30rpx);
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin-bottom: 19rpx;
		@include flex-al();
		position: relative;
		.goods-box-img {
			width: 200rpx;
			height: 200rpx;
			border-radius: 10rpx;
		}
		.goods-info {
			flex: 1;
			margin-left: 10rpx;
			&-title {
				font-size: 28rpx;
				line-height: 40rpx;
				height: 80rpx;
				color: #333333;
				font-weight: 600;
				@include multiline()
			}
			&-cont {
				height: 36rpx;
				display: flex;
				margin-top: 5rpx;
				&-ing, &-time {
					@include flex-al()
					height: 100%;
					box-sizing: border-box;
					border: 2rpx solid #FD6749;
					border-radius: 10rpx;
					font-size: 20rpx;
					font-weight: 400;
				}
				&-l {
					height: 100%;
					@include box(2rpx 12rpx 0 12rpx);
					background: linear-gradient(90deg, #FF553D 0%, #FD6849 100%);
					border-radius: 0 10rpx 10rpx 0 ;
					color: #FFFFFF;
				}
				&-r {
					height: 100%;
					@include box(2rpx 12rpx 0 12rpx);
					color: #FF563E;
				}
			}
			&-box {
				@include flex-al();
				margin-top: 8rpx;
				&-l {
					width: 250rpx;
				}
				&-r {
					width: 168rpx;
					margin-left: 5rpx;
					flex-shrink: 0;
				}
				.goods-info-btn {
					width: 148rpx;
					height: 62rpx;
					background: linear-gradient(90deg, #FE6E4C 0%, #F23129 100%);
					border-radius: 10rpx;
					@include flex-center();
					font-size: 28rpx;
					color: #FFFFFF;
					font-weight: 600;
				}
				.goods-info-remind {
					width: 168rpx;
					height: 72rpx;
					background: linear-gradient(90deg, #33D267 0%, #25C230 100%);
					border-radius: 10rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					color: #FFFFFF;
					&-title {
						font-size: 28rpx;
						
						font-weight: 600;
					}
					&-text {
						font-size: 20rpx;
						font-weight: 400;
					}
				}
				.goods-info-remind.active {
					background: transparent;
					box-sizing: border-box;
					border: 1px solid #25C230;
					color: #25C230;
				}
				.goods-info-income {
					font-size: 20rpx;
					color: #E38A16;
					font-weight: 400;
				}
				.goods-info-price {
					width: 100%;
					font-size: 24rpx;
					color: #999999;
					font-weight: 400;
					display: flex;
					align-items: flex-end;
					
				}
				.param {
					font-weight: 600;
					color: #F2332A;
				}
				.price {
					font-size: 46rpx;
					color: #F2332A;
					font-family: Bahnschrift;
					margin-bottom: -6rpx;
				}
				.not {
					text-decoration: line-through;
					@include ellipsis();
				}
			}
		}
		.goods-mask {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			z-index: 2;
			background-color: rgba($color: #ffffff, $alpha: .6);
			image {
				position: absolute;
				width: 116rpx;
				height: 116rpx;
				top: 30rpx;
				right: 30rpx;
			}
		}
	}
</style>
