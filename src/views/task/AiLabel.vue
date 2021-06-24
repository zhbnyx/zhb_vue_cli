<template>
    <div class=" label-mark-body"
         v-loading="isloading"
         :element-loading-text="loadingText"
         element-loading-background="rgba(0, 0, 0, 0.8)"
         ref="main">
        <!--顶部栏-->
        <div class="head">
            <div class="head-top">
                <div class="head-left">
                    <!-- <router-link key="collapse" class="sidebar-logo-link" :to="router.go(1)"> -->
                    <a href=""><img :src="require('@/assets/logo_new.png')" class="sidebar-logo" height="38px"></a>
                    <!-- </router-link> -->
                </div>
                <div class="head-right">
                    <div  class="goback" @click="goback">关闭</div>
                    <div class="head-count">
                        <span style="margin:0 20px 0 25px;line-height:18px;font-size: 14px;color:#fff;">{{currentBigImgUrlIndex+1}}/{{imgData.length}}</span>
                        <!--                        <span style="margin-right: 30px;">56%</span>-->
                    </div>

                    <div class="imgPage">
                        <div class="icon-button pre" @click="changePreLargePic">上一张
                            <span>快捷键：<img src="@/assets/icon/next.png"></span>
                        </div>
                        <div class="icon-button next" @click="changeNextLargePic">
                            下一张
                            <span>快捷键：<img src="@/assets/icon/prev.png"></span>
                        </div>
                    </div>

                </div>

            </div>
            <div class="text">
                <span>任务描述：{{propsMarkjobDescribe || '无'}} </span>
            </div>

        </div>
        <!--主体-->
        <div class="ailabelmarkbox" >
            <!--侧边工具栏-->
            <ul class="leftmenu">
                <li class="icon-td" @click="getmode('pan')">
                    <p>拖拽(Ctrl+Alt+W)</p>
                </li>
                <li class="icon-kx" @click="getmode('drawRect')">
                    <p>框选(Ctrl+Alt+Q)</p>
                </li>
<!--                <li class="el-icon-refresh-left remark" @click="removeAllFeatures">-->
<!--                    <p>还原(Ctrl+Alt+B)</p>-->
<!--                </li>-->
                <li class="icon-fd" @click="setZoom('max')">
                    <p>放大</p>
                </li>
                <li class="icon-sx" @click="setZoom('min')">
                    <p>缩小</p>
                </li>
                <li class="icon-save" @click="save">
                    <p>保存(Ctrl+Alt+S)</p>
                </li>
                <li class="icon-cx" @click="removeAllFeatures">
                    <p>撤销(Ctrl+Alt+Z)</p>
                </li>
                <li class="icon-wx" @click="invalidFeatures">
                    <p>无效(Ctrl+Alt+X)</p>
                </li>
                <li  class="icon-setting" @click="martSetting">
                    <!--<i class="el-icon-document-delete" />-->
                    <p>设置(Ctrl+Alt+A)</p>
                </li>
                <!--        <li class="icon-color" @click="setColor">-->
                <!--          <p>颜色配置</p>-->
                <!--          <div class="color-box">-->

                <!--          </div>-->
                <!--        </li>-->
                <!-- <li class="icon-fzimg" @click="reversalFeatures(90)">
                  <p>顺时针翻转</p>
                </li>
                <li class="icon-fzimg2" @click="reversalFeatures(-90)">
                  <p>逆时针翻转</p>
                </li> -->
            </ul>
            <!--中间标注区域-->
            <div class="mark-map-box"  ref="markbox"  :style="bgStyle">
                <div id="map"  :style="GetWindowInfo" ></div>
                <div v-show="isInvalid" class="invalid"></div>
            </div>
            <!--右侧标签-->
            <div class="mark-labels-box">
                <div class="mark-labels-card" v-for="(label,index) in jobDetail.labels.labelGroups[0].options" :key="index">
                    <div class="mark-labels-title">{{label.name}}</div>
                    <div class="mark-labels-main">
                        <el-checkbox-group v-model="checklabelArray">
                            <el-checkbox v-for="(subItem) in label.children" :key="subItem.labelId" :label="subItem.labelId">{{ subItem.name }}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>
            <!--设置页面-->
            <div class="mark-seeting-box" v-if="isSetting" :class="isSetting?'on':''">
                <div class="mark-seeting-top"><span>设置</span><span @click="isSetting=false">×</span></div>
                <div class="mark-seeting-main">
                    <!--背景色-->
                    <div class="mark-seeting-color">
                        背景色
                        <div class="mark-seeting-bgColor" @click="isBgStyle=true">
                            <span :style="bgStyle"></span>
                            <i class="el-icon-arrow-down"></i>
                        </div>
                        <div class="ict-color"  v-if="isBgStyle">
                            <ict-color v-model="bgStyle.background"  @input="colorValueChange"></ict-color>
                            <div class='ict-color-btn' @click="isBgStyle=false">关闭</div>
                        </div>
                    </div>
                    <!--画布背景-->
                    <div class="mark-seeting-color">
                        画布背景
                        <div class="mark-seeting-bgColor" @click="isCanvasBgStyle=true">
                            <span :style="canvasBgStyle"></span>
                            <i class="el-icon-arrow-down"></i>
                        </div>
                        <div class="ict-color"  v-if="isCanvasBgStyle">
                            <ict-color v-model="canvasBgStyle.background"  @input="canvasColorValueChange"></ict-color>
                            <div class='ict-color-btn' @click="isCanvasBgStyle=false">关闭</div>
                        </div>
                    </div>
                    <!--绘制时候线颜色-->
                    <div class="mark-seeting-color">
                        绘制线
                        <div class="mark-seeting-bgColor" @click="isDrawStyle=true">
                            <span :style="drawStyle"></span>
                            <i class="el-icon-arrow-down"></i>
                        </div>
                        <div class="ict-color"  v-if="isDrawStyle">
                            <ict-color v-model="drawStyle.background"  @input="drawStyleColorValueChange"></ict-color>
                            <div class='ict-color-btn' @click="isDrawStyle=false">关闭</div>
                        </div>
                    </div>
                    <!--文字颜色-->
                    <div class="mark-seeting-color">
                        文字
                        <div class="mark-seeting-bgColor" @click="isTextStyle=true">
                            <span :style="textStyle"></span>
                            <i class="el-icon-arrow-down"></i>
                        </div>
                        <div class="ict-color"  v-if="isTextStyle">
                            <ict-color v-model="textStyle.background"  @input="textStyleColorValueChange"></ict-color>
                            <div class='ict-color-btn' @click="isTextStyle=false">关闭</div>
                        </div>
                    </div>
                    <!--绘制线边框-->
                    <div class="mark-seeting-color">
                        绘制线边框
                        <div class="mark-seeting-input" >
                            <el-input-number v-model="lineWidth" controls-position="right" @change="lineWidthHandleChange" :min="1" :max="20"></el-input-number>
                        </div>
                    </div>
                    <!--文字大小-->
                    <div class="mark-seeting-color">
                        文字大小
                        <div class="mark-seeting-input" >
                            <el-input-number v-model="fontSize" controls-position="right" @change="fontSizeHandleChange" :min="12" :max="48"></el-input-number>
                        </div>
                    </div>
                    <!--文字显示-->
                    <div class="mark-seeting-color">
                        文字显示
                        <div class="mark-seeting-input" >
                            <el-switch
                                    v-model="isShowText"
                                    active-color="#13ce66"
                                    inactive-color="#BCC1C4"
                            @change="showText">
                            </el-switch>
                        </div>
                    </div>

                </div>
            </div>
            <!--到底啦！====================================-->
        </div>
        <!-- 跳转多少页数 -->
        <div class="dh-skip-page">
            <div class="left">
                <div class="img">
                    <img class="img-icon" src="@/assets/icon/banner-prev.png" @click="labelImgPrev" >
                    <img class="img-con" v-for="(item,index) in imgData" :src="item.imgUrl" :key="index"
                         :class="index==currentBigImgUrlIndex?'on':''" @click="getLabelImg(index)">
                    <img class="img-icon" src="@/assets/icon/banner-next.png" @click="labelImgNext" >


                </div>

                <!--        <div class="num">-->
                <!--          <span style="letter-spacing: 2px">跳转到第</span>-->
                <!--          <el-input-number-->
                <!--                  v-model="num"-->
                <!--                  size="small"-->
                <!--                  step-strictly-->
                <!--                  controls-position="right"-->
                <!--                  @change="handleChange"-->
                <!--                  :min="1"-->
                <!--                  :max="totalImgAll"-->
                <!--          >-->
                <!--          </el-input-number>-->
                <!--          <span style="padding-left: 10px;"> 张</span>-->
                <!--        </div>-->
            </div>
            <div class="right"></div>
        </div>
    </div>
</template>

<script>
    import AILabel from 'ailabel'
    import { Sketch } from 'vue-color'
    let gMap
    let gFeatureLayer
    let gTextLayer

    let gMappoints
    let newPoints
    let _this
    export default {
        name: "AiLabel",
        props:["propsMarkAiLabelMarkId","propsMarkAiLabelMarkSubId","propsMarkjobDescribe","propsMarkexpirationTime"],
        data: function () {
            return {
                isShowText:true,
                fontSize:14,//文字大小
                lineWidth:2,//绘制边框
                textStyle:{//文字颜色
                    background:'#f00'
                },
                isTextStyle:false,//文字调色盘显示与否
                drawStyle:{//绘制时候线颜色
                    background:'#05F57E'
                },
                isDrawStyle:false,//绘制时候线调色盘显示与否
                canvasBgStyle:{//背景色
                    background:'#2B2B2B'
                },
                isCanvasBgStyle:false,//背景色调色盘显示与否
                bgStyle:{//背景色
                    background:'#1A1A1A'
                },
                isBgStyle:false,//背景色调色盘显示与否
                isSetting:false,//设置是否显示
                isloading:false,
                loadingText:'正在翻转...',
                isInvalid:false,
                width: '',
                height: '',
                isDraw:true,// 判断拖动还是框选
                //图片懒加载区域
                imgShowArr: [],
                imgUrl:'',
                //imgUrl:'http://172.16.218.205:9000/label/20210426/6y07.JPG?AWSAccessKeyId=minioadmin&Expires=1620352122&Signature=%2F4lJfUhsYurH3ch3P0YTxinsAm0%3D',
                mode:'drawRect',//拖拽（pan）or drawRect 框选drawPolygon

                totalImg:'100',
                totalImgAll:'100',
                currentBigImgUrlIndex:0,
                label:'',
                queryeImagedate: {
                    jobId:"", //任务ID
                    subJobId:'',
                    pageNum:1,
                    pageSize:1,
                    dataType:'',
                    jobType: 2, //任务类型1，征集管理  2 标注管理  11 征集执行 22 标注执行"
                    uploadUser: "", //上传人姓名
                    approveStatus: "5,0", //审核状态0 未提交 1审批中、2已审批  3、已提交
                    approveUser: "", //审核人姓名
                },
                //获取到得标注信息
                jobDetail: {
                    labels: {
                        labelType: "ClassificationMark",
                        labelGroups: [
                            {
                                options: [
                                    {name: "特征", labelId: "tongdao_06",
                                        children:[
                                            {name: "眼睛", labelId: "tongdao_07"},
                                            {name: "鼻子", labelId: "tongdao_08"},
                                            {name: "嘴巴", labelId: "tongdao_09"},
                                            {name: "耳朵", labelId: "tongdao_10"},
                                            {name: "头", labelId: "tongdao_11"},
                                        ]
                                    }
                                ],
                                selectType: "single",
                                describe: "冰箱门数标注（单选）"
                            }
                        ]
                    }
                },
                labelArray: [],//单选标注选择存储
                checklabelArray:[],//多选标注选择存储
                currentImgId:'',//存储图片id
                labelInfo:{
                    shape_type: '2',
                    positionsLabels:[],
                    status:''
                },//存储标注信息
                jobDescribe:'无',
                isRemoveAllFeatures:false,
                GetWindowInfo:{
                    height:'',
                    width:'',
                    background:''
                },

                //配置标注框样式
                mappingStyles:{
                    drawRect: {
                        // 绘制框常用样式声明
                        drawStyle: {strokeColor: '#05F57E', opacity: 1, lineWeight: 2},
                        // 绘制框完成样式声明
                        featureStyle: {strokeColor: '#00FF00', fillColor: '#7BC8FF', opacity: 0.5, lineWeight: 2},
                        // 标注标签样式声明
                        textStyle:{fontColor: '#f00',fontSize:'22',strokeColor:'#0000FF',bgColor:"transparent", opacity: 0}
                    },
                    pan: {
                        drawStyle: {},
                        featureStyle: {}
                    }
                },
                //图片数组集合
                imgData:[
                    {imgUrl:"https://ftp.bmp.ovh/imgs/2021/06/18714484ed0bcedd.jpeg"},
                    {imgUrl:"https://ftp.bmp.ovh/imgs/2021/06/6c1de67f16cd473a.jpg"},
                    {imgUrl:"https://ftp.bmp.ovh/imgs/2021/06/f1e72ea4509bfdc3.jpg"},
                    {imgUrl:"https://ftp.bmp.ovh/imgs/2021/06/0e08adcc12a84823.jpg"},
                    {imgUrl:"https://ftp.bmp.ovh/imgs/2021/06/c10aede244ea0307.jpg"},
                    {imgUrl:"https://ftp.bmp.ovh/imgs/2021/06/6aa6957f01aaf8cf.jpg"},
                    {imgUrl:"https://ftp.bmp.ovh/imgs/2021/06/ffafc9b499c87516.jpg"},
                    {imgUrl:"https://ftp.bmp.ovh/imgs/2021/06/37f229f7abf99d89.jpg"},
                    {imgUrl:"https://ftp.bmp.ovh/imgs/2021/06/8ffaa2489786e6f8.webp"},
                    {imgUrl:"https://ftp.bmp.ovh/imgs/2021/06/a4d652910bbb7826.jpg"},
                ]

            }
        },
        created() {
            _this = this
        },
        mounted() {
            const _this = this;
            //快捷键
            const handlerCtrlZ = function(e){
                //撤销快捷键
                if(e.ctrlKey && e.altKey && e.keyCode == 90){
                    _this.removeAllFeatures();
                }
                //保存快捷键
                if(e.ctrlKey && e.altKey  && e.keyCode == 83){
                    e.preventDefault()
                    _this.save();
                }
                //无效快捷键
                if(e.ctrlKey && e.altKey  && e.keyCode == 88){
                    e.preventDefault()
                    _this.invalidFeatures();
                }
                //还原快捷键
                if(e.ctrlKey && e.altKey  && e.keyCode == 66){
                    e.preventDefault()
                    _this.removeAllFeatures();
                }
                //框选快捷键
                if(e.ctrlKey && e.altKey  && e.keyCode == 81){
                    e.preventDefault()
                    _this.getmode('drawRect');
                }
                //框选快捷键
                if(e.ctrlKey && e.altKey  && e.keyCode == 87){
                    e.preventDefault()
                    _this.getmode('pan');
                }
                //AI 识别
                if(e.ctrlKey && e.altKey  && e.keyCode == 68){
                    e.preventDefault()
                    _this.setDrawPoint();
                }
                //下一张快捷键
                if(e.keyCode == 39){
                    e.preventDefault()
                    _this.changeNextLargePic();
                }
                //上一张快捷键
                if(e.keyCode == 37){
                    e.preventDefault()
                    _this.changePreLargePic();
                }
                //设置快捷键
                if(e.ctrlKey && e.altKey  && e.keyCode == 65){
                    e.preventDefault()
                    _this.isSetting = true;
                }
            }
            document.addEventListener('keyup',handlerCtrlZ);
            this.$on('hook:destroyed',()=>{
                document.removeEventListener(handlerCtrlZ)
            })
            this.showMarkImg()
            this.$refs.main.addEventListener('click',function () {
                gMap.mLayer.removeAllMarkers();
            })
        },
        methods: {
            //获取图片
            showMarkImg(){
                let that = this
                that.imgUrl = that.imgData[that.currentBigImgUrlIndex].imgUrl
                setTimeout(()=>{
                    const width = that.$refs.markbox.offsetWidth
                    const height = that.$refs.markbox.offsetHeight
                    //that.imgUrl = that.imgShowArr[0].file_full_url;
                    //that.currentImgId = that.imgShowArr[0].id;
                    that.labelInfo = {
                        shape_type: '2',
                        positionsLabels:[]
                    };
                    //获取图片的真实宽高

                    var img = new Image();
                    img.src = that.imgUrl;
                    img.onload = () => {
                        console.log(img.height);
                        console.log(img.width);
                        //设置容器宽高
                        var width1;
                        var height1;
                        height>img.height?width1=img.width:width1=img.width/(img.height/height)
                        height>img.height?height1=img.height:height1=height
                        width1>width?that.width=width:that.width=width1
                        height1>height?that.height=height:that.height=height1
                        //重新加载
                        that.GetWindowInfo.width = that.width+'px'
                        that.GetWindowInfo.height = that.height+'px'
                        setTimeout(()=>{

                            that.ailabel();
                        },500)
                        setTimeout(()=>{
                            this.isloading = false
                        },2000)
                    }
                },500)
            },
            //切换上一张图片

            //标注===============================
            goback(){
                this.$emit('oncloseApprovalMarkDialog')
                this.imgShowArr = []
                this.totalImg = 1
            },
            getmode(mode){
                var that = this;
                that.mode = mode
                gMap.setMode(that.mode, new AILabel.Style(that.mappingStyles[that.mode].drawStyle));
            },
            //切换上一张图片
            changePreLargePic() {

                /**处理下一张标注信息
                 * */
                if (this.currentBigImgUrlIndex == 1) {
                    this.$message.info("当前图片已是第一张");
                } else {
                    this.isInvalid = false;
                    this.labelInfo.status = "";
                    /**加载上一张图片
                     * */
                    this.isloading = true;
                    this.loadingText = "正在加载上一张...";
                    this.queryeImagedate.queryType = 0;
                    this.currentBigImgUrlIndex--;
                    this.showMarkImg()
                }
            },
            //切换下一张图片
            changeNextLargePic() {
                /**处理下一张标注信息
                 * */
                console.log(this.currentBigImgUrlIndex);
                if (this.currentBigImgUrlIndex == this.totalImgAll) {
                    this.$message.info("当前图片已是最后一张");
                } else {
                    this.isInvalid = false;
                    this.labelInfo.status = "";
                    /**加载下一张图片
                     * */
                    this.isloading = true;
                    this.loadingText = "正在加载下一张...";
                    this.queryeImagedate.queryType = 1;
                    this.currentBigImgUrlIndex++;
                    this.showMarkImg()
                }
            },
            ailabel(){

                const that = this;
                // 容器对象声明
                gMap = new AILabel.Map('map', {zoom: that.width , cx: 0, cy: 0, zoomMax: that.width * 10, zoomMin: that.width / 10, autoPan: false, drawZoom: true});
                // drawPolyline多边形绘制
                gMap.setMode(that.mode, new AILabel.Style(that.mappingStyles[that.mode].drawStyle));
                // 绘制矩形时显示十字丝
               // gMap.setRectCross(true);
                // 图片层实例\添加
                let gImageLayer = new AILabel.Layer.Image('img',that.imgUrl, { w: that.width,h: that.height}, {zIndex: 1});
                gMap.addLayer(gImageLayer);
                // 矢量层实例\添加
                gFeatureLayer = new AILabel.Layer.Feature('featureLayer', {zIndex: 2, transparent: false});
                gMap.addLayer(gFeatureLayer);
                // 文本层实例\添加
                gTextLayer = new AILabel.Layer.Text("label-id", {zIndex: 2});
                gMap.addLayer(gTextLayer);
                gMap && gMap.tipLayer.hideTips();
                //gMap.centerAndZoom({x:0,y:0},-1)
                //标注回显
                this.addLabelInfo()
                //绘制完成，读取标注信息
                this.getlabelInfo()
            },
            //绘制完成，读取标注信息
            getlabelInfo(){
                let that = this
                //绘制完成
                gMap.events.on('geometryDrawDone', function (type, points) {
                    if(that.labelInfo.status == 9){
                        that.$message.error('无效图片禁止标注！')
                        gMap.setMode('pan');
                    }else{
                        if(that.checklabelArray.length == 0){
                            that.$message.info('请先勾选右侧标签！')
                        }else{
                            //将获取的坐标x轴平移，y轴翻转；翻转之后的坐标用于存储传后台，不在当前也绘制
                            //回显坐标需处理
                            newPoints = []
                            points.forEach(function (item) {
                                var newObj = {};
                                newObj.x = item.x + that.width/2;
                                newObj.y = Math.abs(item.y - that.height/2);
                                newPoints.push(newObj)
                            })
                            gMappoints = points
                            that.markText()
                        }
                    }

                });
                //双击添加删除按钮
                gMap.events.on('featureSelected', function (feature) {
                    let cFeature = feature;
                    console.log(cFeature);
                    // 删除按钮添加
                    //const featureBounds = cFeature.getBounds();
                    // const leftTopPoint = featureBounds[1]; // 边界坐上角坐标
                    let deleteMarker = new AILabel.Marker(`marker-${cFeature.id}`,{
                        src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACJklEQVRYR82XsW7UQBCG/3GaxBfqNOdr4A2CQAoKDQo0IMFLBImKi++6SASJLuccFRJ5CZCggYgGRCQQ9wahOV+TmpwvTXaivZzB3ux61ziSz+3Mznwzuzv7m1DzRzXnRymAoDtZ5zNxD0QbBKwAtHJRAB8zcAzmA1rwvsS7S99cC3MCaIXjTQZtAlh1DDwg8P4wauzb/AsBgnD8GKDtEonVfAOAX8VR470JxAjQ6pw+ZxZ9WwUudiKvPewtvtb5agFaW6cPmcQHl+CuPsTeo+He4kfV/xJAs53cIg8/XAOX8WOB26O+/zO75hJAECa/Kuy5jWcQR/5NI8DstL+1RaliJ/DT7O3IdcBWPTO/lMmJ6IUOwmafrcl14S9A0D65D8/7ZKpOBh/tNXakvbk13lEhbPZcXCEexP3lz9NiUkPQSXbB6LgAqBDZ5CbAXFxCL+753RxAM0y+E7BWtL+6RNI/7YxTcjm4gcNR5N/JdyBMjgBctx0wFSLrr9saQ7zfceTfUAAmfwBetgFIuw6iRHK58ydxtHRt3gBq3oLaD6FtD4uuWtlrmPX/Nwe6k3UI/uoyByoPIo/upqppfkaxrLz2x0hC2B4klzlR4FP8HF8ATHXgu4qJDMv5iaoP9ZLsCvVgSmLShWZReoW60KQHc6NY17OZPnxTQaINWOCZqgOzueb7x0TtylQ1LXgbzFjT/ZoR4RBn4iBVOy4H2akDLoH+16d2gHNaQVEwZljaWQAAAABJRU5ErkJggg==',
                        x: cFeature.points[1].x,
                        y: cFeature.points[1].y,
                        offset: {
                            x:-30,
                            y: -5
                        },
                        featureId: cFeature.id
                    });
                    gMap.mLayer.addMarker(deleteMarker);

                    //删除
                    deleteMarker.regEvent('click', function () {
                        let that = this
                        // 执行选中元素删除
                        gFeatureLayer.removeFeatureById(that.info.featureId);
                        // 对应删除标注层中删除（x）icon
                        gMap.mLayer.removeAllMarkers(that);
                        //截取featureId
                        var featureId = that.info.featureId.split("-")[0];
                        //截取回显数据为第几条
                        var positionindex = that.info.featureId.split("-")[2];
                        if(featureId == "draw"){//回显
                            _this.labelInfo.positionsLabels[positionindex].labels.forEach((item,index)=>{
                                var textid = "text-"+that.info.featureId+index
                                gTextLayer.removeTextById(textid);
                            })
                        }else{
                            var textid = "text-"+that.info.featureId
                            gTextLayer.removeTextById(textid);
                        }
                        //删除对应的标注存储数据
                        _this.labelInfo.positionsLabels.splice(positionindex,1)
                    });

                });
                //编辑完成
                gMap.events.on('geometryEditDone', (type, activeFeature, points) => {
                    var editPoints = []
                    points.forEach(function (item) {
                        var newObj = {};
                        newObj.x = item.x + that.width/2;
                        newObj.y = Math.abs(item.y - that.height/2);
                        editPoints.push(newObj)
                    })
                    gMappoints = points
                    that.editText(activeFeature.id,editPoints)
                    gMap.mLayer.removeAllMarkers();
                });
            },
            //弹框显示 ，标记标签
            markText(){
                let that = this
                console.log(that.mappingStyles[that.mode].featureStyle);
                const texts = []
                //获取标签数据
                if(that.checklabelArray.length != 0){
                    that.checklabelArray.forEach(function (item) {
                        that.jobDetail.labels.labelGroups[0].options.forEach((subitem)=>{
                            for(var i = 0; i < subitem.children.length; i++){
                                if(subitem.children[i].labelId == item){
                                    var multiplemarklabel = subitem.children[i]
                                    texts.push(multiplemarklabel)
                                }
                            }
                        })
                    })
                }
                //画框=============================================
                // 生成元素唯一标志（时间戳）
                const timestamp = new Date().getTime()
                var index = this.labelInfo.positionsLabels.length
                // 元素添加展示
                const id =`feature-${timestamp}-${index++}`
                const featureStyle = that.mappingStyles[that.mode].featureStyle;
                console.log(featureStyle);
                let fea = new AILabel.Feature.Rect(id, gMappoints,
                    {name: '标注'}, featureStyle,
                  );
                gFeatureLayer.addFeature(fea)
                // 文本添加
                if(this.isShowText){
                    this.objTrim(texts).forEach((item,index)=>{
                        var text  = new AILabel.Text("text-"+id, {
                            pos: {x:gMappoints[0].x, y:gMappoints[0].y-(index*28)},
                            offset: {x: 0, y: 0},
                            width: 100, // maxwidth
                            text: item.name
                        }, that.mappingStyles[that.mode].textStyle);
                        gTextLayer.addText(text);
                    })
                }
                //数据保存
                var saveLabels = {
                    labels:[],
                    // points:[],
                    pointsArr:[],
                    id:id
                }
                saveLabels.labels = texts
                // saveLabels.points = newPoints
                saveLabels.pointsArr = [[newPoints[0].x,newPoints[0].y],[newPoints[2].x,newPoints[2].y]]
                that.labelInfo.positionsLabels.push(saveLabels)
                //that.checklabelArray = []
                //

            },
            //数组对象去重
            objTrim(test){
                let obj = {};
                test= test.reduce((cur,next) => {
                    obj[next.labelId] ? "" : obj[next.labelId] = true && cur.push(next);
                    return cur;
                },[]);
                return test;
            },
            //编辑修改标注
            editText(id,editPoints){
                var that = this;
                //重新绘制红框
                gFeatureLayer.removeFeatureById(id);
                let fea = new AILabel.Feature.Rect(id, gMappoints, {
                    name: '标注'
                }, that.mappingStyles[that.mode].featureStyle);
                gFeatureLayer.addFeature(fea)
                //文本重显==========================================
                var pointsArr = [[editPoints[0].x,editPoints[0].y],[editPoints[2].x,editPoints[2].y]]
                if(this.isShowText){
                    this.labelInfo.positionsLabels.forEach((item) => {
                    if(item.id == id){
                        //数据替换
                        item.pointsArr = pointsArr
                        //文本重显
                        gTextLayer.removeTextById("text-"+id);
                        item.labels.forEach((subItem,index)=>{
                            var text  = new AILabel.Text("text-"+id, {
                                pos: {x:gMappoints[0].x, y:gMappoints[0].y-(index*28)},
                                offset: {x: 0, y: 0},
                                width: 100, // maxwidth
                                text: subItem.name
                            }, that.mappingStyles[that.mode].textStyle);
                            gTextLayer.addText(text);
                        })

                    }
                })
                }
            },
            //回显已框选信息
            addLabelInfo(){
                let that = this


                if(that.labelInfo.status == 9){
                    that.isInvalid = true
                    that.labelInfo.status = '9'
                }
                console.log(that.labelInfo.positionsLabels);
                if(that.labelInfo.positionsLabels.length !=0 ){
                    that.labelInfo.positionsLabels.forEach((item)=>{
                        that.setLabel(item)

                    })
                }
            },
            setLabel(item){
                const that = this
                var id;
                //id=`draw-${timestamp}-${index}`
                id = item.id
                //获取算法需用格式的 坐标
                var x1 = item.pointsArr[0][0] - that.width/2;
                var y1 = -(item.pointsArr[0][1]) + that.height/2;
                var x2 = item.pointsArr[1][0] - that.width/2;
                var y2 = -(item.pointsArr[1][1]) + that.height/2;
                var oldPoints2 = [
                    {"x":x1,"y":y1},
                    {"x":x2,"y":y1},
                    {"x":x2,"y":y2},
                    {"x":x1,"y":y2},
                ];
                // 元素添加展示
                let fea = new AILabel.Feature.Rect(id, oldPoints2, {
                    name: '标注'
                }, that.mappingStyles[that.mode].featureStyle);
                gFeatureLayer.addFeature(fea);
                //回显文本
                if(this.isShowText) {
                    if (item.labels.length != 0) {
                        console.log(item.labels);
                        this.objTrim(item.labels).forEach((subitem, index) => {
                            var text = new AILabel.Text("text-" + id, {
                                pos: {x: oldPoints2[0].x, y: oldPoints2[0].y - (index * 28)},
                                offset: {x: 0, y: 0},
                                width: 100, // maxwidth
                                text: subitem.name
                            }, that.mappingStyles[that.mode].textStyle);
                            gTextLayer.addText(text);
                            that.checklabelArray.push(subitem.labelId)
                        })
                    }
                }
            },
            //撤销所有
            removeAllFeatures(){
                // gFeatureLayer.removeAllFeatures();
                // gTextLayer.removeAllTexts();
                // gMap.mLayer.removeAllMarkers();
                this.labelInfo.status = ''
                this.isInvalid = false
                // this.labelInfo = {
                //     shape_type: '',//标注方式
                //     positionsLabels:[]
                // }
                console.log(this.labelInfo.positionsLabels.length);
                var length = this.labelInfo.positionsLabels.length
                if(length!=0){
                    this.isRemoveAllFeatures = true
                    gTextLayer.removeTextById("text-"+this.labelInfo.positionsLabels[length-1].id);
                    gFeatureLayer.removeFeatureById(this.labelInfo.positionsLabels[length-1].id);
                    gMap.mLayer.removeAllMarkers();
                    this.labelInfo.positionsLabels.splice(length - 1,length)

                }
                if(this.checklabelArray.length!=0){
                    this.checklabelArray.splice(length - 1,length)
                }

            },
            //图片标记无效
            invalidFeatures(){
                this.isInvalid = true
                this.labelInfo.status = '9'
            },
            //翻转图片
            reversalFeatures(angel){
                console.log(angel);
                let that = this

                if(that.labelInfo.positionsLabels.length != 0 || that.isInvalid == true){
                    this.$message.error("已有标注信息，禁止翻转")
                }else{
                    that.isloading = true
                    that.loadingText = '正在翻转...'

                }
            },
            //保存
            save(){
                let that = this
                console.log(that.isRemoveAllFeatures);
                // var query = {
                //     fileId:that.currentImgId,
                //     json:JSON.stringify(that.labelInfo)
                // };
                if(that.labelInfo.positionsLabels.length != 0 || that.isInvalid == true || that.isRemoveAllFeatures == true ){
                    that.$message.success("标注成功");
                }
            },

            //zoom
            setZoom(zoomvalue){
                if(zoomvalue == 'max'){
                    gMap && gMap.zoomIn();
                }else{
                    gMap && gMap.zoomOut();
                }
            },
            //缩略图向前查询
            labelImgPrev(){
                if (this.currentBigImgUrlIndex <= 10)
                    return this.$message.info("已经加载完成！");
                this.isloading = true;
                this.loadingText = "正在加载上一张...";
              this.currentBigImgUrlIndex--
                this.showMarkImg()

            },
            //缩略图向后查询
            labelImgNext(){
                if (this.currentBigImgUrlIndex >= this.totalImgAll - 9)
                    return  this.$message.info("已经加载完成！");
                this.isloading = true;
                this.loadingText = "正在加载下一张...";
                this.currentBigImgUrlIndex++
                this.showMarkImg()

            },
            //当前图片渲染
            getLabelImg(index){
                this.isloading = true;
                this.loadingText = "正在加载...";
                this.currentBigImgUrlIndex = index
                this.showMarkImg()
            },
            //设置
            martSetting(){
                this.isSetting = true
            },
            // 背景颜色值改变事件处理
            colorValueChange (val) {// 取颜色对象的十六进制值
                this.bgStyle.background = val.hex
            },
            // 画布背景颜色值改变事件处理
            canvasColorValueChange(val) {
                // 取颜色对象的十六进制值
                this.canvasBgStyle.background = val.hex
                this.GetWindowInfo.background = val.hex
            },
            //绘制线颜色
            drawStyleColorValueChange(val) {
                // 取颜色对象的十六进制值
                this.drawStyle.background = val.hex
                this.mappingStyles.drawRect.drawStyle.strokeColor = val.hex
                this.mappingStyles.drawRect.featureStyle.strokeColor = val.hex

                var length = this.labelInfo.positionsLabels.length
                if(length!=0){
                    this.labelInfo.positionsLabels.forEach(item => {
                        gTextLayer.removeTextById("text-"+item.id);
                        gFeatureLayer.removeFeatureById(item.id);
                        gMap.mLayer.removeAllMarkers();
                    })



                }
                this.ailabel()
            },
            //文字颜色
            textStyleColorValueChange(val) {
                // 取颜色对象的十六进制值
                this.textStyle.background = val.hex
                this.mappingStyles.drawRect.textStyle.fontColor = val.hex
                var length = this.labelInfo.positionsLabels.length
                if(length!=0){
                    this.labelInfo.positionsLabels.forEach(item => {
                        gTextLayer.removeTextById("text-"+item.id);
                        gFeatureLayer.removeFeatureById(item.id);
                        gMap.mLayer.removeAllMarkers();
                    })



                }
                this.ailabel()
            },
            //绘制边框
            lineWidthHandleChange(val){
                this.mappingStyles.drawRect.drawStyle.lineWeight = val
                this.mappingStyles.drawRect.featureStyle.lineWeight = val
                var length = this.labelInfo.positionsLabels.length
                if(length!=0){
                    this.labelInfo.positionsLabels.forEach(item => {
                        gTextLayer.removeTextById("text-"+item.id);
                        gFeatureLayer.removeFeatureById(item.id);
                        gMap.mLayer.removeAllMarkers();
                    })



                }
                this.ailabel()
            },
            //文字大小
            fontSizeHandleChange(val){
                this.mappingStyles.drawRect.textStyle.fontSize = val
                var length = this.labelInfo.positionsLabels.length
                if(length!=0){
                    this.labelInfo.positionsLabels.forEach(item => {
                        gTextLayer.removeTextById("text-"+item.id);
                        gFeatureLayer.removeFeatureById(item.id);
                        gMap.mLayer.removeAllMarkers();
                    })
                }
                this.ailabel()
            },
            //文字显示
            showText(){
                var length = this.labelInfo.positionsLabels.length
                if(length!=0){
                    this.labelInfo.positionsLabels.forEach(item => {
                        gTextLayer.removeTextById("text-"+item.id);
                        gFeatureLayer.removeFeatureById(item.id);
                        gMap.mLayer.removeAllMarkers();
                    })
                }
                this.ailabel()
            }

        },
        components: {
            'ict-color': Sketch
        },
        watch:{

        }
    }
</script>

<style lang="scss" scoped>
    /*@import "~@/common/css/base.css";*/
    /*@import "~@/common/css/ict_style.scss";*/
    .min-body{
        padding: 0!important;
    }
    .dh-detail {
        margin-left: 81vw;
        .word {
            margin-left: 5px;
        }
        li:nth-child(2) {
            display: inline-block;
            margin-left: 10px;
        }
    }
    .dh-skip-page {
        display: flex;
        height: 80px;
        width: calc(100% - 40px);
        margin-left: 40px;
        .left {
            color: #fff;
            letter-spacing: 1px;
            padding-top: 1.5px;
            width: calc(100% - 254px);
            background: #1a1a1a;
            border-top: 1px solid black;
            text-align: right;
            position: relative;
            // .left-button {
            //   position: absolute;
            //   left: 1px;
            //   width: 60px;
            //   height: 30px;
            //   border-radius: 3px;
            // }
            display: flex;
            align-items: center;
            div.img{
                width:100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                .img-con{
                    width: 195px;
                    height: 7vh;
                    margin: 6px 10px;
                    border:3px solid transparent;
                }
                .img-con:hover{
                    border:3px solid red;
                    cursor: pointer;
                }
                .img-con.on{
                    border:3px solid red;
                    cursor: pointer;
                }
                .img-icon{
                    width: 40px;
                    height:40px;
                    cursor: pointer;
                }
            }
            div.num{
                height: 32px;
                display: flex;
                align-items: center;
                white-space: nowrap;
            }
        }
        .right {
            width: 254px;
            background-color: #2b2b2b;
        }
    }
    .invalid{
        width: 20vw;
        height: 20vw;
        background: red;
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 100;
        transform: translate(-50%,-50%);
        background: url("~@/assets/icon/icon-invalid.png") no-repeat;
        background-size: 100% 100%;
    }
    .mark-map-box{
        width: calc(100% - 294px);
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        height: 100%;
        background: #1a1a1a;
        position: relative;
    }
    #map {
        display:inline-block;

        /*border: 1px solid #f00;*/
        position: relative;
        line-height: 70vh;
        font-size: 5vw;
        color: rgba(222,225,230);
    }
    .mark-labels-box{
        width: 254px;
        height: 100%;
        .mark-labels-card{
            width: calc(100% - 20px);
            margin: 0 10px 10px 10px;

            background: #FFFFFF;
            border-radius: 4px;
            .mark-labels-title{
                width: 234px;
                height: 31px;
                line-height: 31px;
                background: #FAFAFA;
                border-radius: 4px 4px 0px 0px;

            }
            .mark-labels-main{
                width: calc(100% - 20px);
                margin: 0 10px;
                padding: 10px 0 ;
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
            }
        }
    }
    .head{
        background-color: #2B2B2B;
        color: #fff;
        height: 84px;

        .head-top{
            width: 100%;
            height: 40px;
            border:1px solid #212121;
            box-sizing: border-box;

            display: flex;
        }
        .head-left{

            cursor: pointer;
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-right:1px solid #212121;
            box-sizing: border-box;
            img{
                width: 16px;
                height: 16px;
            }

        }
        .head-right{
            font-size: 14px;
            display: flex;
            width: calc(100% - 40px);
            position: relative;
            .goback{
                width: 80px;
                height: 28px;
                line-height:28px;
                border:1px solid #363636;
                border-radius:2px;
                font-size: 14px;
                text-indent: 20px;
                cursor:pointer;
                color:#BDBDBD;
                margin:6px 0 0 17px;
                background:#2B2B2B url("~@/assets/icon/icon-fh.png") no-repeat 16px center ;
                background-size: 7px 12px;

            }
            .playbox{
                margin: 12px;
                .page{
                    border-radius: 14px;
                    margin-left: 16px;
                }
            }
            .head-count{
                position: absolute;
                top:50%;
                left:40%;
                transform: translate(-50%,-50%);
                /*background:#2B2B2B url("../../../../assets/icon/icon-num.png") no-repeat center left;*/
                /*background-size: 15px 15px;*/

            }
            .imgPage{
                position: absolute;
                top:50%;
                right:20px;
                transform: translateY(-50%);
                display: flex;
                align-items: center;
            }
            .icon-button.icon-button {
                width: 88px;
                height: 28px;
                line-height: 28px;
                background: #1d73f6;
                border-radius: 2px;
                font-size: 14px;
                cursor: pointer;
                position: relative;
                span{
                    font-size: 12px;
                    display: none;
                    z-index: 100;
                    position: absolute;
                    top: 29px;
                    right: 0;
                    background: #ffffff;
                    color: #000000;
                    min-width: 88px;
                    height: 27px;
                    font-family: PingFangSC, PingFangSC-Regular;
                    font-weight: 400;
                    line-height: 27px;
                    margin: 0;border-radius: 0;
                    white-space: nowrap;
                    text-align: center;
                    text-indent: 5px;
                    img{
                        width: 20px;
                        margin: 4px 5px 0 0;
                        float: right;
                    }
                }
                &:hover{
                    span{
                        display: block;
                    }
                }
            }
            .icon-button.pre {
                text-indent: 35px;
                background: #1d73f6 url("~@/assets/icon/icon-pre.png") no-repeat 10px
                center;
                background-size: 16px 12px;
            }
            .icon-button.next {
                text-indent: 8px;
                background: #1d73f6 url("~@/assets/icon/icon-next.png") no-repeat 62px
                center;
                background-size: 16px 12px;
                margin-left: 15px;
            }
        }

        .text{
            line-height: 44px;
            width: 100%;
            margin-left: 40px;
            font-size: 12px;
            span{
                float:left;
            }
        }
    }
    .ailabelmarkbox{
        height: calc(100% - 164px);
        display: flex;
        background: #2b2b2b;
        position: relative;
        .leftmenu {
            margin: 0;
            padding: 0;
            background-color: #2B2B2B;
            color: #ffffff;
            display: inline-block;
            width: 40px;
            border-top: 1px solid #212121;
            height: calc(100vh - 80px);
            box-sizing: border-box;
            vertical-align: top;

            li {
                list-style: none;
                /*padding: 8px 16px;*/
                text-align: center;
                /*overflow: hidden;*/
                height: 40px;
                /*width: 40px;*/
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                white-space: nowrap;
                i {
                    font-size: 16px;
                    color: #BDBDBD;
                }

                p {
                    font-size: 12px;
                    display: none;
                    z-index: 100;
                    position: absolute;
                    top: 8px;
                    left:40px;

                    background: #ffffff;
                    border-radius: 4px;
                    color: #000000;
                    padding: 0 10px;
                    width: 110px;
                    height: 27px;
                    font-family: PingFangSC, PingFangSC-Regular;
                    font-weight: 400;
                    line-height: 27px;
                    margin: 0;
                }


            }
            li:hover {
                background-color: #3b5a88;
            }

            li:hover p {
                display: block;
            }

            li.active {
                background-color: #234271;
            }

            li.icon-td{
                background:  url("~@/assets/icon/icon-td.png") no-repeat center center;
                background-size: 16px 16px;
            }
            li.icon-td:hover{
                background: #3b5a88  url("~@/assets/icon/icon-td.png") no-repeat center center;
                background-size: 16px 16px;
            }
            li.icon-kx{
                background:  url("~@/assets/icon/icon-kx.png") no-repeat center center;
                background-size: 16px 16px;
            }
            li.icon-kx:hover{
                background: #3b5a88  url("~@/assets/icon/icon-kx.png") no-repeat center center;
                background-size: 16px 16px;
            }
            li.icon-td.active{
                background: #234271 url("~@/assets/icon/icon-td.png") no-repeat center center;
                background-size: 16px 16px;
            }
            li.icon-kx.active{
                background: #234271 url("~@/assets/icon/icon-kx.png") no-repeat center center;
                background-size: 16px 16px;
            }
            li.icon-save{
                background:  url("~@/assets/icon/icon-save.png") no-repeat center center;
                background-size: 16px 16px;
            }
            li.icon-save:hover {
                background: #3b5a88 url("~@/assets/icon/icon-save.png") no-repeat center center;
                background-size: 16px 16px;
            }
            li.icon-fd{
                background: url("~@/assets/icon/icon-fd.png") no-repeat center center;
                background-size: 16px 16px;
            }
            li.icon-fd:hover {
                background: #3b5a88 url("~@/assets/icon/icon-fd.png") no-repeat center center;
                background-size: 16px 16px;
            }
            li.icon-sx{
                background: url("~@/assets/icon/icon-sx.png") no-repeat center center;
                background-size: 16px 16px;
            }
            li.icon-sx:hover {
                background: #3b5a88 url("~@/assets/icon/icon-sx.png") no-repeat center center;
                background-size: 16px 16px;
            }
            li.icon-cx{
                background: url("~@/assets/icon/icon-cx.png") no-repeat center center;
                background-size: 16px 16px;
            }
            li.icon-cx:hover {
                background: #3b5a88 url("~@/assets/icon/icon-cx.png") no-repeat center center;
                background-size: 16px 16px;
            }
            li.icon-wx{
                background: url("~@/assets/icon/icon-wx.png") no-repeat center center;
                background-size: 16px 16px;
            }
            li.icon-wx:hover {
                background: #3b5a88 url("~@/assets/icon/icon-wx.png") no-repeat center center;
                background-size: 16px 16px;
            }

            li.icon-fzimg{
                background: url("~@/assets/icon/icon-fzimg.png") no-repeat center center;
                background-size: 16px 20px;
            }
            li.icon-fzimg:hover {
                background: #3b5a88 url("~@/assets/icon/icon-fzimg.png") no-repeat center center;
                background-size: 16px 20px;
            }

            li.icon-fzimg2{
                background: url("~@/assets/icon/icon-fzimg2.png") no-repeat center center;
                background-size: 16px 20px;
            }
            li.icon-fzimg2:hover {
                background: #3b5a88 url("~@/assets/icon/icon-fzimg2.png") no-repeat center center;
                background-size: 16px 20px;
            }
            li.icon-setting{
                background: url("~@/assets/icon/icon-setting.png") no-repeat center center;
                background-size: 20px 20px;
            }
            li.icon-setting:hover {
                background: #3b5a88 url("~@/assets/icon/icon-setting.png") no-repeat center center;
                background-size: 20px 20px;
            }
        }
        /*.262E3F\*/
        .mark-seeting-box{
            width: 254px;
            height: 100%;
            position: absolute;
            top:0;
            left: 0;
            background: #2B2B2B;
            z-index: 1000;
            transform: scale(0,1);
            transform-origin: left;
            transition: 3s all linear;
            border-top:1px solid #212121;
            &.on{
                transform: scale(1,1);
            }
            .mark-seeting-top{
                width: calc(100% - 30px);
                height: 44px;
                border-bottom:1px solid #212121;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 14px;
                padding: 0 15px;
                color:#ffffff;
                span:nth-of-type(2){
                    cursor: pointer;
                    font-size: 30px;
                }


            }
            .mark-seeting-main{
                width: 100%;
                height: calc(100% - 44px);
                .mark-seeting-color{
                    width: calc(100% - 20px);
                    padding: 0 10px;
                    color:#ffffff;
                    font-size: 14px;
                    height: 80px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: relative;
                    .mark-seeting-bgColor{
                        width: 40px;
                        height: 25px;
                        background: #ffffff;
                        border-radius: 3px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 0 5px;
                        span{
                            display: block;
                            width: 20px;
                            height: 20px;
                        }
                        i{
                            color:#000000;
                        }
                    }
                    .ict-color{
                        position: absolute;
                        top:115px;
                        left:50%;
                        background: #ffffff;
                        border-radius: 3px;
                        padding-bottom: 10px;
                        transform: translateX(-50%);
                        z-index: 10;
                        .ict-color-btn{
                            padding: 10px 15px;
                            border-radius: 3px;
                            background: #349ADC;
                            cursor: pointer;
                            float: right;
                            margin-top: 15px;
                            margin-right: 10px;
                        }
                    }

                }
            }
        }

    }
</style>
<style lang="scss">
    .vc-sketch{
        box-shadow: none!important;
    }
    .mark-seeting-input{
        .el-input-number{
            height: 40px!important;
            width: 91px!important;
        }
        .el-input{
            height: 40px!important;
            .el-input__inner{
                width: 50px!important;
                margin-top: 0!important;
                padding: 0!important;
            }
        }
    }
    .head{
        .el-radio{
            color:#ffffff!important;
        }
    }
    .label-mark-body{
        width: 100%;
        height: 100%;
        .el-checkbox-group{
            text-align: left;
        }
        .optionbox{
            display: block;
            height: 60vh;
            overflow: auto;
        }
        .el-dialog__header{
            text-align: left;
        }
        .el-dialog__body{
            height: 60vh;
        }
        .el-button{
            line-height: 6px;
            height: 32px;
            border-radius:0px;
        }
        .mark-labels-card{
            .el-checkbox{
                padding: 3px;
                height: 24px;
                line-height: 24px;
                border-radius: 2px;
                border: 1px solid #D9D9D9;
                margin-right: 10px;
                margin-bottom: 10px;
            }
            .el-checkbox.is-checked{
                border: 1px solid #409EFF;
            }
            .el-checkbox__input{
                display: none!important;
            }
            .el-checkbox__label{
                padding-left: 0!important;
            }
        }

    }

</style>
