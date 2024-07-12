<template>
    <view>
       <!-- <page-head :title="title"></page-head>
        <view class="uni-padding-wrap">
			<view class="uni-title">
				日期：{{year}}年{{month}}月{{day}}日
			</view>
		</view> -->
        <picker-view v-if="visible" :indicator-style="indicatorStyle" :mask-style="maskStyle" :value="value" @change="bindChange">
            <picker-view-column>
                <view class="item" v-for="(item,index) in years" :key="index">{{item}}</view>
            </picker-view-column>
            <picker-view-column>
                <view class="item" v-for="(item,index) in months" :key="index">{{item}}</view>
            </picker-view-column>
            <picker-view-column>
                <view class="item" v-for="(item,index) in days" :key="index">{{item}}</view>
            </picker-view-column>
        </picker-view>
    </view>
</template>

<script>
    export default {
		props: {
			defaultValue: {
				type: String,
				default: '',
			},
		},
        data () {
            const date = new Date()
            const years = []
            const months = []
            const days = []
        
			const dateDefault = new Date('2001-06-01')
			const year = dateDefault.getFullYear();
			const month = dateDefault.getMonth() + 1
			const day = dateDefault.getDate()
			
            for (let i = 1900; i <= date.getFullYear(); i++) {
                years.push(i)
            }

            for (let i = 1; i <= 12; i++) {
                months.push(i > 10 ? i : '0' + i)
            }

            for (let i = 1; i <= 31; i++) {
                days.push(i > 10 ? i : '0' + i)
            }
            return {
                title: 'picker-view',
                years,
                year,
                months,
                month,
                days,
                day,
                value: [year - 1900, month - 1, day - 1],
				/**
				 * 解决动态设置indicator-style不生效的问题
				 */
                visible: true,
                // indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`
                indicatorStyle: `height: 50px;`,
				// #ifdef MP-KUAISHOU
				maskStyle: "padding:10px 0"
				// #endif
				// #ifndef MP-KUAISHOU
				maskStyle: ""
				// #endif
            }
        },
		watch: {
			defaultValue: {
				handler(val){
					if(val){
						let dateDefault = new Date(val)
						let year = dateDefault.getFullYear();
						let month = dateDefault.getMonth() + 1
						let day = dateDefault.getDate()
						this.value  = [year - 1900, month - 1, day - 1];
					}
					
				},
				immediate: true,
			}
		},
        methods: {
            bindChange (e) {
                const val = e.detail.value
                this.year = this.years[val[0]]
                this.month = this.months[val[1]]
                this.day = this.days[val[2]]
				this.$emit('change', `${this.year}-${this.month}-${this.day}`)
				console.log(`${this.year}-${this.month}-${this.day}`,1)
            }
        }
    }
</script>

<style>

    picker-view {
        width: 100%;
        height: 600rpx;
        margin-top:20rpx;
    }

    .item {
        line-height: 100rpx;
        text-align: center;
    }
</style>
