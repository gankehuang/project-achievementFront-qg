/**
 * Created by zhujianlin on 2017/5/22.
 */

var api = "/api";
Mock.mock("/api/getAchievementList", {
    "resultData": {
        "draw|+1": 1,
        "recordsFiltered": 34,
        "recordsTotal": 34,
        "data|10": [
            {
                "id": "11",
                "eventName": "超级水稻1",
                "conveyState|+10000": 2000000,
                "eventCode": "未成交",
                "executeType":"5个月",
                "handleState|+10000":"2000000"
            },

        ]
    },
    "success": true
});

Mock.mock("/api/getAchievementManageList", {
    "resultData": {
        "draw|+1": 1,
        "recordsFiltered": 50,
        "recordsTotal": 50,
        "data|2": [
            {
                "id": "111",
                "title": "杂交玉米1",
                "type": "种业",
                "time": "2016-10-1",
                "status":"研发完成",
                "check":"0"
            },
            {
                "id": "222",
                "title": "杂交玉米2",
                "type": "种业",
                "time": "2016-10-1",
                "status":"研发完成",
                "check":"1"
            },
            {
                "id": "333",
                "title": "杂交玉米3",
                "type": "种业",
                "time": "2016-10-1",
                "status":"研发完成",
                "check":"2"
            },

        ]
    },
    "success": true
});

Mock.mock("/api/AddNewAchievement", {
    "resultData": {
    },
    "success": true
});


Mock.mock(api + "/GetAllIPRNumberType", {
    "resultDataData": [
        {
            id:1,
            name:"类型1"
        },
        {
            id:1,
            name:"类型1"
        },
        {
            id:1,
            name:"类型1"
        },
        {
            id:1,
            name:"类型1"
        }
    ],
    "success": 1
});



Mock.mock(api + "/GetAllOwnerField", {
    "resultDataData": [
        {
            id:1,
            name:"类型1"
        },
        {
            id:1,
            name:"类型1"
        },
        {
            id:1,
            name:"类型1"
        },
        {
            id:1,
            name:"类型1"
        }
    ],
    "success": 1
});

Mock.mock(api + "/GetAllOwnerCity", {
    "resultDataData": [
        {
            id:1,
            name:"类型1"
        },
        {
            id:1,
            name:"类型1"
        },
        {
            id:1,
            name:"类型1"
        },
        {
            id:1,
            name:"类型1"
        }
    ],
    "success": 1
});

Mock.mock(api + "/GetAllData", {
    "resultDataData": {
        "AchievementClassify":[
        {
            id:1,
            name:"类型1"
        },
        {
            id:1,
            name:"类型1"
        },
        {
            id:1,
            name:"类型1"
        },
        {
            id:1,
            name:"类型1"
        },
        {
            id:1,
            name:"类型1"
        }],
        "Keywords":[
            {
                id:1,
                name:"类型1"
            },
            {
                id:1,
                name:"类型1"
            },
            {
                id:1,
                name:"类型1"
            },
            {
                id:1,
                name:"类型1"
            },
            {
                id:1,
                name:"类型1"
            }],
            "AchievementImageIPRNumber":[
                {
                    id:1,
                    IPRNumber:"类型1"
                },
                {
                    id:1,
                    IPRNumber:"类型1"
                },
                {
                    id:1,
                    IPRNumber:"类型1"
                },
                {
                    id:1,
                    IPRNumber:"类型1"
                },
                {
                    id:1,
                    IPRNumber:"类型1"
                },{
                    id:1,
                    IPRNumber:"类型1"
                }],
            "ImageVideo":[
                {
                    Type:1,
                    FileName:"视频1",
                    FileDesc:"1111",
                    FileExtension:".ogg",
                    FilePath:"../assets/img/movie",
                },
                {
                    Type:1,
                    FileName:"视频2",
                    FileDesc:"1111",
                    FileExtension:".ogg",
                    FilePath:"../assets/img/movie",
                },
                {
                    Type:0,
                    FileName:"图片1",
                    FileDesc:"1111",
                    FileExtension:".png",
                    FilePath:"../assets/img/user",
                },
                {
                    Type:0,
                    FileName:"图片2",
                    FileDesc:"1111",
                    FileExtension:".png",
                    FilePath:"../assets/img/user",
                },
                {
                    Type:0,
                    FileName:"图片3",
                    FileDesc:"1111",
                    FileExtension:".png",
                    FilePath:"../assets/img/user",
                }],
        "AchieveName":"1111"
    },
    "success": 1
});






Mock.mock(api + "/AchievementManageService.asmx/GetAllPublishAchievementByUserID", {
    "resultData": {
        "draw|+1": 1,
        "recordsFiltered": 34,
        "recordsTotal": 34,
        "data|10": [
            {
                "AchID": "11",
                "AchieveName": "超级水稻1",
                "OwnerType": "权属",
                "Creator": "我我我",
                "CreatDate":new Date(),
                "IsCompetePrice|0-1":0,
                "IsDiscussPrice|0-1":1,
            },

        ]
    },
    "success": true
});

Mock.mock(api + "/FrontPage.asmx/GetAllApprovedInTradeAchievement", {
    "resultData": {
        "draw|+1": 1,
        "recordsFiltered": 34,
        "recordsTotal": 34,
        "data|10": [
            {
                "AchID": "11",
                "AchieveName": "超级水稻1",
                "OwnerType": "权属",
                "Creator": "我我我",
                "CreatDate":new Date(),
                "IsCompetePrice|0-1":0,
                "IsDiscussPrice|0-1":1,
            },

        ]
    },
    "success": 1
});


Mock.mock(api + "/AchievementService.asmx/GetAllAchievementCompeteList", {
    "resultData|2": [
        {
            "ID":1,
            "CompetePerson":"张三",
            "CompetePrice":50,
            "CompeteDate":"2017-2-3",
        },

    ],
    "success": 1
});


Mock.mock(api + "/AchievementManageService.asmx/GetAllAchievementDiscussList", {
    "resultData|2": [
        {
            "ID":1,
            "DiscussPerson":"张三",
            "DiscussContent":50,
            "DiscussDate":"2017-2-3",
        },

    ],
    "success": 1
});

Mock.mock(api + "/AchievementService.asmx/ChooseCompetePrice", {

    "success": 1
});



Mock.mock(api + "/TradeService.asmx/getAllTradeByUserID", {
    "resultData": {
        "draw|+1": 1,
        "recordsFiltered": 34,
        "recordsTotal": 34,
        "data|10": [
            {
                "ID": "11",
                "AchieveName": "超级水稻1",
                "OwnerType": "权属",
                "Price": "50000",
                "Type|0-1":0,
                "Status":'以成交',
            },

        ]
    },
    "success": true
});


Mock.mock(api + "/RequireService.asmx/GetAllRequireByUserID", {
    "resultData": {
        "draw|+1": 1,
        "recordsFiltered": 34,
        "recordsTotal": 34,
        "data|10": [
            {
                "ID": "11",
                "RequireName": "超级水稻1",
                "TechType": "权属",
                "Creator": "喔喔",
                "CreatDate":"2017-4-4",
            },

        ]
    },
    "success": true
});



Mock.mock(api + "/AchievementService.asmx/GetAllIntelligentMathRequirement", {
    "resultData": {
        "draw|+1": 1,
        "recordsFiltered": 34,
        "recordsTotal": 34,
        "data|10": [
            {
                "ID": "11",
                "RequireName": "超级水稻1",
                "TechType": "权属",
                "Creator": "喔喔",
                "CreatDate":"2017-4-4",
                "Status":"状态"
            },

        ]
    },
    "success": true
});



Mock.mock(api + "/RequireService.asmx/GetAllSelfRecommendAchievement", {
    "resultData": {
        "draw|+1": 1,
        "recordsFiltered": 34,
        "recordsTotal": 34,
        "data|10": [
            {
                "ID": "11",
                "AchieveName": "超级水稻1",
                "OwnerType": "权属",
                "Creator": "喔喔",
                "CreatDate":"2017-4-4",
                "Status":"状态",
                "RequireName":"需求1"
            },

        ]
    },
    "success": true
});


Mock.mock(api + "/RequireService.asmx/GetAllIntelligentMathAchievement", {
    "resultData": {
        "draw|+1": 1,
        "recordsFiltered": 34,
        "recordsTotal": 34,
        "data|10": [
            {
                "ID": "11",
                "AchieveName": "超级水稻1",
                "OwnerType": "权属",
                "Creator": "喔喔",
                "CreatDate":"2017-4-4",
                "Status":"状态",
                "RequireName":"需求1"
            },

        ]
    },
    "success": true
});



Mock.mock(api + "/MyFavorites.asmx/GatAllFavoritesByUserID", {
    "resultData": {
        "draw|+1": 1,
        "recordsFiltered": 34,
        "recordsTotal": 34,
        "data|10": [
            {
                "ID": "11",
                "AchieveName": "超级水稻1",
                "OwnerType": "权属",
                "Creator": "喔喔",
                "CreatDate":"2017-4-4",
                "Status":"状态",
            },

        ]
    },
    "success": true
});

Mock.mock(api + "/FrontPage.asmx/GetCompeteListRealTime", {
    "resultData": {
        "data|10": [
            {
                "ID|+1": 1,
                "AchieveName": "成果名称",
                "StartPrice": 112.3,
                "Status": "竞价中",
                "LeaveTime":"2017-4-4",
                "CurrtPrice":150,
            },

        ]
    },
    "success": 1
});
