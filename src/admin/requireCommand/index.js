/**
 * Created by zhujianlin on 2017/5/21.
 */

$(function(){
    Util.pageinit();
    var id = Util.getUrlParam("id");
    var name = Util.getUrlParam("name");

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
            "url": id?Util.service.GetAllIntelligentMathRequirementByAchID:Util.service.GetAllIntelligentMathRequirementByUserID,
            "type": "POST",
            "dataSrc": "data",
            "dataType": "json",
            "data": function (v) {
                if(id){
                    v.achID = id;
                }else{
                    v.userID = Util.getUserId();
                    
                }
                v.VisitID = manageVisitID;
                return v;
            }
        }, "columns": [
            {
                "data": "ID",
                "className": "text-center",
                'orderable': false
            },
            {
                "data": "RequireName",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "TechType",
                'orderable': false,
                "className": "text-center",
            },
            {
                "data": "Creator",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "CreatDate",
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
                    return name;
                }
            },
            {
                "data": "ID",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    return '<a href="/login/requireDetail/index.html?id='+data+'">[查看]</a>';
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
