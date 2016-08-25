/**
 * Created by 12 on 2016/7/24.
 */
$(function () {
    var ulbox=$(".ull");
    var banner=$(".banner");
    var bannerwidth=banner.width();
    var timeID=null;
    var index=1;
    var points=$(".point");
    var lis=points.find("li")


     //小圆点移动的函数
   var point= function(){
        for(var i=0;i<lis.length;i++){
           $(lis[i]).removeClass("backcolor");
        }
        $(lis[index-1]).addClass("backcolor")
    }

    //设置定时器函数
    var settimeid=function () {
        timeID=setInterval(function () {
            index++;
            ulbox.animate({"transform":"translateX("+(-index*bannerwidth)+"px)"},200,"linear", function () {
                if(index==9){
                    index=1
                    ulbox.css({"transform":"translateX("+(-index*bannerwidth)+"px)"});
                }else if(index==0){
                    index=8
                    ulbox.css({"transform":"translateX("+(-index*bannerwidth)+"px)"});
                }
                point();
            })
        },1000)
    }
    //执行定时器
    settimeid();
    //当用接触的时候清除定时器
    var starposition=0;
    var endposition=0;
    var changposition=0;
    ulbox[0].addEventListener("touchstart", function (e) {
        clearInterval(timeID);
        starposition= e.touches[0].pageX;
    })
    //当手指移动的时候
    ulbox[0].addEventListener("touchmove", function (e) {
        //获得滑动的距离
        endposition= e.touches[0].pageX;
        //获得滑动后的每一步的距离
        changposition=endposition-starposition;
        //滑动的距离让图片滑动相应的距离
        //ulbox.animate({"transform":"translateX("+(-index*bannerwidth+changpositin)+"px)"})
        ulbox[0].style.webkitTransform="translateX("+(-index*bannerwidth+changposition)+"px)";
        ulbox[0].style.transform="translateX("+(-index*bannerwidth+changposition)+"px)";
    })
    //当用离开的时候设置定时器
    ulbox[0].addEventListener("touchend", function () {
        if(Math.abs(changposition)>bannerwidth/3){
            //大于1/3距离就要判断左右移动还是右移动
            if(changposition>0){
                index--;
                ulbox.animate({"transform":"translateX("+(-index*bannerwidth)+"px)"},300,"ease", function () {
                    if(index==0){
                        index=8
                        ulbox.css({"transform":"translateX("+(-index*bannerwidth)+"px)"});
                    }
                    point();
                })
            }else{
                index++;
                ulbox.animate({"transform":"translateX("+(-index*bannerwidth)+"px)"},300,"ease", function () {
                    if(index==9){
                        index=1
                        ulbox.css({"transform":"translateX("+(-index*bannerwidth)+"px)"});
                    }
                    point();
                })
            }
        }else{
            ulbox.animate({"transform":"translateX("+(-index*bannerwidth)+"px)"},300,"ease", function () {
                if(index==0){
                    index=8
                    ulbox.css({"transform":"translateX("+(-index*bannerwidth)+"px)"});
                }
            })
        }
        settimeid();
    })


    //滑动手指时候触发的事件
    ////当手指右滑动的时候
    //banner.on("swipeRight", function () {
    //    index--;
    //    ulbox.animate({"transform":"translateX("+(-index*bannerwidth)+"px)"},300,"linear", function () {
    //        if(index==0){
    //            index=8
    //            ulbox.css({"transform":"translateX("+(-index*bannerwidth)+"px)"});
    //        }
    //    })
    //})
    ////当手指左滑动的时候
    //banner.on("swipeLeft", function () {
    //    index++;
    //    ulbox.animate({"transform":"translateX("+(-index*bannerwidth)+"px)"},300,"linear", function () {
    //        if(index==9){
    //            index=1
    //            ulbox.css({"transform":"translateX("+(-index*bannerwidth)+"px)"});
    //        }
    //    })
    //})

    //倒计时开始
    timeback()
    //倒计时函数的封装
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
})
