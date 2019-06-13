/**
 * Created by zhujianlin on 2017/5/21.
 */

var REG_phone = '^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$';

$(function () {

    user = Util.getUserLoginData();
    var url = window.location.href;
   //加载控制台菜单栏
    if (url.indexOf("login") != -1 && user && user.Type==0) {
        $(".nav-sidebar[role=2]").show();
        $(".sidebar").scrollTop(1);
        if($(".sidebar").scrollTop()===0){
            $(".sidebar").css('width','219px');
            $(".main").css("margin-left","219px");
        }
    }else if (url.indexOf("login") != -1 && user && user.Type==1) {
        $(".nav-sidebar[role=3]").show();
        $(".sidebar").scrollTop(1);
        if($(".sidebar").scrollTop()===0){
            $(".sidebar").css('width','219px');
            $(".main").css("margin-left","219px");
        }
    }
    else if (url.indexOf("admin") != -1 && user && user.IsAdmin) {
        $(".nav-sidebar[role=1]").show();
        $(".sidebar").scrollTop(1);//设置 <div> 元素中滚动条的垂直偏移
        if($(".sidebar").scrollTop()===0){
            $(".sidebar").css('width','219px');
            $(".main").css("margin-left","219px");
        }
    }else if(url.indexOf("login") != -1 || url.indexOf("admin") != -1){
        Util.warning("show","请先登录！",function () {
            window.location.href="/index.html";
        });
    }

    var colBodyHeight=$(window).height()-268;
    $(".col-body").css("min-height",colBodyHeight);

    //登录那块的菜单栏
    if(user){
        $(".gotoAdmin").show();
        $('#loginSuccess .username').text(user.LoginName);
        $("#loginSuccess").show();
        $('#loginHint').hide();
        $("#loginForm").hide();
        if(user && user.IsAdmin){
            $("#gotoFavorite").hide();
        }
    }
    $("#gotoAdmin").on("click",function(e){
        e.preventDefault();
        gotoAdmin("Backlog");
    })
    $("#gotoAchieve").on("click",function(e){
        e.preventDefault();
        gotoAdmin("notification");
    })
    $("#gotoRquire").on("click",function(e){
        e.preventDefault();
        gotoAdmin("requireMain");
    })
    $("#gotoTrade").on("click",function(e){
        e.preventDefault();
        gotoAdmin("tradingCenter");
    })
    $("#gotoFavorite").on("click",function(e){
        e.preventDefault();
        gotoAdmin("favorite");
    })

    function gotoAdmin(fileName){
        var user = Util.getUserLoginData();
        if(user && user.IsAdmin){
            if($(this).find("a").length > 0){
                window.location.href = "/admin/"+fileName+"/index.html"
            }else{
                window.open("/admin/"+fileName+"/index.html")
            }

        } else if (user) {
            if ($(this).find("a").length > 0) {
                window.location.href = "/login/" + fileName + "/index.html"
            } else {
                window.open("/login/" + fileName + "/index.html")
            }

        }
        else {
            Util.warning("show", "请先登录！", function () {
                if (location.pathname == '/index.html' || location.pathname == '/') {
                    //location.reload();
                    //alert(location.pathname);
                    $("#loginSuccess").hide();
                    $("#loginForm").show();
                }
                else {
                    window.location.href = "/index.html";
                }
            });
        }
    }

    // 微信公众号
    // $('#showQR').mouseover(function(){
    //     $('.QR-code').show();
    // });
    // $('#showQR').mouseout(function(){
    //     $('.QR-code').hide();
    // });

    // 搜索框
    $("#search").on("click",function(e){
        e.preventDefault();
        var text = $(this).siblings("input").val();
        if(!text){
            return;
        }
        window.location.href = "/search.html?k="+ text;
    })




    $(document).on("mouseenter",".pop-person",function(e){
        e.preventDefault();
        e.stopPropagation();//该方法将停止事件的传播，阻止它被分派到其他 Document 节点
        var id = $(this).attr("data-id");
        var $self = $(this);
        if(!$(this).attr("data-content")){
            $.ajax({
                url: Util.service.GetUserInfoByID,
                type: 'POST',
                data:{"ID":id},
                success: function (data) {
                    Util.pageinit();
                    if (data.success === 1) {
                         var resultData = JSON.parse(data.resultData);
                        $self.attr("data-content",template("popTpl",resultData));
                        $self.popover({
                            html:true,
                            placement:"right",
                        });
                        $self.popover("show");
                    }else{
                        console.error("系统错误");
                        Util.error("show",data.message)
                        Util.pageinit();
                    }
                },
                error: function () {
                    console.error("系统错误")
                    Util.pageinit();
                }
            });
        }else{
            $self.popover("show");
        }


    })


    $(document).on("mouseleave",".pop-person",function(e){
        $(this).popover("hide");
    })


    //退出登录
    $('#logOut').on('click',function (e) {
        e.preventDefault();
        Util.setUserLogout();
        window.location.href="/index.html";
    })
    //当用户滚动指定的元素时，会发生 scroll 事件
 $('body').scroll(function () {
        if ($('body').scrollTop() > 600){
            $('div.go-top').show();
        }
        else{
            $('div.go-top').hide();
        }
    });
    $('div.go-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1000);
    });
});


// 查询结果填充到页面
$.fn.fillContent = function(data){
    for(key in data){
        this.find('[data-key='+key+']').html(data[key] || '未知');
    }
};


$.fn.formFieldValues = function (data) {
    var els = this.find(':input').get();

    if (arguments.length === 0) {
        return this.serializeJson();
    } else {
        $.each(els, function () {
            if (this.name && data[this.name]) {
                var names = data[this.name];
                var $this = $(this);
                if (Object.prototype.toString.call(names) !== '[object Array]') {
                    names = [names]; //backwards compat to old version of this code
                }
                //console.info(this.type + ","  + names)
                if (this.type == 'checkbox' || this.type == 'radio') {
                    var val = $this.val();
                    var found = false;
                    var arr = names[0].toString().split(','); //后台传来的是逗号分隔的字符串

                    for (var j = 0; j < arr.length; j++) {
                        if (arr[j] == val) {
                            found = true;
                            break;
                        }
                    }
                    $this.prop("checked", found);
                } else {
                    $this.val(names[0]);
                }
                $this.trigger('change'); //触发修改事件
            }
        });
        return this;
    }
};


/**
 * 序列化表单内容为json对象
 * @returns {{object}}
 */
$.fn.serializeJson = function (data) {
    var serializeObj = data ? data : {};
    $(this.serializeArray()).each(function () {
        if (serializeObj[this.name]) {
            //修正name相同的checkbox多选框取值问题，逗号分隔的字符串
            serializeObj[this.name] += ',' + $.trim(this.value);
        } else {
            serializeObj[this.name] = $.trim(this.value);
        }
    });
    return serializeObj;
};


/**
 * 重置查询(全部)
 * @returns {{object}} 查询条件
 */
$.fn.resetSearch = function () {
    var $form = $(this);

    //重置搜索表单
    $form.get(0).reset();

    return {};
};

//响应状态码
$.ajaxSetup({
    dataType: 'json',
    xhrFields: {
        withCredentials: true
    },
    crossDomain: true,
    statusCode: {
        600: function () {
            Util.warning("show", "请先登录！", function () {
                window.location.href = "/index.html";
            });
            Util.setUserLogout();
        },
        500: function (data) {
            console.error(data);
        }
    }
});



$.ajaxSetup({
    type: 'POST',
    dataType: 'json',
    cache: false,
    headers: {
    },
    // contentType: 'application/json; charset=utf-8', //使用json提交
    beforeSend: function (jqXHR, settings) {
        jqXHR.url = settings.url;
        jqXHR.postData = settings.data;
    },
    success: function (data, textStatus, jqXHR) {
    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);

    },
    complete: function (jqXHR) {

    }
});



// $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
//
// })



var hbVisitID = 1;
console.log(hbVisitID)

//获取localStorage中的数据
var name = localStorage.getItem("user");
console.log(name)

var manageVisitID = null;
if( name && name!='null'){
    manageVisitID = JSON.parse(name).VisitID;   //用户信息中获取的VisitID
}



// 获取当前日期(年月日)
function getNowTime(type, seperator1, seperator2){
    var date = new Date();
    seperator1 = seperator1 || "-";
    seperator2 = seperator2 || ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    if(type == 'time'){
        currentdate += " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
    }
    return currentdate;
}

// 计算N天后的日期
function AddDays(date,days){
    var nd = new Date(date);
    nd = nd.valueOf();
    nd = nd + days * 24 * 60 * 60 * 1000;
    nd = new Date(nd);
    var y = nd.getFullYear();
    var m = nd.getMonth()+1;
    var d = nd.getDate();
    if(m <= 9) m = "0"+m;
    if(d <= 9) d = "0"+d; 
    var cdate = y+"/"+m+"/"+d;
    return cdate;
}

// 日期转年月日格式
function date2normal(date, split_str){
    split_str = split_str || '/';
    var date_arr = date.split(split_str);
    return date_arr[0] + '年' + date_arr[1] + '月' + date_arr[2] + '日';
}

// 比较日期
function CompareDate(d1,d2)
{
    if(typeof d2 == 'undefined'){
        d2 = getNowTime();
    }
    return ((new Date(d1.replace(/[年,月,日,-]/g,"\/"))) - (new Date(d2.replace(/[年,月,日,-]/g,"\/"))));
}


/************************公示公告相关****************************/
// 转换“转化方式”
function Publicity_TransferMethod_2str(code){
    if(code == undefined || code == null){
        return '';
    }
    var matchup = {
        '1': '独家许可',
        '2': '许可',
        '3': '转让',
        '4': '作价投资',
        '5': '质押融资'
    };
    return matchup[code.toString()];
}

// 转换“转让单位性质”
function Publicity_TransferUnitProperty_2str(code){
    if(code == undefined || code == null){
        return '';
    }
    var matchup = {
        '1': '科研机构',
        '2': '涉农高校',
        '3': '企业',
        '4': '个人'
    };
    return matchup[code.toString()];
}

// 转换“受让单位性质”
function Publicity_AssigneeUnitProperty_2str(code){
    if(code == undefined || code == null){
        return '';
    }
    var matchup = {
        '1': '企业',
        '2': '合作社',
        '3': '科研机构',
        '4': '涉农高校',
        '5': '个人'
    };
    return matchup[code.toString()];
}

// 转换“知识产权保护方式”
function Publicity_IPRMode_2str(code){
    if(code == undefined || code == null){
        return '';
    }
    var matchup = {
        '0': '无',
        '1': '专利',
        '2': '植物新品种权',
        '3': '规划类'
    };
    return matchup[code.toString()];
}

// 转换“公示状态”
function Publicity_Status_2str(code){
    if(code == undefined || code == null){
        return '';
    }
    var matchup = {
        '0': '待审核',
        '1': '公示中',
        '2': '公示结束',
        '3': '公告待审核',
        '4': '公告', 
        '5': '审核未通过',
        '6': '审核未通过'
    };
    return matchup[code.toString()];
}

// 转换“价格确定方式”
function Publicity_TransactionMode_2str(code){
    if(code == undefined || code == null){
        return '';
    }
    var matchup = {
        '1': '协议定价',
        '2': '挂牌交易',
        '3': '拍卖'
    };
    return matchup[code.toString()];
}

// 成果种类侧边栏遮罩层隐藏
function classNav_mouseleave($ele)
{
    return function()
    {
      $ele.find("a").popover("hide");
    }
}