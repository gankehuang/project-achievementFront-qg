/**
 * Created by zhujianlin on 2017/5/30.
 */

$(function () {
    Util.pageinit();

    //未审核时不能操作
    var loginData = Util.getUserLoginData();

    if (loginData.Type == 0 && !loginData.IDCard) {
        Util.warning("show", "请先进行身份认证！", function () {
            window.location.href = "/login/baseInfor/index.html";
        });
        return;
    } else if (loginData.Type == 1 && !loginData.CorporateNumber) {
        Util.warning("show", "请先进行身份认证！", function () {
            window.location.href = "/login/baseInfor/index.html";
        });
        return;
    } else if (loginData.IsApprove == 1) {
    } else if ((loginData.IDCard || loginData.CorporateNumber) && loginData.IsApprove == 0) {
        Util.warning("show", "身份认证审核中……，请稍后再试！", function () {
            window.location.href = "/login/baseInfor/index.html";
        });
        return;
    } else {
        Util.warning("show", "系统异常！");
        return;
    }

    var RetrievalInfo = {};
    $("#userid").val(Util.getUserId());

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
            "url": Util.service.GetAllSubUser,
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
                "data": "LoginName",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "Name",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "Password",
                'orderable': false,
                "className": "text-center"
            },
            {
                "data": "Phone",
                'orderable': false,
                "className": "text-center"
            },
             {
                 "data": "LoginName",
                 'orderable': false,
                 "className": "text-center",
                 "render": function (data, type, full) {
                     var html = '<a href="detail.html?logname=' + data + '" title="详情" target="_blank"><i class="glyphicon glyphicon-list"></i></a>&nbsp;&nbsp;'
                     return html;
                 }
             },
            {
                "data": "ID",
                'orderable': false,
                "className": "text-center",
                "render": function (data, type, full) {
                    return [
                        '<a rel="tooltip"  class="table-action email" href="javascript:void(0)" data-mail="'+full.LoginName+'" data-password="'+full.Password+'" title="发送邮件">',
                        '<i class="fa fa-envelope-o"></i>',
                        '</a>',
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

    //发送邮件
    $("#dataTable").on("click",".email",function(e){
        e.preventDefault();
        var mail = $(this).data("mail");
        var password = $(this).data("password");
        $.ajax({
            url: Util.service.SendMail,
            type: 'POST',
            data:{
                "mail":mail,
                "password":password
            },
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                console.info(data)
                if (data.success === 1) {
                    Util.success('show', '发送成功！');
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

    //删除
    $("#dataTable").on("click",".remove",function(e){
        e.preventDefault();
        var id = $(this).data("id");
        console.info(id);
        Util.confirm("请确认删除该需求",function(){
            $.ajax({
                url: Util.service.DelUser,
                type: 'POST',
                data:{"userid":id},
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
        maxlength: $.validator.format("请输入一个长度最多是 {0} 的字符串"),
        minlength: $.validator.format("请输入一个长度最少是 {0} 的字符串"),
        rangelength: $.validator.format("请输入一个长度介于 {0} 和 {1} 之间的字符串"),
        range: $.validator.format("请输入大小在 {0}-{1} 范围内的值"),
        max: $.validator.format("请输入一个最大为 {0} 的值"),
        min: $.validator.format("请输入一个最小为 {0} 的值")
    });

    //手机号验证
    $.validator.addMethod("mobile", function (value, element) {
        return /^1\d{10}$/.test(value);
    }, "请正确输入有效的手机号");


    $("#registerBtn").on("click",function(e){
        e.preventDefault();
        if(!$("#registerForm").valid()){

            return ;
        }

        var json = $("#registerForm").serializeJson();
        json.VisitID = manageVisitID;
        $.ajax({
            url: Util.service.RegisterSubUser,
            type: 'POST',
            data:json,
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                console.info(data);
                if (data.success === 1) {
                    Util.success("show","保存成功！");
                    drawTable.draw();
                    data.resultData = JSON.parse(data.resultData);
                    console.log(data.resultData);
                }else{
                    Util.warning("show",data.message);
                }
            },

            error: function () {
                console.error("系统错误");
                Util.pageinit();
            }
        });



    })
})
