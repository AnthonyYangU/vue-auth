<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <!-- <el-breadcrumb-item><i class="el-icon-calendar"></i> 表单</el-breadcrumb-item> -->
                <el-breadcrumb-item class="el-icon-upload"> 论文检测</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="centerTx">
                    <div class="title">文件上传</div>

                    <el-upload
                    class="upload-demo"
                    drag
                    action=""
                    multiple
                    :disabled='isDisable'
                    :http-request="myUpload"
                    >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传doc/docx文件</div>
                    </el-upload>
                    
                    <div class="title2">论文上传格式说明
                    </div>
                    <div class="message">
                        <p>在上传之前，请去掉翻译</p>
                        <p>请生成并更新目录</p>
                        <p>文件大小应当小于50M</p>
                        <p>如有问题请联系管理员，微信: q131415q</p>
                    </div>
                </div>
            </el-col>

            <el-col :span="12">
                <div class="title centerTx">检测报告</div>
                <!-- <div class="backtext"> -->
                <span v-show="loading">正在加载报告中......</span>
                <div class="view" v-show="detectView">

                <div class="title3">
                <span>摘 要</span>
                <i class="el-icon-caret-bottom" @click="show(0)"></i>
                </div>
                <span v-show="flag[0].cut" class="formatBody"> 
                <p class="text" v-for="(item,i) in text.abstract" :key="'info1-'+i">{{i+1}}) {{item}}</p>                
                </span>

                <div class="title3">
                <span>目 录</span>
                <i class="el-icon-caret-bottom" @click="show(1)"></i>
                </div>
                <span v-show="flag[1].cut" class="formatBody"> 
                <p class="text" v-for="(item,i) in text.catalog" :key="'info2-'+i">{{i+1}}) {{item}}</p>
                </span>

                <div class="title3">
                <span>正 文</span>
                <i class="el-icon-caret-bottom" @click="show(2)"></i>
                </div>
                <span v-show="flag[2].cut" class="formatBody"> 
                <p class="text" v-for="(item,i) in text.body" :key="'info3-'+i">{{i+1}}) {{item}}</p>
                </span>

                <div class="title3">
                <span>公 式</span>
                <i class="el-icon-caret-bottom" @click="show(3)"></i>
                </div>
                <span v-show="flag[3].cut" class="formatBody"> 
                <p class="text" v-for="(item,i) in text.formula" :key="'info4-'+i">{{i+1}}) {{item}}</p>
                </span>

                <div class="title3">
                <span>图 片</span>
                <i class="el-icon-caret-bottom" @click="show(4)"></i>
                </div>
                <span v-show="flag[4].cut" class="formatBody"> 
                <p class="text" v-for="(item,i) in text.figure" :key="'info5-'+i">{{i+1}}) {{item}}</p>
                </span>

                <div class="title3">
                <span>表 格</span>
                <i class="el-icon-caret-bottom" @click="show(5)"></i>
                </div>
                <span v-show="flag[5].cut" class="formatBody"> 
                <p class="text" v-for="(item,i) in text.table" :key="'info6-'+i">{{i+1}}) {{item}}</p>
                </span>

                <div class="title3">
                <span>页眉页脚</span>
                <i class="el-icon-caret-bottom" @click="show(6)"></i>
                </div>
                <span v-show="flag[6].cut" class="formatBody"> 
                <p class="text" v-for="(item,i) in text.headFont" :key="'info7-'+i">{{i+1}}) {{item}}</p>
                </span>

                <div class="title3">
                <span>参考文献</span>
                <i class="el-icon-caret-bottom" @click="show(7)"></i>
                </div>
                <span v-show="flag[7].cut" class="formatBody"> 
                <p class="text" v-for="(item,i) in text.reference" :key="'info8-'+i">{{i+1}}) {{item}}</p>
                </span>

                <div class="title3">
                <span>致谢</span>
                <i class="el-icon-caret-bottom" @click="show(8)"></i>
                </div>
                <span v-show="flag[8].cut" class="formatBody"> 
                <p class="text" v-for="(item,i) in text.acknowledge" :key="'info9-'+i">{{i+1}}) {{item}}</p>
                </span>

                <div class="title3">
                <span>附录</span>
                <i class="el-icon-caret-bottom" @click="show(9)"></i>
                </div>
                <span v-show="flag[9].cut" class="formatBody"> 
                <p class="text" v-for="(item,i) in text.appendix" :key="'info10-'+i">{{i+1}}) {{item}}</p>
                </span>            

                <div class="title3">
                <span>标点符号，量和单位，数字</span>
                <i class="el-icon-caret-bottom" @click="show(10)"></i>
                </div>
                <span v-show="flag[10].cut" class="formatBody"> 
                <p class="text" v-for="(item,i) in text.punctuation" :key="'info11-'+i">{{i+1}}) {{item}}</p>
                </span>       

                </div>
                <!-- </div> -->
                <!-- <div class="texttitle">
                    <span>参考文献</span>
                    <i class="el-icon-caret-bottom" @click="show(4)"></i>
                </div>

                <span v-show="flag[4].cut" class="formatBody">    -->              
            </el-col>
        </el-row>
        <!-- <el-button type="primary" @click="userStatus">测试按钮</el-button> -->

        </div>
        <!-- <el-button type="primary" @click="userStatus">返回登录</el-button> -->
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'upload',
        data: function(){
            return {
                text:{abstract:[],catalog:[],body:[],formula:[],figure:[],table:[],headFont:[],reference:[],acknowledge:[],appendix:[],punctuation:[]},
                flag:[{cut:false},{cut:false},{cut:false},{cut:false},{cut:false},{cut:false},{cut:false},{cut:false},{cut:false},{cut:false},{cut:false}],
                userName:'',
                fileName:'',
                detectView:false,
                loading:false,
                isDisable:false
            }
        },
        methods:{
            show(serial){
            this.flag[serial].cut = !this.flag[serial].cut;
            },
            stringMake(content){
                let Content = content.split(/[\r\n]/);
                function isChina(s){
                    var patrn=/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
                    if(!patrn.exec(s)){
                    return false;
                    }else{
                    return true;
                    }
                }
                // console.log('start stringMake',Content)
                Content = Content.filter(function (s) {
                    return s && s.trim();
                });
                // console.log(Content)
                for(let i=Content.length;i>=0;i--){
                    if(!isChina(Content[i])){
                        Content.splice(i,1)
                    }
                }
                this.detectView = true;
                // console.log("end is",Content);
                this.stringHandle(Content)
            },
            stringHandle(string){
                let index = [];
                const  t = ["完全正确"];
                index[0] = string.indexOf("摘要检测");
                index[1] = string.indexOf("目录检测");
                index[2] = string.indexOf("正文检测");
                index[3] = string.indexOf("公式检测");
                index[4] = string.indexOf("图检测");
                index[5] = string.indexOf("表检测");
                index[6] = string.indexOf("页眉页脚检测");
                index[7] = string.indexOf("参考文献检测");
                index[8] = string.indexOf("致谢检测");
                index[9] = string.indexOf("附录检测");
                index[10] = string.indexOf("标点符号，量和单位，数字检测");
                function ana(data){
                    if(data.length == 0){
                        // console.log("Empty data is ",data)
                        return t
                    }
                    else{
                        return data;
                    } 
                }
                // console.log(string.slice(index[2]+1,index[3]))
                this.text.abstract = ana(string.slice(index[0]+1,index[1]));
                this.text.catalog = ana(string.slice(index[1]+1,index[2]));
                this.text.body = ana(string.slice(index[2]+1,index[3]));
                this.text.formula = ana(string.slice(index[3]+1,index[4]));
                this.text.figure = ana(string.slice(index[4]+1,index[5]));
                this.text.table = ana(string.slice(index[5]+1,index[6]));
                this.text.headFont = ana(string.slice(index[6]+1,index[7]));
                this.text.reference = ana(string.slice(index[7]+1,index[8]));
                this.text.acknowledge = ana(string.slice(index[8]+1,index[9]));
                this.text.appendix = ana(string.slice(index[9]+1,index[10]));
                this.text.punctuation = ana(string.slice(index[10]+1,index[11]));
            },
            myUpload(content) {
                this.isDisable = true
                let filenameArr = content.file.name.split('.')
                let filenameEnd = filenameArr[filenameArr.length-1];
                // console.log(filenameEnd)
                if(filenameEnd=='doc'||filenameEnd=='docx'){
                    // let fileName = this.userName+content.file.name;
                    this.fileName = content.file.name;
                    // const copyFile = new File([content.file],this.userName+content.file.name);
                    // console.log(copyFile);
                    var form = new FormData();
                    form.append("file", content.file);
                    this.loading = true;
                    this.detectView = false;
                    // console.log(content.file.name);
                    axios.post(`/api/upload?name=${this.userName}&filename=${this.fileName}`,form,{
                        headers:{
                            "Content-type":"multipart/form-data",
                        },
                    }).then(res=>{
                        // console.log(res.data.data)
                        // console.log("status: ",res.data.status)
                        this.isDisable = false;
                        if(res.data.status == 0){
                            
                            this.loading = false;
                            // console.log(res.data.data)
                            this.stringMake(res.data.data)
                            // this.userStatus()
                        }
                    }).catch(error=>{
                        this.$alert('文件解析失败:',error)
                        this.isDisable = false;
                        // if (error.response) {
                        //         content.onError('文件上传失败,' + error.response.data);
                        //     } else if(error.request) {
                        //         content.onError('文件上传失败，服务器端无响应')
                        //     } else {
                        //         content.onError('文件上传失败，请求封装失败')
                        //     }
                    });
                }else{
                    this.$alert("只能上传doc/docx文件")
                }
                      // const fileFormat = (file.originalname).split('.')
      // filename = uuidV1()+'.'+fileFormat[fileFormat.length-1];
                
            },
            // download(data){
            //     if(!data){
            //         return
            //     }
            //     let url = window.URL.createObjectURL(new Blob([data]));
            //     let link = document.createElement('a');
            //     // link.style.display = url;
            //     link.href=url;
            //     link.setAttribute('download','Slides.pdf');
            //     document.body.appendChild(link);
            //     link.click();
            // },
            // userStatus(){
            //     let count = 0;
            //     axios.post('/api/userstatus',{
            //         userName:this.userName,
            //     }).then((res)=>{
            //         console.log(res.data)
            //         if(res.data[0].execState == true){
            //             axios.post('/api/download',{
            //                 userName:this.userName,
            //                 fileName:this.fileName
            //             }).then((res)=>{
            //                     this.$message("论文检测报告下载成功")
            //                     // console.log(res.data)
            //                     console.log(res.data)
            //                     this.stringHandle(res.data)
            //                     this.loading = false
            //                     this.detectView = true;
            //                     clearTimeout(this.timer);
            //             })
            //         }else{
            //             if(count>=5){
            //                 clearTimeout(this.timer);
            //                 count=0;
            //                 return ;
            //             }else{
            //                 count++;
            //                 this.timer = setTimeout(this.userStatus, 10 * 1000);
            //             }
            //         }
            //     }).catch(err=>{
            //         console.log(err);
            //     })
            // },

        },
        mounted(){
            this.userName = sessionStorage.getItem('ms_username');
        },
        // beforeDestroy: function() {
        //     if (this.timer) {
        //         console.log("销毁定时器")
        //         clearTimeout(this.timer); //在Vue实例销毁前，清除我们的定时器
        //     }
        // }
    }
</script>

<style scoped>
    .upload{
        background:red
    }
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
        text-align: center;
        cursor: pointer;
    }
    .crop-input{
        position: absolute;
        border-radius: 4px;
        width: 200px;
        height: 40px;
        opacity: 0;
        cursor: pointer;
    }
    .title2,
    .title{
        margin-bottom: 20px;
        padding-bottom:20px;
        border-bottom: rgb(192, 170, 170,0.3) solid 1px;
    }
    .title2{
        margin-top:20px
    }
    .title3{
    height:20px;
    padding-bottom: 20px;
    padding-top: 5px;
    border-bottom:solid .0625rem rgb(221, 209, 209);
    font-size:18px;
    font-weight: 700
}
    .mytext{
        border:0;
        border-radius:5px;
        background-color: rgba(137, 196, 244, 1);
        width:500px;
        height:500px;
        padding:10px;
        resize:none;
    }
   .centerTx{
       text-align: center
   }
   .message p{
       /* text-align: block; */
       margin-bottom: 10px;
   }
   .text{
       text-align: left
   }
   .formatBody{
    padding-top: 5px;
    font-size:14px;
    font-weight: 700
   }

</style>