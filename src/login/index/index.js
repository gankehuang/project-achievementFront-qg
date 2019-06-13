/**
 * Created by wangyinping on 2017/5/22.
 */

$(function(){
    Util.pageinit();
    var loginData = Util.getUserLoginData();
    if (loginData != null) {
        if (loginData.IsAdmin == 1) {
            location.href = "/admin/index/index.html";
        }
    }
    // 当前成果id
    var _achId = '';
    var userid = Util.getUserId();
  
    //table:初始化列表 竞价情况
    var drawTable1 = $("#dataTable1").DataTable({
        "pageLength": Util.perPageLength,
        "processing": true,
        "serverSide": true,
        "paginate": true,
        "info": false,
        "lengthChange": false,
        "ordering": true,
        "searching": false,
        "ajax": {
            "url": Util.service.GetAllCompleteSituationByUserID,
            "type": "POST",
            "dataSrc": "data",
            "dataType": "json",
            "data": function (v) {
                v.userID = userid
                return v;
            }
        }, "columns": [
            {
                "data": "ImagePath",
                "className": "text-center",
                'orderable': false,
                "render": function (data,type, full) {
                    if(data){
                        return '<img src="'+data+'" style="max-width:100px;">';
                    }else{
                        return '';
                    }

                }
            },
            {
                "data": "AchieveName",
                "className": "text-center",
                'orderable': false
            },
            {
                "data": "NowPrice",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "Role",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "AchievementCompeteList",
                'orderable': false,
                "className": "text-center",
                "render": function (data,type, full) {
                    data = JSON.parse(data);
                    console.info(data);
                    var html = '';
                    if(data && data.length > 0){
                        for(var i in data){
                            html += '<div style="display: flex;margin: 10px 0;"><div style="flex:1">'+data[i].CompeteDate+'</div><div style="flex:1">'+data[i].CompetePrice+'</div></div>'
                        }
                    }
                    return html;

                }
            },
            {
                "data": "ID",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    return '<a href="/achievementinfo.html?id='+data+'" target="_blank">[查看]</a>';
                }
            },

        ],

    });



    //table:初始化列表
    var drawTable2 = $("#dataTable2").DataTable({
        "pageLength": Util.perPageLength,
        "processing": true,
        "serverSide": true,
        "paginate": true,
        "info": false,
        "lengthChange": false,
        "ordering": true,
        "searching": false,
        "ajax": {
            "url": Util.service.GetAllDiscussSituationByUserID,
            "type": "POST",
            "dataSrc": "data",
            "dataType": "json",
            "data": function (v) {
                v.userID = Util.getUserId();
                return v;
            }
        }, "columns": [
            {
                "data": "ImagePath",
                "className": "text-center",
                'orderable': false,
                "render": function (data,type, full) {
                    if(data){
                        return '<img src="'+data+'" style="max-width:100px;">';
                    }else{
                        return '';
                    }

                }
            },
            {
                "data": "AchieveName",
                "className": "text-center",
                'orderable': false
            },
            {
                "data": "Role",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "ID",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    var html = '<a href="/achievementinfo.html?id='+data+'" title="查看" target="_blank">成果详情</a>&nbsp;&nbsp;'
                    html += '<a class="detail-check" href="javascript:void(0);" title="出价记录" data-id="'+data+'" data-name="'+full.AchieveName+'"' +
                        ' data-creatorId="'+full.AchOwnerUserID+'">出价记录' +
                        (full.IsRead == 0 ? '<span class="unread"></span>' :'' ) +
                        '</a>'
                    return html;
                }
            },

        ],

    });



    //table:初始化列表
    var drawTable3 = $("#dataTable3").DataTable({
        "pageLength": Util.perPageLength,
        "processing": true,
        "serverSide": true,
        "paginate": true,
        "info": false,
        "lengthChange": false,
        "ordering": true,
        "searching": false,
        "ajax": {
            "url": Util.service.GetAllSelfRecommendByUserID,
            "type": "POST",
            "dataSrc": "data",
            "dataType": "json",
            "data": function (v) {
                v.userID = Util.getUserId();
                return v;
            }
        }, "columns": [
            {
                "data": "RequirName",
                "className": "text-center",
                'orderable': false,
            },
            {
                "data": "Role",
                "className": "text-center",
                'orderable': false
            },
            {
                "data": "ID",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    return '<a href="/login/requireDetail/index.html?id='+data+'"  target="_blank">[查看]</a>';
                }
            },

        ],

    });








    //议价查看
    $("#dataTable2").on("click",".detail-check",function(e){
        e.preventDefault();
        var type = $(this).attr("data-type");
        var id = $(this).attr("data-id");
        var name = $(this).attr("data-name")
        var _achId = id;
        var creatorId = $(this).attr("data-creatorId");

        $("#achName").html(name);
        $("#chatlist").hide();
        $("#disscussForm").hide();
        if(creatorId != Util.getUserId()){
            $("#disscussForm").find("[name=acheID]").val(_achId);
        }else{
            $("#disscussForm").find("[name=acheID]").val("");
        }

        if($(this).find(".unread").length > 0){
            Util.SetTradeRead(Util.getUserId(),id);
            $(this).find(".unread").remove();
        }



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

    });

    //和某人的议价详情
    $("#checkModal2").on("click",".detail",function(e){
        e.preventDefault();
        var id = $(this).data("id");
        var name = $(this).data("name");
        $("#checkModal2").find(".detail").removeClass("on");
        $(this).addClass("on");
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
                        data.name =name;
                        data.resultData = JSON.parse(data.resultData);
                    }
                    data.userId = Util.getUserId();
                    $("#chatlist").html(template("template3", data)).show();
                    $("#chatlist").scrollTop(document.getElementById("chatlist").scrollHeight);
                    $("#disscussForm").show();
                    if(!$("#disscussForm").find("[name=acheID]").val()){
                        $("#disscussForm").find("[name=disscussID]").val(id)
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

    })

    //回复
    $("#sendDisscuss").on("click",function(e){
        e.preventDefault();
        var param = $("#disscussForm").serializeJson();
        var url,jsonData;
        if(param.acheID && param.message){
            url = Util.service.DiscussOneInAchement;
            jsonData = { "acheID": param.acheID,"userID":Util.getUserId(),"discussContent":param.message, VisitID: manageVisitID}
        }else if(param.disscussID && param.message){
            url = Util.service.ReplyDiscussByAchOwner;
            jsonData = {"jsonStr":JSON.stringify({disscussID:[param.disscussID]}),userID:Util.getUserId(),discussContent:param.message, VisitID: manageVisitID};
        }

        if(url){
            $.ajax({
                url: url,
                type: 'POST',
                data:jsonData,
                beforeSend: function () {
                    Util.pageLoading();
                },
                success: function (data) {
                    Util.pageinit();
                    if (data.success === 1) {
                        Util.success("show","操作成功");
                        $("#disscussForm").find("[name=message]").val("")
                        $("#checkModal2").find(".detail.on").trigger("click");
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
        }
    })

    //发起交易 - 弹框
    $("#checkModal2").on("click","button.trade",function(e){
        e.preventDefault();
        var id = $(this).data("id");
        $("#tradeModal").modal("show");
        $("#checkModal2").modal("hide");
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
        json.VisitID = manageVisitID;
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
                    drawTable2.draw(false);
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


    //确认交易
    $("#checkModal2").on("click",".confirm",function() {
        var id = $(this).attr("data-id");
        //竞价
        $.ajax({
            url: Util.service.FinishTrade,
            type: 'POST',
            data: { "discussID": id, "endTradeUserID": Util.getUserId() },
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                console.info(data);
                if (data.success === 1) {
                    Util.success("show", "出价成功！");
                    $("#checkModal2").modal("hide")
                } else {
                    Util.error("show", data.message);
                }
            },
            error: function () {
                console.error("系统错误");
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
                console.error("系统错误");
                Util.pageinit();
            }
        });
    })

});
