/**
 * Created by zhujianlin on 2017/5/21.
 */

$(function () {
    Util.pageinit();

    //个人信息
    $.ajax({
        url: Util.service.GetUserInfo,
        type: 'POST',
        data: { LoginName: getQueryString('logname') },
        beforeSend: function () {
            Util.pageLoading();
        },
        success: function (data) {
            Util.pageinit();
            console.info("个人信息：" + data.resultData)
            if (data.success === 1) {
                data.resultData = JSON.parse(data.resultData);
                $("#personForm").formFieldValues(data.resultData);

                if (data.resultData.IDCard) {
                    $('.col-corporate').text('身份证扫描件');

                    //var ImageVideo = JSON.parse(data.resultData).IDCardScanCopy ? JSON.parse(data.resultData).IDCardScanCopy.split(",") : [];
                    //var imgHtml = '';
                    //var imgHtml3 = '';
                    //for(var i in ImageVideo){
                    //    imgHtml = '<img src="' + ImageVideo[0] + '"  class="img-responsive"/>';
                    //    imgHtml3 = '<img src="' + ImageVideo[1] + '"  class="img-responsive"/>';
                    //}
                    //$("#imgBoxs").html(imgHtml);
                    //$("#imgBoxs2").html(imgHtml3);

                    var ImageVideo2 = data.resultData.IDCardScanCopy.split(",");
                    console.log(ImageVideo2)
                    var imgHtml2 = '';
                    for (var j in ImageVideo2) {
                        imgHtml2 += '<img src="' + ImageVideo2[j] + '"  class="img-responsive"/>';
                    }
                    $("#imgBoxs").html(imgHtml2);
                }

                else if (data.resultData.CorporateNumber) {
                    $('.col-corporate').text('法人证书扫描件');
                    var ImageVideo2 = data.resultData.CorporateScanCopy.split(",");
                    var imgHtml2 = '';
                    for (var j in ImageVideo2) {
                        imgHtml2 += '<img src="' + ImageVideo2[j] + '"  class="img-responsive"/>';
                    }
                    $("#imgBoxs").html(imgHtml2);
                }
            } else {

                Util.error("show", data.message);
            }
        },
        error: function () {
            //服务器错误
            Util.pageinit();
            Util.error("show", "服务器错误");
        }
    });

    // 获取url中的参数
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }

});
