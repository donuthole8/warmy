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
    deleteRequestTemplate() {
      axios.delete(baseUrl + "/test", {  data: {
        // Overwrite Axios's automatically set Content-Type
        // getと同じ書き方だと動作が不安定だったため、以下の書き方に変更しています。
        value1: "value1",
        value2: "value2"
        }})
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