import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.47/vue.esm-browser.min.js';
import { baseUrl, path } from './config.js';
import pagination from './components/pagination.js';
import productModalAll from './components/product-modal.js';
import deleteProductModal from './components/delete-modal.js';
let productModal;
let deleteModal;
const app = createApp({
  data() {
    return {
      products: [],
      tempProduct: {
        features: ['純素', '有機', '無麩質', '辣'],
        checkboxFeatures: [],
        categories: ['超飽足果昔盆', '輕食冷盤', '湯品', '裸食甜點', '果昔飲品'],
        selectCategories: '',
        category: '1', // 必填，已用 categories 取代
        imagesUrl: [],
      },
      isNew: false,
      page: {},
    };
  },
  methods: {
    checkLogin() {
      axios
        .post(`${baseUrl}/api/user/check`)
        .then((res) => {
          this.getProduct();
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = './login.html';
        });
    },
    getProduct(page = 1) {
      axios
        .get(`${baseUrl}/api/${path}/admin/products/?page=${page}`)
        .then((res) => {
          this.products = res.data.products;
          this.page = res.data.pagination;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    updateProduct() {
      // 新增
      let url = `${baseUrl}/api/${path}/admin/product`;
      let method = 'post';
      let message = '新增產品成功！';
      // 編輯
      if (!this.isNew) {
        url = `${baseUrl}/api/${path}/admin/product/${this.tempProduct.id}`;
        method = 'put';
        message = '編輯產品成功！';
      }
      axios[method](url, { data: this.tempProduct })
        .then((res) => {
          this.getProduct();
          productModal.hide();
          alert(message);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    deleteProduct() {
      axios
        .delete(`${baseUrl}/api/${path}/admin/product/${this.tempProduct.id}`)
        .then((res) => {
          this.getProduct();
          deleteModal.hide();
          alert('刪除產品成功！');
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    createImage() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push('');
    },
    openModal(status, product) {
      if (status === 'create') {
        // 新增
        productModal.show();
        this.isNew = true;
        this.tempProduct = {
          features: ['純素', '有機', '無麩質', '辣'],
          checkboxFeatures: [],
          categories: ['超飽足果昔盆', '輕食冷盤', '湯品', '裸食甜點', '果昔飲品'],
          selectCategories: '',
          category: '1', // 必填，已用 categories 取代
          imagesUrl: [],
        };
      } else if (status === 'edit') {
        // 編輯
        productModal.show();
        this.isNew = false;
        this.tempProduct = { ...product };
      } else if (status === 'delete') {
        // 刪除
        deleteModal.show();
        this.tempProduct = { ...product };
      }
    },
  },
  components: {
    pagination,
    productModalAll,
    deleteProductModal,
  },
  mounted() {
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common['Authorization'] = myCookie;
    this.checkLogin();
    productModal = new bootstrap.Modal(document.getElementById('productModal'));
    deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
  },
});

app.mount('#app');
