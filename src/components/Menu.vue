<template>
<header>
  <div class="menu">
    <div class="ui top menu">
      <div class="left menu" @click="switchPage('Home')">
        <img src="@/assets/img/icon.png" class="icon">
      </div>
      <div class="right menu">
        <a class="item" @click="switchPage('Diagnose')" v-bind:class="{active: current=='diagnose'}">冷え性診断</a>
        <a class="item" @click="switchPage('Article')" v-bind:class="{active: current==''}">専門記事</a>
        <a class="item" @click="switchPage('Post')" v-bind:class="{active: current=='post'}">みんなの投稿</a>
        <a class="item" @click="switchPage('Login')" v-if="!login" v-bind:class="{active: current=='login'}">ログイン</a>
        <a class="item" @click="switchPage('Profile')" v-if="login" v-bind:class="{active: current=='profile'}">マイページ</a>
        <a class="item" @click="logout">ログアウト</a>
      </div>  
    </div>
  </div>
</header>
</template>

<script>
  export default {
    name: 'Menu',
    props: {
      current: {
        type: String,
        required: true,
      },
    },
    data(){
      return{
        login: false
      }
    },
    
    methods: {
        switchPage(pageName) {
          if(localStorage.getItem('uName')){
            this.$router.push({name: pageName});
          }else{
            this.$router.push({name: "Login"});
          }
        },
        logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('uName');
        localStorage.removeItem('post');
        this.$router.push({name: 'Login'});
        },
    },
    created(){
      if(localStorage.getItem('uName')){
        this.login=true;
      }
    }
  }
</script>
<style>
.icon {
  width: 60%;
  padding-left: 30px;
}
.menu-text {
  font-family: "游ゴシック体", YuGothic, "游ゴシック Medium", "Yu Gothic Medium",
    "游ゴシック", "Yu Gothic", sans-serif;
  font-size: 1.4rem;
  padding-left: 25px;
  padding-right: 25px;
  font-weight: 700;
}
.menu-text2 {
  font-family: "游ゴシック体", YuGothic, "游ゴシック Medium", "Yu Gothic Medium",
    "游ゴシック", "Yu Gothic", sans-serif;
  font-size: 1.4rem;
  padding-left: 35px;
  padding-right: 35px;
  font-weight: 700;
}
.menu-text3 {
  font-family: "游ゴシック体", YuGothic, "游ゴシック Medium", "Yu Gothic Medium",
    "游ゴシック", "Yu Gothic", sans-serif;
  font-size: 1.4rem;
  padding-left: 20px;
  padding-right: 20px;
  font-weight: 700;
}
.menu-text4 {
  font-family: "游ゴシック体", YuGothic, "游ゴシック Medium", "Yu Gothic Medium",
    "游ゴシック", "Yu Gothic", sans-serif;
  font-size: 1.4rem;
  padding-left: 5px;
  padding-right: 5px;
  font-weight: 700;
}
.menu-text5 {
  font-family: "游ゴシック体", YuGothic, "游ゴシック Medium", "Yu Gothic Medium",
    "游ゴシック", "Yu Gothic", sans-serif;
  font-size: 1.4rem;
  padding-left: 10px;
  padding-right: 10px;
  font-weight: 700;
}
</style>
