<template>
	<view class="container u-skeleton">
		<view class="app-showoff u-skeleton-fillet">
			<swiper class="app-swiper" @change="swiperChange">
				<swiper-item v-for="(item, index) in goodsData.pictures" :key="item.id">
					<view class="app-swiper-box" v-if="item.mime == 'video/mp4'">
						<video class="app-swiper-video" :enable-progress-gesture="false" @play="videoAction(index)" @pause="videoPause(index)"
						 :show-center-play-btn="false" :id="'video' + index" :src="item.abs_url"></video>
						<view class="app-swiper-video-ing" v-show="!item.isShow" @click="videoPlay(index)">
							<u-image :show-loading="false" width="100%" height="100%" :duration="300" src="@/static/icon/bofang.png">

							</u-image>
						</view>
					</view>
					<view class="app-swiper-box" v-else>
						<image class="app-swiper-image" mode="aspectFit" :src="item.abs_url"></image>
					</view>
				</swiper-item>
			</swiper>
			<view class="app-swiper-dis">
				<text>{{swiperCurrent}}/{{goodsData.pictures.length}}</text>
			</view>
		</view>
		<view class="app-nav">
			<image src="@/static/image/bg-1.png"></image>
			<view class="app-nav-cont">
				<view class="app-nav-left">
					<view class="app-nav-title">
						<text>￥</text>
						<text class="active">{{goodsData.price}}</text>
						<!-- <text>00</text> -->
					</view>
					<view class="app-nav-text">￥{{goodsData.market_price}}</view>
				</view>
				<view class="app-nav-right">
					<view class="app-nav-income">预估收益</view>
					<view class="app-nav-number">
						<text>{{goodsData.goods_moeny}}元</text>
					</view>
				</view>
			</view>
		</view>

		<view class="app-info">
			<view class="app-info-title">{{goodsData.goods_name}}</view>
			<view class="app-info-share" @click="shareEvent">
				<image src="@/static/icon/share.png"></image>
				<text>分享</text>
			</view>
		</view>
		<view class="app-count">
			已抢: {{goodsData.rounds_nums}}份
		</view>
		<view class="app-tips">
			<u-icon top="0" name="info-circle" size="35" color="#ED343D"></u-icon>
			<text>{{goodsData.recommend_reason}}</text>
		</view>

		<view class="app-rule" @click="routerRule(3)">
			<u-icon name="error-circle" top="0" size="24" label-pos="left" label-size="22" label="抢购规则" color="#fff" label-color="#fff"></u-icon>
		</view>

		<view class="app-head">
			<view class="app-head-tips" v-if="isAction">
				<text class="app-head-title">第{{goodsData.few_nums}}轮抢购进行中</text>
				<view class="app-head-timer">
					<text>公布倒计时:</text>
					<u-count-down ref="uCountDown" @end="publishDown" bg-color="#F2302A" font-size="24" separator-color="#F2312A"
					 color="#ffffff" :timestamp="goodsData.gong_time"></u-count-down>
				</view>
			</view>
			<block v-if="false">
				<view class="app-head-cont" v-if="goodsData.member_face && goodsData.member_face.length > 0">
					<image class="app-head-cont-img" v-for="(item, index) in goodsData.member_face.slice(0, feeSize)" :key="item.id"
					 :src="item.abs_url"></image>
					<view class="app-head-text">
						<text>共有{{goodsData.member_count}}人已参与...</text>
						<text class="active" v-if="feeSize <= 30" @click="feeSize = goodsData.member_face.length">查看全部</text>
						<text class="active" v-else @click="feeSize = 30">收起</text>
					</view>
				</view>
			</block>
			
			<view class="app-title">
				<view class="app-title-cont">
					<text>商品详情</text>
				</view>
			</view>
			<view class="app-detail">
				<!-- 富文本解析 -->
				<u-parse :html="goodsData.goods_desc"></u-parse>
			</view>
			<view class="app-tabbar">
				<view class="app-tabbar-item mg-r" @click="shareEvent">
					<image class="share" src="@/static/icon/shart2.png"></image>
					<text>分享</text>
				</view>
				<view class="app-tabbar-item" :class="{ active: isColl }" @click="attention">
					<image class="attention" :src="isColl ? '../../static/icon/xing-active.png' : '../../static/icon/xing.png'"></image>
					<text>关注</text>
				</view>
				<view class="app-tabbar-btn">
					<view class="app-tabbar-btn-not" v-if="goodsData.sold_out_status == 0">
						<text>已售罄</text>
					</view>

					<view class="app-tabbar-btn-timer" v-else-if="!isAction">
						<text>开抢倒计时：</text>
						<u-count-down bg-color="transparent" font-size="28" separator-color="#ffffff" color="#ffffff" :timestamp="goodsData.time"
						 @end="snapEnd"></u-count-down>
					</view>
					<view class="app-tabbar-btn-noraml" @click="snapUp" v-else>
						<text>立即抢购</text>
					</view>
				</view>
			</view>

			<!-- 分享弹窗 -->
			<u-popup ref="popup" v-model="isShow" :custom-style='{ boxShadow: "0 0 10rpx rgba(0, 0, 0, 0.1)" }' mode="bottom"
			 :mask="false" border-radius="20">
				<view class="popup-shark">
					<view class="popup-shark-title">
						<text>分享到</text>
					</view>
					<view class="popup-shark-box">
						<button open-type="share" class="popup-shark-box-item">
							<view class="popup-shark-box-icon">
								<image src="@/static/icon/wx-3.png"></image>
							</view>
							<text class="text">微信好友</text>
						</button>
						<view class="popup-shark-box-item" @click="posterEvent">
							<view class="popup-shark-box-icon">
								<image src="@/static/icon/wx-4.png"></image>
							</view>
							<text class="text">微信朋友圈</text>
						</view>
					</view>

					<view class="popup-shark-close top-line" @click="isShow = false">
						<text>取消</text>
					</view>
				</view>
			</u-popup>

			<!-- 提醒登陆弹窗 -->
			<u-popup v-model="isLogin" ref="popupBy" height="472" mode="bottom" border-radius="20">
				<view class="popup-closes">
					<view class="popup-closes-title">
						<text>您还未登录，请先登录</text>
					</view>
					<view class="popup-closes-box">
						<view class="popup-closes-btn active" @click="jumpLogin">
							<text>去登录</text>
						</view>
						<view class="popup-closes-btn" @click="() => { this.$refs.popupBy.close() }">
							<text>取消</text>
						</view>
					</view>
				</view>
			</u-popup>

			<u-popup v-model="isFormat" mode="bottom" border-radius="20" :safe-area-inset-bottom="true" :closeable="true">
				<view class="app-format">
					<view class="goods-info">
						<u-image v-if="format.pictures.length > 0" :src="format.pictures[0].abs_url" width="180" height="180">
							<u-loading slot="loading"></u-loading>
						</u-image>
						<u-image v-else :src="goodsData.cover[0].abs_url" width="180" height="180">
							<u-loading slot="loading"></u-loading>
						</u-image>
						<view class="goods-info-cont">
							<view class="goods-info-price">
								<text class="active">￥{{format.price}}</text>
								<text class="not">￥{{format.market_price}}</text>
							</view>
							<view class="app-info-select">
								<text>已选：</text>
								<block v-if="format.goods_attr.length > 0">
									<text style="margin-right: 10rpx;" space="ensp" v-for="(item, index) in format.goods_attr" :key="index">{{item.attr_value}}</text>
								</block>
								<block v-else>
									<text style="color: #999;">未选择规格</text>
								</block>
							</view>
							<view class="app-info-text">
								<text>预估收益￥{{format.goods_moeny}}</text>
							</view>
						</view>
					</view>
					<scroll-view :scroll-y="true" class="app-format-box">
						<view class="app-format-class" v-for="(item, index) in goodsData.goods_attr" :key="index">
							<view class="format-title">
								<text>{{item.attr_name}}</text>
							</view>
							<view class="format-warp">
								<view class="format-warp-item" :class="{ active: itez.is_show }" @click="changeFormat(itez, index, indez)"
								 v-for="(itez, indez) in item.attr_values" :key="itez.goods_attr_id">
									<text>{{itez.attr_value}}</text>
								</view>
							</view>
						</view>

						<view class="app-format-num">
							<text class="app-format-num-title">购买数量</text>
							<view class="app-format-num-box">
								<view class="app-format-num-ing">
									<view class="app-format-num-l">已抢{{format.chu_stock_fen}}份</view>
									<view class="app-format-num-r">剩余{{format.stock_fen}}份</view>
								</view>
							</view>
							<u-number-box v-model="number"></u-number-box>
						</view>
					</scroll-view>
					<view class="app-format-btn">
						<view class="default-btn" :class="{ active: format.stock_fen <= 0 }" @click="confirmOrder">
							<text>确定</text>
						</view>
					</view>
				</view>
			</u-popup>

			<u-popup v-model="isNotFormat" mode="bottom" border-radius="20" :safe-area-inset-bottom="true" :closeable="true">
				<view class="app-notformat">
					<view class="goods-info">
						<u-image :src="goodsData.cover[0].abs_url" width="180" height="180">
							<u-loading slot="loading"></u-loading>
						</u-image>
						<view class="goods-info-cont">
							<view class="goods-info-price">
								<text class="active">￥{{goodsData.price}}</text>
								<text class="not">￥{{goodsData.market_price}}</text>
							</view>
							<view class="app-info-select">
								<text>已选：</text>
								<text style="margin-right: 10rpx;" space="ensp">{{goodsData.goods_name}}</text>

							</view>
							<view class="app-info-text">
								<text>预估收益￥{{goodsData.goods_moeny}}</text>
							</view>
						</view>
					</view>
					<view class="app-format-num">
						<text class="app-format-num-title">购买数量</text>
						<view class="app-format-num-box">
							<view class="app-format-num-ing">
								<view class="app-format-num-l">已抢{{goodsData.chu_stock_fen}}份</view>
								<view class="app-format-num-r">剩余{{goodsData.stock_fen}}份</view>
							</view>
						</view>
						<u-number-box v-model="number"></u-number-box>
					</view>
					<view class="app-format-btn">
						<view class="default-btn" @click="directPay">
							<text>确定</text>
						</view>
					</view>
				</view>
			</u-popup>

			<u-skeleton :loading="loadSkeleton" :animation="true" bgColor="#F2F2F2"></u-skeleton>

			<u-popup mode="center" negative-top="20" v-model="isPosterPopup" border-radius="20">
				<view class="poster-box">
					<u-image :src="path" width="590" height="900" border-radius="20"></u-image>

					<!-- <view class="poster-box-btn" @click="savePath">保存</view> -->
				</view>
			</u-popup>

			<lime-painter type="2d" v-if="isPoster" isRenderImage :board="base" @success="path = $event" custom-style="position: fixed; left: 200%;"
			 @fail="failPath"></lime-painter>
		</view>
	</view>
</template>

<script>
	import LimePainter from '@/component/lime-painter/index.vue'

	import {
		goodsDetail,
		goodsInquire,
		goodsConOrder,
		attentionGoods
	} from '@/network/Goods-api'
	export default {
		components: {
			LimePainter,
		},
		data() {
			return {
				swiperCurrent: 1,
				goods_id: '', // 商品ID
				isColl: false, // 是否收藏
				isLogin: false, // 是否打开提示登录弹窗
				isShow: false, // 是否打开分享弹窗
				isFormat: false, // 是否打开商品规格弹窗
				isNotFormat: false, // 打开数量选择弹窗
				number: 1, // 商品规格 选择数量
				m_id: uni.getStorageSync('m_id') || '', // 用户ID
				goodsData: {}, // 商品详情数据
				loadSkeleton: true, // 首次进入模板，避免直接显示undfinde
				selectArr: [], // 存放被选中的值
				format: {},
				path: '',
				isPosterPopup: false,
				isPoster: false,
				base: {},
				feeSize: 30
			};
		},
		onLoad(option) {

			uni.showLoading({
				title: '加载中...'
			})
			if (option.parent_code) {

				uni.setStorageSync('parent_code', option.parent_code)
			}

			this.goods_id = option.id

			this.getGoodsDetail(option.id, this.m_id, true)

		},
		onShow() {
			this.m_id = uni.getStorageSync('m_id') || ''
		},
		onShareAppMessage() {
			const code = uni.getStorageSync('code')

			return {
				title: this.goodsData.share.goods_name,
				path: '/pages/Goods/details?id=' + this.goods_id + '&parent_code=' + code,
				// imageUrl: this.goodsData.share.cover,
				success: function(res) {
					console.log('分享成功' + res)
				},
				fail: function(res) {
					console.log(res + '失败');
				}

			}
		},
		watch: {
			m_id(newId) {
				this.moreGoodsDetail(this.goods_id, newId)
			},
			path(newPath) {
				this.isPosterPopup = true
				uni.hideLoading()
				this.$nextTick(() => {
					this.savePath()
				})

			}
		},
		computed: {
			isAction() {
				return this.goodsData.time_status == 1
			}
		},
		methods: {
			swiperChange(e) {
				this.swiperCurrent = e.detail.current + 1

				let len = this.goodsData.pictures.length
				for (let i = 0; i < len; i++) {
					this['videoContext' + i].pause()
				}
			},
			attention() {

				const m_id = uni.getStorageSync('m_id')

				if (m_id === '' || m_id === undefined) {
					return this.isLogin = true
				}
				let that = this
				if (!this.isColl && this.goodsData.time_status == 0) {
					// 未收藏 订阅模板消息
					wx.requestSubscribeMessage({
						tmplIds: ['eAMJeJRgbBa9zSeZ_CwvuTsGKu2D0oq1uhK_7mNDdeQ'],
						success: function(res) {
							that.network(m_id, that.goods_id)
						},
						fail: function(err) {
							console.log(err)
							return uni.showToast({
								title: '关注失败',
								icon: 'none'
							})
						}
					})
				} else {
					that.network(m_id, that.goods_id)
				}
			},
			network(m_id, id) {
				attentionGoods({
					m_id,
					goods_id: id,
					is_coll: this.isColl ? 1 : 0
				}).then(res => {

					this.isColl = !this.isColl
					wx.vibrateShort()
					uni.$emit('updata')
					uni.showToast({
						title: '操作成功'
					})
				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			// 协议
			routerRule(type) {
				uni.navigateTo({
					url: '/pages/Home/rule?type=' + type
				})
			},
			// 首次 获取商品详情数据
			async getGoodsDetail(id, m_id, first) {
				try {
					let res = await goodsDetail({
						goods_id: id,
						m_id
					})
					let obj = {
						price: res.price,
						market_price: res.market_price,
						goods_attr: [],
						goods_moeny: res.goods_moeny,
						pictures: res.cover,
						stock_fen: res.stock_fen,
						chu_stock_fen: 0
					}
					this.goodsData = res
					this.isColl = res.is_coll == 1

					this.format = obj
					this.producePoster(res.share)
					let len = res.pictures.length
					for (let i = 0; i < len; i++) {
						this['videoContext' + i] = uni.createVideoContext('video' + i)
					}

					this.loadSkeleton = false
					uni.hideLoading()
				} catch (e) {
					uni.showToast({
						title: e,
						icon: 'none',
						success() {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1500)
						}
					})
				}
			},
			// 轮次更替 获取商品详情数据
			async moreGoodsDetail(id, m_id, first) {
				try {
					let res = await goodsDetail({
						goods_id: id,
						m_id
					})

					this.goodsData = res
					this.isColl = res.is_coll == 1

					if (first) {
						this.loadSkeleton = false
					}
					uni.hideLoading()
					this.$nextTick(() => {
						this.$refs.uCountDown.start()
					})
				} catch (e) {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			// 视频播放
			videoPlay(index) {
				this['videoContext' + index].play()

				this.goodsData.pictures[index].isShow = true
			},
			videoPause(index) {
				this.goodsData.pictures[index].isShow = false
			},
			videoAction(index) {
				this.goodsData.pictures[index].isShow = true
			},
			// 抢购倒计时 结束
			snapEnd() {
				this.moreGoodsDetail(this.goods_id, this.m_id)
			},
			// 公布 论数 倒计时
			publishDown() {
				uni.showLoading({
					title: '轮次更新中...',
					mask: true
				})
				setTimeout(() => {
					this.moreGoodsDetail(this.goods_id, this.m_id, true)
				}, 300)

			},
			// 点击立即抢购按钮
			snapUp() {
				const m_id = uni.getStorageSync('m_id')
				if (!m_id && m_id === '') {
					return this.isLogin = true
				}

				if (this.goodsData.hasSku == 1) {
					return this.isFormat = true
				} else {
					return this.isNotFormat = true
				}
			},
			shareEvent() {
				const m_id = uni.getStorageSync('m_id')
				if (!m_id && m_id === '') {
					return this.isLogin = true
				} else {
					this.isShow = true
				}
			},
			// 无规格 直接购买
			directPay() {
				uni.showLoading({
					title: '下单中...',
					mask: true
				})
				goodsConOrder({
					m_id: this.m_id,
					goods_id: this.goods_id,
					quantity: this.number,
					goods_attr_ids: "",
					goods_attr_desc: ""
				}).then(res => {
					getApp().globalData.order = res
					uni.navigateTo({
						url: '/pages/Order/submitOrder?m_id=' + this.m_id,
						success: () => {
							uni.hideLoading()
						}
					})

				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},

			// 跳转登陆
			jumpLogin() {
				this.isLogin = false
				uni.navigateTo({
					url: '/pages/My/login'
				})
			},
			// 规格选择
			changeFormat(item, index, indez) {
				let goodsItem = this.goodsData.goods_attr[index].attr_values
				let length = this.goodsData.goods_attr[index].attr_values.length
				if (this.selectArr[index] != item.goods_attr_id) {

					this.selectArr[index] = item.goods_attr_id

					for (let i = 0; i < length; i++) {
						goodsItem[i].is_show = false
					}

					goodsItem[indez].is_show = true

					this.getGoodsInquire()
				} else {
					this.selectArr[index] = ''
					goodsItem[indez].is_show = false
					this.getGoodsInquire()
				}
			},
			async getGoodsInquire() {
				try {
					let attr_id = this.selectArr.join('|')
					if (attr_id.length === 1 && attr_id === "|") {
						attr_id = ""
					}
					let res = await goodsInquire({
						goods_id: this.goods_id,
						attr_id
					})

					this.format = res
				} catch (e) {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			// 确认提交订单
			confirmOrder() {
				if (this.number == 0) {
					return uni.showToast({
						title: '购买数量低于范围~',
						icon: 'none'
					})
				}

				if (this.number > this.goodsData.vip_limit - 0) {
					return uni.showToast({
						title: `该商品限购${this.goodsData.vip_limit}件~`,
						icon: 'none'
					})
				}

				let r = this.selectArr.filter((s) => {
					return s && s.trim()
				})

				if (r.length === 0 || r.length !== this.goodsData.goods_attr.length) {
					return uni.showToast({
						title: '请选择商品规格~',
						icon: 'none'
					})
				}
				uni.showLoading({
					title: '正在下单...',
					mask: true
				})

				let attr_id = this.selectArr.join('|')
				if (attr_id.length === 1 && attr_id === "|") {
					attr_id = ""
				}
				let str = '';
				let length = this.format.goods_attr.length
				for (let i = 0; i < length; i++) {
					str += this.format.goods_attr[i].attr_name + '： ' + this.format.goods_attr[i].attr_value + ' '
				}
				goodsConOrder({
					m_id: this.m_id,
					goods_id: this.goods_id,
					quantity: this.number,
					goods_attr_ids: attr_id,
					goods_attr_desc: str
				}).then(res => {
					getApp().globalData.order = res
					uni.navigateTo({
						url: '/pages/Order/submitOrder?m_id=' + this.m_id,
						success: () => {
							this.isFormat = false
							uni.hideLoading()
						}
					})

				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				})
			},
			// 生成海报
			producePoster(share) {
				let poster = {
					width: '590rpx',
					height: '900rpx',
					backgroundColor: '#fff',
					views: [
						// 商品图片
						{
							type: 'image',
							src: share.cover,
							mode: 'aspectFit',
							css: {
								left: '0rpx',
								top: '0rpx',
								width: '590rpx',
								height: '590rpx'
							}
						},
						// 头像
						{
							type: 'image',
							src: share.face,
							css: {
								left: '30rpx',
								top: '40rpx',
								width: '52rpx',
								height: '52rpx',
								radius: '50%'
							}
						},
						// 昵称
						{
							type: 'text',
							text: share.nickname,
							css: {
								left: '90rpx',
								top: '45rpx',
								color: '#333',
								fontSize: '26rpx'
							}
						},
						// 价格背景
						{
							type: 'image',
							src: require('@/static/image/bg-1.png'),
							css: {
								left: '0rpx',
								top: '590rpx',
								width: '590rpx',
								height: '78rpx'
							}
						},
						{
							type: 'text',
							text: '￥',
							css: {
								left: '30rpx',
								top: '625rpx',
								fontSize: '28rpx',
								fontFamily: 'Adobe Heiti Std',
								color: '#fff'
							}
						},
						{
							type: 'text',
							text: share.price,
							css: {
								left: '58rpx',
								top: '610rpx',
								fontSize: '42rpx',
								color: '#fff',
								fontFamily: 'Adobe Heiti Std',
							}
						},
						{
							type: 'text',
							text: '￥' + share.market_price,
							css: {
								left: '230rpx',
								maxLines: 1,
								top: '627rpx',
								fontSize: '24rpx',
								color: '#f2f2f2',
								textDecoration: 'line-through',
							}
						},
						{
							type: 'text',
							text: '预估收益',
							css: {
								fontSize: '20rpx',
								color: '#F23129',
								top: '600rpx',
								left: '460rpx'
							}
						},
						{
							type: 'view',
							css: {
								width: '120rpx',
								height: '34rpx',
								backgroundColor: '#F23129',
								radius: '10rpx',
								top: '635rpx',
								left: '440rpx'
							}
						},
						{
							type: 'text',
							text: share.goods_moeny + '元',
							css: {
								fontSize: '20rpx',
								color: '#fff',
								top: '638rpx',
								left: '470rpx'
							}
						},
						{
							type: 'text',
							text: share.goods_name,
							css: {
								width: '300rpx',
								maxLines: 2,
								fontSize: '30rpx',
								lineHeight: '48rpx',
								left: '30rpx',
								top: '690rpx'
							}
						},
						{
							type: 'image',
							src: share.share_image,
							mode: 'aspectFit',
							css: {
								width: '150rpx',
								height: '150rpx',
								top: '716rpx',
								left: '410rpx'
							}
						}
					]
				}

				this.base = poster
			},
			failPath(e) {
				console.log(e)
				uni.hideLoading()
				uni.showToast({
					title: '海报生成失败，请重试',
					icon: 'none'
				})
			},
			posterEvent() {
				this.isShow = false

				if (this.path !== '') {
					this.isPosterPopup = true
					this.savePath()
					return
				}
				uni.showLoading({
					title: '海报生成中...'
				})
				this.isPoster = true
			},
			savePath() {
				uni.saveImageToPhotosAlbum({
					filePath: this.path,
					success(res) {
						uni.showToast({
							title: '已保存到相册',
							icon: 'success',
							duration: 2000
						})
					}
				})
			}

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
		padding-bottom: 200rpx;
	}

	.app-showoff {
		width: 100%;
		height: 750rpx;
		position: relative;
		background-color: #FFFFFF;
	}

	.app-swiper-dis {
		width: 104rpx;
		height: 42rpx;
		background-color: rgba($color: #000000, $alpha: .3);
		font-size: 24rpx;
		color: #FFFFFF;
		font-weight: 400;
		@include flex-center();
		padding-bottom: 5rpx;
		position: absolute;
		right: 40rpx;
		bottom: 40rpx;
		border-radius: 21rpx;
	}

	.app-swiper {
		width: 100%;
		height: 750rpx;

		&-box,
		&-video,
		&-image {
			width: 100%;
			height: 100%;
		}

		&-box {
			position: relative;
		}

		.app-swiper-video-ing {
			width: 120rpx;
			height: 120rpx;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
	}

	.app-nav {
		width: 100%;
		height: 104rpx;
		position: relative;
		background-color: #FFFFFF;

		image,
		.app-nav-cont {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			width: 100%;
			height: 100%;
		}

		.app-nav-cont {
			display: flex;
			@include box(0 30rpx);

			.app-nav-left {
				width: 80%;

				.app-nav-title {
					color: #FFFFFF;
					font-family: PingFang SC;
					font-size: 36rpx;
					display: flex;
					align-items: flex-end;
					font-weight: bold;
					margin-top: 10rpx;

					.active {
						font-size: 50rpx;
						font-family: Bahnschrift;
						font-weight: 400;
						line-height: 55rpx;
					}
				}

				.app-nav-text {
					font-size: 24rpx;
					color: #FEFEFE;
					font-weight: 400;
					margin-left: 5rpx;

					text-decoration: line-through;
				}
			}

			.app-nav-right {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;

				.app-nav-income {
					font-size: 20rpx;
					color: #F23129;
					font-weight: 400;
				}

				.app-nav-number {
					padding: 6rpx 15rpx 7rpx 15rpx;
					white-space: nowrap;
					background-color: #F23129;
					border-radius: 10rpx;
					color: #FFFFFF;
					font-size: 26rpx;
					font-weight: bold;

				}
			}
		}
	}

	.app-info {
		width: 100%;
		min-height: 151rpx;
		@include box(20px 30rpx 5rpx 30rpx);
		@include flex-al();
		background-color: #FFFFFF;

		&-title {
			flex: 1;
			display: flex;
			flex-wrap: wrap;
			font-size: 34rpx;
			color: #333333;
			font-weight: 600;
			line-height: 48rpx;

		}

		&-share {
			width: 60rpx;
			margin-left: 30rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 24rpx;
			font-weight: 400;
			color: #999999;
			position: relative;

			image {
				width: 32rpx;
				height: 43rpx;
				margin-bottom: 15rpx;
			}
		}
	}

	.app-count {
		height: 50rpx;
		width: 100%;
		@include box(0 30rpx);
		@include flex-al-ju(flex-end);
		text-align: right;
		font-size: 26rpx;
		color: #333333;
		font-weight: 500;
		background-color: #FFFFFF;
	}

	.app-tips {
		width: 100%;
		height: 68rpx;
		@include box(0 30rpx);
		@include flex-al();
		font-size: 24rpx;
		color: #999999;
		font-weight: 400;
		margin-bottom: 18rpx;
		background-color: #FFFFFF;

		text {
			margin-left: 10rpx;
		}

	}

	.app-rule {
		width: 146rpx;
		height: 46rpx;
		background-color: #F2302A;
		border-radius: 23rpx 0px 0px 23rpx;
		padding-bottom: 5rpx;
		opacity: 0.8;
		@include flex-center();
		position: fixed;
		top: 106rpx;

		right: 0;

		z-index: 9999;
	}

	.app-head {
		width: 100%;
		@include box(30rpx 0 0 0);
		margin-bottom: 18rpx;
		background-color: #FFFFFF;

		.app-head-tips {
			width: 100%;
			@include box(0 30rpx);
			@include flex-al-ju(space-between);
			padding-bottom: 30rpx;

			.app-head-title {
				font-size: 28rpx;
				font-weight: 400;
				color: #666666;
			}

			.app-head-timer {
				font-size: 28rpx;
				color: #F2312A;
				font-weight: 400;

				text {
					margin-right: 15rpx;
				}
			}
		}

		.app-head-cont {
			// @include box(0 30rpx 0 45rpx);
			padding-left: 15rpx;
			width: 690rpx;
			min-height: 130rpx;
			margin: 0 auto;
			display: flex;
			flex-wrap: wrap;

			&-img {
				width: 59rpx;
				height: 59rpx;
				border-radius: 50%;
				margin-left: -15rpx;
				margin-bottom: 12rpx;
			}
		}

		.app-head-text {
			width: 100%;
			height: 60rpx;
			@include flex-center();
			font-size: 24rpx;
			font-weight: 400;
			color: #333333;

			.active {
				font-size: 26rpx;
				color: #F2322A;
				font-weight: 500;
			}
		}
	}

	.app-title {
		width: 100%;
		height: 88rpx;
		@include flex-center();
		background-color: #FFFFFF;

		&-cont {
			font-size: 30rpx;
			color: #333333;
			font-weight: bold;
			position: relative;

			text {
				position: relative;
				z-index: 2;
			}
		}

		.app-title-cont:after {
			content: "";
			width: 129rpx;
			height: 8rpx;
			background: linear-gradient(90deg, #ED353D 0%, #FD9095 100%);
			position: absolute;
			left: -4rpx;
			bottom: 3rpx;
			z-index: 1;
		}

		.app-detail {
			background-color: #FFFFFF;
			width: 100%;
			// @include box(0 30rpx);

		}
	}

	.app-tabbar {
		width: 100%;
		height: 98rpx;
		background-color: #FFFFFF;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		@include flex-al();
		@include box(0 35rpx);

		&-item {
			width: 60rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			font-size: 20rpx;
			color: #999999;
			margin-right: 46rpx;

			.share {
				width: 35rpx;
				height: 37rpx;
				margin-bottom: 7rpx;
			}

			.attention {
				width: 36rpx;
				height: 35rpx;
				margin-bottom: 12rpx;
			}

			.mg-r {
				margin-right: 100rpx;
			}
		}

		&-item.active {
			animation: Love 1.2s ease-out reverse forwards;
		}

		.app-tabbar-btn {
			flex: 1;

			&-noraml,
			&-timer,
			&-not {
				width: 100%;
				height: 74rpx;
				border-radius: 37rpx;
				color: #FFFFFF;
				font-size: 28rpx;
				font-weight: 400;
				@include flex-center();
			}

			&-noraml,
			&-timer {
				background: linear-gradient(-90deg, #FF7800, #FE4E38, #F13C3D);
			}

			&-not {
				background: linear-gradient(90deg, #666666, #788087, #999999);
			}
		}
	}

	.popup-shark {
		width: 100%;
		height: 492rpx;
		position: relative;

		&-title {
			font-size: 34rpx;
			color: #333333;
			text-align: center;
			margin-top: 55rpx;
		}

		&-box {
			margin-top: 59rpx;
			display: flex;
			align-items: center;
			justify-content: space-evenly;

			button {
				padding: 0;
				margin: 0;
				line-height: 1;
				background: #FFFFFF;
			}

			button:after {
				border: none;
			}

			&-item {
				display: flex;
				flex-direction: column;
				align-items: center;
			}

			&-icon {
				width: 118rpx;
				height: 118rpx;
				@include flex-center();

				image {
					width: 100%;
					height: 100%;
				}
			}

			.text {
				font-size: 30rpx;
				color: #333333;
				margin-top: 30rpx;
			}
		}

		&-close {
			width: 100%;
			height: 100rpx;
			@include flex-center();
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			font-size: 38rpx;
			color: #333333;
		}
	}

	.app-format {
		width: 100%;
		height: 911rpx;
		@include box(30rpx);



		&-box {
			width: 100%;
			height: 550rpx;

			.app-format-class {
				margin-bottom: 30rpx;

				.format-title {
					font-size: 26rpx;
					line-height: 40rpx;
					font-weight: bold;
					color: #333333;
					margin-bottom: 20rpx;
				}

				.format-warp {
					display: flex;
					flex-wrap: wrap;

					&-item {
						box-sizing: border-box;
						padding: 10rpx 20rpx;
						background-color: #F7F7F7;
						border-radius: 10rpx;
						border: 1px solid #F7F7F7;
						font-size: 22rpx;
						color: #333333;
						font-weight: bold;
						margin-right: 24rpx;
						margin-bottom: 20rpx;
					}

					&-item.active {
						color: #ED343D;
						border-color: #ED343D;
					}
				}
			}

			&-btn {
				width: 100%;
				height: 100rpx;
				margin-top: 20rpx;
				@include flex-al();
			}
		}
	}

	.goods-info {
		display: flex;
		margin-bottom: 30rpx;

		&-cont {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			margin-left: 20rpx;

			.goods-info-price {
				display: flex;
				align-items: flex-end;
				margin-top: 10rpx;

				.active {
					font-size: 36rpx;
					color: #F23129;
					font-weight: bold;
					margin-right: 8rpx;
				}

				.not {
					font-size: 22rpx;
					color: #999999;
					font-weight: bold;
					text-decoration: line-through;
					margin-bottom: 7rpx;
				}
			}

			.app-info-select {
				font-size: 26rpx;
				color: #333333;
				line-height: 48rpx;
				font-weight: 400;
			}

			.app-info-text {
				font-size: 20rpx;
				color: #E38A16;
				font-weight: 400;
			}
		}
	}

	.app-format-num {
		margin-top: 20rpx;
		height: 60rpx;
		@include flex-al();


		&-title {
			font-size: 26rpx;
			color: #333333;
			font-weight: bold;
			line-height: 40rpx;
		}

		&-box {
			flex: 1;
			display: flex;
			justify-content: flex-end;
		}

		&-ing {
			@include flex-al();

			justify-content: flex-end;
			margin-right: 30rpx;
			height: 36rpx;
			box-sizing: border-box;
			border-radius: 18rpx;
			font-size: 20rpx;
			font-weight: 400;
			background-color: #FFCBC9;
		}

		&-l {
			height: 36rpx;
			@include box(5rpx 20rpx 0 20rpx);
			background: linear-gradient(90deg, #FF553D 0%, #FD6849 100%);
			border-radius: 18rpx;
			color: #FFFFFF;
		}

		&-r {
			height: 36rpx;
			border-radius: 18rpx;
			background-color: #FFCBC9;
			@include box(5rpx 20rpx 0 20rpx);
			color: #FF563E;
		}
	}

	.default-btn.active {
		opacity: 0.5;
		color: #ddd;
	}

	.app-notformat {
		width: 100%;
		height: 600rpx;
		@include box(30rpx);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}


	.poster-box {
		width: 590rpx;
		height: 900rpx;
		border-radius: 20rpx;
		position: relative;

		&-btn {
			width: 750rpx;
			height: 100rpx;
			background-color: #FFFFFF;
			@include flex-center();
			font-size: 38rpx;
			font-weight: 400;
			color: #333333;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
		}
	}

	@keyframes Love {
		0% {
			transform: scale(1);
		}

		4% {
			transform: scale(1);
		}

		8% {
			transform: scale(1);
		}

		14% {
			transform: scale(1);
		}

		18% {
			transform: scale(1);
		}

		24% {
			transform: scale(1.01);
		}

		28% {
			transform: scale(1.01);
		}

		40% {
			transform: scale(0.98);
		}

		42% {
			transform: scale(0.98);
		}

		56% {
			transform: scale(1.05);
		}

		58% {
			transform: scale(1.04);
		}

		72% {
			transform: scale(0.87);
		}

		86% {
			transform: scale(1.37);
		}

		100% {
			transform: scale(0);
		}
	}
</style>
