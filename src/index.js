/**
 * Created by zhujianlin on 2017/6/3.
 */
//$('#myCarousel').carousel();


//节日图片弹窗
(function holidaySuspended(){
    //创建#model-overlay div
    var modal_overlay = document.createElement("div");  //创建首层div
    modal_overlay.setAttribute("id", "modal-overlay");  //给创建的div设置id值；
    modal_overlay.style.position = "fixed";
    modal_overlay.style.left = "0px";
    modal_overlay.style.top = "0px";
    modal_overlay.style.width = "100%";
    modal_overlay.style.height = "100%";
    modal_overlay.style.display = "none";
    modal_overlay.style.textAlign = "center";
    modal_overlay.style.zIndex = "1000";
    modal_overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

    //创建 modal-data  div
    var modal_data = document.createElement("div"); 
    modal_data.style.position = "absolute"; 
    modal_data.style.top = "50%";
    modal_data.style.left = "50%";
    modal_data.style.transform = "translate(-50%, -50%)";
    modal_data.setAttribute("id", "modal-data");
    modal_overlay.appendChild(modal_data);

    //创建button
    var button = document.createElement("button");  
    button.style.position = "relative";
    button.style.zIndex = "100";
    button.style.padding = "3px 5px";
    button.style.cursor = "pointer";
    button.style.border = "none";
    button.style.color = "white";
    button.style.backgroundColor = "black";
    button.style.fontWeight = "bold";
    button.style.float = "right";
    button.innerHTML = "x"
    button.onclick = function(){
        show();
    };
    button.setAttribute("id", "btn");
    modal_data.appendChild(button);

    //创建span
    var span = document.createElement("span"); 
    span.style.position = "relative";   
    span.style.zIndex = "100";   
    span.style.color = "white";  
    span.style.float = "left";  
    modal_data.appendChild(span);

    //创建img
    var img = document.createElement("img"); 
    img.style.width = "100%"; 
    img.style.position = "relative";  
    img.style.backgroundColor = "rgb(255, 255, 255)"; 
    img.style.textAlign = "center"; 
    img.style.borderRadius = "4px"; 
    img.style.marginTop = "-20px"; 
    img.style.float="left";
    img.setAttribute("id", "img");
    modal_data.appendChild(img);

    //将所有创建元素放入body中
    document.body.appendChild(modal_overlay);

    let myData = new Date();
    let date = myData.toLocaleDateString().replace(/\//g, '-');

    function show(){
        var e3 = document.getElementById('modal-overlay');
        e3.style.display ="none";
    }
    
    let holiday = [
       
        { day: "2019-6-7", type: "端午节" },
        { day: "2019-6-8", type: "端午节" },
        { day: "2019-6-9", type: "端午节" },
        { day: "2019-8-1", type: "建军节" },
        { day: "2019-9-10", type: "教师节" },
        { day: "2019-9-13", type: "中秋节" },
        { day: "2019-9-14", type: "中秋节" },
        { day: "2019-9-15", type: "中秋节" },
        { day: "2019-10-1", type: "国庆节" },
        { day: "2019-10-2", type: "国庆节" },
        { day: "2019-10-3", type: "国庆节" },
        { day: "2019-10-4", type: "国庆节" },
        { day: "2019-10-5", type: "国庆节" },
        { day: "2019-10-6", type: "国庆节" },
        { day: "2019-10-7", type: "国庆节" },
        { day: "2019-11-28", type: "感恩节" },

        /*{ day: "2019-4-22", type: "特约" },
        { day: "2019-4-23", type: "特约" },
        { day: "2019-4-24", type: "特约" },
        { day: "2019-4-25", type: "特约" },
        { day: "2019-4-26", type: "特约" },
        { day: "2019-4-27", type: "特约" },
        { day: "2019-4-28", type: "特约" },
        { day: "2019-4-29", type: "特约" },
        { day: "2019-4-30", type: "特约" },
        { day: "2019-5-1", type: "特约" },
        { day: "2019-5-2", type: "特约" },
        { day: "2019-5-3", type: "特约" },
        { day: "2019-5-4", type: "特约" },
        { day: "2019-5-5", type: "特约" },
        { day: "2019-5-6", type: "特约" },
        { day: "2019-5-7", type: "特约" },
        { day: "2019-5-8", type: "特约" },
        { day: "2019-5-9", type: "特约" },
        { day: "2019-5-10", type: "特约" },
        { day: "2019-5-11", type: "特约" },
        { day: "2019-5-12", type: "特约" },
        { day: "2019-5-13", type: "特约" },
        { day: "2019-5-14", type: "特约" },
        { day: "2019-5-15", type: "特约" },
        { day: "2019-5-16", type: "特约" },
        { day: "2019-5-17", type: "特约" },
        { day: "2019-5-18", type: "特约" },
        { day: "2019-5-19", type: "特约" },*/
       
    ]



    holiday.forEach(function(value, index, array){  
        if(date == value.day){  
            
            
            switch(value.type){

                case "清明节":
                  img.src = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529144375777&di=d7341d58d7015b7bb7cf4b119375ecfa&imgtype=0&src=http%3A%2F%2Fa4.rui2.net%2Fupload%2F12%2F2017%2F02%2Fa54a4fd63cd4b5456dc381d31299233f.jpg";
                  break;
                case "劳动节":
                  img.src = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529144306928&di=ac17550453fdc2f2d18999ab37109439&imgtype=0&src=http%3A%2F%2Fpic1.ooopic.com%2F00%2F90%2F37%2F55b1OOOPIC77.jpg";
                  break;
                case "端午节":
                  img.src = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529145889439&di=4ebc60fe6031d57b5e7df95d582ec763&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F2f738bd4b31c87016714c052217f9e2f0608ffe0.jpg";
                  break;
                case "中秋节":
                  img.src = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529232810071&di=1150a88b586d1a7c9df02efd4d73d692&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01fe43578c981f0000012e7e301390.jpg%401280w_1l_2o_100sh.jpg";
                  break;
                case "国庆节":
                  img.src = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529232831870&di=8bb05c647e8fcdebd5b9c3d042c81bc1&imgtype=0&src=http%3A%2F%2Fimg51.afzhan.com%2F9%2F20130927%2F635159010404974832639.jpg";
                  break;
                case "建军节":
                  img.src = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526962877507&di=9895cf8c4dd490bce3e3ced9cca46502&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F17%2F60%2F44%2F22d58PICKJ8_1024.jpg";
                  break;
                case "教师节":
                  img.src = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526962993003&di=99bb403014f55b260f40d4ef2afab03d&imgtype=0&src=http%3A%2F%2Fimg10.360buyimg.com%2Fimgzone%2Fjfs%2Ft292%2F170%2F410152737%2F324438%2F4739f229%2F541018e9Nb9d6b6d1.jpg";
                  break;
                case "感恩节":
                  img.src = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527557868&di=203292a727f093dc52e6f54f3c7ee70c&imgtype=jpg&er=1&src=http%3A%2F%2Fimg27.house365.com%2Fxabbsuserpic%2F2014%2F11%2F25%2F14168832705473ec46427cd.jpg";
                  break;
                case "元旦节":
                  img.src = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526963288138&di=bb5fd07dd730862ba0c335c61b5127aa&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D1936993329%2C3238133685%26fm%3D214%26gp%3D0.jpg";
                  break;
                case "春节":
                  img.src = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526963498712&di=4afa73d1475b54a19d2708575d514cc2&imgtype=0&src=http%3A%2F%2Fuploads.xuexila.com%2Fallimg%2F1610%2F878-161014152158.jpg";
                  break;
                case "植树节":
                  img.src = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529143966113&di=5209a3554d6914d92d977d0ef2502bd2&imgtype=0&src=http%3A%2F%2Fxiaoxue.eol.cn%2Fziyuan%2Fziyuan%2Fziliao%2F201603%2FW020160311414050567611.jpg";
                  break;
                case "特约":
                  img.src = '/img/4.jpg';
                  //img.src = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529143966113&di=5209a3554d6914d92d977d0ef2502bd2&imgtype=0&src=http%3A%2F%2Fxiaoxue.eol.cn%2Fziyuan%2Fziyuan%2Fziliao%2F201603%2FW020160311414050567611.jpg";
                  break;
            }




            modal_overlay.style.display = "block";
            var a = 10;
            span.innerHTML = a + 's后自动关闭';
            var t1 = setInterval(function(){
                a--; 
                span.innerHTML = a + 's后自动关闭';
                if(a == 0){
                    clearInterval(t1); 
                    modal_overlay.style.display = "none";
                }
            }, 1000);
            return;
        }
    })
}())




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
                console.log(template("template", { 'ImageVideo': data }));
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



//加载专利评价公告
GetAllPatentNotice();
function GetAllPatentNotice() {
    $.ajax({
        url: Util.service.GetAllPatentNotice,
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
                data.resultData.data = JSON.parse(data.resultData.data).slice(0, 10);
                console.log(data.resultData);
                $("#noticeTbody2").html(template("noticeTemplate2", data.resultData));
            }
        },
        error: function () {
            Util.pageinit();
        }
    });
}
//加载品种授权公告
getAllNotice();
function getAllNotice() {
    $.ajax({
        url: Util.service.GetAllNotice,
        type: "POST",
        data:{
            draw:0,
            start:0,
            length:10,
            VisitID: hbVisitID
        },
        beforeSend: function () {
            Util.pageLoading();
        },
        success: function (data) {
            Util.pageinit();
            if (data.success === 1) {
                data.resultData=JSON.parse(data.resultData);
                data.resultData.data = JSON.parse(data.resultData.data).slice(0, 10);
                console.log(data.resultData);
                $("#noticeTbody").html(template("noticeTemplate", data.resultData));
            }
        },
        error: function () {
            Util.pageinit();
        }
    });
}
//GUID和验证码
function getIdentifyingCode() {
    $.ajax({
        url: Util.service.GetValidatePic,
        type: "POST",
        success: function (data) {
            Util.pageinit();
            if (data.success === 1) {
                data.resultData = JSON.parse(data.resultData);
                $("#loginForm").find("[name=GUID]").val(data.resultData.GUID);
                $("#loginForm").find("img.code-img").attr("src",data.resultData.PicPath);
            }
        },
        error: function () {
            Util.pageinit();
        }
    });
}

//柱状图
$(function () {
    $('#container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '全国农业成果年度转让金额<br>（2015-2017）',
            style: {'font-size':'16px'}
        },
        exporting: {
            enabled: false
        },
        // subtitle: {
        //     text: '数据截止 2017-03，来源: <a href="https://en.wikipedia.org/wiki/List_of_cities_proper_by_population">Wikipedia</a>'
        // },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: '金额 (万元)'
            }
        },
        legend: {
            enabled: true,
            itemHoverStyle: { color: '#FF0000' },
            symbolRadius: 0
        },
        tooltip: {
            pointFormat: '金额 (／万元) : <b>{point.y}</b>'
        },
        plotOptions: {
            series: {
                color: '#F9983F'
            }
        },
        series: [{
            name: '金额 (／万元)',
            data: [
                ['2015', 35746.2],
                ['2016', 34853.9],
                ['2017', 52597.53]
            ],
            dataLabels: {
                enabled: true,
                //                rotation: -90,
                //                color: '#FFFFFF',
                //                align: 'right',
                //                format: '{point.y:.1f}', // one decimal
                //                y: 10, // 10 pixels down from the top
                //                style: {
                //                    fontSize: '13px',
                //                    fontFamily: 'Verdana, sans-serif'
                //                }
            }
        }]
    });

    $('#container2').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '全国农业成果年度转让数量<br>（2015-2017）',
            style: {'font-size':'16px'}
        },
        exporting: {
            enabled: false
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: '数量'
            }
        },
        legend: {
            enabled: true,
            itemHoverStyle: { color: '#FF0000' },
            symbolRadius: 0
        },
        tooltip: {
            pointFormat: '数量 (／个数) : <b>{point.y}</b>'
        },
        plotOptions: {
            series: {
                color: '#00a65a'
            }
        },
        series: [{
            name: '数量 (／个数)',
            data: [
                ['2015', 91],
                ['2016', 109],
                ['2017', 210]
            ],
            dataLabels: {
                enabled: true,
            }
        }]
    });
    $('#container4').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '全国农业成果受让金额省份Top10<br>（2015-2017）',
            style: {'font-size':'16px'}

        },
        exporting: {
            enabled: false
        },
        // subtitle: {
        //     text: '数据截止 2017-03，来源: <a href="https://en.wikipedia.org/wiki/List_of_cities_proper_by_population">Wikipedia</a>'
        // },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: '金额 (万元)'
            }
        },
        legend: {
            enabled: true,
            itemHoverStyle: { color: '#FF0000' },
            symbolRadius: 0
        },
        tooltip: {
            pointFormat: '金额 (／万元) : <b>{point.y}</b>'
        },
        plotOptions: {
            series: {
                color: '#4169E1'
            }
        },
        series: [{
            name: '金额 (／万元)',
            data: [
                ['甘肃省', 17807.2],
                ['北京市', 14325],
                ['吉林省', 10594],
                ['陕西省', 9510],
                ['黑龙江省', 9072.9],
                ['四川省', 3315.6],
                ['安徽省', 2946],
                ['天津市', 2800],
                ['湖北省', 2690],
                ['湖南省', 2295]
            ],
            dataLabels: {
                enabled: true,
                //                rotation: -90,
                //                color: '#FFFFFF',
                //                align: 'right',
                //                format: '{point.y:.1f}', // one decimal
                //                y: 10, // 10 pixels down from the top
                //                style: {
                //                    fontSize: '13px',
                //                    fontFamily: 'Verdana, sans-serif'
                //                }
            }
        }]
    });
    $('#container3').highcharts({
        chart: {
            type: 'column'
        },
        title: {

            text: '全国农业成果受让金额省份Top10<br>（2015-2017）',
            style: {'font-size':'16px'}

        },
        exporting: {
            enabled: false
        },
        // subtitle: {
        //     text: '数据截止 2017-03，来源: <a href="https://en.wikipedia.org/wiki/List_of_cities_proper_by_population">Wikipedia</a>'
        // },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: '金额 (万元)'
            }
        },
        legend: {
            enabled: true,
            itemHoverStyle: { color: '#FF0000' },
            symbolRadius: 0
        },
        tooltip: {
            pointFormat: '金额 (／万元) : <b>{point.y}</b>'
        },
        plotOptions: {
            series: {
                color: '#802A2A'
            }
        },
        series: [{
            name: '金额 (／万元)',
            data: [
                ['甘肃省', 32742.6],
                ['北京市', 19432.703],
                ['黑龙江省', 16799.9],
                ['四川省', 8412],
                ['吉林省', 3000],
                ['河南省', 2504.9],
                ['上海市', 2060],
                ['浙江省', 1326],
                ['江苏省', 1259],
                ['湖北省', 640]
            ],
            dataLabels: {
                enabled: true,
                //                rotation: -90,
                //                color: '#FFFFFF',
                //                align: 'right',
                //                format: '{point.y:.1f}', // one decimal
                //                y: 10, // 10 pixels down from the top
                //                style: {
                //                    fontSize: '13px',
                //                    fontFamily: 'Verdana, sans-serif'
                //                }
            }
        }]
    });
    $('#container5').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '全国种业成果转让方式统计<br>（金额）',
            style: {'font-size':'16px'}
        },
        exporting: {
            enabled: false
        },
        // subtitle: {
        //     text: '数据截止 2017-03，来源: <a href="https://en.wikipedia.org/wiki/List_of_cities_proper_by_population">Wikipedia</a>'
        // },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: '金额 (万元)'
            }
        },
        legend: {
            enabled: true,
            itemHoverStyle: { color: '#FF0000' },
            symbolRadius: 0
        },
        tooltip: {
            pointFormat: '金额 (／万元) : <b>{point.y}</b>'
        },
        plotOptions: {
            series: {
                color: '#B03060'
            }
        },
        series: [{
            name: '金额 (／万元)',
            data: [
               ['独占许可', 4433],
                ['实施许可', 110],
                ['使用许可', 9386],
                ['转让许可', 964],
                ['其他', 171]
            ],
            dataLabels: {
                enabled: true,
                //                rotation: -90,
                //                color: '#FFFFFF',
                //                align: 'right',
                //                format: '{point.y:.1f}', // one decimal
                //                y: 10, // 10 pixels down from the top
                //                style: {
                //                    fontSize: '13px',
                //                    fontFamily: 'Verdana, sans-serif'
                //                }
            }
        }]
    });
    $('#container6').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '全国农业非种业成果转让方式统计<br>（金额）',
            style: {'font-size':'16px'}
        },
        exporting: {
            enabled: false
        },
        // subtitle: {
        //     text: '数据截止 2017-03，来源: <a href="https://en.wikipedia.org/wiki/List_of_cities_proper_by_population">Wikipedia</a>'
        // },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: '金额 (万元)'
            }
        },
        legend: {
            enabled: true,
            itemHoverStyle: { color: '#FF0000' },
            symbolRadius: 0
        },
        tooltip: {
            pointFormat: '金额 (／万元) : <b>{point.y}</b>'
        },
        plotOptions: {
            series: {
                color: '#082E54'
            }
        },
        series: [{
            name: '金额 (／万元)',
            data: [
                ['独占许可', 27192],
                ['普通许可', 51],
                ['实施许可', 1333],
                ['使用许可', 11213],
                ['转让', 2094],
                ['转让许可', 21383],
                ['其他', 10785]

            ],
            dataLabels: {
                enabled: true,
                //                rotation: -90,
                //                color: '#FFFFFF',
                //                align: 'right',
                //                format: '{point.y:.1f}', // one decimal
                //                y: 10, // 10 pixels down from the top
                //                style: {
                //                    fontSize: '13px',
                //                    fontFamily: 'Verdana, sans-serif'
                //                }
            }
        }]
    });
    $(".highcharts-credits").hide();
});



//需要改动
$(function(){
    getIdentifyingCode();

    $(".left .tab-list .tab-title").on("click", function () {
        var index = $(this).data("index");
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        var $tab = $(this).parent().siblings(".tab-box").find("[data-index="+index+"]");
        $tab.siblings().hide();
        $tab.show();	
    });

    $(".block-view .tab-list .tab-title").on("click", function () {
        var index = $(this).data("index");
        //改动 点击标签不添加active样式
      // $(this).siblings().removeClass("active");
      // $(this).addClass("active");
        var $tab = $(this).parent().siblings(".tab-box").find("[data-index=" + index + "]");
        $tab.siblings().hide();
        $tab.show();
        if (index == "3") {
            $(this).siblings('div:last').show();
        }
        else {
            if (index != "4")
                $(this).siblings('div:last').hide();
        }
    });

    $(".nav-level").find("li").on("click",function(){
        if($(this).find("ul").length > 0){
            $(this).siblings().find("ul").hide(300);
            $(this).find("ul").show(300);
        }
    });

    $('#loginHint .goLogin').click(function(){
        $('#loginHint').hide();
        $('#loginForm').show();
    });

    $("#loginForm").on("click",".glyphicon-refresh",function(e){
        e.preventDefault();
        getIdentifyingCode();
    });

    //已审核列表获取 成果推荐
    $.ajax({
        //url: Util.service.GetAllApprovedInTradeAchievement,
        url: Util.service.GetRecommendAchievement,
        type: "POST",
        data:{
            draw:0,
            start:0,
            length:10,
            VisitID: hbVisitID
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

    //机构列表获取 机构推荐
    $.ajax({
        url: Util.service.GetAllAgency,
        type: "POST",
        data:{
            draw:0,
            start:0,
            length:5,
            VisitID: hbVisitID
        },
        beforeSend: function () {
            //Util.pageLoading();
        },
        success: function (data) {
            Util.pageinit();
            if (data.success === 1) {
                data.resultData=JSON.parse(data.resultData);
                data.resultData.data = JSON.parse(data.resultData.data).slice(0, 4);
                data.resultData.data.splice(0,0,{AgencyName:'中国农业科学院郑州果树研究所'});
                $("#organizationBlock").html(template("organizationTemplate", data.resultData));
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


    //需求推荐列表获取
    $.ajax({
        url: Util.service.GetAllApprovedInTradeRequire,
        type: "POST",
        data:{
            draw:0,
            start:0,
            length:2,
            VisitID: hbVisitID
        },
        beforeSend: function () {
            //Util.pageLoading();
        },
        success: function (data) {
            Util.pageinit();
            if (data.success === 1) {
                data.resultData=JSON.parse(data.resultData);
                data.resultData.data = JSON.parse(data.resultData.data).slice(0, 5);
                console.log(data.resultData);
                $("#requireBlock").html(template("requireTemplate", data.resultData));
            }
        },
        error: function () {
            Util.pageinit();
        }
    })


    //科技成果产权交易竞价实时展示
    //function tableDraw() {
    //    $.ajax({
    //        url: Util.service.GetCompeteListRealTime,
    //        type: 'POST',
    //        data: {
    //           VisitID: manageVisitID
    //        },
    //        success: function (data) {
    //            if (data.success === 1) {
    //                data.resultData = JSON.parse(data.resultData).slice(0, 10);
    //                $("#tbodyContent").html(template("myTemplate", data));
    //            }
    //        }
    //    })
    //}

    //tableDraw();

    //setInterval(function(){
    //    tableDraw();
    //},15000);

    //登录
    $("#loginForm").on("click",".submit",function(e){
        e.preventDefault();  
        var formData = $("#loginForm").serializeJson();
        if(!formData.userName){
            Util.warning("show","请输入用户名");
            return false;
        }else if(!formData.password){
            Util.warning("show","请输入密码");
            return false;
        }else if(!formData.Code){
            Util.warning("show","请输入验证码");
            return false;
        }
        formData.VisitID = hbVisitID;
        $.ajax({
            url: Util.service.CheckPicCode,
            type: "POST",
            data:formData,
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                //先验证
                if (data.success === 1) {
                    $.ajax({
                        url: Util.service.Login,
                        type: "POST",
                        data:formData,
                        beforeSend: function () {
                            Util.pageLoading();
                        },
                        success: function (data) {
                            Util.pageinit();
                            //登录
                            if (data.success === 1) {
                                //$("#loginForm").find("[name=userName]").val("");
                                //$("#loginForm").find("[name=Code]").val("");
                                $("#loginForm [name=password]").val("");
                                $("#loginForm [name=Code]").val("");
                                data.resultData = JSON.parse(data.resultData);
                                console.log(data.resultData);
                                Util.setUserLogin(data.resultData);//保存到localstorage
                                $('#loginHint').hide();
                                $("#loginForm").hide();

                                console.log();
                                $('#loginSuccess .username').text(data.resultData.LoginName);

                                //最上边的 显示登录名 并调整边距
                                $("#username").html(data.resultData.LoginName)
                               

                                $("#loginSuccess").show();
                                $(".gotoAdmin").show();
                                var user = Util.getUserLoginData();
                               
                                if (user && user.IsAdmin) {
                                   
                                    $("#gotoFavorite").hide();//admin隐藏收藏夹
                                    //隐藏收藏夹 导航条
                                    $("#mylove").hide();
                                    $("#mylove1").hide();
                                    //更改
                                    $("#a1").attr("href", "/admin/index/index.html");
                                    $("#a2").attr("href", "/admin/index/index.html")
                                    $("#a3").attr("href", "/admin/index/index.html")
                                    $("#kzt").attr("href", "/admin/index/index.html")
                                }
                               
                                else
                                {
                                    $("#a1").attr("href", "/login/panel-tabs/index.html");
                                    $("#a2").attr("href", "/login/PublicityManage/edit.html")
                                    $("#a3").attr("href", "/login/publicityManage/editall.html")
                                    $("#kzt").attr("href", "/login/publicityManage/editall.html")
                                }
                              
                            }else{
                                Util.error("show",data.message);
                            }
                        },
                        error: function () {
                            Util.pageinit();
                            Util.error("show","系统异常");
                        }
                    });
                }else{
                    Util.error("show",data.message);
                   
                }
            },
            error: function () {
                Util.pageinit();
                Util.error("show","系统异常");
            }
        });




    });


    //开始改动
    //获取全部种类大类
    $.ajax({
        url: Util.service.GetAllClassifyMainMenu,
        type: "POST",
        data: {
            VisitID: hbVisitID
        },
        beforeSend: function () {
            Util.pageLoading();
        },
        success: function (data) {
            Util.pageinit();
            if (data.success === 1) {
                data.resultData = JSON.parse(data.resultData);
                for(var i in data.resultData){
                    if(data.resultData[i].ChildClassfy){
                        data.resultData[i].ChildClassfy = JSON.parse(data.resultData[i].ChildClassfy);
                    }
                }
                console.log("种类"+JSON.stringify(data))
                //种类
                $("#classListNav").html(template("classTemplate", data));

               
                //改动单位 直接显示前20个单位
                $("#unitListNav").html(template("classTemplate", data));
             
                // 种类添加各项弹窗信息
                $("#classListNav").find("a.leaf").each(function(){
                    var $self = $(this);
                    var id = $(this).data("id");
                    $.ajax({
                        url: Util.service.GetAllClassifySecondMenu,
                        type: "POST",
                        data:{classifyID:id},
                        success: function (data) {
                            Util.pageinit();
                            if (data.success === 1) {
                                data.resultData = JSON.parse(data.resultData);
                                for(var i in data.resultData){
                                    if(data.resultData[i].ChildClassfy){
                                        data.resultData[i].ChildClassfy = JSON.parse(data.resultData[i].ChildClassfy);
                                    }
                                }
                                if(data.resultData && data.resultData.length > 0 ){
                                    $self.parent().addClass("parent-leaf");
                                    $self.attr("data-content",template("contentTemplate",data));
                                    $self.popover({
                                        html: true,
                                        placement:"auto",
                                        delay: {show:0, hide:500}
                                    });
                                }
                            }else{
                                // Util.error("show",data.message);
                                console.log(data.message)
                            }
                        },
                        error: function () {
                            // Util.error("show","系统异常");
                        }
                    });
                });
                // 单位添加各项弹窗信息
                $("#unitListNav").find("a.leaf").each(function(){
                    var $self = $(this);
                    var id = $(this).data("id");
                    $.ajax({
                        url: Util.service.GetAllOrganizationMenu,
                        type: "POST",
                        data:{classifyID:id, VisitID: hbVisitID },
                        success: function (data) {
                            Util.pageinit();
                            if (data.success === 1) {
                                data.resultData = JSON.parse(data.resultData).slice(0,15);
                                data.classifyID = id;
                                for(var i in data.resultData){
                                    if(data.resultData[i].ChildClassfy){
                                        data.resultData[i].ChildClassfy = JSON.parse(data.resultData[i].ChildClassfy);
                                    }
                                }
                                if(data.resultData && data.resultData.length > 0 ){
                                    $self.parent().addClass("parent-leaf");
                                    $self.attr("data-content",template("unitTemplate",data));
                                    $self.popover({
                                        html:true,
                                        placement:"right",
                                    });
                                }
                            }else{
                                // Util.error("show",data.message);
                                console.log(data.message)
                            }
                        },
                        error: function () {
                            // Util.error("show","系统异常");
                        }
                    });
                });
               
            }else{
                // Util.error("show",data.message);
                console.log(data.message)
            }
        },
        error: function () {
            Util.pageinit();
            // Util.error("show","系统异常");
        }
    });

    $("#classNav").on("mouseenter",".parent-leaf",function(){
        $(this).find("a").popover("show");
    });

    $("#classNav").on("mouseleave",".parent-leaf",function(){
        setTimeout(classNav_mouseleave($(this)), 200);
    });

    //获取地域列表
    //$.ajax({
    //    url: Util.service.GetAllProvinceSYPub,
    //    type: "POST",
    //    success: function (data) {
    //        Util.pageinit();
    //        if (data.success === 1) {
    //            data.resultData = JSON.parse(data.resultData);
    //            $("#areaListNav").html(template("areaTemplate",data));
    //        }else{
    //           Util.error("show",data.message);
    //        }
    //    },
    //    error: function () {
    //        Util.error("show","系统异常");
    //    }
    //});


    //获取单位列表 直接显示前20个单位
    //$.ajax({
    //    url: Util.service.GetAllOrganizationMenu,
    //    type: "POST",
    //    data: { classifyID: 9, VisitID: hbVisitID },
    //    success: function (data) {
    //        console.log(data)
    //        Util.pageinit();
    //        if (data.success === 1) {
    //            data.resultData = JSON.parse(data.resultData);
    //            console.log(data.resultData);
    //            for (var i = 0; i < data.resultData.length; i++) {
    //                if (i <= 18) {
    //                    $("#unitListNav").append("<li><a href='notification.html?id=9&OrganizationName=" + data.resultData[i].OrganizationName + "'>" + data.resultData[i].OrganizationName + "</a></li>")
                     
    //                    //if(i>14)
    //                    //{
    //                    //    //id=13&OrganizationName=泰安市农业科学研究院
    //                    //    $("#unitListNav").append("<li><a href='notification.html?id=10&OrganizationName=" + data.resultData[i].OrganizationName + "'>" + data.resultData[i].OrganizationName + "</a></li>")
    //                    //}
    //                    //else
    //                    //{
                           
    //                    //}
    //                }
    //            }
    //            $("#unitListNav").append('<a style="padding:20px 0 0 135px">查看更多</a>')
    //        } else {
    //            Util.error("show", data.message);
    //        }
    //    },
    //    error: function () {
    //        Util.error("show", "系统异常");
    //    }
    //});

   
 

    //点击弹窗的分类导航
    $("#classNav").on("click","a",function(){
        if ($(this).data("provinceid")) {
            //地域
            window.open("/notification.html?provinceID="+$(this).data("provinceid"));
        } else if ($(this).data("id") && $(this).data("organizationname")) {
            //单位
            window.open("/notification.html?id="+ $(this).data("id") + "&OrganizationName="+$(this).data("organizationname"))
        } else if ($(this).data("id")) {
            //种类
            window.open("/notification.html?id="+ $(this).data("id"))
        }
    });

    //停止改动

    // 获取公示公告推荐列表
    $.ajax({
        url: Util.service.GetALLPublicityListYK,
        type: 'POST',
        data: {
            'draw': 1,
            'start': 0,
            'length': 6,
            'VisitID': hbVisitID,
            'RetrievalInfo': JSON.stringify({
                'State': '1,4',
                'IsRecommend': '1'
            })
        },
        beforeSend: function () {
            Util.pageLoading();
        },
        success: function (data) {
            Util.pageinit();
            if (data.success === 1) {
                data.resultData = JSON.parse(data.resultData);
                data.resultData.data = JSON.parse(data.resultData.data);
                data.resultData.data.forEach(function(item, i){
                    if(item.ImagePath == null || item.ImagePath == ''){
                        item.ImagePath = Util.image_default;
                    }
                    else{
                        item.ImagePath = item.ImagePath.indexOf('http://')==0 ? item.ImagePath : Util.filepath+item.ImagePath;
                    }
                });
                $('#publicitylist').html(template('template_publicitylist', data.resultData));
            } else {
                // Util.error("show",data.message)
                Util.error('show', '服务器繁忙，请稍后再试……');
            }
        },
        error: function () {
            //服务器错误
            Util.pageinit();
            Util.error("show","服务器错误")
        }
    });
});







