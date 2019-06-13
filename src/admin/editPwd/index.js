/**
 * Created by zhujianlin on 2017/5/21.
 */

$(function () {
    Util.pageinit();//初始化页面
    $("#username").html(user.LoginName);

    //提交按钮的点击事件
    $("#submit").on("click", function (e) {
        e.preventDefault()//该方法将通知 Web 浏览器不要执行与事件关联的默认动作（如果存在这样的动作）
        var json = $("#passwordForm").serializeJson();
        if(!json.password){
            Util.warning("show","请输入旧密码");
            return ;
        }else if(!json.newPassword){
            Util.warning("show","请输入新密码");
            return ;
        }else if(!json.newPassword1){
            Util.warning("show","请输入确认新密码");
            return ;
        }
        json.userID = Util.getUserId();
        $.ajax({
            url: Util.service.ResetPassword,
            type: 'POST',
            data:json,
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                console.info(data)
                if (data.success === 1) {
                    Util.success('show', '操作成功');
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

    $("#password").on('blur', function () {
        $.ajax({
            url: Util.service.PassWordRepeat,
            type: 'POST',
            data:{
                "LoginName": user.LoginName,
                "Name": user.Name,
                "Password": $("#password").val(),
                "VisitID": hbVisitID
            },
            beforeSend: function () {
                //Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                console.info(data)
                if (data.success === 1) {
                    Util.error('show', data.message);
                }else{
                    //Util.error('show', data.message);
                }
            },
            error: function () {
                console.error("系统错误")
                Util.pageinit();
            }
        });
    })

    $("[name=newPassword1]").on('blur', function () {
        if( $(this).val() != $("[name=newPassword]").val() ){
            Util.error('show', "新密码与确认新密码不符！"); 
        }
    })

})
