/**
 * Created by wangyinping on 2017/5/22.
 */

$(function(){
    Util.pageinit();
    var id = Util.getUrlParam("id");
    $('#myTab li:eq(0) a').tab('show');

    //初始化动态加载数据
    (function(){
        $.ajax({
            url: Util.service.GetRequirementByRequireID,
            type: 'POST',
            data:{requireID:id},
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                console.info(data);
                if (data.success === 1) {
                    data.resultData = JSON.parse(data.resultData);
                    $("#myTabContent").html(template("myTemplate", data.resultData));

                    if(data.resultData.RequireDesc){
                        $("#wordFrame").show();
                        var iframe = document.getElementById("wordFrame").contentDocument || document.frames["wordFrame"].document;
                        iframe.body.innerHTML = data.resultData.RequireDesc;
                        var height = iframe.documentElement.scrollHeight || iframe.body.scrollHeight;
                        $("#wordFrame").css("height", height + 20);
                    }


                }else{
                    console.error("系统错误");
                }
            },
            error: function () {
                console.error("系统错误");
                Util.pageinit();
            }
        });
    }());

});
