/**
 * Created by XLL on 2018/03/06.
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
            "url": Util.service.GetAllNewsByUserID,
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
                "data": "ID",
                "className": "text-center",
                'orderable': false
            },
            {
                "data": "NewsTitle",
                'orderable': false,
                "className": "text-left"
            },
            {
                "data": "NewsTag",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "NewsFrom",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "Creater",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "CreateDate",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "IsPicNews",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    if (data == 0) {
                        return '否';
                    }
                    else if(data==1) {
                        return '是';
                    }
                    else {
                        return '数据状态有误！';
                    }
                }
            },
            {
                "data": "ID",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {

                    var html = '<a href="/newsinfo.html?id=' + data + '" title="预览" target="_blank">预览</a>&nbsp;&nbsp;&nbsp;'
                    html += '<a href="detail.html?id=' + data + '" title="查看">查看</a>&nbsp;&nbsp;&nbsp;<br/>'

                        html += '<a href="/login/NewsRelease/index.html?id=' + data + '" title="修改">修改</a>&nbsp;&nbsp;&nbsp;'
                        html += '<a class="detail-remove" href="javascript:void(0);" title="删除" data-id="' + data + '">删除</a>'
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

    /*--begin基本信息获取*/
    //function getBasicInfo(urlInfo, selectELe, defaultOption,parentID,value) {
    //    $.ajax({
    //        url: urlInfo,
    //        type: 'POST',
    //        data: { parentID: parentID },
    //        success: function (data) {
    //            Util.pageinit();
    //            if (data.success === 1) {
    //                var resultData = JSON.parse(data.resultData);
    //                Util.getSelectData(selectELe, resultData, defaultOption, value);
    //            }
    //        }
    //    });
    //}


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
    $("#dataTable").on("click", ".detail-remove", function (e) {
        e.preventDefault();
        var id = $(this).data("id");
        console.info(id);
        Util.confirm("请确认是否删除该新闻？",function(){
            $.ajax({
                url: Util.service.DeleteNews,
                type: 'POST',
                data: { "achID": id },
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
