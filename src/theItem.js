/**
 * Created by gankehuang on 2018/4/18.
 */



 // 循环轮播到上一个项目
$(".prev-slide").click(function(){
	$("#myCarousel2").carousel('prev');
    $("#myCarousel2").carousel('pause');
});
// 循环轮播到下一个项目
$(".next-slide").click(function(){
	$("#myCarousel2").carousel('next');
    $("#myCarousel2").carousel('pause');
});


//加载主图新闻信息
GetAllNews();
function GetAllNews() {
    $.ajax({
        url: Util.service.GetAllNewsPic,
        type: "POST",
        data: {
            draw: 0,
            start: 0,
            length: 10,
            VisitID: hbVisitID 
            
        },
        beforeSend: function () {
            //Util.pageLoading();
        },
        success: function (data) {
            Util.pageinit();
            if (data.success === 1) {
                data.resultData = JSON.parse(data.resultData);
                var news = data.resultData;
                var mainimgList = [];
                var ImageVideo = [];
                for (var i in news) {
                    var ImageVideo1 = JSON.parse(news[i].ImageVideo);
                    for (var j in ImageVideo1) {
                        if (ImageVideo1[j].type== '0') {
                            mainimgList.push({ Url: ImageVideo1[j].url, ID: ImageVideo1[j].id, type: ImageVideo1[j].type, newsid: news[i].ID, Name: ImageVideo1[j].name, NewsName: news[i].NewsTitle });
                            //mainimgList.push({ fileDesc: ImageVideo1[j].fileDesc, id: ImageVideo1[j].id, index: ImageVideo1[j].index, type: ImageVideo1[j].type, Url: ImageVideo1[j].url, Name: ImageVideo1[j].name });
                            //ImageVideo.push({ fileDesc: ImageVideo1[j].fileDesc, id: ImageVideo1[j].id, index: ImageVideo1[j].index, type: ImageVideo1[j].type, Url: ImageVideo1[j].url });
                        }
                    }
                }
                var data = {};
                data.resultData = mainimgList;
                console.log(data);
                //console.log(template("template", { 'ImageVideo': data }));
                $("#myCarousel").html(template("template", {'ImageVideo': data}));
                //$("#myCarousel").html(template("template", data));
                $('#myCarousel .carousel-inner .item').eq(0).addClass('active');
                $('#myCarousel').carousel();//左右滑动
            }
        },
        error: function () {
            Util.pageinit();
        }
    });
}


$('#myCarousel1 .carousel-inner .item').eq(0).addClass('active');
$('#myCarousel1').carousel();//左右滑动



//需要改动
$(function(){


    //国家奖
    $.ajax({
        url: Util.service.GetAchievementForNationalAward,
        type: "POST",
        data:{
            draw:0,
            start:0,
            length:10,
            VisitID: hbVisitID,
            isgjj: 's'
        },
        beforeSend: function () {
            //Util.pageLoading();
        },
        success: function (data) {
            Util.pageinit();
            if (data.success === 1) {
                data.resultData=JSON.parse(data.resultData);
                data.resultData.data = JSON.parse(data.resultData.data).slice(0, 20);
                console.log(data.resultData);
                $("#notificationBlock").html(template("notificationTemplate", data.resultData));
            }
        },
        error: function () {
            Util.pageinit();
        }
    })
    //ATTF 100项重大农业科技成果
    $.ajax({
        url: Util.service.GetAchievementForHundredItems,
        type: "POST",
        data:{
            draw:0,
            start:0,
            length:10,
            VisitID: hbVisitID,
            isbx: 's'
        },
        beforeSend: function () {
            //Util.pageLoading();
        },
        success: function (data) {
            Util.pageinit();
            if (data.success === 1) {
                data.resultData=JSON.parse(data.resultData);
                data.resultData.data = JSON.parse(data.resultData.data).slice(0, 20);
                console.log(data.resultData);
                $("#ATTF100").html(template("notificationTemplate", data.resultData));
            }
        },
        error: function () {
            Util.pageinit();
        }
    })

    //ATTF 1000项优秀农业科技成果
    $.ajax({
        url: Util.service.GetAchievementForThousandItems,
        type: "POST",
        data:{
            draw:0,
            start:0,
            length:10,
            VisitID: hbVisitID,
        },
        beforeSend: function () {
            //Util.pageLoading();
        },
        success: function (data) {
            Util.pageinit();
            if (data.success === 1) {
                data.resultData=JSON.parse(data.resultData);
                data.resultData.data = JSON.parse(data.resultData.data).slice(0, 20);
                console.log(data.resultData);
                $("#ATTF1000").html(template("notificationTemplate", data.resultData));
            }
        },
        error: function () {
            Util.pageinit();
        }
    })

    //实时新闻动态列表获取
    $.ajax({
        url: Util.service.GetAllNews,
        type: "POST",
        data: {
            draw: 0,
            start: 0,
            length: 5,
            VisitID: hbVisitID
        },
        beforeSend: function () {
            //Util.pageLoading();
        },
        success: function (data) {
            Util.pageinit();
            if (data.success === 1) {
                data.resultData = JSON.parse(data.resultData);
                data.resultData.data = JSON.parse(data.resultData.data).slice(0, 5);
                console.log(data.resultData);
                $("#NewsBlock").html(template("NewsTemplate", data.resultData));

                if(data.resultData.data[0].NewsTitle == "首届全国种公牛拍卖"){
                    $(".top-news").append("<a href='newsinfoZD.html'>" + data.resultData.data[0].NewsTitle + "</a>");
                }else{
                    $(".top-news").append("<a style='width:530px;display:inline-block;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;' href='newsinfo.html?id=" + data.resultData.data[0].ID + "'>" + data.resultData.data[0].NewsTitle + "</a>");
                }
            }
        },
        error: function () {
            Util.pageinit();
        }
    })



});







