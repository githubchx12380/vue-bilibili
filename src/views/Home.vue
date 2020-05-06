<template>
  <div class="home" v-if="category">
    <nav-bar></nav-bar>
    <van-tabs v-model="active" swipeable sticky>
      <van-tab v-for="(item,index) in category" :key="index" :title="item.title">
        <van-list v-model="item.loading" :immediate-check="false"  :finished="item.finished" finished-text="我也是有底线的" @load="onLoad">
          <div class="detailparent">
            <cover
              class="detailitem"
              :detailitem="categoryitem"
              v-for="(categoryitem,categoryindex) in item.list"
              :key="categoryindex"
            />
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import NavBar from "@/components/common/Navbar.vue";
import cover from "./cover";
export default {
  data() {
    return {
      category: [],
      active: 0
    };
  },
  components: {
    NavBar,
    cover
  },

  methods: {
    async selectCategory() {
      const res = await this.$http.get("/category");
      this.category = this.changeCategory(res.data);
      this.selectArticle();

    },
    changeCategory(data) {
      const category1 = data.map((item, index) => {
        item.list = [];
        item.page = 0;
        item.finished = false
        item.loading = true
        item.pagesize = 10;
        return item;
      });
     return category1;
   
    },
    async selectArticle() {
      const categoryitem = this.categoryItem();
      const res = await this.$http.get("/detail/" + categoryitem._id, {
        params: {
          page: categoryitem.page,
          pagesize: categoryitem.pagesize
        }
      });
      categoryitem.list.push(...res.data)
      categoryitem.loading = false
      if(res.data.length < categoryitem.pagesize) {
        categoryitem.finished = true
      }
    },
    onLoad() {
        const categoryitem = this.categoryItem()
        setTimeout(() => {
            categoryitem.page += 1
            this.selectArticle()  
        },1000)
    },
    categoryItem() {
      const categoryitem = this.category[this.active];
      return categoryitem;
    }
  },
  watch: {
    active() {
      const categoryitem = this.categoryItem()
      if(!categoryitem.list.length){
         this.selectArticle();
      }
    }
  },
  created() {
    this.selectCategory();
    console.log(this.$route)
  },
};
</script>

<style lang="less">
.home {
  background-color: white;
}
.detailparent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .detailitem {
    margin: 1.389vw 0;
    width: 45%;
  }
}
</style>