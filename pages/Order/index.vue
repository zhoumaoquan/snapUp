<template>
	<view class="container">
		<u-tabs-swiper ref="uTabs" :bold="false" :bar-width="48" :bar-height="5" :current="current" active-color="#FF3733"
		 inactive-color="#333" name="title" :list="list" :is-scroll="false" @change="tabsChange"></u-tabs-swiper>
		<view class="page-box">
			<scroll-view class="swiper-scroll" :refresher-threshold="100" :refresher-enabled="true" :refresher-triggered="triggered"
			 refresher-background="#F5F5F5" scroll-y @scrolltolower="onreachBottom" @refresherpulling="onPulling"
			 @refresherrefresh="onRefresh" @refresherrestore="onRestore">

				<!-- 未登录 -->
				<block v-if="isLogin">
					<view class="not-login">
						<image src="@/static/image/not-login.png"></image>
						<view class="not-login-text">登陆后才可查看我的订单</view>
						<view class="not-login-btn" @click="jumpLogin">
							<text>去登陆</text>
						</view>
					</view>
				</block>
				<!-- 内容为空 -->
				<block v-else-if="olderList[current].length === 0">
					<z-empty></z-empty>
				</block>
				<block v-else>
					<order-item @receipt="confirm" v-for="(item, index) in olderList[current]" :key="item.order_id" :state="item"></order-item>

					<u-loadmore @loadmore="loadClick" v-if="olderList[current].length > 3" margin-bottom="100" bg-color="#F2F2F2"
					 margin-top="30" :status="status" :load-text="loadText" />
				</block>
				<!-- 骨架屏 -->
				<view v-show="loadSkeleton" class="app-skeleton u-skeleton">
					<view class="app-skeleton-item" v-for="i in 3" :key="i">
						<view class="app-skeleton-left u-skeleton-fillet"></view>
						<view class="app-skeleton-right">
							<view class="app-skeleton-title u-skeleton-fillet"></view>
							<view class="app-skeleton-cen u-skeleton-fillet"></view>
							<view class="app-skeleton-bot">
								<view class="app-skeleton-box">
									<view class="app-skeleton-text u-skeleton-fillet"></view>
									<view class="app-skeleton-price u-skeleton-fillet"></view>
								</view>
								<view class="app-skeleton-btn u-skeleton-fillet"></view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>

		<u-skeleton :loading="loadSkeleton" :animation="true" bgColor="#F2F2F2"></u-skeleton>

		<z-toast ref="uToast" />
		<u-top-tips ref="uTips"></u-top-tips>
	</view>
</template>

<script>
	import OrderItem from '@/component/OrderItem.vue'
	import ZEmpty from '@/component/Z-empty.vue'
	import ZToast from '@/component/Z-toast.vue'
	import {
		orderList,
		receipt
	} from '@/network/Goods-api'
	export default {
		components: {
			OrderItem,
			ZEmpty,
			ZToast
		},
		data() {
			return {
				list: [{ // 导航栏
						title: '全部'
					},
					{
						title: '待公布'
					},
					{
						title: '已抢到'
					},
					{
						title: '待收货'
					},
					{
						title: '已完成'
					},
					{
						title: '未抢到'
					}
				],
				olderList: [],
				params: { // 请求参数
					m_id: '',
					status: 0,
					p: 1
				},
				current: 0, // 当前选择的导航栏
				swiperCurrent: 0,
				loadSkeleton: true,
				isLogin: false, // 是否登陆
				timer: null, // 定时器
				triggered: false, // 下拉刷新
				status: 'loadmore',
				flag: true,
				loadText: {
					loadmore: '用力往下拉(点击)',
					loading: '正在加载，请休息下...',
					nomore: '我也是有底线的~'
				},
			};
		},
		onLoad(option) {
			uni.showLoading({
				title: '正在加载...',
				mask: true
			})
			this.setObsevr()
		},
		onShow() {
			this.params.m_id = uni.getStorageSync('m_id')
			this.getOrderList()
		},
		watch: {
			'params.m_id': {
				handler: function(e) {
					this.isLogin = false
					this.SwitchList(this.current)
				}
			}
		},
		methods: {
			// tabs通知swiper切换
			tabsChange(index) {
				if (this.isLogin) {
					return
				}
				if (this.timer) {
					clearTimeout(this.timer)
				}
				this.current = index;
				this.params.status = index
				this.flag = true
				this.params.p = 1
				this.loadSkeleton = true
				this.timer = setTimeout(() => {
					this.SwitchList(index)
				}, 500)
			},
			// 创建存放商品数据 响应式对象
			setObsevr() {
				let len = this.list.length
				for (let i = 0; i < len; i++) {
					this.$set(this.olderList, i, [])
				}
			},
			// 获取列表数据
			async getOrderList() {
				try {
					const m_id = this.params.m_id

					if (!m_id || m_id === '') {
						this.isLogin = true
						this.loadSkeleton = false
						uni.hideLoading()
						return;
					}
					let res = await orderList({
						m_id,
						status: 0,
						p: 1
					})

					this.$set(this.olderList, 0, res.list)

					this.loadSkeleton = false
					uni.hideLoading()
				} catch (e) {
					this.loadSkeleton = false
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},

			// 列表数据切换
			async SwitchList(index, ref) {
				try {
					let res = await orderList(this.params)
					this.$set(this.olderList, index, res.list)
					this.loadSkeleton = false

					if (ref) {
						this.triggered = false;
						this._freshing = false;
					}
				} catch (e) {
					this.loadSkeleton = false
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			// 跳转登陆
			jumpLogin() {
				uni.navigateTo({
					url: '/pages/My/login'
				})
			},
			// 下拉刷新
			onreachBottom() {
				if (!this.flag) {
					return
				}
				this.status = 'loading'
				this.params.p += 1

				this.loadMore()
			},
			loadMore() {
				orderList(this.params).then(res => {
					if (res.list.length === 0) {
						this.flag = false
						this.params.p -= 1
						this.status = 'nomore'

						this.$refs.uToast.show({
							title: '没有更多订单了哦~'
						})
					} else {
						let current = this.current
						this.$set(this.olderList, current, [...this.olderList[current], ...res.list])
					}
				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			onPulling() {

				this.triggered = true
			},
			onRefresh() {
				if (this.isLogin) {
					this.triggered = false;
					this._freshing = false;
					return 
				}

				if (this._freshing) return;
				this._freshing = true;

				this.SwitchList(this.current, true)
			},
			onRestore() {
				this.triggered = 'restore';
				if(!this.isLogin) {
					this.$refs.uTips.show({
						title: '订单列表已刷新',
						type: 'success'
					})
				} else {
					this.$refs.uTips.show({
						title: '您还未登录，请去登陆',
						type: 'warning'
					})
				}
				
			},
			// 确认收货
			async confirm(e) {
				try {

					let res = await receipt({
						m_id: this.params.m_id,
						e
					})

					this.SwitchList(this.current)

					this.$refs.uTips.show({
						title: '操作成功',
						type: 'success'
					})
				} catch (e) {
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
	page {
		background-color: #F2F2F2;
	}

	.page-box {
		width: 100%;
		height: calc(100vh - 80rpx);

		position: relative;
	}

	.app-swiper,
	.swiper-scroll {
		width: 100%;
		height: 100%;
	}

	.app-skeleton {
		width: 100%;
		@include box(0 30rpx);
		height: 98%;
		position: absolute;
		top: 20rpx;
		left: 0;
		right: 0;

		&-item {
			width: 690rpx;
			height: 262rpx;

			@include flex-al();
			@include box(30rpx);
			margin: 0 auto;
			margin-bottom: 20rpx;

			.app-skeleton-left {
				width: 200rpx;
				height: 200rpx;
				margin-right: 10rpx;
			}

			.app-skeleton-title {
				width: 410rpx;
				height: 66rpx;
				margin-bottom: 10rpx;
			}

			.app-skeleton-cen {
				width: 255rpx;
				height: 36rpx;
				margin-bottom: 14rpx;
			}

			.app-skeleton-bot {
				@include flex-al-ju(space-between);

			}

			.app-skeleton-box {
				width: 200rpx;
				height: 80rpx;

				.app-skeleton-text {
					width: 150rpx;
					height: 20rpx;
					margin-bottom: 20rpx;
				}

				.app-skeleton-price {
					width: 180rpx;
					height: 40rpx;
				}
			}

			.app-skeleton-btn {
				margin-top: 10rpx;
				width: 150rpx;
				height: 62rpx;
			}
		}
	}

	.not-login {
		width: 100%;
		height: 600rpx;
		@include flex-center();
		flex-direction: column;

		image {
			width: 300rpx;
			height: 300rpx;
		}

		&-text {
			font-size: 26rpx;
			color: #606266;
		}

		&-btn {
			margin-top: 20rpx;
			width: 390rpx;
			height: 88rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 32rpx;
			font-weight: bold;
			color: #FFFFFF;
			border-radius: 44rpx;
			background: linear-gradient(90deg, #ED343D, #FF6638);
		}
	}
</style>
