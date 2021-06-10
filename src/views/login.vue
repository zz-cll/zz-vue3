<template>
  <div class="bg">
    <div class="loginform">
      <a-form layout="horizontal" ref="loginRef" :rules="loginRule" style="textAlign:center;height:100%" :model="loginForm">
        <a-form-item name="username">
          <a-input style="width:220px" v-model:value.trim="loginForm.username"  placeholder="username">
            <template #prefix><UserOutlined style="color:rgba(0,0,0,.25)"/></template>
          </a-input>
        </a-form-item>
        <a-form-item name="password">
          <a-input-password style="width:220px" v-model:value.trim="loginForm.password" type="password" placeholder="Password">
            <template #prefix><LockOutlined style="color:rgba(0,0,0,.25)"/></template>
          </a-input-password>
        </a-form-item>
        <a-form-item >
          <a-checkbox v-model:checked="check" @change="ChangeCheck">
            保存账号
          </a-checkbox>
        </a-form-item>
          <a-button type="primary" :loading="loading" @click="submitForm(loginRef)">
            登录
          </a-button>
      </a-form>
    </div>
  </div>
</template>

<script>
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { onBeforeMount, reactive, ref } from 'vue';
// import {login} from '../utils/GlobalFun'
// import {message} from 'ant-design-vue'
import router from '../router/index';

export default {
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup(){
    onBeforeMount(()=>{
      keyupSubmit()
      const remberUser = localStorage.getItem("remberUser")
      if(remberUser){
          check.value = true
          loginForm.username = remberUser 
      }
    })
    
    const sum = ref(0)            
    const check = ref(false)      
    const loading = ref(false)    
    const loginRef = ref(null)    
    const loginForm = reactive({  
      username:"",
      password:""
    })
    const loginRule = {           
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
      ],
    },

    ChangeCheck = (e)=> {         
      check.value = e.target.checked
    },  
    keyupSubmit = () =>{          
      document.onkeydown = () =>{
          let key = window.event.keyCode;
          if(key===13){
            submitForm(loginRef.value)
          }
      }
    },
    submitForm = (e) => {         
      if(sum.value == 0){
          sum.value = 1
          setTimeout(() => {
              sum.value = 0
          }, 1000);
          e.validate().then(async() => {
              loading.value = true

              // var times = setTimeout(() => {
              //     loading.value = false
              //     message.error("登录失败，请稍后重试")
              // }, 5000);
              // const res = await login(loginForm)
              loading.value = false
              sessionStorage.setItem("token",'sdiagwuyydwabiashdiuasawdwd') 
              router.push('/')
              // clearTimeout(times)
              // if(res){
              //   sessionStorage.setItem("username",loginForm.username)
              //   if(check.value){ localStorage.setItem("remberUser",loginForm.username) }
              //   else{ localStorage.removeItem("remberUser") }
              //   router.push('/');
              // }
          })
          .catch(error => {
            console.log('error', error);
          });
        }  
    }

    return {
      loginForm,    // 表单数据
      loginRule,    // 表单校验
      loginRef,     // 表单实例
      loading,      // 登录loading
      sum,          // 登录防抖
      check,        // 保存账号
      submitForm,   // 登录
      keyupSubmit,  // 回车登录
      ChangeCheck   // 改变选中
    }
  },
  





}

</script>

<style>
  .bg{
    height: 100%;
    width: 100%;
    background-image: url('../assets/img/loginbg.jpg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
  }
  .loginform{
    width: max-content;
    height: max-content;
    padding:30px;
    background-image: url('../assets/img/formbg.jpg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin:  auto;
  }
</style>