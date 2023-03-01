<template>
  <div class="container">
    <div class="row justify-content-center align-items-center vh-100">
      <div style="width: 350px">
        <h2 class="text-center mb-4">請先登入</h2>
        <div class="form-floating mb-3">
          <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="user.username" />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating mb-3">
          <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="user.password" />
          <label for="floatingPassword">Password</label>
        </div>
        <button type="button" class="btn btn-primary btn-lg w-100 mb-3" @click="login">登入</button>
        <div class="text-center">
          <RouterLink to="/">回前台首頁</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  const { VITE_URL } = import.meta.env;
  export default {
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
        this.$http
          .post(`${VITE_URL}/admin/signin`, this.user)
          .then((res) => {
            const { token, expired } = res.data;
            document.cookie = `myToken=${token}; expires= ${new Date(expired)};`;
            this.$router.push('/admin/products');
          })
          .catch((err) => {
            alert(err.response.data.message);
            this.email = '';
            this.password = '';
          });
      },
    },
  };
</script>
