<template>
  <div class="ui main container">
    <Menu current="profile"></Menu>
    <!-- 基本的なコンテンツはここに記載する -->
    <div class="ui segment">
      <form class="ui large form" @submit.prevent="submit">
        <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input type="text" placeholder="ID" v-model="user.userId" required disabled>
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input type="text" placeholder="Password" v-model="user.password">
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <i class="tag icon"></i>
            <input type="text" placeholder="Nickname" v-model="user.nickname">
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <i class="calendar icon"></i>
            <input type="text" placeholder="Age" v-model.number="user.age">
          </div>
        </div>
        <p>{{err}}</p>
        <button class="ui huge fluid green button" type="submit">
          更新  
        </button>
      </form>
    </div>
    <button @click="deleteUser" class="ui huge fluid gray button" type="submit">
      退会
    </button>
  </div>
</template>
<script>
// 必要なものはここでインポートする
// @は/srcの同じ意味です
// import something from '@/components/something.vue';
import { baseUrl } from '@/assets/config.js';
import axios from "axios";
import Menu from '@/components/Menu.vue';




export default {
  name: 'Profile',
  components: {
   // 読み込んだコンポーネント名をここに記述する
   Menu
  },
  data() {
  // Vue.jsで使う変数はここに記述する
    return {
      user:{
        userId: localStorage.getItem('userId'),
        password: null,
        nickname: null,
        age: null
      },
      err:null,
    };
  },
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
  },
  methods: {
  // Vue.jsで使う関数はここで記述する
    submit(){
      if(!this.user.password){
        this.err = "パスワードを入力してください";
        return;
      }else if(!this.user.nickname){
        this.err = "ニックネームを入力してください";
        return;
      }else if(!this.user.age){
        this.err = "年齢を入力してください";
        return;
      }
      const requestBody =  {
        userId: this.user.userId,
        password: this.user.password,
        nickname: this.user.nickname,
        age: this.user.age
      };
      axios.put(baseUrl + "/user", requestBody)
        .then(() => {
          // 成功したときの処理はここに記述する
          this.$router.push({ name: "Home"})
        })
        .catch(() => {
          // レスポンスがエラーで返ってきたときの処理はここに記述する
        }
      );
    },
    deleteUser(){
      axios.delete(baseUrl + "/user", {
        data: {
          userId: this.user.userId
        }
      })
        .then(() => {
          //成功処理
          this.$router.push({name: 'Login'});
        })
        .catch((e) => {
          //エラー処理
          throw new Error(e);
        }
      );
    }

    
  },
  created(){
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
    const token = localStorage.getItem("token");
    if (!token) this.$router.push({name: "Login"});

    axios.get(baseUrl + "/user" + "?userId=" + this.user.userId)
      .then((response) => {
        // 成功したときの処理はここに記述する
        console.log(response);
        this.user.nickname = response.data.nickname;
        this.user.age = response.data.age;
      })
      .catch(() => {
        // レスポンスがエラーで返ってきたときの処理はここに記述する
        this.err = '予期せぬエラーが発生しました';
      }
    );
  }
}
</script>
<style scoped>
/* このコンポーネントだけに適用するCSSは */
</style>