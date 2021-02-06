<template>
	<view class="container">
		<view class="app-head">
			<view class="app-info">
				<block v-if="Object.keys(userInfo).length === 0 && !isLogin">
					<u-image :fade="false" src="@/static/icon/not-login.png" width="128" height="128" border-radius="50%">
						<u-loading slot="loading"></u-loading>
					</u-image>
				</block>
				<block v-else>
					<u-image @click="router('profile')" :src="userInfo.avatar_path" width="128" height="128" border-radius="50%">
						<u-loading slot="loading"></u-loading>
					</u-image>
				</block>
				<view class="app-info-cont">
					<block v-if="Object.keys(userInfo).length === 0 && !isLogin">
						<view class="not-login" @click="router">
							<text>请先登录</text>
						</view>
					</block>
					<block v-else>
						<view class="user-name">
							<text>{{userInfo.nickname}}</text>
						</view>
						<view class="user-phone">
							<text>{{userInfo.account_format}}</text>
						</view>
					</block>
				</view>
				<view class="app-info-jump" @click="router('profile')">
					<u-icon name="arrow-right" size="28" color="#fff" label="个人资料" label-pos="left" label-color="#fff" label-size="26"></u-icon>
				</view>
			</view>

			<view class="app-navbar">
				<view class="app-navbar-item" @click="router('wallet')">
					<image src="@/static/icon/qianbao.png"></image>
					<text>我的钱包</text>
				</view>
				<view class="app-navbar-item" @click="router('address')">
					<image src="@/static/icon/dizhi.png"></image>
					<text>常用地址</text>
				</view>
				<view class="app-navbar-item" @click="router('attention')">
					<image src="@/static/icon/guanzhu.png"></image>
					<text>我的关注</text>
				</view>
				<view class="app-navbar-item" @click="router('promote')">
					<image src="@/static/icon/tuiguang.png"></image>
					<text>我的推广</text>
				</view>
			</view>
		</view>

		<view class="app-box">
			<view class="app-box-title">
				<text>我的管理</text>
			</view>
			<view class="app-box-item" @click="router('feedback', true)">
				<image src="@/static/icon/fankui.png"></image>
				<view class="app-box-item-text">意见反馈</view>
				<u-icon name="arrow-right" color="#999" size="26"></u-icon>
			</view>
			<button hover-class="none" open-type="contact" class="app-box-item">
				<image src="@/static/icon/kefu.png"></image>
				<view class="app-box-item-text">联系客服</view>
				<u-icon name="arrow-right" color="#999" size="26"></u-icon>
			</button>
			<view class="app-box-item" @click="router('aboutUs', true)">
				<image src="@/static/icon/about.png"></image>
				<view class="app-box-item-text">关于我们</view>
				<u-icon name="arrow-right" color="#999" size="26"></u-icon>
			</view>
			<view class="app-box-item" @click="router('setup', true)">
				<image src="@/static/icon/shez.png"></image>
				<view class="app-box-item-text">设置</view>
				<u-icon name="arrow-right" color="#999" size="26"></u-icon>
			</view>
			<view class="app-box-item" @click="router('new')">
				<image src="@/static/icon/xiaoxi.png"></image>
				<view class="app-box-item-text">站内消息</view>
				<view class="app-box-item-tips" v-if="isLogin && userInfo.not_read > 0">{{userInfo.not_read}}</view>
				<u-icon name="arrow-right" color="#999" size="26"></u-icon>
			</view>
		</view>

		<!-- 提醒登陆弹窗 -->
		<u-popup v-model="loginPopup" ref="popupBy" height="472" mode="bottom" border-radius="20">
			<view class="popup-closes">
				<view class="popup-closes-title">
					<text>您还未登录，请先登录</text>
				</view>
				<view class="popup-closes-box">
					<view class="popup-closes-btn active" @click="goLogin">
						<text>去登录</text>
					</view>
					<view class="popup-closes-btn" @click="() => { this.$refs.popupBy.close() }">
						<text>取消</text>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		userInfo
	} from '@/network/My-api'
	export default {
		data() {
			return {
				userInfo: {},
				isLogin: false,
				loginPopup: false
			};
		},
		onLoad(option) {
			uni.showLoading({
				title: 'Loading'
			})
		},
		onShow() {
			this.getUserInfo()
		},
		methods: {
			async getUserInfo() {
				try {
					const m_id = uni.getStorageSync('m_id')
					if (m_id === '' || m_id === undefined) {
						uni.hideLoading()
						return;
					}
					let res = await userInfo(m_id)

					this.userInfo = res
					this.isLogin = true
					uni.hideLoading()
				} catch (e) {
					uni.showToast({
						title: '获取用户信息失败',
						icon: 'none',
						success: () => {
							uni.removeStorageSync('m_id')
							this.userInfo = {}
							this.isLogin = false
						}
					})
				}
			},
			router(page, flag) {
				if (flag) {
					return uni.navigateTo({
						url: `/pages/My/${page}`
					})
				}

				if (!this.isLogin) {
					return this.loginPopup = true
				}

				uni.navigateTo({
					url: `/pages/My/${page}?m_id=${this.userInfo.m_id}`
				})
			},
			goLogin() {
				this.loginPopup = false
				uni.navigateTo({
					url: '/pages/My/login'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		padding-bottom: 200rpx;
	}

	.app-head {
		width: 100%;
		height: 429rpx;
		background: linear-gradient(180deg, #F12D27 0%, #FF7045 100%);

		.app-info {
			width: 100%;
			height: 210rpx;
			@include flex-al();
			@include box(0 0 0 30rpx);

			&-cont {
				flex: 1;
				width: 406rpx;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
				margin-left: 20rpx;

				.not-login,
				.user-name {
					font-size: 42rpx;
					color: #FFFFFF;
					font-weight: 600;
				}

				.user-name {
					@include ellipsis();
				}

				.user-phone {
					width: 170rpx;
					height: 40rpx;
					@include flex-center();
					background-color: #F66458;
					border-radius: 20rpx;
					font-size: 22rpx;
					font-weight: 600;
					color: #FFFFFF;
				}
			}

			&-jump {
				width: 174rpx;
				height: 62rpx;
				margin-left: 10rpx;
				background-color: #F66458;
				border-radius: 31rpx 0 0 31rpx;
				@include flex-center();
			}
		}

		.app-navbar {
			@include flex-al();
			justify-content: space-around;
			margin-top: 34rpx;

			&-item {
				width: 110rpx;
				display: flex;
				flex-direction: column;
				align-items: center;

				image {
					width: 44rpx;
					height: 44rpx;
					margin-bottom: 20rpx;
				}

				text {
					font-size: 26rpx;
					color: #FFFFFF;
					line-height: 36rpx;
					font-weight: 400;
				}
			}
		}
	}

	.app-box {
		width: 100%;
		height: 704rpx;
		background-color: #FFFFFF;
		border-radius: 40rpx 40rpx 0 0;
		position: relative;
		top: -55rpx;
		z-index: 2;
		@include box(0 45rpx);

		&-title {
			height: 104rpx;
			width: 100%;
			font-size: 32rpx;
			color: #333333;
			font-weight: 600;
			@include flex-al();
		}

		&-item {
			@include flex-al();
			height: 120rpx;

			image {
				width: 32rpx;
				height: 32rpx;
			}

			&-text {
				font-size: 30rpx;
				font-weight: 600;
				color: #333333;
				margin-left: 20rpx;
				flex: 1;
			}

			&-tips {
				width: 40rpx;
				height: 40rpx;
				border-radius: 50%;
				background-color: #F2332A;
				@include flex-center();
				color: #FFFFFF;
				font-size: 22rpx;
				font-weight: 400;
				margin-right: 20rpx;
			}
		}
	}
</style>
