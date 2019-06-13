/**
 * Created by zhujianlin on 2017/5/21.
 */

$(function(){
    Util.pageinit();

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
            "url": Util.service.getAchievementList,
            "type": "POST",
            "dataSrc": "data",
            "dataType": "json",
            "data": function (v) {
                // v.keywords = keywordsObj;
                //排序字段
                // v.orders = [];
                //默认时间排序
                // var defaultOrder = true;
                // for (var i in v.order) {
                //     if (v.columns[v.order[i].column].data == 'createdTime') {
                //         defaultOrder = false;
                //     }
                //     v.orders.push({column: v.columns[v.order[i].column].data, dir: v.order[i].dir})
                // }
                // if (defaultOrder) {
                //     v.orders.push({column: 'createdTime', dir: 'desc'})
                // }
                return JSON.stringify(v);
            }
        }, "columns": [
            {
                "data": "id",
                "className": "text-center",
                'orderable': false
            },
            {
                "data": "eventName",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "eventName",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "eventCode",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "eventName",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "eventCode",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "eventName",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    return '<a href="../requireDetail/index.html" target="_blank">[查看]</a>';
                }
            },

        ],
        "fnDrawCallback": function (oSettings) {
            for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
                $('td:eq(0)', oSettings.aoData[oSettings.aiDisplay[i]].nTr).html( (oSettings._iDisplayStart + i + 1));
            }

        }


    });

})
