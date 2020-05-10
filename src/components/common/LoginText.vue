<template>
  <div>
      <van-cell-group>
        <van-field
            v-model="content"
            :placeholder="placeholder"
            :label="label"
            :type="type"
        />
       </van-cell-group>
  </div>
</template>

<script>
export default {
    data() {
        return {
            content:''
        }
    },
    props:['label','placeholder','type'],
    watch:{
        content() {
               this.$emit('contentWatch',this.content)
        }
    }
}
</script>

<style>

</style>