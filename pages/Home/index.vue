<template>
	<view class="content">
		<view class="app-nav">
			<u-sticky bg-color="transparent" z-index="9999" @fixed="isSticky = true" @unfixed="isSticky = false">
				<view class="app-nav-sticky" :class="{active: isSticky}">
					<view class="app-nav-input" @click="jumpSearch">
						<u-icon name="search" label="搜索您想要的商品" size="32rpx" margin-left="10rpx" color="#999" label-color="#999"
						 label-size="28rpx"></u-icon>
					</view>
				</view>
			</u-sticky>
		</view>
		<view class="app-swiper">
			<u-swiper @click="swiperNav" :list="list" name="abs_url" height="268rpx" border-radius="20"></u-swiper>
		</view>

		<view class="app-menu">
			<scroll-view :scroll-x="true" @scroll="scrollChange" :enable-flex="true" class="app-menu-scroll">
				<view class="app-menu-item" v-for="(item, index) in navigation" :key="item.id" @click="jumpRules(item.target_rule, item.param)">
					<image :src="item.icon"></image>
					<text>{{item.name}}</text>
				</view>
			</scroll-view>
			<view class="app-menu-bar">
				<view class="app-menu-bar-active" :style="{ left: scorllLeft }"></view>
			</view>
			<!-- <block v-else>
				<swiper>
					<swiper-item>
						<view class="app-menu-box">
							<view class="app-menu-item" v-for="(item, index) in navigation" :key="item.id" @click="jumpRules(item.target_rule, item.param)">
								<image :src="item.icon"></image>
								<text>{{item.name}}</text>
							</view>
						</view>
					</swiper-item>

				</swiper>

				<view class="app-menu-bar">
					<view class="app-menu-bar-ver"></view>
				</view>
			</block> -->
		</view>

		<view class="app-notice">
			<u-icon name="volume-fill" top="0" color="#F64534" size="40"></u-icon>
			<swiper class="app-notice-box" vertical autoplay>
				<swiper-item v-for="(item, index) in notice" :key="item.id">
					<view class="app-notice-box-item">
						<text>【{{item.nickname}}】{{ item.add_time | timeFrom }}购买商品获得收益{{item.moeny}}元</text>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="app-box">
			<view class="app-tab">
				<view class="app-tab-item" @click="TabChange(0)">
					<view class="app-tab-item-text" :class="{ active: currentTab === 0 }">热门推荐</view>
				</view>
				<view class="app-tab-item" @click="TabChange(1)">
					<view class="app-tab-item-text" :class="{ active: currentTab === 1 }">火爆专区</view>
				</view>
				<view class="app-tab-item" @click="TabChange(2)">
					<view class="app-tab-item-text" :class="{ active: currentTab === 2 }">即将开抢</view>
				</view>

				<image class="app-tab-bg left" :class="{ active: currentTab === 0 }" mode="aspectFit" src="@/static/icon/left-tab.png"></image>
				<image class="app-tab-bg center" :class="{ active: currentTab === 1 }" mode="aspectFit" src="@/static/icon/center-tab.png"></image>
				<image class="app-tab-bg right" :class="{ active: currentTab === 2 }" mode="aspectFit" src="@/static/icon/right-tab.png"></image>
			</view>
			<view class="app-options">
				<u-tabs-swiper ref="uTabs" bg-color="#F2F2F2" gutter="55" bar-height="6" bar-width="40" active-color="#F2332A" name="title"
				 :list="tabList" :current="current" @change="tabsChange" :is-scroll="true" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="tab-swiper" :current="swiperCurrent" @change="swiperChange" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item" v-for="(item, index) in productList" :key="index">
					<scroll-view class="tab-scorll" :enable-flex="true" scroll-y @scrolltolower="onreachBottom">
						<block v-if="item.length > 0">
							<goods-card @isColl="collChange" v-for="(itez, indez) in item" :key="itez.goods_id" :detail="itez"></goods-card>
						</block>
						<block v-else>
							<z-empty text="暂无该分类商品"></z-empty>
						</block>
					</scroll-view>
				</swiper-item>
			</swiper>

			<!-- 骨架屏 -->
			<view v-show="loadSkeleton" class="app-skeleton u-skeleton">
				<view class="app-skeleton-item" v-for="index in 2" :key="index">
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
		</view>

		<u-mask :show="isShow" :mask-click-able="false">
			<view class="mask-box">
				<view class="mask-warp">
					<u-image :fade="false" @click="jumpAd(ad[0].target_rule, ad[0].param)" :src="ad[0].abs_url" width="100%" height="100%" mode="aspectFit">
						<u-loading slot="loading"></u-loading>
					</u-image>
					<view class="mask-close">
						<u-icon @click="isShow = false" name="close-circle" size="50" color="#fff"></u-icon>
					</view>
				</view>
			</view>
		</u-mask>

		<u-skeleton :loading="loadSkeleton" :animation="true" bgColor="#F2F2F2"></u-skeleton>

		<u-top-tips ref="uTips" />
	</view>
</template>

<script>
	import GoodsCard from '@/component/GoodsCard.vue'

	import ZEmpty from '@/component/Z-empty.vue'
	import {
		HomeBase,
		HomeCate,
		HomeGoods
	} from '@/network/Home-api'
	export default {
		components: {
			GoodsCard,
			ZEmpty
		},
		data() {
			return {
				isSticky: false,
				isShow: false,
				scorllLeft: '0%',
				ad: [],
				list: [], // 轮播图
				currentTab: 0, // 当前选择的大分类 
				navigation: [], // 导航
				notice: [], // 通知
				productList: [], // 商品列表
				tabList: [], // 商品分类
				params: { // 商品请求参数
					id: 0,
					is_best: 1,
					m_id: ''
				},
				pages: [],
				current: 0, // 当前商品分类
				swiperCurrent: 0, // 当前商品列表
				loadSkeleton: true, // 是否打开骨架屏
				flag: true, // 商品列表是否能上拉加载更多 
				timer: null // 延迟器
			}
		},
		onLoad(option) {

			if (option.scene) {
				const scene = decodeURIComponent(option.scene);
				let obj = this.searchObj(scene)
				
				uni.setStorageSync('parent_code', obj.code)
				
				if(obj.type == 2) {
					uni.navigateTo({
						url: '/pages/Goods/details?id=' + obj.goods_id
					})
				}
				
			}
			uni.showLoading({
				title: '数据加载中...'
			})
			this.init()

			if (option.parent_code) {
				uni.setStorageSync('parent_code', option.parent_code)
			}

		},
		onShow() {
			uni.$on('updata', () => {
				this.collChange()
			})
		},
		onPullDownRefresh() {

			this.getBaseData()
			this.getHomeGoods(true)

			uni.stopPullDownRefresh()
			this.$refs.uTips.show({
				title: '数据重新加载成功',
				type: 'success',
				duration: '1500'
			})

		},
		onShareAppMessage() {
			const code = uni.getStorageSync('code')

			return {
				title: '比邻街',
				path: '/pages/Home/index?parent_code=' + code,
				success: function(res) {
					console.log('分享成功' + res)
				},
				fail: function(res) {
					console.log(res + '失败');
				}
			}
		},
		methods: {
			// 初始化
			init() {
				this.getBaseData()
				this.getHomeCate()

			},
			searchObj(str) {
				var arr = str.split("&");
				var obj = {};
				for (var p of arr) {
					var arr2 = p.split("=");
					//解构
					var [name, value] = arr2;
					if (obj[name] == undefined) {
						obj[name] = value;
					} else {
						obj[name] = [].concat(value, obj[name])
					}
				}
				return obj
			},
			// 跳转搜索页面
			jumpSearch() {
				uni.navigateTo({
					url: '/pages/Home/search'
				})
			},
			// 获取轮播、banner数据
			async getBaseData(ref) {
				try {
					const m_id = uni.getStorageSync('m_id')
					let res = await HomeBase(m_id)
					this.list = res.adverts
					this.navigation = res.navigation
					this.notice = res.notice

					if (this.ad.length === 0 && res.position.length > 0) {
						this.ad = res.position

						this.isShow = true
					}
				} catch (e) {
					uni.showToast({
						title: '数据加载失败',
						icon: 'none'
					})
				}
			},
			swiperNav(index) {
				let id = this.list[index].target_rule
				let param = this.list[index].param

				this.jumpRules(id, param)
			},
			jumpRules(id, param) {

				switch (Number(id)) {
					case 1:
						break;
					case 2:
						uni.navigateTo({
							url: '/pages/Home/webview?url=' + encodeURIComponent(JSON.stringify(param))
						})
						break;
					case 3:
						uni.navigateTo({
							url: '/pages/Goods/details?id=' + param
						})
						break;
					case 4:
						uni.navigateTo({
							url: '/pages/Home/classPage?id=' + param
						})
						break;
					case 5:
						const m_id = uni.getStorageSync('m_id')
						if (m_id === '' || m_id === undefined) {
							return uni.showModal({
								title: '提示',
								content: '您当前处于未登陆状态，请登陆后继续',
								success(res) {
									if (res.confirm) {
										uni.navigateTo({
											url: '/pages/My/login'
										})
									}
								}
							})
						} else {
							uni.navigateTo({
								url: '/pages/My/promote?m_id=' + m_id
							})
						}
						break;
					default:
						break;
				}
			},
			jumpAd(id, param) {
				switch (Number(id)) {
					case 1:
						break;
					case 2:

						uni.navigateTo({
							url: '/pages/Home/webview?url=' + encodeURIComponent(JSON.stringify(param)),
							success: () => {
								this.isShow = false
							}
						})
						break;
					case 3:
						uni.navigateTo({
							url: '/pages/Goods/details?id=' + param,
							success: () => {
								this.isShow = false
							}
						})
						break;
					case 4:
						uni.navigateTo({
							url: '/pages/Home/classPage?id=' + param
						})
						break;
					case 5:
						const m_id = uni.getStorageSync('m_id')
						if (m_id === '' || m_id === undefined) {
							return uni.showModal({
								title: '提示',
								content: '您当前处于未登陆状态，请登陆后继续',
								success(res) {
									if (res.confirm) {
										uni.navigateTo({
											url: '/pages/My/login'
										})
									}
								}
							})
						} else {
							uni.navigateTo({
								url: '/pages/My/promote?m_id=' + m_id
							})
						}
						break;
					default:
						break;
				}
			},
			// 获取商品分类列表
			async getHomeCate(id) {
				try {
					let res = await HomeCate(id)

					let obj = {
						goods_cate_id: 0,
						name: '全部'
					}
					let tabList = [obj, ...res.list]
					let pages = []
					tabList.forEach((item, index) => {
						this.$set(this.productList, index, [])
						pages.push(1)
					})

					this.tabList = tabList

					this.pages = pages
					this.getHomeGoods()
				} catch (e) {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			// 商品首次加载
			getHomeGoods(ref) {
				this.params.m_id = uni.getStorageSync('m_id')
				HomeGoods(this.params).then(res => {

					if (res.list.length > 0) {

						this.productList[this.current] = res.list
					}

					if (ref) {
						this.current = 0
						this.swiperCurrent = 0
						this.pages.fill(1)
						this.$refs.uTabs.setFinishCurrent(0);
						this.flag = true
					}
					this.loadSkeleton = false
					uni.hideLoading()
				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			// 切换大的分类 切换商品
			TabChange(index) {

				this.params.is_best = index + 1
				this.tabList.forEach((item, index) => {
					this.$set(this.productList, index, [])
				})

				this.loadSkeleton = true
				this.current = 0
				this.swiperCurrent = 0
				this.currentTab = index
				this.pages.fill(1)
				this.$refs.uTabs.setFinishCurrent(0);
				this.cutoverGoods(0)

			},
			// 滑动切换加载商品
			cutoverGoods(index) {
				if (this.timer) {
					uni.hideLoading()
					clearTimeout(this.timer)
				}
				uni.showLoading({
					title: 'Loading...'
				})
				if (this.productList[index].length === 0) {
					this.timer = setTimeout(() => {
						HomeGoods({
							m_id: this.params.m_id,
							id: this.params.id,
							is_best: this.params.is_best,
							p: this.pages[index]
						}).then(res => {

							if (res.list.length > 0) {
								let arr = [...this.productList[index], ...res.list]
								this.$set(this.productList, index, arr)
								this.flag = true
							}

							this.loadSkeleton = false
							uni.hideLoading()
						}).catch(e => {
							this.loadSkeleton = false
							uni.showToast({
								title: e,
								icon: 'none'
							})
						})
					}, 500)
				} else {
					uni.hideLoading()
				}
			},
			// 操作 后刷新接口
			scrollChange(e) {
				let scrollLeft = e.detail.scrollLeft;
				let scrllWidth = e.detail.scrollWidth - 345;
				let left = scrollLeft / scrllWidth * 100

				this.scorllLeft = left * 0.4 + '%'
			},
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			swiperChange(e) {
				let index = e.detail.current

				this.params.id = this.tabList[index].goods_cate_id
				this.cutoverGoods(index)
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				if (this.flag) {
					this.pullUpLoad()
				} else {
					uni.showToast({
						title: '没有更多商品了~',
						icon: 'none'
					})
				}
			},
			// 商品列表上拉加载 请求数据方法
			async pullUpLoad() {

				try {
					this.pages[this.current] += 1
					let res = await HomeGoods({
						m_id: this.params.m_id,
						id: this.params.id,
						is_best: this.params.is_best,
						p: this.pages[this.current]
					})

					if (res.list.length === 0) {

						this.pages[this.current] -= 1
						this.flag = false
						uni.showToast({
							title: '没有更多商品了~',
							icon: 'none'
						})
					} else {
						let arr = [...this.productList[this.current], ...res.list]
						this.$set(this.productList, this.current, arr)
					}
				} catch (e) {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			// 商品关注或取消
			collChange(e) {
				HomeGoods({
					m_id: this.params.m_id,
					id: this.params.id,
					is_best: this.params.is_best,
					p: this.pages[this.current]
				}).then(res => {

					if (res.list.length > 0) {
						this.$set(this.productList, this.current, res.list)
						this.flag = true
					}
					uni.showToast({
						title: '操作成功'
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
	page {
		background-color: #F2F2F2;
	}

	.app-nav {
		width: 100%;
		height: 271rpx;
		background: linear-gradient(180deg, #F12D27 0%, #FF7045 100%);
		border-radius: 0 0 15% 15%;
	}

	.app-nav-sticky {
		width: 100%;
		height: 90rpx;
		background-color: transparent;
		transition: background .6s;
		display: flex;
		align-items: center;
	}

	.app-nav-sticky.active {
		background-color: #F12D27;
	}

	.app-nav-input {
		margin: 0 auto;
		width: 690rpx;
		height: 72rpx;
		background-color: #FFFFFF;
		border-radius: 34rpx;
		@include flex-center();
	}

	.app-swiper {
		width: 690rpx;
		margin: 0 auto;
		margin-top: -155rpx;
	}

	.app-menu {
		width: 100%;
		@include box(45rpx 30rpx 30rpx 30rpx);
		height: 240rpx;
		position: relative;

		&-scroll {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			flex-wrap: wrap;
		}

		&-box {
			width: 100%;
			height: 100%;
			display: flex;
			flex-wrap: wrap;
		}

		&-item {
			width: 100rpx;
			// height: 46%;
			height: 142rpx;
			margin: 0 19.5rpx;
			margin-bottom: 20rpx;
			font-size: 25rpx;
			flex-shrink: 0;
			line-height: 26rpx;
			color: #333333;
			font-weight: 400;
			display: flex;
			flex-direction: column;
			align-items: center;

			image {
				width: 100rpx;
				height: 100rpx;
				margin-bottom: 5rpx;
			}
		}

		&-bar {
			width: 100rpx;
			height: 10rpx;
			@include position-ju();
			bottom: 20rpx;
			background-color: #EAEAEA;
			border-radius: 5rpx;

			&-active {
				width: 62rpx;
				height: 10rpx;
				background-color: #FF5301;
				border-radius: 5rpx;
				position: absolute;
				top: 0;

			}

			&-ver {
				width: 100rpx;
				height: 10rpx;
				background-color: #FF5301;
				border-radius: 5rpx;
			}
		}
	}

	.app-notice {
		width: 690rpx;
		height: 68rpx;
		background-color: #FFFFFF;
		border-radius: 14rpx;
		margin: 0 auto;
		@include box(0 30rpx);
		@include flex-al();
		overflow: hidden;

		&-box {
			flex: 1;
			height: 68rpx;
			@include ellipsis();
			margin-left: 10rpx;

			&-item {
				font-size: 26rpx;
				color: #333333;
				font-weight: 400;
				line-height: 68rpx;
			}
		}
	}

	.app-box {
		width: 100%;
		margin-top: 44rpx;
		position: relative;
	}

	.app-skeleton {
		width: 100%;
		@include box(0 30rpx);
		height: 850rpx;
		position: absolute;
		top: 175rpx;
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

	.app-tab {
		width: 690rpx;
		height: 70rpx;
		display: flex;
		align-items: center;
		border-bottom: 4rpx solid #F12E28;
		box-sizing: content-box;
		position: relative;
		margin: 0 auto;
		margin-bottom: 10rpx;

		&-item {
			width: 230rpx;
			height: 70rpx;
			background-color: #E9E9E9;
			border-radius: 20rpx 20rpx 0 0;
			@include flex-center();

			&-text {
				position: relative;
				z-index: 100;
				display: flex;
				font-size: 30rpx;
				color: #333333;
				font-weight: 400;
			}

			&-text.active {
				color: #FFFFFF;
			}
		}

		&-bg {
			position: absolute;
			bottom: -2rpx;
			z-index: 99;
			opacity: 0;
			transition: opacity 0.3s;
		}

		&-bg.active {
			opacity: 1;
		}

		&-bg.left {
			width: 264rpx;
			height: 72rpx;
			left: 0;
		}

		&-bg.center {
			width: 313rpx;
			height: 72rpx;
			left: 50%;
			transform: translateX(-50%);
		}

		&-bg.right {
			width: 265rpx;
			height: 72rpx;
			right: 0;
		}
	}

	.tab-swiper {
		width: 100%;
		height: 850rpx;
	}

	.tab-scorll {
		height: 850rpx;
		width: 100%;
		padding-top: 20rpx;
		padding-bottom: 200rpx;

		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.mask-box {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.mask-warp {
		width: 592rpx;
		height: 542rpx;
		background-color: transparent;
		position: relative;
	}

	.mask-close {
		position: absolute;
		top: 40rpx;
		right: 22rpx;
	}
</style>
