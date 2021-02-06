<template>
	<view class="container loading u-skeleton">
		<view class="app-box-item mg-top u-skeleton-fillet">
			<text class="title">收货人</text>
			<view class="app-box-value">
				<input type="text" v-model="params.contacts" placeholder-class="tips" placeholder="请输入收货人姓名" />
			</view>
		</view>
		<view class="app-box-item u-skeleton-fillet">
			<text class="title">手机号</text>
			<view class="app-box-value">
				<input type="number" maxlength="11" v-model="params.mobile" placeholder-class="tips" placeholder="请输入收货人手机号" />
			</view>
		</view>
		<view class="app-box-item u-skeleton-fillet">
			<text class="title">所在地址</text>
			<picker class="app-box-value mg-r" mode="region" @change="addrenChange">
				<text class="tips" v-if="address.length === 0">请选择所在地址</text>
				<text class="text" v-else>{{address[0]}} {{address[1]}} {{address[2]}}</text>
			</picker>
			<u-icon name="arrow-right" size="30" color="#666"></u-icon>
		</view>
		<view class="app-box-cont u-skeleton-fillet">
			<textarea placeholder="详细地址：如街道门牌信息" v-model="params.address" placeholder-class="tips"></textarea>
		</view>
		<!-- <view class="app-box-item u-skeleton-fillet">
			<text class="title">邮编</text>
			<view class="app-box-value">
				<input type="number" maxlength="6" v-model="params.p_code" placeholder-class="tips" placeholder="请输入邮编号" />
			</view>
		</view> -->
		<view class="app-box-item mg-top u-skeleton-fillet">
			<text class="title">地址标签</text>
			<picker class="app-box-value mg-r" :range="labelValue" mode="selector" @change="labelChange">
				<view class="app-box-image">
					<u-image width="60" height="60" border-radius="50%" v-if="params.tag == 0" class="icon" src="@/static/icon/morendidian.png"><u-loading slot="loading"></u-loading></u-image>
					<u-image width="60" height="60" border-radius="50%" v-if="params.tag == 1" class="icon" src="@/static/icon/jia.png"><u-loading slot="loading"></u-loading></u-image>
					<u-image width="60" height="60" border-radius="50%" v-if="params.tag == 2" class="icon" src="@/static/icon/xiao.png"><u-loading slot="loading"></u-loading></u-image>
					<u-image width="60" height="60" border-radius="50%" v-if="params.tag == 3" class="icon" src="@/static/icon/qi.png"><u-loading slot="loading"></u-loading></u-image>
					<u-icon name="arrow-right" style="margin-left: 20rpx;" size="30" color="#666"></u-icon>
				</view>
			</picker>
		</view>
		<view class="app-box-item u-skeleton-fillet">
			<text class="title">设为默认地址</text>
			<view class="app-box-value">
				<u-switch active-color="#F95639" v-model="checked"></u-switch>
			</view>
		</view>
		<view class="app-btn u-skeleton-fillet" @click="addAddress">
			<text>保存地址</text>
		</view>
		
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
	import { addressDeta, newAddress } from '@/network/My-api'
	export default {
		data() {
			return {
				address: [],
				labelValue: ['默认', '家', '学校', '公司'],
				checked: false,
				loading: true,
				params: {
					contacts: '', //收货人
					mobile: '', // 手机号
					adcode: '',
					address: '', // 详细地址
					// p_code: '' ,// 邮编
					tag: 0, // 地址标签
					is_default: 0  ,// 是否设置为默认地址
					m_id: ''
				}
			};
		},
		onLoad(option) {
			this.params.m_id = option.m_id
			if(option.type == 2) {
				this.getAddressDeta(option.m_id, option.id)
			} else {
				this.loading = false
			}
		},
		methods: {
			addrenChange(e) {
				this.params.adcode = e.detail.code[2]
				this.address = e.detail.value
			},
			labelChange(e) {
				this.params.tag = e.detail.value
			},
			// 获取地址详情
			async getAddressDeta(m_id, id) {
				try{
					let res = await addressDeta({m_id, id})
					
					this.params = res
					this.checked = res.is_default == 1 
					this.address[0] = res.province_name
					this.address[1] = res.city_name
					this.address[2] = res.district_name
					this.loading = false
				}catch(e){
					uni.showToast({
						title: e,
						icon: 'none',
						success() {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							},1500)
						}
					})
				}
			},
			async addAddress() {
				if(this.params.contacts.trim().length === 0) {
					return uni.showToast({
						title: '请填写收货人',
						icon: 'none'
					})
				}
				if(!(/^1[3456789]\d{9}$/.test(this.params.mobile))) {
					return uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					})
				}
				if(this.params.adcode === '') {
					return uni.showToast({
						title: '请选择所在地区',
						icon: 'none'
					})
				}
				if(this.params.address === '') {
					return uni.showToast({
						title: '请填写详细地址',
						icon: 'none'
					})
				}
				// if(this.params.p_code.trim().length === 0) {
				// 	return uni.showToast({
				// 		title: '请填写邮政编码',
				// 		icon: 'none'
				// 	})
				// }
				
				this.params.is_default = this.checked ? 1 : 0
				console.log(this.params)
				try{
					let res = await newAddress(this.params)
					
					uni.showToast({
						title: '地址保存成功',
						mask: true,
						success() {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1500)
						}
					})
				}catch(e){
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

	.mg-top {
		margin-top: 20rpx;
	}

	.mg-r {
		margin-right: 10rpx;
	}

	.app-box-item {
		width: 100%;
		height: 104rpx;
		@include flex-al;
		@include box(0 30rpx);
		background-color: #FFFFFF;
		border-bottom: 1rpx solid #F2F2F2;

		.title {
			font-size: 30rpx;
			color: #333333;
			font-weight: bold;
		}

		.app-box-value {
			flex: 1;
			text-align: right;
			.tips {
				font-size: 28rpx;
				color: #999999;
				font-weight: bold;
				font-family: PingFang;
			}

			input {
				width: 100%;
				height: 100%;
				text-align: right;
				color: #333333;
				font-size: 30rpx;
			}

			.text {
				color: #333333;
				font-size: 30rpx;
			}

			.app-box-image {
				width: 100%;
				height: 103rpx;
				display: flex;
				align-items: center;
				justify-content: flex-end;
			}
		}
	}

	.app-box-cont {
		background-color: #FFFFFF;
		@include box(30rpx);
		height: 170rpx;
		width: 100%;
		border-bottom: 1rpx solid #F2F2F2;

		textarea {
			height: 100%;
			font-size: 30rpx;
			color: #333333;
			line-height: 42rpx;
		}
	}
	
	.app-btn {
		width: 100%;
		height: 97rpx;
		background: linear-gradient(90deg, #ED343D, #FF6638);
		@include flex-center();
		color: #FFFFFF;
		font-size: 32rpx;
		font-weight: bold;
		
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>
