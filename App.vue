<script>
	import { onUpdateApp } from '@/utils/global.js';
	export default {
		onLaunch: function(params) {
			console.log('App Launch', params)
			onUpdateApp();
			uni.getSystemInfo({
				success: (event) => {
					this.$store.commit('SET_SYSTEMP_INFO', event)
				}
			});
			// 必填信息
			const config = {
			  userID: "小王", // Login User ID
			  SDKAppID: 1600040839, // Your SDKAppID
			  secretKey: "6e1d1d85f1259c46a872144e6b2e946077befd079ff5a726041f6a17a38ee2e4", // Your secretKey
			};
			uni.$chat_userID = config.userID;
			uni.$chat_SDKAppID = config.SDKAppID;
			uni.$chat_secretKey = config.secretKey;
			
			

		},
		onShow: function(res) {
			console.log(res,'onShow')
			if(res.query.invitation_code)  this.$store.commit('SET_INVITATION_CODE', res.query.invitation_code);
			// wx.setKeepScreenOn({
			//   keepScreenOn: true
			// })
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("static/css/index.scss");
	uni-page-body,
	html,
	body,
	page {
	  width: 100% !important;
	  height: 100% !important;
	  overflow: hidden;
	}

</style>
