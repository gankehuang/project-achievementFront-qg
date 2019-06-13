/**
 * Created by xiaolinlin on 2018/05/09.
 */

$(function () {
    var loginData = Util.getUserLoginData();
    if (loginData != null) {
        if (loginData.IsAdmin == 1) {
            location.href = "/admin/Backlog/index.html";
        }
    }

    //table:初始化列表
    function tableDraw() {
        $.ajax({
            url: Util.service.GetAllUnApproveCount,
            type: 'POST',
            data: { UserID: Util.getUserId() },
            beforeSend: function () {
                Util.pageLoading();
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
    function tableDraw1() {
        $.ajax({
            url: Util.service.GetAllUnApproveCountToday,
            type: 'POST',
            data: { UserID: Util.getUserId() },
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                if (data.success === 1) {
                    data.resultData = JSON.parse(data.resultData);
                    $("#tbodyContent1").html(template("myTemplate1", data));
                }
            },
            error: function () {
                Util.pageinit();
            }
        });
    }
    tableDraw();
    tableDraw1();
})
