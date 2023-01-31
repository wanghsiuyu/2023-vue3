import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';
let productModal;
let deleteProductModal;
const app = {
  data() {
    return {
      products: [],
      tempProduct: {
        features: ['純素', '有機', '無麩質', '辣'],
        checkboxFeatures: [],
        categories: ['超飽足果昔盆', '輕食冷盤', '湯品', '裸食甜點', '果昔飲品'],
        selectCategories: '',
        category: '1', //必填，已用 categories 取代
        imagesUrl: [],
      },
      isNew: false,
    };
  },
  methods: {
    checkLogin() {
      axios
        .post(`${url}/api/user/check`)
        .then((res) => {
          console.log(res.data);
          this.getProduct();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getProduct() {
      axios
        .get(`${url}/api/${path}/admin/products/all`)
        .then((res) => {
          console.log(res.data.products);
          this.products = res.data.products;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateProduct() {
      let totalUrl = `${url}/api/${path}/admin/product`;
      let method = 'post';
      if (!this.isNew) {
        totalUrl = `${url}/api/${path}/admin/product/${this.tempProduct.id}`;
        method = 'put';
      }
      axios[method](totalUrl, { data: this.tempProduct })
        .then((res) => {
          console.log(res.data);
          this.getProduct(); //新增後必須重新取得產品資料
          productModal.hide();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteProduct() {
      axios
        .delete(`${url}/api/${path}/admin/product/${this.tempProduct.id}`)
        .then((res) => {
          this.getProduct();
          deleteProductModal.hide();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push('');
    },
    openModal(status, product) {
      if (status === 'create') {
        productModal.show();
        this.isNew = true;
        // 帶入初始化資料（清空 tempProduct）
        this.tempProduct = {
          features: ['純素', '有機', '無麩質', '辣'],
          checkboxFeatures: [],
          categories: ['超飽足果昔盆', '輕食冷盤', '湯品', '裸食甜點', '果昔飲品'],
          selectCategories: '',
          category: '1', //必填，已用 categories 取代
          imagesUrl: [],
        };
      } else if (status === 'edit') {
        productModal.show();
        this.isNew = false;
        // 帶入要編輯的資料
        this.tempProduct = { ...product };
      } else if (status === 'delete') {
        deleteProductModal.show();
        this.tempProduct = { ...product }; //取 id
      }
    },
    closeModal() {
      productModal.hide();
      deleteProductModal.hide();
    },
  },
  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common['Authorization'] = token;
    this.checkLogin();
    productModal = new bootstrap.Modal(document.getElementById('productModal'));
    deleteProductModal = new bootstrap.Modal(document.getElementById('deleteProductModal'));
  },
};
createApp(app).mount('#app');
