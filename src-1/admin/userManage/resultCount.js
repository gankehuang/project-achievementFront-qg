/**
 * Created by wangyinping on 2017/5/22.
 */

$(function () {
    Util.pageinit();

    //时间选择
    $(".datetimepicker").datetimepicker({
        format: 'YYYY-MM-DD',
        dayViewHeaderFormat: 'YYYY-MM',
        useCurrent: false,
        sideBySide: true
    });


    /*--begin基本信息获取*/
    function getBasicInfo(urlInfo, selectELe, defaultOption, parentID, value) {
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

    //管理员用户管理页面点击用户跳转过来查看当前用户的成果列表
    var userid = Util.getUrlParam("userid")
    console.log(userid);
    var drawTable;
    var RetrievalInfo = {};
    if (userid)//跳过来的
    {
        //$("#titel").html("用户成果列表")
        drawTable = $("#dataTable").DataTable({
            "pageLength": Util.perPageLength,
            "processing": true,
            "serverSide": true,
            "paginate": true,
            "info": false,
            "lengthChange": false,
            "ordering": true,
            "searching": false,
            "ajax": {
                "url": Util.service.AdminGetAllPublishAchievementByUserID,
                "type": "POST",
                "dataSrc": "data",
                "dataType": "json",
                "data": function (v) {
                    v.userID =userid ;//用户id
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
                    "data": "IsApprove",
                    'orderable': false,
                    "className": "text-center",
                    "render": function (data) {
                        if (data == 0) {
                            return '未审核'
                        } else {
                            return '已审核'
                        }
                    }
                },
                {
                    "data": "IsCompetePrice",
                    'orderable': false,
                    "className": "text-center",
                    "render": function (data) {
                        if (data == 0) {
                            return '议价'
                        } else {
                            return '竞价'
                        }
                    }
                },
                {
                    "data": "AchID",
                    'orderable': false,
                    "className": "text-center",
                    "render": function (data, type, full) {
                        return '<a href="/admin/requireCommand/index.html?id=' + data + "&name=" + full.AchieveName + '" target="_blank">[选择]</a>';
                    }
                },
                {
                    "data": "AchID",
                    'orderable': false,
                    "className": "text-center",
                    "render": function (data, type, full) {
                        var html = '<a href="/achievementinfo.html?id=' + data + '" title="预览" target="_blank">预览</i></a>&nbsp;&nbsp;'
                        html += '<a href="detail.html?id=' + data + '" title="查看" target="_blank">查看</a>&nbsp;&nbsp;'
                        if (full.IsApprove == 1) {
                            var text = full.RecommendFlag == 1 ? '取消推荐' : '推荐';
                            html += '<a href="#" class="btn btn-success btn-xs btnRecommend" data-id=' + data + '>' + text + '</a>';
                        }
                        return html;
                    }
                },
             
            ],
            "fnDrawCallback": function (oSettings) {
                for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
                    $('td:eq(0)', oSettings.aoData[oSettings.aiDisplay[i]].nTr).html((oSettings._iDisplayStart + i + 1));
                }
            }
        });
    }
    else {
        drawTable = $("#dataTable").DataTable({
            "pageLength": Util.perPageLength,
            "processing": true,
            "serverSide": true,
            "paginate": true,
            "info": false,
            "lengthChange": false,
            "ordering": true,
            "searching": false,
            "ajax": {
                "url": Util.service.GetAllPublishAchievementByself,
                "type": "POST",
                "dataSrc": "data",
                "dataType": "json",
                "data": function (v) {
                    v.isApprove = '';
                    if (RetrievalInfo.IsApprove != undefined) {
                        v.isApprove = RetrievalInfo.IsApprove;
                    }
                    v.userId = '';
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
                    "data": "IsApprove",
                    'orderable': false,
                    "className": "text-center",
                    "render": function (data) {
                        if (data == 0) {
                            return '未审核'
                        } else {
                            return '已审核'
                        }
                    }
                },
                {
                    "data": "IsCompetePrice",
                    'orderable': false,
                    "className": "text-center",
                    "render": function (data) {
                        if (data == 0) {
                            return '议价'
                        } else {
                            return '竞价'
                        }
                    }
                },
                {
                    "data": "AchID",
                    'orderable': false,
                    "className": "text-center",
                    "render": function (data, type, full) {
                        return '<a href="/admin/requireCommand/index.html?id=' + data + "&name=" + full.AchieveName + '" target="_blank">[选择]</a>';
                    }
                },
                {
                    "data": "AchID",
                    'orderable': false,
                    "className": "text-center",
                    "render": function (data, type, full) {
                        ////var html = '<a href="/achievementinfo.html?id='+data+'" title="查看" target="_blank"><i class="glyphicon glyphicon-list"></i></a>&nbsp;&nbsp;'
                        //var html = '<a href="detail.html?id=' + data + '" title="预览">预览</a>'
                        //return html;
                        var html = '<a href="/achievementinfo.html?id=' + data + '" title="预览" target="_blank">预览</i></a>&nbsp;&nbsp;'
                        html += '<a href="detail.html?id=' + data + '" title="查看" target="_blank">查看</a>&nbsp;&nbsp;'
                        if (full.IsApprove == 1) {
                            var text = full.RecommendFlag == 1 ? '取消推荐' : '推荐';
                            html += '<a href="#" class="btn btn-success btn-xs btnRecommend" data-id=' + data + '>' + text + '</a>';
                        }
                        return html;
                    }
                },
                //{
                //    "data": "AchID",
                //    'orderable': false,
                //    "className": "text-center",
                //    "render": function (data, type, full) {
                //        //var html = '<a href="/achievementinfo.html?id='+data+'" title="查看" target="_blank"><i class="glyphicon glyphicon-list"></i></a>&nbsp;&nbsp;'
                //        var html = '<a href="detail.html?id=' + data + '" title="查看">查看</a>'
                //        return html;
                //    }
                //}
            ],
            "fnDrawCallback": function (oSettings) {
                for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
                    $('td:eq(0)', oSettings.aoData[oSettings.aiDisplay[i]].nTr).html((oSettings._iDisplayStart + i + 1));
                }

            }
        });
    }

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

    //已推荐
    $('#recommendBtn').on('click',  function (e) {
        e.preventDefault();
        RetrievalInfo = {'RecommendFlag': 1};
        drawTable.draw();
    })
    
    //推荐/取消推荐
    $("#dataTable").on("click", ".btnRecommend", function (e) {
        e.preventDefault();
        var id = $(this).data("id");
        Util.confirm("请确认推荐or取消推荐", function () {
            $.ajax({
                url: Util.service.RecommendAchievement,
                type: 'POST',
                data: { "AchID": id },
                beforeSend: function () {
                    Util.pageLoading();
                },
                success: function (data) {
                    Util.pageinit();
                    if (data.success === 1) {
                        Util.success("show", "操作成功");
                        drawTable.draw(false);
                    } else {
                        Util.error("show", data.message)
                    }
                },
                error: function () {
                    //服务器错误
                    Util.pageinit();
                    Util.error("show", "服务器错误")
                }
            });
        })
    });
});
