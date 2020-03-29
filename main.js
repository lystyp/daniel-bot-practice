'use strict';

var KEYWORD_GAME_START = '終極密碼'
var TOP = 1000
var DOWN = 0


// https://dwatow.github.io/2018/01-13-heroku-node-mvp/
// 參考這個網址部屬heroku

// -------------------------------------------------------------------------------------------------------------------

// https://at.line.me/tw/plan Line 方案介紹

// 引用linebot SDK
var linebot = require('linebot');

// 用於辨識Line Channel的資訊
var bot = linebot({
  channelId: process.env.channelId,
  channelSecret: process.env.channelSecret,
  channelAccessToken: process.env.channelAccessToken
});

// 當有人傳送訊息給Bot時
bot.on('message', function (event) {
  // event.message.text是使用者傳給bot的訊息
  // 使用event.reply(要回傳的訊息)方法可將訊息回傳給使用者
  console.log("Get : " + event.message.text);
  var replyStr = getReply(event.message.text);
  if (replyStr != undefined){
    event.reply(replyStr).then(function (data) {
      // 當訊息成功回傳後的處理
      console.log("Reply success.");
    }).catch(function (error) {
      // 當訊息回傳失敗後的處理
      console.log("Reply Fail, error : " + String(error));
    });
  }
});

// Bot所監聽的webhook路徑與port
bot.listen('/', process.env.PORT || 8000, function () {
    console.log('[BOT已準備就緒]');
});


// GameStatusManager
var gameStatusManager = {
  isStart : false, 
  bomb : -1, 
  range : {
    up : TOP, 
    down : DOWN  
  }
}



var reply_str = {
  guess_in_range : ' @down ~ @up , 猜猜猜',
  got_the_bomb : '爆啦~~~~~~' 
}

var good = ["我做好了，但是還是沒有獎勵", "什麼獎勵?", "你不能自己給自己鼓勵嗎?"];
var bad = ["我做好了，但是還是沒有懲罰...", "你這要求已經是在懲罰我了", "給你99懲罰表"];

function getReply(s){
  if(s == '阿保'){
    return '彰化彭于晏'
  }

  if(s == '哈囉'){
    return '有事?'
  }
  
  if(s == '我要獎勵'){
    return good[parseInt(Math.random()*3)]
  }

  if(s == '我要懲罰'){
    return bad[parseInt(Math.random()*3)]
  }

  if(s == '你走開'){
    return "你才走開 ˋOˊ"
  }

  if(s == '陳怡君'){
    return "你走開"
  }

  if (s == KEYWORD_GAME_START){
    initGameStatus();
    return reply_str.guess_in_range.replace('@up', gameStatusManager.range.up).replace('@down', gameStatusManager.range.down)
  } else {
    if (!gameStatusManager.isStart){
      return undefined
    }
    var n = parseInt(s);
    if (n < gameStatusManager.range.up &&  n > gameStatusManager.range.down){
      if (n == gameStatusManager.bomb){
        endGameStatus();
        return reply_str.got_the_bomb;
      } else if (n > gameStatusManager.bomb){
        gameStatusManager.range.up = n
        return reply_str.guess_in_range.replace('@up', gameStatusManager.range.up).replace('@down', gameStatusManager.range.down)
      } else if (n < gameStatusManager.bomb){
        gameStatusManager.range.down = n
        return reply_str.guess_in_range.replace('@up', gameStatusManager.range.up).replace('@down', gameStatusManager.range.down)
      }
    }else{
      return undefined
    } 
  } 
}


function initGameStatus(){
  gameStatusManager.isStart = true
  var n = parseInt(Math.random() * (TOP - DOWN));
  if(n > TOP - 1) {
    n = TOP - 1;
  } else if (n < DOWN + 1) {
    n = DOWN + 1;
  }
  gameStatusManager.bomb = n
  gameStatusManager.range.up = TOP
  gameStatusManager.range.down = DOWN
  console.log("InitGameStatus, bomb is " + String(gameStatusManager.bomb))
}

function endGameStatus(){
  gameStatusManager.isStart = false
  console.log("EndGameStatus")
}