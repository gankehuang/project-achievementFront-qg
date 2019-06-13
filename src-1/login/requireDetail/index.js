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

                    if(data.resultData.UserID == Util.getUserId()){
                        $("#recommendSelf").parent().hide();
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




        if(Util.getUserId()){
            $.ajax({
                url: Util.service.GetAllApproveAchievementByUserID,
                type: 'POST',
                data:{userID:Util.getUserId()},
                success: function (data) {
                    Util.pageinit();
                    if (data.success === 1) {
                        data.resultData = JSON.parse(data.resultData);
                        var html = '<option value="">请选择</option>';
                        for(var i in data.resultData){
                            html += '<option value="'+data.resultData[i].AchID+'">'+data.resultData[i].AchieveName+'</option>';
                        }

                        $("#recommendSelf").html(html);
                    }else{
                        console.error("系统错误");
                    }
                }
            });
        }



    }());



    $("#btn-recommend").on("click",function () {
        var achID = $("#recommendSelf").val();
        if(!achID){
            Util.warning("show","请选择一个成果！")
            return;
        }

        $.ajax({
            url: Util.service.SelfRecommend,
            type: 'POST',
            data:{userID:Util.getUserId(),requireID:id,achID:achID},
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                if (data.success === 1) {
                    Util.success("show","您已自荐成功！");
                    $("#recommendSelf").parent().hide();
                }else{
                    console.error("系统错误");
                    Util.error("show",data.message)
                }
            },
            error: function () {
                console.error("系统错误");
                Util.pageinit();
            }
        });


    })
});
