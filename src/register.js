/**
 * Created by zhujianlin on 2017/5/30.
 */

$(function () {
    Util.pageinit();

    var status = 0;

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

    //手机号验证
    $.validator.addMethod("mobile", function (value, element) {
        return /^1[3|4|5|7|8][0-9]{9}$/.test(value);
    }, "请正确输入有效的手机号");

    $("[name=type]").on("change",function(){
        status = $(this).val();
        if($(this).val() == 1){
            $("#registerName").find("label").text("单位名称");
            $("#registerName").find("[name=name]").attr("placeholder", "单位名称");
            $("#Dep").show();
            $("#LinkMan").show();
            $("#registerEm").html("* 请使用单位全称！");
            //var insertHtml = '<div class="form-group">';
            //insertHtml += '<label class="col-md-3 control-label">单位性质</label>';
            ////insertHtml += '<input type="text" name="properties"  class="form-control" placeholder="单位性质" required>';
            //insertHtml += '<select class="form-control" name="properties" id="properties" style="width:200px;" required>';
            //insertHtml += '<option value="0">请选择</option>';
            //insertHtml += '<option value="1">高校</option>';
            //insertHtml += '<option value="2">企业</option>';
            //insertHtml += '<option value="3">科研单位</option>';
            //insertHtml += '</select>';
            //insertHtml += '<em style="float:right;margin-top:-25px;margin-right:187px;">*</em>';
            //insertHtml += '</div>';
            //$("#registerName").after(insertHtml);
            //if ($('#properties option:first').val()=="0") {
            //    $('#properties option:first').val("")
            //}
        } else {
            $("#Dep").hide();
            $("#LinkMan").hide();
            $("#registerName").find("label").text("姓名");
            $("#registerName").find("[name=name]").attr("placeholder", "姓名");
            $("#registerEm").html("*");
        }
    });

    var saveEmail;  //保存已注册的邮箱
    //单位名称验证
    $("#registerName").find("[name=name]").on("blur", function() {
        if(status == 1 && $(this).val() != "") {
            $.ajax({
                url: Util.service.DptNameRepeat,
                type: 'POST',
                data: { "DptName": $(this).val() },
                beforeSend: function () {
                    Util.pageLoading();
                },
                success: function (data) {
                    Util.pageinit();
                    console.log(data);

                    var info = JSON.parse(data.resultData);
                    if (data.success === 1) {
                        //Util.success("show", data.message);
                    }else if( data.success === 2) {
                        saveEmail = info[0].LoginName;
                        var a = Util.confirm(info[0].Name+"已注册，注册邮箱为："+ info[0].LoginName + "，是否直接跳转至登录页？");
                        //console.log(a);
                    }else if( data.success === 0 ) {
                        Util.success("show", data.message);
                    }
                },

                error: function () {
                    console.error("系统错误");
                    Util.pageinit();
                }
            });
        }
        
    })

    //单位名称重复点击确认跳转按钮
    $("#confirmModal .modal-footer").on('click', function(e) {
        //console.log(e.target.innerHTML);
        if(e.target.innerHTML == "确定") {
            //window.location.reload();
            window.location.href = "./index.html";
        }
    })


    $("#registerBtn").on("click",function(e){
        e.preventDefault();//不执行默认动作 submit
    
        if(!$("#registerForm").valid()){

            return ;
        }

        var json = $("#registerForm").serializeJson();
        var s = $("#properties").val();
        if (s == undefined) {
            json.properties = "";
        }
        json.VisitID = hbVisitID;
        //知识产权编号
        $.ajax({
            url: Util.service.RegisterNewUser,
            type: 'POST',
            data:json,
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                if (data.success === 1) {
                    Util.success("show", "恭喜您注册成功,请前往首页登录！并上传相关证件！5秒后自动跳转");

                    //转为对象格式存储到localStorage里（长期存储）
                    data.resultData = JSON.parse(data.resultData);
                    Util.setUserLogin(data.resultData);

                    setTimeout(function(){
                        window.location.href="/index.html"
                    },5000)
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
