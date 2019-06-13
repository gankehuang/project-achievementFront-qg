
//最新联系方式
funlink()
function funlink()
{
  
    Util.pageinit();
    var loginData = Util.getUserLoginData();
    var id = loginData.ID;
   // alert(id)
    $.ajax({
        url: Util.service.GetContactWay,//GetAllIPRNumberType  GetContactWay
        type: 'post',
        data:{ContactWayID:id},
        beforeSend: function () {
            Util.pageLoading();
        },
        success: function (data) {
            Util.pageinit();
            console.info(data);
            //console.info(data.resultData)
            console.log(data.resultData);
            if (data.success === 1) {
                data.resultData = JSON.parse(data.resultData);
                $("#dep").val(data.resultData[0].Department)
                $("#link").val(data.resultData[0].Contacts)
                $("#tel").val(data.resultData[0].ContactTelephone)
                $("#phone").val(data.resultData[0].Phone)
                $("#fax").val(data.resultData[0].Fax)
                $("#email").val(data.resultData[0].Email)
                $("#addr").val(data.resultData[0].Address)
                $("#code").val(data.resultData[0].PostCode)
            }
            else {
                console.error("系统错误");
            }
        },
        error: function () {
            console.error("系统错误");
            Util.pageinit();
        }
    });

}
//下载按钮的点击事件
function fun1() {
    var a = $("#ClassifyId1").val();

    if (a == null || a == "") {

        $("#dowdiv").html("请选择成果分类")
    }
    else {
        $("#dowdiv").html("请先下载成果简介模板，按照成果简介模板编写完毕后，进行文档上传！并且请勿删改模板内容<br />模板字体要求为宋体，字体大小为四号！")
    }
}


//$("#TechTypeID").change(function () {


//})



