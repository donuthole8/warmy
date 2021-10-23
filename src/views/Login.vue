<template>
<div>
  <Menu current="Login"></Menu>
  <div class="ui text container">
    <h1 class="custom-title">
      <span class="custom-underline">ログイン</span>
    </h1>
    <form class="ui form" @submit.prevent="submit">
      <div class="custom-textarea">
        <div class="field">
          <label class="custom-label">ユーザー名</label>
          <div>
            <input type="text" name="name" placeholder="例:タナカ" v-model="user.uName" />
          </div>
        </div>
      </div>
      <div class="custom-textarea">
        <div class="field">
          <label>パスワード</label>
          <input type="text" name="password" placeholder="入力してください" v-model="user.uPassword" />
        </div>
      </div>
      <div class="field">
        <div class="ui checkbox">
          <input type="checkbox" tabindex="0" class="hidden" />
        </div>
      </div>
      <div class="custom-button">
        <button class="ui large secondary button" type="submit">
          ログイン
        </button>
      </div>
      <div class="custom-button">
        <button class="ui large basic button" @click="create()">
          新規会員登録
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
  name: 'Login',
  components: {
    Menu,
   // 読み込んだコンポーネント名をここに記述する
  },
  data() {
  // Vue.jsで使う変数はここに記述する
    return {
      user:{
        uName: null,
        uPassword: null,
      },
      err:null,
    };
  },
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
  },
  methods: {
  // Vue.jsで使う関数はここで記述する
    create(){
      this.$router.push({name: 'Signup'});
    },
    submit(){
        //ログイン画面処理
        if(!this.user.uName){
          this.err = "userIDを入力してください"
        }else if(!this.user.uPassword){
          this.err = "passwordを入力してください"
        }else{
          const requestBody = {
          uName: this.user.uName,
          uPassword: this.user.uPassword,
          }
          axios.post(baseUrl + "/user/login", requestBody)
            .then((response) => {
              // 成功したときの処理はここに記述する
              console.log(response.data);
              localStorage.setItem('token',response.data.token);
              localStorage.setItem('uName',this.user.uName);
              this.$router.push({name: 'Home'});
            })
            .catch(() => {
              // レスポンスがエラーで返ってきたときの処理はここに記述する
            }
          );
        }
    },
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
