<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!-- <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
                <!-- <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select> -->
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
            </div>
            <el-table border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column prop="id" label="id" width="80" align="center">
                </el-table-column>
                <el-table-column prop="electricity" label="电量" sortable width="150">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="address" label="地址" :formatter="formatter">
                </el-table-column>
                <!-- <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>  -->
            </el-table>
            <!-- <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div> -->
            <!-- <span class="demonstration"></span> -->

            <!-- <div class="block mr10">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage1"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="40">
            </el-pagination>
            </div> -->
        </div>

        <!-- 编辑弹出框 -->
        <!-- <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog> -->

        <!-- 删除提示框 -->
        <!-- <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog> -->
        <button v-on:click="test">test</button>
    </div>
</template>

<script>
    import axios from 'axios'
    let instance = axios.create({
    timeout:5000,
    headers:{'Content-Type':'application/json;charset=UTF-8'}
    })
    // import { fetchData } from '../../api/index';
    // import fetchData from '../../util/data';
    // import axios from 'axios'

    // let instance = axios.create({
    //     timeout:5000,
    //     headers:{'Content-Type':'application/json;charset=UTF-8'}
    // })
    // var getResponse = instance.get('http://127.0.0.1:4001/');
    // console.log(fetchData);
    export default {
        name: 'basetable',
        data() {
            return {
                id:Number,
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    name: '',
                    date: '',
                    address: '',
                },
                idx: -1,
                currentPage1: 1,
                currentPage2: 2,
                currentPage3: 3,
                currentPage4: 4
                //id: -1
            }
        },
        mounted(){
            instance.get('http://127.0.0.1:4001/').then((response)=>{
            let res = response.data;
            if(res.status=="0"){
                this.tableData = res.data;
            }else{
                this.tableData = [];
            }
            })
        },
        // created() {
        //     this.getData()
        // },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    // let is_del = false;
                    // for (let i = 0; i < this.del_list.length; i++) {
                    //     if (d.name === this.del_list[i].name) {
                    //         is_del = true;
                    //         break;
                    //     }
                    // }

                    // if (                        
                    //     d.name.indexOf(this.select_word) > -1 ||
                    //     d.address.indexOf(this.select_word) > -1
                    // )
                    return d;
                    // if (!is_del) {
                    //     if (d.address.indexOf(this.select_cate) > -1 &&
                    //         (d.name.indexOf(this.select_word) > -1 ||
                    //             d.address.indexOf(this.select_word) > -1)
                    //     ) {
                    //         return d;
                    //     }
                    // }
                })
            }
        },
        methods: {
            test(){
                console.log(this.tableData)
            },
            // 分页导航
            // handleCurrentChange(val) {
            //     this.cur_page = val;
            //     this.getData();
            // },
            //  handleSizeChange(val) {
            //     console.log(`每页 ${val} 条`);
            // },
            // 获取 easy-mock 的模拟数据
            // getData() {
            //     fetchData({
            //         page: this.cur_page
            //     }).then((res) => {
            //         this.tableData = res.list;
            //         console.log(this.tableData)
            //     })
            // },
            // search() {
            //     this.is_search = true;
            // },
            formatter(row, column) {
                return row.address;
            },
            // filterTag(value, row) {
            //     return row.tag === value;
            // },
            // handleEdit(index, row) {
            //     this.idx = index;
            //     this.id = row.id;
            //     this.form = {
            //         id: row.id,
            //         name: row.name,
            //         date: row.date,
            //         address: row.address
            //     }
            //     this.editVisible = true;
            // },
            // handleDelete(index, row) {
            //     this.idx = index;
            //     this.id = row.id;
            //     this.delVisible = true;
            // },
            // delAll() {
            //     const length = this.multipleSelection.length;
            //     let str = '';
            //     this.del_list = this.del_list.concat(this.multipleSelection);
            //     for (let i = 0; i < length; i++) {
            //         str += this.multipleSelection[i].name + ' ';
            //     }
            //     this.$message.error('删除了' + str);
            //     this.multipleSelection = [];
            // },
            // handleSelectionChange(val) {
            //     this.multipleSelection = val;
            // },
            // 保存编辑
            // saveEdit() {
            //     this.editVisible = false;
            //     this.$message.success(`修改第 ${this.idx+1} 行成功`);
            //     if(this.tableData[this.idx].id === this.id){
            //         this.$set(this.tableData, this.idx, this.form);
            //     }else{
            //         for(let i = 0; i < this.tableData.length; i++){
            //             if(this.tableData[i].id === this.id){
            //                 this.$set(this.tableData, i, this.form);
            //                 return ;
            //             }
            //         }
            //     }
            // },
            // // 确定删除
            // deleteRow(){
            //     this.$message.success('删除成功');
            //     this.delVisible = false;
            //     if(this.tableData[this.idx].id === this.id){
            //         this.tableData.splice(this.idx, 1);
            //     }else{
            //         for(let i = 0; i < this.tableData.length; i++){
            //             if(this.tableData[i].id === this.id){
            //                 this.tableData.splice(i, 1);
            //                 return ;
            //             }
            //         }
            //     }
            // }
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
