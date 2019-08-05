<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-pie-chart"></i> schart图表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
		<el-select v-model="select_date" v-on:change="reflush" placeholder="选择数据种类" class="handle-select mr10">
			<el-option key="1" label="Forcex" value="Forcex"></el-option>
			<el-option key="2" label="Torque" value="Torque"></el-option>
            <el-option key="3" label="Buttery" value="Buttery"></el-option>
            <el-option key="4" label="Temperature" value="Temperature"></el-option>
            <el-option key="5" label="Testvalue" value="Testvalue"></el-option>
		</el-select>
            <div class="plugins-tips">
                最大绘图数据量：50
            </div>
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-card shadow="hover">
                        <schart ref="bar" class="schart" canvasId="bar" :data="data" type="bar" :options="options"></schart>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-card shadow="hover">
                        <schart ref="line" class="schart" canvasId="line" :data="data" type="line" :options="options2"></schart>
                    </el-card>
                </el-col>
            </el-row>
            <!-- <div class="schart-box">
                <div class="content-title">柱状图</div>
                <schart class="schart" canvasId="bar" :data="data1" type="bar" :options="options1"></schart>
            </div> -->
            <!-- <div class="schart-box">
            <div class="content-title">折线图</div>
            <schart class="schart" canvasId="line" :data="data1" type="line" :options="options2"></schart>
            </div> -->
            <!-- <div class="schart-box">
            <div class="content-title">饼状图</div>
            <schart class="schart" canvasId="pie" :data="data2" type="pie" :options="options3"></schart>
            </div>
            <div class="schart-box">
            <div class="content-title">环形图</div>
            <schart class="schart" canvasId="ring" :data="data2" type="ring" :options="options4"></schart>
            </div> -->
            <!-- <button v-on:click="test">test</button> -->
        
    </div>
</template>

<script>
    import axios from 'axios'
    let instance = axios.create({
    timeout:5000,
    headers:{'Content-Type':'application/json;charset=UTF-8'}
    })
    import Schart from 'vue-schart';
    export default {
        name: 'basecharts',
        components: {
            Schart
        },
        data: () => ({
                testValue:[{
                        name: '0',
                        value: 1083
                    },
                    {
                        name: '1',
                        value: 941
                    },
                    {
                        name: '2',
                        value: 1139
                    },
                    {
                        name: '3',
                        value: 816
                    },
                    {
                        name: '4',
                        value: 327
                    },
                    {
                        name: '5',
                        value: 228
                    },
                    {
                        name: '6',
                        value: 1065
                    }
                ],
                data: [],
                select_date:'',
                options: {
                    title: `最近数据的Forcex数据`,
                    showValue: false,
                    fillColor: 'rgb(45, 140, 240)',
                    bottomPadding: 30,
                    topPadding: 30
                },
                options2: {
                    title: 'Forcex数据的变化趋势',
                    fillColor: '#FC6FA1',
                    axisColor: '#008ACD', 
                    contentColor: '#EEEEEE',
                    bgColor: '#F5F8FD',
                    bottomPadding: 30,
                    topPadding: 30
                },
                options3: {

                }
        }),
        mounted(){
            this.options.title="测试数据";
            this.options2.title="测试数据的变化趋势";                        
            this.data = this.testValue;
        },
        methods:{
            reflush(){
                this.data = [];
            instance.get('/api').then((response)=>{
                let res = response.data;
                if(res.status=="0"){
                        // for(var j=0,len=res.data.length;j<len||j<50;j++){
                        //     this.data.push({name:res.data[j].id,value:res.data[j].forcex});
                        // }
                        
                        // console.log(this.data);          
                    if(this.select_date==='Forcex'){
                        this.options.title="最近的Forcex数据";
                        this.options2.title="Forcex数据的变化趋势";
                        for(let jj=0,len=res.data.length;jj<len||jj<50;jj++){
                            this.data.push({name:res.data[jj].id,value:res.data[jj].forcex});
                        }
                    }else if(this.select_date==='Torque'){
                        this.options.title="最近的Torque数据";
                        this.options2.title="Torque数据的变化趋势";
                        for(let jj=0,len=res.data.length;jj<len||jj<50;jj++){
                            this.data.push({name:res.data[jj].id,value:res.data[jj].torque});
                        }
                    }else if(this.select_date==='Buttery'){
                        this.options.title="最近的Buttery数据";
                        this.options2.title="Buttery数据的变化趋势";
                        for(let jj=0,len=res.data.length;jj<len||jj<50;jj++){
                            this.data.push({name:res.data[jj].id,value:res.data[jj].buttery});
                        }
                    }else if(this.select_date==='Temperature'){
                        this.options.title="最近的Temperature数据";
                        this.options2.title="Temperature数据的变化趋势";
                        for(let jj=0,len=res.data.length;jj<len||jj<50;jj++){
                            this.data.push({name:res.data[jj].id,value:res.data[jj].temperature});
                        }
                    }else{
                        this.options.title="测试数据";
                        this.options2.title="测试数据的变化趋势";                        
                        this.data = this.testValue;
                    }
                    // console.log(this.data);
                    // this.tableData = res.data;
                }else{
                    this.data = [];
                }
            })                
            }
        }
    }
</script>

<style scoped>
.el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

    .schart {
        width: 100%;
        height: 300px;
    }
    .handle-select {
        width: 160px;
    }
    
</style>