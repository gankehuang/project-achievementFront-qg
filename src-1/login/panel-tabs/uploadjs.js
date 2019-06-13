$(function () {
    Util.pageinit();
    $("#aa").click(function () {
        var ts = document.getElementById("zfiles").files[0];
        var formData = new FormData();
        formData.append("file", ts);
        $.ajax({
            url: Util.service.UploadImageVideoNews,
            type: 'POST',
            data: formData,
            //async: false,  
            //cache: false,  
            contentType: false,
            processData: false,
            success: function () {
                alert('success');
            },
            error: function () {
                alert('error');
            }
        });
    })
   
})