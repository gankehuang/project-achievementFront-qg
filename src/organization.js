/**
 * Created by wangyinping on 2017/6/16.
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
            "url": Util.service.GetAllAgency,
            "type": "POST",
            "data": { "VisitID": hbVisitID },
            "dataSrc": "data",
            "dataType": "json",
        }, "columns": [
            {
                "data": "ID",
                "className": "text-center",
                'orderable': false
            },
            {
                "data": "AgencyName",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "Num",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "AgencyName",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    return '<a href="/company.html?name='+data+'">[查看]</a>';
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
