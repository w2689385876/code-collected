$(function(){
    var companys =  [
    {
        "profession": [
            "五险一金",
            "创业公司",
            "扁平管理",
            "免费班车",
            "弹性工作",
            "岗位晋升"
        ],
        "company": "360",
        "slogan": "我们的核心价值观：用户至上、创业心态、持续创新、不断反思、 开放协作",
        "jobs": [
            "C++",
            "产品经理",
            "资深UI设计师",
            "电脑技术支持工程师",
            "SEO推广专员",
            "商务助理实习生"
        ]
    },
    {
        "profession": [
            "周末双休",
            "五险一金",
            "免费班车",
            "年终奖金"
        ],
        "company": "美团网",
        "slogan": "技术大牛组成的牛人团队",
        "jobs": [
            "技术经理",
            "商户端产品经理",
            "交互设计经理",
            "产品运营",
            "商务拓展专员",
            "行政主管"
        ]
    },
    {
        "profession": [   
            "节日礼物",
            "技能培训",
            "文化灵活",
            "绩效奖金",
            "定期体检",
            "弹性工作"
        ],
        "company": "搜狐",
        "slogan": "中国最领先的新媒体、网络游戏、搜索及无线互联网服务公司",
        "jobs": [
            "Flash开发工程师",
            "移动产品运营经理",
            "UI设计师",
            "内容运营编辑",
            "电商专员",
            "HRBP"
        ]
    },
    {
        "profession": [
            "技能培训",
            "旅游基金",
            "年终多薪",
            "补充商报",
            "节日礼物",
            "五险一金"
        ],
        "company": "去哪儿网",
        "slogan": "人生就是一段旅行，不在乎终点，在于沿途的风景。",
        "jobs": [
            "ios开发工程师",
            "移动产品经理",
            "用户研究顾问",
            "运营主管",
            "BD经理",
            "培训经理"
        ]
    },
    {
        "profession": [
            "股票期权",
            "弹性工作",
            "五险一金",
            "免费班车",
            "岗位晋升",
            "节日礼物"
        ],
        "company": "百度",
        "slogan": "众里寻他千百度",
        "jobs":[ "iOS - 高级研发工程师","产品经理","UI设计师","客服","市场营销","百度贴吧VP秘书"]
    },
    {
        "profession": [    
            "岗位晋升",
            "定期体检",
            "年度旅游",
            "五险一金",
            "免费班车"
        ],
        "company": "阿里巴巴",
        "slogan": "让天下没有难做的生意",
        "jobs": [
            "java架构师",
            "产品经理",
            "资深视觉设计师",
            "资深商品运营",
            "大客户代表",
            "高级组织发展专家"
        ]
    },
    {
        "profession": [
            "绩效奖金",
            "股票期权",
            "五险一金",
            "交通补助",
            "带薪年假",
            "年底双薪"
        ],
        "company": "携程",
        "slogan": "携程在手 说走就走",
        "jobs": [
            "Android",
            "产品总监",
            "视觉设计师",
            "数据分析师",
            "业务主管",
            "部门培训文化主管"
        ]
    },
    {
        "profession": [
            "免费班车",
            "成长空间",
            "年度旅游",
            "岗位晋升",
            "技能培训",
            "管理规范"
        ],
        "company": "腾讯",
        "slogan": "连接一切，从连接人才开始！",
        "jobs": [
            "QQ后台开发工程师",
            "高级产品运营经理",
            "微信支付设计师",
            "高级游戏运营策划",
            "高级品牌公关经理",
            "招聘经理"
        ]
    }
];
    var jobs1 = [
                 {
                     "type": "技术",
                     "company": "广发证券",
                     "goods": "良好的技术氛围，互联网金融领域",
                     "jobName": "Java开发工程师",
                     "require": "经验3-5年/本科及以上/全职",
                     "address": "广州",
                     "salary": "20k-30k"
                 },
                 {
                     "type": "技术",
                     "company": "支付宝",
                     "goods": "阿里巴巴 支付宝 蚂蚁金服",
                     "jobName": "高级测试工程师",
                     "require": "经验3-5年/本科及以上/全职",
                     "address": "上海",
                     "salary": "20k-40k"
                 },
                 {
                     "type": "技术",
                     "company": "阿里旅行",
                     "goods": "参与阿里旅行未来酒店的技术体系建设",
                     "jobName": "高级Java开发工程师",
                     "require": "经验3-5年/本科及以上/全职",
                     "address": "北京",
                     "salary": "18k-30k"
                 },
                 {
                     "type": "技术",
                     "company": "考拉迷你仓",
                     "goods": "五险一金 弹性工作 交通补助",
                     "jobName": "Java工程师",
                     "require": "经验3-5年/大专及以上/全职",
                     "address": "北京",
                     "salary": "15k-20k"
                 },
                 {
                     "type": "技术",
                     "company": "饿了么",
                     "goods": "Aeron椅 标配MBP 发展广阔 团队气氛好",
                     "jobName": "数据库架构师",
                     "require": "经验3-5年/本科及以上/全职",
                     "address": "上海",
                     "salary": "20k-30k"
                 }
                 
             ];
var jobs2 = [
{
        "type": "产品",
        "company": "京东金融",
        "goods": "五险一金；弹性工作；带薪旅游；年底双薪；交通补助",
        "jobName": "高级产品经理",
        "require": "经验1-3年/本科/全职",
        "address": "北京",
        "salary": "10k-20k"
    },
    {
        "type": "产品",
        "company": "爱钱进",
        "goods": "六险一金 14-16薪 一年两次调薪机会",
        "jobName": "移动产品经理",
        "require": "经验5-10年/大专及以上/全职",
        "address": "北京",
        "salary": "13k-25k"
    },
    {
        "type": "产品",
        "company": "投哪网",
        "goods": "待遇优厚，前景广阔，钱多任性",
        "jobName": "产品总监",
        "require": "经验3-5年/本科及以上/全职",
        "address": "深圳",
        "salary": "20k-30k"
    },
    {
        "type": "产品",
        "company": "e袋洗",
        "goods": "团队氛围好，发展前景好",
        "jobName": "后台产品经理",
        "require": "经验1-3年/本科及以上/全职",
        "address": "北京",
        "salary": "9k-18k"
    },
    {
        "type": "产品",
        "company": "美团网",
        "goods": "周末双休，五险一金，免费班车，年终奖金",
        "jobName": "商户端产品经理",
        "require": "经验1-3年/本科及以上/全职",
        "address": "北京",
        "salary": "15k-25k"
    }
];
var jobs3 = [
    {
        "type": "设计",
        "company": "积木盒子",
        "goods": "六险一金+带薪年假病假+工作居住证+旅游",
        "jobName": "高级交互设计师",
        "require": "经验1-3年/本科及以上/全职",
        "address": "北京",
        "salary": "15k-20k"
    },
    {
        "type": "设计",
        "company": "艺龙网",
        "goods": "给力的团队，靠谱的产品，有钱途的待遇！",
        "jobName": "高级UI设计师",
        "require": "经验1-3年/本科及以上/全职",
        "address": "北京",
        "salary": "8k-13k"
    },
    {
        "type": "设计",
        "company": "大众点评",
        "goods": "福利待遇 发展前景",
        "jobName": "营销视觉设计师",
        "require": "经验不限/本科及以上/全职",
        "address": "上海",
        "salary": "8k-15k"
    },
    {
        "type": "设计",
        "company": "滴滴打车",
        "goods": "发展前景 工作氛围 创业机会 自我实现",
        "jobName": "视觉设计师",
        "require": "经验1-3年/本科及以上/全职",
        "address": "北京",
        "salary": "10k-20k"
    },
    {
        "type": "设计",
        "company": "自如网",
        "goods": "15~17薪、房租补贴、带薪年假、六险一金",
        "jobName": "高级移动端UI设计师",
        "require": "经验3-5年/本科及以上/全职",
        "address": "北京",
        "salary": "13k-20k"
    }
];
var jobs4 = [
{
        "type": "运营",
        "company": "投哪网",
        "goods": "待遇优厚，前景广阔，钱多任性",
        "jobName": "产品总监",
        "require": "经验3-5年/本科及以上/全职",
        "address": "深圳",
        "salary": "20k-30k"
    },
    {
        "type": "运营",
        "company": "途牛旅游网",
        "goods": "上市公司 新部门 晋升空间 牛B你就来",
        "jobName": "新媒体运营",
        "require": "经验1-3年/本科及以上/全职",
        "address": "南京",
        "salary": "8k-16k"
    },
    {
        "type": "运营",
        "company": "芒果网",
        "goods": "发展平台 职业规划 薪酬福利",
        "jobName": "产品运营经理",
        "require": "经验3-5年/本科及以上/全职",
        "address": "深圳",
        "salary": "10k-20k"
    },
    {
        "type": "运营",
        "company": "实惠APP",
        "goods": "免费水果供应、轻松的工作氛围",
        "jobName": "运营策略经理",
        "require": "经验3-5年/本科及以上/全职",
        "address": "北京",
        "salary": "10k-20k"
    },
    {
        "type": "运营",
        "company": "聚美优品",
        "goods": "上市公司，新业务高速增长，美女多",
        "jobName": "运营经理",
        "require": "经验3-5年/本科及以上/全职",
        "address": "北京",
        "salary": "10k-16k"
    }
];
var jobs5 = [
{
        "type": "市场",
        "company": "人人贷",
        "goods": "十五薪 餐补 五险一金",
        "jobName": "媒介主管",
        "require": "经验1-3年/本科及以上/全职",
        "address": "北京",
        "salary": "9k-15k"
    },
    {
        "type": "市场",
        "company": "携程",
        "goods": "携程因你而精彩",
        "jobName": "业务主管",
        "require": "经验不限/本科及以上/全职",
        "address": "上海",
        "salary": "6k-12k"
    },
    {
        "type": "市场",
        "company": "搜房网",
        "goods": "福利多",
        "jobName": "销售经理",
        "require": "经验不限/本科及以上/全职",
        "address": "北京",
        "salary": "6k-10k"
    },
    {
        "type": "市场",
        "company": "小马管家",
        "goods": "期权 分红 高成长",
        "jobName": "门店店长",
        "require": "经验1-3年/学历不限/全职",
        "address": "杭州",
        "salary": "4k-8k"
    },
    {
        "type": "市场",
        "company": "珍爱网",
        "goods": "大平台 创业项目 靠谱产品 投资稳定",
        "jobName": "项目经理",
        "require": "经验3-5年/本科及以上/全职",
        "address": "深圳",
        "salary": "20k-30k"
    }
];
var jobs6 = [
{
        "type": "职能",
        "company": "融360",
        "goods": "15薪 六险一金 饭补 话补 带薪年假",
        "jobName": "招聘专员/主管",
        "require": "经验不限/本科及以上/全职",
        "address": "北京",
        "salary": "4k-8k"
    },
    {
        "type": "职能",
        "company": "拍拍贷",
        "goods": "薪资高、弹性时间、旅游、免费水果、健身房",
        "jobName": "人力资源专员/绩效专员",
        "require": "经验1-3年/本科及以上/全职",
        "address": "上海",
        "salary": "4k-7k"
    },
    {
        "type": "职能",
        "company": "58同城",
        "goods": "双休，五险一金",
        "jobName": "人力资源专员",
        "require": "经验1-3年/本科及以上/全职",
        "address": "深圳",
        "salary": "4k-6k"
    },
    {
        "type": "职能",
        "company": "赶集网",
        "goods": "百亿市值，大平台，大发展~",
        "jobName": "资深培训专员",
        "require": "经验3-5年/本科及以上/全职",
        "address": "北京",
        "salary": "8k-15k"
    },
    {
        "type": "职能",
        "company": "京东",
        "goods": "上市公司高层岗位",
        "jobName": "人力资源总监 HRD",
        "require": "10年以上/本科及以上/全职",
        "address": "北京",
        "salary": "30k-50k"
    }
];
var jobs = [];
jobs.push(jobs1);
jobs.push(jobs2);
jobs.push(jobs3);
jobs.push(jobs4);
jobs.push(jobs5);
jobs.push(jobs6);
    
    
    $(".job_detail").html(mytemplate("jobs-template",jobs[0]));


    //切换职位  
    $('.joblist_nav li').click(function(){
        $(this).addClass('hover').siblings().removeClass('hover');
        var i = $(this).index();
        $(".job_detail").html(mytemplate("jobs-template",jobs[i]));
    });

    //点击公司logo，出现公司卡片
    $(".img-box img").click(function(event){
        event.stopPropagation();
        var i = $(this).index();
        $(".comp_box").html(mytemplate("company-template",companys[i]));
        $(".comp_box").show();
    });

    //点击职位，出现职位卡片
    $(".job_detail").on("click","li",function(event){
        event.stopPropagation();
        var i = $(".joblist_nav").find(".hover").index();
        var jobList = jobs[i];
        var j = $(this).index();
        var data = jobList[j];
        if(typeof(data.require) == "string"){
            data.require = data.require.split("/");
        }
        $(".job_box").html(mytemplate("job-template",data));
        $(".job_box").show();
    });

    function mytemplate(id,data){
    var source   = $("#"+id).html();
    var template = Handlebars.compile(source);
    return template(data);
    }
    
});
