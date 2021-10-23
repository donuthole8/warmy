<template>
<div>
    <Menu current="article"></Menu>
    <div class="ui main container">
    <!-- 基本的なコンテンツはここに記載する -->

      <h1 class="custom-title">
        <span class="custom-underline">専門記事</span>
      </h1>
      <div v-if="!completed">
        <div class="ui text container">

           <div class="ui segment">
            <form class="ui form" @submit.prevent="searchArticle">
              <label class="type">冷え性タイプ</label>        
              <select class="ui dropdown" v-model="search.type">
                <option value=""></option>
                <option value="全身型">全身型</option>
                <option value="四肢末端型">四肢末端型</option>
                <option value="下半身型">下半身型</option>
                <option value="内蔵型">内蔵型</option>
              </select><br>         
              <label class="category">カテゴリ</label>
              <select class="ui dropdown" v-model="search.category">
                <option value=""></option>
                <option value="食事">食事</option>
                <option value="運動">運動</option>
                <option value="その他">その他</option>
              </select><br>      
              <div class="search">
                <button class="search-button" type="submit">検索</button>
              </div>
            </form>
          </div>
        </div>
        <template v-if="search.err">
          <li class="err-msg">{{ search.err }}</li>
        </template>
        <div class="ui segments" @submit.prevent="displayArticle">
          <template v-for="(article, index) in sortedArticles">
            <div class="ui raised stacked verticle segment" :key="index" style="position: relative;">
              <h2>{{ article.aTitle }}</h2>
              <p class="article-username">{{ article.aName }}</p>
              <div class="article-type">
                <label>冷え性タイプ：</label>
                <div class="ui large label">{{ article.aType }}</div><br>
              </div>
              <div class="article-category">
                <label>カテゴリ：</label>
                <div class="ui large label">{{ article.aCategory }}</div>
              </div>
              <div class="article-button">
              <button class="button" @click="displayArticle(article)">閲覧</button>
              </div>
            </div>
          </template>
        </div>
      </div>
      <!-- 記事内容の表示 -->
      <div v-if="completed"> 
        <div class="ui piled segment" style="position: relative;">
          <h2>{{ article.aTitle }}</h2>
          <p class="article-username">{{ article.aName }}</p>
          <div class="display-type">
            <label>冷え性タイプ：</label>
            <div class="ui big label">{{ article.aType }}</div><br>
          </div>
          <div class="display-category">
            <label>カテゴリ：</label>
            <div class="ui big label">{{ article.aCategory }}</div><br>
          </div>
          <div class="ui segment">
            <p class="article-text">{{ article.aText }}</p><br>
          </div>
          <div class="back-button">
          <button class="search-button" @click="backArticle()">戻る</button>
          </div>
        </div>     
      </div>
      <footer class="footer">
        <small>&copy;WARMY ALL RIGHTS RESERVED.</small>
      </footer>
    </div>
</div>
</template>
<script>
// 必要なものはここでインポートする
import { baseUrl } from '@/assets/config.js';
import Menu from '@/components/Menu.vue';
import axios from "axios";
// @は/srcの同じ意味です
// import something from '@/components/something.vue';

export default {
  name: 'Article',
  components: {
   // 読み込んだコンポーネント名をここに記述する
   Menu,
  },
  data() {
  // Vue.jsで使う変数はここに記述する
    return {
      completed: false,
      search: {
        title:'',
        type:'',
        category: '',
        err: null,
      },
      articles: [],
      iam: null,
      article: {
        "aDate":null,
        "aTitle":"",
        "aType":"",
        "aCategory":"",
        "aName":"",
        "aText":""
      }
    };
  },
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
    sortedArticles() {
      // sort()は破壊的変更のため、一度コピーしてから使う
      const articles = [...this.articles];
      const sortedArticles = articles.sort((previos, next) => {
        return previos.timestamp - next.timestamp;
      });
      return sortedArticles;
    },
  },
  created() {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
    const token = localStorage.getItem("token");
    if (!token) this.$router.push({name: "Article"});

    this.iam = localStorage.getItem("aName");
    // apiからarticleを取得する
    this.getArticles();
  },
  methods: {
  // Vue.jsで使う関数はここで記述する
    getArticles() {
      axios.get(baseUrl + "/article/all")
        .then((response) => {
            this.articles=response.data.sposts
        })
        .catch(e => {
          throw new Error(e);
        }
      );
    },
    searchArticle() {
      console.log(this.search);
      if (!this.search.title) {
        this.search.title = '';
      }
      if (!this.search.type) {
        this.search.type = '';
      }
      if (!this.search.category) {
        this.search.category = '';
      }
      if(!this.search.title && !this.search.type && !this.search.category){
        this.getArticles();
        return;
      }
      const titleQuery = this.search.title ? `aTitle=${this.search.title}&`: '';
      const typeQuery = this.search.type ? `aType=${this.search.type}&`: '';
      const categoryQuery = this.search.category ? `aCategory=${this.search.category}`: '';
      axios.get(baseUrl + '/article/get?' + titleQuery + typeQuery + categoryQuery )
        .then((response) => {
          // 成功したときの処理はここに記述する
          this.articles = [];
          console.log(response);
          for (let i = 0; i < response.data.length; i++) {
            if (!this.articles.includes(response.data[i])) {
              this.articles.push(response.data[i]);
            }
          }
        })
        .catch(() => {
          // レスポンスがエラーで返ってきたときの処理はここに記述する
          this.search.err = '予期せぬエラーが発生しました';
        }
      );
    },
    displayArticle(article) {
      this.article = article;
      console.log(this.article);
      this.completed = true;
    },
    backArticle() {
      this.completed = false;
    },
  },
}
</script>
<style>
.main.container {
  margin-top: 50px;
}
.custom-underline {
  border-bottom: solid 2px #000;
}
.custom-title {
  text-align: center;
  letter-spacing: 0.1rem;
  margin-bottom: 50px;
}

.article-title {
  font-size: 30px;
  color: rgba(0, 0, 0, 0.624);
  text-align: center;
  padding-top: 20px;
  padding-bottom: 10px;
}

.search-button {
  color: white;
  background-color: #ff8787;
  border: 1px solid rgba(0, 0, 0, 0.22);
  width: 110px;
  padding: 5px;
  height: 40px;
  font-size: 1.4rem;
}

.article-username {
  font-size: 18px;
  color: rgba(0, 0, 0, 0.474);
  text-align: center;
  padding-bottom: 20px;
}

.article-type,
.article-category {
  font-size: 20px;
  color: rgba(0, 0, 0, 0.474);
  padding-left: 7%;
}
.article-category {
  padding-top: 15px;
  padding-bottom: 15px;
}

.article-button {
  text-align: right;
  padding-right: 50px;
}
.button {
  color: rgb(250, 250, 250);
  background-color: #ff8787;
  border: 1px solid rgba(0, 0, 0, 0.22);
  width: 80px;
  padding: 10px;
}

.type {
  font-size: 1.4em;
  font-weight: 600;
}
.category {
  font-size: 1.4em;
  font-weight: 600;
}

.search {
  text-align: center;
  padding-top: 20px;
  padding-bottom: 15px;
}

.display-type,
.display-category {
  font-size: 20px;
  color: rgba(0, 0, 0, 0.734);
  padding-left: 5%;
}
.display-category {
  padding-top: 15px;
  padding-bottom: 15px;
}

.back-button {
  text-align: right;
  padding-right: 10%;
  padding-bottom: 3%;
}

.footer {
  font-weight: 300;
  letter-spacing: 0.1rem;
  width: 100%;
  padding: 10px 0;
  text-align: center;
  margin-top: 50px;
  border-top: 1px solid #dddddd;
}
</style>
