/**
 * Created by zhujianlin on 2017/6/4.
 */
var id = Util.getUrlParam("id");
var loginData=Util.getUserLoginData();

$(function () {
    (function () {
        if (id) {
            $.ajax({
                url: Util.service.GetPublicityDetailYK,
                type: 'POST',
                data: { "PublicityID": id },
                beforeSend: function () {
                    Util.pageLoading();
                },
                success: function (data) {
                    Util.pageinit();
                    if (data.success === 1) {
                        data.resultData = JSON.parse(data.resultData);
                       
                        $.extend(data.resultData, {
                            TransferMethod_2str: Publicity_TransferMethod_2str(data.resultData.TransferMethod),
                            TransferUnitProperty_2str: Publicity_TransferUnitProperty_2str(data.resultData.TransferUnitProperty),
                            AssigneeUnitProperty_2str: Publicity_AssigneeUnitProperty_2str(data.resultData.AssigneeUnitProperty),
                            IPRMode_2str: Publicity_IPRMode_2str(data.resultData.IPRMode),
                            TransactionMode_2str: Publicity_TransactionMode_2str(data.resultData.TransactionMode),
                            Status_2str: (function () {
                                if (data.resultData.Status == 1) {
                                    console.log(data.resultData)
                                    var date_approve = new Date(data.resultData.ApproveDate);
                                    var date_now = new Date();
                                    var countdown = Util.publicity_time - Math.floor((date_now.getTime() - date_approve.getTime()) / (24 * 3600 * 1000));
                                    return Publicity_Status_2str(data.resultData.Status) + '<span class="countdown">距离公示结束还有' + countdown + '天</span>';
                                }
                                return Publicity_Status_2str(data.resultData.Status);
                            })()
                        });
                        $("#PublicityDetail").fillContent(data.resultData);

                     

                        if (data.resultData.AchID) {
                            var CGArr = data.resultData.AchevementID.split(',');
                            var CGNameArr = data.resultData.AchName.split(',');
                            var CGA = '';
                            for(var i=0; i<CGArr.length; i++) {
                                CGA += '<a href="/achievementinfo.html?id='+ CGArr[i] +'" target="_blank" data-key="AchName">'+ CGNameArr[i] +'</a>&nbsp;&nbsp;'
                            }
                            //console.log('aaaaaaaaaa', CGA);
                            //$('.relatedAch a').attr('href', '/achievementinfo.html?id=' + data.resultData.AchID);
                            $('#achievement').html(CGA);
                            $('.relatedAch').show();
                        }
                        var img_url = data.resultData.ImagePath ? (data.resultData.ImagePath.indexOf('http://') == 0 ? data.resultData.ImagePath : Util.filepath + data.resultData.ImagePath) : Util.image_default;
                        $('#PublicityImage').attr('src', img_url);

                        //判断是否是管理员或者是创建者
                        if (loginData && (loginData.IsAdmin || loginData.ID == data.resultData.CreatUserID)) {
                            //zmm改动 公示不显示 知识产权部分转让金额 商业秘密或者技术服务部分转让金额
                            //if (data.resultData.IPRAmount || data.resultData.OtherAmount) {
                            //    $('#contract_amount .amount-part').show();
                            //}
                            if (data.resultData.LastIPRAmount || data.resultData.LastOtherAmount) {
                                $('.block-contract .amount-part').show();
                            }
                            if (data.resultData.UploadPath) {
                                var url = data.resultData.UploadPath;
                                url = url ? (url.indexOf('http://') == 0 ? url : Util.filepath + url) : Util.image_default;
                                var file_name = url.substring(url.indexOf('/File/FJ/')).substring('/File/FJ/'.length).split('_')[0];
                                $('.block-contract').append('<p>合同附件：<a href="' + url + '">' + file_name + '</a></p>');
                            }
                            $('.Contacts').show();
                            $('.Phone').show();
                            $('.TelePhone').show();
                            $('.Email').show();
                            $('.Address').show();
                            $('.PostCode').show();
                        }
                        $('.IPRMode_' + data.resultData.IPRMode).show();

                        showDissent(data.resultData.Status);
                        if (data.resultData.Status == 2 && data.resultData.ReviewContent) {
                            $('#block_evaluate_content .content').text(data.resultData.ReviewContent);
                            $('#block_evaluate_content').show();
                        }

                        if (data.resultData.Status == 4) {
                            $('#contract_amount').hide();
                            $('.block-contract').show();
                        }
                        console.log(data.resultData)
                        //zmm改动 管理员显示合同金额
                        console.log(loginData.IsAdmin)

                        if (loginData.IsAdmin) {
                            $("#contractValue").css("display", "block");  //用户登录显示合同金额
                            console.log(data.resultData.LastContractAmount)
                            console.log(data.resultData.IPRAmount)
                            //为了和公示详情显示一致 判断
                            if (data.resultData.LastContractAmount)
                            {
                                $("#money").html(data.resultData.LastContractAmount)
                            }
                            else
                            {
                                //xll  原为ipramout
                                $("#money").html(data.resultData.ContractAmount)
                            }
                           
                        }

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
    } ());
    // 提交异议
    $('.btn-submit').click(function (e) {
        e.preventDefault();
        var form = $('#dissent');
        if (!form.valid()) {
            return false;
        }
        if (loginData) {
            //if (loginData.IsApprove == 1 && status == 1) {
            if (loginData.IsApprove == 1) {
                // 发送请求
                $.ajax({
                    url: Util.service.DissentPublicity,
                    type: 'POST',
                    data: {
                        'userID': loginData.ID,
                        'PublicityID': id,
                        'VisitID': manageVisitID,
                        'content': $('#dissent [name=content]').val().trim()
                    },
                    beforeSend: function () {
                        Util.pageLoading();
                    },
                    success: function (data) {
                        Util.pageinit();
                        if (data.success === 1) {
                            Util.success("show", "我们已收到您提交的意见，感谢您的支持！<br>我们将慎重考虑您的意见！", function () {
                                $('#dissent [name=content]').val('');
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
            }
            else {
                Util.warning("show", "用户未审核！");
            }
        }
        else {
            Util.warning("show", "请先登录！");
            window.location.href = "/index.html"
        }
    });


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
        min: $.validator.format("请输入一个最小为 {0} 的值")
    });

});


/*********************************FUNCTION********************************/
function showDissent(status){
    if(loginData){
        if(loginData.IsApprove == 1 && status == 1){
            $('#block_dissent_submit').show();
        }
        var userID = loginData.ID;
        if(loginData.IsAdmin == 1){
            userID = 0;
        }
        // 获取异议列表
        $.ajax({
            url: Util.service.GetDissentPublicity,
            //url: Util.service.GetDissentPublicityYK,
            type: 'POST',
            data: {
                'PublicityID': id,
                'VisitID': manageVisitID,
                'userID': userID
            },
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                if (data.success === 1) {
                    data.resultData = JSON.parse(data.resultData);
                    if(data.resultData.length > 0){
                        $("#dissentlist").html(template("template_dissentlist",data));
                        $('#block_dissent_list').show();
                    }
                } else {
                    Util.error("show",data.message)
                }
            },
            error: function () {
                //服务器错误
                Util.pageinit();
                Util.error("show","服务器错误");
            }
        });
    }
}