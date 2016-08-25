/**
 * Created by 12 on 2016/7/21.
 */

    window.onload=function(){
        changgebgc();
        bannermove();
        timeback();
    }


//添加滚动头部变色的事件
var flag=true;
function changgebgc(){
        var head=document.querySelector(".head");
        var banner=document.querySelector(".banner");
        //获取banner的高度
        var bannerhigh=banner.offsetHeight;
        var alpha=1;
        window.onscroll=function(){
            //获取滚动滚动条时候的屏幕上方的高度
            var scroltop=document.body.scrollTop;
            if(scroltop<bannerhigh){
                //console.log(scroltop/bannerhigh)
                head.style.backgroundColor="rgba(233,35,34,"+alpha*(scroltop/bannerhigh)+")";
            }else{
                head.style.backgroundColor="rgba(233,35,34,1)";
            }
        }
    }




function  bannermove() {
    var banner=document.querySelector(".banner");
    var width=banner.offsetWidth;
    var index=1;

    var ull=banner.querySelector(".ull");
    var settime= function () {
        timeID=setInterval(function(){
            index++;
            gettranslate();
        },1000);
    };
   //添加时间定时器
    var timeID=null;
    settime();



//封装移动的函数有过度效果
    var gettranslate= function () {
        ull.style.webkitTransition="all .3s";
        ull.style.transition="all .3s";
        ull.style.webkitTransform="translateX("+(-width*index)+"px)";
        ull.style.transform="translateX("+(-width*index)+"px)";
    }
//封装移动的函数没有过度效果
    var gettranslate2= function () {
        ull.style.webkitTransition="none";
        ull.style.transition="none";
        ull.style.webkitTransform="translateX("+(-width*index)+"px)";
        ull.style.transform="translateX("+(-width*index)+"px)";
    }

    //添加时间监听
    ull.addEventListener("transitionEnd", function(){
        if(index==9){
            index=1;
        }
        else if(index==0){
            index=8
        }
        gettranslate2();
        flag=true;
    } )





    //添加时间监听兼容移动端
  ull.addEventListener("webkitTransitionEnd", function(){
        //console.log(0)
        if(index==9){
            index=1
        }
      else if(index==0){
          index=8
      }
      gettranslate2();
      //添加小圆点事件
      var point=document.querySelector(".point");
      var lis=point.querySelectorAll("li");
        //清空没个小圆点的类名
      for(var i=0;i<lis.length;i++){
          lis[i].className="";
      }
      if(index>=1){
          //index--;

      }
      lis[index-1].className="backcolor";

      flag=true;

      console.log("transition");

  } )



    //添加触摸事件
    var starposition=0;
    var endposition=0;
    var changpositin=0;
    ull.addEventListener("touchstart",function(e){
        flag=false;
        //获得当前的距离
      starposition= e.touches[0].pageX;
        //当触摸屏幕时候清除定时器
        clearInterval(timeID);
    } )
    ull.addEventListener("touchmove",function(e){
        //获得滑动的距离
        endposition= e.touches[0].pageX;
        //获得滑动后的每一步的距离
        changpositin=endposition-starposition;
        //通过滑动的距离来改变图片的距离
        ull.style.webkitTransition="none";
        ull.style.transition="none";
        ull.style.webkitTransform="translateX("+(-width*index+changpositin)+"px)";
        ull.style.transform="translateX("+(-width*index+changpositin)+"px)";
        flag=true

    } )
    ull.addEventListener("touchend",function(e){
        if(flag){
            //flag=false;
            if(Math.abs(changpositin)>width/3){
                //大于1/3距离就要判断左右移动还是右移动
                if(changpositin>0){
                    index--;
                    if(index>0){
                        gettranslate()
                    }else{
                        index=8
                        gettranslate2()
                    }

                }else{
                    index++;
                    gettranslate()
                }
                //flag=false;
                //如果移动距离小于1/3,就不移动
            }else{
                gettranslate()
            }
            //重新开始定时器
            settime();


            //console.log("touchend");
        }


        } )


}







//倒计时开始
function timeback(){
    var times=document.querySelector("#times");
    console.log(times);
    var lis=times.children;
    console.log(lis);
    var time=10*60*60;
    var hours=0;
    var minutes=0;
    var seconds=0;
    var timeID=setInterval(function () {
        time--;
        if(time==0){
            clearInterval(timeID);
            return;
        }
        hours=Math.floor(time/3600);
        minutes=Math.floor(time%3600);
        seconds=time%60;
        lis[0].innerHTML=Math.floor(hours/10);
        lis[1].innerHTML=Math.floor(hours%10);
        lis[3].innerHTML=Math.floor(minutes/60/10);
        lis[4].innerHTML=Math.floor(minutes/60%10);
        lis[6].innerHTML=Math.floor(seconds/10);
        lis[7].innerHTML=Math.floor(seconds%10);

    },1000)

}
