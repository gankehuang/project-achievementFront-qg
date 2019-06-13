/**
 * Created by wangyinping on 2017/5/22.
 */

$(function(){
    Util.pageinit();
    //未审核时不能操作
    var loginData = Util.getUserLoginData();

    if (loginData.Type == 0 && !loginData.IDCard) {
        Util.warning("show", "请先进行身份认证！", function () {
            window.location.href = "/login/baseInfor/index.html";
        });
        return;
    } else if (loginData.Type == 1 && !loginData.CorporateNumber) {
        Util.warning("show", "请先进行身份认证！", function () {
            window.location.href = "/login/baseInfor/index.html";
        });
        return;
    } else if (loginData.IsApprove == 1) {
    } else if ((loginData.IDCard || loginData.CorporateNumber) && loginData.IsApprove == 0) {
        Util.warning("show", "身份认证审核中……，请稍后再试！", function () {
            window.location.href = "/login/baseInfor/index.html";
        });
        return;
    } else {
        Util.warning("show", "系统异常！");
        return;
    }

    var id = Util.getUrlParam("id");
    $('#myTab li:eq(0) a').tab('show');

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
        min: $.validator.format("请输入一个最小为 {0} 的值"),
    });

    //时间选择
    $(".datetimepicker").datetimepicker({
        format: 'YYYY-MM-DD',
        dayViewHeaderFormat: 'YYYY-MM',
        useCurrent: false,
        sideBySide: true
    });

    //定义初始化接口是否完成请求
    var isInitOver = {};

    //编辑成果 数据回显
    function getAchDetail() {
        if (!id) {
            return;
        }
        var over = false;
        console.info(isInitOver)
        for (var key in isInitOver) {
            if (!isInitOver[key]) {
                over = true;
                break;
            }
        }

        if (!over) {
            console.info("init")
            $.ajax({
                url: Util.service.GetNewsByAchID,
                type: 'POST',
                data: { "achID": id },
                beforeSend: function () {
                    Util.pageLoading();
                },
                success: function (data) {
                    Util.pageinit();
                    if (data.success === 1) {
                        data.resultData = JSON.parse(data.resultData);
                        var news = JSON.parse(data.resultData.News);
                        $("#myTabContent").formFieldValues(news);
                        $("#IsPicNews").val(news.IsPicNews);
                        if (news.Desc) {
                            $("#wordFrame").show();
                            var iframe = document.getElementById("wordFrame").contentDocument || document.frames["wordFrame"].document;
                            iframe.body.innerHTML = news.Desc;
                            var height = iframe.documentElement.scrollHeight || iframe.body.scrollHeight;
                            $("#wordFrame").css("height", height + 20);
                        }
                        if (news.CreateDate) {
                            var d = new Date();
                            d = news.CreateDate;
                            var index = d.lastIndexOf(" ");
                            d = d.substring(0, index);
                            d = d.replace(new RegExp('/', 'gm'), '-');//斜杠‘/’替换成‘-’
                            //完成赋值  
                            $("#CreateDate").val(d);
                            console.info(d);
                        }
                        var ImageVideo = JSON.parse(data.resultData.ImageVideo);
                        var mainimgList = [];//图片
                        var upload = [];//附件
                        var data = {};//图片
                        var data1 = {};//附件
                        if (news.IsPicNews == "1") {
                            //图片
                            for (var i in ImageVideo) {
                                if (ImageVideo[i].type == '0') {
                                    mainimgList.push({ Url: ImageVideo[i].url, ID: ImageVideo[i].id });
                                }
                                else if (ImageVideo[i].type == '3') {
                                    var namenews = ImageVideo[i].name;
                                    var file_name = namenews.substring(namenews.lastIndexOf("_") + 1);
                                    console.log(file_name);
                                    upload.push({ Url: ImageVideo[i].url, ID: ImageVideo[i].id, Name: file_name });
                                }
                            }
                           
                        } else {
                            for (var j in ImageVideo) {
                                if (ImageVideo[j].type == '0') {
                                    mainimgList.push({ Url: ImageVideo[j].url, ID: ImageVideo[j].id });
                                }
                                else if (ImageVideo[j].type == '3') {
                                    var namenews = ImageVideo[j].name;
                                    var file_name = namenews.substring(namenews.lastIndexOf("_") + 1);
                                    upload.push({ Url: ImageVideo[j].url, ID: ImageVideo[j].id, Name: file_name });
                                }
                            }
                        }
                        //图片
                        data.resultData = mainimgList;
                        $("#imgBoxs1").html(template("imgTpl", data));
                        //附件 
                        data1.resultData = upload;
                        $("#upLoadAll").html(template("uploadTpl", data1));

                    } else {
                        console.error("系统错误");
                    }
                },
                error: function () {
                    console.error("系统错误");
                    Util.pageinit();
                }
            });

        }

    }




    //点击保存事件
    $(".btn-save").on('click', function (e) {
        //e.preventDefault();
        //if (!$("#homeForm").valid()) {
        //    // return ;
        //} else {
        //    $('#myTab li:eq(1) a').tab('show');
        //}
        //新闻信息的表单
        var form1 = $('#homeForm').serializeJson(); //将提交的表单数据转换成json数据格式
        var message = "您的发布信息不完整，请完善以下信息：";

      

        if (form1.Title == "" || form1.Title == null) {
            message += "</br>请填写新闻名称";
        }
        if (form1.Tag == "" || form1.Tag == null) {
            message += "</br>请填写新闻标签";
        }
        if (form1.From == "" || form1.From == null) {
            message += "</br>请填写新闻来源";
        }
        if (form1.CreateDate == null || form1.CreateDate == "") {
            message += "</br>请选择发布时间";

        }
        //调用判断是否上传成果简介
        if (filelength() == false) {
            message += "</br>请上传新闻简介";
        }
        if (form1.IsPicNews == "2") {
            message += "</br>请选择是否上传图片新闻";

        }
      
        if (filelength() == false || form1.Title == "" || form1.Title == null || form1.CreateDate == null || form1.CreateDate == "" || form1.IsPicNews == "2") {
            Util.warning("show", message);
            return;
        }

        //上传图片新闻的图片
        var ImageVideo = [];
        var len1 = 0;
        var len2 = 0;
        $("#imgBoxs1").find(".img-responsive").each(function (i) {
            ImageVideo.push({ "ImageVideoID": $(this).data("id"), "Index": ImageVideo.length });
    
        })       
        len1 = ImageVideo.length;
        $("#upLoadAll").find(".img-responsive").each(function (i) {
            ImageVideo.push({ "ImageVideoID": $(this).data("id"), "Index": ImageVideo.length });
        })
        len2 = ImageVideo.length - len1;

        if (form1.IsPicNews == "1") {
            if (len1 < 1) {
                Util.warning("show", "请上传图片！");
                return;
            }
            if (len1 > 1) {

                Util.warning("show", "图片只能上传1张！");
                return;
            }
        }
        

        var dataJson = $.extend({}, {
            "News": $.extend({}, form1, { "UserID": Util.getUserId() })
        }, {
            "ImageVideo": ImageVideo
        });

        console.info(dataJson);
        var json1 = JSON.stringify(dataJson);
        //alert("最终提交的是:" + json1)


        //-----开始提交--------
        $.ajax({
            url: Util.service.AddNewNews,
            type: 'POST',
            data: {
                jsonStr: JSON.stringify(dataJson), "NewsID": id
            },//参数
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                console.log(data)
                Util.pageinit();
                if (data.success === 1) {
                    $("#draft").val(data.resultData)
                    Util.success("show", "保存成功", function () {
                        location.href = "/login/NewsManagement/index.html";
                    });
                    
                } else {

                    Util.error("show", data.message)
                }
            },
            error: function () {
                //服务器错误
                Util.pageinit();
                Util.error("show", "服务器错误")
            }
        });
    });




    //word上传
    $('#wordUpload').fileupload({
        url: Util.service.UploadWordNews,
        limitMultiFileUploadSize: 5000000,
        limitMultiFileUploads: 1,
        maxFileSize: 5000000,
        minFileSize: 1,
        add: function (e, data) {
            //上传前处理
            $('.progress-bar').css('width', 0 + '%');
            //$("#uploadProgressModal").modal("show");
            data.submit();
        },
        done: function (e, data) {
            var data = data.result;
            //上传完成处理返回值
            if (data.success) {
                $("#wordFrame").show();
                var iframe = document.getElementById("wordFrame").contentDocument || document.frames["wordFrame"].document;
                iframe.body.innerHTML = data.resultData;
                $("#Desc").val(data.resultData);
                var height = iframe.documentElement.scrollHeight || iframe.body.scrollHeight;
                $("#wordFrame").css("height", height + 20);
              
            } else {
                Util.error("show", data.message);
            }
            //找到word转换成网页之后中的a标签
            //var a = document.getElementById('wordFrame').contentWindow.document.getElementsByTagName('a');
            //var b = a[0].href;
            $(window.frames["wordFrame"].document).find("a").attr('target', '_blank')
            $('.progress-bar').css('width', '100%');
            //$("#uploadProgressModal").modal("hide");

        },
        progressall: function (e, data) {
            $("#uploadProgress").show();
            //设置上传进度事件的回调函数，更新进度条
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('.progress-bar').css('width', progress + '%');
        }
    });

    //图片新闻图片上传
    $('#imgUpload1').fileupload({
        url: Util.service.UploadImageVideoNews,
        limitMultiFileUploadSize: 5000000,
        limitMultiFileUploads: 1,
        maxFileSize: 5000000,
        headers: {
            FileDesc: "22",
            FileType: 0,
        },
        minFileSize: 1,
        add: function (e, data) {
            var tooLarge = false;
            for (var i in data.files) {
                if (data.files[i].size > 20 * 1024 * 1024) {
                    tooLarge = true;
                }
            }
            if (tooLarge) {
                Util.warning("show", "图片大小不能超过20M");
                return false;
            }
            //上传前处理
            var len = $("#imgBoxs1").find(".img-responsive").length;
            // alert(len)
            if (len <= 0) {
                Util.pageLoading();
                data.submit();
            } else {

                Util.warning("show", "最多上传1张图片");
                return false;
            }

        },
        done: function (e, data) {
            var data = data.result;
            //上传完成处理返回值
            if (data.success) {
                data.resultData = JSON.parse(data.resultData);
                // var html = '';
                // for (var i in data.resultData) {
                //     html += '<img src="' + data.resultData[i].Url + '"  class="img-responsive" data-id="' + data.resultData[i].ID + '"/>';
                // }

                $("#imgBoxs1").append(template("imgTpl", data));
            } else {
                Util.error("show", data.message);
            }
            Util.pageinit();

        }
    });

    //清空图片的按钮
    $("#clearImgs1").on("click", function (e) {
        console.info(e)
        e.preventDefault();
        $("#imgBoxs1").html("");
    });
    $("#imgBoxs1").on("click", ".glyphicon-remove", function () {
        $(this).parent().remove();
    })
    //上传附件的大小的总和
    var size = 0;
    //上传附件
    $('#FileupLoadAll').fileupload({
        url: Util.service.UploadImageVideoNews,
        limitMultiFileUploadSize: 5000000,
        limitMultiFileUploads: 1,
        maxFileSize: 5000000,
        headers: {
            FileDesc: "22",
            FileType: 3,
        },
        minFileSize: 1,
        add: function (e, data) {
          
            var tooLarge = false;
            for (var i in data.files) {
                size += data.files[i].size;
                if (size > 100 * 1024 * 1024) {
                    Util.warning("show", "文件大小不能超过100M");
                    size = size - data.files[i].size;
                    return false;
                }
            }
            console.log(size);
            Util.pageLoading();
            data.submit();
            //上传前处理
            //var len = $("#upLoadAll").find(".img-responsive").length;
            //if (len <= 5) {
            //    Util.pageLoading();
            //    data.submit();
            //} else {

            //    Util.warning("show", "最多上传5个附件");
            //    return false;
            //}

        },
        done: function (e, data) {
            var data = data.result;
            //上传完成处理返回值
            if (data.success) {
                data.resultData = JSON.parse(data.resultData);
                // var html = '';
                // for (var i in data.resultData) {
                //     html += '<img src="' + data.resultData[i].Url + '"  class="img-responsive" data-id="' + data.resultData[i].ID + '"/>';
                // }

                $("#upLoadAll").append(template("uploadTpl", data));
            } else {
                Util.error("show", data.message);
            }
            Util.pageinit();

        }
    });
    //清空附件
    $("#ClearFileupLoadAll1").on("click", function (e) {
        console.info(e)
        e.preventDefault();
        $("#upLoadAll").html("");
    });
    $("#upLoadAll").on("click", ".glyphicon-remove", function () {
        $(this).parent().remove();
    })


    //判断是否上传新闻简介
    function filelength() {
        var flag = true;
        //if (filele == 0) {
        //    flag = false;
        //}
        var iframe = document.getElementById("wordFrame").contentDocument || document.frames["wordFrame"].document;
        if (iframe.body.innerHTML == null || iframe.body.innerHTML == "") {
            flag = false;
        }
        return flag;
    }

    $(function () {
        getAchDetail();
    })
});
