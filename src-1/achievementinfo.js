/**
 * Created by zhujianlin on 2017/6/4.
 */
$(function(){
    var id = Util.getUrlParam("id");
    var creatorId = '';


    (function(){
        if(id){
            $.ajax({
                url: Util.service.GetAchievementByAchIDPub,
                //url: Util.service.GetAchievementByAchID,
                type: 'POST',
                data: { "achID": id },
                beforeSend: function () {
                    Util.pageLoading();
                },
                success: function (data) {
                    Util.pageinit();
                    //console.info(data);
                    if (data.success === 1) {
                        data.resultData = JSON.parse(data.resultData);
                        data.resultData.ImageVideo = JSON.parse(data.resultData.ImageVideo);
                        data.resultData.AchievementImageIPRNumber = JSON.parse(data.resultData.AchievementImageIPRNumber);
                        data.resultData.AchievementClassify = JSON.parse(data.resultData.AchievementClassify);

                        data.resultData.Achievement = JSON.parse(data.resultData.Achievement);
                        $("#myCarousel").html(template("template",data.resultData));
                        $('#myCarousel .carousel-inner .item').eq(0).addClass('active');
                        $("#imgVidel").html(template("imgVideo", data.resultData));


                        $("#achTitle").html(data.resultData.Achievement.AchieveName)
                        $("#wordDesc").html(data.resultData.Achievement.AchieveDesc);
                        data.resultData.Keywords = JSON.parse(data.resultData.Keywords);
                        var keywords = '';
                        for(var i in data.resultData.Keywords){
                            keywords += data.resultData.Keywords[i].KeyName;
                            keywords += (i == data.resultData.Keywords.length - 1 ) ? "":","
                        }
                        data.resultData.Achievement.keywords = keywords;

                        // var classNames = '';
                        // for(var i in data.resultData.AchievementClassify){
                        //     classNames += data.resultData.AchievementClassify[i].ClassifyName;
                        //     classNames += (i == data.resultData.AchievementClassify.length - 1 ) ? "":","
                        // }
                        //
                        // data.resultData.Achievement.classNames = classNames;

                        data.resultData.Achievement.AchievementClassify = data.resultData.AchievementClassify;

                        $("#mainMessage").html(template("mainTemplate",data.resultData.Achievement))
                        //console.log(data.resultData.Achievement.AchievementClassify[0].ClassifyID);
                        //console.log(data.resultData);
                        $("#productInfo").html(template("productTemplate",data.resultData))

                        //实现top排行榜
                        //var hot = data.resultData.Achievement.AchievementClassify
                        //console.log(hot);
                        var infoId = data.resultData.Achievement.AchievementClassify[0].ClassifyID
                        $.ajax({
                            url: Util.service.GetAllAchievemrntByClassify,
                            type: "POST",
                            data: {"classifyID": infoId, "start": 0, "length": 10, "draw": 1, "retrievalInfo" : "{}"},
                            success: function (data) {
                                    var res = JSON.parse(data.resultData);
                                    var res1 = JSON.parse(res.data);
                                    var res2 = {};
                                    res2.list = res1;
                                    console.log(res2);
                                    $("#topInfo").html(template("top10", res2));
                            },
                            error: function () {
                                Util.error("show","系统异常");
                            }
                        });


                        creatorId = data.resultData.Achievement.UserID;
                        //根据creatorId查询用户信息（因为登录方式改为session故不能用userid判断）
                        var loginnamenow = "";
                        var user = Util.getUserLoginData();
                        $.ajax({
                            url: Util.service.GetUserInfoByIDPub,
                            type: 'POST',
                            data: { "ID": creatorId },
                            beforeSend: function () {
                               
                            },
                            success: function (data1) {                              
                                if (data1.success === 1) {
                                    data1.resultData = JSON.parse(data1.resultData);
                                    loginnamenow = data1.resultData["LoginName"];
                                    if (user && loginnamenow == user.LoginName) {
                                        $(".btn-collection").hide();
                                        $(".btn-price").hide();
                                    }
                                }
                                else {
                                    console.error("系统错误")
                                }
                            },
                            error: function () {
                                console.error("系统错误")
                                //Util.pageinit();
                            }
                        });
                        if(data.resultData.Achievement.Status == "交易结束"){
                            $(".btn-price").hide();
                        }
                      
                        if(user && user.IsAdmin){
                            $(".btn-collection").hide();
                            $(".btn-price").hide();
                        }

                    } else {
                        console.error("系统错误");
                    }
                },
                error: function () {
                    console.error("系统错误");
                    Util.pageinit();
                }
            });
        }else{
            Util.error("show","参数错误")
        }
    }())
    

    //鼠标图片放大镜
    var mul = 5; 
    $(document).on({
        mouseover:  function (e) {
            var attrClass = $(e.target).attr("class");
            if(attrClass == "item active"){

                var url = $(e.target).css("backgroundImage").replace('url("','').replace('")','');
                $("#img2_img").attr("src", url);

                $("#img_max").css("display", "block"); 
                $("#mousebg").css("display", "block"); 
            }
        },
        mouseout: function (e) {
            var attrClass = $(e.target).attr("class");
            if(attrClass == "item active"){

                var url = $(e.target).css("backgroundImage").replace('url("','').replace('")','');
                $("#img2_img").attr("src", url);

                $("#img_max").css("display", "none"); 
                $("#mousebg").css("display", "none"); 
            }
        },
        mousemove: function (e) {
            var _event = event||window.event;
            var attrClass = $(e.target).attr("class");
            if(attrClass == "item active"){
                var url = $(e.target).css("backgroundImage").replace('url("','').replace('")','');
                $("#img2_img").attr("src", url);

                var mouseX = _event.clientX - $("#wrapper").offset().left - $("#img_min").offset().left;  
                //计算鼠标相对与小图的位置  
                var mouseY = _event.clientY - $("#wrapper").offset().top - $("#img_min").offset().top;  
          
                //特殊情况处理，分别靠近四条边的时候  
                if(mouseX < $("#mousebg")[0].offsetWidth/2){  
                    mouseX = $("#mousebg")[0].offsetWidth/2;  
                }  
                if(mouseX > $("#img_min")[0].offsetWidth-$("#mousebg")[0].offsetWidth/2){  
                    mouseX = $("#img_min")[0].offsetWidth-$("#mousebg")[0].offsetWidth/2;  
                }  
                if(mouseY<$("#mousebg")[0].offsetHeight/2){  
                    mouseY = $("#mousebg")[0].offsetHeight/2;  
                }  
                if(mouseY>$("#img_min")[0].offsetHeight-$("#mousebg")[0].offsetHeight/2){  
                    mouseY = $("#img_min")[0].offsetHeight-$("#mousebg")[0].offsetHeight/2;  
                }  
                //计算大图的显示范围 
                $("#img2_img").css("left", -mul * mouseX + $("#img_max")[0].offsetWidth+"px") 
                $("#img2_img").css("top", -mul * mouseY + $("#img_max")[0].offsetHeight+"px") 

               //使鼠标在白块的中间 
                $("#mousebg").css("left", mouseX-$("#mousebg")[0].offsetWidth+"px") 
                $("#mousebg").css("top", mouseY-$("#mousebg")[0].offsetHeight/1.2+"px") 
                 
          
            }
        }
    })

    //点击交易详情获取公示公告列表
    $(".dealDetail").on('click', function() {
        if (id){
            /*$.ajax({
                url: Util.service.GetPublicssByAchID,
                type: 'POST',
                data: { "achID": id, "start": 0, "draw": 0, "length": 10  },
                success: function (data) {
                    var data = JSON.parse(data.resultData);
                    //console.log(JSON.parse(data.data));
                    var dealList = {};
                    dealList.list = JSON.parse(data.data);
                    console.log(dealList);
                    $("#dealDetail").html(template("dealDetailTemplate", dealList))
                    
                },
                error: function () {
                    console.error("系统错误");
                    Util.pageinit();
                }
            })*/
            
            $.ajax({
                url: Util.service.GetTransByAchID,
                type: 'POST',
                data: { "achID": id  },
                success: function (data) {
                    
                    var data1 = JSON.parse(data.resultData);
                    //console.log(data1);
                    var dealList = {};
                    dealList.list = data1;
                    console.log(dealList);
                    $("#dealDetail").html(template("dealDetailTemplate", dealList))
                },
                error: function () {
                    console.error("系统错误");
                    Util.pageinit();
                }
            })

        }else {
            Util.error("show","参数错误");
        }
    })

    $(".tab-list .tab-title").on("click",function(){
        var index = $(this).data("index");
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        var $tab = $(this).parent().siblings(".tab-box").find("[data-index="+index+"]");
        $tab.siblings().hide();
        $tab.show();
    })

    ////GUID和验证码
    //function getIdentifyingCode() {
    //    $.ajax({
    //        url: Util.service.GetValidatePic,
    //        type: "POST",
    //        success: function (data) {
    //            Util.pageinit();
    //            if (data.success === 1) {
    //                data.resultData = JSON.parse(data.resultData);
    //                $("#loginForm").find("[name=GUID]").val(data.resultData.GUID);
    //                $("#loginForm").find("img.code-img").attr("src", data.resultData.PicPath);
    //            }
    //        },
    //        error: function () {
    //            Util.pageinit();
    //        }
    //    });
    //}
    //getIdentifyingCode();
    //收藏
    $("#mainMessage").on("click",".btn-collection",function(e){
        e.preventDefault();
        if(!Util.getUserId()){
            //Util.confirm("请先登录！",function () {
            //    window.location.href="/index.html";
            //});
            //$("#loginModal").modal("show");
            //return;
            Util.login();
            return;
        }
        $.ajax({
            url: Util.service.AddToMyFavorites,
            type: 'POST',
            data: { "achID": id ,"userID":Util.getUserId()},
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                 Util.pageinit();
                console.info(data);
                if (data.success === 1) {
                    Util.success("show","收藏成功！");
                } else {
                    Util.error("show",data.message);
                }
            },
            error: function () {
                Util.error("系统错误");
                Util.pageinit();
            }
        });
    })



    //报价
    $("#mainMessage").on("click",".btn-price",function(e){
        e.preventDefault();
        if(!Util.getUserId()){
            //Util.confirm("请先登录！",function () {
            //    window.location.href="/index.html";
            //});
            //return ;
            Util.login();
            return;
        }else{
            var loginData=Util.getUserLoginData();
            console.log(loginData);
            if(loginData.Type==0 && !loginData.IDCard){
                Util.confirm("请先进行身份认证！",function () {
                    window.location.href="/login/baseInfor/index.html";
                });
                return ;
            }else if(loginData.Type==1 && !loginData.CorporateNumber){
                Util.confirm("请先进行身份认证！",function () {
                    window.location.href="/login/baseInfor/index.html";
                });
                return ;
            }else if(creatorId == Util.getUserId()){
                Util.warning("show","成果创建者不能出价！");
                return ;
            }else if(loginData.IsApprove==1){
                var type = $(this).attr("data-type");

                if(type == 0){
                    // $("#discussModal").modal("show");
                    // $("#discussModal").find("textarea").val("");
                    //议价查看
                    $.ajax({
                        url: Util.service.GetAchievementDiscussListByUserID,
                        type: 'POST',
                        data:{"achID":id,userID:Util.getUserId()},
                        beforeSend: function () {
                            Util.pageLoading();
                        },
                        success: function (data) {
                            Util.pageinit();
                            if (data.success === 1) {
                                if(typeof data.resultData == "string"){
                                    data.resultData = JSON.parse(data.resultData);
                                }
                                console.info(data)
                                $("#Table2 tbody").html(template("template2", data));
                                $("#checkModal2").modal("show");
                                if($("#Table2 tbody").find(".detail").length== 1){
                                    $("#Table2 tbody").find(".detail").trigger("click");
                                }
                            }else{
                                console.error("系统错误")
                            }
                        },
                        error: function () {
                            console.error("系统错误")
                            Util.pageinit();
                        }
                    });
                }else if(type == 1){
                    //竞价
                    $.ajax({
                        url: Util.service.GetCurrentCompeteDetailByAchID,
                        type: 'POST',
                        data: { "achID": id},
                        beforeSend: function () {
                            Util.pageLoading();
                        },
                        success: function (data) {
                            Util.pageinit();
                            console.info(data);
                            if (data.success === 1) {
                                data.resultData = JSON.parse(data.resultData);
                                if(data.resultData.constructor == Array && data.resultData.length > 0){
                                    data.resultData = data.resultData[0];
                                }
                                $("#completeArea").html(template("completeTpl",data.resultData))

                                $("#completeModal").modal("show");


                                $("#completeModal").find(".btn-save").attr("data-currentPrice",data.resultData.CurrentPrice);
                            } else {
                                Util.error("show",data.message);
                            }
                        },
                        error: function () {
                            Util.error("系统错误");
                            Util.pageinit();
                        }
                    });
                }else{
                    Util.warning("show","系统异常！");
                }

            }else if((loginData.IDCard||loginData.CorporateNumber)&&loginData.IsApprove==0){
                Util.warning("show","身份认证审核中……，请稍后再试！");
            }else {
                Util.warning("show","系统异常！");
            }
        }

    })


    //和某人的议价详情
    $("#checkModal2").on("click",".detail",function(e){
        e.preventDefault();
        var id = $(this).data("id");
        var name = $(this).data("name");
        $.ajax({
            url: Util.service.GetAllMessageByDiscussIDAndUserID,
            type: 'POST',
            data:{"discussID":id,userID:Util.getUserId()},
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                if (data.success === 1) {
                    if(typeof data.resultData == "string"){
                        data.creatorId =creatorId;
                        data.userId =Util.getUserId();
                        data.resultData = JSON.parse(data.resultData);
                    }
                    $("#chatlist").html(template("template3", data)).show();
                    $("#chatlist").scrollTop(document.getElementById("chatlist").scrollHeight);
                }else{
                    console.error("系统错误")
                }
            },
            error: function () {
                console.error("系统错误")
                Util.pageinit();
            }
        });

    })


    $("#completeModal").on("click",".btn-save",function(){
        var currentPrice = $(this).attr("data-currentPrice");
        //竞价
        $.ajax({
            url: Util.service.CompeteOneInAchement,
            type: 'POST',
            data: { "acheID": id,"userID":Util.getUserId(),currentPrice:currentPrice},
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                console.info(data);
                if (data.success === 1) {
                    Util.success("show","出价成功！");
                    $("#completeModal").modal("hide")
                } else {
                    Util.error("show",data.message);
                }
            },
            error: function () {
                Util.error("系统错误");
                Util.pageinit();
            }
        });
    })


    $("#checkModal2").on("click",".submit",function(){
        var discussContent = $("#checkModal2").find("[name=message]").val();
        if(!discussContent){
            return ;
        }
        //竞价
        $.ajax({
            url: Util.service.DiscussOneInAchement,
            type: 'POST',
            data: { "acheID": id,"userID":Util.getUserId(),"discussContent":discussContent},
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                console.info(data);
                if (data.success === 1) {
                    Util.success("show","留言成功！");
                    $("#checkModal2").modal("hide")
                    $("#checkModal2").find("[name=message]").val("");
                    $("#chatlist").hide();
                } else {
                    Util.error("show",data.message);
                }
            },
            error: function () {
                Util.error("系统错误");
                Util.pageinit();
            }
        });
    })


    $("#checkModal2").on("click",".confirm",function(){
        var  id = $(this).attr("data-id");
        //竞价
        $.ajax({
            url: Util.service.FinishTrade,
            type: 'POST',
            data: { "discussID": id,"endTradeUserID":Util.getUserId()},
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                console.info(data);
                if (data.success === 1) {
                    Util.success("show","出价成功！");
                    $("#checkModal2").modal("hide")
                } else {
                    Util.error("show",data.message);
                }
            },
            error: function () {
                Util.error("系统错误");
                Util.pageinit();
            }
        });
    })

    //拒绝
    $("#checkModal2").on("click",".refuse",function(){
        var  id = $(this).attr("data-id");
        //竞价
        $.ajax({
            url: Util.service.RefuseTrade,
            type: 'POST',
            data: { "discussID": id,"refuseUserID":Util.getUserId()},
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                console.info(data);
                if (data.success === 1) {
                    Util.success("show","拒绝成功！");
                    $("#checkModal2").modal("hide")
                } else {
                    Util.error("show",data.message);
                }
            },
            error: function () {
                Util.error("系统错误");
                Util.pageinit();
            }
        });
    })


    //发起交易 - 弹框
    $("#checkModal2").on("click","button.trade",function(e){
        e.preventDefault();
        var id = $(this).data("id");
        $("#tradeModal").modal("show");
        $("#tradeForm").find("[name=discussID]").val(id);
    })


    //发起交易
    $("#tradeModal").on("click","button.submit",function(e){
        e.preventDefault();
        var json = $("#tradeForm").serializeJson();
        if(!json.price || isNaN(json.price)){
            Util.warning("show","请填写价格");
            return;
        }
        json.startTradeUserID = Util.getUserId();
        $.ajax({
            url: Util.service.AddNewTrade,
            type: 'POST',
            data:json,
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                if (data.success === 1) {
                    Util.success("show","操作成功");
                    $("#tradeModal").modal("hide");
                    $("#checkModal2").modal("hide");
                }else{
                    Util.error("show",data.message);
                }
            },
            error: function () {
                console.error("系统错误")
                Util.error("show","系统错误");
                Util.pageinit();
            }
        });

    })
    var test = "http://wap.agrittex.com/ach/detail/" + id;

    //var test = window.location.href
    //二维码
    $("#code").qrcode({
        render: "canvas", //table方式
        width: 120, //宽度
        height: 120, //高度
        text: test //任意内容
    });

  


    //function checklogin(formData) {      
    //    $("#yhm").hide();
    //    $("#mima").hide();
    //    $("#yz").hide();
    //    var a = true;
    //    if (!formData.userName) {
    //        $("#yhm").show();
    //        $("#yhm").text("请输入用户名");
    //        if (!formData.password) {
    //            $("#mima").show();
    //            $("#mima").text("请输入密码");
    //        }
    //        if (!formData.Code) {
    //            $("#yz").show();
    //            $("#yz").text("请输入验证码");
    //        }
    //        a = false;
    //    }
    //    if (!formData.password) {
    //        $("#mima").show();
    //        $("#mima").text("请输入密码");
    //        if (!formData.userName) {
    //            $("#yhm").show();
    //            $("#yhm").text("请输入用户名");
    //        }
    //        if (!formData.Code) {
    //            $("#yz").show();
    //            $("#yz").text("请输入验证码");
    //        }
    //        a = false;
    //    }
    //    if (!formData.Code) {
    //        $("#yz").show();
    //        $("#yz").text("请输入验证码");
    //        if (!formData.userName) {
    //            $("#yhm").show();
    //            $("#yhm").text("请输入用户名");
    //        }
    //        if (!formData.password) {
    //            $("#mima").show();
    //            $("#mima").text("请输入密码");
    //        }
    //        a = false;
    //    }       
    //    return a;
    //}
    ////登录
    //$("#loginForm").on("click", ".submit", function (e) {
    //    e.preventDefault();
    //    var formData = $("#loginForm").serializeJson();
    //    if (checklogin(formData) == false) {
    //        return;
    //    }
    //    else { 
    //    $.ajax({
    //        url: Util.service.CheckPicCode,
    //        type: "POST",
    //        data: formData,
    //        beforeSend: function () {
    //            Util.pageLoading();
    //        },
    //        success: function (data) {
    //            Util.pageinit();
    //            //先验证
    //            if (data.success === 1) {
    //                $.ajax({
    //                    url: Util.service.Login,
    //                    type: "POST",
    //                    data: formData,
    //                    beforeSend: function () {
    //                        Util.pageLoading();
    //                    },
    //                    success: function (data) {
    //                        Util.pageinit();
    //                        //登录
    //                        if (data.success === 1) {
    //                            //$("#loginForm").find("[name=userName]").val("");
    //                            //$("#loginForm").find("[name=Code]").val("");
    //                            $("#loginForm [name=password]").val("");
    //                            $("#loginForm [name=Code]").val("");
    //                            data.resultData = JSON.parse(data.resultData);
    //                            console.log(data.resultData);
    //                            Util.setUserLogin(data.resultData);//保存到localstorage
    //                            $("#loginForm").hide();

    //                            $(".gotoAdmin").show();
    //                            var user = Util.getUserLoginData();

    //                            if (user && user.IsAdmin) {
    //                                //更改
    //                                $("#a1").attr("href", "/admin/index/index.html");
    //                                $("#a2").attr("href", "/admin/index/index.html")
    //                                $("#a3").attr("href", "/admin/index/index.html")
    //                                $("#kzt").attr("href", "/admin/index/index.html")
    //                            }

    //                            else {
    //                                $("#a1").attr("href", "/login/panel-tabs/index.html");
    //                                $("#a2").attr("href", "/login/PublicityManage/edit.html")
    //                                $("#a3").attr("href", "/login/publicityManage/editall.html")
    //                                $("#kzt").attr("href", "/login/publicityManage/editall.html")
    //                            }

    //                        } else {
    //                            Util.error("show", data.message);
    //                        }
    //                    },
    //                    error: function () {
    //                        Util.pageinit();
    //                        Util.error("show", "系统异常");
    //                    }
    //                });
    //            } else {
    //                //Util.error("show", data.message);
    //                $("#yz").show();
    //                $("#yz").text(data.message);
    //            }
    //        },
    //        error: function () {
    //            Util.pageinit();
    //            Util.error("show", "系统异常");
    //        }
    //    });
    //}



    //});
})
