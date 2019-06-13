/**
 * Created by zhujianlin on 2017/5/21.
 */

$(function(){
    Util.pageinit();
    var RetrievalInfo = {};

    //时间选择
    $(".datetimepicker").datetimepicker({
        format: 'YYYY-MM-DD',
        dayViewHeaderFormat: 'YYYY-MM',
        useCurrent: false,
        sideBySide: true
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
            "url": Util.service.GetAllRequireByUserID,
            "type": "POST",
            "dataSrc": "data",
            "dataType": "json",
            "data": function (v) {
                v.userID = Util.getUserId();
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
                "className": "text-center"
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
                "render": function (data, type, full) {
                    return '<a href="../resultCommand/index.html?id='+data+'&type=1&name='+full.RequireName+'">查看</a>';
                }
            },
            {
                "data": "ID",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    return '<a href="../resultCommand/index.html?id='+data+'&type=2&name='+full.RequireName+'">查看</a>';
                }
            },
            {
                "data": "ID",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    return [
                        '<a href="/login/requireDetail/index.html?id='+data+'" rel="tooltip"  class="table-action like" href="javascript:void(0)" title="查看" target="_blank">',
                        '<i class="glyphicon glyphicon-list"></i>',
                        '</a>&nbsp;',
                        '<a rel="tooltip"  class="table-action edit" href="/login/invoice/index.html?id='+data+'" title="修改">',
                        '<i class="fa fa-edit"></i>',
                        '</a>&nbsp;',
                        '&nbsp;<a rel="tooltip"  class="table-action remove" href="javascript:void(0)" data-id="'+data+'" title="删除">',
                        '<i class="fa fa-trash-o"></i>',
                        '</a>'
                    ].join('');
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



    //删除
    $("#dataTable").on("click",".remove",function(e){
        e.preventDefault();
        var id = $(this).data("id");
        console.info(id);
        Util.confirm("请确认删除该需求",function(){
            $.ajax({
                url: Util.service.DeleteRequirement,
                type: 'POST',
                data:{"requireID":id},
                beforeSend: function () {
                    Util.pageLoading();
                },
                success: function (data) {
                    Util.pageinit();
                    console.info(data)
                    if (data.success === 1) {
                        Util.success('show', '操作成功');
                        drawTable.draw(false);
                    }else{
                        Util.error('show', data.message);
                    }
                },
                error: function () {
                    console.error("系统错误")
                    Util.pageinit();
                }
            });
        })
    })


})
