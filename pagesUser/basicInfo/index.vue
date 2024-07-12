<template>
	<view class="page">

		<view class="bar-box" :style="{' padding-top': menuOccupyStyle.top}">
			<view class="" :style="{'height': menuOccupyStyle.height}">
				<image src="@/static/icon/left02.png" mode="scaleToFill" @click="handleBack()"></image>
				<text>基本资料</text>
			</view>
		</view>
		<!-- 占位 -->
		<view :style="{'height': menuOccupyStyle.height,' padding-top': menuOccupyStyle.top}"></view>
		<view class="list-box">
			<block v-for="(item, index) in formManage" :key="index">
				<view class="list-row" @click="handleEdit(item)">
					<view class="left">
						<text v-if="item.require" class="require">*</text>
						{{item.label}}
					</view>
					<!-- 头像 -->
					<template v-if="item.key == 'avatar'">
						<view class="right">
							<view class="right-text right-text-avatar">
								<image :src="userInfo.avatar" mode="aspectFill" v-if="userInfo.avatar"></image>
								<image src="@/static/img/avatar01.png" mode="aspectFill" v-else></image>
							</view>
							<image class="icon" src="@/static/icon/right02.png" mode="aspectFit"></image>
						</view>
					</template>
					<template v-else-if="item.key == 'gender'">
						<view class="right-region">
							<picker mode="selector" :range="item.options" @change="changeGender" range-key="title"
								:title="item.label">
								<view class="right">
									<view class="right-text">
										{{userInfo.gender ? userInfo.gender == 2 ? '女':'男' :'请选择性别'}}
									</view>
									<image class="icon" src="@/static/icon/right02.png" mode="aspectFit"></image>
								</view>
							</picker>
						</view>
					</template>

					<!-- 封面图片 -->
					<template v-else-if="item.key == 'img'">
						<view class="right">
							<view class="right-text ">
								点击更换
							</view>
							<image class="icon" src="@/static/icon/right02.png" mode="aspectFit"></image>
						</view>
					</template>
					<!-- 出生年月日 -->
					<template v-else-if="item.key == 'birthday'">
						<view class="right">
							<view class="right-text ">
								{{userInfo[item.key] || ''}}
							</view>
							<image class="icon" src="@/static/icon/right02.png" mode="aspectFit"></image>
						</view>
					</template>
					<!-- 位置 -->
					<template v-else-if="item.key == 'region'">
						<view class="right-region">
							<city-options :defaultRegion="userInfo.district_id" @getRegion="handleGetRegion">
								<view class="right">
									<view class="right-text">{{address ? address : '请选择区域'}}</view>
									<image class="icon" src="@/static/icon/right02.png" mode="aspectFit"></image>
								</view>
							</city-options>
						</view>

					</template>
					<!-- normal -->
					<template v-else>
						<view class="right">
							<view class="right-text ">
								{{userInfo[item.key] || ''}}
							</view>
							<image class="icon" src="@/static/icon/right02.png" mode="aspectFit"></image>
						</view>
					</template>

				</view>

			</block>

		</view>
		<u-popup v-model="curEdit.visible" mode='bottom' width="100%" height="100vh" :maskCloseAble="false"
			:mask="true">
			<view class="edit-box">
				<view class="bar-box" :style="{' padding-top': menuOccupyStyle.top}">
					<view class="" :style="{'height': menuOccupyStyle.height,}">
						<image src="@/static/icon/left02.png" mode="scaleToFill" @click="handleBack('edit')"></image>
						<text>{{curEdit.row.label}}编辑</text>
					</view>
				</view>
				<view class="content">
					<view class="">
						<view class="content-error" v-if="curEdit.row.require && curEdit.verification &&  !curEdit.value">
							{{curEdit.row.placeholder || `请${curEdit.row.type == 'select' ? '选择' : '输入'}${curEdit.row.label}`}}
						</view>
						<block v-if="curEdit.row.key == 'birthday'">
							<picker-date :defaultValue="curEdit.value" @change="changeBirthday" style="width: 100%;"
								ref="pickerDate" />
						</block>
						
						<block v-else-if="curEdit.row.key == 'phone'">
							<view class="input-box">
								<input class="input" type="number" :maxlength="11" v-model="curEdit.value"
									:placeholder="`请输入您的${curEdit.row.label}`" placeholder-class="placeholder" />
							</view>
						</block>
						<block v-else-if="curEdit.row.key == 'name'">
							<view class="textarea-box">
								<view class="" >
									{{curEdit.value ? curEdit.value.length : 0}}/10
								</view>
								<textarea class="input" :maxlength="10" v-model="curEdit.value"
									:placeholder="`请输入您的${curEdit.row.label}`" placeholder-class="placeholder" />
							</view>
						</block>
						<block v-else>
							<view class="textarea-box">
								<textarea class="input" :maxlength="100" v-model="curEdit.value"
									:placeholder="`请输入您的${curEdit.row.label}`" placeholder-class="placeholder" />
							</view>
						</block>
					</view>
				</view>
				<view class="bottom-box">
					<button :loading="loading" @click="handleSave()">提交</button>
					<view class="bottom-occupy"></view>
				</view>

			</view>
		</u-popup>
		<userBgImg ref="userBgImg" />
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	// import * as api from '@/utils/Interface/basics.js'
	import {
		cityOptions
	} from '@/components/city-options/index.vue';
	import {
		pickerDate
	} from '../components/picker-date.vue';
	import {
		userBgImg
	} from '@/components/user-bgImg.vue';
	import {
		uPopup
	} from '@/components/u-popup.vue';

	export default {
		components: {
			uPopup,
			pickerDate,
			userBgImg,
			cityOptions,
		},
		data() {
			return {
				menuOccupyStyle: {
					'height': '38px',
					'top': '20px',
				},
				address: '',
				loading: false,
				loadingU: false,
				userInfo: {
					// birthday: ''
					// img: '',
					// real_name: '',
					// name: '',
					// phone: '',
					// sex: '',
					// district_id: '',
					// city_id:'',
					// province_id:''
				},
				formManage: [],
				curEdit: {
					loading: false,
					visible: false,
					value: '',
					verification: false,
					row: {}
				},
			}
		},

		computed: {
			...mapState(['USER_INFO', 'TEMPORARY_USER'])
		},
		methods: {
			...mapMutations(['SET_USER_INFO', 'SET_TEMPORARY_USER']),
			// 返回
			handleBack(type) {
				if (type) {
					this.curEdit.loading = false;
					this.curEdit.visible = false;
					this.curEdit.value = false;
					this.curEdit.verification = false;
					this.curEdit.row = {};
				} else {
					uni.navigateBack({
						delta: 1
					});
				}
			},
			// 编辑
			handleEdit(row) {
				switch (row.key) {
					case 'avatar':
						this.$refs.userBgImg.init('avatar');
						break;
					case 'img':
						this.$refs.userBgImg.init('img');
						break;
					case 'gender':
						break;
					case 'region':
						break;
					default:
						this.curEdit.visible = true;
						this.curEdit.value = this.userInfo[row.key];
						this.curEdit.row = row;
						break;
				}
				console.log(row.key)
			},
			changeGender(e) {
				this.$set(this.userInfo, 'gender', e.detail.value == 1 ? 2 : 1)
				// this.handleSave
			},
			// 生日
			changeBirthday(e) {
				this.curEdit.value = e;
			},
			handleGetRegion(e) {
				this.address = e.name.join('');
				this.userInfo.province_id = e.code[0];
				this.userInfo.city_id = e.code[1];
				this.userInfo.district_id = e.code[2];
			},
			async handleSave() {
				this.curEdit.verification = true;
				if (this.curEdit.row.require && this.curEdit.verification && !this.curEdit.value) return uni
			.showToast({
					title: "请检查填写信息",
					icon: 'none'
				});
				this.loading = true
				// // var res = await api.setUser({
				// // 	img:this.userInfo.img,
				// // 	name:this.userInfo.name,
				// // 	real_name:this.userInfo.real_name,
				// // 	sex:Number(this.userInfo.sex),
				// // 	district_id:this.userInfo.district_id,
				// // 	city_id: this.userInfo.city_id,
				// // 	province_id: this.userInfo.province_id
				// // })
				// // if(res.code == 0){
				// this.loading = false
				// // 	this.SET_USER_INFO(this.userInfo)
				this.userInfo[this.curEdit.row.key] = this.curEdit.value;
				uni.showToast({
					title: '保存成功',
					icon: 'none'
				});
				this.loading = false;
				this.handleBack('edit');
				// }else{
				// 	this.loading =  false
				// }


			},

			async getU() {
				this.userInfo = JSON.parse(JSON.stringify(this.USER_INFO));
				// var user = await api.getUser()
				// if(user.code == 0){
				// 	this.$store.commit('SET_USER_INFO',user.data)
				// 	this.userInfo =  Object.assign({}, this.USER_INFO)
				// }
			},
			// 初始化
			init() {
				this.formManage = [{
						label: '头像',
						key: 'avatar',
						require: true
					},
					{
						label: '昵称',
						key: 'name',
						require: true
					},
					{
						label: '性别',
						key: 'gender',
						require: true,
						options: [{
							title: '男',
							value: 1
						}, {
							title: '女',
							value: 2
						}]
					},
					{
						label: '封面图片',
						key: 'img'
					},
					{
						label: '手机号',
						key: 'phone'
					},
					{
						label: '出生年月日',
						key: 'birthday'
					},
					{
						label: '位置',
						key: 'region'
					},
					{
						label: '学校',
						key: 'school'
					},
					{
						label: '职业',
						key: 'career'
					},
					{
						label: '兴趣爱好',
						key: 'hobby'
					},
					{
						label: '偏向',
						key: 'preference'
					},
				]
			},
		},
		onShow() {
			// if (this.TEMPORARY_USER) {
			// 	this.userInfo.img = this.TEMPORARY_USER.img
			// 	this.userInfo.real_name = this.TEMPORARY_USER.real_name
			// 	this.userInfo.name = this.TEMPORARY_USER.name
			// }
		},
		onReady() {
			this.menuButtonInfo = wx.getMenuButtonBoundingClientRect();
			this.menuOccupyStyle['height'] = this.menuButtonInfo.height + 6 + 'px';
			this.menuOccupyStyle['top'] = this.menuButtonInfo.top + 'px';
		},
		onLoad() {
			this.init();
			this.getU();
		}

	}
</script>

<style lang="scss" scoped>
	.bar-box {
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;
		background-color: #fff;

		>view {
			width: 100%;
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				left: 24rpx;
				width: 40rpx;
				height: 40rpx;
			}

			text {
				font-size: 28rpx;
				color: #000000;
			}
		}
	}

	.edit-box {
		width: 100%;
		height: 100vh;
		background: #f6f7f8;
		display: flex;
		flex-direction: column;

		.bar-box {
			position: relative;
		}

		.content {
			flex: 1;
			overflow-y: scroll;
			background-color: #f6f7f8;
			padding-bottom: 40rpx;
			position: relative;
			box-sizing: border-box;
			padding: 24rpx;
			box-sizing: border-box;
			>view {
				position: relative;
				padding-bottom: 40rpx;
			}
			.content-error {
				position: absolute;
				content: '';
				left: 0;
				bottom: 10rpx;
				font-size: 20rpx;
				line-height: 20rpx;
				color: $theme;
			}

			.input {
				margin-top: 12rpx;
				line-height: 40rpx;
				font-size: 28rpx;
				height: 100rpx;
				--border: 2rpx solid #d8d8d8;
				width: 100%;
				box-sizing: border-box;
				padding: 30rpx 20rpx;
				border: var(--border);
				border-radius: 16rpx;
				background-color: #fff;
			}

			.placeholder {
				color: #999999!important;
				font-size: 28rpx;
			}

			.textarea-box {
				>view {
					line-height: 34rpx;
					font-size: 24rpx;
					color: #999999;
					margin-bottom: 24rpx;
					font-family: PingFang SC, PingFang SC-Medium;
				}

				.input {
					height: 186rpx;
				}
			}

		}

		.bottom-box {
			width: 100%;
			padding: 24rpx 30rpx;
			box-sizing: border-box;
			background: #ffffff;
			box-shadow: 0px 0px 12px 0px rgba(238, 239, 241, 0.50);

			button {
				width: 100%;
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
				background: $uni-button-bg;
				border-radius: 30rpx;
				font-size: 30rpx;
				font-family: PingFang HK, PingFang HK-Medium;
				font-weight: 500;
				color: #ffffff;
			}

			.bottom-occupy {
				height: calc(constant(safe-area-inset-bottom) / 2);
				height: calc(env(safe-area-inset-bottom) / 2);
				width: 100%;
			}
		}

	}

	.list-box {
		width: 100%;
		padding: 0 20rpx 0 30rpx;
		box-sizing: border-box;
		background-color: #fff;

		.list-row {
			padding: 38rpx 0;
			border-bottom: 2rpx solid rgba(0, 0, 0, 0.05);
			line-height: 42rpx;
			font-size: 30rpx;
			font-family: PingFang HK, PingFang HK-Regular;
			color: #333333;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.require {
				color: $theme;
				margin-right: 10rpx;
			}

			.right-region {
				margin-left: 10rpx;
				flex: 1;
			}

			.right {

				flex: 1;
				display: flex;
				align-items: center;

				.right-text {
					min-height: 42rpx;
					;
					flex: 1;
					text-align: right;
				}

				.right-text-avatar {
					image {
						width: 96rpx;
						height: 96rpx;
						border-radius: 50%;
					}
				}

				.icon {
					margin-left: 6rpx;
					width: 32rpx;
					height: 32rpx;
				}
			}
		}

	}

	// .list {
	// 	background-color: #fff;
	// 	padding: 0 20rpx 0 30rpx;
	// 	width: 100%;
	// 	box-sizing: border-box;

	// 	.row {
	// 		padding: 30rpx 0 28rpx;
	// 		border-bottom: 2px solid #fafafa;
	// 		display: flex;
	// 		justify-content: space-between;
	// 		align-items: center;

	// 		// &:last-child {
	// 		// 	border: 0;
	// 		// }

	// 		.left {
	// 			font-size: 28rpx;
	// 			color: #333;
	// 			line-height: 40rpx;
	// 		}

	// 		.right {
	// 			width: calc(100% - 4em);
	// 			display: flex;
	// 			justify-content: flex-end;
	// 			align-items: center;
	// 			font-size: 28rpx;
	// 			line-height: 40rpx;
	// 			color: #666666;

	// 			.right_left {
	// 				width: calc(100% - 50rpx);
	// 				text-align: right;
	// 			}

	// 			image {
	// 				width: 84rpx;
	// 				height: 84rpx;
	// 				border-radius: 50%;
	// 			}
	// 		}
	// 	}
	// }
</style>