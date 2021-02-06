<template>
	<view class="container">
		<u-tabs-swiper ref="uTabs" :bold="false" :bar-width="48" :bar-height="5" :current="current" active-color="#FF3733"
		 inactive-color="#333" name="title" :list="list" :is-scroll="false" @change="tabsChange"></u-tabs-swiper>
		<view class="page-box">
			<scroll-view class="swiper-scroll" enable-flex scroll-y @scrolltolower="onreachBottom">
				
				<block v-if="current === 0">
					<block v-if="startList.length > 0">
						<goods-card v-for="(item, index) in startList" :key="item.goods_id" :detail="item"></goods-card>
					</block>
					<block v-else>
						<z-empty text="暂无已开抢关注~"></z-empty>
					</block>
				</block>
				<block v-if="current === 1">
					<block v-if="notList.length > 0">
						<goods-card @isColl="collChange" v-for="(item, index) in notList" :key="item.goods_id" :detail="item"></goods-card>
					</block>
					<block v-else>
						<z-empty text="暂无未开抢关注~"></z-empty>
					</block>
				</block>
			</scroll-view>
		</view>

	</view>
</template>

<script>
	import GoodsCard from '@/component/GoodsCard.vue'
	import ZEmpty from '@/component/Z-empty.vue'
	
	import { myAttention } from '@/network/My-api'
	export default {
		components: {
			GoodsCard,
			ZEmpty
		},
		data() {
			return {
				list: [{
						title: '已开抢'
					},
					{
						title: '未开抢'
					}
				],
				current: 0,
				swiperCurrent: 0,
				params: {
					m_id: '',
					type: 1
				},
				startList: [],
				notList: [],
				timer: null
			};
		},
		onLoad(option) {
			uni.showLoading({
				title: '正在加载'
			})
			this.params.m_id = option.m_id
			
			this.switchMyAttention()
		},
		methods: {
			// tabs通知swiper切换
			tabsChange(index) {
				
				
				if (this.timer) {
					clearTimeout(this.timer)
				}
				this.current = index;
				this.params.type = index - 0 + 1
				this.timer = setTimeout(() => {
					this.switchMyAttention(index)
				}, 500)
			},
			async switchMyAttention() {
				try{
					let res = await myAttention(this.params)
					
					if(this.current === 0) {
						this.startList = res.list
					} else {
						this.notList = res.list
					}
					
					uni.hideLoading()
				}catch(e){
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			collChange() {
				myAttention(this.params).then(res => {
					if(this.current === 0) {
						this.startList = res.list
					} else {
						this.notList = res.list
					}
					
					uni.showToast({
						title: '操作成功'
					})
					
				}).catch(err => {
					uni.showToast({
						title: err,
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

	.page-box {
		width: 100%;
		height: calc(100vh - 80rpx);
		position: relative;
	}

	.swiper-scroll {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		@include box(20rpx 0);
	}
</style>
