import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.47/vue.esm-browser.min.js';
import { baseUrl, path } from './config.js';
const app = createApp({
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
        .post(`${baseUrl}/admin/signin`, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `myToken=${token}; expires= ${new Date(expired)};`;
          window.location = './product.html';
        })
        .catch((err) => {
          alert(err.response.data.message);
          this.email = '';
          this.password = '';
        });
    },
  },
});
app.mount('#app');
