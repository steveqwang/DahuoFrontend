<template>
	<view class="page">
		<view class="top_box">
			<image src="@/static/img/fire01.png" mode="aspectFit"></image>
			<view>搭火小程序</view>
			<text>从虚拟到现实 从屏幕到生活</text>
			<button class="empower" :loading="loading" @click="handleLogin()" >
				<image src="../../static/icon/wechat.png" mode="aspectFit"></image>
				<text>微信一键登录</text>
			</button>
		</view>
		<view class="agreement" :class='{shaking:isShaking }' @click="isCheckbox = !isCheckbox">
			<image src="@/static/icon/radio01.png" mode="aspectFit" v-if="isCheckbox"></image>
			<text v-else class="icon"></text>
			<text >我已阅读并同意</text>
			<view class="file">
				<block  v-for="(item, index) in fileList" :key="index" >
					<text @click.stop="handleDetails(item)">《{{item.lable}}》</text>
					<template v-if="index === 0">以及</template>
				</block>
				
			</view>
		</view>
		<u-popup v-model="wxPhone.visible" mode='center' width="80%" height="auto" borderRadius="24" :maskCloseAble="false" :mask="true">
			<view class="wx_phone">
				<view class="tip">{{wxPhone.tip}}</view>
				<view class="btn">
					<button @click="wxPhone.visible = false">取消</button>
					<button open-type="getPhoneNumber" @getphonenumber="getphonenumber">去授权</button>
				</view>
			</view>
		</u-popup>
		<!-- <u-popup v-model="wxUser.visible" mode='center' width="80%" height="auto" borderRadius="24" :maskCloseAble="false" :mask="true">
			<view class="wx_phone">
				<view class="tip">{{wxUser.tip}}</view>
				<view class="btn">
					<button @click="getUserProfile(false)">取消</button>
					<button @click="getUserProfile(true)">去授权</button>
				</view>
			</view>
		</u-popup> -->
	</view>
</template>

<script>
	import * as api from '@/api/basics.js'
	import uPopup from '@/components/u-popup.vue';
	import { mapActions } from 'vuex'
	export default {
		name: 'login',
		title: '登录',
		components: { uPopup },
		data(){
			return {
				isCheckbox: false,
				loading: false,
				isShaking: false,
				fileList:[
					{ lable: '用户协议', id: 'yhxy' },
					{ lable: '隐私政策', id: 'ysxy' },
				],
				wxPhone: {
					visible: false,
					tip:'当前登录需要授权手机号',
					info:{}
				},
				// wxUser: {
				// 	open: false,
				// 	visible: false,
				// 	tip:'是否获取微信头像、用户名？',
				// 	info:{}
				// }
			}
		},
		computed: {},
		methods:{
			...mapActions(["SET_LOGIN","SET_BIND_PHONE"]),
			// 详情
			handleDetails(row){
				uni.navigateTo({
					url:`/pagesActivity/fileDetails/index?id=${row.id}&type=agreement&title=${row.lable}`
				})
			},
			// 登录
			async handleLogin(){
				if(!this.isCheckbox) return this.onShaking();
				// this.loading = true;
				// await this.SET_LOGIN()
				// .then((res)=>{
				// 	if(res.code == 0){
						this.onLoginSuccess(2); // this.onLoginSuccess(1);
				// 	}else if(res.code == 2){
				// 		this.wxPhone.info.session_key = res.data.session_key;
				// 		this.wxPhone.info.openid = res.data.openid;
				// 		this.wxPhone.visible = true;
				// 	}else{
				// 		uni.showToast({
				// 			title: res.msg || '登录失败',
				// 			icon:'none'
				// 		});
				// 	}
				// 	this.loading = false;
				// })
				// .catch((err)=>{
				// 	this.loading = false;
				// 	wx.showToast({
				// 		title: err.msg || '登录失败',
				// 		icon:'none'
				// 	});
				// })
			},
			onLoginSuccess(code){
				uni.showToast({
					title: '登录成功',
					icon: 'none'
				});
				if(code == 1){
					var pages = getCurrentPages();
					setTimeout(()=>{
						if(pages && pages.length > 1){
						  uni.navigateBack({
							  delta:1,
						  });
						}else{
							uni.switchTab({
							  url: '/pages/my/index'
							});
						}
					}, 600)
				}else {
					uni.redirectTo({
						url: '/pagesUser/improveInfo/index'
					})
				}
				
			},
			// 抖动
			onShaking(){
				this.isShaking = true
				setTimeout(() => {
					this.isShaking = false
				}, 2000)
				return
			},
			// 手机号授权
			getphonenumber(event){
				this.wxPhone.visible = false
				console.log(event,'event')
				if (!event.detail.code) return uni.showToast({
					title: "微信手机号授权失败",
					icon: "none"
				});
				this.wxPhone.info.code =  event.detail.code;
				// if(this.wxUser.open){
				// 	this.wxUser.visible = true;
				// }else{
					this.getPhoneWX();
				// }
				
			},
			getPhoneWX(){
				this.SET_BIND_PHONE({
					...this.wxPhone.info,
					...this.wxUser.info
				}).then((res)=>{
					this.onLoginSuccess(2);
				}).catch(err=>{
					wx.showToast({
						title: err.msg || '登录失败',
						icon:'none'
					})
				})
				
			},
			// 获取用户名
			getUserProfile(flag){
				if(!flag){
					this.wxUser.visible = false;
					this.getPhoneWX();
					return; 
				}
				wx.getUserProfile({
					desc: '获取用户信息',
					lang: 'zh_CN',
					success: res =>{
						this.wxUser.info.avatar = res.userInfo.avatarUrl;
						this.wxUser.info.name = res.userInfo.nickName;
						this.wxUser.visible = false;
						this.getPhoneWX();
					},
					fail: err =>{
						this.wxUser.visible = false;
						this.getPhoneWX();
					}
				})
			
			},
			// 获取是否开启头像授权
			// async getWxUseStatus(){
			// 	var res = await api.getConfig('wx_user');
			// 	if(res.code == 0 && res.data == 1) this.wxUser.open = true;
			// },
		},
		onReady(){
			// this.getWxUseStatus();
		},
	}
</script>

<style lang="scss" scoped>
	.page{
		width: 100%;
		height: 100vh;
		background-color: $uni-bg-color3;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		// justify-content: center;
		position: relative;
		.top_box{
			margin-top: 200rpx;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 0 48rpx;
			box-sizing: border-box;
			// justify-content: center;
			image {
				width: 200rpx;
				height: 200rpx;
			}
			view {
				display: inline-block;
				text-align: center;
				margin-top: 30rpx;
				line-height: 50rpx;
				font-size: 36rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				color: #1d2129;
			}
			text {
				margin-top: 30rpx;
				line-height: 34rpx;
				font-size: 24rpx;
				font-family: PingFang HK, PingFang HK-Regular;
				color: #666666;
				letter-spacing: 0.24px;
			}
			.empower {
				margin-top: 106rpx;
				width: 100%;
				height: 94rpx;
				border-radius: 30rpx;
				line-height: 94px;
				background: $uni-button-bg;
				display: flex;
				align-items: center;
				justify-content: center;
				image {
					margin-right: 16rpx;
					width: 62rpx;
					height: 62rpx;
				}
				text {
					margin-top: 0;
					font-size: 32rpx;
					font-family: PingFang SC, PingFang SC-Medium;
					font-weight: 500;
					color: #ffffff;
				}
			}
		}
		.agreement {
			position: absolute;
			bottom: 120rpx;
			left: 0;
			width: 100%;
			padding: 0 60rpx;
			box-sizing: border-box;
			image{
				width: 30rpx;
				height: 30rpx;
				border-radius: 50%;
				vertical-align: middle;
				margin-right: 14rpx;
			}
			.icon {
				vertical-align: middle;
				display: inline-block;
				width: 30rpx;
				height: 30rpx;
				background: #ffffff;
				border: 2rpx solid #999;
				border-radius: 50%;
				box-sizing: border-box;
				margin-right: 14rpx;
			}
			text {
				vertical-align: middle;
				line-height:34rpx;
				font-size: 24rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
			}
			.file {
				display: inline;
				text {
					color: $theme;
				}
			}
		}
		
		.tip {
			height: 34rpx;
			font-size: 24rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			margin-bottom: 60rpx;
			text-align: center;
		}
	}
	.wx_phone{
		background-color: #fff;
		width: 100%;
		padding: 32rpx;
		box-sizing: border-box;
		box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
		.tip{
			font-size: 28rpx;
			line-height: 40rpx;
			margin-bottom: 40rpx;
		}
		.btn{
			display: flex;
			justify-content: space-between;
			button{
				flex: 1;
				height: 76rpx;
				line-height: 76rpx;
				border-radius: 38rpx;
				font-size: 28rpx;
				background-color: rgba(249,71,92,0.05);
				color: $theme;
			}
			button:nth-child(2){
				margin-left: 32rpx;
				color: #fff;
				background-color: rgba(249,71,92,0.8);
			}
		}
	}
	.shaking {
		animation: shakeX 0.8s;
	}
	
	@keyframes shakeX {
	
		from,
		to {
			transform: translate3d(0, 0, 0);
		}
	
		10%,
		30%,
		50%,
		70%,
		90% {
			transform: translate3d(-0.2rem, 0, 0);
		}
	
		20%,
		40%,
		60%,
		80% {
			transform: translate3d(0.2rem, 0, 0);
		}
	}
</style>