<template>
	<view class="container">
		<u-sticky>
			<view class="app-search">
				<u-search placeholder="搜索您想要的商品" :animation="true" height="68" v-model="params.keywords" :action-text="actionText" @search="searchProduct" @custom="searchProduct" :action-style="{ fontSise: '32px', color: '#333', fontWeight: 'bold' }" @clear="params.keywords = ''"></u-search>
			</view>
		</u-sticky>

		<view class="app-search-box" v-if="!isSearch">
			<view class="app-search-title">
				<text>热门搜索</text>
			</view>
			<view class="app-popular">
				<view class="app-popular-item" v-for="(item, index) in popularList" :key="index" @click="popularChooise(item.keywords)">
					<text>{{item.keywords}}</text>
				</view>
			</view>
			<view class="app-search-title">
				<text>搜索历史</text>
				<image @click="clearHistory" src="@/static/icon/shanchu.png" v-if="historyList.length > 0"></image>
			</view>
			<view class="app-history">
				<view class="app-history-item bottom-line" v-for="(item, index) in historyList" :key="index" @click="popularChooise(item)">
					<u-icon name="clock" size="36" color="#ED373F"></u-icon>
					<text>{{item}}</text>
				</view>
			</view>
		</view>

		<view class="app-search-result" v-else>
			<u-sticky offset-top="118">
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
					<z-empty :src="require('@/static/image/not-search.png')" text="暂无搜索结果~"></z-empty>
					
				</block>
				<block v-else>
					<goods-card v-for="(item, index) in goodsList" :key="item.goods_id" :detail="item"></goods-card>
					<u-loadmore :status="status" v-if="goodsList.length > 3" margin-top="50" margin-bottom="50" :load-text="loadText"/>
				</block>
				
			
				<view class="search-loading" v-show="loading">
					<view class="search-loading-box">
						<u-loading mode="circle" color="#F23129" size="80"></u-loading>
					</view>
				</view>
			</scroll-view>

		</view>
	</view>
</template>

<script>
	import GoodsCard from '@/component/GoodsCard.vue'
	import ZEmpty from '@/component/Z-empty'
	
	import { SeachPopular, searchGoods } from '@/network/Home-api'
	export default {
		data() {
			return {
				actionText: '搜索',
				currentNav: 0,
				priceSort: true,
				status: 'loadmore',
				loadText: {
					loadmore: '轻轻往上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				popularList: [], // 热门搜索关键词
				historyList: uni.getStorageSync('history') || [],
				goodsList: [] ,// 商品列表
				params: {
					keywords: '',
					m_id: '',
					p: 1,
					sorts: 0
				},
				isSearch: false,
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
		watch: {
			'params.keywords': {
				handler: function(e) {
					if(e.length === 0) {
						this.isSearch = false
						this.params.sorts = 0
						this.params.p = 1
						this.flag = true
					}
				}
			}
		},
		onLoad(option) {
			this.getPopular()
		},
		onShow() {
			this.params.m_Id = uni.getStorageSync('m_id')
		},
		methods: {
			// 商品排序
			changeNav(e) {
				if(e === this.currentNav && e !== 1) { return }
				if (e === 1 && this.currentNav === 1) {
					this.priceSort = !this.priceSort
				} else {
					this.priceSort = true
				}
				
				this.currentNav = e;
				this.status = 'loadmore';
				this.scrollTop = this.scrollTop == 0 ? -1 : 0;
				this.flag = true;
				switch(e) {
					case 0: 
						this.params.sorts = 0
						
						break;
					case 1: 
						if(this.priceSort) {
							this.params.sorts = 2
						} else {
							this.params.sorts = 3
						}
						break;
					case 2:
						this.params.sorts = 1
						break;
				}
				
				this.searchProduct();
			},
			// 获取热门搜索
			async getPopular() {
				try{
					let res = await SeachPopular()
					
					this.popularList = res.list
				}catch(e){
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			// 获取商品数据
			searchProduct() {
				this.loading = true
				this.isSearch = true
				
				if(this.timer) { clearTimeout(this.timer) }
				
				this.timer = setTimeout(() => {
					searchGoods(this.params).then(res => {
						this.goodsList = res.list
						
						this.loading = false
						
						this.saveHistory()
					})
				}, 500)
				
			},
			// 选择关键词
			popularChooise(index) {
				this.params.keywords = index
				
				this.searchProduct();
			},
			// 保存历史搜索记录
			saveHistory() {
				let history = this.historyList
				let keyword = this.params.keywords
				let res = Array.from(new Set([...history, keyword]))
				uni.setStorageSync('history', res)
				this.historyList = uni.getStorageSync('history')
			},
			// 清除历史搜索记录
			clearHistory() {
				uni.showModal({
					title: '提示',
					content: '确定要清除搜索历史吗？',
					success:(res)=> {
						if(res.confirm) {
							uni.removeStorageSync('history')
							
							this.historyList = []
						}
					}
				})
			},
			// 上拉加载
			onreachBottom() {
				if (!this.flag) {
					return 
				}
				this.status = 'loading'
				this.params.p += 1
				
				searchGoods(this.params).then(res => {
					if(res.list.length === 0) {
						this.flag = false
						this.status = 'nomore'
						this.params.p -= 1
					}else {
						this.goodsList = [...this.goodsList, ...res.list]
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.app-search {
		width: 100%;
		height: 118rpx;
		@include box(25rpx 30rpx);
	}

	.app-search-title {
		@include box(0 30rpx);
		height: 80rpx;
		width: 100%;
		@include flex-al-ju(space-between);
		font-size: 30rpx;
		color: #323232;
		font-weight: 400;

		image {
			width: 28rpx;
			height: 31rpx;
		}
	}

	.app-popular {
		margin-top: 10rpx;
		display: flex;
		flex-wrap: wrap;
		@include box(0 30rpx);

		&-item {
			padding: 13rpx 30rpx;
			background: #F5F5F5;
			border: 1px solid #F5F5F5;
			border-radius: 29rpx;
			font-size: 26rpx;
			color: #333333;
			font-weight: 400;
			margin-bottom: 24rpx;
			margin-right: 30rpx;
		}
	}

	.app-history {
		margin-top: 20rpx;
		@include box(0 30rpx);
		&-item {
			width: 100%;
			height: 86rpx;
			@include flex-al();
			font-size: 26rpx;
			color: #656565;
			font-weight: 400;

			text {
				margin-left: 10rpx;
			}
		}
	}

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
		height: calc(100vh - 220rpx);
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
		top: 220rpx;
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
