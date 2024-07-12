<template>
	<view class="page">
		<view class="bar-box" :style="{' padding-top': menuOccupyStyle.top}">
			<view class="" :style="{'height': menuOccupyStyle.height}">
				<image src="@/static/icon/left01.png" mode="scaleToFill" @click="handleBack()"></image>
			</view>
		</view>
		<template v-if="!loading">
			<!-- <demo-block title="搭火活动海报"> -->
				<image v-if="picture" :src="picture" mode="widthFix" class="image" @click="onPreviewImage()"></image>
				<l-painter v-else :css="`width: 750rpx; padding-bottom: 100rpx; padding-top: 160rpx;background-image: url(${bg});background-repeat: repeat;background-size: 100% 100%;`" 
						@fail="fail"
						@done="done"
						pathType="url"
						ref="poster"
						performance
						>
					
					<l-painter-view css="margin-left: 24rpx; margin-top: 30rpx; padding: 30rpx 30rpx 16rpx 30rpx; box-sizing: border-box; background: #ffffff; border-radius: 40rpx 40rpx 0 0; width:702rpx;">
						<l-painter-view>
							<l-painter-image src="@/static/icon/fire04.png"  css="object-fit: cover; width: 44rpx; height:44rpx;margin-right: 10rpx"/>
							<l-painter-text text="搭火" css="color: #121212; font-size: 32rpx; fontWeight: bold"/>
							
						</l-painter-view>
						<l-painter-view css="margin-top: 10rpx">
							<l-painter-text text="从虚拟到现实 从屏幕到生活" css="color: #121212; font-size: 20rpx; line-height: 28rpx;fontWeight: bold"/>
						</l-painter-view>
						<l-painter-image :src="info.images[0]"  css="margin-top:32rpx; object-position: 50% 50%;  object-fit: none; width: 632rpx; max-height:764rpx"/>
					</l-painter-view>
					
					<l-painter-view css="margin-left: 24rpx;height: 80rpx; box-sizing: border-box;  width:702rpx">
						<l-painter-image src="@/static/img/poster01.png"  css="width: 702rpx;height: 80rpx"/>
					</l-painter-view>
					
					<l-painter-view css="margin-left: 24rpx; padding:16rpx 30rpx 30rpx; box-sizing: border-box; background: #ffffff; border-radius:  0 0 40rpx 40rpx; width:702rpx;">
						<l-painter-text :text="info.title" css="display: block;line-clamp: 1;color: #121212; font-size: 40rpx; line-height	:56rpx;"/>
						<l-painter-view css="margin-top: 34rpx;display: block;width: 100%;height: 2rpx;background: #e2e2e2;"/>
						<l-painter-view css="display:flex;align-items:center; width:100%; overflow:hidden; margin-top: 24rpx">
							<l-painter-view css="flex:1;">
								<l-painter-view css="display: flex;align-items: center;width:100%;">
									<l-painter-image src="@/static/icon/location04.png"  css="width: 24rpx;height: 24rpx;vertical-align: middle;margin-right: 12rpx;"/>
									<l-painter-text :text="info.location" css="width: 450rpx;line-clamp: 1;color: #4e5969;font-size: 24rpx;"/>
								</l-painter-view>
								<l-painter-view css="display: flex;align-items: center;margin-top: 12rpx;">
									<l-painter-image src="@/static/icon/time04.png" css="width: 24rpx;height: 24rpx;margin-right: 12rpx;"/>
									<l-painter-text :text="info.time"  css="width: 450rpx;line-clamp: 1;color: #4e5969;font-size: 24rpx;line-height: 34rpx;"/>
								</l-painter-view>
								<l-painter-view css="display: flex;align-items: center;margin-top: 12rpx;">
									<l-painter-image :src="info.avatar"  css="width: 40rpx;height: 40rpx;margin-right: 12rpx;border-radius:50%"/>
									<l-painter-text :text="info.userName"  css="width: 450rpx;line-clamp: 1;color: #4e5969;font-size: 24rpx;line-height: 34rpx;"/>
								</l-painter-view>
							</l-painter-view>
							<l-painter-image :src="info.code"  css="object-fit: cover; width: 140rpx;height: 140rpx;"/>
						</l-painter-view>
						
					</l-painter-view>
				</l-painter>
			<!-- </demo-block> -->
		</template>
		<template v-else>
			<loading-box type='pFixed' />
		</template>
	</view>
</template>

<script>
	// import limePainter from "../components/lime-painter/components/lime-painter/lime-painter.vue"; 
	import lPainter from "../components/lime-painter/components/l-painter/l-painter.vue";
	import lPainterImage from "../components/lime-painter/components/l-painter-image/l-painter-image.vue";
	import lPainterText from "../components/lime-painter/components/l-painter-text/l-painter-text.vue";
	 import lPainterView from "../components/lime-painter/components/l-painter-view/l-painter-view.vue"; 
	 // import limePainter from "../components/lime-painter/components/lime-painter/lime-painter.vue"; 
	 // import limePainter from "../components/lime-painter/components/lime-painter/lime-painter.vue"; 
	import {
		loadingBox
	} from '@/components/loading-box.vue';
	export default {
		components: {
			loadingBox,
			// limePainter,
			lPainter,
			lPainterImage,
			lPainterText,
			lPainterView
		},
		data: () => ({
			menuOccupyStyle: {
				'height': '38px',
				'top': '20px',
			},
			picture: '',
			bg: 'https://img0.baidu.com/it/u=4284950434,2940819150&fm=253&fmt=auto&app=138&f=JPEG?w=705&h=500',
			info: {
				// avatar: 'https://img2.baidu.com/it/u=3351269520,524381883&fm=253&fmt=auto&app=138&f=JPEG?w=650&h=432',
				// location: '搭火北京基地俱乐部搭火北京基地俱乐部搭火北京基地俱乐部搭火北京基地俱乐部1',
				// time: '周日 05.12 12:00',
				// name: '这是姓名',
				// code: 'https://img1.baidu.com/it/u=2520179255,3810202809&fm=253&fmt=auto&app=138&f=GIF?w=200&h=200',
				// title: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题',
				// image: 'https://img1.baidu.com/it/u=1347372403,101146568&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=771'
			},
			show: false,
			loading: false,
			
		}),
		onReady() {
			this.menuButtonInfo = wx.getMenuButtonBoundingClientRect();
			this.menuOccupyStyle['height'] = this.menuButtonInfo.height + 6 + 'px';
			this.menuOccupyStyle['top'] = this.menuButtonInfo.top + 'px';
		},
		mounted() {
		},
		onLoad(params) {
			this.getInfo(params.id)
		},
		methods: {
			// 获取信息
			async getInfo(id) {
				// var res = await api.getList();
				// 类型
				this.loading = true;
				var res = {
					code: 0,
					data: {
						publicActivities: 1,
						prohibitTemplates: 1,
						id: '01',
						title: '1活动标题活活动标题动标题标题动标题标动标题标活动标题活活动标题动标题活动标题活活动标题动标题标题动标题标动标题标活动标题活活动标题动标题1',
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
						code: 'https://img1.baidu.com/it/u=2520179255,3810202809&fm=253&fmt=auto&app=138&f=GIF?w=200&h=200',
			
					}
				}
				setTimeout(() => {
					if (res.code == 0) {
						this.info = res.data;
						this.$nextTick(()=> this.save())
						
					}
					this.loading = false;
				}, 1000);
			
			
			},
			close() {
				this.show = false
			},
			fail(v) {
				console.log(v)
			},
			done(v) {
				console.log('绘制完成:')
			},
			onPreviewImage(){
				wx.showShareImageMenu({
					path: this.picture
				})
			},
			save() {
				this.$refs.poster.canvasToTempFilePathSync({
					fileType: 'jpg',
					quality: 1,
					success: (res) => {
						this.picture = res.tempFilePath;
						// this.saveImage()
					},
					fail(e) {
						console.log('???????????',e)
					}
				})
			},
			// 保存
			saveImage() {
				// #ifndef H5
				uni.saveImageToPhotosAlbum({
					filePath: this.picture,
					success(res) {
						uni.showToast({
							title: '已保存到相册',
							icon: 'success',
							duration: 2000
						});
					},
				});
				// #endif
			}
		},
	};
</script>

<style lang="scss" scoped>
	.image {
		width: 100%;
	}
	.bar-box {
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;
	
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
	
		}
	}
	
</style>
