/**
 * Created by gankehuang on 2018/6/12.
 */

$(function () {

    //$.post(Util.service.GetNaturalPer, {
    //    draw: 0,
    //    start: 0,
    //    length: 10
    //}, function (res) {
    //    console.log('GetNaturalPer', res)
    //});
    //$.post(Util.service.GetDepPer, {
    //    draw: 0,
    //    start: 0,
    //    length: 10
    //}, function (res) {
    //    console.log('GetDepPer', res)
    //}); 
    //$.post(Util.service.GetLedPer, {
    //    draw: 0,
    //    start: 0,
    //    length: 10
    //}, function (res) {
    //    console.log('GetLedPer', res)
    //});

    //return;



    Util.pageinit();
    var LoginData = Util.getUserLoginData();
    console.log(LoginData)
    var userid = LoginData.ID;

    var RetrievalInfo = {};

    //自然人账户
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
            "url": Util.service.GetNaturalPer,
            "type": "POST",
            "dataSrc": "data",
            "dataType": "json",
            "data": function (v) {
                v.isApprove = '';
                v.VisitID = manageVisitID;
                v.RetrievalInfo = JSON.stringify(RetrievalInfo);
                console.log(v)
                return v;
            }
        }, "columns": [
            {
                "data": "ID",
                "className": "text-center",
                'orderable': false
            },
            {
                "data": "Name",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "LoginName",
                'orderable': false,
                "className": "text-center",
                //点击跳转到该用户成果列表
                "render": function (data, type, full) {
                    var html = '<a href="/admin/notification/index.html?userid=' + full.ID + '" title="查看该用户成果列表" target="_blank">' + data + '</a>'
                    return html;
                }
            },
            {
                "data": "zhagnhutype",
                'orderable': false,
                "className": "text-center"
            },           
            {
                "data": "LinkMan",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "AchCount",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    if(data == 0){
                        return data;
                    }else{
                        var html = '<a href="/admin/userManage/resultCount.html?userid=' + full.ID + '" target="_blank">' + data + '</a>'
                        return html;
                    }
                    
                }
            },
            {
                "data": "CompeteCount",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    if(data == 0){
                        return data;
                    }else{
                        var html = '<a href="/admin/userManage/CompeteCount.html?userid=' + full.ID + '" target="_blank">' + data + '</a>'
                        return html;
                    }
                    
                }
            },
            {
                "data": "DiscussCount",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    if(data == 0){
                        return data;
                    }else{
                        var html = '<a href="/admin/userManage/DiscussCount.html?userid=' + full.ID + '" target="_blank">' + data + '</a>'
                        return html;
                    }
                    
                }
            },
            {
                "data": "TradeCount",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    if(data == 0){
                        return data;
                    }else{
                        var html = '<a href="/admin/userManage/TradeCount.html?userid=' + full.ID + '" target="_blank">' + data + '</a>'
                        return html;
                    }
                    
                }
            },
            {
                "data": "LoginName",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    var html = '<a href="/admin/userManage/detail.html?logname=' + data + '" title="查看" target="_blank">详情</a>'
                    return html;
                }
            },
            {
                "data": "IsApprove",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    if (data == 0) {
                        return '<a href="#" class="btn btn-info btn-xs btnPass" data-id=' + full.ID + '>通过</a>' +
                        '<a data-toggle="modal" data-target="#tradeModal" class="btn btn-danger btn-xs btnRejuest" data-id=' + full.ID + '>不通过</a>'
                    } else {
                        return '';
                    }
                }
            },
            {
                "data": "Operates",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    if (data == null) {
                        return '未更新';
                    } else if(data == 1){
                        return '联系人更新';
                    } else {
                        return '实名认证更新';
                    }
                }
            }

        ],
        "fnDrawCallback": function (oSettings) {
            for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
                $('td:eq(0)', oSettings.aoData[oSettings.aiDisplay[i]].nTr).html((oSettings._iDisplayStart + i + 1));
            }
        }
    });

    
    //tab搜索控制标识

    var SearchIdentity = 1;

    //点击自然人账户添加搜索标识
    $("#naturalperson1").on('click', function() {
        SearchIdentity = 1;   //自然人账户tab页搜索标识
    })

    //所级账户
    //var a = setTimeout(drawTable1, 3000);
   
    $("#legalPerson").on('click', function() {
       
        drawTable2();
        SearchIdentity = 2;  //法人账户tab页搜索标识
    })
    //var b = setTimeout(drawTable2, 800);
    //console.log(a);
    var drawTablea;
    /*function drawTable1() {
        drawTablea = $("#dataTable1").DataTable({
            "pageLength": Util.perPageLength,
            "processing": true,
            "serverSide": true,
            "paginate": true,
            "info": false,
            "lengthChange": false,
            "ordering": true,
            "searching": false,
            "ajax": {
                "url": Util.service.GetDepPer,
                "type": "POST",
                "dataSrc": "data",
                "dataType": "json",
                "data": function (v) {
                    v.isApprove = ''
                    v.VisitID = manageVisitID;
                    v.RetrievalInfo = JSON.stringify(RetrievalInfo);
                    console.log(v)
                    return v;
                }
            }, "columns": [
                {
                    "data": "ID",
                    "className": "text-center",
                    'orderable': false
                },
                {
                    "data": "Name",
                    'orderable': false,
                    "className": "text-center"
                },
                {
                    "data": "LoginName",
                    'orderable': false,
                    "className": "text-center",
                    //点击跳转到该用户成果列表
                    "render": function (data, type, full) {
                        var html = '<a href="/admin/notification/index.html?userid=' + full.ID + '" title="查看该用户成果列表" target="_blank">' + data + '</a>'
                        return html;
                    }
                },
                {
                    "data": "zhagnhutype",
                    'orderable': false,
                    "className": "text-center"
                },              
                {
                    "data": "LinkMan",
                    'orderable': false,
                    "className": "text-center"
                },
                {
                    "data": "AchCount",
                    'orderable': false,
                    "className": "text-center"
                },
                {
                    "data": "CompeteCount",
                    'orderable': false,
                    "className": "text-center"
                },
                {
                    "data": "DiscussCount",
                    'orderable': false,
                    "className": "text-center"
                },
                {
                    "data": "TradeCount",
                    'orderable': false,
                    "className": "text-center"
                },
                {
                    "data": "LoginName",
                    'orderable': false,
                    "className": "text-center",
                    "render": function (data, type, full) {
                        var html = '<a href="/admin/userManage/detail.html?logname=' + data + '" title="查看" target="_blank">详情</a>'
                        return html;
                    }
                },
                {
                    "data": "IsApprove",
                    'orderable': false,
                    "className": "text-center",
                    "render": function (data, type, full) {
                        if (data == 0) {
                            return '<a href="#" class="btn btn-info btn-xs btnPass" data-id=' + full.ID + '>通过</a>' +
                            '<a data-toggle="modal" data-target="#tradeModal" class="btn btn-danger btn-xs btnRejuest" data-id=' + full.ID + '>不通过</a>'
                        } else {
                            return '';
                        }


                    }
                },
                {
                    "data": "LoginName",
                    'orderable': false,
                    "className": "text-center",
                    "render": function (data, type, full) {  
                        var html = '<a data-toggle="modal" data-target="#myModal" name="'+ full.Name +'" onclick="aClick(this)">详情</a>'
                        return html;
                    }
                }
            ],
            "fnDrawCallback": function (oSettings) {
                for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
                    $('td:eq(0)', oSettings.aoData[oSettings.aiDisplay[i]].nTr).html((oSettings._iDisplayStart + i + 1));
                }
            }
        });
    }*/

    //法人账户
    var drawTableb;
    function drawTable2() {
        drawTableb = $("#dataTable2").DataTable({
            "pageLength": Util.perPageLength,
            "processing": true,
            "serverSide": true,
            "paginate": true,
            "info": false,
            "lengthChange": false,
            "ordering": true,
            "searching": false,
            "ajax": {
                "url": Util.service.GetLedPer,
                "type": "POST",
                "dataSrc": "data",
                "dataType": "json",
                "data": function (v) {
                    v.isApprove = '';
                    v.VisitID = manageVisitID;
                    v.RetrievalInfo = JSON.stringify(RetrievalInfo);
                    console.log(v)
                    return v;
                }
            }, "columns": [
                {
                    "data": "ID",
                    "className": "text-center",
                    'orderable': false
                },
                {
                    "data": "Name",
                    'orderable': false,
                    "className": "text-center"
                },
                {
                    "data": "LoginName",
                    'orderable': false,
                    "className": "text-center",
                    //点击跳转到该用户成果列表
                    "render": function (data, type, full) {
                        var html = '<a href="/admin/notification/index.html?userid=' + full.ID + '" title="查看该用户成果列表" target="_blank">' + data + '</a>'
                        return html;
                    }
                },
                {
                    "data": "zhagnhutype",
                    'orderable': false,
                    "className": "text-center"
                },
                {
                    "data": "Properties",
                    'orderable': false,
                    "className": "text-center",
                    "render": function (data, full, type) {
                        if (data == null || data == "") {
                            return "";
                        }
                        else {
                            if (data == "1") {
                                return "高校";
                            }
                            if (data == "2") {
                                return "企业";
                            }
                            if (data == "3") {
                                return "科研单位";
                            }
                        }
                    }
                },
                {
                    "data": "LinkMan",
                    'orderable': false,
                    "className": "text-center"
                },
                {
                    "data": "AchCount",
                    'orderable': false,
                    "className": "text-center",
                    "render": function (data, type, full) {
                        if(data == 0){
                            return data;
                        }else{
                            var html = '<a href="/admin/userManage/resultCount.html?userid=' + full.ID + '" target="_blank">' + data + '</a>'
                            return html;
                        }
                        
                    }
                },
                {
                    "data": "CompeteCount",
                    'orderable': false,
                    "className": "text-center",
                    "render": function (data, type, full) {
                        if(data == 0){
                            return data;
                        }else{
                            var html = '<a href="/admin/userManage/CompeteCount.html?userid=' + full.ID + '" target="_blank">' + data + '</a>'
                            return html;
                        }
                        
                    }
                },
                {
                    "data": "DiscussCount",
                    'orderable': false,
                    "className": "text-center",
                    "render": function (data, type, full) {
                        if(data == 0){
                            return data;
                        }else{
                            var html = '<a href="/admin/userManage/DiscussCount.html?userid=' + full.ID + '" target="_blank">' + data + '</a>'
                            return html;
                        }
                        
                    }
                },
                {
                    "data": "TradeCount",
                    'orderable': false,
                    "className": "text-center",
                    "render": function (data, type, full) {
                        if(data == 0){
                            return data;
                        }else{
                            var html = '<a href="/admin/userManage/TradeCount.html?userid=' + full.ID + '" target="_blank">' + data + '</a>'
                            return html;
                        }
                        
                    }
                },
                {
                    "data": "UserCount",
                    'orderable': false,
                    "className": "text-center",
                    "render": function (data, type, full) {
                        if(data == 0){
                            return data;
                        }else{
                            var html = '<a href="/admin/userManage/UserCount.html?Userid='+ full.ID +'&dptname='+ full.Name +'" title="查看" target="_blank">'+data+'</a>'
                            return html;
                        }
                        
                    }
                },
                {
                    "data": "LoginName",
                    'orderable': false,
                    "className": "text-center",
                    "render": function (data, type, full) {
                        var html = '<a href="/admin/userManage/detail.html?logname=' + data + '" title="查看" target="_blank">详情</a>'
                        return html;
                    }
                },
                {
                    "data": "IsApprove",
                    'orderable': false,
                    "className": "text-center",
                    "render": function (data, type, full) {
                        if (data == 0) {
                            return '<a href="#" class="btn btn-info btn-xs btnPass" data-id=' + full.ID + '>通过</a>' +
                            '<a data-toggle="modal" data-target="#tradeModal" class="btn btn-danger btn-xs btnRejuest" data-id=' + full.ID + '>不通过</a>'
                        } else {
                            return '';
                        }
                    }
                },
                {
                    "data": "Operates",
                    'orderable': false,
                    "className": "text-center",
                    "render": function (data, type, full) {
                        if (data == null) {
                            return '未更新';
                        } else if(data == 1){
                            return '联系人更新';
                        } else {
                            return '实名认证更新';
                        }
                    }
                }
            ],
            "fnDrawCallback": function (oSettings) {
                for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
                    $('td:eq(0)', oSettings.aoData[oSettings.aiDisplay[i]].nTr).html((oSettings._iDisplayStart + i + 1));
                }
            }
        });
    }

    


    //单位性质搜索
    //$("#properties").on("change", function (e) {
    //    e.preventDefault();
    //    RetrievalInfo = $("#formSearchInfo").serializeJson();
    //    drawTable.draw();
    //    drawTablea.draw();
    //    drawTableb.draw();
    //});
    //搜索
    $("#searchBtn").on("click", function (e) {
        e.preventDefault();
        RetrievalInfo = $("#formSearchInfo").serializeJson();

        //drawTablea.draw();
        if(SearchIdentity == 1){
            drawTable.draw();
        }else{
            drawTableb.draw();
        }

    });

    //全部
    $('#resetBtn, .btn-close').on('click', function (e) {
        e.preventDefault();
        RetrievalInfo = $('#formSearchInfo').resetSearch();
        //drawTablea.draw();
        if(SearchIdentity == 1){
            drawTable.draw();
        }else{
            drawTableb.draw();
        }

    });
    //通过
    $("#dataTable").on("click", ".btnPass", function (e) {
        e.preventDefault();
        var id = $(this).data("id");
        Util.confirm("请确认审核通过", function () {
            $.ajax({
                url: Util.service.ApproveUserPass,
                type: 'POST',
                data: { userID: id, state: 1 },
                beforeSend: function () {
                    Util.pageLoading();
                },
                success: function (data) {
                    Util.pageinit();
                    if (data.success === 1) {
                        Util.success('show', '操作成功');
                        drawTable.draw(false);
                    } else {
                        Util.error('show', data.message);
                    }
                },
                error: function () {
                    console.error("系统错误")
                    Util.pageinit();
                }
            });
        })
    })
    $("#dataTable1").on("click", ".btnPass", function (e) {
        e.preventDefault();
        var id = $(this).data("id");
        Util.confirm("请确认审核通过", function () {
            $.ajax({
                url: Util.service.ApproveUserPass,
                type: 'POST',
                data: { userID: id, state: 1 },
                beforeSend: function () {
                    Util.pageLoading();
                },
                success: function (data) {
                    Util.pageinit();
                    if (data.success === 1) {
                        Util.success('show', '操作成功');
                        $("#dataTable1").DataTable().draw(false);
                    } else {
                        Util.error('show', data.message);
                    }
                },
                error: function () {
                    console.error("系统错误")
                    Util.pageinit();
                }
            });
        })
    })
    $("#dataTable2").on("click", ".btnPass", function (e) {
        e.preventDefault();
        var id = $(this).data("id");
        Util.confirm("请确认审核通过", function () {
            $.ajax({
                url: Util.service.ApproveUserPass,
                type: 'POST',
                data: { userID: id, state: 1 },
                beforeSend: function () {
                    Util.pageLoading();
                },
                success: function (data) {
                    Util.pageinit();
                    if (data.success === 1) {
                        Util.success('show', '操作成功');
                        $("#dataTable2").DataTable().draw(false);

                    } else {
                        Util.error('show', data.message);
                    }
                },
                error: function () {
                    console.error("系统错误")
                    Util.pageinit();
                }
            });
        })
    })
    var achid = "";
    var toperson = "";
    //不通过模态框
    $("#dataTable").on("click", ".btnRejuest", function (e) {
        e.preventDefault();
        var id = $(this).data("id");
        achid = id;
        $.ajax({
            url: Util.service.GetUserInfoByID,
            type: 'POST',
            data: { "ID": id },
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                if (data.success === 1) {
                    data.resultData = JSON.parse(data.resultData);
                    $("#tradeModal").find("#LoginName").val(data.resultData["LoginName"]);
                    $("#tradeModal").find("#Call").val(data.resultData["Phone"]);
                    toperson = data.resultData["CreateUser"];
                } else {
                    console.error("系统错误")
                }
            },
            error: function () {
                console.error("系统错误")
                Util.pageinit();
            }
        });
    })
    $("#dataTable1").on("click", ".btnRejuest", function (e) {
        e.preventDefault();
        var id = $(this).data("id");
        achid = id;
        $.ajax({
            url: Util.service.GetUserInfoByID,
            type: 'POST',
            data: { "ID": id },
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                if (data.success === 1) {
                    data.resultData = JSON.parse(data.resultData);
                    $("#tradeModal").find("#LoginName").val(data.resultData["LoginName"]);
                    $("#tradeModal").find("#Call").val(data.resultData["Phone"]);
                    toperson = data.resultData["CreateUser"];
                } else {
                    console.error("系统错误")
                }
            },
            error: function () {
                console.error("系统错误")
                Util.pageinit();
            }
        });
    })
    $("#dataTable2").on("click", ".btnRejuest", function (e) {
        e.preventDefault();
        var id = $(this).data("id");
        achid = id;
        $.ajax({
            url: Util.service.GetUserInfoByID,
            type: 'POST',
            data: { "ID": id },
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                if (data.success === 1) {
                    data.resultData = JSON.parse(data.resultData);
                    $("#tradeModal").find("#LoginName").val(data.resultData["LoginName"]);
                    $("#tradeModal").find("#Call").val(data.resultData["Phone"]);
                    toperson = data.resultData["CreateUser"];
                } else {
                    console.error("系统错误")
                }
            },
            error: function () {
                console.error("系统错误")
                Util.pageinit();
            }
        });
    })
    //不通过内容提交
    $("#tradeModal").on("click", ".submit", function (e) {
        e.preventDefault();
        var len = $("#tradeModal").find('input[type=checkbox]:checked').length;
        var mail = $("#tradeModal").find("#youxiang").val();
        var mail1 = mail.replace("此用户信息审核未通过，原因为：", "");
        var mess = $("#tradeModal").find("#tel").val();
        var mess1 = mess.replace("此用户信息审核未通过，原因为：", "");
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
            url: Util.service.ApproveUser,
            type: 'POST',
            data: {
                "DataFlag": 0,
                "toperson": toperson,
                "AchID": achid,
                "state": 0,
                "userID": userid,
                "jsonStr": JSON.stringify(form1)
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

