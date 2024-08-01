
// 表单验证联系方式 电话和手机均可
function validatorTelAndPhone(params, value) {
  let s = trim(value);
  if (!s) {
      return params.require ? params.placeholder || `请${params.type == 'select' ? '选择' : '输入'}${params.label}` : ''
  } else {
      if (!(/^(((\d{3,4}-)?[0-9]{7,8})|(1(3|4|5|6|7|8|9)\d{9}))$/.test(s))) {
          return `${params.label}格式不正确`
      } else {
          return ''
      }
  }

}

// 表单检验银行账号
export function validatorBankAccount(params, value) {
  let s = trim(value);
  if (!s) {
      return params.require ? params.placeholder || `请${params.type == 'select' ? '选择' : '输入'}${params.label}` : ''
  } else {
      if (/[\u4E00-\u9FA5]/g.test(s)) {
          return `${params.label}格式不正确`
      } else {
          return ''
      }
  }

}

// 表单检验身份证校验
function validatorIdentityCardNo(params, value) {
  let s = trim(value);
  if (!s) {
      return params.require ? params.placeholder || `请${params.type == 'select' ? '选择' : '输入'}${params.label}` : ''
  } else {
      if (!/^[1-9]\d{5}(18|19|2([0-9]))\d{2}(0[0-9]|10|11|12)([0-2][1-9]|30|31)\d{3}[0-9Xx]$/.test(s)) {
          return `${params.label}格式不正确`
      } else {
          return ''
      }
  }

}

// 过滤左右空格
function trim(s) {
  return trimRight(trimLeft(s));
}
// 去掉左边的空白
function trimLeft(s) {
  if (s == null) {
      return "";
  }
  var whitespace = new String(" \t\n\r");
  var str = new String(s);
  if (whitespace.indexOf(str.charAt(0)) != -1) {
      var j = 0,
          i = str.length;
      while (j < i && whitespace.indexOf(str.charAt(j)) != -1) {
          j++;
      }
      str = str.substring(j, i);
  }
  return str;
}

//去掉右边的空白
function trimRight(s) {
  if (s == null) return "";
  var whitespace = new String(" \t\n\r");
  var str = new String(s);
  if (whitespace.indexOf(str.charAt(str.length - 1)) != -1) {
      var i = str.length - 1;
      while (i >= 0 && whitespace.indexOf(str.charAt(i)) != -1) {
          i--;
      }
      str = str.substring(0, i + 1);
  }
  return str;
}

export default {
	validatorTelAndPhone,
	validatorBankAccount,
	validatorIdentityCardNo,
	
}

