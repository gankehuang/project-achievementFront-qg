/**
 * Created by zhujianlin on 2017/5/21.
 */

$(function(){
    Util.pageinit();
    //未审核时不能操作
    var loginData = Util.getUserLoginData();

    if (loginData.Type == 0 && !loginData.IDCard) {
        Util.warning("show", "请先进行身份认证！", function () {
            window.location.href = "/login/baseInfor/index.html";
        });
        return;
    } else if (loginData.Type == 1 && !loginData.CorporateNumber) {
        Util.warning("show", "请先进行身份认证！", function () {
            window.location.href = "/login/baseInfor/index.html";
        });
        return;
    } else if (loginData.IsApprove == 1) {
    } else if ((loginData.IDCard || loginData.CorporateNumber) && loginData.IsApprove == 0) {
        Util.warning("show", "身份认证审核中……，请稍后再试！", function () {
            window.location.href = "/login/baseInfor/index.html";
        });
        return;
    } else {
        Util.warning("show", "系统异常！");
        return;
    }
    var userId=Util.getUserLoginData().ID;

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
            "url": Util.service.GetAllPublishAchievement,
            "type": "POST",
            "dataSrc": "data",
            "dataType": "json",
            "data": function (v) {
                v.isApprove = '';
                v.userId=userId;
                v.VisitID = manageVisitID;
                v.RetrievalInfo = '{}';
                return v;
            }
        }, "columns": [
            {
                "data": "AchID",
                "className": "text-center",
                'orderable': false
            },
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
                "data": "OwnerType",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "Creator",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "CreatDate",
                'orderable': false,
                "className": "text-center"
            },
            {
                //"data": "Status",
                //'orderable': false,
                //"className": "text-center",
                //// "render": function (data) {
                ////     if(data == 0){
                ////         return '未审核'
                ////     }else{
                ////         return '已审核'
                ////     }
                //// }
                "data": "IsInstitutesApprove",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    if (data == null) {

                        if (full.Status == "未审核" && full.IsApprove == 0) {
                            return '未审核'
                        }
                        else if (full.Status == "未审核" && full.IsApprove == 1) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "审核通过" && full.IsApprove == 0) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "审核通过" && full.IsApprove == 1) {
                            return '审核通过'
                        }
                        else if (full.Status == "交易中" && full.IsApprove == 0) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "交易中" && full.IsApprove == 1) {
                            return '交易中'
                        }
                        else if (full.Status == "交易结束" && full.IsApprove == 0) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "交易结束" && full.IsApprove == 1) {
                            return '交易结束'
                        }
                        else if (full.Status == "审核不通过" && full.IsApprove == 0) {
                            return '审核不通过'
                        }
                        else if (full.Status == "审核不通过" && full.IsApprove == 1) {
                            return '数据审核状态有误'
                        }
                    } else if (data == 1) {
                        if (full.Status == "未审核" && full.IsApprove == 0) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "未审核" && full.IsApprove == 1) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "审核通过" && full.IsApprove == 0) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "审核通过" && full.IsApprove == 1) {
                            //return '单位已审核，待中心审核'
                            return '单位已审核'
                        }
                        else if (full.Status == "交易中" && full.IsApprove == 0) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "交易中" && full.IsApprove == 1) {
                            return '交易中'
                        }
                        else if (full.Status == "交易结束" && full.IsApprove == 0) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "交易结束" && full.IsApprove == 1) {
                            return '交易结束'
                        }
                        else if (full.Status == "审核不通过" && full.IsApprove == 0) {
                            //return '单位已审核，待中心审核'
                            return '单位已审核'
                        }
                        else if (full.Status == "审核不通过" && full.IsApprove == 1) {
                            return '数据审核状态有误'
                        }
                    } else if (data == 2) {
                        if (full.Status == "未审核" && full.IsApprove == 0) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "未审核" && full.IsApprove == 1) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "审核通过" && full.IsApprove == 0) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "审核通过" && full.IsApprove == 1) {
                            return '中心已审核'
                        }
                        else if (full.Status == "交易中" && full.IsApprove == 0) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "交易中" && full.IsApprove == 1) {
                            return '交易中'
                        }
                        else if (full.Status == "交易结束" && full.IsApprove == 0) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "交易结束" && full.IsApprove == 1) {
                            return '交易结束'
                        }
                        else if (full.Status == "审核不通过" && full.IsApprove == 0) {
                            return '中心已审核'
                        }
                        else if (full.Status == "审核不通过" && full.IsApprove == 1) {
                            return '数据审核状态有误'
                        }
                    }

                }
            },
            {
                "data": "IsCompetePrice",
                'orderable': false,
                "className": "text-center",
                "render": function (data) {
                    if(data == 0){
                        return '议价'
                    }else{
                        return '竞价'
                    }
                }
            },
            {
                "data": "AchID",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    var html = '<a href="/achievementinfo.html?id=' + data + '" title="预览">预览</a>'
                    return html;
                }
            },
            {
                "data": "AchID",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    var html = '<a href="detail.html?id=' + data + '" title="查看">查看</a>'
                    return html;
                }
            }
        ],
        "fnDrawCallback": function (oSettings) {
            for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
                $('td:eq(0)', oSettings.aoData[oSettings.aiDisplay[i]].nTr).html( (oSettings._iDisplayStart + i + 1));
            }

        }


    });



    //table:初始化列表
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
            "url": Util.service.GetAllPublishAchievement,
            "type": "POST",
            "dataSrc": "data",
            "dataType": "json",
            "data": function (v) {
                v.isApprove = 0;
                v.userId=userId;
                v.VisitID = manageVisitID;
                v.RetrievalInfo = '{}';
                return v;
            }
        }, "columns": [
            {
                "data": "AchID",
                "className": "text-center",
                'orderable': false
            },
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
                "data": "OwnerType",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "Creator",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "CreatDate",
                'orderable': false,
                "className": "text-center"
            },
            {
                //"data": "Status",
                //'orderable': false,
                //"className": "text-center",
                //// "render": function (data) {
                ////     if(data == 0){
                ////         return '未审核'
                ////     }else{
                ////         return '已审核'
                ////     }
                //// }
                "data": "IsInstitutesApprove",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    if (data == null) {

                        if (full.Status == "未审核" && full.IsApprove == 0) {
                            return '未审核'
                        }
                        else if (full.Status == "未审核" && full.IsApprove == 1) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "审核通过" && full.IsApprove == 0) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "审核通过" && full.IsApprove == 1) {
                            return '审核通过'
                        }
                        else if (full.Status == "交易中" && full.IsApprove == 0) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "交易中" && full.IsApprove == 1) {
                            return '交易中'
                        }
                        else if (full.Status == "交易结束" && full.IsApprove == 0) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "交易结束" && full.IsApprove == 1) {
                            return '交易结束'
                        }
                        else if (full.Status == "审核不通过" && full.IsApprove == 0) {
                            return '审核不通过'
                        }
                        else if (full.Status == "审核不通过" && full.IsApprove == 1) {
                            return '数据审核状态有误'
                        }
                    } else if (data == 1) {
                        if (full.Status == "未审核" && full.IsApprove == 0) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "未审核" && full.IsApprove == 1) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "审核通过" && full.IsApprove == 0) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "审核通过" && full.IsApprove == 1) {
                            //return '单位已审核，待中心审核'
                            return '单位已审核'
                        }
                        else if (full.Status == "交易中" && full.IsApprove == 0) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "交易中" && full.IsApprove == 1) {
                            return '交易中'
                        }
                        else if (full.Status == "交易结束" && full.IsApprove == 0) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "交易结束" && full.IsApprove == 1) {
                            return '交易结束'
                        }
                        else if (full.Status == "审核不通过" && full.IsApprove == 0) {
                            //return '单位已审核，待中心审核'
                            return '单位已审核'
                        }
                        else if (full.Status == "审核不通过" && full.IsApprove == 1) {
                            return '数据审核状态有误'
                        }
                    } else if (data == 2) {
                        if (full.Status == "未审核" && full.IsApprove == 0) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "未审核" && full.IsApprove == 1) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "审核通过" && full.IsApprove == 0) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "审核通过" && full.IsApprove == 1) {
                            return '中心已审核'
                        }
                        else if (full.Status == "交易中" && full.IsApprove == 0) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "交易中" && full.IsApprove == 1) {
                            return '交易中'
                        }
                        else if (full.Status == "交易结束" && full.IsApprove == 0) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "交易结束" && full.IsApprove == 1) {
                            return '交易结束'
                        }
                        else if (full.Status == "审核不通过" && full.IsApprove == 0) {
                            return '中心已审核'
                        }
                        else if (full.Status == "审核不通过" && full.IsApprove == 1) {
                            return '数据审核状态有误'
                        }
                    }

                }
            },
            {
                "data": "IsCompetePrice",
                'orderable': false,
                "className": "text-center",
                "render": function (data) {
                    if(data == 0){
                        return '议价'
                    }else{
                        return '竞价'
                    }
                }
            },
            {
                "data": "AchID",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    var html = '<a href="/achievementinfo.html?id=' + data + '" title="预览">预览</a>'
                    return html;
                }
            },
            {
                "data": "AchID",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    var html = '<a href="detail.html?id=' + data + '" title="查看">查看</a>'
                    return html;
                }
            },
            {
                "data": "AchID",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    if(!full.IsApprove){
                        return '<a href="#" class="btn btn-info btn-xs btnPass" data-id=' + data + '>通过</a>' +
                           '<a data-toggle="modal" data-target="#tradeModal" class="btn btn-danger btn-xs btnRejuest" data-loginname="' + full.LoginName + '" data-phone="' + full.Phone + '"data-id="' + full.ID + '"data-userid="' + full.userid + '">不通过</a>'
                    }else {
                        return '';
                    }

                }
            },
             {
                 "data": "AchID",
                 'orderable': false,
                 "className": "text-center",
                 "render": function (data, type, full) {
                     var html = '<a href="edit.html?id=' + data + '" title="修改">修改</a>'
                     return html;
                 }
             }
        ],
        "fnDrawCallback": function (oSettings) {
            for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
                $('td:eq(0)', oSettings.aoData[oSettings.aiDisplay[i]].nTr).html( (oSettings._iDisplayStart + i + 1));
            }

        }


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
            "url": Util.service.GetAllPublishAchievement,
            "type": "POST",
            "dataSrc": "data",
            "dataType": "json",
            "data": function (v) {
                v.isApprove = 1;
                v.userId=userId;
                v.VisitID = manageVisitID;
                v.RetrievalInfo = '{}';
                return v;
            }
        }, "columns": [
            {
                "data": "AchID",
                "className": "text-center",
                'orderable': false
            },
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
                "data": "OwnerType",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "Creator",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "CreatDate",
                'orderable': false,
                "className": "text-center"
            },
            {
                //"data": "Status",
                //'orderable': false,
                //"className": "text-center",
                //// "render": function (data) {
                ////     if(data == 0){
                ////         return '未审核'
                ////     }else{
                ////         return '已审核'
                ////     }
                //// }
                "data": "IsInstitutesApprove",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    if (data == null) {

                        if (full.Status == "未审核" && full.IsApprove == 0) {
                            return '未审核'
                        }
                        else if (full.Status == "未审核" && full.IsApprove == 1) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "审核通过" && full.IsApprove == 0) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "审核通过" && full.IsApprove == 1) {
                            return '审核通过'
                        }
                        else if (full.Status == "交易中" && full.IsApprove == 0) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "交易中" && full.IsApprove == 1) {
                            return '交易中'
                        }
                        else if (full.Status == "交易结束" && full.IsApprove == 0) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "交易结束" && full.IsApprove == 1) {
                            return '交易结束'
                        }
                        else if (full.Status == "审核不通过" && full.IsApprove == 0) {
                            return '审核不通过'
                        }
                        else if (full.Status == "审核不通过" && full.IsApprove == 1) {
                            return '数据审核状态有误'
                        }
                    } else if (data == 1) {
                        if (full.Status == "未审核" && full.IsApprove == 0) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "未审核" && full.IsApprove == 1) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "审核通过" && full.IsApprove == 0) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "审核通过" && full.IsApprove == 1) {
                            //return '单位已审核，待中心审核'
                            return '单位已审核'
                        }
                        else if (full.Status == "交易中" && full.IsApprove == 0) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "交易中" && full.IsApprove == 1) {
                            return '交易中'
                        }
                        else if (full.Status == "交易结束" && full.IsApprove == 0) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "交易结束" && full.IsApprove == 1) {
                            return '交易结束'
                        }
                        else if (full.Status == "审核不通过" && full.IsApprove == 0) {
                            //return '单位已审核，待中心审核'
                            return '单位已审核'
                        }
                        else if (full.Status == "审核不通过" && full.IsApprove == 1) {
                            return '数据审核状态有误'
                        }
                    } else if (data == 2) {
                        if (full.Status == "未审核" && full.IsApprove == 0) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "未审核" && full.IsApprove == 1) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "审核通过" && full.IsApprove == 0) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "审核通过" && full.IsApprove == 1) {
                            return '中心已审核'
                        }
                        else if (full.Status == "交易中" && full.IsApprove == 0) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "交易中" && full.IsApprove == 1) {
                            return '交易中'
                        }
                        else if (full.Status == "交易结束" && full.IsApprove == 0) {
                            return '数据审核状态有误'
                        }
                        else if (full.Status == "交易结束" && full.IsApprove == 1) {
                            return '交易结束'
                        }
                        else if (full.Status == "审核不通过" && full.IsApprove == 0) {
                            return '中心已审核'
                        }
                        else if (full.Status == "审核不通过" && full.IsApprove == 1) {
                            return '数据审核状态有误'
                        }
                    }

                }
            },
            {
                "data": "IsCompetePrice",
                'orderable': false,
                "className": "text-center",
                "render": function (data) {
                    if(data == 0){
                        return '议价'
                    }else{
                        return '竞价'
                    }
                }
            },
            {
                "data": "AchID",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    var html = '<a href="/achievementinfo.html?id=' + data + '" title="预览">预览</a>'
                    return html;
                }
            },
            {
                "data": "AchID",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    var html = '<a href="detail.html?id=' + data + '" title="查看">查看</a>'
                    return html;
                }
            },
            {
                "data": "AchID",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    if (full.IsInstitutesApprove != 2) {
                        var html = '<a href="edit.html?id=' + data + '" title="修改">修改</a>'
                        return html;
                    }
                    else {
                        var html = '';
                        return html;
                    }
                   
                }
            }
        ],
        "fnDrawCallback": function (oSettings) {
            for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
                $('td:eq(0)', oSettings.aoData[oSettings.aiDisplay[i]].nTr).html( (oSettings._iDisplayStart + i + 1));
            }

        }


    });


    //通过
    $("#dataTable1").on("click",".btnPass",function(e){
        e.preventDefault();
        var id = $(this).data("id");
        console.info(id);
        Util.confirm("请确认审核通过",function(){
            $.ajax({
                url: Util.service.ApproveAchievementPass,
                type: 'POST',
                data: { state: 1,"achID":id ,IsInstitutesApprove:1},
                beforeSend: function () {
                    Util.pageLoading();
                },
                success: function (data) {
                    Util.pageinit();
                    if (data.success === 1) {
                        Util.success("show", "操作成功");                       
                        drawTable1.draw();
                        drawTable2.draw();
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
    })

    var achid = "";
    var toperson = "";
    //不通过模态框
    $("#dataTable1").on("click", ".btnRejuest", function (e) {
        e.preventDefault();
        achid = $(this).data("id");
        toperson = $(this).data("userid");
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
    })

    //不通过内容提交
    $("#tradeModal").on("click", ".submit", function (e) {
        e.preventDefault();

        var len = $("#tradeModal").find('input[type=checkbox]:checked').length;
        var mail = $("#tradeModal").find("#youxiang").val();
        var mail1 = mail.replace("此成果信息审核未通过，原因为：", "");
        var mess = $("#tradeModal").find("#tel").val();
        var mess1 = mess.replace("此成果信息审核未通过，原因为：", "");
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
            url: Util.service.ApproveAchievement,
            type: 'POST',
            data: {
                "achID": achid,
                "DataFlag": 1,
                "toperson": toperson,
                "state": 0,
                "userID": userId,
                "jsonStr": JSON.stringify(form1),
                "IsInstitutesApprove": 1
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
})
