$(function () {

    function JudgeTime() {

       

        //将计划开始时间转成以秒为单位：

        var planStartTime = "2018-4-5";

        var startTime = new Array();

        startTime = planStartTime.split('-');

        planStartTime = Date.UTC(parseInt(startTime[0]), parseInt(startTime[1]), parseInt(startTime[2]));

        //将计划结束时间转成以秒为单位：

        var planStopTime = "2018-4-7";

        var stopTime = new Array();

        stopTime = planStopTime.split('-');



        planStopTime = Date.UTC(parseInt(stopTime[0]), parseInt(stopTime[1]), parseInt(stopTime[2]));

        //将当前系统时间转化成以秒为单位：

        //获取当前时间

        var nowDate = new Date();

        //当前年

        var nowYear = nowDate.getFullYear();

        //当前月，记得要加1

        var nowMonth = (nowDate.getMonth() + 1);

        //当前日

        var nowDay = nowDate.getDate();

        nowTime = Date.UTC(nowYear, nowMonth, nowDay);

        //判断：如果当前系统时间大于等于开始时间以及小于等于结束时间则登记成功

        if (nowTime >= planStartTime && nowTime <= planStopTime) {

                var cover = document.getElementById('cover');
                cover.style.display = 'block';
                setTimeout(function () {
                    cover.style.display = 'none';
                }, 3000)

        } else {
            
        }

    }
    JudgeTime();
});