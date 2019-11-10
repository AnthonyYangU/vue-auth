<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 数据表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="deleteAll">批量删除</el-button>
            <el-button type="primary" icon="el-icon-sort" class="handle-del mr10" @click="sortReverse">排列顺序</el-button>            
            <el-table
            :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            style="width: 100%" @selection-change="handleSelectionChange">
                    <!-- <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>      -->
                <el-table-column type="selection" width="50" align="center"></el-table-column>       
                <el-table-column 
                    prop="id" 
                    label="Id"
                    >
                </el-table-column>
                <el-table-column
                    prop="deviceId"
                    label="DeviceId"
                    >
                </el-table-column>
                <el-table-column
                    prop="groupId"
                    label="GroupId">
                </el-table-column>
                <el-table-column
                    prop="battery"
                    label="Battery"
                    >            
                </el-table-column>                         
                <el-table-column
                    prop="temperature"
                    label="Temp"
                    >
                </el-table-column>   
                <el-table-column
                    prop="deepth"
                    label="Deepth"
                    >
                </el-table-column>                                     
                <el-table-column
                    prop="force1"
                    label="Force1"
                    >
                </el-table-column>  
                <el-table-column
                    prop="force2"
                    label="Force2"
                    >
                </el-table-column>                                     
                <el-table-column
                    prop="stress1"
                    label="Stress1"
                    >
                </el-table-column>               
                <el-table-column
                    prop="stress2"
                    label="Stress2">
                </el-table-column>
                <el-table-column
                    prop="current"
                    label="Currrent">
                </el-table-column>  
                <el-table-column
                    prop="date"
                    label="Date">
                </el-table-column>
                <el-table-column
                    prop="time"
                    label="Time">
                </el-table-column>   
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.row._id)">删除</el-button>
                    </template>
                </el-table-column>             
            </el-table>                         

            <div class="block" style="margin-top:10px;">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.length"
                prev-text="上一页"
                next-text="下一页"
                >
                </el-pagination>
            </div>
            <br>
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
                v-for="item in options"
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
            <br/>
            <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            <el-button type="primary" icon="el-icon-refresh" @click = "init">全部数据</el-button>
            <!-- <el-button type="primary" icon="el-icon-edit-outline" @click = "drawChart">绘制图表</el-button>  -->
            <el-button type="primary" icon="el-icon-download" @click = "export2Excel">导出表格</el-button>
            <el-button type="primary" icon="el-icon-delete" @click = "handleIdDelete">通过Id删除</el-button>
            <br/>
            <br/>
                        
        </div>
        

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteAll">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'MyTable',
        data() {
            return {
                selectDate:'',
                selectTime:'',
                selectDevice:'',
                selectGroup:'',
                selectType:[],
                selectId:'',
                selectDel:[],
                minId:'',
                maxId:'',
                len:0,
                delVisible:false,
                searchState:1,
                pageSize:10,
                tableData: [],
                completeData:[],
                // select_word:'',
                currentPage: 1,
                options:[{
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
            }
        },
        mounted(){
            this.init();
        },
        methods: {
                init(){
                    axios.get('/api').then((response)=>{
                        this.searchState = 1;
                        let res = response.data;
                        if(res.status=="0"){
                            this.len = res.data.length;
                            for(let jj=0;jj<this.len;jj++){
                                    res.data[jj].id=jj;
                                    this.completeData[jj] = res.data[jj]._id;
                            }

                            this.tableData = res.data;
                        }else{
                            this.tableData = [];
                        }
                    })                    
                },
                sortReverse(){
                    this.tableData.reverse();
                },
                handleSelectionChange(val) {
                    this.selectDel =[];
                    for(let j of val){
                        this.selectDel.push(j._id);
                    }
                },
                handleDelete(_id){
                    this.selectDel = [];
                    this.delVisible = true;
                    this.selectDel.push(_id);
                    // console.log(this.selectDel);
                },
                handleIdDelete(){
                    if(typeof(this.maxId) != 'undefined' && this.maxId != '' && typeof(this.minId) != 'undefined' && this.minId != ''){
                        this.selectDel =[];
                        for(let j of this.tableData){
                            if(j.id>=this.minId && j.id<=this.maxId){
                                this.selectDel.push(j._id);
                            }
                            if(j.id>this.maxId)break;
                        }
                        this.delVisible = true;
                    }
                },
                // handleDeleteAll(){
                //     this.allVisible = true;
                // },
                handleSizeChange(val) {
                    // console.log(`每页 ${val} 条`);
                    this.pageSize = val;
                },
                handleCurrentChange(val) {
                    // console.log(`当前页: ${val}`);
                    this.currentPage = val;
                },
                checkTime(i){
                    if (i < 10) { i = "0" + i }
                    return i
                },
                transDate(date){
                    let d = new Date(date);
                    let y = d.getFullYear(),
                        m = d.getMonth() + 1,
                        day = d.getDate();
                    m = this.checkTime(m);
                    day = this.checkTime(day);
                    return y + '-' + m + '-' + day
                },
                transTime(time){
                    let t = new Date(time);
                    let h = t.getHours(),
                        m = t.getMinutes(),
                        s = t.getSeconds()
                    h = this.checkTime(h);
                    m = this.checkTime(m);
                    s = this.checkTime(s);
                    return h + ":" + m + ":" + s
                },
                find(data){
                    for(let ite=0;ite<this.len;ite++){
                        if(this.completeData[ite]==data)
                            return ite;
                    }
                },
                search(){
                    // console.log(this.completeData)
                    // console.log("time",this.transTime(this.selectTime[0]))
                    let date=[],
                        time=[];
                    let maxId,minId;
                    // console.log(`0:date0:${this.selectDate[0]}`)
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
                            let len = res.data.length;
                            for(let jj=0;jj<len;jj++){
                                res.data[jj].id = this.find(res.data[jj]._id);
                            }
                        this.tableData = res.data;
                        // console.log(this.tableData[0])
                        }else{
                            this.tableData = [];
                        }                   
                    });
                    this.searchState = 0;                  
                },
                deleteAll(){
                    this.$message.success('删除成功');
                    // console.log(this.selectDel)
                    this.delVisible = false;
                    if(this.selectDel !=[]){
                        axios.post("/api/dm",{
                            deleteMany:this.selectDel
                        }).then((response)=>{
                            let res = response.data;
                            if(res.status==0){
                                if(this.searchState==0){
                                    this.search();
                                }else{
                                    this.init();
                                }
                            }
                        })
                    }         
                },
                // drawChart(){
                //     this.$store.commit("updateChartData",{data:this.tableData});
                //     this.$router.push('/charts');
                // },
                export2Excel() {
                    require.ensure([], () => {
                        let types;
                        if (this.searchState == 1){
                            types = ['id','deviceId','groupId','battery','temperature','deepth','force1','force2','stress1','stress2','current','date','time']
                        }else{
                            types = ['battery'].concat(this.selectType)
                        }
                        const { export_json_to_excel } = require('../excel/Export2Excel');
                        const tHeader = types;  // 设置Excel的表格第一行的标题
                        const filterVal = types;  // index、nickName、name是tableData里对象的属性
                        const list = this.tableData;  //把data里的tableData存到list
                        const data = this.formatJson(filterVal, list);
                        export_json_to_excel(tHeader, data, '远传数据');  //导出Excel 文件名
                    })
                },
                formatJson(filterVal, jsonData) {
                    return jsonData.map(v => filterVal.map(j => v[j]))  
                }
                
            }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 50%;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .blue{
        color:blue
    }
    .mr10{
        margin-right: 10px;
    }
</style>