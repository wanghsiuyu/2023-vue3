import { baseUrl, path } from './config.js';
import productModal from './components/productModal.js';
const { createApp } = Vue;

VeeValidate.defineRule('email', VeeValidateRules['email']);
VeeValidate.defineRule('required', VeeValidateRules['required']);

Object.keys(VeeValidateRules).forEach((rule) => {
  if (rule !== 'default') {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});
// 讀取外部的資源
VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');

// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

const app = createApp({
  data() {
    return {
      isLoading: false,
      categoriesTabs: [
        ['超飽足果昔盆', 'bowl'],
        ['輕食冷盤', 'salad'],
        ['湯品', 'soup'],
        ['裸食甜點', 'dessert'],
        ['果昔飲品', 'juice'],
      ],
      products: [],
      tempProduct: {},
      cartsTotal: [],
      shipping: 0,
      user: {
        name: '',
        email: '',
        tel: '',
        address: '',
      },
      message: '',
    };
  },
  methods: {
    loading() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    },
    getProducts() {
      axios
        .get(`${baseUrl}/api/${path}/products/all`)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    getProduct(id) {
      this.loading();
      axios
        .get(`${baseUrl}/api/${path}/product/${id}`)
        .then((res) => {
          this.tempProduct = res.data.product;
          this.$refs.modal.productModal.show();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    addToCart(product_id, qty = 1) {
      const data = {
        product_id,
        qty,
      };
      axios
        .post(`${baseUrl}/api/${path}/cart`, { data })
        .then((res) => {
          alert(res.data.message);
          this.getCart();
          this.$refs.modal.productModal.hide();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    getCart() {
      axios
        .get(`${baseUrl}/api/${path}/cart`)
        .then((res) => {
          this.cartsTotal = res.data.data;
          this.shipping = parseInt(this.cartsTotal.total >= 500 ? 0 : 100);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    removeCart(id) {
      axios
        .delete(`${baseUrl}/api/${path}/cart/${id}`)
        .then((res) => {
          alert(res.data.message);
          this.getCart();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    removeCartsAll() {
      axios
        .delete(`${baseUrl}/api/${path}/carts`)
        .then((res) => {
          alert(res.data.message);
          this.getCart();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    setCartQty(cart) {
      const data = {
        product_id: cart.product_id,
        qty: cart.qty,
      };
      axios
        .put(`${baseUrl}/api/${path}/cart/${cart.id}`, { data })
        .then((res) => {
          alert(res.data.message);
          this.getCart();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    onSubmit() {
      if (this.cartsTotal.carts.length) {
        const data = {
          user: this.user,
          message: this.message,
        };
        axios
          .post(`${baseUrl}/api/${path}/order`, { data })
          .then((res) => {
            alert(res.data.message);
            this.getCart();
            this.$refs.form.resetForm();
            this.message = '';
          })
          .catch((err) => {
            alert(err.response.data.message);
          });
      } else {
        alert('目前購物車沒有任何品項，無法送出訂單。');
      }
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '需要正確的電話號碼';
    },
  },
  components: {
    productModal,
  },
  mounted() {
    this.getProducts();
    this.getCart();
    this.loading();
  },
});
app.component('loading', VueLoading.Component);
app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);
app.mount('#app');
