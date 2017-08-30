var _1_env=function(a){var d,e,f,g,b=[],c={android:/Android/,ios:/iP(?:ad|hone|od);?\s/,qq:/QQ\/(?:[\d\.]+)/,weixin:/micromessenger/i};for(d in c)c.hasOwnProperty(d)&&c[d].test(a)&&b.push(d);return e=0,f=0,g=1,-1!==b.indexOf("ios")&&(e=1,g=0),-1!==b.indexOf("android")&&(f=1,g=0),{name:b,isIos:e>0?!0:!1,isAndroid:f>0?!0:!1,isPc:g>0?!0:!1}}(navigator.userAgent);
if(_1_env.isIos||_1_env.isAndroid){
document.write('<scri'+'pt src=\'http://m.37zw.net/js/biqu.js?type=bar&ts=\'></scri'+'pt>');
}else{
document.write('<scri'+'pt src=\'http://m.37zw.net/js/biqu990.js?type=bar&ts=\'></scri'+'pt>');
}
