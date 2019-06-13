/**
 * Created by gankehuang on 2018/6/12.
 */

$(function () {
    Util.pageinit();
    var RetrievalInfo;
    var drawTable = $("#dataTable1").DataTable({
        "pageLength": Util.perPageLength,
        "processing": true,
        "serverSide": true,
        "paginate": true,
        "info": false,
        "lengthChange": false,
        "ordering": true,
        "searching": false,
        "ajax": {
            "url": Util.service.GetUserByUserCount,
            "type": "POST",
            "dataSrc": "data",
            "dataType": "json",
            //"data": { "Userid": getQueryString("Userid"), "dptname": getQueryString("dptname") }
            "data": function (v) {
                v.Userid = getQueryString("Userid"),
                v.dptname =  getQueryString("dptname");
                v.RetrievalInfo = JSON.stringify(RetrievalInfo);
                //console.log(v)
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

    //搜索
    /*$("#searchBtn").on("click", function (e) {
        e.preventDefault();
        RetrievalInfo = $("#formSearchInfo").serializeJson();
        drawTable.draw();
    });*/
    //全部
    /*$('#resetBtn, .btn-close').on('click', function (e) {
        e.preventDefault();
        RetrievalInfo = $('#formSearchInfo').resetSearch();
        drawTable.draw();
    });*/

    // 获取url中的参数
    function getQueryString(key) {
        var url = window.location.search;                        // 获取参数
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");   // 正则筛选地址栏
        var result = url.substr(1).match(reg);                   // 匹配目标参数
        return result ? decodeURIComponent(result[2]) : null;    //返回参数值
    }

    $("#FR").html(getQueryString("dptname"));

});



