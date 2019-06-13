
//点击加号按钮添加文本框
function funclick(btn) {
    var btnid = $(btn).attr("id")
    if (btnid == "Button1") {
        var a = document.getElementById("text1");//文本框
        var d = document.createElement("br");//创建元素
        var c = a.cloneNode(false);
        c.setAttribute("type", "text");//设置为文本框
        var b = document.getElementById("div1");//添加文本框的div
        b.appendChild(d);
        b.appendChild(c);
        $("#Button11").show();
    }

    if (btnid == "Button2") {
        var a = document.getElementById("text2");
        var d = document.createElement("br");
        var c = a.cloneNode(false);
        c.setAttribute("type", "text");
        var b = document.getElementById("div2");
        b.appendChild(d);
        b.appendChild(c);
        $("#Button22").show();
    }
    if (btnid == "Button3") {
        var a = document.getElementById("text3");
        var d = document.createElement("br");
        var c = a.cloneNode(false);
        c.setAttribute("type", "text");
        var b = document.getElementById("div3");
        b.appendChild(d);
        b.appendChild(c);
        $("#Button33").show();
    }
    if (btnid == "Button4") {
        var a = document.getElementById("text4");
        var d = document.createElement("br");
        var c = a.cloneNode(false);
        c.setAttribute("type", "text");
        var b = document.getElementById("div4");
        b.appendChild(d);
        b.appendChild(c);
        $("#Button44").show();
    }
    if (btnid == "Button5") {
        var a = document.getElementById("text5");
        var d = document.createElement("br");
        var c = a.cloneNode(false);
        c.setAttribute("type", "text");
        var b = document.getElementById("div5");
        b.appendChild(d);
        b.appendChild(c);
        $("#Button55").show();
    }

}
//点击减号按钮移除文本框 最后一个同胞元素
function funremove(btn) {
    $(btn).siblings().last().remove();

    var btnid = $(btn).attr("id")
    // alert(btnid)
    if (btnid == "Button11") {
        var textnum = $("#div1 :text").length;
        if (textnum > 1) {
            $("#Button11").show();
        }
        if (textnum == 1) {
            $("#Button11").hide();
        }
    }
    if (btnid == "Button22") {
        var textnum = $("#div2 :text").length;
        if (textnum > 1) {
            $("#Button22").show();
        }
        if (textnum == 1) {
            $("#Button22").hide();
        }
    }
    if (btnid == "Button33") {
        var textnum = $("#div3 :text").length;
        if (textnum > 1) {
            $("#Button33").show();
        }
        if (textnum == 1) {
            $("#Button33").hide();
        }
    }
    if (btnid == "Button44") {
        var textnum = $("#div4 :text").length;
        if (textnum > 1) {
            $("#Button44").show();
        }
        if (textnum == 1) {
            $("#Button44").hide();
        }
    }
    if (btnid == "Button55") {
        var textnum = $("#div5 :text").length;
        if (textnum > 1) {
            $("#Button55").show();
        }
        if (textnum == 1) {
            $("#Button55").hide();
            
        }
    }

}



//加号按钮的点击事件 添加文本框 只能添加一个
//function  funclick(a)
//{
//    var btnid = $(a).attr("id");

//    if (btnid == "Button1")
//    {
//        //alert("第1个文本框")
//        $("#text1").css("width", "250px")
//        //$(a).attr("disabled", "disabled")//不可用
//        $(a).hide();//隐藏+按钮
//    }
//    $(a).parent().append('<input name="RegistNumber" type="text" class="form-control" style="width:250px;float: left;margin-left:12px">');
//}



//下载按钮的点击事件
function fun1() {
    var a = $("#ClassifyId1").val();

    if (a == null || a == "") {

        $("#dowdiv").html("请选择成果分类")
    }
    else {
        $("#dowdiv").html("请先下载成果简介模板，按照模板成果简介模板编写完毕后，进行文档上传！")
    }
}




