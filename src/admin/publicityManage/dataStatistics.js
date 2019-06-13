/**
 * Created by wangyinping on 2017/5/22.
 */

$(function(){
    Util.pageinit();

    var LoginData = Util.getUserLoginData();
    console.log(LoginData)
    var userid = LoginData.ID;

    //时间选择
    $("#datetimepicker, #datetimepicker2").datetimepicker({
        format: 'YYYY',
        dayViewHeaderFormat: 'YYYY-MM',
        useCurrent: false,
        sideBySide: true
    });
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
            "url": Util.service.GetAllAchievementBySearch,
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
                "data": "OwnerType",
                'orderable': false,
            },
            {
                "data": "Creator",
                'orderable': false,
            },
            {
                "data": "CreatDate",
                'orderable': false,
            },
            {
                "data": "Status",
                'orderable': false,
            },
            {
                "data": "ExpectTransMethodName",
                'orderable': false,
            },
            {
                "data": "MaturityName",
                'orderable': false,
            },
            {
                "data": "Contacts",
                'orderable': false,
            },
            {
                "data": "ContactTelephone",
                'orderable': false,
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
        RetrievalInfo.State = "0,1,2,6";
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


    //获取省份   GetAllProvince
    $.ajax({
        url: Util.service.GetAllProvince,
        type: 'POST',
        beforeSend: function () {
            Util.pageLoading();
        },
        success: function (data) {
            Util.pageinit();
            if (data.success === 1) {
                //console.log(data.resultData);
                var province = JSON.parse(data.resultData);
                var select = '<option value="">全部</option>'
                province.forEach(function(ele) {
                    select += '<option value="'+ ele.ID +'">'+ ele.Province +'</option>'
                });
                $("#AllProvince").html(select);
            } else {
                Util.error("show", data.message)
            }
        },
        error: function () {
            console.error("系统错误")
            Util.pageinit();
        }
    });
    //获取成果分类 
    $.ajax({
        url: Util.service.GetAllTopClassifyNoIRM,
        type: 'POST',
        beforeSend: function () {
            Util.pageLoading();
        },
        success: function (data) {
            Util.pageinit();
            if (data.success === 1) {  
                //console.log(data.resultData);
                var classify = JSON.parse(data.resultData);
                var classifySelect = '<option value="">全部</option>'
                classify.forEach(function(ele) {
                    classifySelect += '<option value="'+ ele.id +'">'+ ele.name +'</option>'
                });
                $("#classify").html(classifySelect);
            } else {
                Util.error("show", data.message)
            }
        },
        error: function () {
            console.error("系统错误")
            Util.pageinit();
        }
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


    $('#time1').on('blur', function() {
        var time = $(this).val();
        $('#times1').html(time);
        $.ajax({
            url: Util.service.GetAllAchievementBySearch,
            type: 'POST',
            data: {
                draw: 0,
                start: 0,
                length: 10,
                VisitID: manageVisitID,
                RetrievalInfo: JSON.stringify({"startTime":time})
            },
            beforeSend: function () {
                //Util.pageLoading();
            },
            success: function (data) {
                //Util.pageinit();
                if (data.success === 1) {
                    var total = JSON.parse(data.resultData)
                    $('#total1').html(total.recordsTotal);
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
    $('#time2').on('blur', function() {
        var time = $(this).val();
        $('#times2').html(time);
        $.ajax({
            url: Util.service.GetAllAchievementBySearch,
            type: 'POST',
            data: {
                draw: 0,
                start: 0,
                length: 10,
                VisitID: manageVisitID,
                RetrievalInfo: JSON.stringify({"startTime":time})
            },
            beforeSend: function () {
                //Util.pageLoading();
            },
            success: function (data) {
                //Util.pageinit();
                if (data.success === 1) {
                    var total = JSON.parse(data.resultData)
                    $('#total2').html(total.recordsTotal);
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
    $('#time3').on('blur', function() {
        var time = $(this).val();
        $('#times3').html(time);
        $.ajax({
            url: Util.service.GetAllAchievementBySearch,
            type: 'POST',
            data: {
                draw: 0,
                start: 0,
                length: 10,
                VisitID: manageVisitID,
                RetrievalInfo: JSON.stringify({startTime: time})
            },
            beforeSend: function () {
                //Util.pageLoading();
            },
            success: function (data) {
                //Util.pageinit();
                if (data.success === 1) {
                    var total = JSON.parse(data.resultData)
                    $('#total3').html(total.recordsTotal);
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
    $('#time4').on('blur', function() {
        var time = $(this).val();
        $('#times4').html(time);
        $.ajax({
            url: Util.service.GetAllPublicityBySearch,
            type: 'POST',
            data: {
                draw: 0,
                start: 0,
                length: 10,
                VisitID: manageVisitID,
                RetrievalInfo: JSON.stringify({"startTime":time})
            },
            beforeSend: function () {
                //Util.pageLoading();
            },
            success: function (data) {
                //Util.pageinit();
                if (data.success === 1) {
                    var total = JSON.parse(data.resultData)
                    var total2 = JSON.parse(total.data)
                    console.log(total2[0].ContractAmount);
                    $('#total4').html(total2[0].ContractAmount+ '万元');
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

   /* $('#quantityStatistics').click(function(e) {
        e.preventDefault();

        $.ajax({
            url: Util.service.GetAllAchievementBySearch,
            type: 'POST',
            data: {
                draw: 0,
                start: 0,
                length: 10,
                VisitID: manageVisitID,
                RetrievalInfo: JSON.stringify({"ClassifyID":1})
            },
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                //Util.pageinit();
                if (data.success === 1) {
                    var total = JSON.parse(data.resultData);
                    $('#zz').html(total.recordsTotal);
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
        $.ajax({
            url: Util.service.GetAllAchievementBySearch,
            type: 'POST',
            data: {
                draw: 0,
                start: 0,
                length: 10,
                VisitID: manageVisitID,
                RetrievalInfo: JSON.stringify({"ClassifyID":2})
            },
            beforeSend: function () {
                //Util.pageLoading();
            },
            success: function (data) {
                //Util.pageinit();
                if (data.success === 1) {
                    var total = JSON.parse(data.resultData);
                    $('#yz').html(total.recordsTotal);
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
        $.ajax({
            url: Util.service.GetAllAchievementBySearch,
            type: 'POST',
            data: {
                draw: 0,
                start: 0,
                length: 10,
                VisitID: manageVisitID,
                RetrievalInfo: JSON.stringify({"ClassifyID":3})
            },
            beforeSend: function () {
                //Util.pageLoading();
            },
            success: function (data) {
                //Util.pageinit();
                if (data.success === 1) {
                    var total = JSON.parse(data.resultData);
                    $('#jg').html(total.recordsTotal);
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
        setTimeout(function(){
            $.ajax({
                url: Util.service.GetAllAchievementBySearch,
                type: 'POST',
                data: {
                    draw: 0,
                    start: 0,
                    length: 10,
                    VisitID: manageVisitID,
                    RetrievalInfo: JSON.stringify({"ClassifyID":4})
                },
                beforeSend: function () {
                    //Util.pageLoading();
                },
                success: function (data) {
                    //Util.pageinit();
                    if (data.success === 1) {
                        var total = JSON.parse(data.resultData);
                        $('#njzb').html(total.recordsTotal);
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
            $.ajax({
                url: Util.service.GetAllAchievementBySearch,
                type: 'POST',
                data: {
                    draw: 0,
                    start: 0,
                    length: 10,
                    VisitID: manageVisitID,
                    RetrievalInfo: JSON.stringify({"ClassifyID":5})
                },
                beforeSend: function () {
                    //Util.pageLoading();
                },
                success: function (data) {
                    //Util.pageinit();
                    if (data.success === 1) {
                        var total = JSON.parse(data.resultData);
                        $('#zyyhj').html(total.recordsTotal);
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
            $.ajax({
                url: Util.service.GetAllAchievementBySearch,
                type: 'POST',
                data: {
                    draw: 0,
                    start: 0,
                    length: 10,
                    VisitID: manageVisitID,
                    RetrievalInfo: JSON.stringify({"ClassifyID":6})
                },
                beforeSend: function () {
                    //Util.pageLoading();
                },
                success: function (data) {
                    //Util.pageinit();
                    if (data.success === 1) {
                        var total = JSON.parse(data.resultData);
                        $('#nyxxh').html(total.recordsTotal);
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
            $.ajax({
                url: Util.service.GetAllIPR,
                type: 'POST',
                data: {
                    draw: 0,
                    start: 0,
                    length: 10,
                    VisitID: manageVisitID,
                    ClassifyID: 7
                },
                beforeSend: function () {
                    //Util.pageLoading();
                },
                success: function (data) {
                    //Util.pageinit();
                    if (data.success === 1) {
                        var total = JSON.parse(data.resultData);
                        $('#zscq').html(total);
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
            $.ajax({
                url: Util.service.GetAllAchievementBySearch,
                type: 'POST',
                data: {
                    draw: 0,
                    start: 0,
                    length: 10,
                    VisitID: manageVisitID,
                    RetrievalInfo: JSON.stringify({"ClassifyID":8})
                },
                beforeSend: function () {
                   // Util.pageLoading();
                },
                success: function (data) {
                    //Util.pageinit();
                    if (data.success === 1) {
                        var total = JSON.parse(data.resultData);
                        $('#qt').html(total.recordsTotal);
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
        }, 500)
        
        setTimeout(function(){
            $.ajax({
            url: Util.service.GetAllAchievementBySearch,
            type: 'POST',
            data: {
                draw: 0,
                start: 0,
                length: 10,
                VisitID: manageVisitID,
                RetrievalInfo: JSON.stringify({})
            },
            beforeSend: function () {
                //Util.pageLoading();
            },
            success: function (data) {
                //Util.pageinit();
                if (data.success === 1) {
                    var total = JSON.parse(data.resultData);
                    $('#zcg').html(total.recordsTotal);
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
            $.ajax({
                url: Util.service.GetAllAchievementBySearch,
                type: 'POST',
                data: {
                    draw: 0,
                    start: 0,
                    length: 10,
                    VisitID: manageVisitID,
                    RetrievalInfo: JSON.stringify({'IsApprove': 1})
                },
                beforeSend: function () {
                    //Util.pageLoading();
                },
                success: function (data) {
                    //Util.pageinit();
                    if (data.success === 1) {
                        var total = JSON.parse(data.resultData);
                        $('#zcgtg').html(total.recordsTotal);
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
            //
            $.ajax({
                url: Util.service.GetALLOwnerOrganization,
                type: 'POST',
                data: {
                    draw: 0,
                    start: 0,
                    length: 10,
                    VisitID: manageVisitID,
                    RetrievalInfo: JSON.stringify({})
                },
                beforeSend: function () {
                    //Util.pageLoading();
                },
                success: function (data) {
                    //Util.pageinit();
                    if (data.success === 1) {
                        var total = JSON.parse(data.resultData);
                        $('#cqdw').html(total.recordsTotal);
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
            $.ajax({   //总用户数量
                url: Util.service.GetALLUserBySearch,
                type: 'POST',
                data: {
                    draw: 0,
                    start: 0,
                    length: 10,
                    VisitID: manageVisitID,
                    RetrievalInfo: JSON.stringify({})
                },
                beforeSend: function () {
                    //Util.pageLoading();
                },
                success: function (data) {
                   // Util.pageinit();
                    if (data.success === 1) {
                        var total = JSON.parse(data.resultData);
                        $('#zyh').html(total.recordsTotal);
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
            $.ajax({
                url: Util.service.GetALLUserBySearch,
                type: 'POST',
                data: {
                    draw: 0,
                    start: 0,
                    length: 10,
                    VisitID: manageVisitID,
                    RetrievalInfo: JSON.stringify({"Name":"","Properties":"0","IsApprove":"1","Type":"","State":"0,1,2,6"})
                },
                beforeSend: function () {
                    //Util.pageLoading();
                },
                success: function (data) {
                   // Util.pageinit();
                    if (data.success === 1) {
                        var total = JSON.parse(data.resultData);
                        $('#zyhtg').html(total.recordsTotal);
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
        }, 1000)
        setTimeout(function(){
            $.ajax({
                url: Util.service.GetALLUserBySearch,
                type: 'POST',
                data: {
                    draw: 0,
                    start: 0,
                    length: 10,
                    VisitID: manageVisitID,
                    RetrievalInfo: JSON.stringify({"Name":"","Properties":"0","IsApprove":"0","Type":"","State":"0,1,2,6"})
                },
                beforeSend: function () {
                    //Util.pageLoading();
                },
                success: function (data) {
                    //Util.pageinit();
                    if (data.success === 1) {
                        var total = JSON.parse(data.resultData);
                        $('#zyhwtg').html(total.recordsTotal);
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
            $.ajax({   //单位总数
                url: Util.service.GetALLUserBySearch,
                type: 'POST',
                data: {
                    draw: 0,
                    start: 0,
                    length: 10,
                    VisitID: manageVisitID,
                    RetrievalInfo: JSON.stringify({"Type":"1"})
                },
                beforeSend: function () {
                    //Util.pageLoading();
                },
                success: function (data) {
                    //Util.pageinit();
                    if (data.success === 1) {
                        var total = JSON.parse(data.resultData);
                        $('#dw').html(total.recordsTotal);
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
            $.ajax({
                url: Util.service.GetALLUserBySearch,
                type: 'POST',
                data: {
                    draw: 0,
                    start: 0,
                    length: 10,
                    VisitID: manageVisitID,
                    RetrievalInfo: JSON.stringify({"Name":"","Properties":"0","IsApprove":"1","Type":"1","State":"0,1,2,6"})
                },
                beforeSend: function () {
                    //Util.pageLoading();
                },
                success: function (data) {
                    //Util.pageinit();
                    if (data.success === 1) {
                        var total = JSON.parse(data.resultData);
                        $('#dwtg').html(total.recordsTotal);
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
            $.ajax({
                url: Util.service.GetALLUserBySearch,
                type: 'POST',
                data: {
                    draw: 0,
                    start: 0,
                    length: 10,
                    VisitID: manageVisitID,
                    RetrievalInfo: JSON.stringify({"Name":"","Properties":"0","IsApprove":"0","Type":"1","State":"0,1,2,6"})
                },
                beforeSend: function () {
                    //Util.pageLoading();
                },
                success: function (data) {
                    //Util.pageinit();
                    if (data.success === 1) {
                        var total = JSON.parse(data.resultData);
                        $('#dwwtg').html(total.recordsTotal);
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
            $.ajax({
                url: Util.service.GetALLUserBySearch,
                type: 'POST',
                data: {
                    draw: 0,
                    start: 0,
                    length: 10,
                    VisitID: manageVisitID,
                    RetrievalInfo: JSON.stringify({"Type":"0"})
                },
                beforeSend: function () {
                    //Util.pageLoading();
                },
                success: function (data) {
                    //Util.pageinit();
                    if (data.success === 1) {
                        var total = JSON.parse(data.resultData);
                        $('#gr').html(total.recordsTotal);
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
            $.ajax({
                url: Util.service.GetALLUserBySearch,
                type: 'POST',
                data: {
                    draw: 0,
                    start: 0,
                    length: 10,
                    VisitID: manageVisitID,
                    RetrievalInfo: JSON.stringify({"Name":"","Properties":"0","IsApprove":"1","Type":"0","State":"0,1,2,6"})
                },
                beforeSend: function () {
                    //Util.pageLoading();
                },
                success: function (data) {
                    //Util.pageinit();
                    if (data.success === 1) {
                        var total = JSON.parse(data.resultData);
                        $('#grtg').html(total.recordsTotal);
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
            $.ajax({
                url: Util.service.GetALLUserBySearch,
                type: 'POST',
                data: {
                    draw: 0,
                    start: 0,
                    length: 10,
                    VisitID: manageVisitID,
                    RetrievalInfo: JSON.stringify({"Name":"","Properties":"0","IsApprove":"0","Type":"0","State":"0,1,2,6"})
                },
                beforeSend: function () {
                    //Util.pageLoading();
                },
                success: function (data) {
                    Util.pageinit();
                    if (data.success === 1) {
                        var total = JSON.parse(data.resultData);
                        $('#grwtg').html(total.recordsTotal);
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
            $.ajax({
                url: Util.service.GetAllPublicityBySearch,
                type: 'POST',
                data: {
                    draw: 0,
                    start: 0,
                    length: 10,
                    VisitID: manageVisitID,
                    RetrievalInfo: JSON.stringify({"State":"0,1,2,6"})
                },
                beforeSend: function () {
                    //Util.pageLoading();
                },
                success: function (data) {
                    Util.pageinit();
                    if (data.success === 1) {
                        var total = JSON.parse(data.resultData);
                        var total2 = JSON.parse(total.data);
                        //console.log(total2)
                        $('#gssl').html(total2[1].ContractAmount);
                        $('#htje').html(total2[0].ContractAmount);
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
        }, 1500)
    })*/
    
    $('#quantityStatistics').click(function(e) {
        e.preventDefault();
        $.ajax({
            url: Util.service.GetAllIPR,
            type: 'POST',
            data: {
                VisitID: manageVisitID,
            },
            beforeSend: function () {
                //Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                if (data.success === 1) {
                    var total = JSON.parse(data.resultData);
                    
                    $('#zz').html(total[0].PlantCount);
                    $('#yz').html(total[0].BreedCount);
                    $('#jg').html(total[0].MachiningCount);
                    $('#njzb').html(total[0].AgricEqCount);
                    $('#zyyhj').html(total[0].ResourcesCount);
                    $('#nyxxh').html(total[0].AgriculturalInforCount);
                    $('#zscq').html(total[0].IntellectualCount);
                    $('#qt').html(total[0].OtherCount);

                    $('#cqdw').html(total[0].OwnerOrganizationCount);  //所有成果产权单位数量
                    $('#gssl').html(total[0].PublicCount);
                    $('#htje').html(total[0].ContarctAmountCount);
                    $('#zcg').html(total[0].AllAchievementNoApproveCount);
                    $('#zcgtg').html(total[0].AllAchievementIsApproveCount);
                    $('#zyh').html(total[0].AllUserCount);
                    $('#zyhtg').html(total[0].IsApproveUserCount);
                    $('#zyhwtg').html(total[0].NoApproveUserCount);

                    $('#dw').html(total[0].DepUserCount);
                    $('#dwtg').html(total[0].DepIsApproveUserCount);
                    $('#dwwtg').html(total[0].DepNoApproveUserCount);

                    $('#gr').html(total[0].PerUserCount);
                    $('#grtg').html(total[0].PerIsApproveUserCount);
                    $('#grwtg').html(total[0].PerNoApproveUserCount);

                    $('#grwtg').html(total[0].PerNoApproveUserCount);


                    //$('#htje').html(total2[0].ContractAmount);
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