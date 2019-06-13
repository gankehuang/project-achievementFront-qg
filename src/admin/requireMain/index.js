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
            "url": Util.service.GetAllRequire,
            "type": "POST",
            "dataSrc": "data",
            "dataType": "json",
            "data": function (v) {
                v.userID = Util.getUserId();
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
                "className": "text-center"
            },
            {
                "data": "Creator",
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
                    return '<a href="/admin/resultCommand/index.html?id='+data+'&type=1&name='+full.RequireName+'"  target="_blank">查看</a>';
                }
            },
            {
                "data": "ID",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    return '<a href="/admin/resultCommand/index.html?id='+data+'&type=2&name='+full.RequireName+'"  target="_blank">查看</a>';
                }
            }


        ],
        "fnDrawCallback": function (oSettings) {
            for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
                $('td:eq(0)', oSettings.aoData[oSettings.aiDisplay[i]].nTr).html( (oSettings._iDisplayStart + i + 1));
            }

        }


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
