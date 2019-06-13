
var Util = (function (api) {
    
    api.publicity_time = 21;    //公示天数

    //table  每页size
    api.perPageLength = 10;
    api.api = "/transapi";
    api.image_default = '/common/img/no-image.jpg';
    api.filepath = api.api + '/File';

    //url
    api.service = {
        getAchievementList: "/api" + '/getAchievementList',
        getAchievementManageList: "/api" + '/getAchievementManageList',
        upload: "/api" + '/upload',


        /*******************发布成果*****************/
        //------获取最新联系方式-----
        GetContactWay: api.api + '/AchievementService.asmx/GetContactWay',
        /**获取产权归属单位*/
        GetUserByUserID: api.api + '/AchievementManageService.asmx/GetUserByUserID',

        /**发布的成果是否已经经过所级账户审核：不通过*/
        IsApprovebySJ: api.api + '/ApproveManageService.asmx/IsApprovebySJ',

        /**发布的成果是否已经经过所级账户审核：通过*/
        IsApprovebySJpass: api.api + '/ApproveManageService.asmx/IsApprovebySJpass',

        AddNewAchievement: api.api + '/AchievementService.asmx/AddNewAchievement',
        /**获取所有一级分类数据接口*/
        GetAllTopClassify: api.api + '/AchievementService.asmx/GetAllTopClassify',
        /**获取除了知识产权以外的所有一级分类数据接口*/
        GetAllTopClassifyNoIRM: api.api + '/AchievementService.asmx/GetAllTopClassifyNoIRM',
        /**通过父分类获取所有的子分类数据接口*/
        GetAllClassifyByParentID: api.api + '/AchievementService.asmx/GetAllClassifyByParentID',
        /**获取所有新产业类型*/
        GetAllNewIndustryType: api.api + '/AchievementService.asmx/GetAllNewIndustryType',
        /**获取所有技术水平*/
        GetAllTechLeval: api.api + '/AchievementService.asmx/GetAllTechLeval',
        /**获取所有成果权属类型*/
        GetAllTechType: api.api + '/AchievementService.asmx/GetAllTechType',
        /**获取所有技术成熟度*/
        GetAllMaturity: api.api + '/AchievementService.asmx/GetAllMaturity',
        /**获取所有所属领域*/
        GetAllOwnerField: api.api + '/AchievementService.asmx/GetAllOwnerField',
        /**获取所有合作方式*/
        GetAllCooperationMethod: api.api + '/AchievementService.asmx/GetAllCooperationMethod',
        /**获取所有交易方式*/
        GetAllTransMethodMethod: api.api + '/AchievementService.asmx/GetAllTransMethodMethod',
        /**获取所有知识产权编号类型*/
        GetAllIPRNumberType: api.api + '/AchievementService.asmx/GetAllIPRNumberType',
        /**获取产权归属省*/
        GetAllProvince: api.api + '/AchievementService.asmx/GetAllProvince',

        /**获取产权归属省*/
        GetAllProvincePub: api.api + '/AchievementService.asmx/GetAllProvincePub',

        /**word上传*/
        UploadWord: api.api + '/AchievementService.asmx/UploadWord',
        /**图片或视频上传*/
        UploadImageVideo:api.api + '/AchievementService.asmx/UploadImageVideo',


        /**获取成果详情页交易详情*/
        GetPublicssByAchID:api.api + '/FrontPage.asmx/GetPublicssByAchID',
        GetTransByAchID:api.api + '/AchievementManageService.asmx/GetTransByAchID',


        /**获取成果信息*/
        GetAllData: '/api/GetAllData',

        GetAllOwnerCity: api.api + '/AchievementService.asmx/GetAllOwnerCity',

        /**获取成果详细信息*/
        GetAchievementByAchID: api.api + '/AchievementManageService.asmx/GetAchievementByAchID',

        /**游客身份获取成果详细信息*/
        GetAchievementByAchIDPub: api.api + '/AchievementManageService.asmx/GetAchievementByAchIDPub',

        /**技术类型*/
        GetAllTechType: api.api + '/AchievementService.asmx/GetAllTechType',


        /*******************成果管理*****************/

        // 获取当前用户所有可选成果（无分页）
        GetAllAchievementByUserID: api.api + '/AchievementManageService.asmx/GetAllAchievementByUserID',

        /**获取所有成果*/
        GetAllPublishAchievementByUserID: api.api + '/AchievementManageService.asmx/GetAllPublishAchievementByUserID',
        /**获取所有成果草稿*/
        GetAllDraftByUserID: api.api + '/AchievementManageService.asmx/GetAllDraftByUserID',
        /**竞价列表*/
        GetAllAchievementCompeteList: api.api + '/AchievementManageService.asmx/GetAllAchievementCompeteList',

        /**议价列表*/
        GetAllAchievementDiscussList: api.api + '/AchievementManageService.asmx/GetAllAchievementDiscussList',

        /**选择竞价*/
        ChooseCompetePrice: api.api + '/AchievementManageService.asmx/ChooseCompetePrice',
        /**交易记录*/
        getAllTradeOfAchievementByUserID: api.api + '/TradeService.asmx/getAllTradeOfAchievementByUserID',
        /**某成果智能推荐的需求*/
        GetAllIntelligentMathRequirementByAchID: api.api + '/AchievementManageService.asmx/GetAllIntelligentMathRequirementByAchID',
        /**需求推荐*/
        GetAllIntelligentMathRequirementByUserID: api.api + '/AchievementManageService.asmx/GetAllIntelligentMathRequirementByUserID',

        /**查询某议价所有议价及回复*/
        GetAllMessageByDiscussID: api.api + '/AchievementManageService.asmx/GetAllMessageByDiscussID',

        /**回复议价*/
        ReplyDiscussByAchOwner: api.api + '/FrontPage.asmx/ReplyDiscussByAchOwner',

        /**删除成果*/
        DeleteAchievement: api.api + '/AchievementManageService.asmx/DeleteAchievement',

        /**发起交易*/
        AddNewTrade: api.api + '/TradeService.asmx/AddNewTrade',
        /**当前用户的所有成果*/
        GetAllApproveAchievementByUserID: api.api + '/AchievementManageService.asmx/GetAllApproveAchievementByUserID',

        SelfRecommend: api.api + '/FrontPage.asmx/SelfRecommend',
        /**所及管理员修改其分配账号下的成果*/
        EditAchievement: api.api + '/AchievementService.asmx/EditAchievement',
        /**管理员推荐成果*/
        RecommendAchievement: api.api + '/AchievementManageService.asmx/RecommendAchievement',

        /*******************需求管理*****************/
         /**新增需求*/
        AddNewRequire: api.api + '/RequireService.asmx/AddNewRequire',
        /**需求详情*/
        GetRequirementByRequireID: api.api + '/RequireService.asmx/GetRequirementByRequireID',
        /**需求详情*/
        GetRequirementByRequireIDYK: api.api + '/RequireService.asmx/GetRequirementByRequireIDYK',
        /**需求管理列表*/
        GetAllRequireByUserID: api.api + '/RequireService.asmx/GetAllRequireByUserID',
        /**管理员需求管理列表*/
        GetAllRequire: api.api + '/RequireService.asmx/GetAllRequire',
        /**删除需求*/
        DeleteRequirement: api.api + '/RequireService.asmx/DeleteRequirement',
        /**自荐成果*/
        GetAllSelfRecommendAchievement: api.api + '/RequireService.asmx/GetAllSelfRecommendAchievement',
        /**智能推荐成果*/
        GetAllIntelligentMathAchievementByUserID: api.api + '/RequireService.asmx/GetAllIntelligentMathAchievementByUserID',
        /**某需求智能推荐成果*/
        GetAllIntelligentMathAchievementByRequirID: api.api + '/RequireService.asmx/GetAllIntelligentMathAchievementByRequirID',
        /**需求交易*/
        getAllTradeOfRequirementByUserID: api.api + '/RequireService.asmx/getAllTradeOfRequirementByUserID',
        /**消息设为已读*/
        SetTradeRead: api.api + '/TradeService.asmx/SetTradeRead',
        /**需求模板简介上传*/
        UploadWordNeed: api.api + '/AchievementService.asmx/UploadWordNeed',

        /*******************收藏夹*****************/
        /**收藏夹列表*/
        GetAllFavoritesByUserID: api.api + '/MyFavorites.asmx/GetAllFavoritesByUserID',
        AddToMyFavorites: api.api + '/MyFavorites.asmx/AddToMyFavorites',


        /*******************交易中心*****************/
        /**交易列表*/
        getAllTradeByUserID: api.api + '/TradeService.asmx/getAllTradeByUserID',


        /*******************公示公告*****************/
        // 上传公示图片
        UploadPublicityImage: api.api + '/PublicityService.asmx/UploadImage',
        // 发布新公示、保存修改
        AddNewPublicity: api.api + '/PublicityService.asmx/AddNewPublicity',
        // 删除公示
        DeletePublicity: api.api + '/PublicityService.asmx/DeletePublicity',
        // 获取公示列表
        GetPublicityList: api.api + '/PublicityService.asmx/GetPublicityList',
        // 获取公示列表
        GetPublicityListYK: api.api + '/PublicityService.asmx/GetPublicityListYK',
        // 获取公示列表
        GetALLPublicityListYK: api.api + '/PublicityService.asmx/GetALLPublicityListYK',
        // 获取公示详情
        GetPublicityDetail: api.api + '/PublicityService.asmx/GetPublicityDetail',
        // 获取公示详情
        GetPublicityDetailYK: api.api + '/PublicityService.asmx/GetPublicityDetailYK',
        // 审核公示：不通过
        ApprovePublicity: api.api + '/PublicityService.asmx/ApprovePublicity',
        // 审核公示：通过
        ApprovePublicityPass: api.api + '/PublicityService.asmx/ApprovePublicityPass',
        // 推荐、取消推荐公示
        RecommendPublicity: api.api + '/PublicityService.asmx/RecommendPublicity',
        // 提交异议
        DissentPublicity: api.api + '/PublicityService.asmx/DissentPublicity',
        // 获取异议列表
        GetDissentPublicity: api.api + '/PublicityService.asmx/GetDissentPublicity',
        // 获取异议列表
        GetDissentPublicityYK: api.api + '/PublicityService.asmx/GetDissentPublicityYK',
        // 评审公示
        EvaluatePublicity: api.api + '/PublicityService.asmx/EvaluatePublicity',
        // 编辑合同信息
        AddNewNotice: api.api + '/PublicityService.asmx/AddNewNotice',
        // 文件上传
        UploadContractFJ: api.api + '/PublicityService.asmx/UploadContractFJ',



        /*******************个人信息*****************/
        /**修改密码*/
        ResetPassword: api.api + '/UserManageService.asmx/ResetPassword',
		/**忘记密码*/
        ForgetPwdMail: api.api + '/UserManageService.asmx/ForgetPwdMail',

        /*******************首页*****************/
        /**竞价情况*/
        GetAllCompleteSituationByUserID : api.api + '/HomePageService.asmx/GetAllCompleteSituationByUserID',
        /**议价情况*/
        GetAllDiscussSituationByUserID : api.api + '/HomePageService.asmx/GetAllDiscussSituationByUserID',
        /**自荐情况*/
        GetAllSelfRecommendByUserID  : api.api + '/HomePageService.asmx/GetAllSelfRecommendByUserID',
        /**种类大类*/
        GetAllClassifyMainMenu   : api.api + '/FrontPage.asmx/GetAllClassifyMainMenu',
        /** 种类大类下的次级大类*/
        GetAllClassifySecondMenu: api.api + '/FrontPage.asmx/GetAllClassifySecondMenu ',
        /** 地域*/
        GetAllProvince: api.api + '/FrontPage.asmx/GetAllProvince',
        /** 地域*/
        GetAllProvinceSYPub: api.api + '/FrontPage.asmx/GetAllProvinceSYPub',
        /** 单位*/
        GetAllOrganizationMenu : api.api + '/FrontPage.asmx/GetAllOrganizationMenu',
        /*******************注册*****************/
        /**修改密码*/
        RegisterNewUser: api.api + '/UserManageService.asmx/RegisterNewUser',

        /**所级管理员查看所属用户列表*/
        GetAllSubUser: api.api + '/UserManageService.asmx/GetAllSubUser',

        /**所级管理员添加用户*/
        RegisterSubUser: api.api + '/UserManageService.asmx/RegisterSubUser',

        /**所级管理员删除用户*/
        DelUser: api.api + '/UserManageService.asmx/DelUser',

        /**所级管理员发送邮件*/
        SendMail: api.api + '/UserManageService.asmx/SendMail',


        /*******************管理员*****************/
        /*******************成果管理*****************/
        GetAllPublishAchievement: api.api + '/AchievementManageService.asmx/GetAllPublishAchievement',

        GetAllPublishAchievementByself: api.api + '/AchievementManageService.asmx/GetAllPublishAchievementByself',

        GetCompeteListRealTime:api.api + '/HomePageService.asmx/GetCompeteListRealTime',
        /**审核成果：不通过*/
        ApproveAchievement: api.api + '/ApproveManageService.asmx/ApproveAchievement',
        /**审核成果：通过*/
        ApproveAchievementPass: api.api + '/ApproveManageService.asmx/ApproveAchievementPass',

        /** 竞价数量 */
        AdminGetAllCompeteAchievementByUserID: api.api + '/AchievementManageService.asmx/AdminGetAllCompeteAchievementByUserID',
        /** 议价数量 */
        AdminGetAllDiscussAchievementByUserID: api.api + '/AchievementManageService.asmx/AdminGetAllDiscussAchievementByUserID',
        /** 交易数量 */
        AdminGetAllPublishAchievementByUserID: api.api + '/AchievementManageService.asmx/AdminGetAllPublishAchievementByUserID',


        /**用户管理*/
        GetAllUser: api.api + '/UserManageService.asmx/GetAllUser',
        GetNaturalPer: api.api + '/UserManageService.asmx/GetNaturalPer',
        GetDepPer: api.api + '/UserManageService.asmx/GetDepPer',
        GetLedPer: api.api + '/UserManageService.asmx/GetLedPer',
        /**审核用户:不通过*/
        ApproveUser: api.api + '/UserManageService.asmx/ApproveUser',
        /**审核用户：通过*/
        ApproveUserPass: api.api + '/UserManageService.asmx/ApproveUserPass',
        /**个人信息获取*/
        GetUserInfo:api.api + '/UserManageService.asmx/GetUserInfo',
        /**个人信息修改*/
        ModifyUserInfo:api.api + '/UserManageService.asmx/ModifyUserInfo',
        /**个人用户认证*/
        CertifyIndividualUser :api.api + '/UserManageService.asmx/CertifyIndividualUser',
        /**企业用户认证*/
        CertifyEnterpriseUser :api.api + '/UserManageService.asmx/CertifyEnterpriseUser',
        /**管理员查看所有用户成果的交易*/
        getAllTradeOfAchievement :api.api + '/TradeService.asmx/getAllTradeOfAchievement',
        /**管理员查看所有用户所有交易*/
        getAllTrade :api.api + '/TradeService.asmx/getAllTrade',

        /**用户审核已分配账户详情*/
        GetUserByUserCount :api.api + '/UserManageService.asmx/GetUserByUserCount',
        


        /*******************前端*****************/
        /**竞价平台*/
        GetCompeteListRealTime:api.api + '/HomePageService.asmx/GetCompeteListRealTime',
        /**成果竞价详情*/
        GetCurrentCompeteDetailByAchID: api.api + '/FrontPage.asmx/GetCurrentCompeteDetailByAchID',
        /**竞价*/
        CompeteOneInAchement: api.api + '/FrontPage.asmx/CompeteOneInAchement',
        /**议价*/
        DiscussOneInAchement: api.api + '/FrontPage.asmx/DiscussOneInAchement',
        /**已审核成果列表*/
        GetAllApprovedInTradeAchievement: api.api + '/FrontPage.asmx/GetAllApprovedInTradeAchievement',
        GetRecommendAchievement: api.api + '/AchievementManageService.asmx/GetRecommendAchievement',

        /**需求推荐列表*/
        GetAllApprovedInTradeRequire:api.api + '/FrontPage.asmx/GetAllApprovedInTradeRequire',
        /**区域成果列表*/
        GetAllAchievemrntByProvince :api.api + '/FrontPage.asmx/GetAllAchievemrntByProvince',
        /**分类成果列表*/
        GetAllAchievemrntByClassify  :api.api + '/FrontPage.asmx/GetAllAchievemrntByClassify',
        /**区域成果列表*/
        GetAllOrganizationAchievement  :api.api + '/FrontPage.asmx/GetAllOrganizationAchievement',
        /**机构推荐列表*/
        GetAllAgency  :api.api + '/FrontPage.asmx/GetAllAgency',

        /**议价列表*/
        GetAchievementDiscussListByUserID:api.api + '/TradeService.asmx/GetAchievementDiscussListByUserID',
        /**某用户查看某议价下的留言数据接口 */
        GetAllMessageByDiscussIDAndUserID:api.api + '/TradeService.asmx/GetAllMessageByDiscussIDAndUserID',
        /**议价确认 */
        FinishTrade:api.api + '/TradeService.asmx/FinishTrade',
        /**议价拒绝 */
        RefuseTrade:api.api + '/TradeService.asmx/RefuseTrade',

        /**品种授权公告表*/
        GetAllNotice:api.api + '/FrontPage.asmx/GetAllNotice',
        /**专利评价公告表*/
        GetAllPatentNotice:api.api + '/FrontPage.asmx/GetAllPatentNotice',
        /**公示公告查询*/
        GetAllPub: api.api + '/QueryService.asmx/GetAllPub',


        /**登录*/
        Login:api.api + '/UserManageService.asmx/Login',
        /**获取验证码*/
        GetValidatePic:api.api + '/UserManageService.asmx/GetValidatePic',
        /**验证验证吗*/
        CheckPicCode:api.api + '/UserManageService.asmx/CheckPicCode',

        /**获取用户信息*/
        GetUserInfo:api.api + '/UserManageService.asmx/GetUserInfo',

        /**获取用户信息*/
        GetUserInfoByID:api.api + '/UserManageService.asmx/GetUserInfoByID',
        /**获取用户信息*/
        GetUserInfoByIDPub: api.api + '/UserManageService.asmx/GetUserInfoByIDPub',
        /**根据登录名获取用户信息*/
        GetUserBYLoginName: api.api + '/UserManageService.asmx/GetUserBYLoginName',
        /**根据登录名获取用户信息*/
        GetUserBYSessionID: api.api + '/UserManageService.asmx/GetUserBYSessionID',

        /* 单位名称校验唯一性*/
        DptNameRepeat: api.api + '/UserManageService.asmx/DptNameRepeat',

        /**搜索*/
        GetAllAchandOriganizationByKeyword:api.api + '/QueryService.asmx/GetAllAchandOriganizationByKeyword',

        /**单位主页*/
        GetAllAchievementByOrganization:api.api + '/QueryService.asmx/GetAllAchievementByOrganization',
        GetRecentAchByOrganization:api.api + '/FrontPage.asmx/GetRecentAchByOrganization',
        GetAllRequirementByOrganization:api.api + '/FrontPage.asmx/GetAllRequirementByOrganization',


        /*******************竞价大厅*****************/
        GetCompeteListRealTime: api.api + '/FrontPage.asmx/GetCompeteListRealTime',

        /*******************发布新闻*****************/
        AddNewNews: api.api + '/News.asmx/AddNewNews',

        /*******************新闻管理*****************/
        /**图片上传*/
        UploadImageVideoNews: api.api + '/News.asmx/UploadImageVideoNews',

        /**word上传*/
        UploadWordNews:api.api + '/News.asmx/UploadWordNews',

        /**删除一条新闻*/
        DeleteNews: api.api + '/News.asmx/DeleteNews',

        /**查看详情*/
        GetNewsByAchID: api.api + '/News.asmx/GetNewsByAchID',

        /**查看详情*/
        GetNewsByAchIDYK: api.api + '/News.asmx/GetNewsByAchIDYK',

        /**当前登录用户查看自己发布的所有新闻信息*/
        GetAllNewsByUserID: api.api + '/News.asmx/GetAllNewsByUserID',

        /**获取主图新闻详细信息*/
        GetAllNewsPic: api.api + "/News.asmx/GetAllNewsPic",

        /**获取所有新闻动态信息*/
        GetAllNews: api.api + "/News.asmx/GetAllNews",
        /**获取待办事项*/
        GetAllUnApproveCount: api.api + "/ApproveManageService.asmx/GetAllUnApproveCount",
        /**获取待办事项今日新增*/
        GetAllUnApproveCountToday: api.api + "/ApproveManageService.asmx/GetAllUnApproveCountToday",
        //管理员查看用户的成果列表
        AdminGetAllPublishAchievementByUserID: api.api + "/AchievementManageService.asmx/AdminGetAllPublishAchievementByUserID",

        //获取拥有人
        GetUserByTypeAndSta: api.api + "/UserManageService.asmx/GetUserByTypeAndSta",
    },

        /**
         * 载入中弹出框
         * @param options
         */
        api.loading = function (options) {
            $('#loadingModal').modal(options);
        },
       
        /**
         * 页面载入完毕
         */
        //登录部分隐藏
        api.pageinit = function () {
            $('#loading-main').hide();
        },
       //登录部分显示
        api.pageLoading = function () {
            $('#loading-main').show();
        },
         //登录
        api.login = function (options) {
            $('#loginModal').modal(options);

            //GUID和验证码
            function getIdentifyingCode() {
                $.ajax({
                    url: Util.service.GetValidatePic,
                    type: "POST",
                    success: function (data) {
                        Util.pageinit();
                        if (data.success === 1) {
                            data.resultData = JSON.parse(data.resultData);
                            $("#loginForm").find("[name=GUID]").val(data.resultData.GUID);
                            $("#loginForm").find("img.code-img").attr("src", data.resultData.PicPath);
                        }
                    },
                    error: function () {
                        Util.pageinit();
                    }
                });
            }
            getIdentifyingCode();

            function checklogin(formData) {
                $("#yhm").hide();
                $("#mima").hide();
                $("#yz").hide();
                var a = true;
                if (!formData.userName) {
                    $("#yhm").show();
                    $("#yhm").text("请输入用户名");
                    if (!formData.password) {
                        $("#mima").show();
                        $("#mima").text("请输入密码");
                    }
                    if (!formData.Code) {
                        $("#yz").show();
                        $("#yz").text("请输入验证码");
                    }
                    a = false;
                }
                if (!formData.password) {
                    $("#mima").show();
                    $("#mima").text("请输入密码");
                    if (!formData.userName) {
                        $("#yhm").show();
                        $("#yhm").text("请输入用户名");
                    }
                    if (!formData.Code) {
                        $("#yz").show();
                        $("#yz").text("请输入验证码");
                    }
                    a = false;
                }
                if (!formData.Code) {
                    $("#yz").show();
                    $("#yz").text("请输入验证码");
                    if (!formData.userName) {
                        $("#yhm").show();
                        $("#yhm").text("请输入用户名");
                    }
                    if (!formData.password) {
                        $("#mima").show();
                        $("#mima").text("请输入密码");
                    }
                    a = false;
                }
                return a;
            }
            //登录
            $("#loginForm").on("click", ".submit", function (e) {
                e.preventDefault();
                var formData = $("#loginForm").serializeJson();
                if (checklogin(formData) == false) {
                    return;
                }
                else {
                    $.ajax({
                        url: Util.service.CheckPicCode,
                        type: "POST",
                        data: formData,
                        beforeSend: function () {
                            Util.pageLoading();
                        },
                        success: function (data) {
                            Util.pageinit();
                            //先验证
                            if (data.success === 1) {
                                $.ajax({
                                    url: Util.service.Login,
                                    type: "POST",
                                    data: formData,
                                    beforeSend: function () {
                                        Util.pageLoading();
                                    },
                                    success: function (data) {
                                        Util.pageinit();
                                        //登录
                                        if (data.success === 1) {
                                            //$("#loginForm").find("[name=userName]").val("");
                                            //$("#loginForm").find("[name=Code]").val("");
                                            $("#loginForm [name=password]").val("");
                                            $("#loginForm [name=Code]").val("");
                                            data.resultData = JSON.parse(data.resultData);
                                            console.log(data.resultData);
                                            Util.setUserLogin(data.resultData);//保存到localstorage
                                            $("#loginForm").hide();

                                            $(".gotoAdmin").show();
                                            var user = Util.getUserLoginData();

                                            if (user && user.IsAdmin) {
                                                //更改
                                                $("#a1").attr("href", "/admin/index/index.html");
                                                $("#a2").attr("href", "/admin/index/index.html")
                                                $("#a3").attr("href", "/admin/index/index.html")
                                                $("#kzt").attr("href", "/admin/index/index.html")
                                            }

                                            else {
                                                $("#a1").attr("href", "/login/panel-tabs/index.html");
                                                $("#a2").attr("href", "/login/PublicityManage/edit.html")
                                                $("#a3").attr("href", "/login/publicityManage/editall.html")
                                                $("#kzt").attr("href", "/login/publicityManage/editall.html")
                                            }
                                            $('#loginModal').modal('hide');
                                            location.reload();
                                        } else {
                                            Util.error("show", data.message);
                                        }
                                    },
                                    error: function () {
                                        Util.pageinit();
                                        Util.error("show", "系统异常");
                                    }
                                });
                            } else {
                                //Util.error("show", data.message);
                                $("#yz").show();
                                $("#yz").text(data.message);
                            }
                        },
                        error: function () {
                            Util.pageinit();
                            Util.error("show", "系统异常");
                        }
                    });
                }



            });
        },
        /**
         * 获取下拉数据
         */
        api.getSelectData = function (selectELe, selectData, defaultOption,value) {
            var options = '<option value="">' + defaultOption + '</option>';
            for (var pro in selectData) {
                var item = selectData[pro];
                options += '<option value="' + (item.id || item.ID || item.AchID) + '">' + (item.name || item.Province || item.AchieveName) + '</option>';
            }
            $(selectELe).html(options);
            $(selectELe).val((value ? value: ''));
            if(value){
                $(selectELe).trigger("change")
            }
            if(selectData.length > 0){
                $(selectELe).show();
            }
        },

        /**
         * 处理操作成功弹出框
         * @param options
         */
        api.success = function (options, html, callback) {
            var el = $('#successModal');
            if (html) {
                el.find('.modal-body').html(html);
            }
            el.modal(options);
            if(callback){
                el.find('.btn-ok').off().on('click', function(){
                    callback();
                });
            }
        },

        /**
         * 处理操作失败弹出框
         * @param options
         */
        api.error = function (options, html) {
            var el = $('#errorModal');
            console.info(el);
            if (html) {
                el.find('.modal-body').html(html);
            }
            el.modal(options);
        },

        /**
         * 处理操作警告提示弹出框
         * @param options
         */
        api.warning = function (options, html,callbackFn) {
            var el = $('#warningModal');
            if (html) {
                el.find('.modal-body').html(html);
            }
            el.modal(options);
            el.find('.sure').off().on('click', function () {
                el.modal('hide');
                if (typeof callbackFn === 'function') {
                    callbackFn();
                }
            });
        },

        /**
         * 处理操作警告提示弹出框
         * @param text 提示文字
         * @param callbackFn 成功回调
         */
        api.confirm = function (text, callbackFn) {
            var confirmEl = $('#confirmModal');
            confirmEl.modal('show').find('.modal-body').text(text || '您真的要执行此操作吗?');
            confirmEl.find('.sure').off().on('click', function () {
                confirmEl.modal('hide');
                if (typeof callbackFn === 'function') {
                    callbackFn();
                }
            });
            confirmEl.find('.cancel').off().on('click', function () {
                confirmEl.modal('hide');
            });
        },

        /**
         * 获取客户端存储的用户id
         */
        api.getUserId = function () {
            var lastTime= localStorage.getItem("loginTime");
            var currentTime = new Date().getTime();
            if(!lastTime || currentTime - parseInt(lastTime) > 6 * 60 * 60 * 1000){
                this.setUserLogout();
                return null;
            }else {
                localStorage.setItem("loginTime",new Date().getTime());
                return localStorage.getItem("userID");
            }

        },
        /**
         * 获取客户端存储的用户name
         */
        api.getUserName= function () {
            return localStorage.getItem("userName");
        },
        /**
         * 保存用户登录信息
         */
        api.setUserLogin= function (user) {
            localStorage.setItem("userID",user.ID || '');
            localStorage.setItem("loginTime",new Date().getTime());
            localStorage.setItem("userName",user.Name || '');
            localStorage.setItem("user",JSON.stringify(user) || '{}');
        },
        /**
         * 获取用户登录信息
         */
        api.getUserLoginData= function () {
            var lastTime= localStorage.getItem("loginTime");
            var currentTime = new Date().getTime();
            if(!lastTime || currentTime - parseInt(lastTime) > 12 * 60 * 60 * 1000){
                this.setUserLogout();
            }
            localStorage.setItem("loginTime",new Date().getTime());
            return localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
        },

        /**
         * 清空用户登录信息
         */
        api.setUserLogout= function () {
            //console.info("logout")
            //localStorage.setItem("userID",'');
            //localStorage.setItem("userName",'');
            //localStorage.setItem("user", '');
            localStorage.clear();
        }
        ,
        /**
         * 获取URL地址中的特定参数
         *
         * @param name 参数名称
         * @returns {*} 参数值，如果参数不存在，返回null
         */
        api.getUrlParam = function (name) {
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(decodeURIComponent(window.location.href));
            if (results == null) {
                return null;
            }
            else {
                return results[1] || '';
            }
        },


        /**
         * 消息设为已读
         *
         * @param name 参数名称
         * @returns {*} 参数值，如果参数不存在，返回null
         */
        api.SetTradeRead = function (userId,achID) {
            $.ajax({
                url: api.service.SetTradeRead,
                type: 'POST',
                data:{userId:userId,achID:achID},
                success: function (data) {
                },
                error: function () {
                    console.error("系统错误");
                }
            });
        }

    return api;

})
(Util || {});
