/**
 * Created by wangyinping on 2017/6/4.
 */

var id = Util.getUrlParam("id");
var classify_path = {};
var loop_count = 0;

$(function(){

    Util.pageinit();
    var provinceID = Util.getUrlParam("provinceID");
    var OrganizationName = Util.getUrlParam("OrganizationName");
    var url = Util.service.GetAllApprovedInTradeAchievement;
    if(provinceID){
        url = Util.service.GetAllAchievemrntByProvince;
    }else if(id && OrganizationName){
        url = Util.service.GetAllOrganizationAchievement;
    }else if(id){
        url = Util.service.GetAllAchievemrntByClassify;
        classify_path.ID = id;
        classify_path.Breadcrumb = [];
        if(id == 0){
            classify_path.ID = 0;
            classify_path.ClassfyName = '种类';
        }
        else{
            classify_path.Breadcrumb.push({
                ID: '0',
                ClassfyName: '种类'
            });
        }
    }

    var retrievalInfo = {};
    //table:初始化列表
    var drawTable = $("#dataTable").DataTable({
        // "pageLength": Util.perPageLength,
        "pageLength": 12,
        "processing": true,
        "serverSide": true,
        "paginate": true,
        "info": false,
        "lengthChange": false,
        "ordering": true,
        "searching": false,
        "ajax": {
            "url": url,
            "type": "POST",
            "dataSrc": "data",
            "dataType": "json",
            "data": function (v) {
                if(provinceID){
                    v.provinceID = provinceID;
                }
                if(id){
                    v.classifyID = id;
                }
                if(OrganizationName){
                    v.organization = OrganizationName;
                }
                v.VisitID = hbVisitID;
                v.retrievalInfo = JSON.stringify(retrievalInfo);
                return v;
            }
        }, "columns": [
            {
                "data": "TechType",
                'orderable': false,
                "className": "text-center",
                "render": function (data,type, full) {
                    // console.log(full)
                    return template("resultTpl",full);
                }
            },

        ],
    });

    var keyword = Util.getUrlParam("k");

    $(".tab-list .tab-title").on("click",function(){
        var index = $(this).data("index");
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        var $tab = $(this).parent().siblings(".tab-box").find("[data-index="+index+"]");
        $tab.siblings().hide();
        $tab.show();

    });


    //获取全部种类大类
    $.ajax({
        url: Util.service.GetAllClassifyMainMenu,
        type: "POST",
        data: {
            VisitID: hbVisitID
        },
        beforeSend: function () {
            Util.pageLoading();
        },
        success: function (data) {
            Util.pageinit();
            if (data.success === 1) {
                data.resultData = JSON.parse(data.resultData);
                if(id == 0){
                    classify_path.ChildClassfy = data.resultData;
                    showBreadcrumb();
                }
                for(var i in data.resultData){
                    if(data.resultData[i].ChildClassfy){
                        data.resultData[i].ChildClassfy = JSON.parse(data.resultData[i].ChildClassfy);
                        if(data.resultData[i].ID == id){
                            classify_path.ClassfyName = trimClassifyname(data.resultData[i].ClassfyName);
                            classify_path.ChildClassfy = data.resultData[i].ChildClassfy;
                            showBreadcrumb();
                        }
                    }
                }
                $("#classListNav").html(template("classTemplate",data));
                $("#unitListNav").html(template("classTemplate",data));
                $("#classListNav").find("a.leaf").each(function(index, item){
                    var $self = $(this);
                    var search_id = $(this).data("id");
                    var search_name = trimClassifyname($self.text());
                    var main_id = $(this).parent().parent().siblings('a').attr('data-id');
                    var main_name = trimClassifyname($(this).parent().parent().siblings('a').text());
                    $.ajax({
                        url: Util.service.GetAllClassifySecondMenu,
                        type: "POST",
                        data:{classifyID:search_id},
                        success: function (data) {
                            Util.pageinit();
                            if (data.success === 1) {
                                data.resultData = JSON.parse(data.resultData);

                                if(data.resultData && data.resultData.length > 0 ){
                                    traversalChildClassify({
                                        search_id: search_id,
                                        search_name: search_name,
                                        main_id: main_id,
                                        main_name: main_name,
                                        path: new Array()
                                    }, {
                                        ChildClassfy: data.resultData
                                    });
                                    $self.parent().addClass("parent-leaf");
                                    $self.attr("data-content",template("contentTemplate",data));
                                    $self.popover({
                                        html:true,
                                        placement:"right",
                                    });
                                }

                                if(search_id == id){
                                    classify_path.ClassfyName = search_name;
                                    classify_path.Breadcrumb.push({
                                        ID: main_id,
                                        ClassfyName: main_name
                                    });
                                    if(data.resultData && data.resultData.length>0){
                                        classify_path.ChildClassfy = data.resultData;
                                    }
                                    showBreadcrumb();
                                }

                                if(main_id == id){
                                    for(i in classify_path.ChildClassfy){
                                        if(classify_path.ChildClassfy[i].ID == search_id && data.resultData && data.resultData.length>0){
                                            classify_path.ChildClassfy[i].ChildClassfy = data.resultData;
                                            break;
                                        }
                                    }
                                    showBreadcrumb();
                                }
                            }else{
                                // Util.error("show",data.message);
                                console.log(data.message)
                            }
                        },
                        error: function () {
                            Util.error("show","系统异常");
                        }
                    });
                });

                $("#unitListNav").find("a.leaf").each(function(){
                    var $self = $(this);
                    var id = $(this).data("id");
                    $.ajax({
                        url: Util.service.GetAllOrganizationMenu,
                        type: "POST",
                        data:{classifyID:id, VisitID: hbVisitID},
                        success: function (data) {
                            Util.pageinit();
                            if (data.success === 1) {
                                data.resultData = JSON.parse(data.resultData).slice(0,15);
                                data.classifyID = id;
                                for(var i in data.resultData){
                                    if(data.resultData[i].ChildClassfy){
                                        data.resultData[i].ChildClassfy = JSON.parse(data.resultData[i].ChildClassfy);
                                    }
                                }
                                if(data.resultData && data.resultData.length > 0 ){
                                    $self.parent().addClass("parent-leaf");
                                    $self.attr("data-content",template("unitTemplate",data));
                                    $self.popover({
                                        html:true,
                                        placement:"right",
                                    });
                                }
                            }else{
                                // Util.error("show",data.message);
                                console.log(data.message);
                            }
                        },
                        error: function () {
                            Util.error("show","系统异常");
                        }
                    });
                });
            }else{
                Util.error("show",data.message);
            }
        },
        error: function () {
            Util.pageinit();
            Util.error("show","系统异常");
        }
    });


    $("#classNav").on("mouseenter",".parent-leaf",function(){
        $(this).find("a").popover("show");
    });

    $("#classNav").on("mouseleave",".parent-leaf",function(){
        setTimeout(classNav_mouseleave($(this)), 200);
    })


    
    //获取全部适宜区域
    $.ajax({
        url: Util.service.GetAllProvinceSYPub,
        type: 'POST',
        data: {'classifyID': id},
        beforeSend: function () {
            Util.pageLoading();
        },
        success: function (data) {
            Util.pageinit();
            if (data.success === 1) {
                data.resultData = JSON.parse(data.resultData);
                //console.log(data.resultData);
                var html = "";
                data.resultData.forEach(function (v) {  
                    //console.log(v); 
                    html += '<li><a href="javascript:void(0)" id="'+ v.ID +'">'+ v.Province +'</a></li>' 
                });
                $("#area").html(html);
            } else {
                console.error("系统错误");
            }
        },
        error: function () {
            console.error("系统错误");
            Util.pageinit();
        }
    });

    //获取拥有人
    $.ajax({
        url: Util.service.GetUserByTypeAndSta,
        type: 'POST',
        data: { VisitID: hbVisitID, 'classifyID': id },
        beforeSend: function () {
            Util.pageLoading();
        },
        success: function (data) {
            Util.pageinit();
            if (data.success === 1) {
                //var data1 = JSON.parse(data.data);
                //console.log(data.resultData);
                var arr = JSON.parse(data.resultData);
                var arr1 = JSON.parse(arr.data);
                //console.log(arr1);
                var html1 = "";
                arr1.forEach(function (v) {  
                    //console.log(v); 
                    html1 += '<li><a href="javascript:void(0)" id="'+ v.Name +'">'+ v.Name +'</a></li>' 
                });
                $("#owner").html(html1);
            } else {
                console.error("系统错误");
            }
        },
        error: function () {
            console.error("系统错误");
            Util.pageinit();
        }
    });
    

    //点击适宜区域、拥有人右侧加号展开收缩
    $(".classify div .span").on('click', function() {
        if( $(this).html() == "+" ) {
            var h = $(this).prev().css("height", "auto").height();
            $(this).prev().css("height", "30px");
            var H = h + "px";
            $(this).prev().animate({height: H});
            $(this).html("-");
        }else {
            $(this).prev().animate({height:"30px"});
            $(this).html("+");
        }
        
    })

    //点击字体颜色改
    /*$(".classify div ul li").on('click', function() {
        $(this).css("color", "#F9983F");
        $(this).siblings().css("color", "#999999")
    })*/


    //点击适宜区域
    $("#area").click(function(e){
        var content = $(e.target).attr("id");  //获取当前点击id
        var text = $(e.target).html();   //获取内容

        if( text.length < 10 ) {
            //点击改变颜色
            $("#area a").each(function(){
                $(this).css("color", "#F9983F");
            })
            $(e.target).css("color", "red");

            var ownerA = $("#ownerBs").attr("a");  //获取拥有人标识a属性
            if( ownerA != "" ){
                retrievalInfo = { Provinces: content , OwnerOrganization: text };   
                drawTable.draw(); 
            }else if( ownerA == "" ){
                retrievalInfo = { Provinces: content };   
                drawTable.draw();
            }

            $("#areaBs").css("display", "block");
            $("#areaBs").attr("a", content);
            $("#areaBs a").html(text);
        }
        
        
    })


    //拥有人
    $("#owner").click(function(e){
        var content = $(e.target).attr("id");
        var text = $(e.target).html();   //获取内容
        
        if( text.length < 50 ){
            //点击改变颜色
            $("#owner a").each(function(){
                $(this).css("color", "#F9983F");
            })
            $(e.target).css("color", "red");

            var areaA = $("#areaBs").attr("a");  //获取区域标识a属性
            if( areaA != "" ){
                retrievalInfo = { Provinces: areaA , OwnerOrganization: text };   
                drawTable.draw(); 
            }else if( areaA == "" ){
                retrievalInfo = { OwnerOrganization: text  };   
                drawTable.draw();
            }

            $("#ownerBs").css("display", "block");
            $("#ownerBs").attr("a", content);
            $("#ownerBs a").html(text);
        }
        
    })

    //点击标识删除
    $("#identifying div").on("click", function(e){
        var label = $(e.target).prop("tagName");   //console.log(label);
        
        $(this).css("display", "none");
        $(this).attr("a", "");  //清空属性a

        var sibs = $(this).siblings(); //获取兄弟节点
        var sib1 = sibs.eq(0).attr("a");
        console.log(sib1);

        var identifyingId = $(this).attr("id");  //获取当前点击的id
        if(identifyingId == "areaBs"){  //当点击的是区域标识
            if(sib1 != "" ){
                retrievalInfo = { OwnerOrganization: sib1 };
                drawTable.draw();
            }else if(sib1 == "" ){
                retrievalInfo = {};
                drawTable.draw();
            }
            //变成原色
            $("#area a").each(function(){   
                $(this).css("color", "#F9983F");
            })
        }else if(identifyingId == "ownerBs"){  //当点击的是拥有人标识
            if(sib1 != "" ){
                retrievalInfo = {  Provinces: sib1 };
                drawTable.draw();
            }else if(sib1 == "" ){
                retrievalInfo = {};
                drawTable.draw();
            }
            //变成原色
            $("#owner a").each(function(){   
                $(this).css("color", "#F9983F");
            })
        }
    })

    

    //获取地域列表
    //$.ajax({
    //    url: Util.service.GetAllProvinceSYPub,
    //    type: "POST",
    //    success: function (data) {
    //        Util.pageinit();
    //        if (data.success === 1) {
    //            data.resultData = JSON.parse(data.resultData);
    //            $("#areaListNav").html(template("areaTemplate",data));
    //        }else{
    //            Util.error("show",data.message);
    //        }
    //    },
    //    error: function () {
    //        Util.error("show","系统异常");
    //    }
    //});



    //点击分类导航
    $("#classNav").on("click","a",function(){
        if($(this).data("provinceid")){
            window.location.href = "/notification.html?provinceID="+$(this).data("provinceid");
        }else if($(this).data("id") && $(this).data("organizationname")){
            window.location.href = "/notification.html?id="+ $(this).data("id") + "&OrganizationName="+$(this).data("organizationname");
        }else if($(this).data("id")){
            window.location.href = "/notification.html?id="+ $(this).data("id");
        }
    });

});


/************************************** FUNCTION *******************************************/
function trimClassifyname(name){
    if(name.indexOf('(') > 0){
        name = name.substring(0, name.indexOf('('));
    }
    return name;
}

function traversalChildClassify(baseinfo, parent_Classfy){
    var child_Classfy = parent_Classfy.ChildClassfy;
    if(child_Classfy && child_Classfy!='[]' && child_Classfy.length > 0){
        var i_item = null;
        for(i in child_Classfy){
            if(i == 0){
                baseinfo.path.push({
                    ID: parent_Classfy.ID,
                    ClassfyName: parent_Classfy.ClassfyName
                });
            }
            i_item = child_Classfy[i];
            if(i_item.ChildClassfy && i_item.ChildClassfy!='[]'){
                i_item.ChildClassfy = JSON.parse(i_item.ChildClassfy);
            }
            if(i_item.ID == id){
                classify_path.ClassfyName = i_item.ClassfyName;
                classify_path.Breadcrumb.push({
                    ID: baseinfo.main_id,
                    ClassfyName: baseinfo.main_name
                },{
                    ID: baseinfo.search_id,
                    ClassfyName: baseinfo.search_name
                });
                for(i_path in baseinfo.path){
                    classify_path.Breadcrumb.push({
                        ID: baseinfo.path[i_path].ID,
                        ClassfyName: baseinfo.path[i_path].ClassfyName
                    });
                }
                classify_path.ChildClassfy = i_item.ChildClassfy;
                showBreadcrumb();
            }
            else if(i == child_Classfy.length-1){
                baseinfo.path.pop();
            }
            traversalChildClassify(baseinfo, i_item);
        }
    }
}

function showBreadcrumb(){
    console.log('classify_path', classify_path);
 
    if (classify_path.ClassfyName == null || classify_path.ClassfyName=="")
    {
        $(".classify").css("display", "none");
    }
    else
    { 
        $('.classify-path').html(template('classPathTemplate', classify_path)).slideDown();
    }
   
}
