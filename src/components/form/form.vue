<template>
  <div class="form">
    <el-form ref="form" :model="UserForm" :rules="CheckRules" label-position="left" label-width="180px">
      <el-form-item label="真实姓名" prop="truename">
        <el-input v-model="UserForm.truename"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="UserForm.age"></el-input>
      </el-form-item>
      <el-form-item label="出生年月">
        <el-date-picker type="date" placeholder="选择日期"
                        v-model="UserForm.birthday">

        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitInfo">提交</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<style>
  .form{margin-top: 20px;}
</style>

<script>
  import formValidate from './formValidate'
  export default {
    created(){
      this.UserForm = formValidate.state.userinfo.UserForm;
    },

    beforeDestory(){
      formValidate.state.userinfo.UserForm=this.UserForm;
    },

    data() {
      return {
        UserForm: {
          truename: '',
          age: '',
          birthday: ''
        },
        CheckRules:formValidate.state.userinfo.CheckRules
      };
    },

    methods:{
      submitInfo(){
        // 表单验证方法
        this.$refs.form.validate(function (result) {
          if(result){
            // 验证通过,调用module里的setUserInfo方法
            formValidate.dispatch("setUserInfo");
          }else{
            alert("表达验证不合法")
          }
        }.bind(this));
      }
    },
  }
</script>
