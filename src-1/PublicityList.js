/**
 * Created by lijuan on 2017/12/12.
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
            "url": Util.service.GetPublicityListYK,
            "type": "POST",
            "dataSrc": "data",
            "dataType": "json",
            "data": function (v) {
                v.userID = '';
                v.RetrievalInfo = JSON.stringify({
                    'State': '1,2,4'
                });
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
                //zmm改动 显示合同金额
                "data": "ContractAmount",
                'orderable': false,
                "className": "text-center",
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
                "render": function (data) {
                    return Publicity_Status_2str(data);
                }
            },
            {
                "data": "CreatDate",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "ID",
                'orderable': false,
                "className": "text-center",
                "render": function (data,type, full) {
                    var html = '<a href="/PublicityDetail.html?id='+data+'" title="查看" target="_blank"><i class="glyphicon glyphicon-list"></i></a>&nbsp;&nbsp;'
                    return html;
                }
            },

        ],
        "fnDrawCallback": function (oSettings) {
            for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
                $('td:eq(0)', oSettings.aoData[oSettings.aiDisplay[i]].nTr).html( (oSettings._iDisplayStart + i + 1));
            }

        }
    });

});
