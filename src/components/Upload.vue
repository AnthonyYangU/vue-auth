<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <!-- <el-breadcrumb-item><i class="el-icon-calendar"></i> 表单</el-breadcrumb-item> -->
                <el-breadcrumb-item class="el-icon-lx-cascades">文件上传</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            
            <div class="crop-demo-btn">
                <el-input type="file" class="crop-input"  @change="upload"></el-input>
                <span>请选择需要上传的文件</span>
            </div>
            <br>
            <vue-xlsx-table  class="crop-demo-btn" @on-select-file="handleSelectedFile">将xlsx数据导入数据库</vue-xlsx-table>
            <br>
            <br>

        </div>
        
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'upload',
        data: function(){
            return {
                tableData:[]
            }
        },
        methods:{
            upload(e){
                let file = e.target.files[0];
                let param = new FormData()
                param.append('file',file,file.name)
                console.log(param.get('file'))
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                }
                axios.post('/api/upload',param,config).then(response=>{
                    if(response.data.status=='0'){
                        this.$message.success('文件上传成功');
                    }
                })
            },
            handleSelectedFile (convertedData) {
                for(let i of convertedData.body){
                    delete i.id
                }
                this.tableData = convertedData.body;
                axios.post("/api/inputdb",{
                    array:this.tableData
                }).then((response)=>{
                    let res = response.data;
                    if(res.status == "0"){
                        this.$message.success(`xlsx数据上传成功,共上传${this.tableData.length}条数据！`);
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .content-title{
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
    
    .crop-demo{
        display: flex;
        align-items: flex-end;
    }
    .crop-demo-btn{
        position: relative;
        width: 200px;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        margin-left: 30px;
        background-color: #409eff;
        color: #fff;
        font-size: 12px;
        border-radius: 4px;
        box-sizing: border-box;
    }
    .crop-input{
        position: absolute;
        border-radius: 4px;
        width: 200px;
        height: 40px;
        opacity: 0;
        cursor: pointer;
    }
</style>