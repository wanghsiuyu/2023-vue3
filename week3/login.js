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
      axios
        .post(`${url}/admin/signin`, this.user)
        .then((res) => {
          console.log(res.data);
          const { token, expired } = res.data;
          document.cookie = `myToken=${token}; expires=${new Date(expired)};`;
          window.location = './product.html';
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.message);
          this.email = '';
          this.password = '';
        });
    },
  },
};
createApp(app).mount('#app');
