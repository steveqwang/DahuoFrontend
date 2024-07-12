import store from '../store/index.js';
var baseUrl = '';
// const system = wx.getAccountInfoSync();
// let env = system.miniProgram;
// if (env.envVersion == 'develop' || env.envVersion == 'trial') {
	console.log("开发、体验版");
	baseUrl = 'https://testzc.taotaotao.xyz/api/'
// } else {
// 	console.log("正式");
// 	baseUrl = 'https://zc.taotaotao.xyz/api/'
// }

exports.baseUrl = baseUrl;

// exports.envVer = env.envVersion;

exports.onPreview = function(value) {
	return uni.previewImage({
		current: 0,
		urls: value,
	});
}

exports.onCopy = function(content,text) {
	uni.setClipboardData({
		data: content,
		success: function () {
			uni.showToast({
				title: text || "已复制",
				icon:'none'
			})
		},
		fail: function(){
			uni.showToast({
				title: "复制失败",
				icon:'none'
			})
		}
	});
}

exports.onUpdateApp = function() {
    var updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      var hasUpdate = res.hasUpdate;
      if (hasUpdate) {
        updateManager.onUpdateReady(function () {
          wx: wx.showModal({
            title: '更新提示',
            content: '检测到有最新版本，请您更新。',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                updateManager.applyUpdate();
              }
            }
          })
        })
        updateManager.onUpdateFailed(function () {
          wx: wx.showModal({
            title: '更新提示',
            content: '网络开小差，请您重新启动。',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                updateManager.applyUpdate();
              }
            }
          })
        })
      }
    });
  },


exports.onOpenArea = function(latitude, longitude) {
	if (!latitude || !longitude) return uni.showToast({
		title: '获取位置失败',
		icon: 'none'
	})
	uni.openLocation({
		latitude: Number(latitude),
		longitude: Number(longitude),
		success: res => {},
		fail: err => {
			uni.showToast({
				title: '获取位置失败',
				icon: 'none'
			})
		}
	});
}
// 格式化时间
exports.parseTime = function(time, cFormat, type) {
	if (arguments.length === 0) {
		return null;
	}
	const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
	let date;
	if (typeof time == 'object') {
		date = time;
	} else {

		if (!isNaN(parseFloat('time'))) {
			if (('' + time).length === 10) time = parseInt(time) * 1000;
			date = new Date(time);
		} else {
			if (time) {
				var time1 = time.replace(/-/g, ':').replace(' ', ':').replace(/\//g, ':')
				time = time1.split(':');
				if (time.length >= 2) time[1]--
				date = new Date(...time);
			} else {
				date = new Date(time);
			}
		}
	}
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay()
	};
	const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
		let value = formatObj[key];
		if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
		if (result.length > 0 && value < 10) {
			value = '0' + value;
		}
		return value || 0;
	});
	return time_str;
}
exports.formatFloat = function (arg1, arg2, operation) {
  var r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  switch (operation) {
    case 1:
      return ((arg1 * m + arg2 * m) / m).toFixed(2);
      break;
    case 2:
      return ((arg1 * m - arg2 * m) / m).toFixed(2);
      break;
    case 3:
      return Number((arg1 * m * arg2 * m) / (m * m)).toFixed(2);
      break;
    case 4:
      return Number(arg1 / arg2).toFixed(2);
      break;
    default:
      break;
  }
}
// 长按保存图片
exports.onSaveImg = function(url) {
	wx.showActionSheet({
		itemList: ['保存到相册'],
		success(res) {
			//用户需要授权
			wx.getSetting({
				success: (res) => {
					uni.showLoading()
					if (!res.authSetting['scope.writePhotosAlbum']) {
						wx.authorize({
							scope: 'scope.writePhotosAlbum',
							success: () => {
								// 同意授权
								saveImg1();
							},
							fail: (res) => {
								uni.hideLoading()
								console.log(res);
							}
						})
					} else {
						// 已经授权了
						saveImg1();
					}
				},
				fail: (res) => {
					uni.hideLoading();
					uni.showToast({
						title: '已拒绝保存图片到相册',
						icon: 'none'
					});
					console.log(res);
				}
			})

			function saveImg1() {
				wx.getImageInfo({
					src: url,
					success: (res) => {
						let path = res.path;
						wx.saveImageToPhotosAlbum({
							filePath: path,
							success: (res) => {
								uni.showToast({
									title: '已保存到相册',
									icon: 'none'
								});
							},
							fail: (res) => {
								uni.hideLoading();
								uni.showToast({
									title: '保存失败',
									icon: 'none'
								});
							}
						})
					},
					fail: (res) => {
						uni.hideLoading();
						uni.showToast({
							title: '保存失败',
							icon: 'none'
						});
					}
				})
			}
		},
	})
}

// 处理数字变成单位为 千、万、千万、亿
exports.bigNumberTransform = function(value) {
  const newValue = ['', '', '']
  let fr = 1000
  let num = 3
  let text1 = ''
  let fm = 1
  while (value / fr >= 1) {
    fr *= 10
    num += 1
    // console.log('数字', value / fr, 'num:', num)
  }
    if(num == 4){
       newValue[0] = value + ''
       newValue[1] = ''
    }
  else if (num <= 4) { // 千
    newValue[0] = parseInt(value / 1000) + ''
    newValue[1] = '千'
  } else if (num <= 8) { // 万
    text1 = parseInt(num - 4) / 3 > 1 ? '千万' : '万'
    // tslint:disable-next-line:no-shadowed-variable
    fm = text1 === '万' ? 10000 : 10000000
    if (value % fm === 0) {
      newValue[0] = parseInt(value / fm) + ''
    } else {
      newValue[0] = parseFloat(value / fm).toFixed(2) + ''
    }
    newValue[1] = text1
  } else if (num <= 16) { // 亿
    text1 = (num - 8) / 3 > 1 ? '千亿' : '亿'
    text1 = (num - 8) / 4 > 1 ? '万亿' : text1
    text1 = (num - 8) / 7 > 1 ? '千万亿' : text1
    // tslint:disable-next-line:no-shadowed-variable
    fm = 1
    if (text1 === '亿') {
      fm = 100000000
    } else if (text1 === '千亿') {
      fm = 100000000000
    } else if (text1 === '万亿') {
      fm = 1000000000000
    } else if (text1 === '千万亿') {
      fm = 1000000000000000
    }
    if (value % fm === 0) {
      newValue[0] = parseInt(value / fm) + ''
    } else {
      newValue[0] = parseFloat(value / fm).toFixed(2) + ''
    }
    newValue[1] = text1
  }
  if (value < 9999) {
    newValue[0] = value + ''
    newValue[1] = ''
  }
  return newValue.join('')
}