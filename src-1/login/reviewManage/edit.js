/**
 * Created by wangyinping on 2017/5/22.
 */
$(function () {
  
    Util.pageinit();
    var loginData = Util.getUserLoginData();
    if (loginData.Type == 0 && !loginData.IDCard) {
    
        Util.warning("show", "请先进行身份认证！", function () {
            location.href = "/login/baseInfor/index.html";
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

    var id = Util.getUrlParam("id")

    if (id) {
        $("#breadcrumb").find("li:last-child").find("em").html("编辑成果");
    }
    var ClassifyIdList = null;

    //汉化默认提示 自定义错误信息
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
        min: $.validator.format("请输入一个最小为 {0} 的值")
    });

    //定义初始化接口是否完成请求
    var isInitOver = {};


    $("#myTab1 li:eq(0) a").tab("show")
    // $("#myTab1").find("li").eq(0).find("a").tab("show");



    //全部的下一步按钮 保存草稿并继续
    $('.btn-next').on('click', function (e) {

        //Util.warning("show", "系一部等等");
        e.preventDefault();

        var hrefName = $('#myTab1 li.active a').attr("href");

        if ($("[name=DevelopFromDate]").val() && $("[name=DevelopEndDate]").val() && $("[name=DevelopFromDate]").val() > $("[name=DevelopEndDate]").val()) {
            Util.warning("show", "研发开始时间不能大于研发结束时间");
            return;
        }
        if ($("[name=CompeteStartDate]").val() && $("[name=CompeteEndDate]").val() && $("[name=CompeteStartDate]").val() > $("[name=CompeteEndDate]").val()) {
            Util.warning("show", "竞价开始时间不能大于竞价结束时间");
            return;
        }
        if ($("[name=ExpectMaxPrice]").val() && $("[name=ExpectMinPrice]").val() && parseInt($("[name=ExpectMaxPrice]").val()) < parseInt($("[name=ExpectMinPrice]").val())) {
            Util.warning("show", "交易价格上限不能小于交易价格下限");
            return;
        }
        if (!$(hrefName).find("form").valid()) {
            return;
        } else {
              //save();
            $('#myTab1 li.active a').parent().next().find("a").tab('show');


        }
    });


    //全部的返回按钮
    $('.btn-back').on('click', function (e) {
        e.preventDefault();
        var hrefName = $('#myTab1 li.active a').attr("href");
        if (hrefName === "#IPR") {
            $('#myTab1 li:eq(0) a').tab('show');

        } else if (hrefName === "#valuation") {
            $('#myTab1 li:eq(1) a').tab('show');
        } else if (hrefName === "#contact") {
            $('#myTab1 li:eq(2) a').tab('show');
        } else if (hrefName === "#attachUpload") {
            $('#myTab1 li:eq(3) a').tab('show');
        }
    });



    //全部的暂存按钮
    $('.btn-draft').on('click', function (e) {
        e.preventDefault();
        var hrefName = $('#myTab1 li.active a').attr("href"); //#home
        if ($(hrefName).find("form").valid()) {
            //提交方法
            //save();
        }

        //if (hrefName == "#home") {
        //    if ($(hrefName).find("form").valid())//没有通过验证返回 True
        //    {
        //     alert("已成功保存到草稿箱！")
        //        //提交方法
        //      save();
        //    }
        //}
        //else {
        //    var prv1 = $(hrefName).prev().find("form").html();
        //    alert(prv1)
        //    var prv = $(hrefName).prev().find("form").valid();
        //    alert($(hrefName).prev().find("form").valid())
        //    if ($(hrefName).prev().find("form").valid()) {
        //        alert("完善")
        //    }
        //    else {
        //        alert("请完善当前信息")

        //    }
           
        //}


    });

    /*--begin基本信息获取*/
    function getBasicInfo(urlInfo, selectELe, defaultOption, parentID, value) {
        var key = new Date().getTime();
        isInitOver[key] = false;
        $.ajax({
            url: urlInfo,
            type: 'POST',
            data: { parentID: parentID },
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                if (data.success === 1) {
                    var resultData = JSON.parse(data.resultData);
                    Util.getSelectData(selectELe, resultData, defaultOption, value);
                    isInitOver[key] = true;
                    getAchDetail();
                }
            },
            error: function () {
                Util.pageinit();
            }
        });
    }

    //一级分类
    getBasicInfo(Util.service.GetAllTopClassify, "#ClassifyId1", "一级分类");
    // //获取所有新产业类型
    // getBasicInfo(Util.service.GetAllNewIndustryType, "#IsNewIndustry", "请选择");
    //获取所有技术水平
    getBasicInfo(Util.service.GetAllTechLeval, "#TechLevel", "请选择");
    //获取所有成果权属类型
    getBasicInfo(Util.service.GetAllTechType, "#TechTypeID", "请选择");
    //获取所有技术成熟度
    getBasicInfo(Util.service.GetAllMaturity, "#Maturity", "请选择");
    //获取所有交易方式
    // getBasicInfo(Util.service.GetAllTransMethodMethod, "#ExpectTransMethod", "请选择");
    //获取归属省
    getBasicInfo(Util.service.GetAllProvince, "#OwnerCitySelect", "请选择");

    /*--end基本信息获取*/

    //二——五级分类 选项改变事件
    $(".classifyChange").on('change', function () {

        //判断使用不同的Word模板 
        //下拉框1
        var a = $("#ClassifyId1").val();
        //下拉框2
        var b = $("#ClassifyId2").val();
        if (a == null || a == "" || b == null || b == "") {
            $("#dowma").attr("href", "#")
        }
        //种植植物品种
        if (a == 1 && b == 9) {
            $("#dowma").attr("href", "%e5%93%81%e7%a7%8d%e6%a8%a1%e6%9d%bf.doc")
            $("#Hidden1").val("type1")

            //品种名称占位符
            $("#pzname").attr("placeholder", "植物新品种--品种名称")
        }
            //和养殖 畜牧品种 使用品种模板
        else if (a == 2 && b == 151) {

            $("#dowma").attr("href", "%e5%93%81%e7%a7%8d%e6%a8%a1%e6%9d%bf.doc")
            $("#Hidden1").val("type1")
            $("#pzname").attr("placeholder", "养殖新品种--品种名称")
        }
        else//其他的都使用通用模板
        {
            $("#dowma").attr("href", "%e9%80%9a%e7%94%a8%e6%a8%a1%e6%9d%bf.doc")
            $("#Hidden1").val("type2")
            $("#pzname").attr("placeholder", "成果名称不能为空！")
        }

        var self = $(this);
        var _nextEle = self.next();
        while (_nextEle.hasClass("error")) {
            _nextEle = _nextEle.next();
        }
        var nextEle = _nextEle.attr("id");
        while (self.next().length > 0) {
            self.next().hide();
            self.next().val("");
            self = self.next();
        }

        var parentId = $(this).val();
        var defaultOption = "";
        var postfix = nextEle.substr(-1);
        if (postfix === "2") {
            defaultOption = "二级分类";
        } else if (postfix === "3") {
            defaultOption = "三级分类";
        } else if (postfix === "4") {
            defaultOption = "四级分类";
        } else if (postfix === "5") {
            defaultOption = "五级分类";
        }
        var index = parseInt(postfix) - 1;
        getBasicInfo(Util.service.GetAllClassifyByParentID, "#" + nextEle, defaultOption, parentId, (ClassifyIdList && ClassifyIdList[index]) ? ClassifyIdList[index].ClassifyID : null);
    });

    //时间选择
    $(".datetimepicker").datetimepicker({
        format: 'YYYY-MM-DD',
        dayViewHeaderFormat: 'YYYY-MM',
        useCurrent: false,
        sideBySide: true
    });

    //默认产权归属单位
    if (!id && loginData && loginData.CorporateName) {
        $("#IPRForm").find("[name=OwnerOrganization]").val(loginData.CorporateName)
    }

    //是否经过第三方评价
    $("#valuationForm").find("[name=IsThirdPartyEvalua]").on("change", function () {
        if ($(this).val() == "是") {
            $("#AgencyItem").show();
        } else {
            $("#AgencyItem").hide();
        }
    })


    //初始化动态加载数据
    $(function () {

        var key = new Date().getTime();
        isInitOver[key] = false;
        //--------知识产权编号-------
        $.ajax({
            url: Util.service.GetAllIPRNumberType,
            type: 'POST',
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                console.info(data);
                if (data.success === 1) {
                    data.resultData = JSON.parse(data.resultData);

                    $("#IPRNumberSelect").html(template("template1", data));
                    isInitOver[key] = true;
                    getAchDetail();
                } else {
                    console.error("系统错误");
                }
            },
            error: function () {
                console.error("系统错误");
                Util.pageinit();
            }
        });

        var key1 = new Date().getTime();
        isInitOver[key1] = false;
        //新型产业
        $.ajax({
            url: Util.service.GetAllNewIndustryType,
            type: 'POST',
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                if (data.success === 1) {
                    data.resultData = JSON.parse(data.resultData);
                    $("#NewIndustryList").prepend(template("template3", data));
                    isInitOver[key1] = true;
                    getAchDetail();
                } else {
                    console.error("系统错误");
                }
            },
            error: function () {
                console.error("系统错误");
                Util.pageinit();
            }
        });


        //var key2 = new Date().getTime();
        // isInitOver[key2] = false;
        ////所属领域
        //$.ajax({
        //    url: Util.service.GetAllOwnerField,
        //    type: 'POST',
        //    beforeSend: function () {
        //        Util.pageLoading();
        //    },
        //    success: function (data) {
        //        Util.pageinit();
        //       // alert("所属领域" + "   " + data.resultData)
        //        if (data.success === 1) {
        //            data.resultData = JSON.parse(data.resultData);
        //            $("#OwnerFieldsSelect").html(template("template2", data));
        //            isInitOver[key2] = true;
        //            getAchDetail();
        //        } else {
        //            console.error("系统错误");
        //        }
        //    },
        //    error: function () {
        //        console.error("系统错误");
        //        Util.pageinit();
        //    }
        //});

        var key3 = new Date().getTime();
        isInitOver[key3] = false;

        //适宜省份
        $.ajax({
            url: Util.service.GetAllProvince,
            type: 'POST',
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                if (data.success === 1) {
                    data.resultData = JSON.parse(data.resultData);
                    $("#province").html(template("template22", data));
                    isInitOver[key3] = true;
                    getAchDetail();
                } else {
                    console.error("系统错误");
                }
            },
            error: function () {
                console.error("系统错误");
                Util.pageinit();
            }
        });

        var key4 = new Date().getTime();
        isInitOver[key4] = false;
        //预期交易方式
        $.ajax({
            url: Util.service.GetAllTransMethodMethod,
            type: 'POST',
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                if (data.success === 1) {
                    data.resultData = JSON.parse(data.resultData);
                    $("#ExpectTransMethodSelect").html(template("template2", data));
                    console.log(data)
                    isInitOver[key4] = true;
                    getAchDetail();
                } else {
                    console.error("系统错误");
                }
            },
            error: function () {
                console.error("系统错误");
                Util.pageinit();
            }
        });



    }());


    //编辑成果 数据回显
    function getAchDetail() {

        if (!id) {
            return;
        }
        var over = false;
        for (var key in isInitOver) {
            if (!isInitOver[key]) {
                over = true;
                break;
            }
        }

        if (!over && !ClassifyIdList) {
            console.info("init")
            $.ajax({
                url: Util.service.GetAchievementByAchID,
                type: 'POST',
                data: { "achID": id },
                beforeSend: function () {
                    Util.pageLoading();
                },
                success: function (data) {
                    Util.pageinit();
                    if (data.success === 1) {
                        data.resultData = JSON.parse(data.resultData);
                        console.info(data.resultData)
                        ClassifyIdList = JSON.parse(data.resultData.AchievementClassify);
                        var Achievement = JSON.parse(data.resultData.Achievement);
                        $("#ClassifyId1").val(ClassifyIdList && ClassifyIdList[0] ? ClassifyIdList[0].ClassifyID : '');
                        $("#ClassifyId1").trigger("change");
                        $("#myTabContent").formFieldValues(Achievement);

                        var Keywords = JSON.parse(data.resultData.Keywords);
                        $("#KeyNameList input").each(function (i) {
                            if (Keywords && Keywords[i]) {
                                $(this).val(Keywords[i].KeyName);
                            }
                        })

                        //-------------知识产权编号-----------
                        var AchievementImageIPRNumber = JSON.parse(data.resultData.AchievementImageIPRNumber);
                        for (var i in AchievementImageIPRNumber) {
                            console.log(i)
                            var $ele = $("#IPRNumberSelect [name=IPRNumberTypeID][value=" + AchievementImageIPRNumber[i].IPRNumberTypeID + "]");
                            if ($ele.parent().next().val().trim()) {
                                break;
                            }
                            else {
                                var ele_IPR = '';
                                //全局替换 分割数组
                                var arr_number = AchievementImageIPRNumber[i].IPRNumber.replace(/，/g, ',').split(',');
                                //map循环
                                arr_number.map(function (item, index) {
                                    if (index == 0) {
                                        $ele.prop("checked", true);
                                        $ele.parent().next().val(item)
                                    }
                                    else {
                                        ele_IPR += '<div> <input name="IPRNumber1" type="text" class="form-control" value="' + item + '"> <input type="button" value="-" class="btn btn-success" style="background-color: #3a5170; height: 28px;margin-right:200px;" onclick="remove(this)"/></div>';
                                    }
                                });
                                $('[name=IPRNumber]').eq(i).after(ele_IPR);
                            }
                        }

                        if (Achievement.AchieveDesc) {
                            $("#wordFrame").show();
                            var iframe = document.getElementById("wordFrame").contentDocument || document.frames["wordFrame"].document;
                            iframe.body.innerHTML = Achievement.AchieveDesc;
                            var height = iframe.documentElement.scrollHeight || iframe.body.scrollHeight;
                            $("#wordFrame").css("height", height + 20);
                        }

                        //图片和视频
                        var ImageVideo = JSON.parse(data.resultData.ImageVideo);
                        var imgHtml = '', videoHtml = '';
                        var imgList = [], videoList = [];
                        var mainimgList = [];
                        for (var i in ImageVideo) {
                            if (ImageVideo[i].type == '0') {

                                if (ImageVideo[i].MainPicId == 1) {
                                    mainimgList.push({ Url: ImageVideo[i].url, ID: ImageVideo[i].id });
                                }
                                else {
                                    imgList.push({ Url: ImageVideo[i].url, ID: ImageVideo[i].id });
                                }
                                // imgHtml += '<img src="' + ImageVideo[i].url + '"  class="img-responsive" data-id="' + ImageVideo[i].id + '"/>';
                            } else {
                                videoList.push({ Url: ImageVideo[i].url, ID: ImageVideo[i].id });
                                // videoHtml += '<div class="media-responsive"  data-id="' + ImageVideo[i].id + '><video src="' + ImageVideo[i].url + '" controls="controls"></video></div> ';
                            }
                        }
                        var data = {};

                        data.resultData = videoList;
                        //相关视频
                        $("#mediaBoxs").html(template("videoTpl", data));

                        //主要图片
                        //data.resultData = mainimgList;
                        //$("#imgBoxs1").html(template("imgTpl", data));

                        //主要图片
                        data.resultData = mainimgList;
                        $("#imgBoxs1").html(template("imgTpl", data));


                        //相关图片
                        data.resultData = imgList;
                        $("#imgBoxs").html(template("imgTpl", data));


                        //相关图片
                        data.resultData = imgList;
                        $("#imgBoxs").html(template("imgTpl", data));


                    } else {
                        console.error("系统错误");
                        Util.error("show", data.message);
                    }
                },
                error: function () {
                    console.error("系统错误");
                    Util.pageinit();
                }
            });

        }

    }


    $("#home").on("change", "[name=IsDiscussPrice]", function () {
        if ($(this).val() == "0") {
            $("#CompeteSetting").show();
        } else {
            $("#CompeteSetting").hide();
        }
    })

    $("#IsNewIndustry").on("change", function () {
        if ($(this).val() == "是") {
            $("#NewIndustry").show();
        } else {
            $("#NewIndustry").hide();
        }
    })


    $("[name=IsHavaCase]").on("change", function () {
        if ($(this).val() == "有") {
            $("#CaseDescItem").show();
        } else {
            $("#CaseDescItem").hide();
        }
    })

    $("#IPRForm").find("[name=OwnerCountry]").on("change", function () {
        if ($(this).val() != "中国大陆地区") {
            $("#OwnerCitySelect").val("");
            $("#OwnerCitySelect").prop("required", false);
        } else {
            $("#OwnerCitySelect").prop("required", true);
        }
    })

    $("#IPRNumberSelect").on("change", "[name=IPRNumberTypeID]", function () {
        $(this).parent().siblings("[name=IPRNumber]").prop("required", $(this).is(":checked"))
    })

    //--------------------------保存信息按钮点击事件-------------------------------------------------------
    $(".btn-save").on('click', function (e) {

        e.preventDefault();
        //成果信息
        //成果分类
        var AchievementClassify = [];
        $("#ClassifyIdList").find("select").each(function () {
            if ($(this).val()) {
                AchievementClassify.push({ "ClassifyID": $(this).val() });
            }
        })

        //添加关键字
        var Keywords = [];
        $("#KeyNameList").find("input").each(function () {
            if ($(this).val()) {
                Keywords.push({ "KeyName": $(this).val() });
            }
        })



        ////是否新型产业
        //if (form1.IsNewIndustry == "1" && form1.NewIndustryName) {
        //    if (form1.NewIndustryName == "其他") {
        //        form1.NewIndustryName = $("#NewIndustryName").val();
        //    }
        //}

        var text = [];
        $("[name=IPRNumber1]").each(function () {
            text.push($(this).val())
        })

        //知识产权编号 
        var AchievementImageIPRNumber = [];
        $("#IPRNumberSelect .form-inline").each(function () {
            //动态添加的文本框的值
            var test1 = "";
            $(this).find("[name=IPRNumber1]").each(function () {
                test1 += $(this).val() + ","
            })
            if (test1 == null || test1 == "")//如果是空 前面不加逗号
            {
                test1 = test1.substring(0, test1.length - 1)
            }
            else {
                test1 = "," + test1.substring(0, test1.length - 1)
            }

            if ($(this).find("[name=IPRNumberTypeID]").is(":checked")) {
                AchievementImageIPRNumber.push({
                    "IPRNumberTypeID": $(this).find("[name=IPRNumberTypeID]").val(),
                    "IPRNumber": $(this).find("[name=IPRNumber]").val() + test1
                });
            }
        });

        //if(form1.IsCompetePrice == 1 && form1.CompeteEndDate){
        //    var endTime = new Date(form1.CompeteEndDate).getTime();
        //    if(endTime<= new Date().getTime()){
        //        Util.warning("show","竞价的截止时间应大于当前时间！");
        //        return;
        //    }
        //}

       

        //成果信息的表单
        var form1 = $('#achievementForm').serializeJson(); //将提交的表单数据转换成json数据格式
        var form2 = $('#IPRForm').serializeJson();
        var form3 = $('#valuationForm').serializeJson();
        var form4 = $('#contactForm').serializeJson();
        var message = "您的发布信息不完整，请完善以下信息：";
        if (form1.AchieveName == "" || form1.AchieveName == null)
        {
            message += "</br>请填写成果名称";
            //Util.warning("show", "请填写成果名称");
            //return;
        }
        if (form1.MaturityID == null || form1.MaturityID == "")
        {
            message += "</br>请选择成熟度";
          
        }
        if (form1.MaturityDesc == null || form1.MaturityDesc == "") {
            message += "</br>请填写成熟度说明";
         
        }
        if (form2.IPRDesc == null || form2.IPRDesc == "") {
            message += "</br>请填写知识产权说明";
           
        } 
        if (form2.Award == null || form2.Award == "") {
            message += "</br>请填写成果获奖情况";
           
        } 
        if (form3.RegistNumber == null || form3.RegistNumber == "") {
            message += "</br>请填写转化条件及成果应用事项";
          
        }
        
        if (form3.ExpectedTransPrice == null || form3.ExpectedTransPrice == "") {
            message += "</br>请填写预期交易价格";
          
        }
        if (form1.AchieveName == "" || form1.AchieveName == null || form1.MaturityID == null || form1.MaturityID == "" || form1.MaturityDesc == null || form1.MaturityDesc == "" || form2.IPRDesc == null || form2.IPRDesc == "" || form2.Award == null || form2.Award == "" || form3.RegistNumber == null || form3.RegistNumber == "" || form3.ExpectedTransPrice == null || form3.ExpectedTransPrice == "")
        {
            Util.warning("show", message);
            return;
        }
       

        //上传图片和视频 len1是相关视频  len2是主图  len3是相关图片
        var ImageVideo = [];
        var len1 = 0;
        var len2 = 0;
        $("#mediaBoxs").find(".media-responsive").each(function (i) {
            ImageVideo.push({ "ImageVideoID": $(this).data("id"), "Index": ImageVideo.length })
        })
        len1 = ImageVideo.length;

        $("#imgBoxs1").find(".img-responsive").each(function (i) {
            ImageVideo.push({ "ImageVideoID": $(this).data("id"), "Index": ImageVideo.length, "MainPicId": $(this).data("id") })
        })
        len2 = ImageVideo.length - len1;

        $("#imgBoxs").find(".img-responsive").each(function (i) {
            ImageVideo.push({ "ImageVideoID": $(this).data("id"), "Index": ImageVideo.length })
        })
        len3 = ImageVideo.length - len1 - len2;

        if (len2 < 1) {

            Util.warning("show", "请上传主图图片！");
            return;
        }
        if (len2 > 1) {

            Util.warning("show", "主图只能上传1张！");
            return;
        }
        //if (len3 < 1) {
        //    alert("请上传相关图片!")
        //    Util.warning("show", "请上传相关图片！");
        //    return;
        //}
        //if (len3 > 5) {
        //    alert("请确保上传的图片最多不超过5个！")
        //    Util.warning("show", "请确保上传的图片最多不超过5个！");
        //    return;
        //}
        //if (len1 < 1) {
        //    alert("请上传相关视频!")
        //    Util.warning("show", "请上传相关视频！");
        //}
        //竞价议价设置 0是竞价 1是议价
        //if (form1.IsDiscussPrice == '0') {
        //    form1.IsCompetePrice = 1;
        //} else {
        //    form1.IsCompetePrice = 0;
        //}


        var dataJson = $.extend({}, {
            "Achievement": $.extend({}, form1, form2, form3, form4, { "UserID": Util.getUserId() })
        }, { "Keywords": Keywords }, {
            "AchievementClassify": AchievementClassify,//成果分类
            "ImageVideo": ImageVideo,//-------------上传的东西取不到值？？？？-------------
            "AchievementImageIPRNumber": AchievementImageIPRNumber  //这是知识产权编号
        });

        console.info(dataJson);
        var json1 = JSON.stringify(dataJson);
        //alert("最终提交的是:" + json1)

     
        //-----开始提交--------
        var ach_id_new = $("#draft").val();
        $.ajax({
            url: Util.service.EditAchievement,
            type: 'POST',
            data: { jsonStr: JSON.stringify(dataJson), "achID": id},//参数
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                console.log(data)
                Util.pageinit();
                if (data.success === 1) {
                    $("#draft").val(data.resultData)
                    Util.success("show", "保存成功", function () {
                        //location.reload();
                        location.href = "/login/reviewManage/index.html";
                    });
                    //location.reload();
                    //location.href = "/login/reviewManage/index.html";
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



    //------------------初始化图片上传组件-------------------
    //主图上传
    $('#imgUpload1').fileupload({
        url: Util.service.UploadImageVideo,
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
                if (data.files[i].size > 2 * 1024 * 1024) {
                    tooLarge = true;
                }
            }
            if (tooLarge) {
                Util.warning("show", "文件大小不能超过2M");
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


    //相关图片上传
    $('#imgUpload').fileupload({
        url: Util.service.UploadImageVideo,
        limitMultiFileUploadSize: 5000000,
        limitMultiFileUploads: 1,
        maxFileSize: 5000000,
        headers: {
            FileDesc: "22",
            FileType: 0
        },
        minFileSize: 1,
        add: function (e, data) {
            var tooLarge = false;
            for (var i in data.files) {
                if (data.files[i].size > 2 * 1024 * 1024) {
                    tooLarge = true;
                }
            }
            if (tooLarge) {
                Util.warning("show", "文件大小不能超过2M");
                return false;
            }
            //上传前处理
            var len = $("#imgBoxs").find(".img-responsive").length;
            if (len < 5) {
                Util.pageLoading();
                data.submit();
            } else {
              
                Util.warning("show", "最多上传5张图片");
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
                //var a = json.stringify(data)
                //alert(a)

                $("#imgBoxs").append(template("imgTpl", data));
            } else {

                Util.error("show", data.message);
            }
            Util.pageinit();

        }
    });

    //清空图片的按钮
    $("#clearImgs").on("click", function (e) {
        console.info(e)
        e.preventDefault();
        $("#imgBoxs").html("");
    });



    //专利证书上传组件 同上
    $('#imgUpload2').fileupload({
        url: Util.service.UploadImageVideo,
        limitMultiFileUploadSize: 5000000,
        limitMultiFileUploads: 1,
        maxFileSize: 5000000,
        headers: {
            FileDesc: "22",
            FileType: 2
        },
        minFileSize: 1,
        add: function (e, data) {
            var tooLarge = false;
            for (var i in data.files) {
                if (data.files[i].size > 2 * 1024 * 1024) {
                    tooLarge = true;
                }
            }
            if (tooLarge) {
                Util.warning("show", "文件大小不能超过2M");
                return false;
            }
            //上传前处理
            var len = $("#imgBoxs2").find(".img-responsive").length;
            if (len < 5) {
                Util.pageLoading();
                data.submit();
            } else {
              
                Util.warning("show", "最多上传5张图片");
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

                $("#imgBoxs2").append(template("imgTpl", data));

            } else {

                Util.error("show", data.message);
            }
            Util.pageinit();

        }
    });

    $("#clearImgs2").on("click", function (e) {
        console.info(e)
        e.preventDefault();
        $("#imgBoxs2").html("");
    });




    //初始化视频上传组件
    $('#mediaUpload').fileupload({
        url: Util.service.UploadImageVideo,
        limitMultiFileUploadSize: 5000000,
        limitMultiFileUploads: 1,
        maxFileSize: 5000000,
        minFileSize: 1,
        headers: {
            'FileDesc': "11",
            'FileType': 1
        },
        add: function (e, data) {

            var tooLarge = false;
            for (var i in data.files) {
                if (data.files[i].size > 100 * 1024 * 1024) {
                    tooLarge = true;
                }
            }
            if (tooLarge) {
                Util.warning("show", "文件大小不能超过100M");
                return false;
            }
            var len = $("#mediaBoxs").find(".media-responsive").length;

            if (len < 5) {
                Util.pageLoading();
                data.submit();

            } else {
                Util.warning("show", "最多上传5个视频");
                return false;
            }

        },
        done: function (e, data) {
            var data = data.result;
            console.info(data);

            //上传完成处理返回值
            if (data.success) {

                data.resultData = JSON.parse(data.resultData);
                // for (var i in data.resultData) {
                //     html += '<div class="media-responsive"  data-id="' + data.resultData[i].ID + '><video src="' + data.resultData[i].Url + '" controls="controls"></video></div> ';
                // }

                $("#mediaBoxs").append(template("videoTpl", data));
            } else {

                Util.error("show", data.message);
            }
            Util.pageinit();

        }
    });

    $("#clearMedia").on("click", function (e) {
        e.preventDefault();
        $("#mediaBoxs").html("");
    })


    $("#mediaBoxs,#imgBoxs").on("click", ".glyphicon-remove", function () {
        $(this).parent().remove();
    })



    //word上传
    $('#wordUpload').fileupload({
        url: Util.service.UploadWord,
        limitMultiFileUploadSize: 5000000,
        limitMultiFileUploads: 1,
        maxFileSize: 5000000,
        minFileSize: 1,
        add: function (e, data) {

            var tooLarge = false;
            for (var i in data.files) {
                if (data.files[i].size > 10 * 1024 * 1024) {
                    tooLarge = true;
                }
            }
            if (tooLarge) {
                Util.warning("show", "文件大小不能超过10M");

                return false;
            }
            //上传前处理
            Util.pageLoading();
            data.submit();
        },
        done: function (e, data) {

            var data = data.result;

            //上传完成处理返回值
            if (data.success) {
                $("#wordFrame").show();
                var iframe = document.getElementById("wordFrame").contentDocument || document.frames["wordFrame"].document;
                iframe.body.innerHTML = data.resultData;
                $("#AchieveDesc").val(data.resultData);
                var height = iframe.documentElement.scrollHeight || iframe.body.scrollHeight;
                $("#wordFrame").css("height", height + 20);
            } else {
                $("#s").html("模板可能出现改动或删减，请使用指定模板进行上传！")
                Util.error("show", data.message);
            }
            Util.pageinit();


        }
    });


});



//保存草稿方法
function save() {
  
    Util.pageinit();
    var loginData = Util.getUserLoginData();
    //alert(JSON.stringify(loginData))//登录人信息
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

    var id = Util.getUrlParam("id")

    if (id) {
        $("#breadcrumb").find("li:last-child").find("em").html("编辑成果");
    }

    //成果分类
    var AchievementClassify = [];
    $("#ClassifyIdList").find("select").each(function () {
        if ($(this).val()) {
            AchievementClassify.push({ "ClassifyID": $(this).val() });
        }
    })

    //添加关键字
    var Keywords = [];
    $("#KeyNameList").find("input").each(function () {
        if ($(this).val()) {
            Keywords.push({ "KeyName": $(this).val() });
        }
    })

    var text = [];
    $("[name=IPRNumber1]").each(function () {
        text.push($(this).val())
    })

    //知识产权编号 
    var AchievementImageIPRNumber = [];
    $("#IPRNumberSelect .form-inline").each(function () {
        //动态添加的文本框的值
        var test1 = "";
        $(this).find("[name=IPRNumber1]").each(function () {
            test1 += $(this).val() + ","
        })
        if (test1 == null || test1 == "")//如果是空 前面不加逗号
        {
            test1 = test1.substring(0, test1.length - 1)
        }
        else {
            test1 = "," + test1.substring(0, test1.length - 1)
        }

        if ($(this).find("[name=IPRNumberTypeID]").is(":checked")) {
            AchievementImageIPRNumber.push({
                "IPRNumberTypeID": $(this).find("[name=IPRNumberTypeID]").val(),
                "IPRNumber": $(this).find("[name=IPRNumber]").val() + test1
            });
        }
    });

    //上传图片和视频 len1是相关视频  len2是主图  len3是相关图片
    var ImageVideo = [];
    var len1 = 0;
    var len2 = 0;
    $("#mediaBoxs").find(".media-responsive").each(function (i) {
        ImageVideo.push({ "ImageVideoID": $(this).data("id"), "Index": ImageVideo.length })
    })
    len1 = ImageVideo.length;

    $("#imgBoxs1").find(".img-responsive").each(function (i) {
        ImageVideo.push({ "ImageVideoID": $(this).data("id"), "Index": ImageVideo.length, "MainPicId": $(this).data("id") })
    })
    len2 = ImageVideo.length - len1;

    $("#imgBoxs").find(".img-responsive").each(function (i) {
        ImageVideo.push({ "ImageVideoID": $(this).data("id"), "Index": ImageVideo.length })
    })
    len3 = ImageVideo.length - len1 - len2;

  

    //成果信息的表单
    var form1 = $('#achievementForm').serializeJson(); //将提交的表单数据转换成json数据格式
    var form2 = $('#IPRForm').serializeJson();
    var form3 = $('#valuationForm').serializeJson();
    var form4 = $('#contactForm').serializeJson();
   
    var dataJson = $.extend({}, {
        "Achievement": $.extend({}, form1, form2, form3, form4, { "UserID": Util.getUserId() })
    }, { "Keywords": Keywords }, {
        "AchievementClassify": AchievementClassify,//成果分类
        "ImageVideo": ImageVideo,//-------------上传的东西取不到值？？？？-------------
        "AchievementImageIPRNumber": AchievementImageIPRNumber  //这是知识产权编号
    });

    console.info(dataJson);
    var json1 = JSON.stringify(dataJson);
    var ach_id_new = $("#draft").val();
   // ach_id_new = parseInt(ach_id_new)
    //-----开始提交--------
    $.ajax({
        url: Util.service.AddNewAchievement,
        type: 'POST',
        data: { jsonStr: JSON.stringify(dataJson), "achID": id, nid: ach_id_new,addid
        :"1"},//---------------------------参数-------------------------
        beforeSend: function () {
            Util.pageLoading();
        },
        success: function (data) {
            Util.pageinit();
            console.log(data)
            if (data.success === 1) {
               
                console.log(data.resultData)//新增的id
                $("#draft").val(data.resultData)
               // Util.success("show", "已成功保存到草稿箱！");
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
}





