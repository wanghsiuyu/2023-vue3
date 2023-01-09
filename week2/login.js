import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';
const app = {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      const url = 'https://vue3-course-api.hexschool.io/v2';
      axios
        .post(`${url}/admin/signin`, this.user)
        .then((res) => {
          console.log(res.data);
          const { token, expired } = res.data;
          //token 存入 cookie
          document.cookie = `myToken=${token}; expires=${new Date(expired)};`;
          //跳轉頁面
          window.location = './product.html';
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
};
createApp(app).mount('#app');
