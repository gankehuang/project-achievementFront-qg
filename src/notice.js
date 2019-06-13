/**
 * Created by wangyinping on 2017/6/11.
 */

$(function(){
    Util.pageinit();

    $(".tab-list .tab-title").on("click",function(){
        var index = $(this).data("index");
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        var $tab = $(this).parent().siblings(".tab-box").find("[data-index="+index+"]");
        $tab.siblings().hide();
        $tab.show();
    });

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
            "url": Util.service.GetAllNotice,
            "type": "POST",
            "data": {
                "VisitID": hbVisitID
            },
            "dataSrc": "data",
            "dataType": "json",
        }, "columns": [
            {
                "data": "ID",
                "className": "text-center",
                'orderable': false
            },
            {
                "data": "Classify",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "Name",
                'orderable': false,
                "className": "text-center",
            },
            {
                "data": "WeighNum",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "CreateDate",
                'orderable': false,
                "className": "text-center",

            },
            {
                "data": "OwnerCompany",
                'orderable': false,
                "className": "text-center"
            },
        ],
        "fnDrawCallback": function (oSettings) {
            for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
                $('td:eq(0)', oSettings.aoData[oSettings.aiDisplay[i]].nTr).html( (oSettings._iDisplayStart + i + 1));
            }

        }
    });

    //table2:初始化列表
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
            "url": Util.service.GetAllPatentNotice,
            "type": "POST",
            "data": {
                "VisitID": hbVisitID
            },
            "dataSrc": "data",
            "dataType": "json",
        }, "columns": [
            {
                "data": "ID",
                "className": "text-center",
                'orderable': false
            },
            {
                "data": "PatentName",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "InventUnit",
                'orderable': false,
                "className": "text-center",
            },
            {
                "data": "AverageScore",
                'orderable': false,
                "className": "text-center"
            },
        ],
        "fnDrawCallback": function (oSettings) {
            for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
                $('td:eq(0)', oSettings.aoData[oSettings.aiDisplay[i]].nTr).html( (oSettings._iDisplayStart + i + 1));
            }

        }
    });
    //table4列表初始化由原来的写死数据改为从数据库中读取数据
    var drawTable4 = $("#dataTable4").DataTable({
        "pageLength": Util.perPageLength,
        "processing": true,
        "serverSide": true,
        "paginate": true,
        "info": false,
        "lengthChange": false,
        "ordering": true,
        "searching": false,
        "ajax": {
            "url": Util.service.GetAllPub,
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
                "data": "AchieveName",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "TransferUnitName",
                'orderable': false,
                "className": "text-center",
            },
            {
                "data": "AssigneeUnitName",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "ContractBeginDate",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    if (full.ContractBeginDate==null && full.ContractEndDate!=null) {
                        return full.ContractEndDate.split(' ')[0];                        ;
                    }
                    if (full.ContractEndDate == null && full.ContractBeginDate != null) {
                        if (full.PubPermanent == 1)
                        {
                            return full.ContractBeginDate.split(' ')[0] + "-" + "永久";
                        }
                        return full.ContractBeginDate.split(' ')[0] + "-" + "?";
                    }
                    if (full.ContractEndDate == null && full.ContractBeginDate == null) {
                        return null;
                    }
                    if (full.ContractEndDate != null && full.ContractBeginDate != null) {
                        return full.ContractBeginDate.split(' ')[0] + "-" + full.ContractEndDate.split(' ')[0];
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
});
