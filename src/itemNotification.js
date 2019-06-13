/**
 * Created by wangyinping on 2017/6/4.
 */

var type = Util.getUrlParam("type");
var classify_path = {};
var loop_count = 0;

$(function(){

    Util.pageinit();
    var provinceID = Util.getUrlParam("provinceID");
    var OrganizationName = Util.getUrlParam("OrganizationName");

    if(type == 1) {
        var url = Util.service.GetAchievementForNationalAward;
    }else if(type == 2) {
        var url = Util.service.GetAchievementForHundredItems;
    }else if(type == 3) {
        var url = Util.service.GetAchievementForThousandItems;
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
                v.draw = 0;
                v.VisitID =  hbVisitID;
                if(type == 1) {
                    v.isgjj =  's';
                }else if(type == 2) {
                    v.isbx =  's';
                }else if(type == 3) {

                }
                
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
