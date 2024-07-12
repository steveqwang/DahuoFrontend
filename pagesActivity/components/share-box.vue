<template>
	<view class="share">
		<u-popup v-model="visible" mode='bottom' width="100%" borderRadius="30" :maskCloseAble="false" :mask="true">
			<view class="share-box">
				<view class="title">分享</view>
					<view class="list-box">
						<block v-for="(item, index) in list" :key="index">
							<template v-if="!item.disable">
								<block v-if="item.key == 'sendFriends'">
									<button class="row-box"  open-type="share">
										<image :src="item.icon" mode="scaleToFill"></image>
										<text>{{item.title}}</text>
									</button>
								</block>
								<block v-else>
									<view class="row-box"   @click="handleModule(item)">
										<image :src="item.icon" mode="scaleToFill"></image>
										<text>{{item.title}}</text>
									</view>
								</block>
							</template>
						</block>
					</view>
				<view class="btn">
					<button @click="handleCancel()">取消</button>
				</view>
				<view class="bottom-occupy" ></view>
			</view>
		</u-popup>
		
		
	</view>
</template>

<script>
	import uPopup from '@/components/u-popup.vue';
	export default {
		props:{
		},
		components: {
			uPopup
		},
		data() {
			return {
				params: {},
				visible: false,
				loading: false,
				list: [],
			}
		},
		methods: {
			// 取消
			handleCancel() {
				this.visible = false;
			},
			// 点击
			handleModule(item){
				switch (item.key){
					case 'sendFriends':
						break;
					case 'poster':
						uni.navigateTo({
							url: `/pagesActivity/poster/index?id=${this.params.id}`
						});
						this.handleCancel();
						break;
					case 'copy':
						uni.navigateTo({
							url: `/pagesActivity/releaseActivity/index?id=${this.params.id}`
						});
						this.handleCancel();
						break;
									
				}
			},
			// 初始化
			init(params) {
				this.params = params;
				let right = ['copy', 'sendFriends', 'poster'];
				if(params.prohibitTemplates && !params.isSelf){ // 禁止使用模板
					right.splice(0,1);
				}
				for(let i = 0; i < this.list.length; i++) {
					let curI = right.indexOf(this.list[i].key);
					if(curI != -1) this.list[i].disable = false;
				}
				this.visible = true;
			}
		},
		onReady() {
			this.list = [
				{key: 'sendFriends', icon: require('../static/img/share01.png'), title: '发送微信好友', disable: false},
				{key: 'poster', icon: require('../static/img/share02.png'), title: '生成活动海报', disable: false},
				{key: 'copy', icon: require('../static/img/share03.png'), title: '复制活动信息', disable: true},
			];
		},
		watch: {
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/static/css/mixin.scss";
	.share-box {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		background: #ffffff;
		
		.title { 
			padding: 26rpx 24rpx;
			font-size: 34rpx;
			text-align: center;
			color: #333333;
			border-bottom: 2rpx solid #f8f8f8;;
		}
		.list-box {
			width: 100%;
			padding: 48rpx 42rpx 66rpx;
			box-sizing: border-box;
			display: flex;
			border-bottom: 12rpx solid #f8f8f8;
		}
		.row-box {
			flex: 1;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			background-color: #fff;
			>image {
				width: 82rpx;
				height: 82rpx;
				margin-bottom: 6rpx;
			}
			text {
				line-height: 34rpx;
				font-size: 24rpx;
				color: #121212;
			}
		}
		.btn {
			button {
				box-sizing: border-box;	
				padding: 50rpx;
				text-align: center;
				line-height: 42rpx;
				font-size: 30rpx;
				width: 100%;
				background-color: #fff;
			}
		}
		
	}
	.bottom-occupy {
		height: calc(constant(safe-area-inset-bottom) / 2);
		height: calc(env(safe-area-inset-bottom) / 2);
		width: 100%;
	}
	.delete-box {
		margin: 0 auto;
		width: 690rpx;
		box-sizing: border-box;
		background: #ffffff;
		border-radius: 30rpx;
		padding: 30rpx 40rpx;
		.title {
			padding: 20rpx 0 36rpx;
			line-height: 48rpx;
			font-size: 34rpx;
			text-align: center;
			color: #1d2129;
			letter-spacing: -0.44px;
		}
		>text {
			display: block;
			text-align: center;
			line-height: 40rpx;
			font-size: 28rpx;
			font-weight: 400;
			color: #666666;
			margin-bottom: 46rpx;
		}
		.btn {
			width: 100%;
			display: flex;
			justify-content: space-around;
			>button {
				flex: 1;
				height: 82rpx;
				text-align: center;
				line-height: 82rpx;
				background: #f6f7f9;
				border-radius: 30rpx;
				font-size: 30rpx;
				color: #666;
			}
			>button:nth-child(2){
				color: #fff;
				background: $theme;
				margin-left: 30rpx;
			}
		}
	}
</style>
