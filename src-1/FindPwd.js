/**
 * Created  on 2017/11/20.
 */

$(function () {
    Util.pageinit();


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
        return /^1\d{10}$/.test(value);
    }, "请正确输入有效的手机号");

    $("[name=type]").on("change", function () {
        if ($(this).val() == 1) {
            $("#registerName").find("label").text("单位名称");
            $("#registerName").find("[name=name]").attr("placeholder", "单位名称");
        } else {
            $("#registerName").find("label").text("姓名");
            $("#registerName").find("[name=name]").attr("placeholder", "姓名");
        }
    });

        $("#findpwdBtn").on("click", function (e) {
        e.preventDefault();
        if (!$("#findpwdForm").valid()) {

            return;
        }

        var json = $("#findpwdForm").serializeJson();
       
        $.ajax({
            url: Util.service.ForgetPwdMail,
            type: 'POST',
            data: json,
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                //Util.pageinit();
                //console.info(data);
                if (data.success === 1) {
                    Util.success("show", "已发送邮件！3秒后自动跳转");
                    setTimeout(function () {
                        window.location.href = "/index.html"
                    }, 3000)
                } else {
                    Util.warning("show", data.message);
                }
            },

            error: function () {
                console.error("系统错误");
                Util.pageinit();
            }
        });



    });
})
