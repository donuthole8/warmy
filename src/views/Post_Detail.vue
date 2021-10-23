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
          <input type="textarea" name="pText" v-model="comment.cText" />
        </div>
        <li v-if="err" class="err-msg">{{ err }}</li>
        <button class="ui button bg-red">コメント</button>
      </form>
    </div>
    <div class="ui segment wrapper grid">
      <img src="@/assets/img/neko.png" class="image" width="120" height="110">
      <div class="twelve wide column middle aligned">
        <div class="ui header">
        <div class="content">
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
          <div class="column"  @click="good(post)">
            <div class="ui left icon input"> 
              <div class="icon">
                <i class="heart outline icon"></i>
              </div>
              {{ post.pGood }}
            </div>
          </div>
          <div class="column">
            <div class="ui left icon input">
              <div class="icon">
                <i class="comment outline icon"></i>
              </div>
              {{ this.comments.length }}
            </div>
          </div>
        </div>
      </h3>
      </div>
    </div>
    <div class="ui segments">
      <div class="content box-border">
      <template v-for="(comment, index) in comments">
        <div class="ui segment wrapper grid" :key="index">
          <img src="@/assets/img/neko.png" class="image" width="90" height="80">
          <div class="twelve wide column middle aligned">
          <div class="ui header">
            <div class="content">
              {{ comment.cName }}
              <div class="ui label right-aligned">
                {{ comment.cDate }}
              </div>
            </div>
          </div>
          <div class="sub header">
            {{ comment.cText }}
          </div>
          </div>
        </div>
      </template>
      </div>
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
  name: 'Post_Detail',
  components: {
    Menu,
  },
  data() {
    return {
      comments: [],
      post: JSON.parse(localStorage.getItem("post")),
      comment: {
        cName: null,
        cText: null,
        cUserName: null,
        cUserDate: null
      },
      err: null,
    };
  },

  created() {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
    //const token = localStorage.getItem("token");
    //if (!token) this.$router.push({name: "Login"});

    axios.get(baseUrl + "/comment/get" + "?cUserName=" + this.post.pName + "&cUserDate=" + this.post.pDate)
    .then((response) => {
        // 成功したときの処理はここに記述する
        // console.log(response.data);
        this.comments = response.data;
    })
    .catch(() => {
        // レスポンスがエラーで返ってきたときの処理はここに記述する
        this.err = '予期せぬエラーが発生しました';
    });
  },

  computed: {
  },
  methods: {
      addCommNum() {
      const request = {
        pDate: this.post.pDate,
        pName: this.post.pName,
        pText: this.post.pText,
        pComCount: this.comments.length + 1,
        pGood: this.post.pGood
      }
      axios.put(baseUrl + "/sns/put", request)
        .then((response) => {
          // 成功したときの処理はここに記述する
          console.log(response);
          this.$router.go({path: this.$router.currentRoute.path, force: true});
          return;
        })
        .catch(() => {
          // レスポンスがエラーで返ってきたときの処理はここに記述する
          this.err = "予期せぬエラーが発生しました"
        });
    },
    submit(){
      if(!this.comment.cText){
        this.err = "投稿を入力してください";
      }else{
        const requestBody = {
          cName: localStorage.getItem("uName"), //this.comment.cName,
          cText: this.comment.cText,
          cUserName: this.post.pName,
          cUserDate: this.post.pDate
        }
        axios.post(baseUrl + "/comment/post", requestBody)
          .then((response) => {
            // 成功したときの処理はここに記述する
            console.log(response);
            console.log("of");
            this.addCommNum();
          })
          .catch(() => {
            // レスポンスがエラーで返ってきたときの処理はここに記述する
            this.err = "予期せぬエラーが発生しました"
          });
      }
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
.bg-red {
  background-color: #ff8787;
}
.search-button {
  color: white;
  background-color: #ff8787;
  border: 1px solid rgba(0, 0, 0, 0.22);
  width: 150px;
  padding: 5px;
  height: 45px;
  font-size: 1.4rem;
}
.image {
  padding-top: 15px;
}
.icon {
  width: 30px;
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