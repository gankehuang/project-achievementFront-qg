/**
 * Created by zhujianlin on 2017/5/21.
 */

$(function () {
    var loginData = Util.getUserLoginData();
    if (loginData != null) {
        if (loginData.IsAdmin != 1) {
            location.href = "/login/index/index.html";
        }
    }

    //table:初始化列表
    function tableDraw() {
        $.ajax({
            url: Util.service.GetCompeteListRealTime,
            type: 'POST',
            beforeSend: function () {

            },
            success: function (data) {
                Util.pageinit();
                if (data.success === 1) {
                    data.resultData = JSON.parse(data.resultData);
                    $("#tbodyContent").html(template("myTemplate", data));
                }
            },
            error: function () {
                Util.pageinit();
            }
        });
    }

    tableDraw();

    setInterval(function(){
        tableDraw();
    },30000)

})
