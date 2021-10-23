<template>
  <div>
    <Menu current="Home"></Menu>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="custom-main">
        <img src="@/assets/img/main.png" alt="" class="custom-mainimg" />
      </div>
      <div class="custom-second">
        <div>
          <h2 class="custom-secondtitle">ABOUT</h2>
          <p class="custom-secondsubtitle">サービスについて</p>
        </div>
        <div class="custom-secondcontents">
          <p>冷え性になると、血流やリンパの巡りが悪くなるため、</p>
          <p>健康、美容、ダイエットにさまざまなデメリットがあります。</p>
        </div>
        <div class="custom-seconddiv">
          <img src="@/assets/img/Home.png" alt="" class="custom-secondimg" />
        </div>
        <div>
          <h2 class="custom-thirdtitle">
            自分の症状にあった冷え性対策を手軽に見つける
          </h2>
          <p class="custom-thirdcontents">
            冷え性タイプにあった記事やみんなの投稿を参考にして
          </p>
          <p class="custom-thirdcontents">
            ぽかぽかめぐり体質をつくりましょう。
          </p>
          <p class="custom-thirdcontents">
            まずは診断で自分の冷え性タイプを調べてみましょう！
          </p>
          <button class="custom-btn" @click="move()">診断開始</button>
        </div>
      </div>
      <footer class="footer">
        <small>&copy;WARMY ALL RIGHTS RESERVED.</small>
      </footer>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue';

export default {
  name: 'Home',
  components: {
    Menu,
   // 読み込んだコンポーネント名をここに記述する
  },
  data() {
  // Vue.jsで使う変数はここに記述する
    return {
    };
  },
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
  },
  methods: {
  // Vue.jsで使う関数はここで記述する
    move(){
      if (localStorage.getItem("uName")) {
        this.$router.push({ name: "Diagnose"});
      }else{
        this.$router.push({ name: "Login"});
      }
    }
  },
}
</script>
<style scoped>
.custom-main {
  margin-bottom: 50px;
}
.custom-mainimg {
  max-width: 100%;
}
.custom-second {
  background-color: #f5f7fa;
  text-align: center;
}

.custom-secondtitle {
  padding-top: 30px;
  letter-spacing: 0.2rem;
  font-size: 2.1rem;
  font-weight: 700;
  margin-bottom: 0;
}

.custom-secondcontents {
  margin-top: 60px;
  font-size: 1.2rem;
}

.custom-seconddiv {
  margin-top: 40px;
}

.custom-secondimg {
  width: 30%;
}

.custom-thirdtitle {
  margin-top: 30px;
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
}

.custom-thirdcontents {
  margin-top: 40px;
  font-size: 1.4rem;
}

.custom-btn {
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: center;
  font-size: 2rem;
  width: 35%;
  height: 60px;
  color: #fff;
  background-color: #ff8787;
  border-radius: 100vh;
  border: none;
}
</style>
