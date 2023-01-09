import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';
const app = {
  data() {
    return {
      products: [],
      temp: {},
    };
  },
  methods: {
    checkLogin() {
      // 取得 token，放入 headers
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, '$1');
      axios.defaults.headers.common['Authorization'] = token;
      // 驗證是否登入
      axios
        .post(`${url}/api/user/check`)
        .then((res) => {
          console.log(res.data);
          //確認登入才放產品列表
          this.getProduct();
        })
        .catch((err) => {
          console.log(err);
          //沒登入就跳回登入頁面
          alert('請先登入');
          window.location = './login.html';
        });
    },
    getProduct() {
      //取得產品資料
      axios
        .get(`${url}/api/${path}/admin/products`)
        .then((res) => {
          console.log(res.data.products);
          this.products = res.data.products;
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },
    productDetails(productItem) {
      this.temp = productItem;
    },
  },
  mounted() {
    this.checkLogin();
  },
};
createApp(app).mount('#app');
