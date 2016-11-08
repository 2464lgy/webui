/**
 * Created by NJQ on 2016-10-25.
 */
//alert()
/*window.onload=function(){*/
    var canvaswidth=window.innerWidth;//获取显示窗口的宽高作为canvas的宽高
    var canvasheight=window.innerHeight;
    var canvas=document.getElementById('canvas');
    var context=canvas.getContext('2d');

//设置canvas的大小
    canvas.width=canvaswidth;
    canvas.height=canvasheight;
    var image=new Image();
    var radius=50;
    var clippingRegion={x:-1,y:-1,r:radius}
    var leftMargin=0,topMargin=0;


    image.src='1.jpg';
    image.onload=function(){
        $('#blur-div').css('width',canvaswidth+'px');
        $('#blur-div').css('height',canvasheight+'px');
        $('#blur-image').css('width',image.width+'px');
        $('#blur-image').css('height',image.height+'px')
        console.log(canvasheight);
        console.log(image.height);
        console.log(canvaswidth);
        console.log(image.width);

        leftMargin=(image.width-canvas.width)/2;
        topMargin=(image.height-canvas.height)/2;

       /* $('#blur-image').css('top',"-"+topMargin+"px");
        $('#blur-image').css('left','-'+leftMargin+'px')*/
       $('#blur-image').css('top',String(-topMargin)+'px');
        $('#blur-image').css('left',String(-leftMargin)+'px')

        initCanvas()
    }
    function initCanvas() {
     //   clippingRegion={x:400,y:200,r:radius}
        var theleft=leftMargin<0?-leftMargin:0;
        var thetop=topMargin<0?-topMargin:0;
        clippingRegion.x=Math.random()*(canvas.width-2*radius-2*theleft)+radius+theleft;
        clippingRegion.y=Math.random()*(canvas.height-2*radius-2*thetop)+radius+thetop;
        clippingRegion.r=0;
       var remove=setInterval(function(){
            clippingRegion.r+=10;
            if(clippingRegion.r>50){
                console.log(clippingRegion.r)
                clearInterval(remove)
            }
            draw(image,clippingRegion)
        },100)



    }
    function setClippingRegion(clippingRegion) {
        context.beginPath();
       // context.arc(Math.random()*(canvas.width-2*radius)+radius,Math.random()*(canvas.height-2*radius)+radius,clippingRegion.r,0,Math.PI*2,true);
        context.arc(clippingRegion.x,clippingRegion.y,clippingRegion.r,0,Math.PI*2)
        context.clip();
      //  context.closePath();
    }
    function draw(image,clippingRegion) {
        context.clearRect(0,0,canvas.width,canvas.height);
        context.save();
        setClippingRegion(clippingRegion);
     //   context.drawImage(image,0,0);
        context.drawImage(image,
            Math.max(leftMargin,0),Math.max(topMargin,0),
            Math.min(canvas.width,image.width),Math.min(canvas.height,image.height),
            leftMargin<0?-leftMargin:0,topMargin<0?-topMargin:0,
            Math.min(canvas.width,image.width),Math.min(canvas.height,image.height))
        context.restore();
    }
    function show(){
      //  alert();

    var theAnimation=setInterval(function () {
            console.log("animation")
            clippingRegion.r+=20;
            if(clippingRegion.r> Math.sqrt( Math.pow(canvas.width,2)+Math.pow(canvas.height,2))){//超过画布范围停止计时器

                clearInterval(theAnimation)
            }
            draw(image,clippingRegion)
        },25);
        clippingRegion.r=radius;
    }
    function reset(){


        initCanvas()
    }
    canvas.addEventListener('touchstart',function (e) {
        e.preventDefault()
    })
