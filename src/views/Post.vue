<template>
<div>
  <Menu current="post"></Menu>
  <div class="ui main container">
    <h1 class="custom-title">
      <span class="custom-underline">みんなの投稿</span>
    </h1>
    <div class="ui segment">
      <form class="ui form" @submit.prevent="submit">
        <div class="field">
          <input type="textarea" name="pText" v-model="post.pText"/>
        </div>
        <li v-if="err" class="err-msg">{{ err }}</li>
        <button class="ui button bg-red">投稿</button>
      </form>
    </div>
    <div class="ui segments">
      <template v-for="(post, index) in posts">
        <div class="ui segment wrapper grid" :key="index">
          <img src="@/assets/img/neko.png" class="image" width="110" height="100">
          <div class="twelve wide column middle aligned">
          <div class="ui header">
            <div class="content" @click="detail(post)">
              {{ post.pName }}
              <div class="ui label right-aligned">
                {{ post.pDate }}
              </div>
            </div>
          </div>
          <div class="sub header">
            {{ post.pText }}
          </div>
          <h3>
            <div class="ui two column grid">
              <div class="column" @click="good(post)">
                <div class="ui left icon input "> 
                  <div class="icon">
                    <i class="heart outline icon"></i>
                  </div>
                  <label>{{ post.pGood }}</label>
                </div>
              </div>
              <div class="column">
                <div class="ui left icon input">
                  <div class="icon">
                    <i class="comment outline icon"></i>
                  </div>
                  <label>{{ post.pComCount }}</label>
                </div>
              </div>
            </div>
          </h3>
          </div>
        </div>
      </template>
    </div>
    <footer class="footer">
      <small>&copy;WARMY ALL RIGHTS RESERVED.</small>
    </footer>
  </div>
</div>
</template>
<script>
import { baseUrl } from '@/assets/config.js';
import Menu from '@/components/Menu.vue';
import axios from "axios";

export default {
  name: 'Post',
  components: {
    Menu,
  },
  data() {
    return {
      posts: [],
      post: {
        pName: localStorage.getItem("uName"),
        pText: null
      },
      ifGood: {
        pName: [] 
      },
      err: null,
    };
  },

  created() {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
    //const token = localStorage.getItem("token");
    //if (!token) this.$router.push({name: "Login"});

    axios.get(baseUrl + "/sns/all")
    .then((response) => {
        // 成功したときの処理はここに記述する
        console.log(response);
        this.posts = response.data.sns;
    })
    .catch(() => {
        // レスポンスがエラーで返ってきたときの処理はここに記述する
        this.err = '予期せぬエラーが発生しました';
    });
  },

  computed: {
  },
  methods: {
    submit() {
      if(!this.post.pText){
        this.err = "投稿を入力してください";
      }else{
        const requestBody = {
          pName: this.post.pName,
          pText: this.post.pText,
        }
        axios.post(baseUrl + "/sns/post", requestBody)
          .then((response) => {
            console.log(response);
            // 成功したときの処理はここに記述する
            this.$router.go({path: this.$router.currentRoute.path, force: true});

          })
          .catch(() => {
            // レスポンスがエラーで返ってきたときの処理はここに記述する
            this.err = "予期せぬエラーが発生しました"
          });
      }
      return;
    },

    good(post){
      /*一回だけいいねできるようにしたかった      
      if(!this.ifGood[this.pName]){
        post.pGood -= 1;
        this.ifGood[post] = true;
      }else{
        post.pGood += 1;
        this.ifGood[post] = false;
      }
      */
      post.pGood += 1;
      const requestBody = {
        pDate: post.pDate,
        pName: post.pName,
        pText: post.pText,
        pComCount: post.pComCount,
        pGood: post.pGood
      };
      axios.put(baseUrl + '/sns/put', requestBody)
        .then(() => {
        // 成功したときの処理はここに記述する
        })
        .catch((e) => {
        // レスポンスがエラーで返ってきたときの処理はここに記述する
          throw new Error(e);
        }
      );
    },

    detail(post){
      localStorage.setItem("post", JSON.stringify(post));
      this.$router.push({ name: "Post_Detail"});
    }
  },
}
</script>
<style scoped>
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

.search-button {
  color: white;
  background-color: #ff8787;
  border: 1px solid rgba(0, 0, 0, 0.22);
  width: 110px;
  padding: 5px;
  height: 40px;
  font-size: 1.4rem;
}
.search-button2 {
  color: white;
  background-color: #ff8787;
  border: 1px solid rgba(0, 0, 0, 0.22);
  width: 110px;
  margin-top: 150px;
  height: 40px;
  font-size: 1.4rem;
}
.bg-red {
  background-color: #ff8787;
}

.image {
  padding-top: 20px;
}

.icon {
  width: 10px;
}

input[type="textarea"] {
  resize: none;
  width: 100%;
  height: 100px;
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