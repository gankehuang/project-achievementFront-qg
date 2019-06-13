/**
 * Created by lijuan on 2017/12/06.
 */
//定义初始化接口是否完成请求
var isInitOver = {};
var id = Util.getUrlParam("id") || '';
var page_from = 'add-pub';

$(function () {
    Util.pageinit();
    var loginData=Util.getUserLoginData();
   
    if(loginData.Type==0 && !loginData.IDCard){
        Util.warning("show","请先进行身份认证！",function () {
            window.location.href="/login/baseInfor/index.html";
        });
        return;
    }else if(loginData.Type==1 && !loginData.CorporateNumber){
        Util.warning("show","请先进行身份认证！",function () {
            window.location.href="/login/baseInfor/index.html";
        });
        return;
    }else if(loginData.IsApprove==1){
    }else if((loginData.IDCard||loginData.CorporateNumber)&&loginData.IsApprove==0){
        Util.warning("show","身份认证审核中……，请稍后再试！",function () {
            window.location.href="/login/baseInfor/index.html";
        });
        return;
    }else {
        Util.warning("show","系统异常！");
        return;
    }

    if(id){
        $("#breadcrumb").append('<li><a href="/login/publicityManage/list.html"><span class="icon icon-beaker"> </span><em>公示管理</em></a></li>');
        $('#breadcrumb').append('<li><a href="javascript:void(0);"><span class="icon icon-beaker"> </span><em>编辑公示</em></a></li>');
    }
    else{
        page_from = 'add-pub';
        $('#breadcrumb').append('<li><a href="javascript:void(0);"><span class="icon icon-beaker"> </span><em>公示发布</em></a></li>');
        $('#form_publicity').show();
        $('[name=TransferUnitName]').val(loginData.Name);
    }

    $('#myTab li:eq(0) a').tab('show');

    //下一步
    $('.btn-next').on('click', function (e) {
        e.preventDefault();
        var hrefName = $('#myTab li.active a').attr("href");
        if (!$(hrefName).find("form").valid()) {
            return ;
        } else {
            $('#myTab li.active a').parent().next().find("a").tab('show');
        }
    });

    // 选择成果来源交互响应
    // $("#home").on("change", "[name=AchievementSource]", function () {
    //     $('.AchievementSource').hide();
    //     $('#AchievementSource_'+$(this).val()).show();
    // });

    // 选择知识产权保护方式响应
    $("#home").on("change", "[name=IPRMode]", function () {
        $('.SelectFromIPRMode').hide();
        $('#IPRMode_'+$(this).val()).show();
    });

    //获取已发布成果
    getBasicInfo(Util.service.GetAllAchievementByUserID, "#SelectAchID", "请选择", {
        userId: loginData.ID
    }, null, function(){
        $('#SelectAchID').selectpicker({
          liveSearch: true,
          maxOptions: 1,
          // width: $('#SelectAchID').outerWidth(),
          style: 'btn-white'
        });
        $('#SelectAchID').removeClass('bs-select-hidden');
    });

    //获取归属省
    getBasicInfo(Util.service.GetAllProvince, ".SelectTransferUnitProvince", "请选择");
    getBasicInfo(Util.service.GetAllProvince, ".ContractRegisterProvince", "请选择");

    //时间选择
    $(".datetimepicker").datetimepicker({
        format: 'YYYY-MM-DD',
        dayViewHeaderFormat: 'YYYY-MM',
        useCurrent: false,
        sideBySide: true
    });

    //初始化图片上传组件
    $('#imgUpload').fileupload({
        url: Util.service.UploadPublicityImage,
        limitMultiFileUploadSize: 2*1024*1024,
        limitMultiFileUploads: 1,
        maxFileSize: 2*1024*1024,
        headers: {
            FileDesc: "22",
            FileType: 0
        },
        minFileSize: 1,
        add: function (e, data) {
            var tooLarge = false;
            for(var i in data.files){
                if(data.files[i].size > 2 * 1024 * 1024){
                    tooLarge = true;
                }
            }
            if(tooLarge){
                Util.warning("show","文件大小不能超过2M");
                return false;
            }
            //上传前处理
            var len = $("#imgBoxs").find(".img-responsive").length;
            if(len < 2){
                Util.pageLoading();
                data.submit();
            }else{
                Util.warning("show","只能上传1张图片");
                return false;
            }

        },
        done: function (e, data) {
            var data = data.result;
            //上传完成处理返回值
            if (data.success) {
                data.resultData = JSON.parse(data.resultData);
                console.log(data.resultData)
                // var html = '';
                // for (var i in data.resultData) {
                //     html += '<img src="' + data.resultData[i].Url + '"  class="img-responsive" data-id="' + data.resultData[i].ID + '"/>';
                // }
                $("#imgBoxs").append(template("imgTpl",data));
                $('#form_publicity .fileinput-button').hide();
            } else {
                Util.error("show", data.message);
            }
            Util.pageinit();

        }
    });

    // 初始化文件上传组件
    $('#contractFJUpload').fileupload({
        url: Util.service.UploadContractFJ + '?publicityID='+id,
        limitMultiFileUploadSize: 200*1024*1024,
        limitMultiFileUploads: 1,
        maxFileSize: 200*1024*1024,
        minFileSize: 1,
        add: function (e, data) {
            if(data.files[0].type !='application/pdf'){
                Util.warning("show","请上传PDF文档！");
                return false;
            }

            var tooLarge = false;
            for(var i in data.files){
                if(data.files[i].size > 200 * 1024 * 1024){
                    tooLarge = true;
                }
            }
            if(tooLarge){
                Util.warning("show","文件大小不能超过200M");
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
                data.resultData = JSON.parse(data.resultData);
                $('#contractFJUpload').attr('data-url', data.resultData[0].Url);
                showContractFJ(data.resultData[0].Url);
            } else {
                Util.error("show", data.message);
            }
            Util.pageinit();


        }
    });

    $("#clearImgs").on("click", function (e) {
        console.info(e)
        e.preventDefault();
        $("#imgBoxs").html("");
        $('#form_publicity .fileinput-button').show();
    });

    $("#mediaBoxs,#imgBoxs").on("click",".glyphicon-remove",function(){
        $(this).parent().remove();
        $('#form_publicity .fileinput-button').show();
    });

    // 保存
    $(".btn-save").on('click', function (e) {
        e.preventDefault();
        if(page_from == 'add-pub' || page_from == 'edit-pub'){
            savePublicity();
        }
        else if(page_from == 'edit-con'){
            saveContract();
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



/************************************************FUNCTION****************************************/
// 基本信息获取
function getBasicInfo(urlInfo, selectELe, defaultOption,requestData,value,callback) {
    var key = new Date().getTime();
    isInitOver[key] = false;
    $.ajax({
        url: urlInfo,
        type: 'POST',
        data: requestData,
        beforeSend: function () {
            Util.pageLoading();
        },
        success: function (data) {
            Util.pageinit();
            if (data.success === 1) {
                var resultData = JSON.parse(data.resultData);
                Util.getSelectData(selectELe, resultData, defaultOption, value);
                isInitOver[key] = true;
                if(callback){
                    callback();
                }
                getPublicityDetail();
            }
        },
        error: function () {
            Util.pageinit();
        }
    });
}

// 合同附件信息填充
function showContractFJ(url){
    url = url ? (url.indexOf('http://')==0 ? url : Util.filepath+url) : Util.image_default;
    var file_name = url.substring(url.indexOf('/File/FJ/')).substring('/File/FJ/'.length).split('_')[0];
    $('#UploadPath a').text(file_name).attr('href', url);
    $('#UploadPath').show();
    $('.upload-text').text('重新上传');
}

//编辑成果 数据回显
function getPublicityDetail() {
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

    if (!over) {
        console.info("init")
        $.ajax({
            url: Util.service.GetPublicityDetail,
            type: 'POST',
            data: { "PublicityID": id },
            beforeSend: function () {
                Util.pageLoading();
            },
            success: function (data) {
                Util.pageinit();
                if (data.success === 1) {
                    data.resultData = JSON.parse(data.resultData);
                    console.info(data.resultData);
                    if(data.resultData.Status == 0 || data.resultData.Status == 5){
                        page_from = 'edit-pub';
                        $('#form_publicity').show();
                    }
                    else if(data.resultData.Status == 2 || data.resultData.Status == 3 || data.resultData.Status == 6){
                        page_from = 'edit-con';
                        $('#form_contract').show();
                    }
                    // data.resultData.AchievementSource = data.resultData.AchID == 0 ? 1 : 0;
                    data.resultData.TransferMethod = data.resultData.TransferMethod && data.resultData.TransferMethod;
                    data.resultData.TransferUnitProperty = data.resultData.TransferUnitProperty && data.resultData.TransferUnitProperty;
                    data.resultData.AssigneeUnitProperty = data.resultData.AssigneeUnitProperty && data.resultData.AssigneeUnitProperty;
                    $("#form_publicity").formFieldValues(data.resultData);
                    $('#form_contract').formFieldValues(data.resultData);
                    // 图片
                    if(data.resultData.ImagePath){
                        var imagepath = data.resultData.ImagePath ? (data.resultData.ImagePath.indexOf('http://')==0 ? data.resultData.ImagePath : Util.filepath+data.resultData.ImagePath) : Util.image_default;
                        var imglist = {'resultData': [{'ID': 0, 'Url': imagepath}]};
                        $("#imgBoxs").html(template("imgTpl",imglist));
                        $('#form_publicity .fileinput-button').hide();
                    }
                    $('#SelectAchID').selectpicker('val', data.resultData.AchID);
                    // $('[name=AchievementSource][value='+data.resultData.AchievementSource+']').click();
                    // 知识产权保护方式
                    $('.SelectFromIPRMode').hide();
                    $('#IPRMode_'+data.resultData.IPRMode).show();
                    // 合同附件
                    if(data.resultData.UploadPath){
                        showContractFJ(data.resultData.UploadPath);
                    }
                } else {
                    console.error("系统错误");
                    Util.error("show",data.message);
                }
            },
            error: function () {
                console.error("系统错误");
                Util.pageinit();
            }
        });

    }

}

// 保存公示信息
function savePublicity(){
    // 检测填写的信息
    if (!$("#form_publicity").valid()) {
        return ;
    }

    var form = $('#form_publicity').serializeJson(); 
    if(!form.AssigneeUnitPhone.match(REG_phone)){
        Util.warning("show","请输入正确格式的受让单位联系人手机号！");
        return;
    }
    var ImageVideo = [];
    // 检测上传的图片信息
    var len=0;
    $("#imgBoxs").find(".img-responsive").each(function (i) {
        ImageVideo.push({ "ImageVideoID": $(this).data("id"), "Index": ImageVideo.length, "imgUrl":$(this).find('img').attr('src') })
    })
    len=ImageVideo.length;
    if(form.AchID == '' && len<1){
        Util.warning("show","请上传图片！");
        return;
    }
    if(len>1){
        Util.warning("show","只能上传一张图片！");
        return;
    }
    if(len > 0){
        form.ImagePath = ImageVideo[0].imgUrl.substring(ImageVideo[0].imgUrl.indexOf('/Pic/'));
    }
    var dataJson = $.extend({}, {
        "Publicity": $.extend({}, form, {
            "UserID": Util.getUserId()})
    });

    // 发送请求
    $.ajax({
        url: Util.service.AddNewPublicity,
        type: 'POST',
        data: { jsonStr: JSON.stringify(dataJson),"PublicityID":id, 'Type':0 },
        beforeSend: function () {
            Util.pageLoading();
        },
        success: function (data) {
            Util.pageinit();
            if (data.success === 1) {
                   Util.success("show","保存成功", function(){
                        location.href = 'list.html';
                   });
            } else {
                Util.error("show",data.message)
            }
        },
        error: function () {
            //服务器错误
            Util.pageinit();
            Util.error("show","服务器错误")
        }
    });
}

// 保存合同信息
function saveContract(){
    // 检测填写的信息
    if (!$("#form_contract").valid()) {
        return ;
    }

    var form_data = $('#form_contract').serializeJson();
    var file_path = $('#contractFJUpload').data('url');
    form_data.UploadPath = file_path.substring(file_path.indexOf('/FJ/'));
    // 发送请求
    $.ajax({
        url: Util.service.AddNewNotice,
        type: 'POST',
        data: {
            'PublicityID': id,
            'jsonStr': JSON.stringify(form_data)
        },
        beforeSend: function () {
            Util.pageLoading();
        },
        success: function (data) {
            Util.pageinit();
            if (data.success === 1) {
                   Util.success("show","保存成功", function(){
                        location.href = 'list.html';
                   });
            } else {
                Util.error("show",data.message);
            }
        },
        error: function () {
            //服务器错误
            Util.pageinit();
            Util.error("show","服务器错误")
        }
    });
}
