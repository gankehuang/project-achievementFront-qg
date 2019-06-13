/**
 * Created by zhujianlin on 2017/5/21.
 */

$(function(){
    Util.pageinit();

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
            "url": Util.service.getAllTradeOfAchievementByUserID,
            "type": "POST",
            "dataSrc": "data",
            "dataType": "json",
            "data": function (v) {
                v.userID =  Util.getUserId();
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
                "className": "text-center",
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
                "className": "text-center"

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
                    var html = '<a href="/achievementinfo.html?id='+data+'" title="查看">成果详情</a>&nbsp;&nbsp;'
                    html += '<a class="detail-check" href="javascript:void(0);" title="出价记录" data-type="'+full.Type+'" data-id="'+data+'">出价记录</a>'
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

        if(type == "议价"){
            $("#chatlist").hide()
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
                        console.info(data)
                        $("#Table2 tbody").html(template("template2", data));
                        $("#checkModal2").modal("show");
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
                        $("#checkModal").modal("show")
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


    //回复
    $("#checkModal2").on("click",".submit",function(e){
        e.preventDefault();
        var discussIds =  $("[name=DiscussPersons]:checked").val();
        console.info(discussIds)
        var content = $("#checkModal2").find("textarea").val();
        if(!discussIds){
            Util.warning("show","请选择至少一个议价内容回复")
            return;
        }else if(!content){
            Util.warning("show","回复内容不能为空")
            return;
        }
        discussIds = discussIds.split(",")
        $.ajax({
            url: Util.service.ReplyDiscussByAchOwner,
            type: 'POST',
            data:{"jsonStr":JSON.stringify({disscussID:discussIds}),userID:Util.getUserId(),discussContent:content},
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
    function toThousands(num) {
        var result = [], counter = 0;
        num = (num || 0).toString().split('');
        for (var i = num.length - 1; i >= 0; i--) {
            counter++;
            result.unshift(num[i]);
            if (!(counter % 3) && i != 0) { result.unshift(','); }
        }
        return result.join('');
    }
})
