<template>
  <div class="userinfo">
      <nav-bar/>
      <img src="@/assets/bannerTop_new.png" alt="" class="backImg">
      <user-detail :userInfo="model"/>
      <user-article />
  </div>
</template>

<script>
import NavBar from '@/components/common/Navbar.vue'
import userDetail from '@/components/userComponent/userDetail'
import userArticle from '@/components/userComponent/userArticle'
export default {
    data() {
        return {
            model:{}
        }
    },
    components:{
        NavBar,
        userDetail,
        userArticle
    },
    methods:{
        async userData() {
            const res =  await this.$http.get('/user/' + localStorage.getItem('id'))
            this.model = res.data[0]    
        }
    },
    created() {
        this.userData()
    }
}
</script>

<style lang="less">
.userinfo{
.backImg{
    height: 91px;
    width: 100%;
}
}
</style>