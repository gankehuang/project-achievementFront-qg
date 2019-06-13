/**
 * Created by wangyinping on 2017/5/22.
 */

$(function(){
    Util.pageinit();

    var LoginData = Util.getUserLoginData();
    //console.log(LoginData)
    var userid = LoginData.ID;

    //时间选择
    $(".datetimepicker").datetimepicker({
        format: 'YYYY-MM-DD',
        dayViewHeaderFormat: 'YYYY-MM',
        useCurrent: false,
        sideBySide: true
    });

    var RetrievalInfo = {};
    //RetrievalInfo.State = "0,1,2,6";
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
            "url": Util.service.GetAllPublicityBySearch,
            "type": "POST",
            "dataSrc": "data",
            "dataType": "json",
            "data": function (v) {
                //v.draw = 0;
                //v.start = 0;
                //v.length = 10;
                //v.userID = '';
                v.VisitID = manageVisitID;
                v.RetrievalInfo = JSON.stringify(RetrievalInfo);
                return v;
            }
        }, "columns": [
            {
                "data": null,
                "className": "text-center",
                'orderable': false
            },
            {
                "data": "AchieveName",
                'orderable': false,
            },
            {
                "data": "TransferMethod",
                'orderable': false,
                "className": "text-center",
                "render": function (data) {
                    return Publicity_TransferMethod_2str(data);
                }
            },
            {
                "data": "TransferUnitName",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "AssigneeUnitName",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "ContractAmount",
                'orderable': false,
                "className": "text-center",
                //zmm改动 显示合同金额
                "render": function (data, type, full) {
                    if (full.LastContractAmount) {
                        return full.LastContractAmount;
                    }
                    else {
                        return full.ContractAmount;
                    }
                }
            },
            {
                "data": "Status",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    var status_str = '未知';
                    status_str = Publicity_Status_2str(data.toString());
                    status_str = full.IsRecommend==1 ? status_str+'<span style="font-size:12px;color:green;">(荐)<span>' : status_str;
                    return status_str;
                }
            },
            {
                "data": "DissCount",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "CreatDate",
                'orderable': false,
                "className": "text-center",
                "render": function(data){
                    // if(data != null){
                    //     return data.replace(' ', '<br>');
                    // }
                    return data;
                }
            },
        ],
        "fnDrawCallback": function (oSettings) {
            for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
                $('td:eq(0)', oSettings.aoData[oSettings.aiDisplay[i]].nTr).html( (oSettings._iDisplayStart + i + 1));
            }

        }
    });

    //搜索
    $("#searchBtn").on("click", function (e) {
        e.preventDefault();
        RetrievalInfo = $("#formSearchInfo").serializeJson();
        //RetrievalInfo.State = "0,1,2,6";
        drawTable.draw();
    });

    //全部
    $('#resetBtn, .btn-close').on('click', function (e) {
        e.preventDefault();
        RetrievalInfo = $('#formSearchInfo').resetSearch();
        //RetrievalInfo.State = "0,1,2,6";
        drawTable.draw();
    });

    //通过
    $("#dataTable").on("click",".changeState",function(e){
        e.preventDefault();
        var id = $(this).data("id");
        var state = $(this).data('state');
        console.info(id);
        Util.confirm("请确认审核通过",function(){
            $.ajax({
                url: Util.service.ApprovePublicityPass,
                type: 'POST',
                data: { state: state,"PublicityID":id },
                beforeSend: function () {
                    Util.pageLoading();
                },
                success: function (data) {
                    Util.pageinit();
                    if (data.success === 1) {
                        Util.success("show","操作成功");
                        drawTable.draw(false);
                    } else {
                        Util.error("show",data.message)
                    }
                },
                error: function () {
                    //服务器错误
                    Util.pageinit();
                    Util.error("show","服务器错误");
                }
            });
        })
    });
    var achid = "";
    var toperson = "";
    var state = "";
    //不通过模态框
    $("#dataTable").on("click", ".changeState1", function (e) {
        e.preventDefault();
        achid = $(this).data("id");
        toperson = $(this).data("userid");
        state = $(this).data('state');

        var LoginName = $(this).data("loginname");
        var Phone = $(this).data("phone");
        if (LoginName == "" || LoginName == null) {
            LoginName = "暂无邮箱";
        }
        if (Phone == "" || Phone == null) {
            Phone = "暂无电话,请选择邮箱";
        }
        $("#tradeModal").find("#LoginName").val(LoginName);
        $("#tradeModal").find("#Call").val(Phone);
    });

    //不通过内容提交
    $("#tradeModal").on("click", ".submit", function (e) {
        e.preventDefault();

        var len = $("#tradeModal").find('input[type=checkbox]:checked').length;
        var mail = $("#tradeModal").find("#youxiang").val();
        var mail1 = mail.replace("此公示公告信息审核未通过，原因为：", "");
        var mess = $("#tradeModal").find("#tel").val();
        var mess1 = mess.replace("此公示公告信息审核未通过，原因为：", "");
        var content1 = $("#tradeModal").find("#youxiang").val();
        var content2 = $("#tradeModal").find("#tel").val();
        if (len <= 0) {
            Util.warning("show", "请至少选择一种方式进行填写")
            return;
        } else if (!mail1 && !mess1) {
            Util.warning("show", "审核原因不能为空")
            return;
        }
        var form1 = $('#tradeForm').serializeJson();
        $.ajax({
            url: Util.service.ApprovePublicity,
            type: 'POST',
            data: {
                "publicityID": achid,
                "DataFlag": 2,
                "toperson": toperson,
                "state": state,
                "userID": userid,
                "jsonStr": JSON.stringify(form1),
            },
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                if (data.success === 1) {
                    $("#tradeModal").find("textarea").val("");
                    $("#tradeModal").modal("hide");
                    Util.success("show", "回复成功");
                    drawTable1.draw();
                    drawTable2.draw();
                } else {
                    Util.error("show", data.message)
                }
            },
            error: function () {
                console.error("系统错误")
                Util.pageinit();
            }
        });

    });


    //推荐/取消推荐
    $("#dataTable").on("click",".btnRecommend",function(e){
        e.preventDefault();
        var id = $(this).data("id");
        Util.confirm("请确认推荐or取消推荐",function(){
            $.ajax({
                url: Util.service.RecommendPublicity,
                type: 'POST',
                data: { "PublicityID":id },
                beforeSend: function () {
                    Util.pageLoading();
                },
                success: function (data) {
                    Util.pageinit();
                    if (data.success === 1) {
                        Util.success("show","操作成功");
                        drawTable.draw(false);
                    } else {
                        Util.error("show",data.message)
                    }
                },
                error: function () {
                    //服务器错误
                    Util.pageinit();
                    Util.error("show","服务器错误")
                }
            });
        })
    });

    // 评价弹窗填充异议列表
    $('#dataTable').on('click', '.btnEvaluate', function(e){
        e.preventDefault();
        var id = $(this).attr("data-id");
        var name = $(this).attr('data-name');
        var reviewcontent = $(this).attr('data-reviewcontent');
        var approvedate = $(this).attr('data-approvedate');
        $('#modal_evaluate').attr('data-id', id);
        $('#modal_evaluate .achivement-name').text(name);
        getDissent(id);
        $('#modal_evaluate .evaluate-content').val(reviewcontent=='null'?'':reviewcontent);
        $('#modal_evaluate').attr('data-approvedate', approvedate);
    });

    // 提交评价
    $('#modal_evaluate').on('click', '.submit', function(e){
        e.preventDefault();
        if($('#modal_evaluate .evaluate-content').val().trim() == ''){
            Util.error("show", '请填写评价内容后再提交');
            return;
        }
        
        // 发送请求
        $.ajax({
            url: Util.service.EvaluatePublicity,
            type: 'POST',
            data: {
                'PublicityID': $('#modal_evaluate').attr('data-id'),
                'content': $('#modal_evaluate .evaluate-content').val().trim()
            },
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                if (data.success === 1) {
                       Util.success("show","保存成功", function(){
                            $('#modal_evaluate').modal('hide');
                            $('#modal_evaluate .evaluate-csontent').val('');
                       });
                } else {
                    Util.error("show",data.message)
                }
            },
            error: function () {
                //服务器错误
                Util.pageinit();
                Util.error("show","服务器错误")
            }
        });
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


    $('#quantityStatistics').click(function(e) {
        e.preventDefault();
        var total1, total2;
        //公示金额
        $.ajax({
            url: Util.service.GetGSAmount,
            type: 'POST',
            async: false,
            data: { userID: userid, VisitID: manageVisitID },
            beforeSend: function () {
                //Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                if (data.success === 1) {
                    total1 = JSON.parse(data.resultData);
                    $('#publicity').html(total1);
                } else {
                    Util.error("show",data.message)
                }
            },
            error: function () {
                //服务器错误
                Util.pageinit();
                Util.error("show","服务器错误");
            }
        });
        //公告金额
        $.ajax({
            url: Util.service.GetGGAmount,
            type: 'POST',
            async: false,
            data: { userID: userid, VisitID: manageVisitID },
            beforeSend: function () {
                //Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                if (data.success === 1) {
                    total2 = JSON.parse(data.resultData);
                    $('#announcement').html(total2);
                } else {
                    Util.error("show",data.message)
                }
            },
            error: function () {
                //服务器错误
                Util.pageinit();
                Util.error("show","服务器错误");
            }
        });
        //最终通过公示
        $.ajax({
            url: Util.service.GetAllPublicityPassed,
            type: 'POST',
            data: { userID: userid, VisitID: manageVisitID },
            beforeSend: function () {
                //Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                if (data.success === 1) {
                    total2 = JSON.parse(data.resultData);
                    $('#FinallyThrough').html(total2.recordsTotal)
                } else {
                    Util.error("show",data.message)
                }
            },
            error: function () {
                //服务器错误
                Util.pageinit();
                Util.error("show","服务器错误");
            }
        });
        $('#totalMoney').html( total1 + total2 )
    })
});



/************************************************FUNCTION****************************************/
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

// 获取异议数据
function getDissent(publicityid){
    $("#table_evaluate tbody").html('');
    // 获取异议列表
    $.ajax({
        url: Util.service.GetDissentPublicity,
        type: 'POST',
        data: {
            'PublicityID': publicityid,
            'VisitID': manageVisitID,
            'userID': 0
        },
        beforeSend: function () {
            Util.pageLoading();
        },
        success: function (data) {
            Util.pageinit();
            if (data.success === 1) {
                data.resultData = JSON.parse(data.resultData);
                if(data.resultData.length > 0){
                    $("#table_evaluate tbody").html(template("template_evaluate",data));
                }
                else{
                    $("#table_evaluate tbody").html('<tr><td colspan="3" class="text-center">暂无异议</td></tr>');
                }
            } else {
                Util.error("show",data.message)
            }
        },
        error: function () {
            //服务器错误
            Util.pageinit();
            Util.error("show","服务器错误");
        }
    });
}

// 公示评审模板
function getEvaluateTemplate(index){
    var template = '';
    if($('#modal_evaluate').attr('data-approvedate') != 'undefined'){
        var approvedate = $('#modal_evaluate').attr('data-approvedate').split(' ')[0];
        var approvedate_end = date2normal(AddDays(approvedate, 15));
        var today = date2normal(getNowTime('date', '/'));
        if(CompareDate(approvedate_end) > 0){
            approvedate_end = today;
        }
        approvedate = date2normal(approvedate);
    }
    else{
        var approvedate = '****年**月**日';
        var approvedate_end = approvedate;
    }
    switch(index){
        case 1: template = '        根据国务院关于印发实施《中华人民共和国促进科技成果转化法》若干规定的通知的工作要求，本平台于'+approvedate+'至'+approvedate_end+'，对“ '+$('#modal_evaluate .achivement-name').text()+' ”进行了交易公示。公示内容真实可信。\r\n        特此报告。';break;
        case 2: template = '        根据国务院关于印发实施《中华人民共和国促进科技成果转化法》若干规定的通知的工作要求，本平台于'+approvedate+'，对“ '+$('#modal_evaluate .achivement-name').text()+' ”进行了交易公示。因*******对公示内容存在异议，公示于'+approvedate_end+'终止，请各方协调后重新进行公示。\r\n        特此报告。';break;
    }
    $('.evaluate-content').val(template);
}