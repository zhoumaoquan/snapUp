<template>
	<view class="u-toast" :class="[isShow ? 'u-show' : '', 'u-type-default', 'u-position-' + tmpConfig.position]" :style="{
		zIndex: uZIndex
	}">
		<view class="u-icon-wrap">
			<u-icon class="u-icon" name="empty-favor" size="80" color="#fff"></u-icon>
		</view>
		<text class="u-text">{{tmpConfig.title}}</text>
	</view>
</template>

<script>
	/**
	 * toast 消息提示
	 * @description 此组件表现形式类似uni的uni.showToastAPI，但也有不同的地方。
	 * @tutorial https://www.uviewui.com/components/toast.html
	 * @property {String} z-index toast展示时的z-index值
	 * @event {Function} show 显示toast，如需一进入页面就显示toast，请在onReady生命周期调用
	 * @example <u-toast ref="uToast" />
	 */
	export default {
		name: "z-toast",
		props: {
			// z-index值
			zIndex: {
				type: [Number, String],
				default: ''
			},
		},
		data() {
			return {
				isShow: false,
				timer: null, // 定时器
				config: {
					params: {}, // URL跳转的参数，对象
					title: '', // 显示文本
					type: '', // 主题类型，primary，success，error，warning，black
					duration: 2000, // 显示的时间，毫秒
					isTab: false, // 是否跳转tab页面
					url: '', // toast消失后是否跳转页面，有则跳转，优先级高于back参数
					icon: true, // 显示的图标
					position: 'center', // toast出现的位置
					callback: null, // 执行完后的回调函数
					back: false, // 结束toast是否自动返回上一页
				},
				tmpConfig: {}
			};
		},
		computed: {
			uZIndex() {
				// 显示toast时候，如果用户有传递z-index值，有限使用
				return this.isShow ? (this.zIndex ? this.zIndex : this.$u.zIndex.toast) : '999999';
			}
		},
		methods: {
			// 显示toast组件，由父组件通过this.$refs.xxx.show(options)形式调用
			show(options) {
				// 不降结果合并到this.config变量，避免多次条用u-toast，前后的配置造成混论
				this.tmpConfig = this.$u.deepMerge(this.config, options);
				if (this.timer) {
					// 清除定时器
					clearTimeout(this.timer);
					this.timer = null;
				}
				this.isShow = true;
				this.timer = setTimeout(() => {
					// 倒计时结束，清除定时器，隐藏toast组件
					this.isShow = false;
					clearTimeout(this.timer);
					this.timer = null;
					// 判断是否存在callback方法，如果存在就执行
					typeof(this.tmpConfig.callback) === 'function' && this.tmpConfig.callback();
					this.timeEnd();
				}, this.tmpConfig.duration);
			},
			// 隐藏toast组件，由父组件通过this.$refs.xxx.hide()形式调用
			hide() {
				this.isShow = false;
				if (this.timer) {
					// 清除定时器
					clearTimeout(this.timer);
					this.timer = null;
				}
			},
			// 倒计时结束之后，进行的一些操作
			timeEnd() {
				// 如果带有url值，根据isTab为true或者false进行跳转
				if (this.tmpConfig.url) {
					// 如果url没有"/"开头，添加上，因为uni的路由跳转需要"/"开头
					if (this.tmpConfig.url[0] != '/') this.tmpConfig.url = '/' + this.tmpConfig.url;
					// 判断是否有传递显式的参数
					if (Object.keys(this.tmpConfig.params).length) {
						// 判断用户传递的url中，是否带有参数
						// 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
						// 如果有params参数，转换后无需带上"?"
						let query = '';
						if (/.*\/.*\?.*=.*/.test(this.tmpConfig.url)) {
							// object对象转为get类型的参数
							query = this.$u.queryParams(this.tmpConfig.params, false);
							this.tmpConfig.url = this.tmpConfig.url + "&" + query;
						} else {
							query = this.$u.queryParams(this.tmpConfig.params);
							this.tmpConfig.url += query;
						}
					}
					// 如果是跳转tab页面，就使用uni.switchTab
					if (this.tmpConfig.isTab) {
						uni.switchTab({
							url: this.tmpConfig.url
						});
					} else {
						uni.navigateTo({
							url: this.tmpConfig.url
						});
					}
				} else if(this.tmpConfig.back) {
					// 回退到上一页
					this.$u.route({
						type: 'back'
					})
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.u-toast {
		position: fixed;
		z-index: -1;
		transition: opacity 0.3s;
		text-align: center;
		color: #fff;
		border-radius: 8rpx;
		background: #585858;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		font-size: 28rpx;
		opacity: 0;
		pointer-events: none;
		padding: 18rpx 30rpx;
	}

	.u-toast.u-show {
		opacity: 1;
	}
	.u-icon-wrap {
		width: 100%;
		height: 120rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	// .u-icon {
	// 	align-items: center;
	// 	line-height: normal;
	// }

	.u-position-center {
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		/* #ifndef APP-NVUE */
		max-width: 70%;
		/* #endif */
	}

	.u-position-top {
		left: 50%;
		top: 20%;
		transform: translate(-50%,-50%);
	}

	.u-position-bottom {
		left: 50%;
		bottom: 20%;
		transform: translate(-50%,-50%);
	}
	.u-type-default {
		color: #fff;
		background-color: #686868;
	}
</style>
