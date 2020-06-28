<template>
  <div>
      <form action="/">
  <van-search
    show-action
    placeholder="请输入搜索关键词"
    @search="onSearch"
    @cancel="onCancel"

  />
</form>
  </div>
</template>

<script>
export default {
    data() {
        return {
            isaa:false
        }
    },
    methods:{
        async onSearch() {
            this.$http.get('/search',{
              params:{
                search:'黑人'
              }
            })
        },
        onCancel() {
            console.log(22);
            
        }
    }
}
</script>

<style>

</style>