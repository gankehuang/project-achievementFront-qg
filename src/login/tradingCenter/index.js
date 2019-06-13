/**
 * Created by zhujianlin on 2017/5/21.
 */

$(function(){
    Util.pageinit();

    // 当前成果id
    var _achId = '';

    var RetrievalInfo = {};

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
            "url": Util.service.getAllTradeByUserID,
            "type": "POST",
            "dataSrc": "data",
            "dataType": "json",
            "data": function (v) {
                v.userID = Util.getUserId();
                v.RetrievalInfo = JSON.stringify(RetrievalInfo);
                return v;
            }
        }, "columns": [
            {
                "data": "AchID",
                "className": "text-center",
                'orderable': false
            },
            {
                "data": "AchieveName",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "TechType",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "Price",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    return toThousands(data);
                }
            },
            {
                "data": "Type",
                'orderable': false,
                "className": "text-center",
                // "render": function (data, type, full) {
                //     if(data == 0){
                //         return '竞价';
                //     }else if(data == 1){
                //         return '议价';
                //     }
                // }
            },
            {
                "data": "Status",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "Result",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "AchID",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    var html = '<a href="/achievementinfo.html?id='+data+'" title="查看" target="_blank">成果详情</a>&nbsp;&nbsp;'
                    html += '<a class="detail-check" href="javascript:void(0);" title="出价记录" ' +
                        'data-type="'+full.Type+'" data-id="'+data+'" data-creatorId="'+full.AchOwnerUserID+'" data-name="'+full.AchieveName+'">出价记录' +
                        (full.IsRead == 0 ? '<span class="unread"></span>' :'' ) + '</a>'
                    return html;
                }
            },

        ],
        "fnDrawCallback": function (oSettings) {
            for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
                $('td:eq(0)', oSettings.aoData[oSettings.aiDisplay[i]].nTr).html( (oSettings._iDisplayStart + i + 1));
            }

        }


    });


    /*--begin基本信息获取*/
    function getBasicInfo(urlInfo, selectELe, defaultOption,parentID,value) {
        $.ajax({
            url: urlInfo,
            type: 'POST',
            data: { parentID: parentID },
            success: function (data) {
                Util.pageinit();
                if (data.success === 1) {
                    var resultData = JSON.parse(data.resultData);
                    Util.getSelectData(selectELe, resultData, defaultOption, value);
                }
            }
        });
    }

    //获取所有成果权属类型
    getBasicInfo(Util.service.GetAllTechType, "#Type", "全部");


    //搜索
    $("#searchBtn").on("click", function (e) {
        e.preventDefault();
        RetrievalInfo = $("#formSearchInfo").serializeJson();
        drawTable.draw();
    });

    //全部
    $('#resetBtn, .btn-close').on('click', function (e) {
        e.preventDefault();
        RetrievalInfo = $('#formSearchInfo').resetSearch();
        drawTable.draw();
    });




    //议价查看
    $("#dataTable").on("click",".detail-check",function(e){
        e.preventDefault();
        var type = $(this).attr("data-type");
        var id = $(this).attr("data-id");
        var _achId = id;
        var creatorId = $(this).attr("data-creatorId");
        var name = $(this).attr("data-name");
        if($(this).find(".unread").length > 0){
            Util.SetTradeRead(Util.getUserId(),_achId);
            $(this).find(".unread").remove();
        }
        $(".achName").html(name);
        if(type == "议价"){
            $("#chatlist").hide();
            $("#disscussForm").hide();
            if(creatorId != Util.getUserId()){
                $("#disscussForm").find("[name=acheID]").val(_achId);
            }else{
                $("#disscussForm").find("[name=acheID]").val("");
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
        }else if(type == "竞价"){
            $.ajax({
                url: Util.service.GetAllAchievementCompeteList,
                type: 'POST',
                data:{"achID":id},
                beforeSend: function () {
                    Util.pageLoading();
                },
                success: function (data) {
                    Util.pageinit();
                    if (data.success === 1) {
                        data.resultData = JSON.parse(data.resultData);
                        $("#Table1 tbody").html(template("template1", data));
                        $("#checkModal").modal("show");
                    }else{
                        console.error("系统错误")
                    }
                },
                error: function () {
                    console.error("系统错误")
                    Util.pageinit();
                }
            });
        }

    });

    //和某人的议价详情
    $("#checkModal2").on("click",".detail",function(e){
        e.preventDefault();
        $("#checkModal2").find(".detail").removeClass("on");
        $(this).addClass("on");
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
                        data.userId = Util.getUserId();
                        data.resultData = JSON.parse(data.resultData);
                    }
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
                    drawTable.draw(false);
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
                    Util.success("show", "交易成功！");
                    drawTable.draw(false);
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
                    drawTable.draw(false);
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


})
