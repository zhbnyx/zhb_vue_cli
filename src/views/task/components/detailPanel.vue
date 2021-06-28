<template>
<div class="min-body">
    <!--任务详情+{{jobId}}-->
    <!--任务详情-->
    <div class="detai-main" style="margin-top: 9px">
        <div class="detai-title">任务详情</div>
        <div class="detai-con" style="margin-top: 8px">
            <el-row class="detai-el-row">
                <div class="detai-subcon">
                    <div>任务名：</div>
                    <div>仪表盘图片质量征集</div>
                </div>
                <div class="detai-subcon">
                    <div>负责人：</div>
                    <div>刘乐乐</div>
                </div>
                <div class="detai-subcon">
                    <div>联系电话：</div>
                    <div>15050860387</div>
                </div>
                <div class="detai-subcon">
                    <div>开始时间：</div>
                    <div>2020-10-15 19:00:00</div>
                </div>
            </el-row>
            <el-row class="detai-el-row">
                <div class="detai-subcon">
                    <div>数据类型：</div>
                    <div>图片</div>
                </div>
                <div class="detai-subcon">
                    <div>任务总量：</div>
                    <div>2000</div>
                </div>
                <div class="detai-subcon">
                    <div>单价：</div>
                    <div>10元/份</div>
                </div>
                <div class="detai-subcon">
                    <div>申请上限：</div>
                    <div>2000</div>
                </div>
            </el-row>
            <el-row class="detai-el-row">
                <div class="detai-subcon">
                    <div>标注方式：</div>
                    <div>框选标注</div>
                </div>
                <div class="detai-subcon">
                    <div>标注内容：</div>
                    <div>漏油、锈蚀、破损、丢失</div>
                </div>
                <div class="detai-subcon">
                    <div>标注截止时间：</div>
                    <div>2020-10-11 07:34:32</div>
                </div>
                <div class="detai-subcon">
                    <div>审批截止时间：</div>
                    <div>2020-10-11 07:34:32</div>
                </div>
            </el-row>
            <el-row class="detai-el-row">
                <div class="detai-subcon2">
                    <div>任务描述：</div>
                    <div>搜集仪表盘图片质量征集，请按照规范进行提交，上传文件为.jpg、.png</div>
                </div>
                <div class="detai-subcon2">
                    <div>任务附件：</div>
                    <div><a href="">1.仪表盘图片质量</a><a href="">2.仪表盘图片质量</a></div>
                </div>
            </el-row>
            <el-row class="detai-el-row">
                <div class="detai-subcon2">
                    <div>审批描述：</div>
                    <div>搜集仪表盘图片质量征集，请按照规范进行提交，上传文件为.jpg、.png</div>
                </div>
                <div class="detai-subcon2">
                    <div>审批附件：</div>
                    <div><a href="">1.仪表盘图片质量</a></div>
                </div>
            </el-row>

        </div>
    </div>
    <!--提交情况-->
    <div class="detai-main">
        <div class="detai-title">提交情况</div>
        <div class="detai-con">
            <el-table
                    v-loading="loading"
                    border
                    :data="submissionData"
                    :header-cell-style="{
                            marginTop:'15px',
                            color: 'rgba(0, 0, 0, 0.85)',
                        }">
                <el-table-column prop="jobId" label="序号" width="100" />
                <el-table-column prop="jobName" label="领取人" />
                <el-table-column prop="jobNum" label="分派数量" />
                <el-table-column prop="jobAmount" label="提交量" />
                <el-table-column prop="label_amount" label="审核中" />
                <el-table-column prop="receiveTime" label="未审核"/>
                <el-table-column prop="expirationTime" label="通过"/>
            </el-table>
            <el-row>
                <div class="task-close">任务关闭</div>
            </el-row>

        </div>
    </div>
    <!--审批情况-->
    <div class="detai-main">
        <div class="detai-title">审批情况</div>
        <div class="detai-con">
            <el-table
                    v-loading="loading"
                    border
                    :data="approvalData"
                    :header-cell-style="{
                            marginTop:'15px',
                            color: 'rgba(0, 0, 0, 0.85)',
                        }">
                <el-table-column prop="jobId" label="序号" width="100" />
                <el-table-column prop="jobName" label="审批组" />
                <el-table-column prop="jobNum" label="通过门限" />
                <el-table-column prop="jobAmount" label="审核中" />
                <el-table-column prop="receiveTime" label="未通过"/>
                <el-table-column prop="expirationTime" label="通过"/>
            </el-table>
        </div>
    </div>
    <!--数据详情-->
    <div class="detai-main" style="margin-bottom: 20px;">
        <div class="detai-title">数据详情</div>
        <div class="detai-con">
            <!--查询条件-->
            <div class="query-box">
                <!--审批环节-->
                <div class="query-box-row">
                    审批环节：
                    <el-select v-model="queryParams.spValue" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <!---->
                <div class="query-box-row">
                    <el-checkbox-group v-model="queryParams.dataTypeList">
                        <el-checkbox label="1">审核中</el-checkbox>
                        <el-checkbox label="2">未通过</el-checkbox>
                        <el-checkbox label="3">通过</el-checkbox>
                    </el-checkbox-group>
                </div>
                <!--审核人-->
                <div class="query-box-row">
                    审核人：
                    <el-input
                            v-model="queryParams.shr"
                            placeholder="请输入"
                            class="input"
                    />
                </div>
                <!--排除审核人-->
                <div class="query-box-row">
                    排除审核人：
                    <el-input
                            v-model="queryParams.pcshr"
                            placeholder="请输入"
                            class="input"
                    />
                </div>
                <!--提交人-->
                <div class="query-box-row">
                    提交人：
                    <el-input
                            v-model="queryParams.tjr"
                            placeholder="请输入"
                            class="input"
                    />
                </div>
                <!--操作-->
                <div class="query-box-button">
                    <div class="reset-btn" @click="resetqueryParams">重 置</div>
                    <div class="query-btn">查 询</div>
                </div>
            </div>
            <!--图片展示-->
            <div class="img-box">
                <!--数值-->
                <div class="value-box">
                    <div class="value-box-num">共 45563 份数据</div>
                    <div class="value-box-page">
                        选择第 <el-input
                            v-model="firstPage"
                            class="input"
                            />
                        至<el-input
                            v-model="lastPage"
                            class="input"
                            />条
                    </div>
                </div>
                <!--图片-->
                <div class="img-views-box">
                    <div class="img-views">
                        <img src="https://ftp.bmp.ovh/imgs/2021/06/18714484ed0bcedd.jpeg">
                        <div class="img-views-name">仪表盘现场图</div>
                    </div>
                    <div class="img-views">
                        <img src="https://ftp.bmp.ovh/imgs/2021/06/6c1de67f16cd473a.jpg">
                        <div class="img-views-name">仪表盘现场图</div>
                    </div>
                    <div class="img-views">
                        <img src="https://ftp.bmp.ovh/imgs/2021/06/f1e72ea4509bfdc3.jpg">
                        <div class="img-views-name">仪表盘现场图</div>
                    </div>
                    <div class="img-views">
                        <img src="https://ftp.bmp.ovh/imgs/2021/06/0e08adcc12a84823.jpg">
                        <div class="img-views-name">仪表盘现场图</div>
                    </div>
                    <div class="img-views">
                        <img src="https://ftp.bmp.ovh/imgs/2021/06/c10aede244ea0307.jpg">
                        <div class="img-views-name">仪表盘现场图</div>
                    </div>
                    <div class="img-views">
                        <img src="https://ftp.bmp.ovh/imgs/2021/06/6aa6957f01aaf8cf.jpg">
                        <div class="img-views-name">仪表盘现场图</div>
                    </div>
                    <div class="img-views">
                        <img src="https://ftp.bmp.ovh/imgs/2021/06/ffafc9b499c87516.jpg">
                        <div class="img-views-name">仪表盘现场图</div>
                    </div>
                    <div class="img-views">
                        <img src="https://ftp.bmp.ovh/imgs/2021/06/37f229f7abf99d89.jpg">
                        <div class="img-views-name">仪表盘现场图</div>
                    </div>
                    <div class="img-views">
                        <img src="https://ftp.bmp.ovh/imgs/2021/06/8ffaa2489786e6f8.webp">
                        <div class="img-views-name">仪表盘现场图</div>
                    </div>
                    <div class="img-views">
                        <img src="https://ftp.bmp.ovh/imgs/2021/06/a4d652910bbb7826.jpg">
                        <div class="img-views-name">仪表盘现场图</div>
                    </div>



                </div>
                <!--数据加载完成-->
                <div class="data-over-box">
                    <div class="data-over">还有1800条数据</div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
  export default {
        name: 'DetailPanel',
        components: {

        },
        props: {
            jobId: Number,
            istopPanel: Boolean
        },
        data: function() {
            return {
                params:{},
                loading: false,//加载loading效果
                submissionData:[//提交情况数据存储
                    {jobId:1,jobName:"admin",jobNum:10000,jobAmount:900,label_amount:900,receiveTime:0,expirationTime:900}
                ],
                approvalData:[//审批情况数据存储
                    {jobId:1,jobName:"admin、王娜娜",jobNum:10000,jobAmount:900,receiveTime:0,expirationTime:900},
                    {jobId:1,jobName:"admin、王娜娜",jobNum:10000,jobAmount:900,receiveTime:0,expirationTime:900},
                    {jobId:1,jobName:"admin、王娜娜",jobNum:10000,jobAmount:900,receiveTime:0,expirationTime:900}
                ],
                options: [//审批环节选择项存储
                    {value:'1',label:'无'},
                    {value:'2',label:'审批中'},
                    {value:'3',label:'审批未通过'},
                    {value:'4',label:'审批通过'}
                ],
                queryParams:{
                    spValue:'',//审批选中项存储
                    dataTypeList: [],//数据类型
                    shr:'',//审核人
                    pcshr:'',//排除审核人
                    tjr:''//提交人
                },
                firstPage:'',//选择第几页
                lastPage:''
            }
        },

        created() {
            this.params.jobId = this.jobId
            console.log(this.params);
            console.log(this.istopPanel);
        },
        mounted() {
        },
        methods: {
            resetqueryParams() {//重置
                this.queryParams.spValue = ''
                this.queryParams.dataTypeList = []
                this.queryParams.shr = ''
                this.queryParams.pcshr = ''
                this.queryParams.tjr = ''
            }
        }
    }
</script>

<style lang="scss" >
    .detai-el-row{
        display: flex;
    }
    .detai-main{
        width: 100%;
        margin-top: 24px;
        .detai-title{
            height: 54px;
            line-height: 54px;
            background: #f2f5fb;
            font-size: 16px;
            font-family: PingFangSC, PingFangSC-Medium;
            font-weight: 500;
            text-align: left;
            padding-left: 30px;
            color: #5a6d99;
        }
        .detai-con{
            width: 100%;
            margin-top: 15px;
            .detai-subcon{
                width: 25vw;
                margin-top: 16px;
                font-weight: 400;
                display: flex;
                div:nth-of-type(1){
                    width: 8vw;
                    text-align: right;
                    color: rgba(0,0,0,0.85);
                    font-size: 14px;
                }
                div:nth-of-type(2){
                    width: calc(100% - 8vw);
                    color: rgba(0,0,0,0.65);
                    font-size: 14px;
                    text-align: left;

                    a{
                        color: #1d73f6;
                        border-bottom:1px solid #1d73f6;
                    }
                }
            }
            .detai-subcon2{
                width: 50vw;
                margin-top: 16px;
                font-weight: 400;
                display: flex;
                div:nth-of-type(1){
                    width: 8vw;
                    text-align: right;
                    color: rgba(0,0,0,0.85);
                    font-size: 14px;
                }
                div:nth-of-type(2){
                    width: calc(100% - 8vw);
                    color: rgba(0,0,0,0.65);
                    font-size: 14px;
                    text-align: left;
                    a{
                        color: #1d73f6;
                        border-bottom:1px solid #1d73f6;
                        margin-right: 15px;
                    }
                }
            }
            .task-close{
                width: 88px;
                height: 32px;
                line-height: 32px;
                color: #ffffff;
                background: #1d73f6;
                border-radius: 2px;
                float:right;
                cursor: pointer;
                margin-top: 15px;
            }
            .task-close:hover{
                background: #3787ff;
            }
            .query-box{
                width: 100%;
                display: flex;
                align-items: center;
                position: relative;
                .query-box-row{
                    display: flex;
                    font-size: 14px;
                    height: 32px;
                    align-items: center;
                    white-space: nowrap;
                    margin-right: 2vh;
                    color: rgba(0,0,0,0.65);
                    .el-input--suffix .el-input__inner{
                        margin: 0;
                        height: 32px;
                        width: 160px;
                        background: #ffffff;
                        border: 1px solid #d9d9d9;
                        border-radius: 2px;
                    }
                    .el-select .el-input .el-select__caret{
                        line-height: 32px;
                    }

                }
            }
        }
        .el-select-dropdown__list{
            padding-bottom: 15px;
        }
        .el-input__inner{
            margin: 0;
            height: 32px;
            width: 110px;
            background: #ffffff;
            border: 1px solid #d9d9d9;
            border-radius: 2px;
        }
    }
    .query-box-button{
        position: absolute;
        right:0;
        display: flex;
        .reset-btn{
            width: 65px;
            height: 32px;
            line-height: 32px;
            background: #ffffff;
            border: 1px solid #d9d9d9;
            box-sizing: border-box;
            border-radius: 2px;
            color:rgba(0,0,0,0.65);
            font-size: 14px;
            font-weight: 400;
            cursor: pointer;
        }
        .reset-btn:hover{
            border: 1px solid #1d73f6;
            color:#1D73F6;
            box-sizing: border-box;
        }
        .query-btn{
            width: 65px;
            height: 32px;
            line-height: 32px;
            background: #1d73f6;
            border: 1px solid #1d73f6;
            box-sizing: border-box;
            border-radius: 2px;
            color: #ffffff;
            font-size: 14px;
            font-weight: 400;
            cursor: pointer;
            margin-left: 9px;
        }
        .query-btn:hover{
            background: #3787ff;
        }
    }

    /**/
    .img-box{
        width: 100%;
        .value-box{
            width: 100%;
            margin-top: 24px;
            margin-bottom: 16px;
            display: flex;
            .value-box-num{
                height: 32px;
                font-size: 14px;
                font-family: PingFangSC, PingFangSC-Regular;
                font-weight: 400;
                color: rgba(0,0,0,0.85);
                line-height: 32px;
                margin-right: 24px;
            }
            .value-box-page{
                display: flex;
                align-items: center;
                font-size: 14px;
                font-family: PingFangSC, PingFangSC-Regular;
                font-weight: 400;
                color: rgba(0,0,0,0.85);
                white-space: nowrap;
                .el-input__inner{
                    padding: 0;
                    width: 48px;
                    height: 32px;
                    line-height: 32px;
                    margin: 0 8px;
                }

            }
        }
        .data-over-box{
            width: 100%;
            display: flex;
            justify-content: center;
            .data-over{
                padding:0 24px;
                height: 32px;
                line-height: 32px;
                background: #ffffff;
                border: 1px solid #d9d9d9;
                border-radius: 2px;
                color: rgba(0,0,0,0.65);
                font-size: 14px;
                font-family: PingFangSC, PingFangSC-Regular;
                font-weight: 400;
                margin: 0 auto;

            }
        }
        .img-views-box{
            width: 100%;
            display: flex;
            flex-wrap: wrap;

            .img-views{
                width: 15vw;
                box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
                border-radius:2px;
                margin: 0 10px 20px 10px;
                img{
                    display: block;
                    object-fit: fill;
                    width: 100%;
                    height: 180px;
                }
                .img-views-name{
                    width: calc(100% - 16px);
                    height: 6vh;
                    line-height: 6vh;
                    color: rgba(0,0,0,0.85);
                    font-size: 16px;
                    font-family: PingFangSC, PingFangSC-Medium;
                    font-weight: bold;
                    padding-left: 16px;
                    text-align: left;
                }
            }

        }
    }
</style>
