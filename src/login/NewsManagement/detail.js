/**
 * Created by xll on 2017/5/22.
 */

$(function(){
    Util.pageinit();
    var id = Util.getUrlParam("id");
    $('#myTab li:eq(0) a').tab('show');

    //所有文本框置灰
    $('form').find('input,textarea,select,button').attr('disabled', true);
    $("input[type='radio']").attr("disabled", true);

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
                        console.log(data.resultData);
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
                        ////图片
                        //var ImageVideo = JSON.parse(data.resultData.ImageVideo);
                        ////var imgHtml = ''
                        //var mainimgList = [];
                        //for (var i in ImageVideo) {
                        //    if (ImageVideo[i].type == '0') {
                        //        mainimgList.push({ Url: ImageVideo[i].url, ID: ImageVideo[i].id });
                        //    } 
                        //}

                        //var data = {};
                        //data.resultData = mainimgList;
                        //$("#imgBoxs1").html(template("imgTpl", data));
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
    $(function () {
        getAchDetail();
    })












});
