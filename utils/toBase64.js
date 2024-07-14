//解决小程序端真机图片不展示
/**
 * 获取本地图
 * @param folder // 文件夹名字 如 /static/images/home
 * @param fileName // 文件名 如 home-bg
 * @param format // 文件类型 如 png jpg
 * @returns {*|string}
 */


export const urlToBase64 = (folder, fileName, format = "png") => {
    console.log('urlTobase64   ')
	let img = `@/static/${folder}/${fileName}.${format}`

    console.log('bolin --- img', img)
	// 如果是微信小程序环境，返回base64Url
	// #ifdef MP-WEIXIN
	let imgBase64 = wx.getFileSystemManager().readFileSync(img, "base64"),
		base64Url = `data:image/png;base64,${imgBase64}`;

    console.log('bolin -- base64Url ', base64Url)
	return base64Url;
};
