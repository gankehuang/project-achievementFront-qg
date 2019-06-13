/**
 * Created by wangyinping on 2017/5/22.
 */
//成果管理js
$(function(){
    Util.pageinit();

    //时间选择
    $(".datetimepicker").datetimepicker({
        format: 'YYYY-MM-DD',
        dayViewHeaderFormat: 'YYYY-MM',
        useCurrent: false,
        sideBySide: true
    });


    //汉化默认提示
    $.extend($.validator.messages, {
        required: "此项为必填字段",
        remote: "填写错误，请修正",
        email: "请输入正确的电子邮件地址",
        url: "请输入正确的URL地址",
        date: "请输入日期",
        dateISO: "请输入日期（ISO）",
        number: "请输入数字",
        digits: "请输入整数",
        creditcard: "请输入正确的信用卡号",
        equalTo: "请再次输入相同的值",
        maxlength: $.validator.format("请输入一个长度最多是 {0} 的字符串"),
        minlength: $.validator.format("请输入一个长度最少是 {0} 的字符串"),
        rangelength: $.validator.format("请输入一个长度介于 {0} 和 {1} 之间的字符串"),
        range: $.validator.format("请输入大小在 {0}-{1} 范围内的值"),
        max: $.validator.format("请输入一个最大为 {0} 的值"),
        min: $.validator.format("请输入一个最小为 {0} 的值")
    });

    var RetrievalInfo = {};
    
    //table:初始化列表
    var drawTable = $("#dataTable").DataTable({
        "pageLength":Util.pageLength,
        "processing": true,
        "serverSide": true,
        "paginate": true,
        "info": false,
        "lengthChange": false,
        "ordering": true,
        "searching": false,
        "ajax": {
            "url": Util.service.GetAllPublishAchievementByUserID,
            "type": "POST",
            "dataSrc": "data",
            "dataType": "json",
            "data": function (v) {
                v.userID = Util.getUserId();//当前用户id
                v.VisitID = manageVisitID;
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
            },
            {
                "data": "OwnerType",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "CreatDate",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "IsCompetePrice",
                'orderable': false,
                "className": "text-center",
                "render": function (data,type, full) {
                    if(full.IsDiscussPrice === 0){     //IsCompetePrice
                        return '<a data-toggle="modal" data-target="#checkModal" class="detail-check" data-name="'+full.AchieveName+'" data-id="'+full.AchID+'">[竞价]'+(full.IsRead == 0 ? '<span class="unread"></span>' :'' )+'</a>';
                    }else if(full.IsDiscussPrice === 1){
                        return '<a data-toggle="modal" data-target="#checkModal2" class="detail-check2" data-name="'+full.AchieveName+'" data-id="'+full.AchID+'">[议价]'+(full.IsRead == 0 ? '<span class="unread"></span>' :'' )+'</a>';
                    }else{
                        return '';
                    }

                }
            },
            {
                "data": "Status",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "AchID",
                'orderable': false,
                "className": "text-center",
                "render": function (data,type, full) {
                    return '<a href="/login/requireCommand/index.html?id='+data+"&name="+full.AchieveName+'">[选择]</a>';
                }
            },
            {
                "data": "AchID",
                'orderable': false,
                "className": "text-center",
                "render": function (data,type, full) {
                    //var html = '<a href="/achievementinfo.html?id='+data+'" title="预览" target="_blank"><i class="glyphicon glyphicon-list"></i></a>&nbsp;&nbsp;'
                    //if(full.IsModify){
                    //    html +=  '<a href="/login/panel-tabs/index.html?id='+data+'" title="修改"><i class="fa fa-edit"></i></a>&nbsp;&nbsp;'
                    //    html += '<a class="detail-remove" href="javascript:void(0);" title="删除" data-id="'+data+'"><i class="fa fa-trash-o"></i></a>'
                    //}
                    //return html;
                    var html = '<a href="/achievementinfo.html?id=' + data + '" title="预览" target="_blank">预览</a>&nbsp;&nbsp;&nbsp;'
                    html += '<a href="detail.html?id=' + data + '" title="查看">查看</a>&nbsp;&nbsp;&nbsp;<br/>'
                    if (full.IsModify) {
                        html += '<a href="/login/panel-tabs/index.html?id=' + data + '" title="修改">修改</a>&nbsp;&nbsp;&nbsp;'
                        html += '<a class="detail-remove" href="javascript:void(0);" title="删除" data-id="' + data + '">删除</a>'
                    }
                    return html;
                }
            },

        ],
        "fnDrawCallback": function (oSettings) {
            console.log(oSettings)
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



    //竞价查看
    $("#dataTable").on("click",".detail-check",function(e){
        e.preventDefault();
        var id = $(this).attr("data-id");
        var name = $(this).attr("data-name");
        if($(this).find(".unread").length > 0){
            Util.SetTradeRead(Util.getUserId(),id);
            $(this).find(".unread").remove();
        }
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
                    $("#checkModal").find(".achName").text(name);
                    $("#Table1 tbody").html(template("template1", data));
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

    //议价查看
    $("#dataTable").on("click",".detail-check2",function(e){
        e.preventDefault();
        $("#chatlist").hide()
        var id = $(this).attr("data-id");
        var name = $(this).attr("data-name");
        if($(this).find(".unread").length > 0){
            Util.SetTradeRead(Util.getUserId(),id);
            $(this).find(".unread").remove();
        }
        $.ajax({
            url: Util.service.GetAllAchievementDiscussList,
            type: 'POST',
            data:{"achID":id},
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                if (data.success === 1) {
                    if(typeof data.resultData == "string"){
                        data.resultData = JSON.parse(data.resultData);
                    }
                    $("#Table2 tbody").html(template("template2", data));
                    $("#checkModal2").find(".achName").text(name);
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

    //回复
    $("#checkModal2").on("click",".submit",function(e){
        e.preventDefault();
        var discussIds =  [];
        $("[name=DiscussPersons]:checked").each(function(){
            discussIds.push($(this).val());
        })
        console.info(discussIds)
        var content = $("#checkModal2").find("textarea").val();
        if(discussIds.length == 0){
            Util.warning("show","请选择至少一个议价内容回复")
            return;
        }else if(!content){
            Util.warning("show","回复内容不能为空")
            return;
        }
        $.ajax({
            url: Util.service.ReplyDiscussByAchOwner,
            type: 'POST',
            data:{"jsonStr":JSON.stringify({disscussID:discussIds}),userID:Util.getUserId(),discussContent:content, VisitID: manageVisitID},
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                if (data.success === 1) {
                    $("#checkModal2").find("textarea").val("");
                    $("#checkModal2").modal("hide");
                    $("#chatlist").hide();
                    Util.success("show","回复成功");
                }else{
                   Util.error("show",data.message)
                }
            },
            error: function () {
                console.error("系统错误")
                Util.pageinit();
            }
        });

    })

    //和某人的议价详情
    $("#checkModal2").on("click",".detail",function(e){
        e.preventDefault();
        var id = $(this).data("id");
        var name = $(this).data("name");
        $.ajax({
            url: Util.service.GetAllMessageByDiscussID,
            type: 'POST',
            data:{"discussID":id},
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

    //成果删除
    $("#dataTable").on("click",".detail-remove",function(e){
        e.preventDefault();
        var id = $(this).attr("data-id");
        if (confirm("确认删除吗？"))
        {
            $.ajax({
                url: Util.service.DeleteAchievement,
                type: 'POST',
                data: { "achID": id },
                beforeSend: function () {
                    Util.pageLoading();
                },
                success: function (data) {
                    Util.pageinit();
                    if (data.success === 1) {
                        Util.success("show", "操作成功");
                        drawTable.draw(false)
                    } else {
                        Util.error("show", data.message);
                    }
                },
                error: function () {
                    console.error("系统错误")
                    Util.error("show", "系统错误");
                    Util.pageinit();
                }
            });
        }
        
    });

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
