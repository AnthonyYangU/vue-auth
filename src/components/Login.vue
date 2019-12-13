<template>
    <div class="login-wrap">
        <v-head></v-head>
        <div class="ms-login">
            <div class="ms-title">论文格式检测系统</div>
            <el-form :model="ruleForm" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="userName">
                    <el-input v-model="ruleForm.userName" placeholder="userName">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.userPwd">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="login">登录</el-button>
                </div>
                <p class="login-tips" v-show="errorTip">用户名或者密码错误</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import vHead from '@/components/Header.vue';
    export default {
        data: function(){
            return {
                errorTip:false,
                ruleForm: {
                    userName: 'Admin',
                    userPwd: 'admin'
                }
            }
        },
        components:{
            vHead
        },
        methods: {
            login(){
                if(!this.ruleForm.userName || !this.ruleForm.userPwd){
                  this.errorTip = true;
                  sessionStorage.setItem("loginstate","1")
                  return;
                }
                axios.post("/api/login",{
                  userName:this.ruleForm.userName,
                  userPwd:this.ruleForm.userPwd
                }).then((response)=>{
                    let res = response.data;
                    if(res.status=="0"){
                      this.errorTip = false;
                      sessionStorage.setItem("loginstate",0)
                    //   this.$store.commit("updateUserSignal",true)
                      
                      this.$router.push('/dashboard');
                    }else{
                    //   this.$store.commit("updateUserSignal",false)
                        sessionStorage.setItem("loginstate","1")
                        this.errorTip = true;
                    }
                });
            }  
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../assets/img/login-bg.jpg);
        background-size: 100%;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.3);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:rgb(211, 19, 19);
    }
</style>