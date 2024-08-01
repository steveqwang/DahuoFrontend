<template>
	<view>
		<!-- 聊天 wwl -->
		<scroll-view scroll-y class="scroll_view" :style="chatBodyBottom" :show-scrollbar="false"
			:scroll-into-view="scrollIntoView" :scroll-with-animation="true" @click="clickPage">
			<block v-if="chat_info && chat_info.length > 0">
				<view class="chat_box " :class='it.from == USER_INFO.id ? "chat_box1" :"chat_box2"'
					v-for='(it,i) in chat_info' :key='i' :id="'chatItem_'+i">
					<view class="role">
						<image :src="USER_INFO.avatar" v-if='it.from ==  USER_INFO.id' mode="aspectFill"></image>
						<image :src="it.avatar" v-else mode="aspectFill"></image>
					</view>
					<view class="info_box">
						<text class="name">
							{{it.name}}
						</text>
						<view class="input" v-if='it.type == "text"'>
							{{it.text}}
						</view>
						<view class="image" v-else-if='it.type == "image"'>
							<image :src="it.file.url" @click='$global.onPreview(it.file.url)' mode="widthFix"></image>
						</view>
						<view class="video" v-else-if="it.type=='video'" @click="onPayVideo(it.file.url)">
							<image
								src="http://tuzhuang-1304727035.file.myqcloud.com/20211217/vcK7h0amCZSbSlwSVjdvNgI6LVEewF2L4EUi6fGB.png"
								mode="aspectFit"></image>
							<text>
								点击观看视频～
							</text>
						</view>
						<video v-else-if="it.type=='video'" class="video" :src="it.file.url" />
						<view class="audio" v-else-if="it.type == 'audio'" :style="{width: getRadioWidth(it.file.dur)}"
							@click="playRadioMsg(it.file.url)">
							<image src="../../static/img/speaker_icon.png" mode=""></image>
							<text>{{it.file.dur | lenRadio}}</text>
						</view>
					</view>

				</view>
			</block>
		</scroll-view>
		<view class="operation_all" :style="'bottom:'+KeyboardHeight+'px;'">
			<view class="operation_row" :style="{paddingBottom: `${isIOS && KeyboardHeight == 0 ? '40rpx' : 0}`}">
				<image class="send-icon" @click="news.type = 'audio'" v-if="news.type  == 'text'"
					src="../static/icon/xiaolaba.png" mode="aspectFit"></image>
				<image class="send-icon" @click="news.type = 'text'" v-else src="../static/icon/keyboard.png"
					mode="aspectFit">
				</image>
				<view class="flex_center">
					<view v-if="news.type === 'audio'" class="audio_row" @longpress="onLongPress"
						@touchstart="recordingStart" @touchend="recordingEnd"
						:class="news.isRecording?'bg-hover-light':'bg-white'">
						<text class="font">{{news.recordingText}}</text>
					</view>
					<textarea v-else fixed class="textarea_row" :adjust-position="false" v-model="news.value"
						@focus="news.type = 'text'" />
				</view>
				<template v-if="news.value.length === 0">
					<image class="plus-icon" @click="onExtend()" src="../static/icon/plus_func.png" mode="aspectFit">
					</image>
				</template>
				<view v-else class="send_btn" @click="sendText()">
					<text>发送</text>
				</view>
			</view>
		</view>

		<recording v-if="news.isRecording"></recording>
		<chat-popup ref="action" bottom transformOrigin="center bottom" @hide="KeyboardHeight = 0" :mask="false">
			<swiper v-show="news.isShowFun" class="func-list-all" indicator-active-color='#d5d5d5'
				indicator-color='#999'>
				<swiper-item class="func-list">
					<view class="func" v-for='ic in funcList' :key='ic.type' @click="funRow(ic.type)">
						<view class="top">
							<image :src="ic.image" mode=""></image>
						</view>
						<text>{{ic.name}}</text>
					</view>
				</swiper-item>
			</swiper>
		</chat-popup>
		<u-popup v-model="videoObj.visible" mode='center' width="100%" height="auto" :zIndex='9999'>
			<view class="video_popup">
				<view class="icon">
					<image
						src="http://tuzhuang-1304727035.file.myqcloud.com/20211217/5WN07zvTmGa33paaFJzrp9j8kBxs6V58GvcvckW4.png"
						mode="" @click="videoObj.visible = false"></image>
				</view>
				<video :src="videoObj.url" :autoplay="true" :show-fullscreen-btn='false' class="video">
				</video>
			</view>
		</u-popup>
	</view>
</template>

<script>
	// import {setActuarialsheetAdd,getUserHouse} from "./static/api.js"
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	import Recording from './recording.vue'
	import uPopup from '@/components/u-popup.vue'
	import chatPopup from "./chat-popup.vue";
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			Recording,
			uPopup,
			chatPopup,
		},
		data() {
			return {
				videoObj: {
					visible: false,
					url: ''
				},
				isIOS: false,
				KeyboardHeight: 0, // 键盘高度
				scrollIntoView: '',
				navBarHeight: 0,
				fixed: true,
				page: 1,
				pageSize: 30,
				funcList: [{
						image: require('../static/icon/xiangce.png'),
						name: '照片',
						type: 'album'
					},
					{
						image: require('../static/icon/paizhao.png'),
						name: '拍摄',
						type: 'camera'
					},
				],
				news: {
					typeList: ['text', 'audio', 'image', 'video'],
					value: '',
					type: 'text',
					isAudio: false,
					isFocus: false,
					isShowFun: false,
					isRecording: false,
					recordingText: '按住说话',
					recordingTime: 0,
					recordingEvent: null,
					bottom: 0,
				},
				isCommoditySend: false,
				addLoading: false,
				chat_info: [],
			}
		},
		mounted() {
			var statusBarHeight = this.$store.state.statusBarHeight
			// #ifdef APP-PLUS-NVUE
			statusBarHeight = plus.navigator.getStatusbarHeight()
			// #endif
			this.navBarHeight = statusBarHeight + uni.upx2px(90)
			uni.onKeyboardHeightChange(res => {
				if (!this.news.isShowFun) {
					this.KeyboardHeight = res.height
				}
				if (this.KeyboardHeight > 0) {
					this.pageToBottom()
				}
			})
			this.pageToBottom()
		},
		computed: {
			...mapGetters(['SYSTEMP_INFO', 'USER_INFO']),
			// ...mapState(['chat_info', 'chat_to', 'duanType', 'USER_INFO', 'defaultHouse', 'chat_commodityInfo','isIOS']),
			// 聊天区域bottom
			chatBodyBottom() {
				return `bottom:${this.isIOS  && this.KeyboardHeight == 0 ?  uni.upx2px(145) :  uni.upx2px(105)   +  (this.chat_commodityInfo && !this.isCommoditySend ? uni.upx2px(180) : 0)  + this.KeyboardHeight}px;top:${this.navBarHeight}px;`
			},
		},
		watch: {
			'news.isShowFun'(nv) {
				if (!nv) this.$refs.action.hide()
			},
			'news.type'(nv) {
				this.isCommoditySend = false
				if (nv != 'text') {
					uni.hideKeyboard()
				} else {
					this.news.isShowFun = false
				}

			},
			chat_info() {
				this.pageToBottom();
			}
		},
		filters: {
			lenRadio: function(val) {
				return Number(val) <= 1000 ? 1 + "''" : parseInt(Number(val) / 1000) + "''"
			}
		},
		onLoad(option) {
			// this.set_chat_to(null)
			// this.set_chat_info([])
			this.init();

		},
		destroyed() {},
		onReady() {
			let model = ["X", "XR", "XS", "11", "12", "13", "14", "15"];
			console.log(this.SYSTEMP_INFO)
			for (let i = 0; i < model.length; i++) {
				if (this.SYSTEMP_INFO.model.indexOf(model[i]) != -1 && this.SYSTEMP_INFO.model.indexOf("iPhone") != -1)
					this.isIOS = true;
			}
			this.getLocalChatRecord()
		},
		methods: {
			// 初始化
			init() {},
			onPayVideo(url) {
				this.videoObj.visible = true
				this.videoObj.url = url
			},
			// async onAddActuarialsheet(id){
			// 	if(this.addLoading) return
			// 	this.addLoading = true
			// 	try{
			// 		var res = await setActuarialsheetAdd({id})
			// 		uni.showToast({title:'添加成功'})
			// 		this.addLoading = false
			// 	}catch{
			// 		this.addLoading = false
			// 	}
			// },
			// onCommodityPage(obj) {
			// 	uni.navigateTo({
			// 		url: obj.data.pageUrl
			// 	})
			// },
			clickPage() {
				this.news.type = 'text'
				this.news.isShowFun = false
			},
			onExtend() {
				this.news.isShowFun = true
				uni.hideKeyboard()
				this.$refs.action.show()
				this.KeyboardHeight = uni.upx2px(265)
			},
			pageToBottom() {
				setTimeout(() => {
					let lastIndex = this.chat_info.length - 1
					this.scrollIntoView = 'chatItem_' + lastIndex
				}, 300)
			},
			// ...mapMutations(['set_chat_to', 'set_chat_info', 'set_chat_commodityInfo']),
			async getLocalChatRecord() {
				this.chat_info = [{
						from: 133,
						avatar: 'https://img0.baidu.com/it/u=2373161736,1950059700&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800',
						name: '不寄丢',
						type: 'text',
						text: '你们在干嘛呢？',
					},
					{
						from: 22,
						avatar: 'https://img1.baidu.com/it/u=2013494631,1892037132&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
						name: '清乐',
						type: 'text',
						text: '你们在干嘛呢？',
					},
					{
						from: 1,
						avatar: '',
						name: '3333',
						type: 'text',
						text: '这是自己发的消息',
					},
				]
				// 	this.$IM.getHistoryMsgs({
				// 		scene: 'p2p',
				// 		to: this.chat_to.id,
				// 		limit: 20,
				// 		done: (error, obj) => {
				// 			// console.log('获取历史消息' + (!error ? '成功' : '失败!!!!'), obj)
				// 			if (!error && obj.msgs.length > 0) {
				// 				var newObj = obj.msgs.reverse()
				// 				newObj.forEach(row=>{
				// 					if(row.type == 'custom' && typeof(row.content)== "string"){
				// 						row.content = JSON.parse(JSON.stringify(JSON.parse(row.content)))
				// 					}
				// 				})
				// 				this.set_chat_info(newObj)
				// 			}
				// 		}
				// 	});
			},
			async funRow(type) {
				if (type == 'video') {
					uni.chooseVideo({
						count: 1,
						sourceType: ['camera', 'album'],
						success: (res) => {
							this.onSendFile(res.tempFilePath, type)
						}
					});

				} else {
					uni.chooseImage({
						sourceType: [type],
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						success: (res) => {
							const urls = res.tempFilePaths
							for (let i = 0; i < urls.length; i++) {
								this.onSendFile(urls[i], 'image')
							}
						}
					});
				}
			},
			sendText() {
				if (!this.news.value || !this.news.value.trim()) return
				this.chat_info.push({
					from: this.USER_INFO.id,
					time: Date.parse(new Date()),
					type: 'text',
					text: this.news.value,
					name: this.USER_INFO.name,

				});
				this.$nextTick(() => {
					this.news.value = ''
				})
				// this.$IM.sendText({
				// 	scene: 'p2p',
				// 	to: this.chat_to.id, // 被接受人的账号
				// 	text: this.news.value,
				// 	done: () => {
				// 		this.set_chat_info([...this.chat_info, {
				// 			scene: "p2p",
				// 			to: this.chat_to.id,
				// 			from: this.USER_INFO.id,
				// 			time: Date.parse(new Date()),
				// 			type: 'text',
				// 			text: this.news.value
				// 		}])
				// 		this.$nextTick(() => {
				// 			this.news.value = ''
				// 		})
				// 	}
				// })
			},
			//开始录音
			recordingStart() {
				console.log('开始录音');
			},
			// 录音结束
			recordingEnd() {
				if (!this.news.recordingTime) {
					uni.showToast({
						title: '时间太短',
						icon: 'none'
					})
					this.news.isRecording = false
					this.news.recordingText = '按住说话'
					recorderManager.stop();
					return;
				}
				this.news.isRecording = false
				this.news.recordingText = '按住说话'
				recorderManager.stop();
				recorderManager.onStop(res => {
					clearInterval(this.news.recordingEvent);
					this.onSendFile(res.tempFilePath, 'audio')
				})
			},
			onSendFile(url, type) {
				const _this = this
				// this.$IM.sendFile({
				// 	scene: 'p2p',
				// 	to: this.chat_to.id,
				// 	type,
				// 	filePath: url,
				// 	uploaddone: (error, file) => {},
				// 	beforesend: (msg) => {
				// 		this.set_chat_info([...this.chat_info, msg])
				// 	}
				// });
				this.chat_info.push({
					from: this.USER_INFO.id,
					time: Date.parse(new Date()),
					type,
					file: {
						url
					},
					name: this.USER_INFO.name,

				});
			},
			getNowDate() {
				function formDate(str) {
					if (str < 10) {
						return '0' + str
					} else {
						return String(str)
					}
				}
				let time = new Date()
				let year = time.getFullYear()
				let month = formDate(time.getMonth() + 1)
				let date = formDate(time.getDay())
				let hours = formDate(time.getHours())
				let minutes = formDate(time.getMinutes())
				let seconds = formDate(time.getSeconds())
				let nowTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
				return nowTime
			},
			onLongPress() {
				// console.log('长按');
				this.news.isRecording = true
				this.news.recordingText = '松开结束'
				recorderManager.start();
				this.news.recordingTime = 0 // 清空录音时间
				recorderManager.onStart(() => {
					this.news.recordingEvent = setInterval(() => {
						this.news.recordingTime++
					}, 1000)
				});
				recorderManager.start({
					format: "mp3"
				});
			},
			sendAudio(url, dur) {
				// console.log(url, dur)
				const urls = this.$IM.audioToMp3({
					url: url
				});
				// console.log(urls, '转换之后的urlmp3');
				this.$IM.sendFile({
					scene: 'p2p',
					to: this.chat_to.id,
					type: 'audio',
					uploaddone: (error, file) => {
						if (!error) {
							this.set_chat_info([...this.chat_info, file])
						} else {
							uni.showToast({
								title: '发送失败',
								icon: 'none'
							})
						}
					},
					// beforesend: (msg)=> {
					// 	console.log('正在发送p2p image消息, id=' + msg.idClient);
					// },
					done: (res) => {
						// console.log(res, '上传语音消息结果')
					}
				});
			},
			// // 播放语音条
			playRadioMsg(url) {
				innerAudioContext.src = url
				innerAudioContext.play()
				if (innerAudioContext.paused) {
					innerAudioContext.play()
				} else {
					innerAudioContext.pause() //暂停
					innerAudioContext.onPause(() => { //暂停时调用的方法  
						innerAudioContext.startTime = innerAudioContext.currentTime
					})
				}
			},
			getRadioWidth(dur) {
				// let duration = url.split('%/dur')[1]
				let duration = Number(dur)
				if (duration == null) {
					return '50rpx'
				}
				if ((0 < duration) && (duration < 3000)) {
					return '120rpx'
				} else if ((3000 < duration) && (duration < 6000)) {
					return '170rpx'
				} else {
					return '220rpx'
				}
			},

		}
	}
</script>

<style lang="scss" scoped>
	.video_popup {
		height: 100vh;
		width: 750rpx;
		background-color: #000;
		position: relative;
		box-sizing: border-box;
		padding: 300rpx 0 200rpx;

		.video {
			width: 100%;
			height: 100%;
		}

		.icon {
			position: absolute;
			right: 50rpx;
			top: 200rpx;

			image {
				width: 70rpx;
				height: 70rpx;
			}
		}
	}

	.scroll_view {
		background-color: #fff;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		padding-left: 30rpx;
		padding-right: 30rpx;
		bottom: 105rpx;
		box-sizing: border-box;

		.fixed_info {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
		}
	}

	.operation_all {
		position: fixed;
		left: 0;
		right: 0;
		// display: flex;
		// box-sizing: border-box;
		// align-items: center;
	}

	.operation_row {
		// position: fixed;
		// left: 0;
		// right: 0;
		padding: 0 30rpx;
		border-top: 1rpx solid #dee2e6;
		display: flex;
		align-items: center;
		background-color: #F6F7F9;
		height: 105rpx;

		.flex_center {
			flex: 1;
			padding: 0 10rpx;
			box-sizing: border-box;
		}

		.textarea_row {
			background-color: #ffffff;
			border-radius: 8rpx;
			padding: 15rpx 20rpx;
			font-size: 35upx;
			height: 80rpx;
			max-width: 500rpx;
			box-sizing: border-box;
			color: #26252A;
		}

		.audio_row {
			border-radius: 8rpx;
			display: flex;
			justify-content: align-center;
			align-items: center;
			box-sizing: border-box;
			height: 60rpx;
			justify-content: center;
			color: #26252A;
		}

		.bg-hover-light {
			background-color: #dae0e5;
		}

		.bg-white {
			background-color: #ffffff;
		}

		.send-icon {
			width: 50rpx;
			height: 50rpx;
			margin-right: 20rpx;
		}

		.plus-icon {
			width: 50rpx;
			height: 50rpx;
			margin-left: 20rpx;
		}

		.send_btn {
			flex-shrink: 0;
			border-radius: 8rpx;
			font-size: 30upx;
			padding-left: 20rpx;
			padding-right: 20rpx;
		}
	}

	.func-list-all {
		width: 750rpx;
		height: 265rpx;
	}

	.func-list {
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		background-color: #333333;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		border-top: 1rpx solid #C0C0C0;
		// background-color: #f6f7fb;
		background-color: #F6F7F9;
		display: flex;
		flex-direction: row;

		.func {
			width: 33.3%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			>.top {
				width: 100rpx;
				height: 100rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 10rpx;
				box-sizing: border-box;
				background-color: #fff;
				box-sizing: border-box;

				image {
					width: 50rpx;
					height: 50rpx;
				}

				margin-bottom: 20rpx;
			}

			text {
				font-size: 24rpx;
				line-height: 24rpx;
				color: #333333;
			}



		}
	}


	.consulation {
		width: 100%;
		min-height: 100%;
		background-color: #F3F3F3;
	}


	.chat_box {
		display: flex;
		margin-bottom: 34rpx;
		width: 100%;
		box-sizing: border-box;

		.role image {
			width: 82rpx;
			height: 82rpx;
			border-radius: 20rpx;
			background-color: #C0C0C0;
		}

		.info_box {
			text-align: left;

			.name {

				display: inline-block;
				max-width: 500rpx;
				line-height: 26rpx;
				font-size: 18rpx;
				color: #666666;
				letter-spacing: 0.29px;
				margin-bottom: 12rpx;
			}

			.input {
				max-width: 500rpx;
				padding: 20rpx 30rpx;
				box-sizing: border-box;
				border-radius: 0px 40rpx 40rpx 40rpx;
				background-color: #F6F7F9;
				box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.12);
				font-size: 28rpx;
				line-height: 42rpx;
				// white-space: normal;
				word-break: break-all;
				color: #101010;
			}


			.image {

				image,
				img {
					max-width: 400rpx;
					// max-height: 1000rpx;
				}
			}

			.video {
				width: 400rpx;
				height: 300rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				border-radius: 20rpx;
				justify-content: center;
				background-color: #3B4144;

				image {
					width: 80rpx;
					height: 80rpx;
				}

				text {
					color: #fff;
					font-size: 24rpx;
					margin-top: 30rpx;
				}
			}

			.audio {
				background-color: #6E9CF8;
				border-radius: 12rpx;
				padding: 20rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: flex-start;
				height: 80rpx;
				box-sizing: border-box;
				background: #ffffff;
				box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.12);

				image {
					display: inline-block;
					width: 33rpx;
					height: 33rpx;
				}

				text {
					margin-left: 6rpx;
					color: #26252A;
				}
			}
		}
	}

	.chat_box1 {
		flex-direction: row-reverse;

		.role image {
			margin-left: 16rpx;
		}

		.info_box {
			text-align: right;

			.input {
				background-color: $theme;
				color: #fff;
				border-radius: 40rpx 0rpx 40rpx 40rpx;
			}
		}
	}

	.chat_box2 {
		justify-content: flex-start;

		.role image {
			margin-right: 16rpx;
		}
	}

	.operation {
		width: 100%;
		background-color: #F6F7F9;
		// height: 100rpx;
		padding: 24rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-bottom: constant(safe-area-inset-bottom); // 核心代码
		padding-bottom: env(safe-area-inset-bottom); // 核心代码

		.input-box {
			flex: 1;
			height: 70rpx;
			border-radius: 35rpx;
			padding: 0 20rpx;
			box-sizing: border-box;
			background-color: #FFFFFF;
		}

		.input-radio {
			flex: 1;
			height: 70rpx;
			border-radius: 35rpx;
			padding: 0 20rpx;
			line-height: 70rpx;
			text-align: center;
			color: #333333;
			background-color: #FFFFFF;
		}

		.send-icon {
			width: 50rpx;
			height: 50rpx;
			margin-right: 20rpx;
		}

		.plus-icon {
			width: 50rpx;
			height: 50rpx;
			margin-left: 20rpx;
		}
	}

	.func-list-all {
		width: 750rpx;
	}

	.func-list {
		width: 100%;
		background-color: pink;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		background-color: #333333;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		border-top: 1rpx solid #C0C0C0;
		background-color: #F6F7F9;
		display: flex;
		flex-direction: row;

		.func {
			width: 33.3%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			>.top {
				width: 100rpx;
				height: 100rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 10rpx;
				box-sizing: border-box;
				background-color: #fff;
				box-sizing: border-box;

				image {
					width: 50rpx;
					height: 50rpx;
				}

				margin-bottom: 20rpx;
			}

			text {
				font-size: 24rpx;
				color: #333333;
			}



		}
	}

	// 其他
	.commodity_info {
		width: 100%;
		padding: 20rpx 36rpx;
		box-sizing: border-box;

		.commodity {
			width: 100%;
			height: 160rpx;
			padding: 0 20rpx;
			box-sizing: border-box;
			background: #ffffff;
			border-radius: 12rpx;
			box-shadow: 0px 6rpx 12rpx 0px rgba(0, 0, 0, 0.12);
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: relative;

			.icon_btn {
				position: absolute;
				right: 10rpx;
				top: 10rpx;
				z-index: 1;
			}
		}

		.right {
			margin-top: 25rpx;
			text-align: center;
			width: 110rpx;
			height: 44rpx;
			line-height: 44rpx;
			background: $theme;
			border-radius: 22rpx;
			font-size: 20rpx;
			color: #fff;

			text {
				transform: scale(0.8);
			}
		}

		.left {
			width: calc(100% - 170rpx);
			display: flex;
			justify-content: space-between;

			image {
				width: 104rpx;
				height: 104rpx;
			}

			.info {
				width: calc(100% - 124rpx);
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.text {
					font-size: 20rpx;
					line-height: 26rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: 500;
					color: #26252a;
					overflow: hidden;
					text-overflow: ellispsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					word-break: break-all;
				}

				.money {
					font-size: 20prx;
					line-height: 28rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: 500;
					text-align: left;
					color: $theme;
				}
			}
		}
	}

	.house_info {
		max-width: 100%;
		padding: 30rpx 36rpx;
		box-sizing: border-box;

		.text {
			color: #ADADAD;
			font-size: 24rpx;
			line-height: 34rpx;
			text-align: center;
		}

		.btn {
			font-weight: 700;
			margin-top: 26rpx;
			font-size: 24rpx;
			line-height: 34rpx;
			text-align: center;
			color: $theme;
		}
	}

	.commodity_row {
		width: 326rpx;
		background: #ffffff;
		border-radius: 20rpx;
		overflow: hidden;
		box-shadow: 0px 4rpx 12rpx 0px rgba(165, 165, 165, 0.20);
		margin-top: 1em;
		-moz-page-break-inside: avoid;
		-webkit-column-break-inside: avoid;
		break-inside: avoid;
		width: 326rpx;
		background: #ffffff;
		border-radius: 20rpx;
		overflow: hidden;
		box-shadow: 0px 4rpx 12rpx 0px rgba(165, 165, 165, 0.20);

		.top_box {
			image {
				width: 326rpx;
				height: 326rpx;
			}
		}

		.bottom_box {
			background-color: #fff;
			padding: 16rpx 16rpx 26rpx;
			width: 100%;
			box-sizing: border-box;

			.title {
				color: #26252B;
				font-size: 24rpx;
				line-height: 34rpx;
				display: block;
				overflow: hidden;
				text-overflow: ellispsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			.title2 {
				color: #101010;
				font-size: 24rpx;
				line-height: 34rpx;
				display: block;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.money_box3 {
				margin-top: 16rpx;
				display: flex;
				justify-content: flex-start;

				.money_row {
					display: inline-block;
				}

				.text1 {
					font-size: 28rpx;
					line-height: 44rpx;
					color: #FE0200;
				}

				.text2 {
					font-size: 22rpx;
				}

				.text_l {
					margin: 0 5rpx;
				}
			}

			.money_box {
				margin-top: 16rpx;
				display: flex;
				justify-content: space-between;

				// align-items: center;
				.left2 {
					width: 100%;
				}

				.left {
					width: calc(100% - 4em);
					color: #FE0200;

					.left_row {
						display: inline-block;
					}

					>view:nth-child(1) {
						font-size: 28rpx;
						line-height: 44rpx;
						color: #FE0200;

						>text:nth-child(2) {
							font-size: 22rpx;
						}
					}

					>view:nth-child(2) {
						font-size: 22rpx;
						line-height: 44rpx;
						color: #ADADAD;
						margin-left: 16rpx;
						text-decoration: line-through;

						>text:nth-child(2) {
							font-size: 20rpx;
						}
					}

					&:last-child {
						>view:nth-child(1) {
							font-size: 24rpx;

							>text:nth-child(2) {
								font-size: 20rpx;
							}
						}

						>view:nth-child(2) {
							font-size: 20rpx;
						}
					}
				}

				.right {
					text-align: right;
					color: #ADADAD;
					font-size: 22rpx;
					line-height: 44rpx;
				}
			}

			.money_box2 {
				margin-top: 16rpx;

				.money {
					.left_row {
						display: inline-block;
					}

					>view:nth-child(1) {
						font-size: 28rpx;
						line-height: 44rpx;
						color: #FE0200;

						>text:nth-child(2) {
							font-size: 22rpx;
						}
					}

					>view:nth-child(2) {
						font-size: 22rpx;
						line-height: 44rpx;
						color: #ADADAD;
						margin-left: 16rpx;
						text-decoration: line-through;

						>text:nth-child(2) {
							font-size: 20rpx;
						}
					}

					&:last-child {
						>view:nth-child(1) {
							font-size: 24rpx;

							>text:nth-child(2) {
								font-size: 20rpx;
							}
						}

						>view:nth-child(2) {
							font-size: 20rpx;
						}
					}
				}

				.label_num {
					.num {
						color: #ADADAD;
						font-size: 22rpx;
						line-height: 44rpx;
					}

					.lable2 {
						text {
							display: inline-block;
							padding: 2rpx 4rpx;
							line-height: 24rpx;
							border-radius: 6rpx;
							font-family: PingFang SC, PingFang SC-Regular;
							background-color: #FF0000;
							font-size: 24rpx;
							color: #ffffff;
						}
					}
				}

				.label_num2 {
					display: flex;
					justify-content: space-between;
					width: 100%;

					.num {
						width: 5em;
					}

					// .lable2{
					// 	max-width: calc(100% - 6em);
					// }
				}

				.label_num3 {
					margin-top: 16rpx;
				}
			}

			.label {
				margin-top: 16rpx;

				text {
					display: inline-block;
					padding: 3rpx 14rpx;
					border: 2rpx solid #fe0200;
					border-radius: 8rpx;
					font-size: 18rpx;
					line-height: 24rpx;
					color: #fe0200;
					margin-right: 15rpx;

					&:last-child {
						margin-right: 0;
					}
				}
			}
		}


	}

	.house_row {
		margin: 0 auto;
		width: 616rpx;
		padding: 26rpx 18rpx;
		box-sizing: border-box;
		background: #F6F7F9;
		border-radius: 8px;

		.row {
			font-size: 24rpx;
			line-height: 34rpx;
			color: #666;
			display: flex;
			justify-content: space-between;
			align-items: center;

			&:first-child {
				margin-bottom: 10rpx;
			}

			image {
				width: 28rpx;
				height: 28rpx;
			}

			>view {
				width: calc(100% - 50rpx);

				.area {
					margin-left: 20rpx;
					position: relative;

					&::before {
						content: '2';
						top: -6rpx;
						position: absolute;
						right: -13rpx;
						font-size: 24rpx;
						transform: scale(0.7);
					}
				}
			}
		}
	}

	.offer_btn {
		width: 500rpx;
		margin-left: 25rpx;
		height: 90rpx;
		line-height: 90rpx;
		background: $theme;
		border-radius: 40rpx;
		font-size: 30rpx;
		color: #fff;
		font-weight: 700;
		text-align: center;
	}

	button[loading]::before {
		align-self: center
	}

	button {
		display: flex;
		justify-content: center;
		align-item: center;
		padding: 0;
	}

	button::after {
		border: none;
	}
</style>