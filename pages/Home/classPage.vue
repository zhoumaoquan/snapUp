<template>
	<view class="app-search-result">
		<u-sticky offset-top="0">
			<view class="result-nav">
				<view class="result-nav-item" @click="changeNav(0)" :class="{ active: currentNav === 0 }">
					<view class="result-nav-text">
						<text>综合推荐</text>
						<view class="result-nav-bar" :class="{ active: currentNav === 0 }">
							<image src="@/static/icon/bar.png"></image>
						</view>
					</view>
					<view class="spin" :class="{ active: currentNav === 0 }">
						<u-icon name="arrow-up" top="-2" size="22"></u-icon>
					</view>

				</view>
				<view class="result-nav-item" @click="changeNav(1)" :class="{ active: currentNav === 1 }">
					<view class="result-nav-text">
						<text>价格</text>
						<view class="result-nav-bar" :class="{ active: currentNav === 1 }">
							<image src="@/static/icon/bar.png"></image>
						</view>
					</view>
					<view class="result-nav-icon" v-if="currentNav !== 1">
						<u-icon name="arrow-up" size="18"></u-icon>
						<u-icon name="arrow-down" size="18"></u-icon>
					</view>
					<view class="result-nav-icon" v-if="currentNav === 1 && priceSort">
						<u-icon name="arrow-up" color="#000" size="18"></u-icon>
						<u-icon name="arrow-down" color="#999" size="18"></u-icon>
					</view>
					<view class="result-nav-icon" v-if="currentNav === 1 && !priceSort">
						<u-icon name="arrow-up" color="#999" size="18"></u-icon>
						<u-icon name="arrow-down" color="#000" size="18"></u-icon>
					</view>
				</view>
				<view class="result-nav-item" @click="changeNav(2)" :class="{ active: currentNav === 2 }">
					<view class="result-nav-text">
						<text>销量</text>
						<view class="result-nav-bar" :class="{ active: currentNav === 2 }">
							<image src="@/static/icon/bar.png"></image>
						</view>
					</view>
				</view>
			</view>
		</u-sticky>

		<scroll-view :scroll-top="scrollTop" :scroll-y="true" class="result-list" :enable-flex="true" @scrolltolower="onreachBottom">
			<block v-if="goodsList.length === 0">
				<z-empty :src="require('@/static/image/history.png')" text="暂无分类商品~"></z-empty>

			</block>
			<block v-else>
				<goods-card v-for="(item, index) in goodsList" :key="item.goods_id" :detail="item"></goods-card>
				<u-loadmore @loadmore="onreachBottom" :status="status" margin-top="50" margin-bottom="50" :load-text="loadText" />
			</block>


			<view class="search-loading" v-show="loading">
				<view class="search-loading-box">
					<u-loading mode="circle" color="#F23129" size="80"></u-loading>
				</view>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	import GoodsCard from '@/component/GoodsCard.vue'
	import ZEmpty from '@/component/Z-empty'

	import {
		classGoods
	} from '@/network/Home-api'
	export default {
		data() {
			return {
				currentNav: 0,
				priceSort: true,
				status: 'loadmore',
				loadText: {
					loadmore: '轻轻往上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				goodsList: [], // 商品列表
				params: {
					p: 1,
					m_id: '',
					sorts: 0,
					cate_id: ''
				},
				loading: true,
				timer: null,
				flag: true,
				scrollTop: -1
			};
		},
		components: {
			GoodsCard,
			ZEmpty
		},
		onLoad(option) {
			this.params.cate_id = option.id
			this.params.m_id = uni.getStorageSync('m_id')
			this.getProduct()
		},
		onShow() {
			this.params.m_id = uni.getStorageSync('m_id')
		},
		methods: {
			// 商品排序
			changeNav(e) {
				if (e === this.currentNav && e !== 1) {
					return
				}
				if (e === 1 && this.currentNav === 1) {
					this.priceSort = !this.priceSort
				} else {
					this.priceSort = true
				}

				this.currentNav = e;
				this.status = 'loadmore';
				this.scrollTop = this.scrollTop == 0 ? -1 : 0;
				this.flag = true;
				switch (e) {
					case 0:
						this.params.sorts = 0

						break;
					case 1:
						if (this.priceSort) {
							this.params.sorts = 2
						} else {
							this.params.sorts = 3
						}
						break;
					case 2:
						this.params.sorts = 1
						break;
				}

				this.getProduct();
			},
			// 获取商品数据
			getProduct() {
				this.loading = true
				this.isSearch = true

				if (this.timer) {
					clearTimeout(this.timer)
				}

				this.timer = setTimeout(() => {
					classGoods(this.params).then(res => {
						
						uni.setNavigationBarTitle({
							title: res.cate_name
						})
						
						this.goodsList = res.list
						
						this.loading = false
					})
				}, 500)

			},
			// 上拉加载
			onreachBottom() {
				if (!this.flag) {
					return
				}
				this.status = 'loading'
				this.params.p += 1

				classGoods(this.params).then(res => {
					if (res.list.length === 0) {
						this.flag = false
						this.status = 'nomore'
						this.params.p -= 1
					} else {
						this.goodsList = [...this.goodsList, ...res.list]
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.result-nav {
		width: 100%;
		height: 100rpx;
		border-top: 1rpx solid #F2F2F2;
		@include flex-al();
		@include box(0 30rpx);

		&-item {
			flex: 1;
			height: 100%;

			@include flex-center();

			.result-nav-text {
				position: relative;
				height: 100%;
				@include flex-al();
				font-size: 30rpx;
				color: #333333;
				transition: font 0.3s;

				text {
					margin-right: 10rpx;
				}
			}

			.result-nav-bar {
				position: absolute;
				@include position-ju();
				bottom: 2rpx;
				opacity: 0;
				transition: opacity .2s;

				image {
					width: 33rpx;
					height: 11rpx;
				}
			}

			.result-nav-bar.active {
				opacity: 1;
			}

			.result-nav-icon {
				width: 20rpx;
				display: flex;
				flex-direction: column;
			}
		}

		&-item.active .result-nav-text {
			font-size: 34rpx;
			font-weight: 600;
		}

		.spin {

			transform: rotate(0deg);
			transition: transform .5s;
		}

		.spin.active {
			transform: rotate(180deg);
		}
	}

	.result-list {
		background-color: #F2F2F2;
		width: 100%;
		height: calc(100vh - 100rpx);
		@include box(30rpx 0 10rpx 0);
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
	}

	.search-loading {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 100rpx;
		left: 0;
		z-index: 999;
		background-color: #F2F2F2;
		display: flex;
		justify-content: center;
	}

	.search-loading-box {
		width: 100%;
		height: 450px;
		@include flex-center();
	}
</style>
