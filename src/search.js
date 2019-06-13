/**
 * Created by zhujianlin on 2017/6/16.
 */
/**
 * Created by zhujianlin on 2017/6/3.
 */

$(function(){

    var keyword = Util.getUrlParam("k");

    $(".tab-list .tab-title").on("click",function(){
        var index = $(this).data("index");
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        var $tab = $(this).parent().siblings(".tab-box").find("[data-index="+index+"]");
        $tab.siblings().hide();
        $tab.show();

    });
$("#keyword").attr("value",keyword);
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

                $("#classListNav").html(template("classTemplate",data));
                $("#unitListNav").html(template("classTemplate",data));
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
                            Util.error("show","系统异常");
                        }
                    });
                });

                $("#unitListNav").find("a.leaf").each(function(){
                    var $self = $(this);
                    var id = $(this).data("id");
                    $.ajax({
                        url: Util.service.GetAllOrganizationMenu,
                        type: "POST",
                        data:{ classifyID:id, VisitID: hbVisitID },
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
                            Util.error("show","系统异常");
                        }
                    });
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


    $("#classNav").on("mouseenter",".parent-leaf",function(){
        $(this).find("a").popover("show");
    });

    $("#classNav").on("mouseleave",".parent-leaf",function(){
        setTimeout(classNav_mouseleave($(this)), 200);
    })


    //获取地域列表
    $.ajax({
        url: Util.service.GetAllProvinceSYPub,
        type: "POST",
        success: function (data) {
            Util.pageinit();
            if (data.success === 1) {
                data.resultData = JSON.parse(data.resultData);
                $("#areaListNav").html(template("areaTemplate",data));
            }else{
                Util.error("show",data.message);
            }
        },
        error: function () {
            Util.error("show","系统异常");
        }
    });



    //点击分类导航
    $("#classNav").on("click","a",function(){
        if($(this).data("provinceid")){
            window.location.href = "/notification.html?provinceID="+$(this).data("provinceid");
        }else if($(this).data("id") && $(this).data("organizationname")){
            window.location.href = "/notification.html?id="+ $(this).data("id") + "&OrganizationName="+$(this).data("organizationname");
        }else if($(this).data("id")){
            window.location.href = "/notification.html?id="+ $(this).data("id");
        }
    });







    //table:初始化列表
    var drawTable = $("#dataTable").DataTable({
        "pageLength": Util.perPageLength,
        "processing": true,
        "serverSide": true,
        "paginate": true,
        "info": false,
        "lengthChange": false,
        "ordering": true,
        "searching": false,
        "ajax": {
            "url": Util.service.GetAllAchandOriganizationByKeyword,
            "type": "POST",
            "dataSrc": "data",
            "dataType": "json",
            "data": function (v) {
                v.keyword = keyword;
                v.VisitID = hbVisitID;
                return v;
            }
        }, "columns": [
            {
                "data": "Name",
                'orderable': false,
                "className": "text-center",
                "render": function (data,type, full) {
                    var data = full;
                    if(data.AchievementList){
                        data.AchievementList = JSON.parse(data.AchievementLst)
                    }
                    return template("resultTpl",full);
                }
            },

        ],
    });
});
