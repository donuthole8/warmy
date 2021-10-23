<template>
<div>
  <Menu current="profile"></Menu>
  <div class="ui text container">
    <h1 class="custom-title">
      <span class="custom-underline">マイページ</span>
    </h1>
    <form class="ui form" @submit.prevent="submit()">
      <div class="custom-textarea">
        <div class="field">
          <label class="custom-label">ユーザー名</label>
          <div>
            <input type="text" name="name" placeholder="ID" v-model="user.name" required disabled
            />
          </div>
        </div>
      </div>
      <div class="custom-textarea">
        <div class="field">
          <label class="custom-label">メールアドレス</label>
          <div>
            <input type="text" name="mail" placeholder="mail@gmail.com" v-model="user.mail" />
          </div>
        </div>
      </div>
      <div class="custom-textarea">
        <div class="field">
          <label>パスワード</label>
          <input type="text" name="Password" placeholder="入力してください" v-model="user.password" />
        </div>
      </div>
      <div class="custom-textarea">
        <div class="field">
          <label>カテゴリー</label>
          <input type="text" name="category" placeholder="入力してください" v-model="user.category" />
        </div>
      </div>
      <div class="custom-textarea">
        <div class="field">
          <label>タイプ</label>
          <select class="ui dropdown" v-model="user.type">
            <option value="特になし"></option>
            <option value="食事">食事</option>
            <option value="運動">運動</option>
            <option value="その他">その他</option>
          </select>
        </div>   
      </div>
      <div class="custom-button">
        <button class="ui large secondary button" type="submit">
          更新する
        </button>
      </div>
      <div class="custom-button">
        <button class="ui large basic button" @click="deleteUser()">退会する</button>
      </div>
    </form>
  </div>
</div>
</template>
<script>
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
        name: localStorage.getItem('uName'),
        password: null,
        mail: null,
        category: null,
        type: null,
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
        console.log("er");
        return;
      }
      const requestBody =  {
        uName: this.user.name,
        uMail: this.user.mail,
        uPassword: this.user.password,
        uCategory: this.user.category,
        uType: this.user.type
      };
      axios.put(baseUrl + "/user/put", requestBody)
        .then(() => {
          // 成功したときの処理はここに記述する
          this.$router.push({ name: "Login"})
        })
        .catch(() => {
          // レスポンスがエラーで返ってきたときの処理はここに記述する
        }
      );
    },
    deleteUser(){
      axios.delete(baseUrl + "/user/delete", {
        data: {
          uName: this.user.name
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

    axios.get(baseUrl + "/user/get?uName=" + localStorage.getItem('uName'))
      .then((response) => {
        // 成功したときの処理はここに記述する
        console.log(response);
        this.user.mail = response.data.uMail;
        this.user.category = response.data.uCategory;
        this.user.type = response.data.uType;

        // this.user.age = response.data.;
      })
      .catch(() => {
        // レスポンスがエラーで返ってきたときの処理はここに記述する
        this.err = '予期せぬエラーが発生しました';
      }
    );
  }
}
//         if(!response.data.uType){
//           this.user.type = document.getElementById('example')? document.getElementById('example').value : "なし";
//         }else{
//           this.user.type = document.getElementById('example')? document.getElementById('example').value : response.data.uCategory;
//         }
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
