<template>
  <div>
    <Menu current="home"></Menu>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="ui segment">
      </div>
    </div>
  </div>
</template>

<script>
// import { baseUrl } from '@/assets/config.js';
// import axios from "axios";
// 必要なものはここでインポートする
// @は/srcと同じ意味です
// import something from '@/components/something.vue';
import Menu from '@/components/Menu.vue';


export default {
  name: 'Home',
  components: {
   // 読み込んだコンポーネント名をここに記述する
   Menu,
  },
  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      post: {
        text: null,
        category: null,
        err: null
      },
      search: {
        username: null,
        category: null,
        start: null,
        end: null,
        err: null,
      },
      query: {
        start: null,
        end: null
      },
      articles: [],
      iam: null
    };
  },
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
    /*
    sortedArticles() {
    }
    */
  },
  created() {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
    //this.iam = localStorage.getItem("userId");
    // apiからarticleを取得する
  },
  methods: {
    // Vue.jsで使う関数はここで記述する
    /*
    getArticles() {
    },
    postArticle() {
    },
    searchArticle() {
    },
    deleteArticle(article) {
    },
    fromUnixtoDate(timestamp) {
    }
    */
  }
}
</script>
<style scoped>
</style>