/// <reference path="../../money.js" />
/// <reference path="../../money.js" />
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
            "url": Util.service.getAllTradeOfAchievement,
            "type": "POST",
            "dataSrc": "data",
            "dataType": "json",
            "data": function (v) {
               
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
                "className": "text-center",
            },
            {
                "data": "Status",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "ID",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    return '<a href="/achievementinfo.html?id='+full.AchID+'" target="_blank">[查看]</a>';
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
