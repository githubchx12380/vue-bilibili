<template>
  <div>
      <login-top Text="注册bilibili">
          <div slot="right" style="font-size:3.611vw" @click="$router.push('/login')">用户登录</div>
      </login-top>
        <login-text label="姓名" 
            style="margin:15.001px 0;" 
            placeholder="请输入姓名"
            rule="^.{6,16}$"
            @contentWatch="res => model.name = res"
            >
        </login-text>

        <login-text label="账号" 
        placeholder="请输入账号"
         rule="^.{6,16}$"
         @contentWatch="res => model.username = res"
         >
        </login-text>

        <login-text label="密码" 
            placeholder="请输入密码" 
            type="password"
            rule="^.{6,16}$"
            @contentWatch="res => model.password = res"
        >
        </login-text>

        <login-btn BtnText="注册" @TextClick="AjaxInsert"></login-btn>
  </div>
</template>

<script>
import LoginTop from '@/components/common/LoginTop.vue'
import LoginText from '@/components/common/LoginText.vue'
import LoginBtn from '@/components/common/LoginBtn.vue'
export default {
    data() {
        return {
            model:{}
        }
    },
    components:{
        LoginTop,
        LoginText,
        LoginBtn
    },
    methods:{
        async AjaxInsert() {
            if(this.model.name && this.model.username&&this.model.password){
                const res =  await this.$http.post('/register',this.model)
                this.$msg.fail(res.data.msg)
                localStorage.setItem('token',res.data.objtoken) 
                localStorage.setItem('id',res.data.id) 
                setTimeout(() => {
                    this.$router.push('/userinfo')
                },2000)
            }else{
                this.$msg.fail('格式不正确,请重新输入!')
            }
        }
    }
}
</script>

<style lang="less">

</style>