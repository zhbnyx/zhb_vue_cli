<template>
    <div class="min-body">
        <!--面包屑导航-->
        <ul class="menu-nav-tab" v-show="topCurrentLIst">
            <li
                    :key="121211"
                    :class="[indexpanel == 'index' ? 'on' : '']"
                    @click="indexpanel = 'index'">
                自动化采集
            </li>
            <li v-for="tab in tablist"
                :key="tab.jobId"
                class="item"
                :class="[indexpanel == 'panel' + tab.jobId ? 'on' : '']"
                @click="indexpanel = 'panel' + tab.jobId"
            >
                {{ tab.jobName }}<i class="ict-icon-close el-icon-close"  @click.stop="closeTab(tab.jobId)"></i></li>

        </ul>
        <!--主体页面-->
        <div class="ict-main-box"  :class="{'ictMainHeight':topCurrentLIst}">
             <!--任务展示-->
            <div v-show="indexpanel == 'index'" key="index" >
                <!--新建任务-->
                <div  style="display: flex">
                    <div class="ict-query-button">新建任务</div>
                </div>
                <!--搜索查询-->
                <div class="ict-search-box">
                    <el-row style="display: flex;margin-bottom: 10px;">
                        <!--任务名-->
                        <div class="ict-search-row">
                            <span style="margin-right: 24px">任务名</span>
                            <el-input
                                    v-model="params.jobName"
                                    placeholder="请输入"
                                    class="input"
                            />
                        </div>
                        <!--数据类型-->
                        <div class="ict-search-row">
                            <span>数据类型</span>
                            <el-checkbox-group v-model="dataTypeList">
                                <el-checkbox label="1">图片</el-checkbox>
                                <el-checkbox label="2">视频</el-checkbox>
                                <el-checkbox label="3">语音</el-checkbox>
                                <el-checkbox label="4">文本</el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <!--状态-->
                        <div class="ict-search-row">
                            <span>状态</span>

                            <el-select  v-model="params.state"  placeholder="请选择">
                                <el-option label="请选择" value=""></el-option>
                                <el-option label="上传" value="1"></el-option>
                                <el-option label="删除" value="2"></el-option>
                                <el-option label="下载" value="3"></el-option>
                            </el-select>
                        </div>
                    </el-row>
                    <el-row style="display: flex;margin-bottom: 10px;">
                        <!--完成时间-->
                        <div class="ict-search-row">
                            <span>完成时间</span>
                            <el-date-picker
                                    class="ict-date-picker"
                                    v-model="receiveTime"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    format="yyyy/MM/dd"
                                    value-format="yyyy-MM-dd"

                            />
                        </div>
                    </el-row>
                    <el-row style="display: flex">
                        <div class="ict-query-button" @click="queryTaskTable()">查 询</div>
                        <div class="ict-query-button cz" @click="resetTaskTabel()">重 置</div>
                    </el-row>
                </div>
                <!--table展示-->
                <el-table
                        v-loading="loading"
                        border
                        :data="tableData"
                        :header-cell-style="{
                            background: '#f6f6f6',
                            width: '1184px',
                            height: '54px',
                            lineHeight: '54px',
                            fontSize: '14px',
                            color: 'rgba(0, 0, 0, 0.85)',
                        }">
                    <el-table-column  label="序号" width="50" >
                        <template slot-scope="scope">
                            {{scope.$index+1}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="jobName" label="任务名" />
                    <el-table-column prop="publishUserName" label="负责人" />
                    <el-table-column prop="dataType" label="数据类型">
                        <template slot-scope="scope">
                            {{ formatDataType(scope.row.dataType) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="receivers" label="提交人" />
                    <el-table-column prop="needUploadAmount" label="目标数量" />
                    <el-table-column prop="uploadAmount" label="已征数量" />
                    <el-table-column prop="approvers" label="审核人" />
                    <el-table-column prop="startTime" label="领取时间" width="180" />
                    <el-table-column prop="approveEndTime" label="截止时间" width="180" />
                    <el-table-column prop="address" label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    type="text"
                                    size="small"
                                    @click="handleClick(scope.row)"
                            >查看</el-button>
                            <el-button
                                    type="text"
                                    size="small"
                                    @click="AiLabelClick"
                            >标注</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="ict-page-box">
                    <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page="params.pageNum"
                            background
                            :page-sizes="[1, 2, 5, 10]"
                            :page-size="params.pageSize"
                            layout="total, prev, pager, next, jumper"
                            :total="total"
                    ></el-pagination>
                </div>
            </div>
            <!--查看详情页-->
            <DetailPanel
                    v-for="tab in tablist"
                    v-show="indexpanel == 'panel' + tab.jobId"
                    :id="tab.jobId"
                    :key="tab.jobId"
                    :job-id="tab.jobId"
                    :istop-panel="istopPanel"
            />
        </div>
    </div>
</template>

<script>
    import DetailPanel from "@/views/task/components/detailPanel.vue";
    // import { getHistoryTaskList } from "@/api/collect_history_job_index";

    export default {
        name: 'auto_collect.vue',
        data(){
            return {
                istopPanel: false,
                indexpanel: "index",
                tablist: [],//面包屑导航数据存储
                loading: false,//加载loading效果
                //表格显示数据存储
                tableData:[],
                topCurrentLIst: false, //顶部当前任务显示与隐藏
                dataTypeList: [],//数据类型
                receiveTime:null,//征集截止时间
                expirationTime:null,//审批截止时间
                params:{
                    pageSize: 10, // 一页多少条
                    pageNum: 1,
                    jobName: '', // 任务名称
                    dataType:'', // 数据类别
                    state:'',//状态
                    startBeginTime:'',//完成开始时间
                    startEndTime:'',//完成结束时间
                },
                total:100,//分页总数
                isDialogVisible: false,//弹框
                //自定义数据=============================================
                res:{"msg":"success","code":"20000","data":{"count":6,"items":[
                    {"jobName":"小狗面部特征识别","publishUserName":"admin","dataType":1,"approvers":"","approveEndTime":"2020-10-21 00:00:00","needUploadAmount":"30","jobId":178,"approvingAmount":"0","receivers":"ssj","rejectedAmount":"0","startTime":"2020-10-21 19:04:11","uploadEndTime":"2020-10-21 00:00:00","approvedAmount":"8","uploadAmount":"8"},

                        ]
                }}
            }
        },
        mounted() {
            this.getTaskTable();
        },
        methods:{
            //查看详情页点击
            handleClick(row) {
                this.topCurrentLIst = true;
                let toTab = false;
                for (let i = 0; i < this.tablist.length; i++) {
                    if (this.tablist[i].jobId === row.jobId) {
                        toTab = true;
                        break;
                    }
                }
                if (!toTab) {
                    const obj = {
                        jobId: row.jobId,
                        jobName: row.jobName,
                    };
                    this.tablist.push(obj);
                }

                this.indexpanel = "panel" + row.jobId;
            },
            //判断数据类型
            formatDataType(dataType) {
                if (dataType === 1) {
                    return "图片";
                } else if (dataType === 2) {
                    return "视频";
                } else if (dataType === 3) {
                    return "语音";
                } else if (dataType === 4) {
                    return "文本";
                }
            },
            //面包屑tab导航关闭
            closeTab(jobId) {
                this.topCurrentLIst = false;
                this.indexpanel = "index";
                for (let i = 0; i < this.tablist.length; i++) {
                    if (this.tablist[i].jobId === jobId) {
                        this.tablist.splice(i, 1);
                        break;
                    }
                }
            },
            //分页查询
            handleCurrentChange(newPage) {
                this.params.pageNum = newPage
            },
            //查询任务
            queryTaskTable(){
                let that = this
                if(this.receiveTime != null){
                    that.params.startBeginTime = that.receiveTime[0];//发布开始时间
                    that.params.startEndTime = that.receiveTime[1];//发布结束时间
                }
                //数据类型
                // if(that.dataTypeList.length != 0){
                //     that.dataTypeList.forEach(item => {
                //         that.params.dataTypeList = that.params.dataTypeList + item +",";
                //     })
                //     if(that.params.dataTypeList.length >0){
                //         that.params.dataTypeList = that.params.dataTypeList.substring(0,that.params.dataTypeList.length - 1);
                //     }
                // }
                that.params.dataType=that.dataTypeList.join(',')
                console.log(this.params);




            },
            //获取任务数据
            getTaskTable(){
                let that = this
                // getHistoryTaskList(that.params)
                //  .then(res => {
                //     console.log(res);
                // })
                console.log(that.res)
                if(that.res.code == '20000'){
                    that.total = that.res.data.count
                    that.tableData = that.res.data.items
                }else{
                    that.$message.error(that.res.msg);
                }



            },
            //重置任务
            resetTaskTabel(){
                var params={
                    pageSize: 10, // 一页多少条
                    pageNum: 1,
                    jobName: '', // 任务名称
                    dataType:'', // 数据类别
                    state:'',//状态
                    startBeginTime:'',//完成开始时间
                    startEndTime:'',//完成结束时间
                }
                this.params = params
                this.dataTypeList = []//数据类型
                this.receiveTime = null//征集截止时间
            },
            //标注
            AiLabelClick(){
                this.$router.push('/AiLabel')
            }
        },
        components: {
            DetailPanel
        },
    }
</script>

<style lang="scss" >
</style>
