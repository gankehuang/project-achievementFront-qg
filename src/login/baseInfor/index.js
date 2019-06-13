/**
 * Created by zhujianlin on 2017/5/21.
 */

$(function(){
    Util.pageinit();

    //汉化默认提示
    $.extend($.validator.messages, {
        required: "此项为必填字段",
        email: "请输入正确的电子邮件地址",
    });

    $('#myTab li:eq(0) a').tab('show');
    var loginData=Util.getUserLoginData();
    if(loginData.Type==1){
        $("#linkMan").css("display", "block");
    }


    if(loginData.Type==0 && !loginData.IDCard){
        $('#myTab li:eq(1) a').tab('show');
        $('.col-person').show();
    }else if(loginData.Type==1 && !loginData.CorporateNumber){
        $('#myTab li:eq(1) a').tab('show');
        $('.col-corporate').show();
    }else if(loginData.IDCard&&loginData.IsApprove==1){
        $('.btn-save').hide();
        $('.btn-group').hide();
        $('#certifyForm').find('input[type="text"]').attr("readonly","readonly");
        $('.col-person').show();
        $("#idCard").val(loginData.IDCard);
        $("#name").val(loginData.Name);
        var ImageVideo = loginData.IDCardScanCopy.split(",");
        var imgHtml = '';
        var imgHtml3 = '';
        for(var i in ImageVideo){
            imgHtml = '<img src="http://www.agrittex.com/' + ImageVideo[0] + '"  class="img-responsive"/>';
            imgHtml3 = '<img src="http://www.agrittex.com/' + ImageVideo[1] + '"  class="img-responsive"/>';
        }
        $("#imgBoxs").html(imgHtml);
        $("#imgBoxs2").html(imgHtml3);
    }else if(loginData.CorporateNumber&&loginData.IsApprove==1){
        $('.btn-save').hide();
        $('.btn-group').hide();
        $('#certifyForm').find('input[type="text"]').attr("readonly","readonly");
        $('.col-corporate').show();
        $("#corporateName").val(loginData.CorporateName);
        $("#corporateNumber").val(loginData.CorporateNumber);
        var ImageVideo2 = loginData.CorporateScanCopy.split(",");
        var imgHtml2 = '';
        for(var j in ImageVideo2){
            imgHtml2 += '<img src="http://www.agrittex.com/' + ImageVideo2[j] + '"  class="img-responsive"/>';
        }
        $("#imgBoxs").html(imgHtml2);
    }else if( (loginData.CorporateName||loginData.CorporateNumber) && loginData.IsApprove==0 && loginData.Type == 1 ){   //
        $('#myTab li:eq(1) a').tab('show');
        $('.col-corporate').show();

        var ImageVideo = loginData.CorporateScanCopy;
        var imgHtml = '<img src="http://www.agrittex.com/' + ImageVideo + '"  class="img-responsive"/>';
        $("#imgBoxs").html(imgHtml);
        //$('#authentication').html("<h4 style='margin-top:50px;text-align: center;'>身份认证审核中……</h4>");
    }else if( (loginData.IDCard || loginData.IDCardScanCopy) &&loginData.IsApprove==0 && loginData.Type == 0) {
        $('#myTab li:eq(1) a').tab('show');
        $('.col-person').show();
        var ImageVideo = loginData.IDCardScanCopy.split(",");
        console.log('************', ImageVideo)
        var imgHtml = '<img src="http://www.agrittex.com/' + ImageVideo[0] + '"  class="img-responsive" data-id="' + ImageVideo[2] + '"/>';
        var imgHtml3 = '<img src="http://www.agrittex.com/' + ImageVideo[1] + '"  class="img-responsive" data-id="' + ImageVideo[3] + '"/>';
        /*for(var i in ImageVideo){
            imgHtml = '<img src="' + ImageVideo[0] + '"  class="img-responsive" data-id=""/>';
            imgHtml3 = '<img src="' + ImageVideo[1] + '"  class="img-responsive"/>';
        }*/
        $("#imgBoxs").html(imgHtml);
        $("#imgBoxs2").html(imgHtml3);
    }else {
        Util.warning("show","系统异常！");
    }

    //初始化图片上传组件
    $('#imgUpload').fileupload({
        url: Util.service.UploadImageVideo,
        limitMultiFileUploadSize: 5000000,
        limitMultiFileUploads: 1,
        maxFileSize: 5000000,
        headers: {
            FileDesc: "baseInfor",
            FileType: 0
        },
        minFileSize: 1,
        add: function (e, data) {
            //上传前处理
            Util.pageLoading();
            data.submit();
        },
        done: function (e, data) {
            var data = data.result;
            //上传完成处理返回值
            if (data.success) {
                data.resultData = JSON.parse(data.resultData);
                var html = '';
                for (var i in data.resultData) {
                    html += '<img src="http://www.agrittex.com/' + data.resultData[i].Url + '"  class="img-responsive" data-id="' + data.resultData[i].ID + '"/>';
                }
                $("#imgBoxs").html(html);
            } else {
                Util.error("show", data.message);
            }
            Util.pageinit();

        }
    });

    $("#clearImgs").on("click", function (e) {
        e.preventDefault();
        $("#imgBoxs").html("");
    });

    //身份证反面上传组件
    $('#imgUpload2').fileupload({
        url: Util.service.UploadImageVideo,
        limitMultiFileUploadSize: 5000000,
        limitMultiFileUploads: 1,
        maxFileSize: 5000000,
        headers: {
            FileDesc: "baseInfor",
            FileType: 0
        },
        minFileSize: 1,
        add: function (e, data) {
            //上传前处理
            Util.pageLoading();
            data.submit();
        },
        done: function (e, data) {
            var data = data.result;
            //上传完成处理返回值
            if (data.success) {
                data.resultData = JSON.parse(data.resultData);
                var html = '';
                for (var i in data.resultData) {
                    html += '<img src="' + data.resultData[i].Url + '"  class="img-responsive" data-id="' + data.resultData[i].ID + '"/>';
                }
                $("#imgBoxs2").html(html);
            } else {
                Util.error("show", data.message);
            }
            Util.pageinit();

        }
    });

    $("#clearImgs2").on("click", function (e) {
        e.preventDefault();
        $("#imgBoxs2").html("");
    });

    $(".btn-save").on('click', function (e) {
        e.preventDefault();
        var ImageVideo = [];
        var userId=loginData.ID;
        var dataJson={};
        var url="";
        yzphone1();
        if (!$("#certifyForm").valid()) {
            return ;
        }

        if(loginData.Type==0){
            var idCard=$("#idCard").val();
            if(!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard)){
                Util.warning("show","身份证格式不正确");
                return;
            }
            url=Util.service.CertifyIndividualUser;
            $("#imgBoxs").find(".img-responsive").each(function () {
                ImageVideo.push({ "id": $(this).data("id")});
            });
            $("#imgBoxs2").find(".img-responsive").each(function () {
                ImageVideo.push({ "id": $(this).data("id")});
            });
            if(ImageVideo.length<2){
                Util.warning("show","请上传身份证正反面扫描件！");
                return;
            }
            dataJson={
                "User":{
                    "userID":userId,
                    "name":$("#name").val(),
                    "idCard":idCard
                },
                "IdCardScanCopy":ImageVideo,
            };
        }else if(loginData.Type==1){
            url=Util.service.CertifyEnterpriseUser;
            $("#imgBoxs").find(".img-responsive").each(function () {
                ImageVideo.push({ "id": $(this).data("id")});
            });
            if(ImageVideo.length<1){
                Util.warning("show","请上传法人证书！");
                return;
            }
            dataJson={
                "User":{
                    "userID":userId,
                    "corporateName":$("#corporateName").val(),
                    "corporateNumber":$("#corporateNumber").val()
                },
                "CorporateScanCopy":ImageVideo,
            };
        }

        console.info(dataJson);
        $.ajax({
            url: url,
            type: 'POST',
            data: {jsonStr:JSON.stringify(dataJson)},
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                if (data.success === 1) {
                    //Util.success("show", "保存成功");
                    //   $.ajax({
                    //       url: Util.service.Login,
                    //       type: "POST",
                    //       data:{
                    //           userName:loginData.LoginName,
                    //           password:loginData.Password
                    //       },
                    //       beforeSend: function () {
                    //           Util.pageLoading();
                    //       },
                    //       success: function (data) {
                    //           Util.pageinit();
                    //           if (data.success === 1) {
                    //               data.resultData = JSON.parse(data.resultData);
                    //               console.log(data.resultData);
                    //               Util.setUserLogin(data.resultData);
                    //               window.location.href="index.html";
                    //           }else{
                    //               Util.error("show",data.message);
                    //           }
                    //       },
                    //       error: function () {
                    //           Util.pageinit();
                    //           Util.error("show","系统异常");
                    //       }
                    //});
                    Util.success("show", "保存成功");
                    $.ajax({
                        url: Util.service.GetUserBYSessionID,
                        type: "POST",
                        data: {
                            userid: loginData.ID
                        },
                        beforeSend: function () {
                            Util.pageLoading();
                        },
                        success: function (data) {
                            Util.pageinit();
                            if (data.success === 1) {
                                data.resultData = JSON.parse(data.resultData);
                                Util.setUserLogin(data.resultData);
                                window.location.href = "index.html";
                            } else {
                                Util.error("show", data.message);
                            }
                        },
                        error: function () {
                            Util.pageinit();
                            Util.error("show", "系统异常");
                        }
                    });
                } else {
                    Util.error("show",data.message);
                }
            },
            error: function () {
                //服务器错误
                Util.pageinit();
                Util.error("show","服务器错误");
            }
        });
    });

    //个人信息
    $.ajax({
        url: Util.service.GetUserInfo,
        type: 'POST',
        data: {LoginName:loginData.LoginName},
        beforeSend: function () {
            Util.pageLoading();
        },
        success: function (data) {
            Util.pageinit();
            if (data.success === 1) {
                console.log(JSON.parse(data.resultData));

                $("#personForm").formFieldValues(JSON.parse(data.resultData)); 
                $("#certifyForm").formFieldValues(JSON.parse(data.resultData)); 

            } else {
                Util.error("show",data.message);
            }
        },
        error: function () {
            //服务器错误
            Util.pageinit();
            Util.error("show","服务器错误");
        }
    });

    $(".btn-save-person").on("click",function(e){
        e.preventDefault();
        if (!yzphone1())
        {
            return;
        }
        if (!$("#personForm").valid()) {
            return ;
        }

        $.ajax({
            url: Util.service.ModifyUserInfo,
            type: 'POST',
            data: {jsonStr:JSON.stringify($("#personForm").serializeJson())},
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                if (data.success === 1) {
                    Util.warning("show","保存成功",function () {
                        window.location.href="index.html";
                    });
                } else {
                    Util.error("show",data.message);
                }
            },
            error: function () {
                //服务器错误
                Util.pageinit();
                Util.error("show","服务器错误");
            }
        });
    });

   

});
 //验证手机
function yzphone1() {
        var flag = true;
        var phone = $("input[name='Phone']").val()
            var reg = /^1[3|4|5|7|8][0-9]{9}$/
            if (reg.test(phone)) {

                $("#s1").html("");
                flag = true;
            }
            else//否则 证明有错误的
            {
                //提示
                $("#s1").html("手机格式不正确！");
                flag = false;
            }
        
            return flag;

    }