<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-2">
        <div class="d-flex flex-column">
          <RouterLink to="/admin/products">產品管理</RouterLink>
          <RouterLink to="/admin/orders">訂單管理</RouterLink>
          <RouterLink to="/">回前台首頁</RouterLink>
          <a href="#" @click.prevent="logout">登出</a>
        </div>
      </div>
      <div class="col-10">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>
<script>
  import { RouterLink, RouterView } from 'vue-router';
  const { VITE_URL } = import.meta.env;
  export default {
    components: {
      RouterLink,
      RouterView,
    },
    methods: {
      logout() {
        document.cookie = `myToken=; expires= ${new Date()};`;
        this.$router.push('/login');
      },
      checkLogin() {
        const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        this.$http.defaults.headers.common['Authorization'] = myCookie;
        this.$http.post(`${VITE_URL}/api/user/check`).catch((err) => {
          alert(err.response.data.message);
          this.$router.push('/login');
        });
      },
    },
    mounted() {
      this.checkLogin();
    },
  };
</script>
