<template>
  <div class="ui main container">
    <Menu current="user"></Menu>
    <div class="ui segment">
    <form class="ui form">
        <div class="field">
            <label>ユーザ名</label>
            <input type="text" placeholder="Nickname"
                v-model="nickname">
        </div>
        <div class="field">
            <label>年齢</label>
            <div class="inline fields">
                <div class="field">
                    <input type="number" v-model="start">
                    <label>歳から</label>
                </div>
                <div class="field">
                    <input type="number" v-model="end">
                    <label>歳まで</label>
                </div>
            </div>
        </div>
    </form>
    </div>
    <div class="ui segments">
      <template v-for="(user, index) in filterdUsers">
          <div class="ui segment wrapeer" :key="index">
              <h2 class="ui header">
                  <div class="content">
                      {{ user.nickname }}
                      <div class="ui green label">
                          {{ user.age }}
                      </div>
                  </div>
                  <div class="sub header">
                      {{ user.userId }}
                  </div>
              </h2>
          </div>
      </template>
    </div>
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
  name: 'User',
  components: {
   // 読み込んだコンポーネント名をここに記述する
   Menu,
  },
  data() {
    return {
    // Vue.jsで使う変数はここに記述する
        users: [],
        // 追加部分
        nickname: null,
        start: 0,
        end: 100
    }
  },
  /* 途中省略*/
  created() {
      axios.get(baseUrl + "/users")
      .then((response) => {
          // 成功したときの処理はここに記述する
          this.users = response.data.users;
      })
      .catch(() => {
          // レスポンスがエラーで返ってきたときの処理はここに記述する
      });
  },
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
    filterdUsers() {
      let result = [...this.users];
      if (this.nickname) {
          result = result.filter(target => {
              if (target.nickname) {
                  return target.nickname.match(this.nickname);
              } else {
                  return;
              }
          });
      }
      if (this.start) {
          result = result.filter(target => {
              return target.age >= this.start;
          });
      }
      if (this.end) {
          result = result.filter(target => {
              return target.age <= this.end;
          });
      }
      return result;
    }
  },
  methods: {
  // Vue.jsで使う関数はここで記述する
  },
}
</script>
<style scoped>
/* このコンポーネントだけに適用するCSSは */
</style>