/**
 * Created by wangyinping on 2017/5/28.
 */

$(function () {
    Util.pageinit();

    $('#myTab li:eq(0) a').tab('show');

    //初始化动态加载数据
    (function(){
        $.ajax({
            url: Util.service.GetAllData,
            type: 'POST',
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                console.info(data)
                if (data.success === 1) {
                    $("#myTabContent").html(template("myTemplate", data.resultData));
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

});
