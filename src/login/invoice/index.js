/**
 * Created by wangyinping on 2017/5/22.
 */

$(function(){
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
    var id = Util.getUrlParam("id");
    $('#myTab li:eq(0) a').tab('show');

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

    //时间选择
    $(".datetimepicker").datetimepicker({
        format: 'YYYY-MM-DD',
        dayViewHeaderFormat: 'YYYY-MM',
        useCurrent: false,
        sideBySide: true
    });

    //下一步
    $('.btn-next').on('click', function (e) {
        e.preventDefault();

        if (!$("#homeForm").valid()) {
            // return ;
        } else {
            $('#myTab li:eq(1) a').tab('show');
        }
    });

    //返回
    $('.btn-back').on('click', function (e) {
        e.preventDefault();
        $('#myTab li:eq(0) a').tab('show');
    });



    /*--begin基本信息获取*/
    function getBasicInfo(urlInfo, selectELe, defaultOption,parentID,value) {
        var key = new Date().getTime();
        isInitOver[key] = false;
        $.ajax({
            url: urlInfo,
            type: 'POST',
            data: { parentID: parentID },
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                if (data.success === 1) {
                    var resultData = JSON.parse(data.resultData);
                    Util.getSelectData(selectELe, resultData, defaultOption, value);
                    isInitOver[key] = true;
                    getAchDetail();
                }
            },
            error: function () {
                Util.pageinit();
            }
        });
    }

    //定义初始化接口是否完成请求
    var isInitOver = {};

    //获取所有技术水平
    getBasicInfo(Util.service.GetAllTechLeval, "#TechLevel", "请选择");
    //获取所有技术成熟度
    getBasicInfo(Util.service.GetAllMaturity, "#Maturity", "请选择");

    //获取所有技术类型
    getBasicInfo(Util.service.GetAllTechType, "#TechTypeID", "请选择");


    (function () {
        var key = new Date().getTime();
        isInitOver[key] = false;
        //所属领域
        $.ajax({
            url: Util.service.GetAllOwnerField,
            type: 'POST',
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                if (data.success === 1) {
                    data.resultData = JSON.parse(data.resultData)
                    $("#OwnerFieldsSelect").html(template("template", data));
                    isInitOver[key] = true;
                    getAchDetail();
                }else{
                    console.error("系统错误")
                }
            },
            error: function () {
                console.error("系统错误")
                Util.pageinit();
            }
        });
    }())



    //编辑成果 数据回显
    function getAchDetail() {
        if (!id) {
            return;
        }
        var over = false;
        console.info(isInitOver)
        for (var key in isInitOver) {
            if (!isInitOver[key]) {
                over = true;
                break;
            }
        }

        if (!over) {
            console.info("init")
            $.ajax({
                url: Util.service.GetRequirementByRequireID,
                type: 'POST',
                data: { "requireID": id },
                beforeSend: function () {
                    Util.pageLoading();
                },
                success: function (data) {
                    Util.pageinit();
                    if (data.success === 1) {
                        data.resultData = JSON.parse(data.resultData);

                        $("#myTabContent").formFieldValues(data.resultData);

                        if(data.resultData.RequireDesc){
                            $("#wordFrame").show();
                            var iframe = document.getElementById("wordFrame").contentDocument || document.frames["wordFrame"].document;
                            iframe.body.innerHTML = data.resultData.RequireDesc;
                            var height = iframe.documentElement.scrollHeight || iframe.body.scrollHeight;
                            $("#wordFrame").css("height", height + 20);
                        }


                    } else {
                        console.error("系统错误");
                    }
                },
                error: function () {
                    console.error("系统错误");
                    Util.pageinit();
                }
            });

        }

    }





    $(".btn-save").on('click', function (e) {
        e.preventDefault();
        if (!$("#unitForm").valid()) {
            return ;
        }
        var form1 = $('#homeForm').serializeJson();
        var form2 = $('#unitForm').serializeJson();
        var dataJson = $.extend({},form1, form2,{ "UserID": Util.getUserId() });
        console.info(dataJson);
        $.ajax({
            url: Util.service.AddNewRequire,
            type: 'POST',
            data: { jsonStr: JSON.stringify(dataJson),"requireID":id, "VisitID": manageVisitID },
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                if (data.success === 1) {
                    Util.success("show","发布成功");
                    window.location.href = "../requireMain/index.html";
                } else {
                    Util.error("show",data.message);
                }
            },
            error: function () {
                Util.error("show","服务器错误");
                //服务器错误
                Util.pageinit();
            }
        });
    });




    //word上传
    $('#wordUpload').fileupload({
        url: Util.service.UploadWordNeed,
        limitMultiFileUploadSize: 5000000,
        limitMultiFileUploads: 1,
        maxFileSize: 5000000,
        minFileSize: 1,
        add: function (e, data) {
            //上传前处理
            $('.progress-bar').css('width', 0 + '%');
            $("#uploadProgressModal").modal("show");
            data.submit();
        },
        done: function (e, data) {
            var data = data.result;
            //上传完成处理返回值
            if (data.success) {
                $("#wordFrame").show();
                var iframe = document.getElementById("wordFrame").contentDocument || document.frames["wordFrame"].document;
                iframe.body.innerHTML = data.resultData;
                $("#RequireDesc").val(data.resultData);
                var height = iframe.documentElement.scrollHeight || iframe.body.scrollHeight;
                $("#wordFrame").css("height", height + 20);
            } else {
                Util.error("show", data.message);
            }
            $('.progress-bar').css('width', '100%');
            $("#uploadProgressModal").modal("hide");

        },
        progressall: function (e, data) {
            $("#uploadProgress").show();
            //设置上传进度事件的回调函数，更新进度条
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('.progress-bar').css('width', progress + '%');
        }
    });


    $("input[name=Phone]").on('blur', function () {   
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test($(this).val())) {
            //return false;
            Util.warning("show", "请输入正确的11位手机号！");
            $(this).val("");
        }
    })



    

});
