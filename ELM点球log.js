//const CryptoJS = require('crypto-js');


var levelcount = 1;
var gameData = {
    path: [{
        startX: 55,
        startY: -625,
        endX: 375.7900560180421,
        endY: -175.36477594442815,
        angle: 109.49422630822824
    }],
    time: 573,
    start: 1555,
    end: 1477.3,
    acceleration: -95,
    goalLeftX: -103.16900000000001,
    goalLeftY: 405.274,
    goalRightX: 214.319,
    goalRightY: 261.425
}

var config = {
    bizNo: '20240615',
    actId: '20240607104839750167646796',
    gameToken: '',
    bizScene: 'FOOTBALL_SUMMER',
    longitude: '113.210668931',
    latitude: '23.210668931',
    offset: 0,
    currentTimestamp: 1718430772900,
    endtime: 1718463943023,
    startTime: 1718463942363,
    difftime:865

}

var level = [{}, {
    ballSpeed: 1500,
    ballAcceleration: -150,
    ballEndSpeed: 1401,
    goalLeft: {
        x: -158.169,
        y: 350.274
    },
    goalRight: {
        x: 159.319,
        y: 206.425
    },
    ballPath: [{
        x: 0,
        y: -680
    }, {
        x: -14.8322054622245,
        y: 296.0411035742107
    }]
},{
    ballSpeed: 1500,
    ballAcceleration: -150,
    ballEndSpeed: 1436.55,
    goalLeft: {
        x: -158.169,
        y: 350.274
    },
    goalRight: {
        x: 159.319,
        y: 206.425
    },
    ballPath: [{
        x: 0,
        y: -680
    }, {
      x: -14.8322054622245,
      y: 296.0411035742107
    }]
}]


var elmbody = {
    bizNo: config.bizNo,
    actId: config.actId,
    gameToken: config.gameToken,
    bizScene: config.bizScene,
    pass: true,
    gameData: gameData,
    check: null,
    longitude: config.longitude,
    latitude: config.latitude
}

param = {
    requset: null
}



function CalculateBalllocation() {


    elmbody.bizNo = config.bizNo,
        elmbody.actId = config.actId,
        elmbody.gameToken = config.gameToken,
        elmbody.bizScene = config.bizScene,
        elmbody.pass = true;
    var speed = level[levelcount].ballSpeed + level[levelcount].ballAcceleration * config.difftime/ 1e3;
    elmbody.gameData = {
        path: [],
        time: config.difftime + config.offset,
        start: level[levelcount].ballSpeed + config.offset,
        end: speed + config.offset,
        acceleration: level[levelcount].ballAcceleration + config.offset,
        goalLeftX: level[levelcount].goalLeft.x + config.offset,
        goalLeftY: level[levelcount].goalLeft.y + config.offset,
        goalRightX: level[levelcount].goalRight.x + config.offset,
        goalRightY: level[levelcount].goalRight.y + config.offset
    }

    var c = new Vector2(level[levelcount].ballPath[0].x, level[levelcount].ballPath[0].y),
        f = new Vector2(level[levelcount].ballPath[1].x, level[levelcount].ballPath[1].y),
        h = toDegree(new Vector2(1, 0).signAngle(f.clone().subtract(c.clone()).normalize()));


    elmbody.gameData.path.push({
        startX: c.x + config.offset,
        startY: c.y + config.offset,
        endX: f.x + config.offset,
        endY: f.y + config.offset,
        angle: h + config.offset
    });



}


function GetCheckMD5(_gameData, _config) {
    var str = "".concat(_gameData, "&").concat(_config.gameToken);
    return hex_md5(str);
}

function toDegree(radian) {
    return radian * (180 / Math.PI);
}


class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }


    clone() {
        return new Vector2(this.x, this.y);
    }


    subtract(v) {
        return new Vector2(this.x - v.x, this.y - v.y);
    }


    normalize() {
        const length = Math.sqrt(this.x * this.x + this.y * this.y);
        return new Vector2(this.x / length, this.y / length);
    }


    dot(v) {
        return this.x * v.x + this.y * v.y;
    }


    cross(v) {
        return this.x * v.y - this.y * v.x;
    }

    signAngle(v) {
        const normalizedThis = this.normalize();
        const normalizedV = v.normalize();

        const dotProduct = normalizedThis.dot(normalizedV);
        const crossProduct = normalizedThis.cross(normalizedV);

        return Math.atan2(crossProduct, dotProduct);
    }
}


function GetBallParam(_levelcount, offsetCount, gameToken, currentTimestamp, endtime, bizNo, actId,difftime) {
    levelcount = _levelcount;
    config.offset = offsetCount;
    config.currentTimestamp = currentTimestamp;
    config.startTime = currentTimestamp;
    config.endtime = endtime;
    config.gameToken = gameToken;
    config.bizNo = bizNo;
    config.actId = actId;
    config.difftime =difftime;

    CalculateBalllocation(config);
    var json = JSON.stringify(elmbody.gameData);
    elmbody.check = GetCheckMD5(json, config);

    param.requset = elmbody;

    return JSON.stringify(param);



}

function GetGameTokenrandom(){
    var e = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function (e) {
        var t = 16 * Math.random() | 0;
        return ("x" === e ? t : 3 & t | 8).toString(16)
    }));
    return e;
}

var hexcase = 0;  
var b64pad  = ""; 
var chrsz   = 8;  

function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
function str_md5(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }
 
function core_md5(x, len)
{
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
 
  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
 
    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);
 
    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);
 
    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);
 
    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);
 
    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);
 
}
 
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}
 
function core_hmac_md5(key, data)
{
  var bkey = str2binl(key);
  if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);
 
  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }
 
  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
}
 
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}
 
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}
 
function str2binl(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
  return bin;
}
 
function binl2str(bin)
{
  var str = "";
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < bin.length * 32; i += chrsz)
    str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
  return str;
}
 
function binl2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
  }
  return str;
}
 
function binl2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}

//获取游戏token gamestart
console.log(GetGameTokenrandom());
//获取游戏日志 步数 偏移 token，开始时间，结束时间，游戏id,活动id，耗时
console.log(GetBallParam(2, 34, '8b93a845-e1e6-4ce4-af64-88a15688625c', 1718818000287, 1718818001000, '20240615', '20240607104839750167646796',831));
