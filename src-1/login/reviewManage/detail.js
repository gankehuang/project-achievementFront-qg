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
        $("#breadcrumb").find("li:last-child").find("em").html("查看成果详情");
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

    /*--begin基本信息获取*/
    $('form').find('input,textarea,select').attr('disabled', true);
    //$('input').find("checkbox").attr("disabled", true);
    $("input[type='radio']").attr("disabled", true); 
  
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
                if (data.success == 1) {
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
        console.log('parentId', $(this))
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
                        ClassifyIdList = JSON.parse(data.resultData.AchievementClassify);
                        var Achievement = JSON.parse(data.resultData.Achievement);
                        var ClassifyID_1 = (ClassifyIdList && ClassifyIdList.length > 0) ? parseInt(ClassifyIdList[0].ClassifyID) : '';
                        $("#ClassifyId1").val(ClassifyID_1);
                        console.info('********************', ClassifyID_1)
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
                                        ele_IPR += '<div> <input name="IPRNumber1" type="text" disabled="disabled" class="form-control" value="' + item + '"></div>';
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

});






