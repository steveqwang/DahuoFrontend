<template>
	<view class="eventRegistration">
		<view class="info-box">
			<form-box :formManage="formManage" :formInfo="formInfo" ref="formBox">
				<view v-for="(item, index) in formManage" :key="index"  class="info-row">
					<form-row :info="item" :options="item.options" v-model="formInfo[item.key]"   :verification="isVerification"/>
				</view>
			</form-box>
			<view class="info-tip">
				注：参与活动请阅读 <text  class="file" @click.stop="handleDetails(fileList[0])">{{fileList[0].lable}}</text>
			</view>
		</view>
		<template v-if="!loading">
			<view class="tip-box">
				<image src="../static/icon/tip01.png" mode="scaleToFill"></image>
				Tips：<text>{{info.timeEnd}} </text> 前可取消报名
			</view>
			<view class="bottom-box" >
				<view class="agreement" :class='{shaking:isShaking }' @click="isCheckbox = !isCheckbox">
					<image src="@/static/icon/radio01.png" mode="aspectFit" v-if="isCheckbox"></image>
					<text v-else class="icon"></text>
					<text >支付即代表同意并阅读 </text>
					<text  class="file" @click.stop="handleDetails(fileList[1])">{{fileList[1].lable}}</text>
				</view>
				<view class="pay">
					<view class="left">
						费用：<view class="">¥<text>{{info.price}}</text>/人
						</view>
					</view>
					<button :loading="saveLoading" @click="handleSave()">支付</button>
				</view>
				<view class="bottom-occupy"></view>
			</view>
		</template>
		<joinedSuccessfully ref="joinedSuccessfully" @change="changeJoinedSuccessfully"/>
	</view>
</template>

<script>
	import formRow from '../components/form-row.vue';
	import formBox from '../components/form-box.vue';
	import joinedSuccessfully from '../components/joined-successfully.vue';
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	export default {
		name: 'activityRegistration',
		title: '活动报名',
		components: {
			formRow,
			joinedSuccessfully,
			formBox,
		},
		filters: {},
		data() {
			return {
				fileList:[
					{ lable: '《报名须知》', id: 'bmxz' },
					{ lable: '《平台支付协》', id: 'ptzfxy' },
				],
				isCheckbox: false,
				isShaking: false,
				formInfo: {
					name: '',
					telephone: '',
					emergencyName: '',
					emergencyTelephone: '',
				},
				formManage: [],
				info: {},
				saveLoading: false,
				loading: false,
				isVerification: false,
			}
		},
		computed: {
			...mapGetters(['USER_INFO', 'SYSTEMP_INFO'])
		},
		onLoad(params) {
			this.getInfo(params.id);
			this.init();
			this.getApplicationInfo();
		},
		methods: {
			// 详情
			handleDetails(row){
				uni.navigateTo({
					url:`/pagesActivity/fileDetails/index?id=${row.id}&type=agreement&title=${row.lable}`
				})
			},
			// 抖动
			onShaking(){
				this.isShaking = true
				setTimeout(() => {
					this.isShaking = false
				}, 2000)
				return
			},
			// 提交
			async handleSave(){
				this.isVerification = true;
				let flag = await this.$refs.formBox.validate();
				if(!flag) return uni.showToast({ title:'请检查填写信息！', icon:'none'});
				if(!this.isCheckbox) return this.onShaking();
				this.saveLoading = true;
				console.log(this.formInfo)
				setTimeout(()=>{
					this.$refs.joinedSuccessfully.init(this.inof);
					this.saveLoading = false;
				},500)
			},
			// 成功
			changeJoinedSuccessfully(){
				uni.navigateBack({
					delta: 1,
				});
			},
			async getApplicationInfo() {
				// var res = await api.getList();
				var res = {
					code: 0,
					data: {
						name: '小王',
						telephone: '18833333333',
						emergencyName: '小张',
						emergencyTelephone: '18833333331'
					}
				}
				setTimeout(() => {
					if (res.code == 0 && res.data) {
						this.formInfo.name = res.data.name;
						this.formInfo.telephone = res.data.telephone;
						this.formInfo.emergencyName = res.data.emergencyName;
						this.formInfo.emergencyTelephone = res.data.emergencyTelephone;
					}
					this.loading = false;
				}, 1000);
							
			},
			// 获取信息
			async getInfo() {
				// var res = await api.getList();
				// 类型
				this.loading = true;
				var res = {
					code: 0,
					data: {
						publicActivities: 1,
						prohibitTemplates: 1,
						id: '01',
						title: '活动标题活活动标题动标题标题动标题标动标题标活动标题活活动标题动标题活动标题活活动标题动标题标题动标题标动标题标活动标题活活动标题动标题1',
						price: '29.9',
						timeEnd: '2024-12-1212:99',
						collect: 500,
						browse: 1342,
						numberTotle: 12,
						numberExists: 4,
						images: ['http://img1.baidu.com/it/u=3203226843,2454860967&fm=253&app=138&f=JPEG?w=800&h=1200'],
						time: '周日 5.12 12:00',
						location: '搭火俱乐部',
						locationDesc: '北京市朝阳区朝阳北路朝阳镇北京市朝阳区朝阳北路朝阳镇北京市朝阳区朝阳北路朝阳镇',
						avatar: 'https://img2.baidu.com/it/u=1558538035,2795382626&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360',
						userName: '江湖人',
						introduction: '活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介   活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简介活动简999999介',
						
			
					}
				}
				setTimeout(() => {
					if (res.code == 0) {
						this.info = res.data;
					}
					this.loading = false;
				}, 1000);
			},
			
			// 初始化
			init(){
				this.formManage = [
					{label: '姓名', key: 'name', type: 'input', require: true},
					{label: '联系电话', key: 'telephone',type: 'input', inputtype: 'number', require: true, regularFun: 'validatorTelAndPhone'},
					{label: '紧急联系人姓名', key: 'emergencyName', type: 'input', require: true},
					{label: '紧急联系人电话', key: 'emergencyTelephone', type: 'input', inputtype: 'number', require: true, regularFun: 'validatorTelAndPhone'}
				]
			},
			
		},
		onShareAppMessage(res) {
			// api.setShare({id: this.id});
			setTimeout(()=>{
				// this.info.share ++ ;
				this.changeJoinedSuccessfully('share');
			},1000);
			
			return {
				title: '搭火',
				imageUrl: this.info.images[0] ,
				desc: this.info.title,
				path:`/pagesActivity/activityDetails/index?id=${this.info.id}`
			}
		},
		onShareTimeline(res) {
			setTimeout(()=>{
				// this.info.share ++ ;
				this.changeJoinedSuccessfully('share');
			},1000)
			return {
				title: '搭火',
				imageUrl: this.info.images[0] ,
				desc: this.info.title,
				path:`/pagesActivity/activityDetails/index?id=${this.info.id}`
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import "@/static/css/mixin.scss";
	.eventRegistration{
		width: 100%;
		padding: 30rpx 24rpx 280rpx;
		box-sizing: border-box;
	}
	.info-box {
		width: 100%;
		background: #fff;
		padding: 50rpx 24rpx;
		box-sizing: border-box;
		border-radius: 30rpx;
		// .info-row {
		// 	margin-bottom: 40rpx;
		// }
	}
	.info-tip {
		margin-top: 30rpx;
		line-height: 40rpx;
		font-size: 28rpx;
		font-family: PingFang SC, PingFang SC-Regular;
		text {
			color: $theme;
		}
	}
	.tip-box {
		width: 702rpx;
		height: 68rpx;
		background: #ffffff;
		border-radius: 16rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		transition: all 0.8s;
		position: inherit;
		margin: 40rpx auto;
		image {
			width: 36rpx;
			height: 36rpx;
			margin-right: 10rpx;
		}
	
		text {
			color: $theme;
			padding-right: 8rpx;
		}
	
	}
	
	.agreement {
		padding-bottom: 24rpx;
		border-bottom: 2rpx solid #f7f7f8;
		image{
			width: 32rpx;
			height: 32rpx;
			vertical-align: middle;
			margin-right: 14rpx;
		}
		.icon {
			vertical-align: middle;
			display: inline-block;
			width: 32rpx;
			height: 32rpx;
			background: #ffffff;
			border: 2rpx solid #999;
			box-sizing: border-box;
			margin-right: 14rpx;
			border-radius: 8rpx;
		}
		text {
			vertical-align: middle;
			line-height:40rpx;
			font-size: 28rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
		}
		.file {
			display: inline;
			color: $theme;
		}
	}
	.pay {
		font-weight: normal;
		margin-top: 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		overflow: hidden;
		.left {
			flex: 1;
			font-size: 28rpx;
			line-height: 40rpx;
			view {
				display: inline;
				color: $theme;
				letter-spacing: 1.5px;
				text {
					font-family: DIN Alternate, DIN Alternate-Bold;
					font-size: 42rpx;
					letter-spacing: 1px;
					
				}
			}
		}
		button {
			margin-left: 10rpx;
			width: 308rpx;
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			background: $theme;
			border-radius: 30rpx;
			font-size: 30rpx;
			font-weight: 500;
			color: #ffffff;
		}
	}
	.bottom-box {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		padding: 24rpx;
		box-sizing: border-box;
		background: #ffffff;
		box-shadow: 0px 0px 12px 0px rgba(238,239,241,0.50); 
		
		.bottom-occupy {
			height: calc(constant(safe-area-inset-bottom) / 2);
			height: calc(env(safe-area-inset-bottom) / 2);
			width: 100%;
		}
	}
	
	.shaking {
		animation: shakeX 0.6s;
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