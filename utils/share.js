export default {
	data() {
		return {
			share: {
				title: '搭火',
				imageUrl: '../static/img/fire01.png', // https://img1.baidu.com/it/u=3197874170,1245703905&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500
				// path: '/pages/home/index',
			}
		}
	},
	onShareAppMessage(res) { //发送给朋友
		var pathIndex = ''
		if (!this.share.path && this.$store.state.userInfo) {
			pathIndex = '/pages/home/index?invitation_code=' + this.$store.state.USER_INFO.invitation_code
		} else {
			pathIndex = '/pages/home/index'
		}
		var path = this.share.path ? this.share.path : pathIndex
		return {
			title: this.share.title,
			imageUrl: this.share.imageUrl,
			path
		}
	},
	onShareTimeline(res) { //分享到朋友圈
		var pathIndex = ''
		if (!this.share.path && this.$store.state.USER_INFO) {
			pathIndex = '/pages/home/index?invitation_code=' + this.$store.state.USER_INFO.invitation_code
		} else {
			pathIndex = '/pages/home/index'
		}
		var path = this.share.path ? this.share.path : pathIndex
		return {
			title: this.share.title,
			imageUrl: this.share.imageUrl,
			path
		}
	},
}