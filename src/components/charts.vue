<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-pie-chart"></i> echart图表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card shadow="hover">
                    <div ref="myChart" class = "echart"></div>
                </el-card>
            </el-col>
        </el-row>
        <div class="container">
            <el-col :span='12' > 
                <el-date-picker
                v-model="selectDate"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                style="width:95%">
                </el-date-picker>
            </el-col>
            <el-col :span='12'> 
                <el-time-picker
                    is-range
                    v-model="selectTime"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围"
                    style="width:100%"
                    >
                </el-time-picker>
            </el-col>
            <br/>
            <br/>
            <br/>

            <el-col :span='12'>
                <el-select v-model="selectType" multiple placeholder="请选择数据类型（可以多选）" style="width:95%">
                <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
                </el-select>
            </el-col>
            <el-col :span='12'>
                <el-input
                    placeholder="输入DeviceId"
                    suffix-icon="el-icon-circle-plus-outline"
                    v-model="selectDevice"
                >
                </el-input>
            </el-col>

            <br/>
            <br>
            <br>

            <el-col :span='6'>
                <el-input
                    placeholder="Min id"
                    suffix-icon="el-icon-grape"
                    v-model="minId"
                    style="width:90%"
                >
                </el-input>
            </el-col>
            <el-col :span='6'>
                <el-input
                    placeholder="Max id"
                    suffix-icon="el-icon-cherry"
                    v-model="maxId"
                    style="width:90%"
                >
                </el-input>                
            </el-col>
            <el-col :span='12'>
                <el-input
                    placeholder="输入GroupId"
                    suffix-icon="el-icon-circle-plus-outline"
                    v-model="selectGroup"
                >
                </el-input>             
            </el-col>
            <br>
            <br/>
            <br>
            <el-button id= "haha" type="primary" icon="el-icon-delete" @click = "draw">绘图</el-button>
        </div>        
    </div>
</template>

<script>
    import axios from 'axios'
    // let echarts = require('echarts/lib/echarts')
    // let instance = axios.create({
    //     timeout:5000,
    //     headers:{'Content-Type':'application/json;charset=UTF-8'}
    // })
    export default{
        name:"echart",
        data(){
            return {
                selectDate:'',
                selectTime:'',
                selectDevice:'',
                selectGroup:'',
                selectType:[],
                minId:'',
                maxId:'',
                legendData:[],
                xAxisData:[],
                seriesData:[],
                completeData:[],
                selectOption:{
                },
                typeOptions:[{
                    value:'groupId',
                    label:'GroupId'
                },{
                    value:'battery',
                    label:'Battery'
                },{
                    value:'temperature',
                    label:'Temperature'
                },{
                    value:'deepth',
                    label:'Deepth'
                },{
                    value:'force1',
                    label:'Force1'
                },{
                    value:'force2',
                    label:'Force2'
                },{
                    value:'stress1',
                    label:'Stress1'
                },{
                    value:'stress2',
                    label:'Stress2'
                },{
                    value:'current',
                    label:'Current'
                },{
                    value:'date',
                    label:'Date'
                },{
                    value:'time',
                    label:'Time'
                }],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                        const start = new Date();
                        // start.setTime(start.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', [start, start]);
                        }  
                    },{
                        text: '最近两天',
                        onClick(picker) {
                        const start = new Date();
                        const end = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', [start, end]);
                        }  
                    },{
                        text: '最近一周',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                chartOption:{}                
            }
        },
        methods:{
            init(){
                // let mychart = this.$echarts.init(this.$refs.myChart);
                // mychart.setOption(this.chartOption);                
                // setTimeout( () => {
                //     mychart.resize()
                // })
                axios.get('/api').then((response)=>{
                    let res = response.data;
                    if(res.status=="0"){
                        this.len = res.data.length;
                        for(let jj=0;jj<this.len;jj++){
                                // res.data[jj].id=jj;
                                this.completeData[jj] = res.data[jj]._id;
                        }
                        this.selectType = ['temperature'];
                        this.dataProcessing(res.data);
                        let mychart = this.$echarts.init(this.$refs.myChart);
                        mychart.setOption(this.chartOption);  
                    }else{
                        this.completeData = [];
                    }
                })                 
            },
            dataProcessing(dataArr){
                let legendData = this.selectType;
                let seriesLength = this.selectType.length;
                let xAxisData =[],
                    seriesData =[];
                // sconsole.log(this.completeData)
                for(let data of dataArr){
                    xAxisData.push(this.find(data._id));
                }
                // if(dataArr.length<=50){
                //     for(let data of dataArr){
                //         xAxisData.push(this.find(data._id));
                //     }
                // }else{
                    // xAxisData.push(this.find(dataArr[0]._id));
                    // for(let index=1;index<dataArr.length-1;index++){
                    //     xAxisData.push('');
                    // }
                    // xAxisData.push(this.find(dataArr[dataArr.length-1])._id);
                // }
                
                for(let i=0;i<seriesLength;i++){
                    let dataEachType = [];
                    let typeName = this.selectType[i];
                    // console.log(typeName)
                    for(let data of dataArr){
                        dataEachType.push(data[typeName]);
                    }
                    seriesData[i] = {
                        name:typeName,
                        type:'line',
                        symbol:'none',
                        data:dataEachType,                    
                    }
                }
                // this.legendData = legendData;
                // this.xAxisData = xAxisData;
                // this.seriesData = seriesData;

                this.chartOption = {
                    title:{
                        text:'Railway siganl acquisition'
                    },
                    tooltip:{
                        trigger:'axis',
                        position: function (pt) {
                            return [pt[0], '10%'];
                        }                        
                    },
                    legend:{
                        data:legendData
                    },
                    grid:{
                        left:'3%',
                        right:'3%',
                        bottom:'5%',
                        containLabel:true
                    },
                    toolbox:{
                        feature:{
                            dataZoom:{
                                yAxisIndex:'none'
                            },
                            restore:{},
                            saveAsImage:{}
                        }
                    },
                    xAxis:{
                        type:'category', //default即为category，表示离散类型
                        boundaryGap:false,
                        data:xAxisData
                    },
                    yAxis:{
                        type:'value',
                        boundaryGap: [0, '100%']
                    },
                    dataZoom: [{
                        type: 'inside',
                        start: 0,
                        end: 100
                    }, {
                        start: 0,
                        end: 10,
                        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                        handleSize: '80%',
                        handleStyle: {
                            color: '#fff',
                            shadowBlur: 3,
                            shadowColor: 'rgba(0, 0, 0, 0.6)',
                            shadowOffsetX: 2,
                            shadowOffsetY: 2
                        }
                    }],
                    series:seriesData
                }    
            },
            find(data){
                for(let ite=0;ite<this.len;ite++){
                    if(this.completeData[ite]==data)
                        return ite;
                }
            },
            draw(){
                let date=[],
                    time=[];
                let maxId,minId;
                console.log(this.minId);
                if(this.selectDate !== null){
                    if(this.selectDate[0]!=undefined && this.selectDate[1]!=undefined){
                        date[0] = this.transDate(this.selectDate[0]);
                        date[1] = this.transDate(this.selectDate[1]);
                    }
                }
                if(this.selectTime !== null){
                    if(typeof(this.selectTime[0])!="undefined" && typeof(this.selectTime[1])!="undefined"){
                        time[0] = this.transTime(this.selectTime[0]);
                        time[1] = this.transTime(this.selectTime[1]);
                    }                           
                }
                // console.log(typeof(this.maxId))
                if(typeof(this.maxId) != 'undefined' && this.maxId != ''){
                    maxId = this.completeData[this.maxId]
                }

                if(typeof(this.minId) != 'undefined' && this.minId != ''){
                    minId = this.completeData[this.minId]
                }
                axios.post("/api/search",{
                    startDate:date[0],
                    endDate:date[1],
                    startTime:time[0],
                    endTime:time[1],
                    type:this.selectType,
                    deviceId:this.selectDevice,
                    groupId:this.selectGroup,
                    maxId:maxId,
                    minId:minId,
                }).then((response)=>{
                    let res = response.data;
                    // console.log(res);
                    if(res.status=="0"){
                        // let len = res.data.length;
                        this.dataProcessing(res.data);
                        let mychart = this.$echarts.init(this.$refs.myChart);
                        mychart.clear();
                        mychart.setOption(this.chartOption);  
                    }else{
                        console.log('Get error');
                    }                   
                });
                this.searchState = 0;                  
            },
        },
        mounted(){
            this.init();
        },
    }
</script>

<style scoped>
    .echart{
        width:115%;
        height:500px
    }
</style>