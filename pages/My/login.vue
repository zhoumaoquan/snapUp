<template>
	<view class="container">
		<view class="app-logo">
			<u-image :src="logo" duration="200" width="140" mode="scaleToFill" height="140"></u-image>
		</view>
		
		<block v-if="!isNew">
			<view class="app-input">
				<input type="number" v-model="params.code" placeholder-class="place" placeholder="请输入推广码（选填）" />
			</view>
			
			<button open-type="getUserInfo" @getuserinfo="userLogin" class="default-btn">
				<text>微信用户一键登录</text>
			</button>
		</block>
		<block v-else>
			<view class="app-input">
				<input type="number" v-model="params.code" placeholder-class="place" placeholder="请输入推广码（选填）" />
			</view>
			
			<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="default-btn">
				<text>授权成功，点击登录</text>
			</button>
		</block>
		

		<view class="app-pact">
			<text>确认授权代表同意</text>
			<text class="active" @click="routerRule(1)">《用户协议》</text>
			<text class="active" @click="routerRule(2)">《隐私政策》</text>
		</view>
	</view>
</template>

<script>
	import { getOpenCode, getUserPhone, saveUserInfo } from '@/network/Login-api'
	import { aboutUs } from '@/network/My-api'
	import { uploadHead, downloadFile } from '@/libs/loadimg'
	export default {
		data() {
			return {
				isNew: false,
				params: {
					openid: '',
					avatar: '',
					gender: '',
					nickname: '',
					account: '',
					code: ''
				},
				sessionKey: '',
				logo: ''
			};
		},
		onLoad(option) {
			const code = uni.getStorageSync('parent_code')
			if(code !== '' && code !== undefined) {
				this.params.code = code
			}
			this.getLogo()
		},
		methods: {
			async getLogo() {
				try{
					let res = await aboutUs()
					
					this.logo = res.logo
				}catch(e){
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			userLogin(e) {
				let _this = this
				uni.showLoading({
					title: '授权登陆中...',
					mask: true
				})
				
				uni.login({
				  provider: 'weixin',
				  timeout: 6000,
				  success: async function (loginRes) {
					try{
						var { openid, is_bind, m_id, session_key, member_sn } =  await getOpenCode(loginRes.code)
					}catch(e){
						return uni.showToast({
							title: e,
							icon: 'none'
						})
					}
					
					if(is_bind == 1) {
						
						uni.setStorageSync('m_id', m_id)
						uni.setStorageSync('code', member_sn)
						return uni.showToast({
							title: '登陆成功',
							mask: true,
							success() {
								setTimeout(() => {
									 uni.navigateBack({
										delta: 1
									})
								}, 1500)
							}
						})
					}
					
					
					
					try{
						let Path = await downloadFile(e.detail.userInfo.avatarUrl)
						
						let imginfo = await uploadHead({ url: 'System/upload', imgUrl: Path.tempFilePath })
						
						_this.params.avatar = imginfo.data.list[0].id
					}catch(e){
						return uni.showToast({
							title: e,
							icon: 'none'
						})
					}
					 
					
					_this.params.openid = openid
					_this.params.gender = e.detail.userInfo.gender
					_this.params.nickname = e.detail.userInfo.nickName
					_this.sessionKey = session_key
					
					_this.isNew = true	
					
					uni.showToast({
						title: '微信授权成功',
						mask: true
					})
				  }
				})
			},
			async getPhoneNumber(e) {
				uni.showLoading({
					title: '授权登陆中...',
					mask: true
				})
				
				const { openid } = this.params
				
				const session_key = this.sessionKey
				try{
					let phone = await getUserPhone({ openid, iv: e.detail.iv, encryptedData: e.detail.encryptedData, session_key   })
					this.params.account = phone
					
					this.saveUserLogin()
				}catch(e){
					return uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			saveUserLogin() {
				saveUserInfo({
					...this.params
				}).then(res => {
					uni.setStorageSync('m_id', res.m_id)
					uni.setStorageSync('code', res.member_sn)
					uni.showToast({
						title: '登陆成功',
						mask: true,
						success() {
							setTimeout(() => {
								return uni.navigateBack({
									delta: 1
								})
							}, 1500)
						}
					})
				}).catch(err => {
					return uni.showToast({
						title: err,
						icon: 'none'
					})
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
	.app-logo {
		width: 100%;
		height: 350rpx;
		@include flex-center();
	}

	.app-input {
		width: 630rpx;
		margin: 0 auto;
		height: 120rpx;
		@include flex-al();
		border-bottom: 1rpx solid #F2F2F2;

		.place {
			color: #999;
			font-size: 30rpx;
			font-weight: 400;
		}

		input {
			width: 100%;
			font-size: 32rpx;
			font-weight: 500;
			color: #333333;
		}
	}

	.default-btn {
		border-radius: 20rpx;

		margin-top: 130rpx;
	}

	.app-pact {
		width: 100%;
		text-align: center;
		height: 50rpx;
		line-height: 50rpx;
		font-size: 28rpx;
		color: #999999;
		font-weight: 400;

		position: fixed;
		left: 0;
		right: 0;
		bottom: 36rpx;

		.active {
			color: #366FFF;
			font-size: 30rpx;
			margin-left: 10rpx;
			font-weight: bold;
		}
	}
</style>
