var musicFlies =[
    {
        name:"例外",
        author:"赖伟锋",
        url:"./music/例外.mp3"
    },{
        name:"曾在梦中",
        author:"王一名",
        url:"./music/曾在梦中.mp3"
    },{
        name:"动物世界",
        author:"薛之谦",
        url:"./music/动物世界.mp3"
    },{
        name:"忽然好想念",
        author:"唐古",
        url:"./music/忽然好想念.mp3"
    },{
        name:"过节",
        author:"简弘亦",
        url:"./music/过节.mp3"
    },{
        name:"爱上你",
        author:"BY2",
        url:"./music/爱上你.mp3"
    },{
        name:"说放就放",
        author:"星弟",
        url:"./music/说放就放.mp3"
    }
];
//1. 显示播放列表
var musiclist = document.getElementById("musiclist");
for(var i=0;i<musicFlies.length;i++){
    var li = document.createElement("li");
    li.innerHTML = musicFlies[i].name+" - "+musicFlies[i].author;
    musiclist.appendChild(li);
}

//2. 切换暂停和播放图标
var audio = document.getElementById("audio");
var play = document.getElementById("play");
play.onclick = function(){
    if(play.className == "playing"){
        play.className ="none";
        audio.pause();
    }else{
        play.className = "playing";
        audio.play();
    }
}

//3. 播放函数  index作为播放的第几首歌曲
    function playmusic(index){
          INDEX = index;
          audio.setAttribute("src",musicFlies[index].url);
          audio.play();
          // 正在播放的歌曲背景
          for(var i=0;i<everyli.length;i++){
              everyli[i].className = "none";
          }
          everyli[index].className = "isplay";
          auto();
    }

//4. 双击播放
    var everyli = document.querySelectorAll("#musiclist li");
    for(var i=0;i<everyli.length;i++){
        everyli[i].index = i;
        everyli[i].ondblclick = function(){
            playmusic(this.index);
            play.className = "playing";
        }
    }   

//5. 下一首
function nextmusic(){
    var oldINDEX = INDEX;
    INDEX++;
    if(INDEX >= everyli.length){
        INDEX = 0;
    }
    //7. 通过不同的‘播放模式’，点击‘下一首’选取不同的歌
    //单曲模式：
    if(playmode==0){
       INDEX--;
    }
    //随机模式：
    if(playmode==2){
        var len = everyli.length;
        //console.log(len);
        //console.log(rand);
        do{ rand = parseInt(Math.random()*len) }
        while( rand == oldINDEX)
        INDEX = rand;
    }
    playmusic(INDEX);
}

//6. 切换播放模式
var playmode =1;     //代表‘全部’播放
var mode = document.getElementById("mode");
mode.onclick = function(){
    if(playmode==1){
        mode.innerHTML = "单曲";
        playmode=0;
    }else if(playmode==0){
        mode.innerHTML = "随机";
        playmode =2;
    }else{
        mode.innerHTML = "全部";
        playmode =1;
    }
}

//8. 进度条的设置
//8-1.  进度条的背景：
var pro_div = document.querySelector("#progress div");
function auto(){
    setTimeout(auto,1000);
    //console.log(audio.duration);
    var currentTime = audio.currentTime;
    var allTime = audio.duration;
    var rat = audio.currentTime / audio.duration;
    widthing = Math.floor(rat*100);
    //console.log(widthing);
    if(!isNaN(allTime)){
        pro_div.style.width = widthing +"px";
        time.innerHTML = timeformate(currentTime)+" / "+timeformate(allTime);
    }
    if(audio.ended){
        nextmusic();
    }
}
//8-2.  进度条的时间显示情况：
var time = document.getElementById("time");
function timeformate(time){
      var m = Math.floor(time/60);
      var s = Math.floor(time - m*60);
      if(m<10){
          m = "0"+m;
      }
      if(s<10){
          s = "0"+s;
      }
      str = m+":"+s;
      return str;
}

//9. 点击‘进度条’改变歌曲的播放时间
var progress = document.getElementById("progress");
progress.onclick = function(event){
    var proW = progress.offsetLeft;
    //console.log(proW);   //651 相对于浏览器固定的值
    var eveW = event.pageX;
    //console.log(eveW);
    var width = eveW - proW;
    var allTime = parseInt(audio.duration);
    pro_div.style.width = width+"px";
    audio.currentTime = width / 100 * allTime;
}

//10. 点击：调整音量  audio.volume (0-1)
var volume = document.getElementById("volume");
var vdiv = document.querySelector("#volume div");

function vol(event){
    var volX = volume.offsetLeft;
    //console.log(volX);     //761
    var eveX = event.pageX -8;
    //console.log(eveX);    //[761,811] 差值50
    var leftX = eveX - volX;
    leftX = leftX>34?34:leftX;
    leftX = leftX<0?0:leftX;
    vdiv.style.left = leftX +"px";
    audio.volume = leftX / 34;
}

//11. 拖动‘喇叭按钮’调整音量大小
var isdown;
vdiv.onmousedown = function(){
    isdown = true;
}
vdiv.onmouseup = function(){
    isdown = false;
}
volume.onmousemove = function(){
    if(isdown){
        vol(event);
    }
}

playmusic(0);














