$(function() {
    var option1 = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            backgroundColor: "none",
            style: {
                color: "#fff",
                fontSize: "18px"
            }
        },
        colors:[
                'orange',//第一个颜色，欢迎加入Highcharts学习交流群294191384
                '#4DFFFF',//第二个颜色
                'yellow',//第三个颜色
               '#A8FF24' //。。。。
                   
              ],
        title: {
            text: null,

        },
        title: {
            text: null,

        },
        credits: {
            enabled: false
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#fff',
                    connectorColor: '#fff',
                    style:{
                        fontSize: "14px",
                        textShadow: '0 0 1px #333',
                    },
                    formatter: function() {
                        return '<b>' + this.point.name + '</b>: ' + this.point.y ;
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: '所占比例',
            data: [
                                  
                    {
                    name: '科研院所',
                    y: 885,
                    sliced: true,
                    selected: true
                },
                ['种业公司', 872],
                ['涉农院校', 131],
                ['个人', 87],
              
               
            ]
        }]
    };
   
    /*var option2 = {
        chart: {
            type: 'column',
            backgroundColor: "none",
            style: {
                color: '#fff',
                fontSize:"16px"
            }
        },
        title: {
            text: null
        },
        credits: {
            enabled: false
        },
        xAxis: {
        	 categories: ['粮食','棉油','蔬菜','水果','花卉','其他'],
        	 crosshair: true
        	
            categories: ['粮食','棉油','蔬菜','水果','花卉','其他'],
            labels: {
                rotation: -45,
                align: 'right',
                style: {
                    fontSize: '18px',
                    fontFamily: '微软雅黑',
                    color:'#fff'
                }
            },
           
            labels: {
                rotation: -45,
                align: 'right',
                style: {
                    fontSize: '18px',
                    fontFamily: '微软雅黑',
                    color:'#fff'
                }
            },
            labels: {
                rotation: -45,
                align: 'right',
                style: {
                    fontSize: '18px',
                    fontFamily: '微软雅黑',
                    color:'#fff'
                }
            },
            
        },
        yAxis: {
            min: 0,
            title: {
                text: '成果总量',
                style:{color:"#fff",fontSize: '18px', fontFamily: '微软雅黑',}
            },
            labels: {
                style: {
                    fontSize: '18px',
                    fontFamily: '微软雅黑',
                    color:'#fff'
                }
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: '数量: <b>{point.y:.1f} 个</b>',
        },
        series: [
{
    name: '科研院所',
        data: [669, 80, 51, 51, 8, 26],
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            x: 4,
            y: 10,
            style: {
                fontSize: '16px',
                fontFamily: '微软雅黑',
                textShadow: '0 0 3px #333'
            }
        }
    }, {
        name: '种业公司',
        data: [613, 47, 73, 24, 113, 2],
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            x: 4,
            y: 10,
            style: {
                fontSize: '16px',
                fontFamily: '微软雅黑',
                textShadow: '0 0 3px #333'
            }
        }
    }, {
        name: '涉农院校',
        data: [101, 8, 7, 15, 0, 0],
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            x: 4,
            y: 10,
            style: {
                fontSize: '16px',
                fontFamily: '微软雅黑',
                textShadow: '0 0 3px #333'
            }
        }
    }, {
        name: '个人',
        data: [56, 0, 5, 2, 20, 4],
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            x: 4,
            y: 10,
            style: {
                fontSize: '16px',
                fontFamily: '微软雅黑',
                textShadow: '0 0 3px #333'
            }
        }
}
                 {
            name: '总数',
            data: [560,553,168,98,75],
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                x: 4,
                y: 10,
                style: {
                    fontSize: '16px',
                    fontFamily: '微软雅黑',
                    textShadow: '0 0 3px #333'
                }
            }
        },
        {
            name: '总数',
            data: [560,553,168,98,75],
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                x: 4,
                y: 10,
                style: {
                    fontSize: '16px',
                    fontFamily: '微软雅黑',
                    textShadow: '0 0 3px #333'
                }
            }
        }]
    };*/
    var option2={
    		chart: 
    {
        type: 'column',
        backgroundColor: "none",
        style: {
            color: '#fff',
            fontSize:"16px"
        }
    },
    colors:[
            '#46A3FF',//第一个颜色，欢迎加入Highcharts学习交流群294191384
            '#7AFEC6',//第二个颜色
            'yellow',//第三个颜色
           '#C07AB8' //。。。。
               
          ],
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: [
            '粮食',
            '棉油',
            '蔬菜',
            '水果',
            '花卉',
            '其他'
           
        ],
        crosshair: true,
        labels: {
            rotation: -45,
            align: 'right',
            style: {
                fontSize: '16px',
                fontFamily: '微软雅黑',
                color:'#fff'
            }
        },
        
    },
    yAxis: {
        min: 0,
        title: {
            text: '数量 (个)',
            style:{color:"#fff",fontSize: '16px', fontFamily: '微软雅黑',}
        },
        labels: {
            style: {
                fontSize: '16px',
                fontFamily: '微软雅黑',
                color:'#fff'
            }
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} 个</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0,
            pointWidth:23
        }
    },
    series: [{
        name: '科研院所',
        data: [699,80, 51, 51,8,26],
        
    }, {
        name: '种业公司',
        data: [613,47,73,24,113,2]
    }, {
        name: '涉农院校',
        data: [101,8,7,15,0,0]
    }, {
        name: '个人',
        data: [56,0,5,2,20,4],
        color:'#fff'
    }]


}
    var option3={
    		chart: 
    {
        type: 'column',
        backgroundColor: "none",
        style: {
            color: '#fff',
            fontSize:"16px"
        }
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: [
            '玉米',
            '水稻',
            '大豆',
            '小麦',
            '棉属',
            
           
        ],
        crosshair: true,
        labels: {
            rotation: -45,
            align: 'right',
            style: {
                fontSize: '16px',
                fontFamily: '微软雅黑',
                color:'#fff'
            }
        },
        
    },
    yAxis: {
        min: 0,
        title: {
            text: '数量 (个)',
            style:{color:"#fff",fontSize: '16px', fontFamily: '微软雅黑',}
        },
        labels: {
            style: {
                fontSize: '16px',
                fontFamily: '微软雅黑',
                color:'#fff'
            }
        },
        tickPositions: [0,50, 100,150,200,250,300,350,400]
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} 个</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0,
            pointWidth:23
        }
    },
    series: [{
        name: '科研院所',
        data: [144,311, 130, 51,41],
        
    }, {
        name: '种业公司',
        data: [361,182,20,26,31]
    }, {
        name: '涉农院校',
        data: [18,50,14,18,3]
    }, {
        name: '个人',
        data: [37,10,4,3,0],
        color:'#fff'
    }]


}
    var option4 = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                backgroundColor: "none",
                style: {
                    color: "#fff",
                    fontSize: "18px"
                }
            },
            colors:[
                    'orange',//第一个颜色，欢迎加入Highcharts学习交流群294191384
                    '#4DFFFF',//第二个颜色
                    'yellow',//第三个颜色
                   '#A8FF24', //。。。。
                       '#FF8EFF',
                       '#8080C0'
                  ],
            title: {
                text: null,

            },
            credits: {
                enabled: false
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#fff',
                        connectorColor: '#fff',
                        style:{
                            fontSize: "14px",
                            textShadow: '0 0 1px #333',
                        },
                        formatter: function() {
                            return '<b>' + this.point.name + '</b>: ' + this.point.y ;
                        }
                    }
                }
            },
            series: [{
                type: 'pie',
                name: '所占比例',
                data: [
                                      
                        {
                        name: '粮食',
                        y: 1439,
                        sliced: true,
                        selected: true
                    },
                    ['棉油', 135],
                    ['蔬菜', 136],
                    ['水果', 92],
                    ['花卉', 141],
                    ['其他', 32],
                ]
            }]
        };
    $('#dowebok').fullpage({
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        anchors: ['page1', 'page2', 'page3','page4'],

        /*afterLoad: function(anchorLink, index){
            var loadedSection = $(this);
            $(".section .col-md-4").removeClass("animated").removeClass("slideInLeft");
            $(".section h2",".section .section_body").removeClass("animated").removeClass("slideInright");
            
            $(".section"+index+" .col-md-4").addClass("animated").addClass("slideInLeft");
            $(".section"+index+" h2",".section"+index+" .section_body").addClass("animated").addClass("slideInright");
        },*/
        onLeave: function(index, nextIndex, direction) {
            var leavingSection = $(this);

            $(".section .col-md-4").removeClass("animated").removeClass("slideInLeft");
            $(".section h2").removeClass("animated").removeClass("lightSpeedIn");
            $(".section .section-body").removeClass("animated").removeClass("fadeInUp");
            $(".section .section-title").removeClass("animated").removeClass("fadeInDown");
            //alert(".section"+nextIndex+" h2,.section"+nextIndex+" .section_body");
            $(".section" + nextIndex + " .col-md-4").addClass("animated").addClass("slideInLeft");
            $(".section" + nextIndex + " h2").addClass("animated").addClass("lightSpeedIn");
            $(".section" + nextIndex + " .section-body").addClass("animated").addClass("fadeInUp");
            $(".section" + nextIndex + " .section-title").addClass("animated").addClass("fadeInDown");
            $('#p1').highcharts(option1);
            $('#p2').highcharts(option2);
           /* $('#p3').highcharts(option3);*/
            $('#p4').highcharts(option4);

        }
    });
    var p1 = $('#p1').highcharts(option1);
    var p2 = $('#p2').highcharts(option2);
   /* var p3 = $('#p3').highcharts(option3);*/
    var p4 = $('#p4').highcharts(option4);
});
