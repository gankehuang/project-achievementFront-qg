/**
 * Created by zhujianlin on 2017/6/16.
 */
/**
 * Created by zhujianlin on 2017/6/16.
 */
/**
 * Created by zhujianlin on 2017/6/3.
 */

$(function(){

    var name = Util.getUrlParam("name");

    $("title").text(name);
    $("#title").text(name);

    if(name=='中国农业科学院郑州果树研究所'){
        var ele_banner = '<div class="banner" id="banner">\
                            <a href="javascript:void(0);" class="d1" style="background:url(/images/company/1.jpg) center no-repeat;background-size:cover;"></a>\
                            <a href="javascript:void(0);" class="d1" style="background:url(/images/company/2.jpg) center no-repeat;background-size:cover;"></a>\
                            <a href="javascript:void(0);" class="d1" style="background:url(/images/company/3.jpg) center no-repeat;background-size:cover;"></a>\
                            <a href="javascript:void(0);" class="d1" style="background:url(/images/company/4.jpg) center no-repeat;background-size:cover;"></a>\
                            <div class="d2" id="banner_id">\
                                <ul>\
                                    <li></li>\
                                    <li></li>\
                                    <li></li>\
                                    <li></li>\
                                </ul>\
                            </div>\
                        </div>';
        $('#classList .tab-content[data-index=1]').prepend(ele_banner);
        $('#classList .adv-left').show();
    }

    $(".tab-list .tab-title").on("click",function(){
        var index = $(this).data("index");
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        var $tab = $(this).parent().siblings(".tab-box").find("[data-index="+index+"]");
        $tab.siblings().hide();
        $tab.show();
    });

    banner();

    //获取推荐产品列表
    // $.ajax({
    //     url: Util.service.GetRecentAchByOrganization,
    //     type: "POST",
    //     data:{Organization:name},
    //     success: function (data) {
    //         Util.pageinit();
    //         if (data.success === 1) {
    //             data.resultData = JSON.parse(data.resultData);
    //             if(data.resultData.length > 0){
    //                 $("#advList").html(template("advTemplate",data));
    //             }else{
    //                 $("#advList").html("单位还没有发布成果");
    //             }

    //         }else{
    //             Util.error("show",data.message);
    //         }
    //     },
    //     error: function () {
    //         Util.error("show","系统异常");
    //     }
    // });

    

    //获取tab内容
    var clickText = "主页";
    $(".tab-list div").on('click', function() {
        clickText = $(this).html();
        $("#int").val("");

        if( clickText == "主页" || clickText == "成果" ){
            gitAchievementList ("");
        }else if(clickText == "需求") {
            getRequirementList ("");
        }
    })

    //点击搜索
    $("#span").on('click', function() {
        var int = $("#int").val();
        if( clickText == "主页" || clickText == "成果" ){
            gitAchievementList (int);
        }else if(clickText == "需求") {
            getRequirementList (int);
        }
    })

    //获取成果列表
    var data_AllAchievement;
    function gitAchievementList (text) {
        $.ajax({
            url: Util.service.GetAllAchievementByOrganization,
            type: "POST",
            data:{OrganizationName:name ,Contents: text, VisitID: hbVisitID },
            success: function (data) {
                Util.pageinit();
                if (data.success === 1) {
                    data.resultData = JSON.parse(data.resultData);
                    console.log(data.resultData)
                    data_AllAchievement = data;
                    if(data.resultData.length > 0){
                        $("#achList").html(template("achTemplate",data));

                        // 获取推荐成果（暂取前10个成果）
                        var data_adv = $.extend({},data);
                        data_adv.resultData = data.resultData.slice(0,10);
                        $("#advList").html(template("advTemplate",data_adv));
                    }else{
                        $("#achList").html("单位还没有发布成果");

                        // 获取推荐成果（暂取前10个成果）
                        $("#advList").html("单位还没有发布成果");
                    }

                }else{
                    Util.error("show",data.message);
                }
            },
            error: function () {
                Util.error("show","系统异常");
            }
        });
    }
    gitAchievementList ("")

    //获取需求列表
    function getRequirementList (text) {
        $.ajax({
            url: Util.service.GetAllRequirementByOrganization,
            type: "POST",
            data:{ Organization:name, Contents: text, VisitID: hbVisitID },
            success: function (data) {
                Util.pageinit();
                if (data.success === 1) {
                    data.resultData = JSON.parse(data.resultData);
                    if(data.resultData.length > 0){
                        $("#requireList").html(template("requireTemplate",data));
                    }else{
                        $("#requireList").html("单位还没有发布需求");
                    }

                }else{
                    Util.error("show",data.message);
                }
            },
            error: function () {
                Util.error("show","系统异常");
            }
        });
    }
    getRequirementList ("") 


    // 主页-品种分类点击操作
    $('#classList .adv-left .classlist').on('click', '.btn', function(){
        var newlist = [];
        var classname = $(this).data('name');
        for(i in data_AllAchievement.resultData){
            if(classname == '所有' && i<10){
                newlist.push(data_AllAchievement.resultData[i]);
            }
            else if(data_AllAchievement.resultData[i].AchieveName.indexOf(classname) == 0){
                newlist.push(data_AllAchievement.resultData[i]);
            }
        }
        //console.log(data_AllAchievement)
        //console.log( $.extend({},data_AllAchievement) );
        //console.log( $.extend($.extend({},data_AllAchievement),{resultData:newlist})) 

        $("#advList").html(template("advTemplate",$.extend($.extend({},data_AllAchievement),{resultData:newlist})));
    });


    function banner(){  
        var bn_id = 0;
        var bn_id2= 1;
        var speed33=5000;
        var qhjg = 1;
        var MyMar33;
        $("#banner .d1").hide();
        $("#banner .d1").eq(0).fadeIn("slow");
        if($("#banner .d1").length>1)
        {
            $("#banner_id li").eq(0).addClass("nuw");
            function Marquee33(){
                bn_id2 = bn_id+1;
                if(bn_id2>$("#banner .d1").length-1)
                {
                    bn_id2 = 0;
                }
                $("#banner .d1").eq(bn_id).css("z-index","2");
                $("#banner .d1").eq(bn_id2).css("z-index","1");
                $("#banner .d1").eq(bn_id2).show();
                // $("#banner .d1").eq(bn_id).fadeOut("slow");
                $("#banner .d1").eq(bn_id).hide();
                $("#banner_id li").removeClass("nuw");
                $("#banner_id li").eq(bn_id2).addClass("nuw");
                bn_id=bn_id2;
            };
            MyMar33=setInterval(Marquee33,speed33);
            $("#banner_id li").click(function(){
                var bn_id3 = $("#banner_id li").index(this);
                if(bn_id3!=bn_id&&qhjg==1)
                {
                    qhjg = 0;
                    $("#banner .d1").eq(bn_id).css("z-index","2");
                    $("#banner .d1").eq(bn_id3).css("z-index","1");
                    $("#banner .d1").eq(bn_id3).show();
                    // $("#banner .d1").eq(bn_id).fadeOut("slow",function(){qhjg = 1;});
                    $("#banner .d1").eq(bn_id).hide();
                    qhjg = 1;
                    $("#banner_id li").removeClass("nuw");
                    $("#banner_id li").eq(bn_id3).addClass("nuw");
                    bn_id=bn_id3;
                }

            })

            $("#banner_id").hover(
                function(){
                    clearInterval(MyMar33);
                }
                ,
                function(){

                    MyMar33=setInterval(Marquee33,speed33);
                }
            )   

        }

        else

        {
            $("#banner_id").hide();

        }
    }

});
