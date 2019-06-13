/**
 * Created by zhujianlin on 2017/5/21.
 */

$(function(){
    Util.pageinit();
    var id = Util.getUrlParam("id");
    var name = Util.getUrlParam("name");
    if(id && name){
        $("#breadcrumb").find("li:last").find("em").text("智能配对需求");

        $("#searchPanel").hide();
    }

    var RetrievalInfo = {};
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
                v.RetrievalInfo = JSON.stringify(RetrievalInfo);
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
                "data": "AchieveName",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    return name || data;
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



    /*--begin基本信息获取*/
    function getBasicInfo(urlInfo, selectELe, defaultOption,parentID,value) {
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

})
