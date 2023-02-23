export default {
  props: ['product', 'addToCart', 'loadingStatus'],
  data() {
    return {
      productModal: '',
      productQty: 1,
      selectImg: '',
    };
  },
  template: '#productModal',
  mounted() {
    this.productModal = new bootstrap.Modal(this.$refs.modal);
    this.$refs.modal.addEventListener('hidden.bs.modal', () => {
      this.productQty = 1;
      this.selectImg = '';
    });
  },
};
