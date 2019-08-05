<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
            </div>
            <el-table
            :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            style="width: 100%">
                <el-table-column
                    prop="id"
                    label="Id"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="deviceId"
                    label="DeviceId"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="opeCode"
                    label="Operation Code">
                </el-table-column>
                <el-table-column
                    prop="forcex"
                    label="Forcex">
                </el-table-column>
                <el-table-column
                    prop="torque"
                    label="Torque">
                </el-table-column> 
                <el-table-column
                    prop="buttery"
                    label="Buttery">
                </el-table-column> 
                <el-table-column
                    prop="temperature"
                    label="Temperature">
                </el-table-column>    
                <el-table-column
                    prop="time"
                    label="Time">
                </el-table-column>     
            </el-table>                         

            <div class="block" style="margin-top:10px;">
                <span class="demonstration"></span>
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
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    // let instance = axios.create({
    // timeout:5000,
    // headers:{'Content-Type':'application/json;charset=UTF-8'}
    // })
    export default {
        name: 'basetable',
        data() {
            return {
                pageSize:10,
                tableData: [],
                select_word:'',
                currentPage: 1
            }
        },
        mounted(){
            axios.get('/api').then((response)=>{
                let res = response.data;
                if(res.status=="0"){
                    this.tableData = res.data;
                }else{
                    this.tableData = [];
                }
            })
        },
        methods: {
                handleSizeChange(val) {
                    // console.log(`每页 ${val} 条`);
                    this.pageSize = val;
                },
                handleCurrentChange(val) {
                    // console.log(`当前页: ${val}`);
                    this.currentPage = val;
                }
            }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
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
    .mr10{
        margin-right: 10px;
    }
</style>