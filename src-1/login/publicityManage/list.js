/**
 * Created by wangyinping on 2017/5/22.
 */

$(function(){
    Util.pageinit();

    //时间选择
    $(".datetimepicker").datetimepicker({
        format: 'YYYY-MM-DD',
        dayViewHeaderFormat: 'YYYY-MM',
        useCurrent: false,
        sideBySide: true
    });

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
            "url": Util.service.GetPublicityList,
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
                "data": "ContractAmount",
                'orderable': false,
                "className": "text-center",
                "render": function(data, type, full){
                    if(full.LastContractAmount){
                        return full.LastContractAmount;
                    }
                    else{
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
                "className": "text-left",
                "render": function (data,type, full) {
                    var html = '<a href="/PublicityDetail.html?id='+data+'" title="查看" target="_blank"><i class="glyphicon glyphicon-list"></i></a>&nbsp;&nbsp;';
                    if(full.Status != 1 && full.Status != 4){
                        if(full.type == 1){
                            html +=  '<a href="editall.html?id='+data+'" title="修改"><i class="fa fa-edit"></i></a>&nbsp;&nbsp;';
                        }
                        else{
                            html +=  '<a href="edit.html?id='+data+'" title="修改"><i class="fa fa-edit"></i></a>&nbsp;&nbsp;';
                        }
                    }
                    if(full.Status == 0 || full.Status == 5 || (full.type==1 && (full.Status==3 || full.Status==6))){
                        html += '<a class="detail-remove" href="javascript:void(0);" title="删除" data-id="'+data+'"><i class="fa fa-trash-o"></i></a>';
                    }
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

    //获取归属省
    getBasicInfo(Util.service.GetAllProvince, ".ContractRegisterProvince", "请选择");

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

    //成果删除
    $("#dataTable").on("click",".detail-remove",function(e){
        e.preventDefault();
        var id = $(this).attr("data-id");
        if (confirm("确认删除吗？"))
        {
            $.ajax({
                url: Util.service.DeletePublicity,
                type: 'POST',
                data: { "PublicityID": id },
                beforeSend: function () {
                    Util.pageLoading();
                },
                success: function (data) {
                    Util.pageinit();
                    if (data.success === 1) {
                        Util.success("show", "操作成功");
                        drawTable.draw(false)
                    } else {
                        Util.error("show", data.message);
                    }
                },
                error: function () {
                    console.error("系统错误")
                    Util.error("show", "系统错误");
                    Util.pageinit();
                }
            });
        }
        
    });

    // 合同填写弹窗
    // $('#dataTable').on('click', '.btnAddContract', function(e){
    //     e.preventDefault();
    //     var id = $(this).attr("data-id");
    //     var name = $(this).attr('data-name');
    //     var status = $(this).attr('data-status');
    //     $('#modal_contract').attr('data-id', id);
    //     $('#modal_contract .achivement-name').text(name);
    //     initCantractInfo(status,id);
    // });

    // 提交合同信息
    // $('#modal_contract').on('click', '.submit', function(e){
    //     e.preventDefault();
    //     if (!$("#form_contract").valid()) {
    //         return ;
    //     }
    //     var form_data = $('#form_contract').serializeJson();
        
    //     // 发送请求
    //     $.ajax({
    //         url: Util.service.AddNewNotice,
    //         type: 'POST',
    //         data: {
    //             'PublicityID': $('#modal_contract').attr('data-id'),
    //             'jsonStr': JSON.stringify(form_data)
    //         },
    //         beforeSend: function () {
    //             Util.pageLoading();
    //         },
    //         success: function (data) {
    //             Util.pageinit();
    //             if (data.success === 1) {
    //                    Util.success("show","保存成功，该公示已转为公告，可在公告管理中查看", function(){
    //                         $('#modal_contract').modal('hide');
    //                         drawTable.draw(false)
    //                    });
    //             } else {
    //                 Util.error("show",data.message);
    //             }
    //         },
    //         error: function () {
    //             //服务器错误
    //             Util.pageinit();
    //             Util.error("show","服务器错误")
    //         }
    //     });
    // });


    //汉化默认提示
    $.extend($.validator.messages, {
        required: "此项为必填字段",
        remote: "填写错误，请修正",
        email: "请输入正确的电子邮件地址",
        url: "请输入正确的URL地址",
        date: "请输入日期",
        dateISO: "请输入日期（ISO）",
        number: "请输入数字",
        digits: "请输入整数",
        creditcard: "请输入正确的信用卡号",
        equalTo: "请再次输入相同的值",
        maxlength: $.validator.format("请输入一个长度最多是 {0} 的字符串"),
        minlength: $.validator.format("请输入一个长度最少是 {0} 的字符串"),
        rangelength: $.validator.format("请输入一个长度介于 {0} 和 {1} 之间的字符串"),
        range: $.validator.format("请输入大小在 {0}-{1} 范围内的值"),
        max: $.validator.format("请输入一个最大为 {0} 的值"),
        min: $.validator.format("请输入一个最小为 {0} 的值")
    });
});



/************************************************FUNCTION****************************************/
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

// 初始化合同弹窗信息
// function initCantractInfo(status, id){
//     if(status == 2){
//         $('#modal_contract [name=ContractNumber]').val('');
//         $('#modal_contract [name=ContractRegisterProvince]').val('');
//         $('#modal_contract [name=ContractRegisterAgency]').val('');
//         $('#modal_contract [name=ContractRegisterDate]').val('');
//         $('#modal_contract [name=ContractSigningDate]').val('');
//         $('#modal_contract [name=ContractBeginDate]').val('');
//         $('#modal_contract [name=ContractEndDate]').val('');
//     }
//     else if(status == 3){
//         $.ajax({
//             url: Util.service.GetPublicityDetail,
//             type: 'POST',
//             data: { "PublicityID": id },
//             beforeSend: function () {
//                 Util.pageLoading();
//             },
//             success: function (data) {
//                 Util.pageinit();
//                 if (data.success === 1) {
//                     data.resultData = JSON.parse(data.resultData);
//                     $("#modal_contract").formFieldValues(data.resultData);
//                 } else {
//                     console.error("系统错误");
//                     Util.error("show",data.message);
//                 }
//             },
//             error: function () {
//                 console.error("系统错误");
//                 Util.pageinit();
//             }
//         });
//     }
// }