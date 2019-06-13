/**
 * Created by xll on 2018/03/07
 */
$(function () {
    var id = Util.getUrlParam("id");
    var creatorId = '';

    (function () {
        if (id) {
            $.ajax({
                url: Util.service.GetNewsByAchIDYK,
                type: 'POST',
                data: { "achID": id },
                beforeSend: function () {
                    Util.pageLoading();
                },
                success: function (data) {
                    Util.pageinit();
                    console.info(data);
                    if (data.success === 1) {
                        data.resultData = JSON.parse(data.resultData);
                        var news = JSON.parse(data.resultData.News);
                        var d = new Date();
                        d = news.CreateDate;
                        var index = d.lastIndexOf(" ");
                        d = d.substring(0, index);
                        d = d.replace(new RegExp('/', 'gm'), '-');//斜杠‘/’替换成‘-’
                        //完成赋值  
                        news.CreateDate = d;
                        //新闻标题
                        $("#Title").html(news.Title);
                        //新闻发布人与发布时间
                        $("#mainMessage").html(template("mainTemplate", news));

                        var ImageVideo = JSON.parse(data.resultData.ImageVideo);
                        var uploadList = [];
                        var dataupload = {};
                        //图片新闻的图片
                        //if (news.IsPicNews == 1) {
                        //    //图片
                        //    var ImageVideo = JSON.parse(data.resultData.ImageVideo);
                        //    //var imgHtml = ''
                        //    var mainimgList = [];
                        //    for (var i in ImageVideo) {
                        //        if (ImageVideo[i].type == '0') {
                        //            mainimgList.push({ Url: ImageVideo[i].url, ID: ImageVideo[i].id });
                        //        }
                        //    }

                        //    var data = {};
                        //    data.resultData = mainimgList;
                        //    $("#imgBoxs1").html(template("imgTpl", data));
                        //}
                        //新闻简介
                        if (news.Desc) {
                            $("#wordFrame").show();
                            var iframe = document.getElementById("wordFrame").contentDocument || document.frames["wordFrame"].document;
                            iframe.body.innerHTML = news.Desc;
                            var height = iframe.documentElement.scrollHeight || iframe.body.scrollHeight;
                            $("#wordFrame").css("height", height + 20);
                        }
                        //相关附件
                        for (var i in ImageVideo) {
                            if (ImageVideo[i].type == '3') {
                                var namenews = ImageVideo[i].name;
                                var file_name = namenews.substring(namenews.lastIndexOf("_") + 1);
                                uploadList.push({ Url: ImageVideo[i].url, ID: ImageVideo[i].id, Name: file_name });
                            }
                        }
                        dataupload.resultData = uploadList;
                        $("#AboutUploadFile").html(template("AboutUploadFileTemplate", dataupload));

                        //为iframe中内嵌的网页链接重新打开一个tab
                        $(window.frames["wordFrame"].document).find("a").attr('target', '_blank')

                    } else {
                        console.error("系统错误");
                    }
                },
                error: function () {
                    console.error("系统错误");
                    Util.pageinit();
                }
            });
        } else {
            Util.error("show", "参数错误")
        }
    }())

})
