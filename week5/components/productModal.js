export default {
  props: ['product', 'addToCart'],
  data() {
    return {
      productModal: '',
      productQty: 1,
    };
  },
  template: '#productModal',
  mounted() {
    this.productModal = new bootstrap.Modal(this.$refs.modal);
  },
};
