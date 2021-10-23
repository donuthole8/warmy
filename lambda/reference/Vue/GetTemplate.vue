<template>
  <div></div>
</template>
<script>
import { baseUrl } from '@/assets/config.js';
import axios from "axios";

export default {
  name: 'Template',
  data() {
    return {

    };
  },
  computed: {

  },
  methods: {
    getRequestTemplate() {
      axios.get(baseUrl + "/test")
        .then((response) => {
          // 成功したときの処理はここに記述する
          console.log(response);
        })
        .catch(() => {
          // レスポンスがエラーで返ってきたときの処理はここに記述する
        }
      );
    }
  },
}
</script>
<style scoped>

</style>