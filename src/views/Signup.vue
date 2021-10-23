<template>
<div>
  <Menu current="Signup"></Menu>
  <div class="ui text container">
    <h1 class="custom-title"><span class="custom-underline">新規登録</span></h1>
    <form class="ui form" @submit.prevent="submit">
      <div class="custom-textarea">
        <div class="field">
          <label class="custom-label">ユーザー名</label>
          <div>
            <input type="text" name="first-name" placeholder="例:タナカ" v-model="user.name" />
          </div>
        </div>
      </div>
      <div class="custom-textarea">
        <div class="field">
          <label class="custom-label">メールアドレス</label>
          <div>
            <input type="text" name="first-name" placeholder="mail@gmail.com" v-model="user.mailaddress"/>
          </div>
        </div>
      </div>
      <div class="custom-textarea">
        <div class="field">
          <label>パスワード</label>
          <input type="text" name="last-name" placeholder="入力してください" v-model="user.password"/>
        </div>
      </div>
      <div class="custom-button">
        <button class="ui large secondary button" type="submit">
          登録する
        </button>
      </div>
      <div class="custom-button">
        <button class="ui large basic button" @click="login()">
          ログイン
        </button>
      </div>
    </form>
  </div>
</div>
</template>
<script>
import Menu from '@/components/Menu.vue';
import { baseUrl } from '@/assets/config.js';
import axios from "axios";

export default {
  name: 'Signup',
  components: {
   // 読み込んだコンポーネント名をここに記述する
   Menu
  },
data() {
  // Vue.jsで使う変数はここに記述する
    return {
      user:{
        name: null,
        password: null,
        mailaddress: null,
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
      //新規作成処理
      if(!this.user.name){
        this.err = "userIDを入力してください"
      }else if(!this.user.password){
        this.err = "passwordを入力してください"
      }else if(!this.user.mailaddress){
        this.err = "メールアドレスを入力してください"
      }else{
        const requestBody = {
        uName: this.user.name,
        uMail: this.user.mailaddress,
        uPassword: this.user.password,
        }
        axios.post(baseUrl + "/user/signup", requestBody)
          .then((response) => {
            // 成功したときの処理はここに記述する
            console.log(response.data);
            this.$router.push({name: 'Login'});
          })
          .catch(() => {
            // レスポンスがエラーで返ってきたときの処理はここに記述する
          }
        );
      }
    },
    login(){
      this.$router.push({name: 'Login'});
    }
  },
}
</script>
<style scoped>
.custom-underline {
  border-bottom: solid 2px #000;
}
.custom-title {
  text-align: center;
  margin-top: 50px;
}
.custom-textarea {
  margin-top: 40px;
}
.custom-button {
  text-align: center;
  margin-top: 30px;
}
input {
  height: 50px;
}
button {
  width: 200px;
}
</style>
