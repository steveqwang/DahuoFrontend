<template>
	<view class="more-features">
		<u-popup v-model="visible" mode='bottom' width="100%" borderRadius="30" :maskCloseAble="false" :mask="true">
			<view class="more-features-box">
				<view class="title">更多功能</view>
					<view class="list-box">
						<block v-for="(item, index) in list" :key="index">
							<view class="row-box"  v-if="!item.disable" @click="handleModule(item)">
								<image :src="item.icon" mode="scaleToFill"></image>
								<text>{{item.title}}</text>
							</view>
						</block>
					</view>
				<view class="btn">
					<button @click="handleCancel()">取消</button>
				</view>
				<view class="bottom-occupy" ></view>
			</view>
		</u-popup>
		<!-- 删除 -->
		<u-popup v-model="deleteManage.visible" mode='center' width="94%" borderRadius="30" :maskCloseAble="false" :mask="true">
			<view class="delete-box">
				<view class="title">{{deleteManage.title}}</view>
				<text>{{deleteManage.content}}</text>
				<view class="btn">
					<button @click="handleDeleteCancel()">取消</button>
					<button @click="handleDeleteSave()" :loading="deleteManage.loading">确认</button>
				</view>
			</view>
		</u-popup>
		<!-- 权限 -->
		<u-popup v-model="authorityManage.visible" mode='bottom' width="100%" borderRadius="30" :maskCloseAble="false" :mask="true">
			<view class="authorityManage-box">
				<view class="title">{{authorityManage.title}}</view>
				<image class="icon" src="@/static/icon/close01.png" mode="scaleToFill" @click="handleAuthorityCancel()"></image>
				<view class="list-box">
					<view class="list-row" @click="handleAuthorityChange(item)" v-for="(item, index) in authorityManage.list" :key="index" :class="{'active': authorityManage[item.key] === item[item.key]}">
						<text class="">{{item.title}}</text>
						<view class=""></view>
					</view>
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
				deleteManage: {
					visible: false,
					title: '删除活动',
					content: '您的活动将被删除，确认删除',
					loading: false,
				},
				authorityManage: {
					visible: false,
					title: '权限设置',
					prohibitTemplates: 1,
					publicActivities: 1,
					list: [
						{ title: '允许用户使用此模版', prohibitTemplates: 1 , key: 'prohibitTemplates',},
						{ title: '禁止用户使用此模版', prohibitTemplates: 2, key: 'prohibitTemplates', },
						{ title: '公开此活动', publicActivities: 1 , key: 'publicActivities',},
						{ title: '不公开此活动', publicActivities: 2 ,key: 'publicActivities',},
					],
					loading: false,
				}
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
					case 'report':
						uni.navigateTo({
							url: `/pagesActivity/report/index?id=${this.params.id}`
						});
						this.handleCancel();
						break;
					case 'copy':
						break;
					case 'authority':
						this.authorityManage.publicActivities = this.params.publicActivities;
						this.authorityManage.prohibitTemplates = this.params.prohibitTemplates;
						this.authorityManage.visible = true;
						this.handleCancel();
						break;
					case 'edit':
						break;
					case 'cancel':
						this.deleteManage.visible = true;
						this.handleCancel();
						break;
					case 'exit':
						uni.navigateTo({
							url: `/pagesActivity/exitActivity/index?id=${this.params.id}`
						});
						this.handleCancel();
						break;
									
				}
			},
			// 删除-取消
			handleDeleteCancel(){
				this.deleteManage.visible = false;
			},
			// 删除-确定
			async handleDeleteSave() {
				this.deleteManage.loading = true;
				// let res = await ()
				// if(res.code == 0){
					setTimeout(()=>{
						this.deleteManage.loading = false;
						this.handleDeleteCancel();
						this.$emit('change', {type: 'cancel'})
					},500)
				// }else {
					// this.deleteManage = false;
				// 	uni.showToast({
				// 		title:res.msg,
				// 		icon:'none'
				// 	});
				// }
			},
			// 权限-取消
			handleAuthorityCancel(){
				this.authorityManage.visible = false;
			},
			async handleAuthorityChange(row) {
				if(this.authorityManage[row.key] == row[row.key]) return;
				this.authorityManage[row.key] = row[row.key];
				this.authorityManage.loading = true;
				// let res = await ()
				// if(res.code == 0){
					setTimeout(()=>{
						this.authorityManage.loading = false;
						this.$emit('change', {type: 'authority'})
					},500)
				// }else {
					// this.authorityManage = false;
				// 	uni.showToast({
				// 		title:res.msg,
				// 		icon:'none'
				// 	});
				// }
			},
			// 初始化
			init(params) {
				this.params = params;
				let right = [];
				if(params.isSelf == 1){ // 自己
					right = ['copy', 'authority', 'edit', 'cancel'];
				}else if(params.isParticipants == 1){ // 参与者
					right = [ 'copy', 'report','exit']
				}else {
					right = [ 'copy', 'report']
				}
				if(params.prohibitTemplates == 1 && params.isSelf != 1){ // 禁止使用模板
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
				{key: 'report', icon: require('../static/icon/features01.png'), title: '举报', disable: true},
				{key: 'copy', icon: require('../static/icon/features02.png'), title: '复制活动', disable: true},
				{key: 'authority', icon: require('../static/icon/features03.png'), title: '权限设置', disable: true},
				{key: 'edit', icon: require('../static/icon/features04.png'), title: '编辑活动', disable: true},
				{key: 'cancel', icon: require('../static/icon/features05.png'), title: '取消活动', disable: true},
				{key: 'exit', icon: require('../static/icon/features06.png'), title: '退出活动', disable: true},
			];
		},
		watch: {
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/static/css/mixin.scss";
	.more-features-box {
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
	.authorityManage-box {
		width: 100%;
		height: 100%;
		padding: 60rpx 48rpx 40rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		background: #ffffff;
		position: relative;
		color: $uni-text-color;
		.title {
			font-size: 34rpx;
			line-height: 48rpx;
			text-align: center;
			color: #070707;
			margin-bottom: 40rpx;
		}
		.icon {
			position: absolute;
			right: 28rpx;
			top: 28rpx;
			width: 36rpx;
			height: 36rpx;
		}
		.list-box {
			.list-row {
				width: 100%;
				padding: 0 30rpx;
				box-sizing: border-box;
				height: 120rpx;
				border-radius: 30rpx;
				display: flex;
				justify-content: space-between;
				border: 2rpx solid transparent;
				align-items: center;
				&:nth-child(3){
					margin-top: 20rpx;
				}
				>text {
					line-height: 40rpx;
					font-size: 28rpx;
				}
				>view {
					transition: all 0.2s;
					width: 64rpx;
					height: 36rpx;
					background-color: #eaeaea;
					position: relative;
					border-radius: 18rpx;
					&::before {
						position: absolute;
						content: '';
						left: 6rpx;
						top: 50%;
						transform: translateY(-50%);
						height: 28rpx;
						width: 28rpx;
						border-radius: 14rpx;
						background-color: #fff;
					}
				}
			}
			.active {
				border: 2rpx solid #dedede;
				>view {
					background-color: $theme;
					&::before {
						right: 6rpx;
					}
				}
			}
		}
	}
	
</style>
