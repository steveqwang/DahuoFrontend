<template>
	<view class="form-row-box">
		<view class="form-error" v-if="row.require && verification &&  !this.getRegular()">
			{{row.regularText || row.placeholder || `请${row.type == 'select' ? '选择' : '输入'}${row.label}`}}
		</view>
		<slot :name="row.key">
			<view class="label" v-if="row.label">
				<image :src="row.icon" mode="aspectFit" v-if="row.icon"></image>
				<text v-if="row.require" class="require">*</text>
				{{row.label}}
			</view>
			<view class="content">
			<template v-if="row.type == 'textarea'">
				<textarea class="text border-box textarea" :maxlength="-1" :style="{'--border': inputBorder, height: row.textareaH || ''}"  v-model="activeCurrent" :placeholder="row.placeholder ? row.placeholder : `请输入${row.label}`" @focus="onFocus" @blur="onBlur" />
			</template>
			<view class="select-box" v-else-if="row.type == 'select'">
				<view class="select-input border-box" @click="handleSelectFold()" :style="{'--border': inputBorder}">
					<text class="text" v-if="activeCurrent">
						{{selectManage.label}}
					</text>
					<text v-else class="text placeholder" >{{row.placeholder ? row.placeholder : `请选择${row.label}`}}</text>
					<image src="@/static/icon/down03.png" mode="scaleToFill" :class=" selectManage.visible ? 'image-top' : ''"></image>
				</view>
				<view class="select-box-occupy">
					<scroll-view :class="{'select-list-active': selectManage.visible}"  class="select-list" scroll-y="true" :scroll-into-view="selectManage.activeCId" >
						<view class="row" :class="{'row-active': item[row.optionsValue || optionsValue] == activeCurrent}" v-for="(item, index) in options" :key="index" @click="onChangeSelect(item)">
							<text class="text">{{item[row.optionsLabel || optionsLabel]}}</text>
							<view class="line"></view>
						</view>
					</scroll-view>
				</view>
			</view>
			<view class="select-lump" v-else-if="row.type == 'select-lump'">
				<view class="row" :class="{'row-active': item[row.optionsValue || optionsValue] == activeCurrent}" v-for="(item, index) in options" :key="index" @click="onChangeSelect(item)">
					<text class="text">{{item[row.optionsLabel || optionsLabel]}}</text>
				</view>
			</view>
			
			<view v-else-if="row.type == 'images'" class="images-box">
				<template v-if="activeCurrent && activeCurrent.length">
					<view class="images-row" v-for="(item, index) in activeCurrent" :key="index" @click="handleImgUpload(index)">
						<image :src="item" mode="aspectFit"></image>
						<image class="icon" src="@/static/icon/close01.png" mode="scaleToFill" @click.stop="handleImgClose(index)"></image>
					</view>
				</template>
				<template v-if="activeCurrent.length < row.maxNum">
					<view class="images-row" @click="handleImgUpload()">
						<image src="../static/img/upload01.png" mode="aspectFit"></image>
					</view>
					<view class="images-tip">最多上传9张</view>
				</template>
			</view>
			<view v-else-if="row.type == 'date'" class="select-box">
				<view class="select-input border-box" @click="handleDateVisible()" :style="{'--border': inputBorder}">
					<text class="text" v-if="activeCurrent">
						{{activeCurrent}}
					</text>
					<text v-else class="text placeholder" >{{row.placeholder ? row.placeholder : `请选择${row.label}`}}</text>
					<image src="@/static/icon/down03.png" mode="scaleToFill" :class=" selectManage.visible ? 'image-top' : ''"></image>
				</view>
				<uni-calendar :date="activeCurrent" ref="calendar" :insert="false"
					@confirm="onChangeDate" />
			</view>
			<view v-else-if="row.type == 'region'" class="select-box">
				<city-options :defaultRegion="activeCurrent" @getRegion="handleGetRegion">
					<view class="select-input border-box"  :style="{'--border': inputBorder}">
						<text class="text" v-if="activeCurrent">
							{{selectManage.label}}
						</text>
						<text v-else class="text placeholder" >{{row.placeholder ? row.placeholder : `请选择${row.label}`}}</text>
						<image src="@/static/icon/down03.png" mode="scaleToFill" :class=" selectManage.visible ? 'image-top' : ''"></image>
					</view>
				</city-options>
			</view>
			<template v-else>
				<template v-if="row.inputtype == 'number'">
					<input class="border-box text" :style="{'--border': inputBorder}" type="number" v-model="activeCurrent" @focus="onFocus" @blur="onBlur" :placeholder="row.placeholder ? row.placeholder : `请输入${row.label}`" placeholder-class="placeholder">
				</template>
				<template v-else>
					<input class="border-box text" :style="{'--border': inputBorder}" type="text" v-model="activeCurrent" @focus="onFocus" @blur="onBlur" :placeholder="row.placeholder ? row.placeholder : `请输入${row.label}`" placeholder-class="placeholder">
				</template>
			</template>
		</view>
		</slot>
	</view>
</template>

<script>
	import regularObj from "@/utils/validate";
	import {
		uniCalendar
	} from '@/components/uni-calendar/uni-calendar.vue';
	import {
		cityOptions
	} from '@/components/city-options/index.vue';
	export default {
		model: {
		    prop: "value",
		    event: "input",
		},
		components: {
			uniCalendar,
			cityOptions,
		},
		props: {
			value: {
			  type: [String, Array, Object, Number],
			  default: "",
			},
			info: {
				type: Object,
				default: () => {}
			},
			options: {
				type: [Array, null],
				default: [],
			},
			verification: { // 是否校验
				type: Boolean,
				default: false,
			},
		},
		
		data() {
			return {
				activeCurrent: '',
				inputBorder: '',
				selectManage: {
					visible: false,
					activeCId: '',
					label: '',
				},
				regularObj:  regularObj,
				row: {},
				optionsLabel: 'label',
				optionsValue: 'value',
			}
		},
		watch: {
			info: {
				handler(val){
					 this.row = val;
				},
				immediate: true,
				deep: true,
			},
			value: {
				handler(val){
					 this.activeCurrent = val;
				},
				immediate: true,
				deep: true,
			},
			activeCurrent: {
				handler(val){
					if(this.row.type == 'select'){
						this.selectManage.activeCId = `c${val}`;
						if(!this.options) return;
						let curI = this.options.findIndex(c=> c[this.row.optionsValue || this.optionsValue] == this.activeCurrent);
						if(curI != -1) this.selectManage.label = this.options[curI][this.row.optionsLabel || this.optionsLabel];
						
					}
					this.onChange()
				},
				immediate: true,
			},
		},
		methods: {
			// 聚焦
			onFocus() {
				this.inputBorder = '2rpx solid #010101';
			},
			// 失焦
			onBlur(){
				this.inputBorder = '2rpx solid #d8d8d8';
			},
			// 收缩
			handleSelectFold() {
				this.selectManage.visible = !this.selectManage.visible;
				if(this.selectManage.visible){
					this.onFocus();
				}else {
					this.onBlur();
				}
			},
			// 正则
			getRegular(){
				let flag = true;
				if(this.row.regularFun) {
					this.row.regularText = this.regularObj[this.row.regularFun](this.row, this.activeCurrent);
					flag = !this.row.regularText;
				}
				if(!this.row.require) return flag;
				switch (this.row.type){
					case 'images':
						if(!this.activeCurrent.length)  flag = false;
						break;
					default: // input、textarea、select
						if(!this.activeCurrent && this.activeCurrent !== 0)  flag = false;
						break;
				}
				return flag;
				
			},
			// 更改
			onChange(){
				this.$emit('input', this.activeCurrent);
			},
			// 更改
			onChangeSelect(row) {
				this.activeCurrent = row[this.row.optionsValue || this.optionsValue];
				this.selectManage.label = row[this.row.optionsLabel || this.optionsLabel]
				this.$emit('input', this.activeCurrent);
				this.selectManage.visible = false;
				this.onBlur();
			}, 
			// 打开的时间选择
			handleDateVisible() {
				this.$refs.calendar.open();
			},
			// 更改时间
			onChangeDate(e) {
				this.activeCurrent = e.fulldate;
				this.$emit('input', this.activeCurrent);
			},
			// 更改区域
			handleGetRegion(row) {
				this.activeCurrent = row.code.join(',');
				this.selectManage.label = row.name.join('');
				this.$emit('input', this.activeCurrent);
			},
			// 图片 - 上传
			handleImgUpload(index) {
				let position = 0 ;
				if(index || index === 0)  position = 1;
				
				uni.chooseImage({
					count: position == 1 ? 1 :  this.row.maxNum - this.activeCurrent,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'], //从相册选择
					success: (res) => {
						uni.showLoading({
							mask: false
						})
						for (let i = 0; i < res.tempFilePaths.length; i++) {
							if(position == 1) {
								this.activeCurrent.splice(index, 1, res.tempFilePaths[i])
							}else {
								this.activeCurrent = [...this.activeCurrent, res.tempFilePaths[i]]
							}
							// this.$upload(res.tempFilePaths[i]).then(result => {
							// 	if (result.code == 0) {
								
								// if(position == 1) {
								// 	this.activeCurrent = [...this.activeCurrent, result.data[0]]
								// }else {
								// 	this.activeCurrent.split(index, 1, result.data[0])
								// }
							// 		
							// 		if (i == res.tempFilePaths.length - 1) {
										this.$forceUpdate();
										
										uni.hideLoading()
							// 		}
							// 	}
							// })

						}
					}
				});
			},
			// 图片 - 删除
			handleImgClose(index) {
				this.activeCurrent.splice(index, 1);
			},
		},
		onReady() {
		},
	}
</script>

<style lang="scss" scoped>
	@import "@/static/css/mixin.scss";
	.form-row-box {
		padding-bottom: 40rpx;
		position: relative;
	}
	.form-error {
		position: absolute;
		content: '';
		left: 0;
		bottom: 10rpx;
		font-size: 20rpx;
		line-height: 20rpx;
		color: $theme;
	}
	.label {
		width: 100%;
		line-height: 40rpx;
		font-size: 28rpx;
		font-family: PingFang HK, PingFang HK-Medium;
		// font-weight: 500;
		text-align: left;
		color: #464748;
		margin-bottom: 24rpx;
		display: flex;
		align-items: center;
		image {
			width: 40rpx;
			height: 40rpx;
			margin-left: 6rpx;
		}
	}
	.require {
		font-family: PingFang HK, PingFang HK-Medium;
		font-weight: 500;
		text-align: left;
		color: $theme;
		letter-spacing: 3px;
	}
	.text {
		line-height: 40rpx;
		font-size: 28rpx;
	}
	.border-box {
		--border: 2rpx solid #d8d8d8;
		width: 100%;
		box-sizing: border-box;
		padding: 30rpx 20rpx;
		border: var(--border);
		border-radius: 16rpx;
		min-height: 100rpx;
	}
	.textarea {
		height: 204rpx;
	}
	.select-box {
		width: 100%;
		.select-input {
			display: flex;
			align-items: center;
			overflow: hidden;
			>text{
				flex: 1;
				@include ellispsis1();
			}
			.image-top {
				transform: rotate(180deg);
			}
			image {
				transition: all 0.3s;
				width: 40rpx;
				height: 40rpx;
			}
		}
		.select-box-occupy {
			position: relative;
			width: 100%;
		}
		.select-list {
			position: absolute;
			z-index: 92;
			left: 0;
			top: 0;
			width: 100%;
			height: 0rpx;
			transition: all 0.2s;
			background: #fff;
			border-radius: 0px 0px 10rpx 10rpx;
			padding: 0 20rpx;
			box-sizing: border-box;
			.row {
				color: #606266;;
				.text {
					display: block;
					padding: 20rpx 0;
					text-align: center;
				}
				.line {
					width: 100%;
					height: 2rpx;
					opacity: 0.6;
					background: #f2f2f2;
					border-radius: 2rpx;
				}
				&:last-child {
					.line {
						display: none;
					}
				}
			}
			.row-active {
				color: #121212;;
			}
		}
		.select-list-active {
			height: auto;
			max-height: 426rpx;
			border: 2rpx solid #e4e7ed;
			box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
			border-top: 0;
		}
	}
	.select-lump {
		display: flex;
		flex-wrap: wrap;
		margin-right: -24rpx;
		margin-bottom: -30rpx;
		.row {
			display: inline-block;
			min-width: calc((100% -  72rpx) / 3);
			font-size: 28rpx;
			line-height: 40rpx;
			padding: 24rpx 20rpx;
			box-sizing: border-box;
			border: 2rpx solid #d8d8d8;
			border-radius: 16rpx;
			margin-right: 24rpx;
			margin-bottom: 30rpx;
			text-align: center;
		}
		.row-active {
			background-color: $theme;
			border: 2rpx solid $theme;
			color: #ffffff;
		}
	}
	.images-box {
		display: flex;
		flex-wrap: wrap;
		.images-row {
			margin-right: 24rpx;
			margin-bottom: 24rpx;
			position: relative;
			background-color: rgba(0,0,0,0.05);
			border-radius: 16rpx;
			image {
				width: 180rpx;
				height: 180rpx;
				border-radius: 16rpx;
				
			}
			.icon {
				position: absolute;
				right: -15rpx;
				top: -15rpx;
				height: 40rpx;
				width: 40rpx;
			}
		}
		.images-tip {
			margin-bottom: 24rpx;
			align-self: flex-end;
			line-height: 34rpx;
			font-size: 24rpx;
			color: #999999;
		}
	}
	
</style>