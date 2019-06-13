/**
 * Created by zhujianlin on 2017/5/21.
 */

$(function(){
    Util.pageinit();
    var id = Util.getUrlParam("id");
    var type = Util.getUrlParam("type");
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
            "url": type ? type == 1 ? Util.service.GetAllSelfRecommendAchievement:Util.service.GetAllIntelligentMathAchievementByRequirID:Util.service.GetAllIntelligentMathAchievementByUserID,
            "type": "POST",
            "dataSrc": "data",
            "dataType": "json",
            "data": function (v) {
                if(type){
                    v.requireID = id;
                }else{
                    v.userID = Util.getUserId();
                }
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
                "data": "RequireName",
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
                    return '<a href="/achievementinfo.html?id='+(full.AchID || data)+'" target="_blank">[查看]</a>';
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
