<template>
	<view class="link-box" @click="changeOpen ">
		<view class="item" :style="open?'left:-200rpx;padding-left:200rpx;':'left:0;'">
			<image :src="icon" class="icon"></image>
			<text class="social-media-name">{{ title }}</text>
			<switch  color="#F9475C" :checked="checked" @change="toggleSwitch()"></switch>
		</view>
		<!-- 中间层 -->
		<view class="item-m" :style="open?'left:-100rpx;':'left:0;'" @click="edit">
			<view class="icon-in">
				<image src="../../static/image/edit.png" mode=""></image>
			</view>
		</view>
		<!-- 最下层 -->
		<view class="item-b" @click.stop="del">
			<view class="icon-in">
				<image src="../../static/image/del.png" mode=""></image>
			</view>
		</view>
		
		<dz-alert :show="showAlert" @close="showAlert=false"></dz-alert>
	</view>
</template>

<script>
	export default {
		name: "dz-link",
		props: ['title', 'icon'],
		data() {
			return {
				checked: true,
				open: false,
				can:true,
				showAlert:false
			};
		},
		methods: {
			changeOpen(){
				if (!this.can ) {
					return
				}
				this.open=!this.open
			},
			toggleSwitch() {
				console.log(111)
				this.can = false
				setTimeout(()=>{this.can = true},500)
			},
			edit(){
				console.log("on edit")
			},
			del(){
				console.log("on delete")
				this.showAlert = true
			}
		}
	}
</script>

<style lang="scss">
	
	*{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	
	.link-box {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		cursor: pointer;
		border-radius: 20rpx;
		overflow: hidden;
		border-radius: 50px;
		width: 100%;
		height: 100rpx;

		.item,
		.item-m,
		.item-b {
			position: absolute;
			top: 0;
			bottom: 0;
			width: 100%;
			display: flex;
			align-items: center;
			transition: all .3s;
			border-radius: 50px;
			
			.icon-in{
				width: 50rpx;
				height: 50rpx;
				position: absolute;
				right: 30rpx;
				
			}
			
			.icon-in image{
				width: 100%;
				height: 100%;
			}
		}

		.item {
			z-index: 5;
			background: #fff;
			padding: 0 20rpx;
			border: 2rpx solid #fff;
		}

		.item-m {
			background: #6351D9;
			z-index: 4;
			width: calc(100% - 2rpx);
		}

		.item-b {
			background: #A7A7A7;
			z-index: 3;
		
			width: calc(100% - 2rpx);
		}

	}



	.icon {
		width: 80rpx;
		/* 调整宽度 */
		height: 80rpx;
		/* 调整高度 */
		margin-right: 40rpx;
		background: #efefef;
		border-radius: 50%;
	}

	.social-media-name {
		flex: 1;
		font-size: 28rpx;
		font-weight: bold;
		/* 加粗 */
	}
</style>