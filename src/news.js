/**
 * Created by xll on 2017/6/1.
 */

$(function () {
    //table:³õÊ¼»¯ÁÐ±í
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
            "url": Util.service.GetAllNews,
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
                "data": "NewsTitle",
                'orderable': false,
                "className": "text-left",
                "render": function (data, type, full) {
                    
                    if (full.NewsTag == ""||full.NewsTag==null) {
                        return '<a href="newsinfo.html?id=' + full.ID + '">' + "[" +"notype"+"]" + full.NewsTitle + '</a>';
                    } 
                    else { 
                        if(full.NewsTitle == "首届全国种公牛拍卖") {   
                            return '<a href="newsinfoZD.html">' + "[" + full.NewsTag + "]" + full.NewsTitle + '</a>';
                        }else{
                            return '<a href="newsinfo.html?id=' + full.ID + '">' + "[" + full.NewsTag + "]" + full.NewsTitle + '</a>';
                        }
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



