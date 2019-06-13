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
            "url": Util.service.getAllTradeOfRequirementByUserID,
            "type": "POST",
            "dataSrc": "data",
            "dataType": "json",
            "data": function (v) {
                v.userID =  Util.getUserId();
                return v;
            }
        }, "columns": [
            {
                "data": "id",
                "className": "text-center",
                'orderable': false
            },
            {
                "data": "RequireName",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "OwnerType",
                'orderable': false,
                "className": "text-center",
            },
            {
                "data": "Price",
                'orderable': false,
                "className": "text-center",
            },
            {
                "data": "Type",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    if(data  == 0){
                        return '竞价';
                    }else if(data == 1){
                        return '议价';
                    }
                }
            },
            {
                "data": "AchieveName",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "ID",
                'orderable': false,
                "className": "text-center",
            },

        ],
        "fnDrawCallback": function (oSettings) {
            for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
                $('td:eq(0)', oSettings.aoData[oSettings.aiDisplay[i]].nTr).html( (oSettings._iDisplayStart + i + 1));
            }

        }
    });

})
