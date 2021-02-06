<template>
	<view class="u-wrap">
		<view class="app-nav-sticky" :class="{active: isSticky}">
			<view class="app-nav-input" @click="jumpSearch">
				<u-icon name="search" label="搜索您想要的商品" size="32rpx" margin-left="10rpx" color="#999" label-color="#999" label-size="28rpx"></u-icon>
			</view>
		</view>
		<view class="u-menu-tab">
			<scroll-view :scroll-x="true" :enable-flex="true" class="u-menu-tab-scroll">
				<view class="u-menu-tab-item" :class="{ active: index === mainCate }" v-for="(item, index) in tabbar" :key="item.goods_cate_id"
				 @click="changeCate(index)">
					<image :src="item.icon"></image>
					<view class="u-menu-tab-item-text">{{item.name}}</view>
				</view>
			</scroll-view>
		</view>
		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view">
				<block v-if="tabbar[mainCate]._child.length > 0">
					<view class="u-tab-item" :class="[current == -1 ? 'u-tab-item-active' : '']"  @click="changeSide(tabbar[mainCate].goods_cate_id, -1)">
						<text class="u-line-1">全部</text>
					</view>
					<view v-for="(side,index) in tabbar[mainCate]._child" :key="side.goods_cate_id" class="u-tab-item" :class="[current == index ? 'u-tab-item-active' : '']"
					 @click="changeSide(side.goods_cate_id, index)">
						<text class="u-line-1">{{side.name}}</text>
					</view>
				</block>
				<block v-else>
					<view class="u-tab-item u-tab-item-active">
						<text class="u-line-1">全部</text>
					</view>
				</block>

			</scroll-view>
			<view class="u-page-view">
				<view class="u-page-nav-banner" :class="{ active: isBanner }" v-if="tabbar[mainCate].advert !== ''">
					<u-image :src="tabbar[mainCate].advert.abs_url" width="100%" height="100%" duration="200">
						<u-loading slot="loading"></u-loading>
					</u-image>
				</view>
				<view class="u-page-options">
					<view class="option-item" @click="optionChange(0)" :class="{ active: currentOption === 0 }">
						<text class="option-item-text">综合</text>
					</view>
					<view class="option-item" @click="optionChange(1)" :class="{ active: currentOption === 1 }">
						<text class="option-item-text">销量</text>
					</view>
					<view class="option-item" @click="optionChange(2)" :class="{ active: currentOption === 2 }">
						<text class="option-item-text">价格</text>
						<view class="option-item-icon" v-if="currentOption !== 2">
							<u-icon name="arrow-up-fill" color="#333" size="12"></u-icon>
							<u-icon name="arrow-down-fill" color="#333" size="12"></u-icon>
						</view>
						<view class="option-item-icon" v-if="currentOption === 2 && priceSort">
							<u-icon name="arrow-up-fill" color="#F2332A" size="12"></u-icon>
							<u-icon name="arrow-down-fill" color="#333" size="12"></u-icon>
						</view>
						<view class="option-item-icon" v-if="currentOption === 2 && !priceSort">
							<u-icon name="arrow-up-fill" color="#333" size="12"></u-icon>
							<u-icon name="arrow-down-fill" color="#F2332A" size="12"></u-icon>
						</view>
					</view>
				</view>

				

				<scroll-view scroll-y :scroll-top="SrollTop" @scrolltolower="loadMore" class="right-box" :scroll-with-animation="true"
				 @scroll="rightScroll">
					<view class="page-loading" v-show="loading">
						<u-loading mode="circle" color="#F23129" size="60"></u-loading>
					</view>
					<block v-if="goodsList.length === 0">
						<z-empty text="暂没有该分类商品~"></z-empty>
					</block>
					<block v-else>
						<view class="page-view">
							<goods-card-mini @isColl="collChange" v-for="(itez, indez) in goodsList" :key="itez.goods_id" :detail="itez"></goods-card-mini>
							<u-loadmore v-if="goodsList.length > 2" margin-bottom="50" fontSize="24" bg-color="#fff" margin-top="50"
							 :status="status" :load-text="loadText" />
						</view>
						<view class="filling"></view>
					</block>
				</scroll-view>
			</view>

		</view>
	</view>
</template>

<script>
	import GoodsCardMini from '@/component/GoodsCardMini.vue'
	import ZEmpty from '@/component/Z-empty.vue'
	import {
		goodsClassList,
		goodsList
	} from '@/network/Goods-api'
	export default {
		data() {
			return {
				mainCate: 0, // 当前选择的大分类
				currentOption: 0, // 当前排序规则
				current: -1, // 当前选择分类,默认第一个
				priceSort: true, // 当前价格排序规则 true升序 false降序
				isSticky: false, // 搜索栏是否吸顶
				isBanner: false, // banner是否隐藏
				tabbar: [], // 侧边栏分类
				goodsList: [], // 商品列表
				params: { // 商品请求数据
					sorts: 0,
					id: '',
					m_id: uni.getStorageSync('m_id'),
					p: 1
				},
				SrollTop: -1,
				loading: true,
				timer: null,
				flag: true,
				status: 'loadmore',
				loadText: {
					loadmore: '用力往下拉',
					loading: '正在加载，请休息下...',
					nomore: '已经到底啦~'
				},
			}
		},
		components: {
			GoodsCardMini,
			ZEmpty
		},
		onLoad(option) {
			this.getGoodsClassList()
		},
		watch: {
			'params.sorts': {
				handler() {
					this.loading = true
					this.delay()
				}
			}
		},
		methods: {
			// 跳转搜索页
			jumpSearch() {
				uni.navigateTo({
					url: '/pages/Home/search'
				})
			},
			// 获取分类数据
			async getGoodsClassList(id) {
				try {
					let tabbar = await goodsClassList(id)
					this.tabbar = tabbar.list
					this.params.id = tabbar.list[this.mainCate].goods_cate_id
					this.getGoodsList()
				} catch (e) {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			// 大分类切换
			changeCate(index) {
				if (index === this.mainCate) {
					return
				}
				this.current = -1
				this.mainCate = index
				this.params.id = this.tabbar[index].goods_cate_id
				this.loading = true
				this.delay();

			},
			// 获取商品数据
			getGoodsList() {
				goodsList(this.params).then(res => {
					this.goodsList = res.list

					this.loading = false
				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			// 商品排序切换
			optionChange(e) {
				if (e == 2 && this.currentOption == 2) {
					this.priceSort = !this.priceSort
				}
				this.currentOption = e

				switch (e) {
					case 0:
						this.params.sorts = 0
						break;
					case 1:
						this.params.sorts = 1
						break;
					case 2:
						if (this.priceSort) {
							this.params.sorts = 2
						} else {
							this.params.sorts = 3
						}
						break;
					default:
						this.params.sorts = 0
				}
			},
			// 商品分类切换
			changeSide(id, index) {
				this.current = index
				this.flag = true
				this.params.id = id
				this.params.p = 1
				this.loading = true
				this.delay();
			},
			// 延迟加载
			delay() {
				if (this.timer) {
					clearTimeout(this.timer)
				}

				this.timer = setTimeout(() => {
					this.isBanner = false
					this.SrollTop = this.SrollTop == 0 ? -1 : 0
					this.getGoodsList();
				}, 500)
			},
			// 右侧滑动
			rightScroll(e) {
				let top = e.detail.scrollTop

				if (top > 130) {
					this.isBanner = true
				} else {
					this.isBanner = false
				}
			},
			// 上拉加载更多
			loadMore() {
				if (this.flag) {
					this.params.p += 1
					this.status = 'loading'

					goodsList(this.params).then(res => {
						if (res.list.length === 0) {
							this.flag = false
							this.params.p -= 1
							this.status = 'nomore'
						} else {
							this.goodsList = [...this.goodsList, ...res.list]
						}
					}).catch(e => {
						uni.showToast({
							title: e,
							icon: 'none'
						})
					})
				}
			},
			collChange() {
				goodsList(this.params).then(res => {
					this.goodsList = res.list
				
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
	.u-wrap {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.app-nav-sticky {
		width: 100%;
		height: 110rpx;
		display: flex;
		align-items: center;
	}

	.app-nav-input {
		margin: 0 auto;
		width: 690rpx;
		height: 72rpx;
		background-color: #F2F2F2;
		border-radius: 34rpx;
		@include flex-center();
	}

	.u-menu-tab {
		width: 100%;
		height: 180rpx;
		@include box(10rpx 0 25rpx 0);
		border-bottom: 1px solid #F2F2F2;

		.u-menu-tab-scroll {
			width: 100%;
			height: 100%;
			display: flex;
		}

		&-item {
			width: 135rpx;
			height: 100%;
			margin: 0 20rpx;
			display: flex;
			flex-shrink: 0;
			flex-direction: column;
			align-items: center;

			image {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				margin-bottom: 20rpx;
			}

			&-text {
				font-size: 26rpx;
				color: #333;
				font-weight: 400;
				width: 100%;
				height: 38rpx;
				line-height: 38rpx;
				text-align: center;
				background-color: #FFFFFF;
				border-radius: 17rpx;
			}
		}

		&-item.active .u-menu-tab-item-text {
			color: #FFFFFF;
			background-color: #F2332A;
		}
	}
	.u-line-1 {
		font-size: 26rpx;
	}
	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
		background-color: #F8F8F8;
	}

	.u-search-inner {
		background-color: rgb(234, 234, 234);
		border-radius: 100rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 16rpx;
	}

	.u-search-text {
		font-size: 26rpx;
		color: $u-tips-color;
		margin-left: 10rpx;
	}

	.u-tab-view {
		width: 174rpx;
		height: 100%;
	}

	.u-tab-item {
		height: 100rpx;
		background: #f8f8f8;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		color: #333;
		font-weight: 400;
		line-height: 1;
	}

	.u-tab-item-active {
		position: relative;
		color: #F2332A;
		font-size: 24rpx;
		font-weight: 600;
		background: #fff;
	}

	.u-tab-item-active::before {
		content: "";
		position: absolute;
		width: 10rpx;
		background: url(../../static/icon/icon-bar.png) no-repeat;
		background-size: contain;
		height: 40rpx;
		left: 0rpx;
		top: 39rpx;
	}

	.u-tab-view {
		height: 100%;
	}

	.u-page-nav-banner {
		width: 530rpx;
		height: 180rpx;
		opacity: 1;
		transition: height .3s, opacity .2s;
	}

	.u-page-nav-banner.active {
		height: 0 !important;
		opacity: 0;
	}

	.u-page-options {
		width: 100%;
		height: 76rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		flex-shrink: 0;
		border-bottom: 1rpx solid #F2F2F2;

		.option-item {
			padding: 0 20rpx;
			margin: 0 15rpx;
			display: flex;
			align-items: center;

			&-text {
				font-size: 26rpx;
				color: #333333;
				font-weight: 400;
				transition: all 0.3s;
			}

			&-icon {
				width: 20rpx;
				display: flex;
				flex-direction: column;
				margin-left: 10rpx;
			}
		}

		.option-item.active .option-item-text {
			font-size: 28rpx;
			color: #F2332A;
			font-weight: 600;
		}
	}

	.right-box {
		background-color: #FFFFFF;
		height: 100%;
		flex: 1;
		position: relative;
	}

	.u-page-view {
		flex: 1;
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 20rpx 0 20rpx 20rpx;
		background-color: #FFFFFF;
		position: relative;
	}

	.page-loading {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
		@include flex-center();
		z-index: 9999;

		background-color: #FFFFFF;
	}

	.page-view {
		// min-height: 100vh;
		margin-bottom: 50rpx;

	}

	.filling {
		height: 200rpx;
		width: 100%;
	}
</style>
