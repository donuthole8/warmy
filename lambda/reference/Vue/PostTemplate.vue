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
    postRequestTemplate() {
      const requestBody = {
        value1: "value1",
        value2: "value2"
      }
      axios.post(baseUrl + "/test", requestBody)
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