<script>
	import { loginCount } from './network/Home-api'
	export default {
		globalData: {
		    order: {}
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			
			const m_id = uni.getStorageSync('m_id')

			loginCount(m_id).catch(e => {
				console.log(e)
			})
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import "@/common/common.scss"
	/*每个页面公共css */
</style>
